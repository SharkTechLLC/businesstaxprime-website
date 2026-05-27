const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".primary-nav a").forEach((link) => {
  const href = link.getAttribute("href") || "";
  const [linkPage, linkHash] = href.split("#");
  const hashMatches = linkHash ? `#${linkHash}` === window.location.hash : true;
  if (linkPage === currentPage && hashMatches) {
    link.setAttribute("aria-current", "page");
  }
});

const currentLanguageLink = document.querySelector("[data-language-current]");
if (currentLanguageLink) {
  currentLanguageLink.setAttribute("href", window.location.pathname || "index.html");
  currentLanguageLink.setAttribute("aria-current", "true");
}

document.querySelectorAll("[data-translate-lang]").forEach((link) => {
  const language = link.getAttribute("data-translate-lang");
  const publicPath = window.location.pathname || "/";
  const publicUrl = `https://businesstaxprime.com${publicPath}`;
  link.setAttribute(
    "href",
    `https://translate.google.com/translate?sl=en&tl=${language}&u=${encodeURIComponent(publicUrl)}`
  );
});

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const revealNodes = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}
