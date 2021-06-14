/* Labels: Opponent + Date */
var matchOpponent = document.querySelectorAll('#myTable .match_values:nth-child(1)');
var matchVs = [];
matchOpponent.forEach(function(singleCell) {
matchVs.push(singleCell.innerText);
});
var matchDate = document.querySelectorAll('#myTable .match_values:nth-child(2)');
var matchDates = [];
matchDate.forEach(function(singleCell) {
matchDates.push(singleCell.innerText);
});
for (let i = 0; i < matchDates.length; i++) {
    matchDates[i] = matchDates[i].replace("2021-", "");
}
newVs = []
for (let i = 0; i < matchVs.length; i++) {
    if (matchVs[i] && matchDates[i]) {
        var fullLabel = matchVs[i] + " " + matchDates[i];
    }
newVs.push(fullLabel);
}
/* End Label Opponent + Date */

/* Accelerations */
var accels = document.querySelectorAll('#myTable .match_values:nth-child(7)');
var matchAcc = [];
accels.forEach(function(singleCell) {
matchAcc.push(singleCell.innerText);
});
allAccs = [];
for (let i = 0; i < matchAcc.length; i++) {
    if (matchAcc[i] == "None") {
    matchAcc[i] = 0;
    }
    allAccs.push(parseInt(matchAcc[i]));
}
/* End Accelerations */

/* Distance */
var distance = document.querySelectorAll('#myTable .match_values:nth-child(4)');
var matchDist = [];
distance.forEach(function(singleCell) {
matchDist.push(singleCell.innerText);
});
allDist = [];
for (let i = 0; i < matchDist.length; i++) {
    if (matchDist[i] == "None") {
    matchDist[i] = 0;
    }
    allDist.push(parseInt(matchDist[i]));
}
/* End Distance */

/* Accelerations every 100m */
acc100 = []
for (let i = 0; i < allDist.length; i++) {
    if (allDist[i] == 0) {
    acc100.push(0.001);
    }
    else {
    var value = (allAccs[i] * 100) / allDist[i];
    acc100.push(value);
    }
}
/* End Accelerations every 100m */

/* Average Accelerations every 100m */
var cont = 0;
var sum = 0;
for (let i = 0; i < acc100.length; i++) {
    if (acc100[i] != 0.001) {
    cont++;
    sum += acc100[i];
    } 
}
var avAcc100 = sum / cont;
/* End */

/* Upper and Lower Average Acc every 100m */
var upperAvAcc100 = avAcc100 * 1.3;
var lowerAvAcc100 = avAcc100 * 0.7;
/* End*/

/* Collisions */
var collisions = document.querySelectorAll('#myTable .match_values:nth-child(10)');
var matchColl = [];
collisions.forEach(function(singleCell) {
matchColl.push(singleCell.innerText);
});
allColl = [];
for (let i = 0; i < matchColl.length; i++) {
    if (matchColl[i] == "None") {
    matchColl[i] = 0;
    }
    allColl.push(parseInt(matchColl[i]));
}
/* End Collisions */

/* Minutes played */
var minutes = document.querySelectorAll('#myTable .match_values:nth-child(3)');
var matchMins = [];
minutes.forEach(function(singleCell) {
matchMins.push(singleCell.innerText);
});
allMins = [];
for (let i = 0; i < matchMins.length; i++) {
    if (matchMins[i] == "None") {
    matchMins[i] = 0;
    }
    allMins.push(parseInt(matchMins[i]));
}
/* End Minutes played */

/* Decelerations */
var decs = document.querySelectorAll('#myTable .match_values:nth-child(8)');
var matchDecs = [];
decs.forEach(function(singleCell) {
matchDecs.push(singleCell.innerText);
});
allDecs = [];
for (let i = 0; i < matchDecs.length; i++) {
    if (matchDecs[i] == "None") {
    matchDecs[i] = 0;
    }
    allDecs.push(parseInt(matchDecs[i]));
}
/* End Decelerations */

/* Collisions every 10 mins */
coll10 = []
for (let i = 0; i < allColl.length; i++) {
    if (allColl[i] == 0) {
    coll10.push(0.001);
    }
    else {
    var value = (allColl[i] * 10) / allMins[i];
    coll10.push(value);
    }
}
/* End Collisions every 10 mins*/

/* Average Collisions every 10 mins */
var cont = 0;
var sum = 0;
for (let i = 0; i < coll10.length; i++) {
    if (coll10[i] != 0.001) {
    cont++;
    sum += coll10[i];
    } 
}
var avColl10 = sum / cont;
/* End */

/* Collisions every 100 m */
coll100 = []
for (let i = 0; i < allColl.length; i++) {
    if (allColl[i] == 0) {
    coll100.push(0.001);
    }
    else {
    var value = (allColl[i] * 100) / allDist[i];
    coll100.push(value);
    }
}
/* End Collisions every 100 m */

/* Average Collisions every 100 m */
var cont = 0;
var sum = 0;
for (let i = 0; i < coll100.length; i++) {
    if (coll100[i] != 0.001) {
    cont++;
    sum += coll100[i];
    } 
}
var avColl100 = sum / cont;
/* End */

/* Accelerations over Decelerations */
accDec = []
for (let i = 0; i < allAccs.length; i++) {
    if (allAccs[i] == 0) {
    accDec.push(0.001);
    }
    else {
    var value = allAccs[i] / allDecs[i];
    accDec.push(value);
    }
}
/* End Accelerations over Decelerations */

/* Average Accelerations over Deceleration */
var cont = 0;
var sum = 0;
for (let i = 0; i < accDec.length; i++) {
    if (accDec[i] != 0.001) {
    cont++;
    sum += accDec[i];
    } 
}
var avAccDec = sum / cont;
/* End */

