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

const addCart = function (event) {
  let qtty = document.getElementById("quantity");
  let size = document.getElementById("sizes");
  let color = document.getElementById("colors");
  let size_val = size.options[size.selectedIndex].value;
  let color_val = color.options[color.selectedIndex].value;

  if (size_val == "n_a") {
    alert("Please indicate size!");
    return false;
  }

  if (color_val == "n_a") {
    alert("Please indicate color!");
    return false;
  }

  if (qtty == " ") {
    alert("Invalid quantity");
    return false;
  }

  let qtty_val = qtty.options[qtty.selectedIndex].value;
  let price = Number(event.target.dataset.price);
  let item = event.target.dataset.item;
  let img = event.target.dataset.img;
  let id = event.target.dataset.id;

  if (id in cart) {
    if (qtty_val != null) {
      cart[id].qty = qtty_val;
    } else {
      cart[id].qty++;
    }
  } else {
    let cartItem = {
      item: item,
      img: img,
      price: price,
      size: size_val,
      color: color_val,
      id: id,
      qty: qtty_val ? qtty_val : 1,
    };
    cart[id] = cartItem;
  }

  count = qtty_val;
  sum += parseFloat(price) * qtty_val;

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  alert("Item added to cart !");
};

const updateCart = function () {
  document.getElementById("sum").textContent = sum;
  localStorage.setItem("sum", sum);
  localStorage.setItem("count", count);
};

updateCart();