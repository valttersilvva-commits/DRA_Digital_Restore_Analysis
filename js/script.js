const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

menuToggle?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach((el) => revealObserver.observe(el));

const slides = Array.from(document.querySelectorAll(".slide"));
const dotsContainer = document.querySelector(".carousel-dots");
const prev = document.querySelector(".carousel-control.prev");
const next = document.querySelector(".carousel-control.next");
let currentSlide = 0;
let carouselTimer;

function createDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Ir para etapa ${index + 1}`);
    dot.addEventListener("click", () => {
      goToSlide(index);
      restartCarousel();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateCarousel() {
  slides.forEach((slide, index) => slide.classList.toggle("active", index === currentSlide));
  dotsContainer.querySelectorAll("button").forEach((dot, index) => dot.classList.toggle("active", index === currentSlide));
}

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  updateCarousel();
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function startCarousel() {
  carouselTimer = setInterval(nextSlide, 8000);
}

function restartCarousel() {
  clearInterval(carouselTimer);
  startCarousel();
}

if (slides.length) {
  createDots();
  updateCarousel();
  startCarousel();
  next?.addEventListener("click", () => { nextSlide(); restartCarousel(); });
  prev?.addEventListener("click", () => { prevSlide(); restartCarousel(); });
}

const form = document.getElementById("whatsappForm");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const numero = "5511949180508"; // Exemplo: 5511971656389

  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const dispositivo = document.getElementById("dispositivo").value;
  const problema = document.getElementById("problema").value;
  const arquivos = document.getElementById("arquivos").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  const texto = `Olá, gostaria de uma avaliação DRA.

Nome: ${nome}
WhatsApp: ${telefone}
Dispositivo: ${dispositivo}
Problema: ${problema}
Arquivos importantes: ${arquivos || "Não informado"}

Mensagem adicional:
${mensagem || "Sem mensagem adicional"}`;

  if (numero === "SEU_NUMERO_AQUI") {
    alert("Antes de publicar, substitua SEU_NUMERO_AQUI no arquivo js/script.js pelo número do WhatsApp com DDI e DDD. Exemplo: 5511999999999.");
    return;
  }

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, "_blank");
});


// Rolagem segura dos links internos (inclui Voltar ao topo)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const destino = document.querySelector(this.getAttribute("href"));
    if (destino) {
      e.preventDefault();
      destino.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
