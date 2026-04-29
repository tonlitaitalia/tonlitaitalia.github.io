const products = [
  {
    id: "yxc300",
    name: "Mini gru 3T",
    category: "gru",
    label: "Mini gru cingolata",
    image: "assets/sheet-yxc300.jpg",
    technicalImage: "assets/technical-final/yxc300-technical-final.png",
    loadChartImage: "assets/load-charts/high-res/yxc300-load-chart-it.png",
    description: "Modello YXC300 con corpo stretto, doppia alimentazione diesel/elettrica e portata massima da 3 tonnellate.",
    specs: {
      Modello: "YXC300",
      Portata: "3.000 kg",
      Peso: "2,7 t",
      Raggio: "10 m",
      Altezza: "10,8 m",
      Braccio: "5 sezioni",
      Alimentazione: "Diesel / elettrica",
    },
  },
  {
    id: "yxc400",
    name: "Mini gru 4T",
    category: "gru",
    label: "Mini gru cingolata",
    image: "assets/sheet-yxc400.jpg",
    technicalImage: "assets/technical-final/yxc400-technical-final.png",
    loadChartImage: "assets/load-charts/high-res/yxc400-load-chart-it.png",
    description: "Modello YXC400 con portata massima da 4 tonnellate, braccio telescopico da 15 metri e struttura compatta.",
    specs: {
      Modello: "YXC400",
      Portata: "4.000 kg",
      Peso: "3 t",
      Raggio: "13 m",
      Altezza: "15 m",
      Braccio: "6 sezioni",
      Alimentazione: "Diesel / elettrica",
    },
  },
  {
    id: "yxc500",
    name: "Mini gru 5T",
    category: "gru",
    label: "Mini gru cingolata",
    image: "assets/sheet-yxc500.jpg",
    technicalImage: "assets/technical-final/yxc500-technical-final.png",
    loadChartImage: "assets/load-charts/high-res/yxc500-load-chart-it.png",
    description: "Modello YXC500, la mini gru più potente della gamma, con portata massima da 5 tonnellate, braccio da 17 metri e motore Yanmar.",
    specs: {
      Modello: "YXC500",
      Portata: "5.000 kg",
      Peso: "6,7 t",
      Raggio: "15 m",
      Altezza: "17 m",
      Motore: "Yanmar 4T98",
      Potenza: "42,4 kW",
    },
  },
  {
    id: "yx10",
    name: "YX10",
    category: "escavatori",
    label: "Mini escavatore",
    image: "assets/sheet-yx10.jpg",
    description: "Mini escavatore leggero per piccoli scavi, manutenzione esterna, giardinaggio e lavori in spazi ridotti.",
    specs: {
      Peso: "800 kg",
      Benna: "0,025 m³",
      Carro: "940 mm",
      Scavo: "1600 mm",
      Dimensioni: "2800 × 940 × 2200 mm",
      Scarico: "1750 mm",
      Raggio: "3050 mm",
    },
  },
  {
    id: "yx15",
    name: "YX15",
    category: "escavatori",
    label: "Mini escavatore",
    image: "assets/sheet-yx15.jpg",
    description: "Mini escavatore stabile e compatto per scavi leggeri, ristrutturazioni e lavori residenziali.",
    specs: {
      Peso: "1200 kg",
      Benna: "0,025 m³",
      Carro: "1100 mm",
      Scavo: "1800 mm",
      Motore: "Koop 192 diesel",
      Potenza: "7,6 kW",
      Dimensioni: "3100 x 1100 x 2300 mm",
    },
  },
  {
    id: "yx18",
    name: "YX18",
    category: "escavatori",
    label: "Mini escavatore",
    image: "assets/sheet-yx18.jpg",
    description: "Mini escavatore con carro estensibile e idraulica rinforzata, pensato per lavori più impegnativi mantenendo dimensioni compatte.",
    specs: {
      Peso: "1800 kg",
      Benna: "0,02 m³",
      Carro: "940–1120 mm",
      Scavo: "2000 mm",
      Motore: "Laidong 385 Euro V",
      Raggio: "3260 mm",
    },
  },
  {
    id: "yx20",
    name: "YX20",
    category: "escavatori",
    label: "Mini escavatore",
    image: "assets/sheet-yx20.jpg",
    description: "Mini escavatore da 2 tonnellate con motore Kubota, pompa a pistoni e doppia velocità.",
    specs: {
      Peso: "2000 kg",
      Benna: "0,02 m³",
      Carro: "1010–1230 mm",
      Scavo: "2000 mm",
      Motore: "Kubota D902",
      Potenza: "11,8 kW",
      Flusso: "45 L/min",
    },
  },
  {
    id: "yx25",
    name: "YX25",
    category: "escavatori",
    label: "Mini escavatore",
    image: "assets/sheet-yx25.jpg",
    description: "Mini escavatore con cabina, idraulica load-sensing e maggiore capacità di scavo per utilizzi professionali.",
    specs: {
      Peso: "2400 kg",
      Benna: "0,08 m³",
      Carro: "1100–1440 mm",
      Scavo: "2650 mm",
      Motore: "Kubota D1105",
      Potenza: "14,2 kW",
    },
  },
  {
    id: "t360",
    name: "T360",
    category: "pale",
    label: "Mini pala cingolata",
    image: "assets/sheet-t360.jpg",
    description: "Mini pala compatta per lavori leggeri, manutenzione, giardinaggio e movimentazione di piccoli carichi.",
    specs: {
      Peso: "900 kg",
      Portata: "200 kg",
      "Carico max": "300 kg",
      Benna: "0,12 m³",
      Motore: "Koop 192 / B&S",
      Dimensioni: "2070 x 920 x 1300 mm",
    },
  },
  {
    id: "t460",
    name: "T460",
    category: "pale",
    label: "Mini pala cingolata",
    image: "assets/sheet-t460-footer-consistent.png?v=2",
    description: "Mini pala pratica e compatta per edilizia, manutenzione e movimentazione, disponibile con motore diesel o benzina.",
    specs: {
      Peso: "1200 kg",
      Portata: "300 kg",
      "Carico max": "400 kg",
      Benna: "0,12 m³",
      Motore: "Koop 292 diesel",
      Dimensioni: "2140 x 1050 x 1300 mm",
    },
  },
  {
    id: "v800",
    name: "V800",
    category: "pale",
    label: "Mini pala cingolata",
    image: "assets/sheet-v800-footer-consistent.png",
    description: "Mini pala compatta e potente per lavori professionali, con comandi pilota idraulici e buona capacità operativa.",
    specs: {
      Peso: "1728 kg",
      Portata: "420 kg",
      "Carico max": "500 kg",
      Benna: "0,15 m³",
      Motore: "Yanmar / Kubota",
      Dimensioni: "2651 x 1020 x 1573 mm",
    },
  },
  {
    id: "v1000",
    name: "V1000",
    category: "pale",
    label: "Mini pala cingolata",
    image: "assets/sheet-v1000.jpg",
    description: "Mini pala con braccio verticale, portata superiore e struttura robusta per lavori professionali.",
    specs: {
      Peso: "1417 kg",
      Portata: "500 kg",
      "Carico max": "650 kg",
      Benna: "0,19 m³",
      Motore: "Yanmar / Kubota",
      Dimensioni: "2691 x 1235 x 1548 mm",
    },
  },
];

