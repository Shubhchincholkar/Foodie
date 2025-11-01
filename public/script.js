window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.classList.add("hidden"); // fade out
});

var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

const hamburger = document.querySelector(".hamburger"); // toggle button
const mobileMenu = document.querySelector(".mobile-menu");
const menuLinks = document.querySelectorAll(".mobile-menu a");

// Toggle open/close when clicking hamburger
hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("mobile-menu-active");
});

// Auto-close when clicking any menu link
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("mobile-menu-active");
  });
});

// *********   form js    *********

const form = document.getElementById("orderForm");

// Auto-capitalize first letter
["firstName", "middleName", "lastName"].forEach((id) => {
  const input = document.getElementById(id);
  input.addEventListener("input", () => {
    if (input.value.length > 0) {
      input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
    }
  });
});

// Force email lowercase
const emailInput = document.getElementById("email");
emailInput.addEventListener("input", () => {
  emailInput.value = emailInput.value.toLowerCase();
});

// Restrict phone to 10 digits
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "");
  if (phoneInput.value.length > 10) {
    phoneInput.value = phoneInput.value.slice(0, 10);
  }
});

// Restrict quantity 1–10
const quantityInput = document.getElementById("quantity");
quantityInput.addEventListener("input", () => {
  quantityInput.value = quantityInput.value.replace(/\D/g, "");
  if (parseInt(quantityInput.value) > 10) {
    quantityInput.value = "10";
  }
  if (quantityInput.value.startsWith("0")) {
    quantityInput.value = quantityInput.value.replace(/^0+/, "");
  }
});

// Loader fade
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.classList.add("hidden");
});

// Unified submit listener
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!/^\d{10}$/.test(phoneInput.value)) {
    alert("Phone number must be exactly 10 digits.");
    return;
  }

  if (!/^[a-z0-9._%+-]+@gmail\.com$/.test(emailInput.value)) {
    alert("Email must be a valid Gmail address (e.g., example@gmail.com).");
    return;
  }

  if (
    quantityInput.value === "" ||
    parseInt(quantityInput.value) < 1 ||
    parseInt(quantityInput.value) > 10
  ) {
    alert("Quantity must be between 1 and 10.");
    return;
  }

  if (document.getElementById("foodItem").value === "") {
    alert("Please select a food item.");
    return;
  }

  const formData = {
    firstName: document.getElementById("firstName").value.trim(),
    middleName: document.getElementById("middleName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    address: document.querySelector("textarea[name='address']").value.trim(),
    foodItem: document.getElementById("foodItem").value.trim(),
    quantity: document.getElementById("quantity").value.trim(),
    instructions: document
      .querySelector("textarea[name='instructions']")
      .value.trim(),
  };

  console.log("📤 Sending form data:", formData);

  try {
    const res = await fetch("http://localhost:3000/submit-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    let data;
    try {
      data = await res.json();
    } catch (jsonError) {
      console.error("❌ Failed to parse JSON:", jsonError);
      alert("Server returned invalid JSON.");
      return;
    }

    console.log("📥 Response from server:", data);

    if (!res.ok) {
      alert(`Error: ${data.error || "Something went wrong!"}`);
      return;
    }

    alert(
      `${data.message}\nUnit Price: ₹${data.unitPrice}\nTotal Price: ₹${data.totalPrice}`
    );
    form.reset();
  } catch (err) {
    console.error("❌ Network error:", err);
    alert("⚠️ Network or server error!");
  }
});

// unit and total

const foodPrices = {
  "Double Beef Burger": 249,
  "Veggie Pizza": 199,
  "Fried Chicken": 179,
  "Chicken Roll": 149,
  "Sub Sandwich": 129,
  "Chicken Lasagna": 229,
  "Italian Spaghetti": 159,
  "Spring Roll": 99,
};

const foodItemInput = document.getElementById("foodItem");
const unitPriceInput = document.getElementById("unitPrice");
const totalPriceInput = document.getElementById("totalPrice");

// Update prices dynamically
function updatePrices() {
  const foodItem = foodItemInput.value;
  const quantity = parseInt(quantityInput.value) || 0;

  if (foodItem && foodPrices[foodItem]) {
    const unitPrice = foodPrices[foodItem];
    unitPriceInput.value = "₹" + unitPrice;

    const total = unitPrice * quantity;
    totalPriceInput.value = quantity > 0 ? "₹" + total : "";
  } else {
    unitPriceInput.value = "";
    totalPriceInput.value = "";
  }
}

// Attach events
foodItemInput.addEventListener("change", updatePrices);
quantityInput.addEventListener("input", updatePrices);
   

                          // end