import { products } from "./products.js";

let carts = document.querySelectorAll(".add-cart");

//localStorage.setItem("cartNumbers", 0);

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onloadcartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  // console.log("cartNumbers product:", product);

  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers, 10);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }
  setItems(product);

  //  console.log("cartNumbers productNumbers:", productNumbers);
}

function setItems(product) {
  //console.log("setItems product:", product);
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] === undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseFloat(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}
//
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productsContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");
  cartCost = parseFloat(cartCost).toFixed(2);
  // console.log("cartItems.=");
  //console.log(cartItems);
  if (cartItems && productsContainer) {
    productsContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productsContainer.innerHTML += `
      <div class="product"> 
     
      <button class="btn2"><i class="fa  fa-times-circle"></i></button>
      <img src="src/stamps/${item.tag}.jpg">
      <span class="name">  ${item.name} </span>
  
      <div class="price">${item.price}</div>
      <div class="quantity">
          <button class="btn2"><i class="fa fa-plus-circle"></i></button>
          <span> ${item.inCart} </span> 
          <button class="btn2"><i class="fa fa-minus-circle"></i></button>
      </div>
      
      <div class="total">
          $${parseFloat(item.inCart * item.price).toFixed(2)}
      </div>
    </div> 

          `;
    });

    productsContainer.innerHTML += `
    <div class="basketTotalContainer">
      <h4 class="basketTotalTitle">
        Basket Total
      </h4>
      <h4 class="basketTotal">
        $${cartCost}
      </h4>
      
    </div>

    `;
  }
}

onloadcartNumbers();
displayCart();