const grid = document.querySelector("#productGrid");
const filters = document.querySelectorAll(".filter");
const modal = document.querySelector("#productModal");
const modalTitle = document.querySelector("#modalTitle");
const modalCategory = document.querySelector("#modalCategory");
const modalDescription = document.querySelector("#modalDescription");
const modalSpecs = document.querySelector("#modalSpecs");
const modalTabs = document.querySelector("#modalTabs");
const modalActiveImage = document.querySelector("#modalActiveImage");

const cardSpecOverrides = {
  yxc300: [
    ["Modello", "YXC300"],
    ["Portata", "3.000 kg"],
    ["Peso", "2,7 t"],
    ["Raggio", "10 m"],
  ],
  yxc400: [
    ["Modello", "YXC400"],
    ["Portata", "4.000 kg"],
    ["Peso", "3 t"],
    ["Raggio", "13 m"],
  ],
  yxc500: [
    ["Modello", "YXC500"],
    ["Portata", "5.000 kg"],
    ["Peso", "6,7 t"],
    ["Raggio", "15 m"],
  ],
  yx10: [
    ["Peso", "800 kg"],
    ["Benna", "0,025 m³"],
    ["Carro", "940 mm"],
    ["Scavo", "1600 mm"],
  ],
  yx15: [
    ["Peso", "1200 kg"],
    ["Benna", "0,025 m³"],
    ["Carro", "1100 mm"],
    ["Scavo", "1800 mm"],
  ],
  yx18: [
    ["Peso", "1800 kg"],
    ["Benna", "0,02 m³"],
    ["Carro", "940–1120 mm"],
    ["Scavo", "2000 mm"],
  ],
  yx20: [
    ["Peso", "2000 kg"],
    ["Benna", "0,02 m³"],
    ["Carro", "1010–1230 mm"],
    ["Scavo", "2000 mm"],
  ],
  yx25: [
    ["Peso", "2400 kg"],
    ["Benna", "0,08 m³"],
    ["Carro", "1100–1440 mm"],
    ["Scavo", "2650 mm"],
  ],
  t360: [
    ["Peso", "900 kg"],
    ["Portata", "200 kg"],
    ["Carico max", "300 kg"],
    ["Benna", "0,12 m³"],
  ],
  t460: [
    ["Peso", "1200 kg"],
    ["Portata", "300 kg"],
    ["Carico max", "400 kg"],
    ["Benna", "0,12 m³"],
  ],
  v800: [
    ["Peso", "1728 kg"],
    ["Portata", "420 kg"],
    ["Carico max", "500 kg"],
    ["Benna", "0,15 m³"],
  ],
  v1000: [
    ["Peso", "1417 kg"],
    ["Portata", "500 kg"],
    ["Carico max", "650 kg"],
    ["Benna", "0,19 m³"],
  ],
};

