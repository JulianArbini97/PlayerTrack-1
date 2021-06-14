$( document ).ready(ini);

$(document).on("submit", "form", function (e) {
    var oForm = $(this);
    var formId = oForm.attr("id");
    if (formId == "form_select") {
        var name = $('#select_player :selected').attr('id');
        var post_url = "/staff/select_" + name;
        $.ajax({
            type:'GET',
            url:post_url,
            success:function()
            {
                window.location.replace(post_url);
            }
          })
    } else if (formId == "add_injury") {
      var post_url = '/submit_add';
      $.ajax({
        type:'POST',
        url:post_url,
        data:{
          description:$("#description").val(),
          date:$("#date").val(),
          recovered:$("#recovered").val(),
          player_id:$("#player_id").val()
        },
        success:function()
        {
          location.reload();
        }
      })
    } else if (formId == "edit_recovery"){
        var post_url = '/submit_edit';
        $.ajax({
          type:'POST',
          url:post_url,
          data:{
            new_date:$("#edit_recovered").val(),
            injury_id:$("#injury_id").val(),
          },
          success:function()
          {
            location.reload();
          }
        })
    } else if (formId == "daily_input"){
        var player_name = $("#player_user").attr("name");
        var post_url = '/player/' + player_name;
        var weight = $('#weight').val();
        $('#energy').on('input', function() {
            $(this).next('#penergy').html(this.value);
        });
        var energy = $("#energy").val()
        $('#sleep').on('input', function() {
            $(this).next('#psleep').html(this.value);
        });
        var sleep = $("#sleep").val()
        $('#pain').on('input', function() {
            $(this).next('#ppain').html(this.value);
        });
        var pain = $("#pain").val()
        var description = $('textarea#description').val();
        $.ajax({
            type:'POST',
            url:post_url,
            data:{
                weight:weight,
                energy:energy,
                sleep:sleep,
                pain:pain,
                description:description,
            },
            success:function()
            {
                location.reload();
            }
        })
    } else if (formId == "delete_injury"){
        var post_url = '/submit_delete';
        $.ajax({
          type:'POST',
          url:post_url,
          data:{
            injury_id:$("#injury_id_delete").val(),
          },
          success:function()
          {
            location.reload();
          }
        })
    } /*else if (formId == "compare_select"){
        var selected = [];
        $('#compare_players input:checked').each(function() {
            selected.push(parseInt($(this).val()));
        });
        var variable = $('#compare_variables input:checked').val();
        $('#post_url').prop('value', selected);
        $('#render_variable').prop('value', variable);
        var post_url = '/staff/compare';
        $.ajax({
          type:'POST',
          url:post_url,
          data: {
              sel: $('#post_url').val(),
              vari: $('#render_variable').val(),
          },
        })
    }*/
    // Do stuff
    return false;
  })

function ini () {
    /* Get Date 
    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.getElementById("date").innerHTML = "Today's date is: " + d + "-" + m + "-" + y;
    */

    $('#energy').on('input', function() {
        $(this).next('#penergy').html(this.value);
    });
    $('#sleep').on('input', function() {
        $(this).next('#psleep').html(this.value);
    });
    $('#pain').on('input', function() {
        $(this).next('#ppain').html(this.value);
    });
    
    var table = $('#myTable').DataTable();
    // Event listener to the two range filtering inputs to redraw on input
    $('#min_min, #max_min').keyup( function() {
        table.draw();
    } );
    $('#min_dist, #max_dist').keyup( function() {
        table.draw();
    } );
    $('#min_hsr, #max_hsr').keyup( function() {
        table.draw();
    } );
    $('#min_hmld, #max_hmld').keyup( function() {
        table.draw();
    } );
    $('#min_acce, #max_acce').keyup( function() {
        table.draw();
    } );
    $('#min_dece, #max_dece').keyup( function() {
        table.draw();
    } );
    $('#min_spee, #max_spee').keyup( function() {
        table.draw();
    } );
    $('#min_coll, #max_coll').keyup( function() {
        table.draw();
    } );

    $("#check").click(enable_recovered);

    $(".edit").click(enable_edit_date);
}

/* Begins table matches */
function filter_op() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
        }
    }
}
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
            }
        } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
            }
        }
        }
        if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
        } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
        }
        }
    }
}
/* Ends table matches*/

/* Begin table filters */
$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min_min = parseInt( $('#min_min').val(), 10 );
        var max_min = parseInt( $('#max_min').val(), 10 );
        var mins = parseFloat( data[2] ) || 0; // use data for the age column
        if ( ( isNaN( min_min ) && isNaN( max_min ) ) ||
             ( isNaN( min_min ) && mins <= max_min ) ||
             ( min_min <= mins   && isNaN( max_min ) ) ||
             ( min_min <= mins   && mins <= max_min ) )
        {
            return true;
        }

        return false;
    });

