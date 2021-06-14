function create_chart(all_info, variable, names) {
    for (let i = 0; i < all_info.length; i++) {
        var opponents = []
        for (let j = 0; j < all_info[i].length; j++) {
            var opp_name = all_info[i][j][1];
            var opp_date = all_info[i][j][2].replace("2021-", "");
            var label = opp_name + " " + opp_date;
            opponents.push(label);
        }
    }
    var accels = []
    for (let i = 0; i < all_info.length; i++) {
        var accels_per_player = []
        for (let j = 0; j < all_info[i].length; j++) {
            var acc = all_info[i][j][7];
            if (acc == null) {
                acc = 0.01;
                accels_per_player.push(acc);
            } else {
                accels_per_player.push(acc);
            }
        }
        accels.push(accels_per_player);
    }

    var decels = []
    for (let i = 0; i < all_info.length; i++) {
        var decels_per_player = []
        for (let j = 0; j < all_info[i].length; j++) {
            var dec = all_info[i][j][8];
            if (dec == null) {
                dec = 0.01;
                decels_per_player.push(dec);
            } else {
                decels_per_player.push(dec);
            }
        }
        decels.push(decels_per_player);
    }

    var collisions = []
    for (let i = 0; i < all_info.length; i++) {
        var colls_per_player = []
        for (let j = 0; j < all_info[i].length; j++) {
            var coll = all_info[i][j][10];
            if (coll == null) {
                coll = 0.01;
                colls_per_player.push(coll);
            } else {
                colls_per_player.push(coll);
            }
        }
        collisions.push(colls_per_player);
    }

    var distance = []
    for (let i = 0; i < all_info.length; i++) {
        var dist_per_player = []
        for (let j = 0; j < all_info[i].length; j++) {
            var dist = all_info[i][j][4];
            if (dist == null) {
                dist = 0.01;
                dist_per_player.push(dist);
            } else {
                dist_per_player.push(dist);
            }
        }
        distance.push(dist_per_player);
    }

    var mins = []
    for (let i = 0; i < all_info.length; i++) {
        var mins_per_player = []
        for (let j = 0; j < all_info[i].length; j++) {
            var min = all_info[i][j][3];
            if (min == null) {
                min = 0.01;
                mins_per_player.push(min);
            } else {
                mins_per_player.push(min);
            }
        }
        mins.push(mins_per_player);
    }

    if (variable == 'acc100') {
        acc100 = [];
        for (let i = 0; i < accels.length; i++) {
            var per_player = [];
            for (let j = 0; j < accels[i].length; j++) {
                if (accels[i][j] != 0.01 && distance[i][j] != 0.01) {
                    var acc_100 = accels[i][j] / distance[i][j] * 100;
                } else {
                    var acc_100 = 0.01;
                }
                per_player.push(acc_100);
            }
            acc100.push(per_player);
        }

        /* Average of all selected players */
        var avgs = 0;
        var cont = 0;
        for (let i = 0; i < acc100.length; i++) {
            for (let j = 0; j < acc100[i].length; j++) {
                if (acc100[i][j] != 0.01) {
                    cont++;
                    avgs = avgs + acc100[i][j];
                }
            }
        }
        var all_avgs = avgs / cont;
        /* End */

        acc100_datasets = []
        for (let i = 0; i < names.length; i++) {
            for (let j = 0; j < acc100[i].length; j++) {
                one_player = {
                label: names[i],
                type: 'bar',
                borderColor: "#" + ((1<<24)*Math.random() | 0).toString(16),
                backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16),
                data: acc100[i],
                };
            }
            acc100_datasets.push(one_player);
        }
        av_data = {
            label: 'Average',
            type: 'line',
            borderColor: 'white',
            data: [all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs]
        }
        acc100_datasets.push(av_data);
        
        const labels = opponents;
        const data_acc100 = {
        labels: labels,
        datasets: acc100_datasets,
        };
        const config_acc100 = {
        data: data_acc100,
        options: {
            pointStyle: 'line',
            pointBorderWidth: 0
            }
        };

        if (window.myChart != null){
            window.myChart.destroy();
        }
        window.myChart = new Chart(
        document.getElementById('myChart_dynamic'),
        config_acc100
        );
    } else if (variable == "coll10") {
        coll10 = [];
        for (let i = 0; i < collisions.length; i++) {
            var per_player = [];
            for (let j = 0; j < collisions[i].length; j++) {
                if (collisions[i][j] != 0.01 && mins[i][j] != 0.01) {
                    var coll_10 = collisions[i][j] / mins[i][j] * 10;
                } else {
                    var coll_10 = 0.01;
                }
                per_player.push(coll_10);
            }
            coll10.push(per_player);
        }

        /* Average of all selected players */
        var avgs = 0;
        var cont = 0;
        for (let i = 0; i < coll10.length; i++) {
            for (let j = 0; j < coll10[i].length; j++) {
                if (coll10[i][j] != 0.01) {
                    cont++;
                    avgs = avgs + coll10[i][j];
                }
            }
        }
        var all_avgs = avgs / cont;
        /* End */

        coll10_datasets = []
        for (let i = 0; i < names.length; i++) {
            for (let j = 0; j < coll10[i].length; j++) {
                one_player = {
                label: names[i],
                type: 'bar',
                borderColor: "#" + ((1<<24)*Math.random() | 0).toString(16),
                backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16),
                data: coll10[i],
                };
            }
            coll10_datasets.push(one_player);
        }

        av_data = {
            label: 'Average',
            type: 'line',
            borderColor: 'white',
            data: [all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs]
        }
        coll10_datasets.push(av_data);
        
        const labels = opponents;
        const data_coll10 = {
        labels: labels,
        datasets: coll10_datasets,
        };
        const config_coll10 = {
        data: data_coll10,
        options: {
            pointStyle: 'line',
            pointBorderWidth: 0
            }
        };

        if (window.myChart != null){
            window.myChart.destroy();
        }
        window.myChart = new Chart(
        document.getElementById('myChart_dynamic'),
        config_coll10
        );
    } else if (variable == "coll100") {
        coll100 = [];
        for (let i = 0; i < collisions.length; i++) {
            var per_player = [];
            for (let j = 0; j < collisions[i].length; j++) {
                if (collisions[i][j] != 0.01 && distance[i][j] != 0.01) {
                    var coll_100 = collisions[i][j] / distance[i][j] * 100;
                } else {
                    var coll_100 = 0.01;
                }
                per_player.push(coll_100);
            }
            coll100.push(per_player);
        }

        /* Average of all selected players */
        var avgs = 0;
        var cont = 0;
        for (let i = 0; i < coll100.length; i++) {
            for (let j = 0; j < coll100[i].length; j++) {
                if (coll100[i][j] != 0.01) {
                    cont++;
                    avgs = avgs + coll100[i][j];
                }
            }
        }
        var all_avgs = avgs / cont;
        /* End */

        coll100_datasets = []
        for (let i = 0; i < names.length; i++) {
            for (let j = 0; j < coll100[i].length; j++) {
                one_player = {
                label: names[i],
                type: 'bar',
                borderColor: "#" + ((1<<24)*Math.random() | 0).toString(16),
                backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16),
                data: coll100[i],
                };
            }
            coll100_datasets.push(one_player);
        }

        av_data = {
            label: 'Average',
            type: 'line',
            borderColor: 'white',
            data: [all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs]
        }
        coll100_datasets.push(av_data);
        
        const labels = opponents;
        const data_coll100 = {
        labels: labels,
        datasets: coll100_datasets,
        };
        const config_coll100 = {
        data: data_coll100,
        options: {
            pointStyle: 'line',
            pointBorderWidth: 0
            }
        };

        if (window.myChart != null){
            window.myChart.destroy();
        }
        window.myChart = new Chart(
        document.getElementById('myChart_dynamic'),
        config_coll100
        );
    } else if (variable == "accdec") {
        accdec = [];
        for (let i = 0; i < accels.length; i++) {
            var per_player = [];
            for (let j = 0; j < accels[i].length; j++) {
                if (accels[i][j] != 0.01 && decels[i][j] != 0.01) {
                    var accdecs = accels[i][j] / decels[i][j];
                } else {
                    var accdecs = 0.01;
                }
                per_player.push(accdecs);
            }
            accdec.push(per_player);
        }

        /* Average of all selected players */
        var avgs = 0;
        var cont = 0;
        for (let i = 0; i < accdec.length; i++) {
            for (let j = 0; j < accdec[i].length; j++) {
                if (accdec[i][j] != 0.01) {
                    cont++;
                    avgs = avgs + accdec[i][j];
                }
            }
        }
        var all_avgs = avgs / cont;
        /* End */

        accdec_datasets = []
        for (let i = 0; i < names.length; i++) {
            for (let j = 0; j < accdec[i].length; j++) {
                one_player = {
                label: names[i],
                type: 'bar',
                borderColor: "#" + ((1<<24)*Math.random() | 0).toString(16),
                backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16),
                data: accdec[i],
                };
            }
            accdec_datasets.push(one_player);
        }
        
        av_data = {
            label: 'Average',
            type: 'line',
            borderColor: 'white',
            data: [all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs]
        }
        accdec_datasets.push(av_data);

        const labels = opponents;
        const data_accdec = {
        labels: labels,
        datasets: accdec_datasets,
        };
        const config_accdec = {
        data: data_accdec,
        options: {
            pointStyle: 'line',
            pointBorderWidth: 0
            }
        };

        if (window.myChart != null){
            window.myChart.destroy();
        }
        window.myChart = new Chart(
        document.getElementById('myChart_dynamic'),
        config_accdec
        );
    } else if (variable == "accdeccol") {
        accdeccol = [];
        for (let i = 0; i < accels.length; i++) {
            var per_player = [];
            for (let j = 0; j < accels[i].length; j++) {
                if (accels[i][j] != 0.01 && decels[i][j] != 0.01) {
                    var accdecscol = accels[i][j] / (decels[i][j] - collisions[i][j]);
                } else {
                    var accdecscol = 0.01;
                }
                per_player.push(accdecscol);
            }
            accdeccol.push(per_player);
        }

        /* Average of all selected players */
        var avgs = 0;
        var cont = 0;
        for (let i = 0; i < accdeccol.length; i++) {
            for (let j = 0; j < accdeccol[i].length; j++) {
                if (accdeccol[i][j] != 0.01) {
                    cont++;
                    avgs = avgs + accdeccol[i][j];
                }
            }
        }
        var all_avgs = avgs / cont;
        /* End */

        accdeccol_datasets = []
        for (let i = 0; i < names.length; i++) {
            for (let j = 0; j < accdeccol[i].length; j++) {
                one_player = {
                label: names[i],
                type: 'bar',
                borderColor: "#" + ((1<<24)*Math.random() | 0).toString(16),
                backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16),
                data: accdeccol[i],
                };
            }
            accdeccol_datasets.push(one_player);
        }
        
        av_data = {
            label: 'Average',
            type: 'line',
            borderColor: 'white',
            data: [all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs, all_avgs]
        }
        accdeccol_datasets.push(av_data);

        const labels = opponents;
        const data_accdeccol = {
        labels: labels,
        datasets: accdeccol_datasets,
        };
        const config_accdeccol = {
        data: data_accdeccol,
        options: {
            pointStyle: 'line',
            pointBorderWidth: 0
            }
        };

        if (window.myChart != null){
            window.myChart.destroy();
        }
        window.myChart = new Chart(
        document.getElementById('myChart_dynamic'),
        config_accdeccol
        );
    }
}