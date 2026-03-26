const CONFIG = {
  googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Mobiliadora+Cristelli+Sete+Lagoas+MG",
  wifi: {
    ssid: "Cristelli_",
    password: "cliente01"
  },
  instagramUrl: "https://www.instagram.com/mobcristelli",
  whatsappUrl: "https://wa.me/553188606894"
};

const googleLink = document.getElementById("googleLink");
const instagramLink = document.getElementById("instagramLink");
const whatsappLink = document.getElementById("whatsappLink");
const wifiSsid = document.getElementById("wifiSsid");
const wifiPassword = document.getElementById("wifiPassword");
const wifiToggle = document.getElementById("wifiToggle");
const copyPassword = document.getElementById("copyPassword");

googleLink.href = CONFIG.googleReviewUrl;
instagramLink.href = CONFIG.instagramUrl;
whatsappLink.href = CONFIG.whatsappUrl;
wifiSsid.textContent = CONFIG.wifi.ssid;
wifiPassword.textContent = CONFIG.wifi.password;

let timer = null;
let remaining = 10;

function closeWifi() {
  wifiToggle.classList.remove("open");
  wifiToggle.setAttribute("aria-expanded", "false");
  remaining = 10;

  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function openWifi() {
  if (timer) clearInterval(timer);

  remaining = 10;
  wifiToggle.classList.add("open");
  wifiToggle.setAttribute("aria-expanded", "true");

  timer = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) closeWifi();
  }, 1000);
}

function toggleWifi(event) {
  const clickedCopyButton = event.target.closest("#copyPassword");
  if (clickedCopyButton) return;

  const isOpen = wifiToggle.classList.contains("open");
  if (isOpen) {
    closeWifi();
  } else {
    openWifi();
  }
}

wifiToggle.addEventListener("click", toggleWifi);
wifiToggle.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleWifi(event);
  }
});

copyPassword.addEventListener("click", async (event) => {
  event.stopPropagation();

  try {
    await navigator.clipboard.writeText(CONFIG.wifi.password);
    copyPassword.style.opacity = "0.65";
    setTimeout(() => {
      copyPassword.style.opacity = "1";
    }, 500);
  } catch (error) {
    console.error("Não foi possível copiar a senha.");
  }
});
