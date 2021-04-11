let products = JSON.parse(localStorage.getItem("products"));
let productId = localStorage.getItem("productId");
let itemDom = document.querySelector(".item-details");
let productDetails = products.find((item) => item.id == productId)

itemDom.innerHTML = `
<img src="${productDetails.imageUrl}" alt="text"/>
<h2>${productDetails.title}</h2>
<p>${productDetails.desc}</p>
<span>Size : ${productDetails.size}</span><br>
<span>Quantatie : ${productDetails.qty}</span>



`;
