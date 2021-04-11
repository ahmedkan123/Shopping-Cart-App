let productsDom = document.querySelector(".products .container");
let noProductsDom = document.querySelector(".noproducts .container");

function drawFavoritesProductsUI(allProducts = []) {
  if(JSON.parse(localStorage.getItem("productsFavorite")).length === 0){
    noProductsDom.innerHTML = "There is no items !!";  
  }
  
  let products =
    JSON.parse(localStorage.getItem("productsFavorite")) || allProducts;
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
                 <button class="add-to-cart" onclick="removeItemFromCart(${item.id})">Remove From Favorite</button>
               </div>
             </div>
             
             
             `;
  });
  productsDom.innerHTML = productUI.join("");
}

drawFavoritesProductsUI();

function removeItemFromCart(id) {
  let productsFavorite = localStorage.getItem("productsFavorite");
  if (productsFavorite) {
    let items = JSON.parse(productsFavorite);
    let filteredItems = items.filter((item) => item.id !== id);
    drawFavoritesProductsUI(filteredItems);
    localStorage.setItem("productsFavorite", JSON.stringify(filteredItems));
    drawFavoritesProductsUI(filteredItems);

  }
}
