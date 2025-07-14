import {products} from './data.js'







/* 
  ***  HEADER  ***
____________________*/
const toggleBtn = document.querySelector(".burger__menu");
const navBar = document.querySelector(".nav__menu");

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle("close");
  navBar.classList.toggle("hide");
})





/* product grid */
document.querySelector(".product__grid")
  .innerHTML = generateHTML()

function generateHTML() {
  return products.map(pdt => {
    const {id, name, price, desc, imgSrc} = pdt;
    return `
      <div class="pdt__card" data-product-id=${id}>
        <div class="pdt__img">
          <img src=${imgSrc[0]} alt="">
        </div>

        <article>
          <div>
            <h3>${name}</h3>
            <h4>$${price}</h4>
          </div>
          <p>${desc}</p>
        </article>
      </div>    
    `
  }).join("")
}