let productsDom = document.querySelector(".products .container");
let noProductsDom = document.querySelector(".noproducts .container");

function drawCartsProductsUI(allProducts = []) {
  if (JSON.parse(localStorage.getItem("productsInCart")).length === 0) {
    noProductsDom.innerHTML = "There is no items !!";
  }

  let products =
    JSON.parse(localStorage.getItem("productsInCart")) || allProducts;
  let productUI = products.map((item) => {
    return `
             <div class="product-item">
               <img src="${item.imageUrl}" alt="text" id="product-item-img" />
               <div class="product-item-desc">
                 <h2>${item.title}</h2>
                 <p>${item.desc}</p>
                 <span>Size: ${item.size} </span><br>
                 <span>Quantatie: ${item.qty} </span>
               </div>
               <div class="product-item-actions">
                 <button class="add-to-cart" onclick= "removeItemFromCart(${item.id})">Remove From Cart</button>
               </div>
             </div>
             
             
             `;
  });
  productsDom.innerHTML = productUI.join("");
}

drawCartsProductsUI();

function removeItemFromCart(id) {
  let productsInCart = localStorage.getItem("productsInCart");
  if (productsInCart) {
    let items = JSON.parse(productsInCart);
    let filteredItems = items.filter((item) => item.id !== id);
    drawCartsProductsUI(filteredItems);
    localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
    drawCartsProductsUI(filteredItems);
  }
}
