




/* ==================== */
  // HEADER
/* ==================== */

/* 
  ANOUNCEMENT BAR
*/
window.addEventListener('DOMContentLoaded', () => {
  const scroller = document.querySelector(".scroller");
  const bar = document.querySelector(".announcement__bar");
  const barItems = Array.from(bar.children);

  // position the duplicate content
  barItems.forEach(i => {
    const duplicate = i.cloneNode(true);
    duplicate.setAttribute("aria-hidden", true);
    bar.appendChild(duplicate);
  })
})


/* 
  OPEN & CLOSE MENU
*/
const menuBtn = document.querySelector(".menu__icon");
const navList = document.querySelector(".nav__list");
// const body = document.body;
const windowWidth = window.innerWidth;
const header = document.querySelector(".header");

const logo = document.querySelector(".logo img")

/* logo versions */
const logoBlack = "https://framerusercontent.com/images/2hmyf0F7i4RXrF0rxEc4Wv7IHA.svg";
const logoWhite = "https://framerusercontent.com/images/1g6P50scDphvftPgEAObATb50HI.svg";

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu () {
  const isOpen = menuBtn.classList.toggle("open");
  navList.classList.toggle("nav__hidden");
  
  if (isOpen && windowWidth < 810) {
    header.classList.remove("active-state");
    logo.src = logoBlack;
  } 

  menuBtn.setAttribute("aria-expanded", isOpen);
  navList.setAttribute("aria-hidden", !isOpen);
}

// set aria attributes
menuBtn.setAttribute("aria-label", "toggle navigation menu");
menuBtn.setAttribute("aria-expanded", "false");
menuBtn.setAttribute("aria-controls", "nav-list");
navList.setAttribute("aria-hidden", "true");
navList.id = "nav-list";


/* 
  REMOVING THE"ACTIVE-STATE" FROM THE HEADER
*/
const heroHeight = document.querySelector(".hero").offsetHeight;

window.addEventListener('scroll', () => {
  if (!menuBtn.classList.contains("open")) {
    let scrollPositionY = window.scrollY || window.pageYOffset;
    if (scrollPositionY >= heroHeight) {
      header.classList.remove("active-state");
      logo.src = logoBlack;
    } else {
      header.classList.add("active-state");
      logo.src = logoWhite;
    }
  }
})





/* ==================== */
  // REVIEW SLIDER
/* ==================== */
const slider = document.querySelector(".rev")
const reviewArray = [...slider.querySelectorAll(".review")];
const dotsArray = Array.from(document.querySelector(".toggling__dots").children);

const nexBtn = document.querySelector(".right");
const preBtn = document.querySelector(".left");

let currentSlide = 0;
// goToSlide
const updateDots = () => {
  dotsArray.forEach((dot, index) => {
    currentSlide === index
    ? dot.classList.add("selected")
    : dot.classList.remove("selected")
  })
}

const goToSlide = (slideIndex) => {
  const reviewWidth = reviewArray[0].getBoundingClientRect().width;
  const gap = parseInt(window.getComputedStyle(slider).gap) || 12;
  const translateValue = slideIndex * (reviewWidth + gap) ;

  slider.style.transform = `translateX(-${translateValue}px)`;
  currentSlide = slideIndex;
  updateDots(slideIndex);
}

nexBtn.addEventListener('click', () => {
  currentSlide === reviewArray.length - 1
    ? goToSlide(0)
    : goToSlide(currentSlide + 1)
})

preBtn.addEventListener('click', () => {
  currentSlide === 0
    ? goToSlide(reviewArray.length - 1)
    : goToSlide(currentSlide - 1)
})

dotsArray.forEach(dot => {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.dataset.dot);
    goToSlide(slideIndex)
  })
})

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth >= 810) {
    slider.style.transform = 'none';
  } else {
    goToSlide(currentSlide);
  }
});
