const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (navToggle && primaryNav) {
  const closeNavigation = () => {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation();
    }
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const currentHash = window.location.hash;
document.querySelectorAll(".primary-nav a").forEach((link) => {
  const href = link.getAttribute("href") || "";
  const [linkPage, linkHash] = href.split("#");
  if (linkPage !== currentPage) {
    return;
  }

  const hashMatches = linkHash ? `#${linkHash}` === currentHash : !currentHash;
  if (hashMatches) {
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
  const publicPath = window.location.pathname === "/" ? "/index.html" : window.location.pathname;
  const publicUrl = `https://businesstaxprime.com${publicPath}`;
  link.setAttribute(
    "href",
    `https://translate.google.com/translate?hl=en&sl=en&tl=${language}&u=${encodeURIComponent(publicUrl)}&client=webapp`
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
