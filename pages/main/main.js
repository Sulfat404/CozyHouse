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
let popupWrapper;



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
let shuffledArrsForRender

function initCards() {
  cards = checkWindowSizeForGallary();
  shuffledArrs = createPseudorandomArr(cards);
  shuffledArrsForRender = shuffledArrs.slice(0, cards);
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

// popup

let numOfCard;

// Обработчик event для событий клика кнопок и появления popup
document.addEventListener("click", (e) => {
  let petsName = e.target.closest('.card');
  let btnName = e.target.closest(".btn-circle_pMain")
  if (petsName === null) {
    if (btnName !== null) {
      initCards();
      return;
    }
    return;
  }
  numOfCard = 0;
  while(numOfCard < shuffledArrsForRender.length) {
    if(petsName.id === shuffledArrsForRender[numOfCard].name) {
      renderPopup();
      break;
    }
    numOfCard++
  }
})



document.addEventListener("click", (e) => {
  let name = e.target;
  if(name.id === 'popupWrapper' || name.id === "btnPopupClose") {
    closePopup();
  }
})


function renderPopup() {
  body.classList.add("noscroll");
  body.innerHTML += `    <div id="popupWrapper" class="popup__wrapper">
  <div class="popup">
    <div id="btnPopupClose" class="btnClose__wrapper">
      <svg id="btnPopupClose" width="52" height="52" class="popup__btnClose">
        <use id="btnPopupClose" xlink:href="../../assets/icons/svgSprie.svg#popupBtn"></use>
      </svg>
    </div>
    <div class="popup__img">
      <img src="${shuffledArrsForRender[numOfCard].img}" alt="${shuffledArrsForRender[numOfCard].name}">
    </div>
    <div class="popup__content">
      <h2 class="title">${shuffledArrsForRender[numOfCard].name}</h2>
      <h3 class="subtitle">${shuffledArrsForRender[numOfCard].breed}</h3>
      <p>${shuffledArrsForRender[numOfCard].description}</p>
      <ul>
        <li class="popup__item"><b>Age: </b>${shuffledArrsForRender[numOfCard].age}</li>
        <li class="popup__item"><b>Inoculations: </b>${shuffledArrsForRender[numOfCard].inoculations}</li>
        <li class="popup__item"><b>Diseases: </b>${shuffledArrsForRender[numOfCard].diseases}</li>
        <li class="popup__item"><b>Parasites: </b>${shuffledArrsForRender[numOfCard].parasites}</li>
      </ul>
    </div>
  </div>`
  popupWrapper = document.querySelector(".popup__wrapper");
}

function closePopup() {
  popupWrapper.remove();
  body.classList.remove("noscroll");
}





