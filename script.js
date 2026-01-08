const products = [
  { name: "Laptop", price: 25000 },
  { name: "Mouse", price: 350 },
  { name: "Keyboard", price: 750 },
  { name: "Headphones", price: 1200 },
  { name: "Monitor", price: 4500 },
  { name: "USB Flash", price: 200 },
  { name: "Power Bank", price: 900 }
];
const ids = {
  "Laptop": 0,
  "Mouse": 1,
  "Keyboard": 2,
  "Headphones": 3,
  "Monitor": 4,
  "USB Flash": 5,
  "Power Bank": 6,
};
const colors = ["#dc3545", "#28a745"]

const username = "Ahmed Hamdy";
const password = "123";
let loggedIn = false;

let cart = [];
let totalCartPrice = 0;
let cartCount = 0;
let cartDArray = [];

function safeGetByID(id) {
  try {
    const el = document.getElementById(id);
    if (!el) throw new Error("Element not found: " + id);
    return el;
  } catch (e) {
    showToast(e.message, "toast-error");
    return null;
  }
}

const prodD = safeGetByID("productsDiv");
const cartD = safeGetByID("cartDiv");
const defaultCart = `<h2>Cart</h2>
      <h4>Select Quantity and checkout</h4>
      <h4><span>Note that the undo button removes last product!</span></h4>
      <p id="TotalCartPrice">Total Price = 0</p>
      <br><br>
      <button id="undo" onclick="undoProduct()">Undo</button>
      <button id="checkout" onclick="checkoutCart()">Checkout</button> `;

function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    showToast("LocalStorage Error: " + e.message, "toast-error");
  }
}


function loadPage() {
  showToast("Welcome to my Technical E-Commerce Website\nYou can login or not\nBut you must login before Checkout\nMade By: Salah Amr", "toast-info");
  saveToLocalStorage("lastCheckoutDate", Date.now());
  saveToLocalStorage("Carts", "");
  showProducts();
}

function login() {
  try {
    const user = safeGetByID("username");
    const pass = safeGetByID("password");
    const btn = safeGetByID("loginbtn");
    if (user.value == username && pass.value == password) {
      showToast(`Welcome Back ${user.value}!`, "toast-success");
      const token = btoa(JSON.stringify({
        id: 1,
        name: user,
        role: "user",
        exp: Date.now() + 3600000
      }));
      saveToLocalStorage("token", token);
      user.readOnly = true;
      pass.readOnly = true;
      btn.disabled = true;
      loggedIn = true;
    }
    else {
      throw new Error("Error in username or password please try again!");
    }
  } catch (e) {
    showToast(e.message, "toast-error");
  }
}

function updateProductCount(inpid) {
  let inp = safeGetByID(inpid);
  let count = (inp.value != ""? +inp.value : 1);
  const lab = safeGetByID(`totalP${inpid[1]}Price`);
  const tot = safeGetByID(`TotalCartPrice`);
  if (count < 1) {
    count = 1;
    showToast("Quantity must be positive!", "toast-error");
  }
  else if (count > 5) {
    count = 5;
    showToast("Quantity cannot be more than 5!", "toast-error");
  }
  else {
    showToast(`Quantity has been Updated to ${count} SUCESSFULLY`, "toast-success");
  }
  inp.value = count;
  lab.innerHTML = count * products[+inpid[1]].price;
  calculateTotalPrice();
  tot.innerHTML = `Total Price = ${totalCartPrice}`;
}

function addEventInput() {
  const inputs = document.getElementsByClassName("pinp");
  for (const e of inputs) {
    e.addEventListener("blur", function () {
      updateProductCount(this.id);
    });
  }
}

function showToast(message, classN) {
  Toastify({
  text: message,
  duration: 3000,
  gravity: "top",
  position: "right",
  className: `my-toast ${classN}`,
  close: true
  }).showToast();
}

function calculateTotalPrice() {
  totalCartPrice = 0;
  let count, pprice, id;
  for (p of cart) {
    id = ids[p.name];
    pprice = p.price;
    count = +safeGetByID(`p${id}input`).value;
    totalCartPrice += pprice * count;
  }
}

