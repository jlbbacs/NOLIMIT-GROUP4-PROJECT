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
  price_td.textContent = parseFloat(item.price) * parseInt(item.qty);
  total_price += parseFloat(item.price) * parseInt(item.qty);
  tr.appendChild(price_td);

  tbody.appendChild(tr);
}

let table = document.getElementById("order");
let footer = table.createTFoot();
let row = footer.insertRow(0);
let cell = row.insertCell(0);
let cell2 = row.insertCell(1);

let row1 = footer.insertRow(1);
let cell11 = row1.insertCell(0);
let cell22 = row1.insertCell(1);

cell.innerHTML = `<span style="float:right;">Shipping costs</span>`;
cell2.innerHTML = `<span id="shipping"></span>`;

cell11.innerHTML = `<h5 style="text-align:right;"><strong>Subtotal</strong></h5>`;
cell22.innerHTML = `<h4 id="total">PHP ${total_price}</h4>`;

const shippingfee = function (el) {
  let selected = el.options[el.selectedIndex].value;
  let standard_fee = 25;

  if (selected == "PH") {
    standard_fee = 20;
  }
  return standard_fee;
};

const calculateshipping = function (event) {
  let shipping = document.getElementById("shipping");
  let total = document.getElementById("total");

  let standard_fee = shippingfee(this);

  shipping.innerHTML = standard_fee;
  total.innerHTML = total_price + standard_fee;
};

let updt = document.getElementById("country");
updt.addEventListener("change", calculateshipping);

const shippbilling = function () {
  var billing_address = document.getElementById("billing_address");
  billing_address.disabled = this.checked ? true : false;

  if (!billing_address.disabled) {
    billing_address.focus();
  } else {
    billing_address.value = "";
  }
};

let shpbil = document.getElementById("same_shipping");
shpbil.addEventListener("click", shippbilling);

const placeOrder = function () {
  let firstname = document.getElementById("firstname");
  let lastname = document.getElementById("lastname");
  let email_address = document.getElementById("email_address");
  let country = document.getElementById("country");
  let shipping_address = document.getElementById("shipping_address");
  let same_shipping = document.getElementById("same_shipping");
  let billing_address = document.getElementById("billing_address");
  let same_shipp_billing = same_shipping.checked
    ? "== Billing Same with Shipping =="
    : billing_address.value;

  let total_quantity_order = 0;
  let item_item,
    item_qty,
    item_price,
    format_order = "";

  for (let id in cart) {
    let item = cart[id];
    item_item = item.item;
    item_qty = item.qty;
    item_price = parseFloat(item.price) * parseInt(item.qty);
    format_order += `Item : ${item_item} | Quantity : ${item_qty} | Price : ${parseFloat(
      item_price
    )}\n`;
    total_quantity_order += parseFloat(item.price) * parseInt(item.qty);
  }
  total_quantity_order += shippingfee(country);

  let placeorder = `Name : ${firstname.value} \n Lastname : ${
    lastname.value
  } \n Email Address : ${email_address.value} \n\n Country : ${
    country.options[country.selectedIndex].value
  } \n Shipping Address : ${
    shipping_address.value
  } \n\n Billing Address : ${same_shipp_billing}\n\n Orders : \n ${format_order} \n Total Price : ${total_quantity_order}`;

  
  //set the parameter as per you template parameter[https://dashboard.emailjs.com/templates]
  var templateParams = {
    to_name: "Admin",
    from_name: "No Limit Fitness",
    message: `${placeorder}`,
  };
  // call send function from emailjs 
  // -> show custom order info through alert box, clear localstorage, redirect to homepage
  emailjs.send("service_w09xyou", "template_9oqwaen", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      alert(placeorder);
      localStorage.clear();
      location.href = "index.html";
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
 
};

let sendorder = document.getElementById("placeorder");
sendorder.addEventListener("click", placeOrder);