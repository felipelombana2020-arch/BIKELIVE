/* ==========================================================================
   BIKELIVE - LÓGICA E INTERACTIVIDAD (script.js)
   ========================================================================== */

// BASE DE DATOS DE MOTOCICLETAS (Exclusivo >600cc)
const MOTOS = [
  {
    id: 1,
    nombre: "Ducati Panigale V4 S",
    categoria: "pista",
    cc: 1103,
    hp: 215,
    torque: "124 Nm",
    peso: "195.5 kg",
    precio: 34900,
    imagen: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1000",
    descripcion: "Superbike homologada de carreras con motor Desmosedici Stradale V4."
  },
  {
    id: 2,
    nombre: "Kawasaki Z H2 SE",
    categoria: "naked",
    cc: 998,
    hp: 200,
    torque: "137 Nm",
    peso: "240 kg",
    precio: 23500,
    imagen: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1000",
    descripcion: "Hypernaked sobrealimentada con supercargador exclusivo Kawasaki."
  },
  {
    id: 3,
    nombre: "BMW R 1250 GS Adventure",
    categoria: "adventure",
    cc: 1254,
    hp: 136,
    torque: "143 Nm",
    peso: "268 kg",
    precio: 28900,
    imagen: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1000",
    descripcion: "Rendimiento todoterreno sin fronteras con motor Boxer y ajuste dinámico."
  },
  {
    id: 4,
    nombre: "Yamaha YZF-R1M",
    categoria: "pista",
    cc: 998,
    hp: 200,
    torque: "113 Nm",
    peso: "202 kg",
    precio: 27500,
    imagen: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&q=80&w=1000",
    descripcion: "Chasis en fibra de carbono y amortiguación electrónica Öhlins ERS."
  },
  {
    id: 5,
    nombre: "KTM 1290 Super Duke R",
    categoria: "naked",
    cc: 1301,
    hp: 180,
    torque: "140 Nm",
    peso: "189 kg",
    precio: 21900,
    imagen: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1000",
    descripcion: "Conocida como 'The Beast', ligera y con entrega inmediata de par."
  },
  {
    id: 6,
    nombre: "Honda Africa Twin CRF1100L",
    categoria: "adventure",
    cc: 1084,
    hp: 102,
    torque: "105 Nm",
    peso: "226 kg",
    precio: 18400,
    imagen: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1000",
    descripcion: "Icónico modelo para expediciones extremas con opción de transmisión DCT."
  }
];

// Estado global para el carrusel
let currentSlide = 0;

// INICIALIZACIÓN GENERAL DEL SITIO
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();
  initCarousel();
  renderCatalog(MOTOS);
  populateSelects();
  setupCalculator();
  setupValidation();
  setupThemeToggle();
  setupModalEvents();
  setupFilterEvents();
});

// 1. MODO OSCURO / CLARO
function setupThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    
    if (icon) {
      icon.setAttribute("data-lucide", isDark ? "moon" : "sun");
      if (window.lucide) lucide.createIcons();
    }
  });
}

// 2. CARRUSEL DINÁMICO
function initCarousel() {
  const slidesContainer = document.getElementById("carousel-slides");
  const indicatorsContainer = document.getElementById("carousel-indicators");

  if (!slidesContainer || !indicatorsContainer) return;

  const featured = MOTOS.slice(0, 3);

  slidesContainer.innerHTML = featured.map((m, idx) => `
    <div class="carousel-item absolute inset-0 transition-opacity duration-700 ${idx === 0 ? 'opacity-100' : 'opacity-0'}">
      <img src="${m.imagen}" alt="${m.nombre}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-8 sm:p-12">
        <div>
          <span class="bg-red-600 text-white font-tech text-xs font-bold px-3 py-1 rounded-full uppercase">${m.cc} CC</span>
          <h2 class="font-brand text-3xl sm:text-5xl font-extrabold text-white mt-2">${m.nombre}</h2>
          <p class="text-gray-300 font-tech text-xl mt-1">$${m.precio.toLocaleString()} USD</p>
        </div>
      </div>
    </div>
  `).join('');

  indicatorsContainer.innerHTML = featured.map((_, idx) => `
    <button class="indicator-btn w-3 h-3 rounded-full transition-all ${idx === 0 ? 'bg-red-600 w-8' : 'bg-gray-600'}" data-slide="${idx}"></button>
  `).join('');

  const nextBtn = document.getElementById("next-slide");
  const prevBtn = document.getElementById("prev-slide");

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Cambio automático cada 5 segundos
  setInterval(nextSlide, 5000);
}

