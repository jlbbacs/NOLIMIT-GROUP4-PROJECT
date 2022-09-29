let count = 0;
let sum = 0;
let cart = {};

if (localStorage.getItem("count")) {
  count = parseInt(localStorage.getItem("count"));
}

if (localStorage.getItem("sum")) {
  sum = parseInt(localStorage.getItem("sum"));
}

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}
// validation if data is empty from local storage

const checkempt = function () {
  if (!Object.keys(cart).length) {
    alert("Cart is empty!");
    location.href = "shop.html";
  }
};

checkempt();

let tbody = document.getElementById("tbody");
let total_price = 0;
let total_quantity = 0;

// represent data from local storage
for (let id in cart) {
  let item = cart[id];

  let tr = document.createElement("tr");

  let item_td = document.createElement("td");
  item_td.innerHTML = `<span class="item_img">
    <a href="item.html?product=${item.id}">
      <img src="${item.img}" />
    </a>
    </span>
    <span class="item_item">
      <a href="item.html?product=${item.id}">${item.item}</a>
    </span>`;
  tr.appendChild(item_td);

  let price_td = document.createElement("td");
  price_td.textContent = item.price;
  total_price += parseFloat(item.price) * parseInt(item.qty);
  tr.appendChild(price_td);

  let qty_td = document.createElement("td");
  qty_td.innerHTML = `<select name="cart-quantity" id="cart-quantity" data-img="${
    item.img
  }" data-color="${item.color}" data-size="${item.size}" data-id="${
    item.id
  }" data-item="${item.item}" data-price="${item.price}">
  <option ${item.qty == 1 ? "selected" : ""} value="1">1</option>
  <option ${item.qty == 2 ? "selected" : ""} value="2">2</option>
  <option ${item.qty == 3 ? "selected" : ""} value="3">3</option>
  <option ${item.qty == 4 ? "selected" : ""} value="4">4</option>
  <option ${item.qty == 5 ? "selected" : ""} value="5">5</option>
</select>`;
  total_quantity += parseInt(item.qty);
  tr.appendChild(qty_td);

  let total_td = document.createElement("td");
  total_td.classList.add("class-" + item.id);
  total_td.textContent = parseInt(parseFloat(item.price) * parseInt(item.qty)).toFixed(2);
  tr.appendChild(total_td);

  let option_td = document.createElement("td");
  option_td.innerHTML = `<a onclick="javascript:confirmation(this)" data-id="${item.id}" class="removeitem"><img src="photos/remove.png" class="img-fluid" id="remove" alt="" /></a>`;
  tr.appendChild(option_td);

  tbody.appendChild(tr);
}

let table = document.getElementById("order");
let footer = table.createTFoot();
let row = footer.insertRow(0);
let row1 = footer.insertRow(1);
let cell = row.insertCell(0);
cell.colSpan = "5";
let cel2 = row1.insertCell(0);
cel2.colSpan = "5";

cell.innerHTML = `<div class="container">
<div class="row">
  <div class="col"></div>
  <div class="col-md-auto">
    <h5><strong>Subtotal</strong></h5>
  </div>
  <div class="col col-lg-2 text-right">
    <h4 id="total">PHP ${total_price.toFixed(2)}</h4>
  </div>
</div>
<div class="row">
  <div class="text-right">
    Taxes and shipping calculated at checkout
  </div>
</div>
</div>`;
cel2.innerHTML = `<div class="col">
<a class="text-right pull-left" href="shop.html"
  ><button type="button" class="btn" id="btn">
    CONTINUE SHOPPING
  </button></a
>
</div>
<div class="col text-right">
<a
  href="#"
  class="btn btn-primary btn-lg active"
  role="button"
  id="updatecart"
  aria-pressed="true"
  >Update Cart</a
>
<a
  href="shoppayment.html"
  class="btn btn-secondary btn-lg active"
  role="button"
  id="checkout-btn"
  aria-pressed="true"
  >CHECKOUT</a
>
</div>`;

// updating  cart
const updatecart = function () {
  let options = document.querySelectorAll("#order select");
  let totalsub = 0;

  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    let option_val = option.options[option.selectedIndex].value;
    let option_price = option.dataset.price;
    let option_id = option.dataset.id;
    let item = option.dataset.item;
    let item_img = option.dataset.img;
    let item_size = option.dataset.size;
    let item_color = option.dataset.color;
    let item_price = document.querySelector(".class-" + option_id);
    totalsub += option_val * parseFloat(option_price);
    item_price.innerHTML = option_val * parseFloat(option_price);

    let cartItem = {
      item: item,
      img: item_img,
      price: option_price,
      size: item_size,
      color: item_color,
      id: option_id,
      qty: option_val,
    };

    cart[option_id] = cartItem;
  }

  checkempt();
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("total").innerHTML = totalsub.toFixed(2);
  localStorage.setItem("sum", totalsub);
};

let updt = document.getElementById("updatecart");
updt.addEventListener("click", updatecart);

// delete button
const confirmation = function (btn) {
  var result = confirm("Are you sure you want to delete?");
  let item = btn.dataset.id;
  let row = btn.parentNode.parentNode;

  if (result) {
    delete cart[item];
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Item removed");
    row.parentNode.removeChild(row);
    updatecart();
  }
};