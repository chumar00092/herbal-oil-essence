/*
  HERBAL OIL ESSENCE — QUICK SETUP
  1) Replace the WhatsApp number below with your country code + number, digits only.
     Pakistan example format: 923001234567 (do not include +, spaces or dashes).
  2) Replace the business email.
  3) Save this file and upload all website files to your free static host.
*/
const BUSINESS_WHATSAPP = "923314771733";
const BUSINESS_EMAIL = "saniajatt327@gmail.com";

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

const validWhatsApp = () => BUSINESS_WHATSAPP && !BUSINESS_WHATSAPP.includes("CHANGE") && /^\d{10,15}$/.test(BUSINESS_WHATSAPP);
function openWhatsApp(product = "") {
  if (!validWhatsApp()) {
    alert("Please add your real WhatsApp number in script.js before using order buttons.");
    return;
  }
  const message = product
    ? `Assalam-o-Alaikum! I am interested in ${product} from Herbal Oil Essence. Please share price, size and delivery details.`
    : "Assalam-o-Alaikum! I would like to place an order with Herbal Oil Essence. Please share your products, prices and delivery details.";
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
phoneDisplay.textContent = `+${BUSINESS_WHATSAPP}`;

document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name");
  const phone = form.get("phone");
  const product = form.get("product");
  const message = form.get("message") || "Please share price and delivery details.";
  const body = `Name: ${name}\nPhone: ${phone}\nProduct: ${product}\nMessage: ${message}`;
  if (!BUSINESS_EMAIL) {
    const status = document.getElementById("formStatus");
    status.textContent = "Please set your real business email in script.js before using the website order form.";
    return;
  }
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent("Order enquiry - Herbal Oil Essence")}&body=${encodeURIComponent(body)}`;
});
