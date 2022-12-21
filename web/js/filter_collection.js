document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("filter__title-field").addEventListener("keyup", function(e){
        var value = e.target.value; // new input field value
        var pieces = document.getElementsByClassName("collection__piece");

        // pre-process filter value
        value = value.toLowerCase().replace(" ", "");

        if (value == "") { // if value empty
            for (var i = 0; i < pieces.length; i++) { // loop through all divs
                pieces[i].classList.remove("title-hidden"); // unhide them
            }
        } else { // if value ins't empty
            for (var i = 0; i < pieces.length; i++) { // loop through all divs
                if (!pieces[i].dataset.name.includes(value)) { // if value isnt somewhere in the name of the piece
                    pieces[i].classList.add("title-hidden"); // hide it
                }
            }
        }
    });


    // It's possible to do this next bit with PHP on the back end.
    // For now, it's easier for me to do it here. We'll see how much
    // of a problem it is. If it's majorly slowing down devices, we'll
    // change it.

    // Populate dropdown
    var pieces = document.getElementsByClassName("collection__piece");

    var years = {};
    for (var i = 0; i < pieces.length; i++) { // get all years
        years[pieces[i].dataset.year] = null;
    }

    years = Object.keys(years); // simplify array
    years.forEach(year => {
        var option = this.createElement("option");
        option.value = year;
        option.innerText = year;

        document.getElementById("filter__year-field").appendChild(option);
    });

    document.getElementById("filter__year-field").onchange = function(e) {
        if (e.target.value == "") { // make all divs visible
            for (var i = 0; i < pieces.length; i++) {
                pieces[i].classList.remove("year-hidden"); // show all
            }
        } else {
            for (var i = 0; i < pieces.length; i++) {
                if (pieces[i].dataset.year == e.target.value) {
                    pieces[i].classList.remove("year-hidden"); // show matches
                } else {
                    pieces[i].classList.add("year-hidden"); // hide mismatches
                }
            }
        }
    }
});
    