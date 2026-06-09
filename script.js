const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const worksTrack = document.querySelector(".works-track");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");
const contactForm = document.querySelector(".contact-form");
const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScuY5hfHJPty-RCR6V9K1IToeIdpdtAspp-YEcXljgsq2rp2A/viewform?usp=publish-editor";

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

function scrollWorks(direction) {
  if (!worksTrack) return;
  const card = worksTrack.querySelector(".work-card");
  const step = card ? card.getBoundingClientRect().width + 24 : 320;
  worksTrack.scrollBy({ left: direction * step, behavior: "smooth" });
}

prevButton?.addEventListener("click", () => scrollWorks(-1));
nextButton?.addEventListener("click", () => scrollWorks(1));

document.querySelector("[data-scroll-works]")?.addEventListener("click", () => {
  worksTrack?.scrollTo({ left: 0, behavior: "smooth" });
  worksTrack?.focus({ preventScroll: true });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll(".nav-links a")];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-38% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  window.open(googleFormUrl, "_blank", "noopener");
});
