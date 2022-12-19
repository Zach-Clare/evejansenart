function toggleNav() {

    // show/hide menu
    document.getElementById("nav__main").classList.toggle("d-none");
    document.getElementById("nav__main").classList.toggle("nav__mobile-menu");

    // toggle icon between bars and X
    document.getElementById("nav__burger-icon").classList.toggle("fa-bars");
    document.getElementById("nav__burger-icon").classList.toggle("fa-xmark");
}