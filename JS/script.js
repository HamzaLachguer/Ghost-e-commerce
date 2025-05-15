




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

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu () {
  const isOpen = menuBtn.classList.toggle("open");
  navList.classList.toggle("nav__hidden");

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