// define products

let productsDom = document.querySelector(".products .container");
let cartProductMenu = document.querySelector(".carts-products");
let cartProductDom = document.querySelector(".carts-products div");
let shoppingCartIcon = document.querySelector(".shopping-cart");
let badgeDom = document.querySelector(".badge");

let products = [
  {
    id: 1,
    title: "headphone item",
    desc: "Lorem ipsum dolor sit amet consectutor.",
    size: "large",
    imageUrl: "images/headphone.jpg",
    qty: 1,
    isMe: "N",
  },
  {
    id: 2,
    title: "laptop item",
    desc: "Lorem ipsum dolor sit amet consectutor.",
    size: "medium",
    imageUrl: "images/laptop.jpg",
    qty: 1,
    isMe: "N",
  },
  {
    id: 3,
    title: "watch item",
    desc: "Lorem ipsum dolor sit amet consectutor.",
    size: "small",
    imageUrl: "images/watch.jpg",
    qty: 1,
    isMe: "N",
  },
  {
    id: 4,
    title: "glass item",
    desc: "Lorem ipsum dolor sit amet consectutor.",
    size: "medium",
    imageUrl: "images/glass.jpg",
    qty: 1,
    isMe: "N",
  },
];

// localStorage.setItem("products", JSON.stringify(products));

let drawProductsUI;
(drawProductsUI = function (products = []) {
  let productUI = products.map((item) => {
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
             ${
               item.isMe === "Y" &&
               "<button class='edit-product' onclick='editProduct(" +
                 item.id +
                 ")'>Edit Product</button>"
             }
           </div>
           <div class="product-item-actions">
             <button class="add-to-cart" onclick= "addedToCart(${
               item.id
             })">Add To Cart</button>
             <i class="far fa-heart" style="color: ${
               item.liked == true ? "red" : ""
             }" onclick="addToFavorite(${item.id})"></i>
           </div>
         </div>
         
         
         `;
  });
  productsDom.innerHTML = productUI.join("");
})(JSON.parse(localStorage.getItem("products")) || products);
// drawProductsUI();

//call function open card menu
shoppingCartIcon.addEventListener("click", openCartMenu);

//define array to store product in local storage
let addedItems = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

if (addedItems) {
  addedItems.map((item) => {
    cartProductDom.innerHTML += `<p>${item.title} ${item.qty}</p>`;
  });

  badgeDom.style.display = "block";
  badgeDom.innerHTML += addedItems.length;
}

// function to when add any item to cart appear to shopping icon by id paramater

function addedToCart(id) {
  if (localStorage.getItem("username")) {
    let products = JSON.parse(localStorage.getItem("products")) || products;
    let product = products.find((item) => item.id === id);
    let isProductInCart = addedItems.some((i) => i.id === product.id);

    if (isProductInCart) {
      addedItems = addedItems.map((p) => {
        if (p.id === product.id) p.qty += 1;
        return p;
      });
    } else {
      addedItems.push(product);
    }

    cartProductDom.innerHTML = "";
    addedItems.forEach((item) => {
      cartProductDom.innerHTML += `<p>${item.title} ${item.qty}</p>`;
    });

    // save data
    localStorage.setItem("productsInCart", JSON.stringify(addedItems));

    //Add counter of items
    let cartProductsItems = document.querySelectorAll(".carts-products div p");
    badgeDom.style.display = "block";
    badgeDom.innerHTML = cartProductsItems.length;
  } else {
    window.location = "login.html";
  }
}

function getUniqueArr(arr, filterType) {
  let unique = arr
    .map((item) => item[filterType])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);

  return unique;
}

// // function to check user login or not
// function checkLoggedUser() {
//   if (localStorage.getItem("username")) {
//     console.log("Add to cart");
//   } else {
//     window.location = "login.html";
//   }
// }

// function to appear menu contain products add to cart
function openCartMenu() {
  if (cartProductDom.innerHTML != "") {
    if (cartProductMenu.style.display == "block") {
      cartProductMenu.style.display = "none";
    } else {
      cartProductMenu.style.display = "block";
    }
  }
}

function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "productsDetails.html";
}

// function search item

let input = document.getElementById("search");

input.addEventListener("keyup", function (e) {
  // if(e.keyCode === 13) {
  //   search(e.target.value, JSON.parse(localStorage.getItem("products")));
  // }
  search(e.target.value, JSON.parse(localStorage.getItem("products")));

  if (e.target.value.trim() === "") {
    drawProductsUI(JSON.parse(localStorage.getItem("products")));
  }
});

function search(title, myArray) {
  // for( var i = 0; i < myArray.length; i++) {
  //   if(myArray[i].title === title) {
  //     console.log(myArray[i]);
  //   }
  // }

  // search by full title
  // let arr = myArray.filter((item) => item.title === title);

  //search when write any letter in the search input
  let arr = myArray.filter(
    (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
  );
  drawProductsUI(arr);
}

// addtofavorite
let favoritesItems = localStorage.getItem("productsFavorite")
  ? JSON.parse(localStorage.getItem("productsFavorite"))
  : [];

function addToFavorite(id) {
  if (localStorage.getItem("username")) {
    let choosenProduct = products.find((item) => item.id === id);
    choosenProduct.liked = true;
    favoritesItems = [...favoritesItems, choosenProduct];

    let uniqueProducts = getUniqueArr(favoritesItems, "id");
    localStorage.setItem("productsFavorite", JSON.stringify(uniqueProducts));
    products.map((item) => {
      if (item.id === choosenProduct.id) {
        item.liked = true;
      }
    });
    localStorage.setItem("products", JSON.stringify(products));
    drawProductsUI(products);
  } else {
    window.location = "login.html";
  }
}

// funtion filter by size

let sizeFilter = document.getElementById("size-filter");

sizeFilter.addEventListener("change", getProductsFilterBySize);

function getProductsFilterBySize(e) {
  let val = e.target.value;

  let products = JSON.parse(localStorage.getItem("products")) || products;

  if (val == "all") {
    drawProductsUI(products);
  } else {
    products = products.filter((i) => i.size === val);
    drawProductsUI(products);
  }
}


// function editproduct

function editProduct(id) {
  localStorage.setItem("editProduct", id);

  window.location = "editProduct.html";
}