import arrOfPets from "../../assets/data/pets.js";

const burger = document.querySelector(".burger__wrapper-sticks");
const header = document.querySelector(".header");
const navBar = document.querySelector(".navbar__list");
const navBarItems = document.querySelectorAll(".navbar__item");
let body = document.querySelector(".body")

// buttons
const btnRigth_Step = document.querySelector(".btn-circle__right");
const btnLeft_Step = document.querySelector(".btn-circle__left");

//Для поп-апа
let setOfCards; 
let popup;





burger.addEventListener("click", burgerOpen);
window.addEventListener("resize", checkWindowSize);
navBarItems.forEach((navBarItem) => {
  navBarItem.addEventListener("click", burgerClose);
});
btnRigth_Step.addEventListener("click", moveGallaryOneStep);
btnLeft_Step.addEventListener("click", moveGallaryOneStep);


// Cards begin
let shuffledArrs;
let cards;
let pages;
let btnStep = 1;

function initCards() {
  cards = checkWindowSizeForGallary();
  shuffledArrs = createPseudorandomArr(cards);
  let shuffledArrsForRender = shuffledArrs.slice(0, cards);
  generateCard(shuffledArrsForRender);
}

initCards();

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
  body.classList.add("noscroll");
  burger.classList.add("header-open");
  navBar.classList.add("header-open");
  header.classList.add("header-open");
}

function burgerClose() {
  let arrOfOpenElem = document.querySelectorAll(".header-open");
  arrOfOpenElem.forEach((elem) => {
    elem.classList.remove("header-open");
    
  });
  body.classList.remove("noscroll");

}

function checkWindowSize() {
  let windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth > 768) {
    burgerClose();
  }
}


// gallary
function checkWindowSizeForGallary() {
  let windowInnerWidth = document.documentElement.clientWidth;
  let cards;
  if (1280 <= windowInnerWidth) {
    cards = 3;
  } else if (768 <= windowInnerWidth && windowInnerWidth <= 1280) {
    cards = 2;
  } else { // 768 > windowInnerWidth
    cards = 1;
  }
  return cards;
}

function createPseudorandomArr(cards) {
  // Берет массив объектов из data.js, рандомизирует и конкатинирует в один псевдослучайный массив
  let shuffledArrs = [];
  let shuffleArr = arrOfPets
  .map((i) => [Math.random(), i])
  .sort()
  .map((i) => i[1]);
  shuffledArrs = shuffledArrs.concat(shuffleArr.slice(0, cards));
  return shuffledArrs;
}


function generateCard(shuffledArrsForRender) {
  const gallaryItems = document.querySelector(".gallary__items_pMain");
  gallaryItems.innerHTML = "";
  for (let card = 1; card <= shuffledArrsForRender.length; card++) {
    gallaryItems.innerHTML += `<div class="card card_pMain" id="${shuffledArrsForRender[card - 1].name}">
              <div>
                  <img src=${shuffledArrsForRender[card - 1].img} alt="${shuffledArrsForRender[card-1].name}">
              </div>
              <p class="title card__subtitle">${shuffledArrsForRender[card - 1].name}</p>
              <button class="btn__style-transparent">Learn more</button>
          </div>`;
  }
  setOfCards = document.querySelectorAll(".card_pMain");
}


function moveGallaryOneStep() {
  initCards()
}


function closePopup() {
  body.classList.remove("noscroll");
  popup.remove();
}

document.addEventListener("click", (e) => {
  let petsName = e.target.closest('.card');
  console.log(petsName.id);
  for (let i = 0; i < setOfCards.length; i++) {
    if(petsName.id === setOfCards.id[i]) {
      renderPopup(e, i);
    }
  }
})


// popup
function renderPopup(e, i) {
  body.classList.add("noscroll");
  body.innerHTML += `    <div class="popup__wrapper">
  <div class="popup">
    <div class="btnClose__wrapper">
      <svg width="62" height="62" class="popup__btnClose">
        <use xlink:href="../../assets/icons/svgSprie.svg#popupBtn"></use>
      </svg>
    </div>
    <div class="popup__img">
      <img src="../../assets/images/jennifer.jpg" alt="jennifer">
    </div>
    <div class="popup__content">
      <h2 class="title">Jennifer</h2>
      <h3 class="subtitle">Dog - Labrador</h3>
      <p>Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.</p>
      <ul>
        <li class="popup__item">Age:</li>
        <li class="popup__item">Inoculations:</li>
        <li class="popup__item">Diseases:</li>
        <li class="popup__item">Parasites:</li>
      </ul>
    </div>
  </div>`
}





