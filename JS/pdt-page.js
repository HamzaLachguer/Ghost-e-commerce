import {cart} from "./cart.js";
/* 
  -- PRODUCT PAGE --
____________________  */

const clikedPdt = JSON.parse(localStorage.getItem('clickedPdt'))

const {id, title, category, price, imgs, details, size} = clikedPdt;

/* img slider */
const imgSlider = document.querySelector(".img__slider");
const pdtImgGrid = document.querySelector(".pdt__imgs");
const toggleSlider = document.querySelector(".toggling-dots");

const viewportWidth = window.innerWidth;

let currSlide = 0;

imgs.forEach((img, index) => {
  const imgContainer = document.createElement("div");
  imgContainer.setAttribute("class", "img__cont");

  imgContainer.innerHTML = `<img src="${img}" alt="${title} image">`;
  pdtImgGrid.append(imgContainer)

  // Creating dots
  const dot = document.createElement("div");
  dot.setAttribute("class", "dot");
  dot.dataset.index = index;
  toggleSlider.append(dot);
  if (index === 0) dot.classList.add("active");

  dot.addEventListener('click', () => {
    shift(index);
  })
})

// Creating the go to  slide function
function shift(slideIndex) {
  
  if (viewportWidth < 810) {
    currSlide = slideIndex;
    dotsUpdate();
    pdtImgGrid.style.transform = `translateX(calc(-${slideIndex * 100}% - ${6}px))`;
  } else if (viewportWidth > 810) {
    pdtImgGrid.style.transform = `translateY(-${slideIndex * 100}%)`;
    currSlide = slideIndex;
    dotsUpdate();
  }
}

function dotsUpdate() {
  const dotList = document.querySelectorAll(".dot");

  dotList.forEach((d, i) => {
    d.classList.remove("active");

    if (currSlide === i) d.classList.add("active");
  })
}

/* product info */
const pdtInfo = document.querySelector(".product__info");


function sizeHtml(size) {
  let html = '';
  size.forEach(s => {
    html += `<div class="size">${s}</div>`
  });
  return html;
}

pdtInfo.innerHTML = `
  <div>
    <h4>${category}</h4>
    <h2>${title}</h2>
    <h3>$${price}</h3>
  </div>

  <div>
    <div class="quantity">
      <button class="plus"><i class="ri-add-line"></i></button>
      <div class="selected-quantity">1</div>
      <button class="minus"><i class="ri-subtract-line"></i></button>
    </div>
    <div class="size__grid">
    </div>
  </div>

  <div class="cart">
    <button class="btn btn-active add-cart">Add to Cart</button>
    <button class="btn add-cart">Buy Now</button>

    <div class="payment">
      <div>
        <img src="https://logowik.com/content/uploads/images/visa-new-20215093.jpg" alt="">
      </div>
      <div>
        <img src="https://logowik.com/content/uploads/images/google-pay.jpg" alt="">
      </div>
      <div>
        <img src="https://logowik.com/content/uploads/images/paypal-icon-202427932.logowik.com.webp" alt="">
      </div>
      <div>
        <img src="https://www.logo.wine/a/logo/Apple_Pay/Apple_Pay-White-Dark-Background-Logo.wine.svg" alt="">
      </div>
      <div>
        <img src="https://www.logo.wine/a/logo/American_Express/American_Express-Logo.wine.svg" alt="">
      </div>
    </div>
  </div>

  <div class="dropdown__list">
    <div class="dropdown ">
      <div>
        <h3>Details</h3>
        <span><i class="ri-arrow-down-s-line"></i></span>
      </div>

      <div class="dropdown__text">
        <p>${details}</p>
      </div>
    </div>

    <div class="dropdown ">
      <div>
        <h3>Shipping</h3>
        <span><i class="ri-arrow-down-s-line"></i></span>
      </div>

      <div class="dropdown__text">
        <p>Our products are typically shipped within 5-10 business days, however there may be slight delays when demand is high. We offer free global shipping on orders over $100.</p>
      </div>
    </div>
    
  </div>
`;

const sizeGrid =document.querySelector(".size__grid")
sizeGrid.innerHTML = sizeHtml(size);

// Drop down
const dropdownArray = Array.from(document.querySelector(".dropdown__list").children)

dropdownArray.forEach(item => {
  const header = item.querySelector("div:first-child");
  
  header.addEventListener('click', () => {
    dropdownArray.forEach(i => {
      if (!i === item) i.classList.remove("drop")
    })

    item.classList.toggle("drop");
  })
})

// Select a size
const sizeClick = [...document.querySelectorAll(".size__grid .size")];

sizeClick.forEach(x => {
  x.addEventListener('click', () => {
    sizeClick.forEach(si => si.classList.remove("select"));

    x.classList.add("select")
  })
})

// Quantity increment - decrement
const plusBtn = document.querySelector(".quantity .plus");
const minusBtn = document.querySelector(".quantity .minus");
const quantity =document.querySelector(".quantity div");

plusBtn.addEventListener('click', increment);
minusBtn.addEventListener('click', decrement);

function increment() {

  quantity.textContent = 1 + Number(quantity.textContent);
}

function decrement() {

  if (Number(quantity.textContent) >= 1) {
    quantity.textContent = Number(quantity.textContent) - 1;
  } else return
}


// ADD TO CART
const addToCartBtn = document.querySelector(".add-cart");
addToCartBtn.addEventListener('click', () => {
  const selectedSize = sizeClick.find(s => s.classList.contains("select"));
  const selectedQuantity = document.querySelector(".selected-quantity").textContent;
  if (selectedSize) {
    const isPdtInCart = cart.find(p => p.id === id && p.size === selectedSize.textContent);
    if (!isPdtInCart) {
      cart.push({
        id: id,
        title: title,
        price: price,
        img: imgs[0],
        size: selectedSize.textContent,
        quantity: Number(selectedQuantity)
      })
    } else isPdtInCart.quantity += Number(selectedQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart)
    
  } else console.log("Please select a size");
})