/* Accelerations over Decelerations no Contact */
accDecCol = []
for (let i = 0; i < allAccs.length; i++) {
    if (allAccs[i] == 0) {
    accDecCol.push(0.001);
    }
    else {
    var value = allAccs[i] / (allDecs[i] - allColl[i]);
    accDecCol.push(value);
    }
}
/* End Accelerations over Decelerations no Contact */

/* Average Accelerations over Decelerations no Contact */
var cont = 0;
var sum = 0;
for (let i = 0; i < accDecCol.length; i++) {
/*EL 11 ESTA SACADO A PREPO, VALOR NO COHERENTE AL RESTO - VER QUE ONDA*/
    if (accDecCol[i] != 0.001 || accDecCol[i] != 11) {
    cont++;
    sum += accDecCol[i];
    } 
}
var avAccDecColl = sum / cont;
/* End */

/* STARTS CHART BUILDING */
/* Accelerations every 100m */
const labels = newVs;
const data_acc100 = {
labels: labels,
datasets: [
    {
        label: 'Average',
        type: 'line',
        borderColor: '#3fbbec',
        data: [avAcc100, avAcc100, avAcc100, avAcc100, avAcc100, avAcc100, avAcc100, avAcc100, avAcc100, avAcc100, avAcc100, avAcc100]
    },
    {
        label: 'Upper Limit',
        type: 'line',
        borderColor: '#d9d9d9',
        data: [upperAvAcc100, upperAvAcc100, upperAvAcc100, upperAvAcc100, upperAvAcc100, upperAvAcc100, upperAvAcc100, upperAvAcc100, upperAvAcc100, upperAvAcc100, upperAvAcc100, upperAvAcc100]
    },
    {
        label: 'Lower Limit',
        type: 'line',
        borderColor: '#d9d9d9',
        data: [lowerAvAcc100, lowerAvAcc100, lowerAvAcc100, lowerAvAcc100, lowerAvAcc100, lowerAvAcc100, lowerAvAcc100, lowerAvAcc100, lowerAvAcc100, lowerAvAcc100, lowerAvAcc100, lowerAvAcc100]
    },
    {
        label: 'Accelerations every 100m',
        type: 'bar',
        backgroundColor: '#ff4a00',
        data: acc100,
    }
]
};
const config_acc100 = {
data: data_acc100,
options: {
    pointStyle: 'line',
    pointBorderWidth: 0
    }
};
var myChart_acc100 = new Chart(
document.getElementById('myChart_acc100'),
config_acc100
);
/* End */

/*Collisions every 10 mins */
const data_coll10 = {
    labels: labels,
    datasets: [
    {
        label: 'Average',
        type: 'line',
        borderColor: '#3fbbec',
        data: [avColl10, avColl10, avColl10, avColl10, avColl10, avColl10, avColl10, avColl10, avColl10, avColl10, avColl10, avColl10]
    },
    {
        label: 'Collisions every 10 mins',
        type: 'bar',
        backgroundColor: '#ff4a00',
        data: coll10,
    }
    ]
};
const config_coll10 = {
data: data_coll10,
options: {
    pointStyle: 'line',
    pointBorderWidth: 0
    }
};
var myChart_coll10 = new Chart(
document.getElementById('myChart_coll10'),
config_coll10
);
/* End */

/*Collisions every 100m */
const data_coll100 = {
    labels: labels,
    datasets: [
        {
            label: 'Average',
            type: 'line',
            borderColor: '#3fbbec',
            data: [avColl100, avColl100, avColl100, avColl100, avColl100, avColl100, avColl100, avColl100, avColl100, avColl100, avColl100, avColl100]
        },
        {
            label: 'Collisions every 100 meters',
            type: 'bar',
            backgroundColor: '#ff4a00',
            data: coll100,
        }
    ]
};
const config_coll100 = {
data: data_coll100,
options: {
    pointStyle: 'line',
    pointBorderWidth: 0
    }
};
var myChart_coll100 = new Chart(
document.getElementById('myChart_coll100'),
config_coll100
);
/* End */

/* Accelerations/Decelerations */
const data_accDec = {
    labels: labels,
    datasets: [
    {
        label: 'Average',
        type: 'line',
        borderColor: '#3fbbec',
        data: [avAccDec, avAccDec, avAccDec, avAccDec, avAccDec, avAccDec, avAccDec, avAccDec, avAccDec, avAccDec, avAccDec, avAccDec]
    },
    {
        label: 'Accelerations over Decelerations',
        type: 'bar',
        backgroundColor: '#ff4a00',
        data: accDec,
    }
    ]
};
const config_accDec = {
data: data_accDec,
options: {
    pointStyle: 'line',
    pointBorderWidth: 0
    }
};
var myChart_accDec = new Chart(
document.getElementById('myChart_accDec'),
config_accDec
);
/* End */

/* Accelerations/Decelerations no Collisions */
const data_accDecCol = {
    labels: labels,
    datasets: [
    {
        label: 'Average',
        type: 'line',
        borderColor: '#3fbbec',
        data: [avAccDecColl, avAccDecColl, avAccDecColl, avAccDecColl, avAccDecColl, avAccDecColl, avAccDecColl, avAccDecColl, avAccDecColl, avAccDecColl, avAccDecColl, avAccDecColl]
    },
    {
        label: 'Accelerations over Decelerations no Collisions',
        type: 'bar',
        backgroundColor: '#ff4a00',
        data: accDecCol,
    }
    ]
};
const config_accDecCol = {
data: data_accDecCol,
options: {
    pointStyle: 'line',
    pointBorderWidth: 0
    }
};
var myChart_accDecCol = new Chart(
document.getElementById('myChart_accDecCol'),
config_accDecCol
);
/* End */