function toggleNav() {

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
        var title = document.getElementById("hero__title--mobile");
        var titleStyles = this.getComputedStyle(title);
        if (titleStyles.display == "none") {
            title = document.getElementById("hero__title");
        }
    } catch {

    }
    
    if (visible(title)) {
        showTitle();
    } else {
        hideTitle();
    }
});

function hideTitle() {
    document.getElementById("nav__site-title--mobile").style.opacity = 0;
    document.getElementById("nav__site-title").style.opacity = 0;

    // remove filled in class
    document.getElementById("nav__mobile-bar").classList.remove("nav__mobile-bar--filled");
    document.getElementById("nav__main").classList.remove("nav__main--scrolled");

    document.getElementById("filter").classList.add("pt-4");
}

function showTitle() {
    document.getElementById("nav__site-title--mobile").style.opacity = 1;
    document.getElementById("nav__site-title").style.opacity = 1;

    // add filled in class
    document.getElementById("nav__mobile-bar").classList.add("nav__mobile-bar--filled");
    document.getElementById("nav__main").classList.add("nav__main--scrolled");

    document.getElementById("filter").classList.remove("pt-4");
}

function visible(targetElement) {
    return this.window.scrollY > (targetElement.offsetTop + targetElement.offsetHeight);
}