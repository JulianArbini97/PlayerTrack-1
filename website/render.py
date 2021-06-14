#!/usr/bin/python3
from sys import argv
import MySQLdb
from flask import Flask, session, render_template, request, redirect, url_for, jsonify
import MySQLdb.cursors
import re
import uuid
from datetime import datetime
from werkzeug.datastructures import ImmutableMultiDict


app = Flask(__name__)
app.secret_key = '343434'

MY_HOST = "localhost"
MY_USER = "root"
MY_PASS = "root"
MY_DB = "playerTrack_db"

db = MySQLdb.connect(host=MY_HOST, user=MY_USER, passwd=MY_PASS,
                                db=MY_DB)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'username' in request.form and 'password' in request.form:
            username = request.form['username']
            password = request.form['password']
            db = MySQLdb.connect(host=MY_HOST, user=MY_USER, passwd=MY_PASS,
                                db=MY_DB)
            pla = db.cursor()
            sta = db.cursor()
            pla.execute("SELECT * FROM players WHERE user='{}'".format(username))
            sta.execute("SELECT * FROM staff WHERE user='{}'".format(username))
            players = pla.fetchone()
            staff = sta.fetchone()
            if staff:
                if staff[3] == username:
                    if staff[4] == password:
                        return redirect(url_for('staff', text=username))
                    else:
                        return render_template("login.html", res='<p class="res alert alert-danger" id="alert_message">wrong staff password</p>')
            elif players:
                if players[4] == username:
                    if players[5] == password:
                        return redirect(url_for('player', text=username))
                    else:
                        return render_template("login.html", res='<p class="res alert alert-danger" id="alert_message">wrong player password</p>') 
            else:
                return render_template("login.html", res='<p class="res alert alert-danger" id="alert_message">wrong user</p>')
    return render_template("login.html", res='<p class="res alert">&nbsp;</p>')


@app.route('/staff/<text>')
def staff(text):
    db = MySQLdb.connect(host=MY_HOST, user=MY_USER, passwd=MY_PASS,
                        db=MY_DB)
    sta = db.cursor()
    sta.execute("SELECT first_name, last_name FROM staff WHERE user='" + text + "'")
    staff = sta.fetchall()
    first = staff[0][0]
    last = staff[0][1]
    staff_name = first + " " + last
    players = db.cursor()
    players.execute("SELECT first_name, last_name, id, user FROM players")
    p_names = players.fetchall()
    list_p = []
    for player in p_names:
        in_list = []
        for i in range(0, 3):
            in_list.append(player[i])
        list_p.append(in_list)
    
    """Loads if player did daily registry"""
    list_users = []
    today = datetime.now()
    today = today.strftime("%Y-%m-%d")
    for user in p_names:
        in_list = []
        for i in range(0, 4):
            if i == 2:
                continue
            in_list.append(user[i])
        list_users.append(in_list)
    user_dict = {}
    for item in list_users:
        u_name = item[0] + " " + item[1]
        pla = db.cursor()
        pla.execute("SELECT date FROM daily_" + item[2] + " WHERE date='" + today + "'")
        player = pla.fetchone()
        if player:
            user_dict[u_name] = "yes"
        else:
            user_dict[u_name] = "no"
    return render_template('staff.html', name=staff_name, players=list_p, user_dict=user_dict)

