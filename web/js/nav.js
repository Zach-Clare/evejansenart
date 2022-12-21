function toggleNav() {

    var hidden;
    if (document.getElementById("nav__main").classList.contains("d-none")) {
        // currently hidden
        hidden = true;
    } else {
        // currently showing
        hidden = false;
    }

    // // show/hide menu
    document.getElementById("nav__main").classList.toggle("d-none");
    document.getElementById("nav__main").classList.toggle("nav__mobile-menu");

    var hero = null;
    try {
        hero = heroVisible(document.getElementById("hero__title"));
    } catch {
        
    }

    if (hidden) { // menu is going to be shown
        showTitle();
    } else if (!hidden && !hero) {
        hideTitle();
    } else if (!hidden && hero) {
        showTitle();
    }

    // toggle icon between bars and X
    document.getElementById("nav__burger-icon").classList.toggle("fa-bars");
    document.getElementById("nav__burger-icon").classList.toggle("fa-xmark");
    document.getElementById("nav__burger-icon").classList.toggle("rotate");
}

window.addEventListener("scroll", function() {
    try {
        var targetElement = document.getElementById("hero__title");
    } catch {
        return;
    }
    
    if (heroVisible(targetElement)) {
        showTitle();
    } else {
        hideTitle();
    }
});

function hideTitle() {
    var siteTitle = document.getElementById("nav__site-title");
    siteTitle.classList.add("d-none");

    // remove filled in class
    document.getElementById("nav__mobile-bar").classList.remove("nav__mobile-bar--filled");
}

function showTitle() {
    var siteTitle = document.getElementById("nav__site-title");
    siteTitle.classList.remove("d-none");

    // add filled in class
    document.getElementById("nav__mobile-bar").classList.add("nav__mobile-bar--filled");
}

function heroVisible(targetElement) {
    return this.window.scrollY > (targetElement.offsetTop + targetElement.offsetHeight);
}