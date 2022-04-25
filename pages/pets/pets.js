import arrOfPets from "../../assets/data/pets.js";
console.log(arrOfPets[0].name);

// variables
let burger = document.querySelector(".burger__wrapper-sticks");
let sticks = document.querySelectorAll(".burger__stick");
let header = document.querySelector(".header");
let navBar = document.querySelector(".navbar__list");
let navBarItems = document.querySelectorAll(".navbar__item");


burger.addEventListener("click", burgerOpen);
window.addEventListener("resize", checkSize);
navBarItems.forEach((navBarItem) => {
  navBarItem.addEventListener("click", burgerClose);
});
window.addEventListener("load", loadPhotos);


if (burger.classList.contains("header-open")) {
  let windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth > 768) {
    burgerClose();
  }
}

function burgerOpen() {
  if (burger.classList.contains("header-open")) {
    return burgerClose();
  }
  burger.classList.add("header-open");
  navBar.classList.add("header-open");
  header.classList.add("header-open");
}

function burgerClose() {
  let arrOfOpenElem = document.querySelectorAll(".header-open");
  arrOfOpenElem.forEach((elem) => {
    elem.classList.remove("header-open");
  });
}

function checkSize() {
  let windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth > 768) {
    burgerClose();
  }
}

function loadPhotos() {
  let photos;
  let pages;
  let windowInnerWidth = document.documentElement.clientWidth;
  if (1280 <= windowInnerWidth) {
    photos = 8;
    pages = 6;
  } else if (768 <= windowInnerWidth <= 1280) {
    photos = 6;
    pages = 8;
  } else {
    photos = 3;
    pages = 16;
  }	

	let gallaryItems = document.querySelector(".gallary__items");
	for(let page = 1; page <= pages; page++) {
		console.log(`page: ${page}`)
		for (let photo = 1; photo <= photos; photo++) {
			console.log(photo)
			gallaryItems.innerHTML += `<div class="card card__pPets">
																		<div>
																				<img src=${arrOfPets[photo-1].img} alt="${arrOfPets[photo-1].name}">
																		</div>
																		<p class="title card__subtitle">${arrOfPets[photo-1].name}</p>
																		<button class="btn__style-transparent">Learn more</button>
																</div>`
		}
	}
}
