// variables
let burger = document.querySelector('.burger__wrapper-sticks');
let sticks = document.querySelectorAll('.burger__stick');
let header = document.querySelector('.header');
let navBar = document.querySelector('.navbar__list');
let navBarItems = document.querySelectorAll('.navbar__item');


burger.addEventListener('click', burgerOpen);
window.addEventListener('resize', checkSize);
navBarItems.forEach((navBarItem) => {
    navBarItem.addEventListener('click', burgerClose)
});


if (burger.classList.contains('header-open')) {
    let windowInnerWidth = document.documentElement.clientWidth;
    if (windowInnerWidth > 768) {
        console.log('burgerOpen')
        burgerClose();
    }
}


function burgerOpen() {

    if (burger.classList.contains('header-open')) {
        return burgerClose();
    }
    burger.classList.add('header-open');
    navBar.classList.add('header-open');
    header.classList.add('header-open');
}

function burgerClose() {
    console.log("'hh")
    let arrOfOpenElem = document.querySelectorAll('.header-open');
    arrOfOpenElem.forEach((elem) => {
        elem.classList.remove('header-open');
    })
}

function checkSize() {
    let windowInnerWidth = document.documentElement.clientWidth;
    if (windowInnerWidth > 768) {
        burgerClose();
    }
}

