




/* ==================== */
  // HEADER
/* ==================== */

/* 
  ANOUNCEMENT BAR
*/
document.addEventListener("DOMContentLoaded", () => {
  const announcementBar = document.querySelector(".announcement__bar");
  const announcementContent = Array.from(announcementBar.children);

  announcementContent.forEach(i => {
    const duplicatedItem = i.cloneNode(true);
    duplicatedItem.setAttribute("aria-hidden", true);
    announcementBar.appendChild(duplicatedItem)
  })
})


/* 
  OPEN & CLOSE MENU
*/
const menuBtn = document.querySelector(".menu__icon");
const navList = document.querySelector(".nav__list");
const header  = document.querySelector(".header");
// const body = document.body;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu () {
  const isOpen = menuBtn.classList.toggle("open");
  navList.classList.toggle("nav__hidden");
  header.classList.toggle("active-state");
  document.querySelector(".logo img").src = "https://framerusercontent.com/images/2hmyf0F7i4RXrF0rxEc4Wv7IHA.svg";

  if (!isOpen) {
    document.querySelector(".logo img").src = "https://framerusercontent.com/images/1g6P50scDphvftPgEAObATb50HI.svg";
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