@app.route('/staff/select_<text>')
def p_select(text):
    db = MySQLdb.connect(host=MY_HOST, user=MY_USER, passwd=MY_PASS,
                        db=MY_DB)
    pla = db.cursor()
    matches = db.cursor()
    """Loads individual player information"""
    pla.execute("SELECT first_name, last_name, position, user FROM players WHERE id='" + text + "'")
    player = pla.fetchall()
    first = player[0][0]
    last = player[0][1]
    position = player[0][2]
    user = player[0][3]

    """Loads individual player info for all matches"""
    matches.execute("SELECT * FROM matches_" + user)
    matches = matches.fetchall()
    list_match = []
    for match in matches:
        in_list = []
        for i in range(1, len(match)):
            if type(match[i]) == datetime:
                in_list.append(match[i].strftime("%Y-%m-%d"))
            else:
                in_list.append(match[i])
        list_match.append(in_list)

    """Loads individual player injuries"""
    inju = db.cursor()
    inju.execute("SELECT id, date, description, date_recovered FROM injuries WHERE player_id='" + text + "'")
    injuries = inju.fetchall()
    list_injuries = []
    for injury in injuries:
        in_list = []
        for i in range(len(injury)):
            if type(injury[i]) == datetime:
                in_list.append(injury[i].strftime("%Y-%m-%d"))
            else:
                in_list.append(injury[i])
        list_injuries.append(in_list)

    """Loads daily registries"""
    today = datetime.now()
    today = today.strftime("%Y-%m-%d")
    dai = db.cursor()
    dai.execute("SELECT date, weight, energy, sleep, pain, description FROM daily_" + user)
    daily = dai.fetchall()
    list_daily = []
    if len(daily) > 1:
        for i in range(len(daily)):
            if type(daily[i][0]) == datetime:
                last_day = daily[i][0].strftime("%Y-%m-%d")
                if last_day == today:
                    for item in daily[i]:
                        if type(item) == datetime:
                            list_daily.append(item.strftime("%Y-%m-%d"))
                        else:
                            list_daily.append(item)
                    return render_template('sel_player.html', name=first + " " + last, matches=list_match, position=position, injuries=list_injuries, player_id=text, daily=list_daily, user=user)
    else:
        if type(daily[0]) == datetime:
            last_day = daily[0].strftime("%Y-%m-%d")
            if last_day == today:
                for item in daily:
                    if type(item) == datetime:
                        list_daily.append(item.strftime("%Y-%m-%d"))
                    else:
                        list_daily.append(item)
                return render_template('sel_player.html', name=first + " " + last, matches=list_match, position=position, injuries=list_injuries, player_id=text, daily=list_daily, user=user)
    return render_template('sel_player.html', name=first + " " + last, matches=list_match, position=position, injuries=list_injuries, player_id=text, no="(No registry yet)", user=user)
    

@app.route('/staff/compare')
def p_compare():
    sel = ""
    vari = ""
    
    db = MySQLdb.connect(host=MY_HOST, user=MY_USER, passwd=MY_PASS,
                        db=MY_DB)
 
    """Loads individual player information"""
    pla = db.cursor()
    pla.execute("SELECT id, first_name, last_name FROM players")
    players = pla.fetchall()
    list_p = []
    big_list = []
    for player in players:
        in_list = []
        for i in range(0, 3):
            in_list.append(player[i])
        list_p.append(in_list)
    return render_template('compare.html', all_players=list_p)

@app.route('/staff/get_vars')
def get_prediction():
    vari = request.args.get('variable')
    separate = vari.split('-')
    variable = separate[0]
    player_id = separate[1].split(',')
    big_list = []
    names = []
    for id_c in player_id:
        db = MySQLdb.connect(host=MY_HOST, user=MY_USER, passwd=MY_PASS,
                    db=MY_DB)
        all_matches = db.cursor()
        all_matches.execute("SELECT * FROM all_matches WHERE player_id=" + id_c)
        all_matches = all_matches.fetchall()
        list_matches = []
        for match in all_matches:
            in_list = []
            for i in range(1, len(match)):
                if type(match[i]) == datetime:
                    in_list.append(match[i].strftime("%Y-%m-%d"))
                else:
                    in_list.append(match[i])
            list_matches.append(in_list)
        big_list.append(list_matches)
        players = db.cursor()
        players.execute("SELECT first_name, last_name FROM players WHERE id=" + id_c)
        player_names = players.fetchall()
        names.append(player_names)

    all_names = []
    for name in names:
        first_name = name[0][0]
        last_name = name[0][1]
        all_names.append(first_name + " " + last_name)
    return {'var':variable, 'list':big_list, 'names':all_names}

