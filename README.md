![PlayerTrack logo](https://github.com/sfrechou/PlayerTrack/blob/main/dist/README_src/logo.png?raw=true)
# PlayerTrack
### *<Ultimate Track for ultimate results/>*

MVP - Final project for Holberton School Foundations program. 

PlayerTrack is a daily use app thought for team sports to emphazise player well-being, track performance and ultimately prevent player performance injuries.

## Description

Thought to be used by both players and staff.

The player view allows for a daily input of well-being records that are kept in a historical registry database. These include daily weight, sleep level, energy level, overall pain level and specific pain description. This information is crucial for the staff's daily assessment of training level.

The staff view first takes the user to a dashboard. Here they can choose to go to a specific player profile, see who filled the daily record so far and compare player performance. 

The player profile view for staff offers a complete table of all GPS variables for a specific selection of played matches. Information can be dynamically filtered however the user wants to in order to analyze whatever they wish to analyze. A section of Advanced variables shows specific performance variables created by us based on the GPS information, shown in charts together with the average for each and two performance indexes. The upper index represents the players performance limit which they should not surpass in order to avoid injury, and the lower limit represents the underperformance limit which detects a flopping performance that should be checked upon. 

An injury section is also available which allows for a historic record of player injuries together with date, description and a date of recovery if they have already recovered. An injury update box allows the user to add a recovery date to the ongoing injuries as well as deleting the desired injuries if and when they are no longer relevant to be registered. 

The comparison section allows for the user to select any number of players and a single custom variable to compare them upon. This will produce a dynamic chart which will also display the average of averages of them all in order to further analyze the team performance and adapt training methods considering how the individual players are performing or how they perform as a team.

Every user has a unique username and password for a custom experience within the app. 

## Features
* Track individual player performance
* Track overall team performance
* Graphically represent custom analysis variables
* Keep historic record of player injuries and development
* Daily registry of player well-being to customize trainings
* Compare player performance
* See all tournament matches at once with customizable filters

## Getting Started

### Dependencies

This is an MVP that runs locally for now until appropiate security can be implemented for the database to be hosted in a server. 
In order to download it and run it, you will need:
* Python3
```
$ sudo apt-get update
$ sudo apt-get install python3.6
```
* Flask - Python module, web framework
`$ sudo pip3 install Flask`
* Jinja2
`$ sudo pip3 install Jinja2`
* MySQL
```
$ echo 'deb http://repo.mysql.com/apt/ubuntu/ trusty mysql-5.7-dmr' | sudo tee -a /etc/apt/sources.list
$ sudo apt-get update
$ sudo apt-get install mysql-server-5.7
```
* JavaScript 3.2.1
* Bootstrap
* Chart.js

### Installing

* This MVP can be downloaded from [this](https://github.com/sfrechou/PlayerTrack.git) repo before it is properly deployed which we cannot do yet because of the use of confidential information.
* The database should be populated in order for results to be visible and the application to run as it should
* Navigate to the `/website` directory and run `python3 render.py`
* Open your browser of choice (we recommend [Google Chrome](https://www.google.com/intl/es-419/chrome/) for now) and type `http://localhost:5000/`
* Enjoy navigating PlayerTrack!

## Architecture

### Deployment Structure

![deployment structure architecture](https://github.com/sfrechou/PlayerTrack/blob/main/dist/README_src/architecture.png?raw=true)

## Database

One of the most crucial parts of the overall performance of the app is the database mapping we have implemented. As of now it should be populated manually with a dynamic dump system we've created and are not allowed to publish yet.
Once deployed, PlayerTrack will receive the information directly from the existing GPS software which outputs the data in XML format that can be automated to be converted into SQL and populate the database. 

You can download a dump.sql example [here](https://github.com/sfrechou/PlayerTrack/blob/main/dist/example-dump.sql) to fill with the missing data fields and populate the database to use the app.

### MySQL Mapping

For this version of the MVP the database system only works with matches of one specific tournament. We have a more complex mapping which will be updated after deployment which includes training sessions and other tournaments. 

For user authentication and app customization there is a `players` and a `staff` tables that include their user ids, full names, position (staff role or player position on the field), secure username and secure hashed password.

Every `tournament` will have its own table but as of now there is one specific `tournament` table with the match stats for all players. This table includes a match id, player id, date, opponent, minutes played, distance, HSR, HMLD, accelerations, decelerations, maximum speed and collisions.

Every player has their own table for daily registries that is dynamically created once based on the players table and updated daily once the player submits the registries. These tables are called `daily_records_` + username.

A common table `injuries` records all players' injuries with the player_id, date, description and date of recovery.


### Screenshots

User Login:
![login](https://github.com/sfrechou/PlayerTrack/blob/main/dist/README_src/screen_login.png?raw=true)

PLayer Daily Input:
![login](https://github.com/sfrechou/PlayerTrack/blob/main/dist/README_src/screen_player_view.png?raw=true)

Staff Dashboard:
![login](https://github.com/sfrechou/PlayerTrack/blob/main/dist/README_src/screen_dash.png?raw=true)

Staff View - Player Profile:
![login](https://github.com/sfrechou/PlayerTrack/blob/main/dist/README_src/screen_profile.png?raw=true)

Staff View - Advanced Stats:
![login](https://github.com/sfrechou/PlayerTrack/blob/main/dist/README_src/screen_adv.png?raw=true)

Staff View - Injuries:
![login](https://github.com/sfrechou/PlayerTrack/blob/main/dist/README_src/screen_injury.png?raw=true)

Staff View - Compare:
![login](https://github.com/sfrechou/PlayerTrack/blob/main/dist/README_src/screen_compare.png?raw=true)


## Authors

Julián Arbini 
[Github](https://github.com/JuianArbini97)

Soledad Frechou 
[Github](https://github.com/sfrechou)

Cecilia Giudice 
[Github](https://github.com/ChechG)


## License

This project is exclusive property of the authors and should not be used without permission. Published for educational reasons. 
