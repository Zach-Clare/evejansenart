// I can understand how this might be confusing, so if you have any questions, you
// can email me here: zach@helixsoftware.uk

// State Management
/*  
These attributes measure the current state of the system. 

titleVisibilityController will contain all the reasons why the title should remain visible.
In other words, if that array is empty, the title should be hidden and vice versa. 

menuOpen is simple enough. The burger menu button operates with onClick(), so the same
function will be called every time (toggleNav()). This variable allows it to know which
actions (towards hiding or towards showing) to take.
*/
let titleVisibilityController = [];
let menuOpen = false;

// The title should always be visible when not on the homepage
window.onload = (e) => {
    if (window.location.pathname != "/") {
        titleVisibilityController.push("nonhomepage");
    }
}

// This function checks the controller array and makes adjustments to the title visibility accordingly
// This is the main controller watcher
/*
If the controller array is empty, it will hide the title and make the title bar transparent.
If it isn't empty, it will make sure the title is visible and that the nav bar is filled in.
*/
function evaluateTitleVisibility() {
    if (titleVisibilityController.length == 0) {
        hideTitle2();
        transparentBar();
    } else {
        showTitle2();
        fillBar();
    }
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


// Adjustment functions - these functions simply fulfill the wishes of the other parts of the system.

function hideTitle2() {
    document.getElementById("nav__site-title--mobile").classList.add("nav__site-title--mobile-hidden"); // hide mobile title
    document.getElementById("nav__site-title").classList.add("nav__site-title--hidden"); // hide desktop title

    try { // this handles padding issues with the sticky filter
        document.getElementById("filter").classList.add("pt-4");
    } catch {
        
    }
}

function showTitle2() {
    document.getElementById("nav__site-title--mobile").classList.remove("nav__site-title--mobile-hidden"); // show mobile title
    document.getElementById("nav__site-title").classList.remove("nav__site-title--hidden"); // show desktop title

    try { // this handles padding issues with the sticky filter
        document.getElementById("filter").classList.remove("pt-4");
    } catch {
        
    }
}

function fillBar() {
    document.getElementById("nav__mobile-bar").classList.add("nav__mobile-bar--filled"); // fill mobile bar
    document.getElementById("nav__main").classList.add("nav__main--filled"); // fill desktop bar
}
function transparentBar() {
    document.getElementById("nav__mobile-bar").classList.remove("nav__mobile-bar--filled"); // remove mobile bar background
    document.getElementById("nav__main").classList.remove("nav__main--filled"); // remove desktop bar background
}



// Decider functions
/*
These functions contain logic about when parts of the menu should be hidden or shown.
*/
window.addEventListener("scroll", function() {

    if (window.location.pathname == "/") { // Because the hero element only ever lives on the homepage
        try { // and even then, we may not have a hero element for some reason
            var title = document.getElementById("hero__title--mobile");
            var titleStyles = this.getComputedStyle(title);
            if (titleStyles.display == "none") {
                title = document.getElementById("hero__title");
            }
            if (visible2(title)) {
                adjustSingletonArray("scroll", titleVisibilityController, true); // give the controller a reason to show the title up top
            } else {
                adjustSingletonArray("scroll", titleVisibilityController, false); // remove the visibility reasoning
            }

        } catch {
            // This can be empty - if there's no hero element it's no big deal, we don't reall need to think about it (I don't think)
        }
    }
});

function toggleNav() {

    // show/hide menu elements
    document.getElementById("nav__main").classList.toggle("d-none");
    document.getElementById("nav__main").classList.toggle("nav__mobile-menu");

    // show title via controller
    adjustSingletonArray("menu", titleVisibilityController, !menuOpen);

    animateBurger();

    // flip state so that we know where we are next time we need to adjust the array in a particular direction
    if (menuOpen) {
        menuOpen = false;
    } else {
        menuOpen = true;
    }
}

// Helper functions
/* 
These guys are just here to hide "boring" (see: irrelevent) or distracting code
*/if (visible2(title)) {
    adjustSingletonArray("scroll", titleVisibilityController, true); // give the controller a reason to show the title up top
} else {
    adjustSingletonArray("scroll", titleVisibilityController, false); // remove the visibility reasoning
}
// returns true if element is visible to the clinet on the page
function visible2(targetElement) {
    return this.window.scrollY > (targetElement.offsetTop + targetElement.offsetHeight);
}

// // Toggles icon between burger menu and X
function animateBurger() {
    document.getElementById("nav__burger-icon").classList.toggle("fa-bars");
    document.getElementById("nav__burger-icon").classList.toggle("fa-xmark");
    document.getElementById("nav__burger-icon").classList.toggle("rotate");
}