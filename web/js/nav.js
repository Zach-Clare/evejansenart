let titleVisibilityController = [];

window.onload = (e) => {
}

function evaluateTitleVisibility() {
    console.log("changed");
    console.log(titleVisibilityController);
}


// Enacts changes on the titleVisibilityController array.
/*
Additions to the array can only be made if the value does not already exist.
Removals from the array can only be made if the value exists in the array (obviously).
This function essentially implements a singleton pattern within the array, similar to the way dictionary keys are singletons.
A dictionary wasn't used here because...it wasn't. :)
*/
function adjustSingletonArray(key, array, add) {
    const index = array.indexOf(key);
    if (index < 0 && add) { // add key if it doesn't exist already
        array.push(key);
    } else if (index > -1 && !add) { // remove key if it exists and the function has been told to
        array.splice(index, 1);
    }

    evaluateTitleVisibility();
}

function toggleNav() {

    let front = false;
    if (window.location.pathname == "/") {
        front = true;
    }

    var hidden;
    if (document.getElementById("nav__main").classList.contains("d-none")) {
        // currently hidden
        hidden = true;
    } else {
        // currently showing
        hidden = false;
    }

    // show/hide menu
    document.getElementById("nav__main").classList.toggle("d-none");
    document.getElementById("nav__main").classList.toggle("nav__mobile-menu");

    var hero = null;
    try {
        var title = document.getElementById("hero__title--mobile");
        if (title.style.display == "none") {
            title = document.getElementById("hero__title");
        }
        hero = visible(title);
    } catch {
        
    }

    if (hidden) { // menu is going to be shown
        showTitle(front);
    } else if (!hidden && !hero) {
        hideTitle(front);
    } else if (!hidden && hero) {
        showTitle(front);
    }

    // toggle icon between bars and X
    document.getElementById("nav__burger-icon").classList.toggle("fa-bars");
    document.getElementById("nav__burger-icon").classList.toggle("fa-xmark");
    document.getElementById("nav__burger-icon").classList.toggle("rotate");
}

window.addEventListener("scroll", function() {

    let front = false;
    if (window.location.pathname == "/") {
        front = true;
    }

    try {
        var title = document.getElementById("hero__title--mobile");
        var titleStyles = this.getComputedStyle(title);
        if (titleStyles.display == "none") {
            title = document.getElementById("hero__title");
        }
    } catch {

    }
    
    if (visible(title)) {
        showTitle(front);
        enact("scroll", titleVisibilityController, true);
    } else {
        hideTitle(front);
        enact("scroll", titleVisibilityController, false);
    }
});

function hideTitle(front) {

    if (front) {
        // document.getElementById("nav__site-title--mobile").style.opacity = 0;
        document.getElementById("nav__site-title--mobile").classList.add("nav__site-title--mobile-hidden");
        document.getElementById("nav__site-title").style.opacity = 0;

        // remove filled in class for mobile
        document.getElementById("nav__mobile-bar").classList.remove("nav__mobile-bar--filled");
    }
    
    // remove filled in class
    document.getElementById("nav__main").classList.remove("nav__main--scrolled");

    try {
        document.getElementById("filter").classList.add("pt-4");
    } catch {

    }
    
}

function showTitle() {
    
    // document.getElementById("nav__site-title--mobile").style.opacity = 1;
    document.getElementById("nav__site-title--mobile").classList.remove("nav__site-title--mobile-hidden");
    document.getElementById("nav__site-title").style.opacity = 1;
    

    // add filled in class
    document.getElementById("nav__mobile-bar").classList.add("nav__mobile-bar--filled");
    document.getElementById("nav__main").classList.add("nav__main--scrolled");

    try {
        document.getElementById("filter").classList.remove("pt-4");
    } catch {
        
    }
}

function visible(targetElement) {
    return this.window.scrollY > (targetElement.offsetTop + targetElement.offsetHeight);
}