function updateCartDiv() {
  cartD.innerHTML = "<h2>Cart</h2><h3>Select Quantity and checkout</h3><h3><span>Note that the undo button removes last product!</span></h3>";
  let cnt = 1, id;
  for (let i = cart.length - 1; i >= 0; i--) {
    id = ids[cart[i].name];
    let statement = ` <p id="p${id}name">${cart[i].name}</p> `
    + ` <input type="text" value="1" id="p${id}input" class="pinp"> `
    + ` <p id="totalP${id}Price">${cart[i].price}</p> `
    + ` <br> <br>`
    cartD.innerHTML += statement;
    cnt++;
  }
  calculateTotalPrice();
  cartD.innerHTML += `<p id="TotalCartPrice">Total Price = ${totalCartPrice}</p> `
  + `<br><br> `
  + `<button id="undo" onclick="undoProduct()">Undo</button> `
  + `<button id="checkout" onclick="checkoutCart()">Checkout</button> `;
  addEventInput();
}

function selectProduct(pid) {
  let index = parseInt(pid[2]);
  cart.unshift(products[index]);
  let btn = safeGetByID(`pr${index}btn`);
  updateCartDiv();
  btn.disabled = true;
}

function showProducts() {
  let id;
  prodD.innerHTML = "<h2>Products</h2><h3>Select items you want to buy</h3>";
  for (let i = 0; i < products.length; i++) {
    id = ids[products[i].name];
    let statement = ` <p id="pr${id}name">${products[i].name}</p> `
    + ` <p id="pr${id}price">${products[i].price}</p> `
    + ` <button id="pr${id}btn" onclick="selectProduct(this.id)" class="addbtn">+</button> `
    + ` <br> <br> `;
    prodD.innerHTML += statement;
  }
}

function undoProduct() {
  try {
    if (cart.length == 0)
      throw new Error("Cart is Empty!");
    const last = cart[0];
    const id = ids[last.name];
    let btn = safeGetByID(`pr${id}btn`);
    btn.disabled = false;
    cart.shift();
    updateCartDiv();
  } catch(e) {
    showToast(e.message, "toast-error");
  }
}

function processCheckout() {
  let buttons = document.getElementsByClassName('addbtn');
  for (let btn of buttons) {
    btn.disabled = false;
  }
  cartCount++;
  saveToLocalStorage("lastCheckoutDate", Date.now() + 25000);
  let message = "Checked out in process please wait 25 seconds\nYour cart:\n";
  let cartM = `Cart Number ${cartCount}\n`;
  for (let i = cart.length - 1; i >= 0; i--) {
    let p = cart[i];
    let id = ids[p.name];
    let q = +safeGetByID(`p${id}input`).value;
    message += `Product: ${p.name}, Quantity: ${q}, Cost: ${p.price * q}\n`;
    cartM += `Product: ${p.name}, Quantity: ${q}, Cost: ${p.price * q}\n`;
  }
  message += `Total Price = ${totalCartPrice}`;
  showToast(message, "toast-success");
  let old = localStorage.getItem("Carts");
  saveToLocalStorage("Carts", old + cartM);
  let count = 0;
  const maxCount = 5;
  const intervalId = setInterval(() => {
    count++;
    const timeNow = new Date().toLocaleTimeString();
    showToast(`Cart will be dilivered after ${(25 - (count * 5)) == 0? "now" : (25 - (count * 5))}\nTime: ${timeNow}`, "toast-success");
    if (count >= maxCount) {
      clearInterval(intervalId);
    }
  }, 5000);
  cart = [];
  safeGetByID("cartDiv").innerHTML = defaultCart;
}

function checkoutCart() {
  try {
    if (!loggedIn) {
      throw new Error("User must login before checkout");
    }
    if (cart.length === 0) {
      throw new Error("Cart is empty");
    }
    if (localStorage.getItem("lastCheckoutDate") > Date.now()) {
      throw new Error("Please wait for previous checkout");
    }
    processCheckout();
  } catch (e) {
    showToast(e.message, "toast-error");
  }
}