@app.route('/submit_add', methods=['POST'])
def submit_add():
    if request.method == "POST":
        description = request.form["description"]
        date = request.form["date"]
        is_checked = request.form.get("check")
        player_id = request.form["player_id"]
        recovered = request.form["recovered"]
        if not recovered:
            recovered = None
        db = MySQLdb.connect(host=MY_HOST, user=MY_USER, passwd=MY_PASS,
                        db=MY_DB)
        injury = db.cursor()
        insert_injury = (
        "INSERT INTO injuries (date, description, date_recovered, player_id)"
        "VALUES (%s, %s, %s, %s);"
        )
        injury_input = db.cursor()
        injury_input.execute(insert_injury, (date, description, recovered, player_id))
        db.commit()
        return render_template('sel_player.html')

@app.route('/submit_edit', methods=['POST'])
def submit_edit():
    if request.method == "POST":
        new_values = request.form.to_dict()
        new_date = new_values['new_date']
        date = datetime.strptime(new_date, '%Y-%m-%d')
        injury_id = new_values['injury_id']
        db = MySQLdb.connect(host=MY_HOST, user=MY_USER, passwd=MY_PASS,
                        db=MY_DB)
        injury = db.cursor()
        injury.execute("UPDATE injuries SET date_recovered='{}' WHERE id={};".format(date, injury_id))
        db.commit()
        return render_template('sel_player.html')

@app.route('/submit_delete', methods=['POST'])
def submit_delete():
    if request.method == "POST":
        new_values = request.form.to_dict()
        injury_id = new_values['injury_id']
        db = MySQLdb.connect(host=MY_HOST, user=MY_USER, passwd=MY_PASS,
                        db=MY_DB)
        delete = db.cursor()
        delete.execute("DELETE FROM injuries WHERE id={};".format(injury_id))
        db.commit()
        return render_template('sel_player.html')

@app.route('/player/<text>')
def player(text):
    db = MySQLdb.connect(host=MY_HOST, user=MY_USER, passwd=MY_PASS,
                        db=MY_DB)
    pla = db.cursor()
    day = db.cursor()
    pla.execute("SELECT first_name, last_name, user FROM players WHERE user='" + text + "'")
    day.execute("SELECT * FROM daily_" + text)
    player = pla.fetchall()
    first = player[0][0]
    last = player[0][1]
    user = player[0][2]
    daily = day.fetchall()
    today = datetime.now()
    
    today = today.strftime("%Y-%m-%d")
    list_dates = []
    for day in daily:
        list_dates.append(day[1].strftime("%Y-%m-%d"))
    if today in list_dates:
        return render_template('form_done.html', name=first + " " + last, user=user)
    return render_template('player.html', name=first + " " + last, user=user)

@app.route('/player/<text>', methods=['POST'])
def player_post(text):
    weight = float(request.form["weight"])
    energy = float(request.form["energy"])
    sleep = float(request.form["sleep"])
    pain = float(request.form["pain"])
    description = request.form["description"]

    db = MySQLdb.connect(host=MY_HOST, user=MY_USER, passwd=MY_PASS,
                        db=MY_DB)
    table = db.cursor()

    id_player = db.cursor()
    id_player.execute("SELECT id FROM players WHERE user='" + text + "'")
    id_play = id_player.fetchall()
    id_p = id_play[0][0]

    today = datetime.now()
    today = today.strftime("%Y-%m-%d")

    insert_stmt = (
        "INSERT INTO daily_" + text + " (id, date, weight, energy, sleep, pain, description) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s);"
        )
    cursor = db.cursor()
    cursor.execute(insert_stmt, (id_p, today, weight, energy, sleep, pain, description))
    db.commit()
    return render_template("form_done.html")

if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)