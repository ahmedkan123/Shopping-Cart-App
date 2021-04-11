let productsDom = document.querySelector(".products .container");
let noProductsDom = document.querySelector(".noproducts .container");

let drawProductsUI;
(drawProductsUI = function (products = []) {
  let myProducts = products.filter((item) => item.isMe === "Y");
  if (myProducts.length != 0) {
    let productUI = myProducts.map((item) => {
      // console.log("#eee", item);
      return `
             <div class="product-item" style="border:${
               item.isMe === "Y" ? "1px solid green" : ""
             }">
               <div class="img-width">
                 <img src="${item.imageUrl}" alt="text" id="product-item-img" />
               </div> 
               <div class="product-item-desc">
                 <a onclick='saveItemData(${item.id})'>${item.title}</a>
                 <p>${item.desc}</p>
                 <span>Size: ${item.size} </span><br>
                 <button class='edit-product' onclick='editProduct(${
                   item.id
                 })'>Edit Product</button>
                 <button class='edit-product' onclick='deleteProduct(${
                   item.id
                 })'>Delete Product</button>
                 
               </div>
               
             </div>
             
             
             `;
    });
    productsDom.innerHTML = productUI.join("");
  } else {
    noProductsDom.innerHTML = "No products !!";
  }
})(JSON.parse(localStorage.getItem("products")) || products);

// function edit product

function editProduct(id) {
  localStorage.setItem("editProduct", id);

  window.location = "editProduct.html";
}

// function delete product

function deleteProduct(id) {
  let products = JSON.parse(localStorage.getItem("products")) || products;
  let myProducts = products.filter((item) => item.isMe === "Y");
  let filtered = myProducts.filter((i) => i.id !== id);
  let clickedMe = myProducts.find((i) => i.id === id);
  products = products.filter((i) => i.id !== clickedMe.id);
  localStorage.setItem("products", JSON.stringify(products));
  drawProductsUI(filtered);
}
