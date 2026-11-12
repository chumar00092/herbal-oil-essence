/*
  HERBAL OIL ESSENCE — ORDER FORM
  Free static website. Customers send their order through WhatsApp and/or email.
  The customer must press Send in the selected app; this static site cannot send
  messages in the background or store orders on a server.
*/
const BUSINESS_WHATSAPP = "923314771733";
const BUSINESS_EMAIL = "saniajutt327@gmail.com";

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

const validWhatsApp = () => /^\d{10,15}$/.test(BUSINESS_WHATSAPP);
function openWhatsApp(product = "") {
  if (!validWhatsApp()) {
    alert("Please add your WhatsApp number in script.js before using order buttons.");
    return;
  }
  const message = product
    ? `Assalam-o-Alaikum! I am interested in ${product} from Herbal Oil Essence. Please share availability and delivery details.`
    : "Assalam-o-Alaikum! I would like to place an order with Herbal Oil Essence. Please share product and delivery details.";
  window.open(`https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}
document.querySelectorAll(".order-product").forEach(button => {
  button.addEventListener("click", () => openWhatsApp(button.dataset.product));
});
document.getElementById("bannerWhatsapp").addEventListener("click", event => {
  event.preventDefault();
  openWhatsApp();
});

const emailDisplay = document.getElementById("emailDisplay");
const phoneDisplay = document.getElementById("phoneDisplay");
emailDisplay.textContent = BUSINESS_EMAIL;
emailDisplay.href = `mailto:${BUSINESS_EMAIL}`;
phoneDisplay.textContent = `+${BUSINESS_WHATSAPP}`;
phoneDisplay.href = `https://wa.me/${BUSINESS_WHATSAPP}`;

const orderForm = document.getElementById("orderForm");
const confirmation = document.getElementById("orderConfirmation");
const summary = document.getElementById("confirmationSummary");
const sendWhatsApp = document.getElementById("sendWhatsApp");
const sendEmail = document.getElementById("sendEmail");

orderForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!orderForm.reportValidity()) return;
  const form = new FormData(orderForm);
  const name = String(form.get("name")).trim();
  const phone = String(form.get("phone")).trim();
  const address = String(form.get("address")).trim();
  const product = String(form.get("product"));
  const quantity = Math.max(1, Math.min(20, Number(form.get("quantity")) || 1));
  const extra = String(form.get("message") || "").trim();
  const total = quantity * 2000;
  const orderMessage = [
    "🌿 HERBAL OIL ESSENCE — NEW ORDER",
    "━━━━━━━━━━━━━━━━━━━━",
    "CUSTOMER DETAILS",
    `1. Name: ${name}`,
    `2. Mobile: ${phone}`,
    `3. Delivery Address: ${address}`,
    "",
    "ORDER DETAILS",
    `4. Product: ${product}`,
    `5. Quantity: ${quantity} bottle(s)`,
    `6. Product Total: Rs. ${total.toLocaleString("en-PK")}`,
    `7. Extra Instructions: ${extra || "None"}`,
    "",
    "Please confirm delivery charges and expected delivery date.",
    "Thank you!"
  ].join(String.fromCharCode(10));

  sendWhatsApp.href = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(orderMessage)}`;
  sendEmail.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent("New order - Herbal Oil Essence")}&body=${encodeURIComponent(orderMessage)}`;
  summary.textContent = `Thank you, ${name}. Your order summary is ${quantity} × ${product} (product total Rs. ${total.toLocaleString("en-PK")}). Choose one or both methods below to send it to us.`;
  confirmation.hidden = false;
  confirmation.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
