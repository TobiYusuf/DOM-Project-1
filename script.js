const cartItems = [
  { id: 1, name: "Item 1", price: 19.99, quantity: 1, liked: false },
  { id: 2, name: "Item 2", price: 9.99, quantity: 2, liked: false },
  { id: 3, name: "Item 3", price: 14.99, quantity: 1, liked: false },
];

function updateTotalPrice() {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "p-4",
      "border-b"
    );

    itemDiv.innerHTML = `
                <div class="flex items-center space-x-4">
                    <button class="heart-btn ${
                      item.liked ? "liked" : ""
                    }" data-id="${
      item.id
    }"><img src="./img/heart.png" class="love-icon"/></button>
                    <h2 class="text-xl">${item.name}</h2>
                </div>

                <div class="flex items-center space-x-4">
                    <button class="quantity-btn" data-id="${
                      item.id
                    }" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-id="${
                      item.id
                    }" data-action="increase">+</button>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="delete-btn" data-id="${item.id}">🗑️</button>
                </div>
            `;

    cartContainer.appendChild(itemDiv);
  });

  updateTotalPrice();
}

function toggleLikes() {
  const heartBtns = document.querySelectorAll(".heart-btn");
  heartBtns.forEach((heart) => {
    heart.addEventListener("click", () => {
      let check = `<img src="./img/heart.png" class="love-icon">`;
      if (heart.innerHTML === check) {
        console.log("Checked");
        heart.innerHTML = `<img src="./img/heart-fill.png" class="love-icon"/>`;
      } else {
        heart.innerHTML = `<img src="./img/heart.png" class="love-icon"/>`;
      }
      console.log(heart.innerHTML);
    });
  });
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("quantity-btn")) {
    const id = parseInt(event.target.dataset.id);
    const action = event.target.dataset.action;
    const item = cartItems.find((item) => item.id === id);

    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease" && item.quantity > 1) {
      item.quantity -= 1;
    }

    renderCart();
  }

  if (event.target.classList.contains("delete-btn")) {
    const id = parseInt(event.target.dataset.id);
    const itemIndex = cartItems.findIndex((item) => item.id === id);
    cartItems.splice(itemIndex, 1);
    renderCart();
    toggleLikes();
  }
});

document.addEventListener("DOMContentLoaded", toggleLikes);

document.getElementById("add-item-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("item-name").value;
  const price = parseFloat(document.getElementById("item-price").value);
  const quantity = parseInt(document.getElementById("item-quantity").value);

  const newItem = {
    id: cartItems.length ? cartItems[cartItems.length - 1].id + 1 : 1,
    name,
    price,
    quantity,
    liked: false,
  };

  cartItems.push(newItem);

  renderCart();
  toggleLikes();

  // Clear form
  document.getElementById("item-name").value = "";
  document.getElementById("item-price").value = "";
  document.getElementById("item-quantity").value = "";
});

renderCart();
