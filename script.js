const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const form = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

const refreshHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
};

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  header?.classList.remove("menu-active");
  nav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

window.addEventListener("scroll", refreshHeader, { passive: true });
refreshHeader();

menuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", Boolean(isOpen));
  header?.classList.toggle("menu-active", Boolean(isOpen));
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const contact = String(data.get("contact") || "").trim();
  const topic = String(data.get("topic") || "Anfrage").trim();
  const message = String(data.get("message") || "").trim();

  const body = [
    "Guten Tag",
    "",
    message,
    "",
    `Name: ${name}`,
    `Kontakt: ${contact}`,
  ].join("\n");

  if (formStatus) {
    formStatus.textContent = "Das E-Mail-Programm wird geöffnet.";
  }

  window.location.href = `mailto:info@kreuchi-auto.ch?subject=${encodeURIComponent(
    `Kreuchi Auto AG - ${topic}`,
  )}&body=${encodeURIComponent(body)}`;
});

window.addEventListener("load", () => {
  if (window.lucide) {
    window.lucide.createIcons({ strokeWidth: 2.1 });
  }
});