function getCardSpecs(product) {
  return cardSpecOverrides[product.id] || Object.entries(product.specs).slice(0, 4);
}

function renderProducts() {
  grid.innerHTML = products
    .map((product) => {
      const specs = getCardSpecs(product)
        .map(([key, value]) => `<div class="spec-pill"><small>${key}</small><strong>${value}</strong></div>`)
        .join("");

      return `
        <article class="product-card reveal" data-category="${product.category}">
          <div class="product-media">
            <img src="${product.image}" alt="Scheda tecnica ${product.label} TONLITA ${product.name}" loading="lazy">
            <span class="product-badge">${product.label}</span>
          </div>
          <div class="product-body">
            <div>
              <h3>${product.name}</h3>
              <p>${product.description}</p>
            </div>
            <div class="spec-row">${specs}</div>
            <button class="product-action" type="button" data-product="${product.id}">Apri scheda tecnica</button>
          </div>
        </article>
      `;
    })
    .join("");

  observeReveals();
  wirePremiumHover();
}

function openProduct(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  modalTitle.textContent = product.name;
  modalCategory.textContent = product.label;
  modalDescription.textContent = product.description;
  const images = [
    { label: "Scheda generale", src: product.image },
    product.technicalImage ? { label: "Misure tecniche", src: product.technicalImage } : null,
    product.loadChartImage ? { label: "Diagramma di carico", src: product.loadChartImage } : null,
  ].filter(Boolean);

  modalTabs.innerHTML = images
    .map(
      (item, index) =>
        `<button class="modal-tab ${index === 0 ? "is-active" : ""}" type="button" data-modal-image="${item.src}" data-modal-label="${item.label}">${item.label}</button>`
    )
    .join("");
  modalActiveImage.src = images[0].src;
  modalActiveImage.alt = `${images[0].label} TONLITA ${product.name}`;
  modalSpecs.innerHTML = Object.entries(product.specs)
    .map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`)
    .join("");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function observeReveals() {
  const reveals = document.querySelectorAll(".reveal:not(.watched)");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  reveals.forEach((element) => {
    element.classList.add("watched");
    observer.observe(element);
  });
}

function wirePremiumHover() {
  const premiumElements = document.querySelectorAll(
    ".proof-item:not(.is-hover-wired), .category-card:not(.is-hover-wired), .product-card:not(.is-hover-wired), .assurance-item:not(.is-hover-wired), .process-list li:not(.is-hover-wired)"
  );

  premiumElements.forEach((element) => {
    element.classList.add("is-hover-wired");
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      element.style.setProperty("--mx", `${x}%`);
      element.style.setProperty("--my", `${y}%`);
    });
  });
}

renderProducts();
wirePremiumHover();

document.addEventListener("click", (event) => {
  const productButton = event.target.closest("[data-product]");
  const closeButton = event.target.closest("[data-close-modal]");
  const modalImageButton = event.target.closest("[data-modal-image]");

  if (productButton) {
    openProduct(productButton.dataset.product);
  }

  if (modalImageButton) {
    modalTabs.querySelectorAll(".modal-tab").forEach((button) => button.classList.toggle("is-active", button === modalImageButton));
    modalActiveImage.src = modalImageButton.dataset.modalImage;
    modalActiveImage.alt = `${modalImageButton.dataset.modalLabel} TONLITA`;
  }

  if (closeButton) {
    closeModal();
  }
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll(".product-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

const header = document.querySelector(".site-header");
function setHeaderState() {
  header.dataset.elevated = String(window.scrollY > 30);
}

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
