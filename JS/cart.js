export let cart = JSON.parse(localStorage.getItem('cart'))  || [];


const cartGrid = document.querySelector(".cart__body .cart__grid");
const isEmpty = document.querySelector(".cart__body .empty");


function updateCart() {
  // localStorage.setItem('cart', JSON.stringify(cart));
  // cartGrid.innerHTML =  generateCartHtml(cart);
}


function generateCartHtml(arr) {
  // if (!arr.length) {
  //   isEmpty.innerHTML += `
  //     <h3>Your Cart is Empty</h3>
  //     <h4>There are no items in your cart.</h4>
  //   `;
  //   return ''
  // } else isEmpty.innerHTML = '';

  let cartHtml = '';
  arr.forEach(item => {
    const {img, title, price, size, quantity} = item;

    cartHtml += `
      <div class="cart__product ">
        <div class="pdt__img">
          <img src=${img} alt="">
        </div>

        <div class="pdt__info">
          <div>
            <span>${title}</span>
            <span>$${price}</span>
          </div>
          <div class="size-color">${size}</div>
          <div>
            <div class="quantity">
              <button class="plus"><i class="ri-add-line"></i></button>
              <div>${quantity}</div>
              <button class="minus"><i class="ri-subtract-line"></i></button>
            </div>
            <button class="delete"><i class="ri-close-large-line"></i></button>
          </div>
        </div>
      </div>
    `
  });
  return cartHtml;
}


updateCart();