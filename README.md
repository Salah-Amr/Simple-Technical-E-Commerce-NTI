# NTI MEAN Stack Task – Shopping Cart Project

## 📝 Overview
This is a **shopping cart web application** developed as a **MEAN Stack training task** for NTI.  
It demonstrates **frontend JavaScript, DOM manipulation, localStorage management, and basic authentication simulation** using JWT (for learning purposes).

Users can:
- Browse a list of products
- Add products to the cart
- Update quantities
- Undo the last added product
- Checkout the cart with a **cooldown timer**
- Receive **toast notifications** for feedback

> ⚠️ This is a **training project**; all authentication and JWT are simulated on the frontend. **Not suitable for production use**.

---

## 💻 Features

1. **Login Simulation**
   - Login using preset credentials (`Username: Ahmed Hamdy`, `Password: 123`)  
   - Generates a **fake JWT token** stored in `localStorage`  

2. **Product Selection**
   - Products list rendered dynamically from a JS array  
   - Add products to the cart using `+` button  
   - Input quantity and auto-update the total price  
   - Quantity validation (min 1, max 5)  

3. **Cart Management**
   - Undo the last added product  
   - Checkout cart with **25-second cooldown**  
   - Toast notifications showing cart details, countdown, and alerts  

4. **Persistent State**
   - Carts and last checkout time stored in `localStorage`  
   - Allows refreshing the page without losing the current cart  

5. **UI/UX**
   - Modern dark theme with **accent colors**  
   - Responsive layout for mobile and desktop  
   - Animated toast messages using **Toastify.js**  

---

## 🛠️ Technologies Used

- **Frontend**:
  - HTML5, CSS3, JavaScript (ES6)  
  - DOM Manipulation  
  - localStorage API  

- **Libraries / Plugins**:
  - [Toastify.js](https://github.com/apvarun/toastify-js) – Toast notifications  
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) (via CDN) – JWT simulation  

---

## 🎨 UI / Styling

- **Dark theme** for main layout  
- **Gradient backgrounds** for products, cart, and toasts  
- **Rounded corners** and subtle shadows for cards and buttons  
- **Responsive layout** for mobile devices  
- **Color palette**:
  - Primary buttons: #3b82f6 (blue)
  - Add buttons: #10b981 (green)
  - Errors: #dc2626 (red)
  - Background: #0f172a (dark navy)
  - Text: #e2e8f0 (light gray)  

---

## 🚀 How to Run

1. Clone the repository:
```bash
git clone <repo-url>
```

2. Open index.html in a browser (no server required for frontend training)

3. Login with credentials:
```bash
Username: Ahmed Hamdy
Password: 123
```

4. Browse products, add to cart, update quantities, undo, and checkout

## ⚠️ Notes
  - JWT token is simulated in the frontend; do not use in production
  - localStorage is used for persistent cart and checkout timers
  - Checkout cooldown is 25 seconds, with toast countdown every 5 seconds

## 🧑‍💻 Author
  - Salah Amr – NTI MEAN Stack Training Task