$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min_dist = parseInt( $('#min_dist').val(), 10 );
        var max_dist = parseInt( $('#max_dist').val(), 10 );
        var dist = parseFloat( data[3] ) || 0; // use data for the age column
        if ( ( isNaN( min_dist ) && isNaN( max_dist ) ) ||
             ( isNaN( min_dist ) && dist <= max_dist ) ||
             ( min_dist <= dist   && isNaN( max_dist ) ) ||
             ( min_dist <= dist   && dist <= max_dist ) )
        {
            return true;
        }
        return false;
    }
);

$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min_hsr = parseInt( $('#min_hsr').val(), 10 );
        var max_hsr = parseInt( $('#max_hsr').val(), 10 );
        var hsr = parseFloat( data[4] ) || 0; // use data for the age column
        if ( ( isNaN( min_hsr ) && isNaN( max_hsr ) ) ||
             ( isNaN( min_hsr ) && hsr <= max_hsr ) ||
             ( min_hsr <= hsr   && isNaN( max_hsr ) ) ||
             ( min_hsr <= hsr   && hsr <= max_hsr ) )
        {
            return true;
        }
        return false;
    }
);

$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min_hmlt = parseInt( $('#min_hmlt').val(), 10 );
        var max_hmlt = parseInt( $('#max_hmld').val(), 10 );
        var hmlt = parseFloat( data[5] ) || 0; // use data for the age column
        if ( ( isNaN( min_hmlt ) && isNaN( max_hmlt ) ) ||
             ( isNaN( min_hmlt ) && hmlt <= max_hmlt ) ||
             ( min_hmlt <= hmlt   && isNaN( max_hmlt ) ) ||
             ( min_hmlt <= hmlt   && hmlt <= max_hmlt ) )
        {
            return true;
        }
        return false;
    }
);

$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min_acce = parseInt( $('#min_acce').val(), 10 );
        var max_acce = parseInt( $('#max_acce').val(), 10 );
        var acce = parseFloat( data[6] ) || 0; // use data for the age column
        if ( ( isNaN( min_acce ) && isNaN( max_acce ) ) ||
             ( isNaN( min_acce ) && acce <= max_acce ) ||
             ( min_acce <= acce   && isNaN( max_acce ) ) ||
             ( min_acce <= acce   && acce <= max_acce ) )
        {
            return true;
        }
        return false;
    }
);

$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min_dece = parseInt( $('#min_dece').val(), 10 );
        var max_dece = parseInt( $('#max_dece').val(), 10 );
        var dece = parseFloat( data[7] ) || 0; // use data for the age column
        if ( ( isNaN( min_dece ) && isNaN( max_dece ) ) ||
             ( isNaN( min_dece ) && dece <= max_dece ) ||
             ( min_dece <= dece   && isNaN( max_dece ) ) ||
             ( min_dece <= dece   && dece <= max_dece ) )
        {
            return true;
        }
        return false;
    }
);

$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min_spee = parseInt( $('#min_spee').val(), 10 );
        var max_spee = parseInt( $('#max_spee').val(), 10 );
        var spee = parseFloat( data[8] ) || 0; // use data for the age column
        if ( ( isNaN( min_spee ) && isNaN( max_spee ) ) ||
             ( isNaN( min_spee ) && spee <= max_spee ) ||
             ( min_spee <= spee   && isNaN( max_spee ) ) ||
             ( min_spee <= spee   && spee <= max_spee ) )
        {
            return true;
        }
        return false;
    }
);

$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min_coll = parseInt( $('#min_coll').val(), 10 );
        var max_coll = parseInt( $('#max_coll').val(), 10 );
        var coll = parseFloat( data[9] ) || 0; // use data for the age column
        if ( ( isNaN( min_coll ) && isNaN( max_coll ) ) ||
             ( isNaN( min_coll ) && coll <= max_coll ) ||
             ( min_coll <= coll   && isNaN( max_coll ) ) ||
             ( min_coll <= coll   && coll <= max_coll ) )
        {
            return true;
        }
        return false;
    }
);
/* End table filters */


/* Begin enable recovered injury field */
function enable_recovered() {
    if (this.checked) {
      $("input#recovered").removeAttr("disabled");
    } else {
      $("input#recovered").attr("disabled", true);
    }
  }
/* End enable recovered injury field */

/* Begin enable edit date recovered  */
function enable_edit_date() {
    if (this.checked) {
      $("input#edit_recovered").removeAttr("disabled");
      $("input#injury_id").attr("value", this.value);
      $("input#injury_id_delete").attr("value", this.value);
    } else {
      $("input#edit_recovered").attr("disabled", true);
    }
  }
/* End enable edit date recovered */

/* Advanced Stats */
function adv_stats() {
    var x = document.getElementById("filters");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function show_acc100() {
    var x = document.getElementById("acc100");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function show_coll10() {
    var x = document.getElementById("coll10");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function show_coll100() {
    var x = document.getElementById("coll100");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function show_accDec() {
    var x = document.getElementById("accDec");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function show_accDecCol() {
    var x = document.getElementById("accDecCol");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
/* End Advanced Stats */