function showSlide(index) {
  const items = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".indicator-btn");

  items.forEach((item, idx) => {
    item.classList.toggle("opacity-100", idx === index);
    item.classList.toggle("opacity-0", idx !== index);
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle("bg-red-600", idx === index);
    dot.classList.toggle("w-8", idx === index);
    dot.classList.toggle("bg-gray-600", idx !== index);
    dot.classList.toggle("w-3", idx !== index);
  });

  currentSlide = index;
}

function nextSlide() {
  showSlide((currentSlide + 1) % 3);
}

function prevSlide() {
  showSlide((currentSlide - 1 + 3) % 3);
}

// 3. RENDERIZADO DEL PORTAFOLIO / CATÁLOGO
function renderCatalog(items) {
  const grid = document.getElementById("motos-grid");
  if (!grid) return;

  grid.innerHTML = items.map(m => `
    <div class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-red-600/50 transition-all group flex flex-col">
      <div class="relative h-56 overflow-hidden bg-black">
        <img src="${m.imagen}" alt="${m.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100">
        <span class="absolute top-3 left-3 bg-red-600 text-white font-tech font-bold text-xs px-2.5 py-1 rounded-md uppercase">
          ${m.cc} CC
        </span>
      </div>

      <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 class="font-brand text-xl font-bold text-white group-hover:text-red-500 transition-colors">${m.nombre}</h3>
          <p class="text-gray-400 text-xs mt-1 leading-relaxed">${m.descripcion}</p>
        </div>

        <div class="grid grid-cols-2 gap-2 bg-black/50 p-3 rounded-xl text-center font-tech">
          <div>
            <span class="block text-gray-500 text-xs uppercase">Potencia</span>
            <span class="text-white font-bold text-sm">${m.hp} HP</span>
          </div>
          <div>
            <span class="block text-gray-500 text-xs uppercase">Torque</span>
            <span class="text-white font-bold text-sm">${m.torque}</span>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2">
          <div>
            <span class="block text-xs text-gray-500 font-tech uppercase">Precio Base</span>
            <span class="text-2xl font-bold font-tech text-white">$${m.precio.toLocaleString()} USD</span>
          </div>
          <button onclick="openModal(${m.id})" class="p-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors glow-effect" title="Ver Ficha Técnica">
            <i data-lucide="eye" class="w-5 h-5"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// 4. FILTROS DE CATEGORÍA
function setupFilterEvents() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-btn").forEach(b => {
        b.classList.remove("bg-red-600", "text-white");
        b.classList.add("text-gray-400");
      });
      e.target.classList.add("bg-red-600", "text-white");
      e.target.classList.remove("text-gray-400");

      const filter = e.target.dataset.filter;
      if (filter === "all") renderCatalog(MOTOS);
      else renderCatalog(MOTOS.filter(m => m.categoria === filter));
    });
  });
}

// 5. POBLAR DESPLEGABLES (SELECTS)
function populateSelects() {
  const calcSelect = document.getElementById("calc-moto");
  if (calcSelect) {
    calcSelect.innerHTML = MOTOS.map(m => `<option value="${m.id}">${m.nombre} ($${m.precio.toLocaleString()} USD)</option>`).join('');
  }
}

// 6. CALCULADORA FINANCIERA INTERACTIVA
function setupCalculator() {
  const select = document.getElementById("calc-moto");
  const down = document.getElementById("calc-down");
  const months = document.getElementById("calc-months");

  if (!select || !down || !months) return;

  function update() {
    const moto = MOTOS.find(m => m.id == select.value) || MOTOS[0];
    const downPct = parseInt(down.value) / 100;
    const totalMonths = parseInt(months.value);

    const downVal = document.getElementById("calc-down-val");
    const monthsVal = document.getElementById("calc-months-val");
    if (downVal) downVal.innerText = `${down.value}%`;
    if (monthsVal) monthsVal.innerText = `${totalMonths} Meses`;

    const initialPay = moto.precio * downPct;
    const loan = moto.precio - initialPay;
    const interest = 0.012; // 1.2% mensual
    const monthly = (loan * interest) / (1 - Math.pow(1 + interest, -totalMonths));

    const resDownpay = document.getElementById("res-downpay");
    const resMonthly = document.getElementById("res-monthly");

    if (resDownpay) resDownpay.innerText = `$${Math.round(initialPay).toLocaleString()} USD`;
    if (resMonthly) resMonthly.innerText = `$${Math.round(monthly).toLocaleString()} USD`;
  }

  select.addEventListener("change", update);
  down.addEventListener("input", update);
  months.addEventListener("input", update);
  update();
}

// 7. MODAL DE FICHA TÉCNICA DETALLADA
function openModal(id) {
  const moto = MOTOS.find(m => m.id === id);
  const modal = document.getElementById("modal-details");
  const content = document.getElementById("modal-content");

  if (!modal || !content) return;

  content.innerHTML = `
    <img src="${moto.imagen}" alt="${moto.nombre}" class="w-full h-64 object-cover rounded-2xl mb-6 border border-gray-800">
    <h3 class="font-brand text-2xl font-bold text-white mb-2">${moto.nombre}</h3>
    <p class="text-gray-400 text-sm mb-6">${moto.descripcion}</p>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-black/60 p-4 rounded-2xl border border-gray-800 text-center font-tech mb-6">
      <div>
        <span class="text-xs text-gray-500 uppercase block">Cilindraje</span>
        <span class="text-lg font-bold text-white">${moto.cc} cc</span>
      </div>
      <div>
        <span class="text-xs text-gray-500 uppercase block">Potencia</span>
        <span class="text-lg font-bold text-red-500">${moto.hp} HP</span>
      </div>
      <div>
        <span class="text-xs text-gray-500 uppercase block">Torque</span>
        <span class="text-lg font-bold text-white">${moto.torque}</span>
      </div>
      <div>
        <span class="text-xs text-gray-500 uppercase block">Peso Seco</span>
        <span class="text-lg font-bold text-white">${moto.peso}</span>
      </div>
    </div>

    <a href="#contacto" onclick="closeModal()" class="w-full block text-center py-4 bg-red-600 hover:bg-red-700 text-white font-tech font-bold uppercase rounded-xl transition-all glow-effect">
      Solicitar Asesoría de este Modelo
    </a>
  `;

  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("modal-details");
  if (modal) modal.classList.add("hidden");
}

function setupModalEvents() {
  const closeBtn = document.getElementById("close-modal");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
}

// 8. VALIDACIÓN DE FORMULARIO DE CONTACTO
function setupValidation() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let valid = true;
    const name = document.getElementById("form-name")?.value.trim() || "";
    const email = document.getElementById("form-email")?.value.trim() || "";
    const phone = document.getElementById("form-phone")?.value.trim() || "";
    const msg = document.getElementById("form-message")?.value.trim() || "";

    const errName = document.getElementById("err-name");
    const errEmail = document.getElementById("err-email");
    const errPhone = document.getElementById("err-phone");
    const errMsg = document.getElementById("err-message");

    if (errName) errName.classList.toggle("hidden", !!name);
    if (errEmail) errEmail.classList.toggle("hidden", email.includes("@") && email.includes("."));
    if (errPhone) errPhone.classList.toggle("hidden", phone.length >= 7);
    if (errMsg) errMsg.classList.toggle("hidden", !!msg);

    if (!name || !email.includes("@") || phone.length < 7 || !msg) {
      valid = false;
    }

    if (valid) {
      const successBox = document.getElementById("form-success");
      if (successBox) {
        successBox.classList.remove("hidden");
        form.reset();
        setTimeout(() => {
          successBox.classList.add("hidden");
        }, 5000);
      }
    }
  });
}