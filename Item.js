const params = new URLSearchParams(window.location.search);
let product = params.get("product");
const url = `https://62f7c3d7ab9f1f8e8902fb45.mockapi.io/api/v1/exercise_items/${product}`;
const subContainer = document.querySelector(".subContainer");
let data = [];
let next = parseInt(product) + 1;
let prev = parseInt(product) - 1;
//user input should show data
//fetching data
const fetchData = async () => {
  let paulene = await fetch(url);

  if (paulene.status === 200) {
    data = await paulene.json();
    displayData(data);
    return false;
  }
  window.history.back();
};

// Options parameters: id for localstorage id, objects from api, target is for sizes/colors
const options = function (id, objects, target) {
  let opt = "<option selected value='n_a'>Select</option>";
  for (const key in objects) {
    if (objects.hasOwnProperty(key)) {
      if (target == "size" && cart[id]) {
        opt += `<option ${
          cart[id].size == key ? "selected" : ""
        } value="${key}">${objects[key]}</option>`;
      } else if (target == "color" && cart[id]) {
        opt += `<option ${
          cart[id].color == key ? "selected" : ""
        } value="${key}">${objects[key]}</option>`;
      } else {
        opt += `<option value="${key}">${objects[key]}</option>`;
      }
    }
  }
  return opt;
};

const displayData = (item) => {
  let htmlString = "";

  htmlString += `
            <div class="container cart-item">
            <div class="row">
               <div class="col-md-5 pt-3">
                  <div class="card border shadow mt-5">
                     <img
                        src="${item.mainphoto}"
                        alt="noLimitSportsBra"
                        class="img-fluid"
                     />
               </div>
               </div>
               <div class="col-md-6 col-lg-6 offset-.5 mt-5" id="details">
                  <div class="card border-light shadow-none">
                     <div class="pagination mb-5" id="pagination">
                     
                        <li>
                           <a href="item.html?product=${prev}" class="aPagination"
                              >❮ Prev</a
                           >
                        </li>
                        |
                        <li>
                           <a href="item.html?product=${next}" class="aPagination">Next ❯</a>
                        </li>
                     </div>
                     <h2 class="text-dark">${item.name}</h2>
                     <p class="lead"></p>
                     <p class="lead fw-bold">PHP ${item.price}</p>
                     <p>Size</p><select
                        class="form-select"
                        name="sizes"
                        id="sizes"
                        aria-label="Default select example"
                     >${options(item.id, item.size, "size")}</select>
                     <br />
                     <p>Color</p>
                     <select
                        class="form-select"
                        name="colors"
                        id="colors"
                        aria-label="Default select example"
                     >${options(item.id, item.color, "color")}</select><br />
                     <p class="text-dark">Quantity</p>
                     <div class="col-xs col-sm col-md col-lg-6 col-xl col-xxl">
                        <div class="input-group">
                           <select name="quantity" id="quantity" class="quantity-field border text-center w-25">
                           <option ${
                             cart[item.id] && cart[item.id].qty == "1"
                               ? "selected"
                               : ""
                           } value="1">1</option>
                           <option ${
                             cart[item.id] && cart[item.id].qty == "2"
                               ? "selected"
                               : ""
                           } value="2">2</option>
                           <option ${
                             cart[item.id] && cart[item.id].qty == "3"
                               ? "selected"
                               : ""
                           } value="3">3</option>
                           <option ${
                             cart[item.id] && cart[item.id].qty == "4"
                               ? "selected"
                               : ""
                           } value="4">4</option>
                           <option ${
                             cart[item.id] && cart[item.id].qty == "5"
                               ? "selected"
                               : ""
                           } value="5">5</option>
                           </select>
                        </div>
                     </div>
                     <div class="col-md-4 col-sm-6 mt-4">
                        <button id="btnAddToCart" data-id="${
                          item.id
                        }" data-img="${item.mainphoto}" data-price="${
    item.price
  }" data-item="${
    item.name
  }" onclick="javascript:addCart(event)" class="btnAddToCart">
                           Add to Cart
                        </button>
                     </div>
                     <p class="mt-5">
                        ${item.description}
                     </p>
                  </div>
               </div>
            </div>
         </div>
               `;

  subContainer.innerHTML = htmlString;
};
fetchData();