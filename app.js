const products = [
  {
    id: "yxc300",
    name: "Mini gru 3T",
    category: "gru",
    label: "Mini gru cingolata",
    image: "assets/catalog-sheets/yxc300-sheet.jpg",
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
    image: "assets/catalog-sheets/yxc400-sheet.jpg",
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
    image: "assets/catalog-sheets/yxc500-sheet.jpg",
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
    image: "assets/catalog-sheets/yx10-sheet.jpg",
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
    image: "assets/catalog-sheets/yx15-sheet.jpg",
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
    image: "assets/catalog-sheets/yx18-sheet.png",
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
    image: "assets/catalog-sheets/yx20-sheet.png",
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
    image: "assets/catalog-sheets/yx25-sheet.png",
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
    id: "me18-9",
    name: "ME18.9",
    category: "escavatori",
    label: "Mini escavatore cingolato",
    image: "assets/catalog-sheets/me18-9-sheet.png",
    description: "Mini escavatore cingolato con cabina operatore, idraulica load-sensing e configurazione professionale per maggiore capacità di scavo.",
    specs: {
      Motore: "YANMAR 3TNV74",
      "Peso operativo": "1,86 t",
      Benna: "0,05 m³",
      "Sistema idraulico": "Le-HydrauliX",
      "Pompa idraulica": "LE-Hyr LX10VO28",
      "Portata massima": "61,6 L/min",
      "Pressione impostata": "21 MPa",
      "Serbatoio idraulico": "16 L",
      "Attrezzatura": "Benna standard 450 mm",
      Accessori: "Accessori e attrezzature compatibili disponibili su richiesta. Disponibilità e quotazione da confermare in base al modello e alla configurazione.",
    },
    details: {
      "Configurazione tecnica principale": [
        ["Modello", "ME18.9"],
        ["Modello motore", "YANMAR 3TNV74"],
        ["Joystick", "Standard"],
        ["Sistema idraulico", "Le-HydrauliX"],
        ["Produttore pompa idraulica", "LE-Hyr LX10VO28"],
        ["Produttore valvola di controllo principale", "LX09H"],
        ["Produttore motore di rotazione", "inline HCL245"],
        ["Produttore motore di traslazione", "inline HMV11"],
        ["Martello idraulico", "Scelta"],
      ],
      "Impianto idraulico": [
        ["Modello pompa idraulica", "LE-Hyr LX10VO28"],
        ["Portata massima", "61,6 L/min"],
        ["Pressione impostata", "21 MPa"],
        ["Volume serbatoio idraulico", "16 L"],
      ],
      "Applicazioni": "Scavo compatto professionale, lavori edili, manutenzioni, cantieri residenziali e operazioni dove servono cabina e maggiore capacità di scavo.",
    },
  },
  {
    id: "me26-9",
    name: "ME26.9",
    category: "escavatori",
    label: "Mini escavatore cingolato",
    image: "assets/catalog-sheets/me26-9-sheet.png",
    description: "Mini escavatore cingolato con cabina operatore, impianto idraulico professionale e maggiore capacità di scavo.",
    specs: {
      Motore: "YANMAR 3TNV80F",
      "Peso operativo": "2,9 t",
      Benna: "0,08 m³",
      "Sistema idraulico": "Le-HydrauliX",
      "Pompa idraulica": "HP5V45 / LX10VO28",
      "Portata massima": "80 / 70 L/min",
      "Pressione impostata": "24,5 / 24 MPa",
      "Serbatoio idraulico": "28 L",
      Accessori: "Accessori e attrezzature compatibili disponibili su richiesta. Disponibilità e quotazione da confermare in base al modello e alla configurazione.",
    },
    details: {
      "Configurazione tecnica principale": [
        ["Modello", "ME26.9"],
        ["Modello motore", "YANMAR 3TNV80F"],
        ["Joystick", "Standard"],
        ["Sistema idraulico", "Le-HydrauliX"],
        ["Produttore pompa idraulica", "LX10VO28"],
        ["Produttore valvola di controllo principale", "LX09EX-09YC"],
        ["Produttore motore di rotazione", "Inline HMSX1500"],
        ["Produttore motore di traslazione", "Inline HM4V22"],
        ["Martello idraulico", "Opzionale"],
      ],
      "Impianto idraulico": [
        ["Sistema idraulico", "Le-HydrauliX"],
        ["Modello pompa idraulica", "HP5V45 / LX10VO28"],
        ["Portata massima", "80 / 70 L/min"],
        ["Pressione impostata", "24,5 / 24 MPa"],
        ["Capacità serbatoio idraulico", "28 L"],
      ],
      "Applicazioni": "Scavi professionali, edilizia, lavori in spazi compatti, manutenzione e movimento terra leggero con cabina operatore.",
    },
  },
  {
    id: "me35-10",
    name: "ME35.10",
    category: "escavatori",
    label: "Mini escavatore cingolato",
    image: "assets/catalog-sheets/me35-10-sheet.png",
    description: "Mini escavatore cingolato con cabina operatore, motore Yanmar e configurazione professionale.",
    specs: {
      Motore: "YANMAR 3TNV88F-ESSY",
      "Peso operativo": "3,75 t",
      Benna: "0,12 m³",
      "Sistema idraulico": "Le-HydrauliX",
      "Pompa idraulica": "LX10VO45",
      "Portata massima": "99 L/min",
      "Pressione impostata": "26 / 25,5 MPa",
      "Serbatoio idraulico": "50 L",
      Accessori: "Accessori e attrezzature compatibili disponibili su richiesta. Disponibilità e quotazione da confermare in base al modello e alla configurazione.",
    },
    details: {
      "Configurazione tecnica principale": [
        ["Modello", "ME35.10"],
        ["Modello motore", "YANMAR 3TNV88F-ESSY"],
        ["Joystick", "Standard"],
        ["Sistema idraulico", "Le-HydrauliX"],
        ["Produttore pompa idraulica", "LE-Hyr LX10VO45"],
        ["Produttore valvola di controllo principale", "LE-Hyr LX09EX"],
        ["Produttore motore di rotazione", "Inline HM5X1800"],
        ["Produttore motore di traslazione", "Inline HM4V22-11"],
        ["Martello idraulico", "Opzionale"],
      ],
      "Impianto idraulico": [
        ["Sistema idraulico", "Le-HydrauliX"],
        ["Modello pompa idraulica", "LX10VO45"],
        ["Portata massima", "99 L/min"],
        ["Pressione impostata", "26 / 25,5 MPa"],
        ["Capacità serbatoio idraulico", "50 L"],
      ],
      "Applicazioni": "Scavi professionali, lavori edili, cantieri, manutenzioni e movimento terra compatto con configurazione superiore.",
    },
  },
  {
    id: "me60-9",
    name: "ME60.9",
    category: "escavatori",
    label: "Mini escavatore cingolato",
    image: "assets/catalog-sheets/me60-9-sheet.png",
    description: "Mini escavatore cingolato con cabina operatore, impianto idraulico professionale e maggiore capacità di scavo.",
    specs: {
      Motore: "YANMAR 4TNV98C",
      "Peso operativo": "6 t",
      Benna: "0,22 m³",
      "Sistema idraulico": "HAWE Inline",
      "Pompa idraulica": "HAWE Inline HP5V76",
      "Portata massima": "160 L/min",
      "Pressione operativa": "28 MPa",
      "Serbatoio olio idraulico": "80 L",
      Accessori: "Accessori e attrezzature compatibili disponibili su richiesta. Disponibilità e quotazione da confermare in base al modello e alla configurazione.",
    },
    details: {
      "Configurazione tecnica principale": [
        ["Modello", "ME60.9"],
        ["Modello motore", "YANMAR 4TNV98C"],
        ["Joystick", "Standard"],
        ["Climatizzatore automatico", "Standard"],
        ["Sistema monitoraggio remoto", "Standard"],
        ["Sedile ammortizzato", "Opzionale"],
        ["Sistema idraulico", "HAWE Inline"],
        ["Produttore pompa idraulica", "HAWE Inline"],
        ["Produttore valvola di controllo principale", "HAWE Inline"],
        ["Produttore motore di rotazione", "HAWE Inline"],
      ],
      "Impianto idraulico": [
        ["Sistema idraulico", "HAWE Inline"],
        ["Modello pompa idraulica", "HAWE Inline HP5V76"],
        ["Portata massima", "160 L/min"],
        ["Pressione operativa", "28 MPa"],
        ["Capacità serbatoio olio idraulico", "80 L"],
      ],
      "Applicazioni": "Scavi professionali, movimento terra, cantieri strutturati e lavorazioni dove servono peso operativo e capacità superiori.",
    },
  },
  {
    id: "t360",
    name: "T360",
    category: "pale",
    label: "Mini pala cingolata",
    image: "assets/catalog-sheets/t360-sheet.jpg",
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
    image: "assets/catalog-sheets/t460-sheet.png",
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
    image: "assets/catalog-sheets/v800-sheet.png",
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
    image: "assets/catalog-sheets/v1000-sheet.jpg",
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

const productOriginalImages = {
  yxc300: [
    { label: "Foto originale YXC300 1", src: "assets/catalog-photos/yxc300-1.jpg" },
    { label: "Foto originale YXC300 2", src: "assets/catalog-photos/yxc300-2.jpg" },
  ],
  yxc400: [{ label: "Foto originale YXC400", src: "assets/catalog-photos/yxc400-1.jpg" }],
  yxc500: [
    { label: "Foto originale YXC500 1", src: "assets/catalog-photos/yxc500-1.jpg" },
    { label: "Foto originale YXC500 2", src: "assets/catalog-photos/yxc500-2.jpg" },
  ],
  yx10: [
    { label: "Foto originale YX10 1", src: "assets/catalog-photos/yx10-1.jpg" },
    { label: "Foto originale YX10 2", src: "assets/catalog-photos/yx10-2.jpg" },
  ],
  yx15: [
    { label: "Foto originale YX15 1", src: "assets/catalog-photos/yx15-1.jpg" },
    { label: "Foto originale YX15 2", src: "assets/catalog-photos/yx15-2.jpg" },
  ],
  yx18: [
    { label: "Foto originale YX18 1", src: "assets/catalog-photos/yx18-1.jpg" },
    { label: "Foto originale YX18 2", src: "assets/catalog-photos/yx18-2.jpg" },
  ],
  yx20: [
    { label: "Foto originale YX20 1", src: "assets/catalog-photos/yx20-1.jpg" },
    { label: "Foto originale YX20 2", src: "assets/catalog-photos/yx20-2.jpg" },
  ],
  yx25: [
    { label: "Foto originale YX25 1", src: "assets/catalog-photos/yx25-1.jpg" },
    { label: "Foto originale YX25 2", src: "assets/catalog-photos/yx25-2.jpg" },
  ],
  "me18-9": [
    { label: "Foto originale ME18.9 1", src: "assets/catalog-photos/me18-9-1.jpg" },
    { label: "Foto originale ME18.9 2", src: "assets/catalog-photos/me18-9-2.jpg" },
  ],
  "me26-9": [
    { label: "Foto originale ME26.9 1", src: "assets/catalog-photos/me26-9-1.jpg" },
    { label: "Foto originale ME26.9 2", src: "assets/catalog-photos/me26-9-2.jpg" },
  ],
  "me35-10": [
    { label: "Foto originale ME35.10 1", src: "assets/catalog-photos/me35-10-1.jpg" },
    { label: "Foto originale ME35.10 2", src: "assets/catalog-photos/me35-10-2.jpg" },
  ],
  "me60-9": [{ label: "Foto originale ME60.9", src: "assets/catalog-photos/me60-9-1.jpg" }],
  t360: [
    { label: "Foto originale T-360 1", src: "assets/catalog-photos/t360-1.jpg" },
    { label: "Foto originale T-360 2", src: "assets/catalog-photos/t360-2.jpg" },
  ],
  t460: [
    { label: "Foto originale T-460 1", src: "assets/catalog-photos/t460-1.jpg" },
    { label: "Foto originale T-460 2", src: "assets/catalog-photos/t460-2.jpg" },
  ],
  v800: [
    { label: "Foto originale V800 1", src: "assets/catalog-photos/v800-1.jpg" },
    { label: "Foto originale V800 2", src: "assets/catalog-photos/v800-2.jpg" },
  ],
  v1000: [
    { label: "Foto originale V1000 1", src: "assets/catalog-photos/v1000-1.jpg" },
    { label: "Foto originale V1000 2", src: "assets/catalog-photos/v1000-2.jpg" },
  ],
};

const craneVisualSections = {
  yxc300: [
    { label: "Scheda tecnica", src: "assets/catalog-sheets/yxc300-sheet.jpg" },
    { label: "Misure tecniche", src: "assets/catalog-cranes/yxc300-measures.jpg" },
    { label: "Diagramma di carico", src: "assets/catalog-cranes/yxc300-load-chart.jpg" },
  ],
  yxc400: [
    { label: "Scheda tecnica", src: "assets/catalog-sheets/yxc400-sheet.jpg" },
    { label: "Misure tecniche", src: "assets/catalog-cranes/yxc400-measures.jpg" },
    { label: "Diagramma di carico", src: "assets/catalog-cranes/yxc400-load-chart.jpg" },
  ],
  yxc500: [
    { label: "Scheda tecnica", src: "assets/catalog-sheets/yxc500-sheet.jpg" },
    { label: "Misure tecniche", src: "assets/catalog-cranes/yxc500-measures.jpg" },
    { label: "Diagramma di carico", src: "assets/catalog-cranes/yxc500-load-chart.jpg" },
  ],
};

const priceCondition = "IVA e spedizione escluse";
const accessoriesText =
  "Accessori e attrezzature compatibili disponibili su richiesta. Disponibilità e quotazione da confermare in base al modello e alla configurazione.";

const craneDetails = {
  yxc300: {
    "Configurazione tecnica principale": [
      ["Modello", "YXC300"],
      ["Portata massima", "3.000 kg"],
      ["Braccio telescopico", "5 sezioni"],
      ["Altezza massima", "10,8 m"],
      ["Raggio massimo", "10 m"],
      ["Alimentazione", "Diesel / elettrica"],
    ],
    "Caratteristiche prestazionali": [
      ["Carro cingolato", "In gomma, adatto a una varietà di superfici"],
      ["Braccio", "Realizzato in acciaio al manganese ad alta resistenza per migliorare la capacità di sollevamento"],
      ["Struttura", "Compatta, con stabilizzatori e dimensioni ridotte per lavori in spazi limitati"],
    ],
    Applicazioni: "Sollevamento vetri, montaggi, cantieri, manutenzioni e lavori in spazi ridotti.",
  },
  yxc400: {
    "Configurazione tecnica principale": [
      ["Modello", "YXC400"],
      ["Portata massima", "4.000 kg"],
      ["Braccio telescopico", "6 sezioni"],
      ["Altezza massima", "15 m"],
      ["Raggio massimo", "13 m"],
      ["Alimentazione", "Diesel / elettrica"],
    ],
    "Caratteristiche prestazionali": [
      ["Carro cingolato", "In gomma, non danneggia il suolo e si adatta a una varietà di superfici"],
      ["Braccio", "Realizzato in acciaio al manganese ad alta resistenza per una migliore capacità di sollevamento"],
      ["Struttura", "Compatta, con stabilizzatori e ingombri controllati per cantieri e interni"],
    ],
    Applicazioni: "Sollevamento vetri, montaggi industriali, cantieri edili, manutenzioni e movimentazioni compatte.",
  },
  yxc500: {
    "Configurazione tecnica principale": [
      ["Modello", "YXC500"],
      ["Portata massima", "5.000 kg"],
      ["Braccio telescopico", "5 sezioni"],
      ["Altezza massima", "17 m"],
      ["Raggio massimo", "15 m"],
      ["Motore", "Yanmar 4T98 da 42,4 kW"],
    ],
    "Caratteristiche prestazionali": [
      ["Carro cingolato", "In gomma, adatto a superfici diverse e a contesti dove serve impronta compatta"],
      ["Braccio", "Telescopico, configurato per portate superiori e maggiore raggio operativo"],
      ["Struttura", "Robusta, con stabilizzatori e configurazione professionale per sollevamenti più impegnativi"],
    ],
    Applicazioni: "Sollevamento vetri, carpenteria, montaggi, cantieri strutturati e movimentazioni professionali.",
  },
};

const grid = document.querySelector("#productGrid");
const filters = document.querySelectorAll(".filter");
const modal = document.querySelector("#productModal");
const modalCard = document.querySelector(".modal-card");
const modalTitle = document.querySelector("#modalTitle");
const modalCategory = document.querySelector("#modalCategory");
const modalDescription = document.querySelector("#modalDescription");
const modalSpecs = document.querySelector("#modalSpecs");
const modalTabs = document.querySelector("#modalTabs");
const modalActiveImage = document.querySelector("#modalActiveImage");
const modalDetails = document.querySelector("#modalDetails");
const modalRealPhotos = document.querySelector("#modalRealPhotos");

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
  "me18-9": [
    ["Peso", "1,86 t"],
    ["Benna", "0,05 m³"],
    ["Motore", "YANMAR 3TNV74"],
    ["Idraulica", "Le-HydrauliX"],
  ],
  "me26-9": [
    ["Peso", "2,9 t"],
    ["Benna", "0,08 m³"],
    ["Motore", "YANMAR 3TNV80F"],
    ["Idraulica", "Le-HydrauliX"],
  ],
  "me35-10": [
    ["Peso", "3,75 t"],
    ["Benna", "0,12 m³"],
    ["Motore", "YANMAR 3TNV88F-ESSY"],
    ["Idraulica", "Le-HydrauliX"],
  ],
  "me60-9": [
    ["Peso", "6 t"],
    ["Benna", "0,22 m³"],
    ["Motore", "YANMAR 4TNV98C"],
    ["Idraulica", "HAWE Inline"],
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
  return (cardSpecOverrides[product.id] || Object.entries(product.specs))
    .filter(([key]) => key !== "Prezzo" && key !== "Nota prezzo" && key !== "Accessori")
    .slice(0, 4);
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
            <div class="product-actions">
              <button class="product-action" type="button" data-product="${product.id}">Apri scheda tecnica</button>
              <a class="product-action product-action-secondary" href="#contatti">Richiedi info e video</a>
            </div>
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

  document.querySelector(".section-jump-nav")?.classList.remove("is-open");
  document.querySelector(".section-jump-toggle")?.setAttribute("aria-expanded", "false");

  const originalImages = productOriginalImages[product.id] || [];
  modalTitle.textContent = product.name;
  modalCategory.textContent = product.label;
  modalDescription.textContent = product.description;
  const technicalSections = craneVisualSections[product.id] || [{ label: "Scheda tecnica", src: product.image }];
  const images = [
    ...technicalSections,
    ...(originalImages.length ? [{ label: "Foto originale", src: originalImages[0].src }] : []),
  ].filter(Boolean);

  modalTabs.innerHTML = images
    .map(
      (item, index) =>
        `<button class="modal-tab ${index === 0 ? "is-active" : ""}" type="button" data-modal-image="${item.src}" data-modal-label="${item.label}">${item.label}</button>`
    )
    .join("");
  modalActiveImage.src = images[0].src;
  modalActiveImage.alt = `${images[0].label} TONLITA ${product.name}`;
  const modalSpecsEntries = [
    ...Object.entries(product.specs).filter(([key]) => key !== "Prezzo" && key !== "Nota prezzo" && key !== "Accessori"),
    ["Condizioni", priceCondition],
  ].filter(([, value]) => Boolean(value));

  modalSpecs.innerHTML = modalSpecsEntries
    .map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`)
    .join("");
  modalDetails.innerHTML = renderProductDetails(product);
  modalRealPhotos.innerHTML = renderRealPhotos(product);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  modal.scrollTop = 0;
  modalCard.scrollTop = 0;
  document.body.style.overflow = "hidden";
  wirePremiumHover();
}

function renderProductDetails(product) {
  const details = {
    ...(product.category === "gru" ? craneDetails[product.id] || {} : {}),
    ...(product.details || {}),
    "Condizioni commerciali": `${priceCondition}. Preventivo su richiesta in base al modello e alla configurazione.`,
    "Accessori e attrezzature": accessoriesText,
  };

  return Object.entries(details)
    .map(([title, value]) => {
      const content = Array.isArray(value)
        ? `<dl class="detail-list">${value.map(([key, itemValue]) => `<div><dt>${key}</dt><dd>${itemValue}</dd></div>`).join("")}</dl>`
        : `<p>${value}</p>`;

      return `
        <section class="modal-detail-block">
          <h3>${title}</h3>
          ${content}
        </section>
      `;
    })
    .join("");
}

function renderRealPhotos(product) {
  const photos = productOriginalImages[product.id] || [];
  if (!photos.length) return "";

  const images = photos
    .map(
      (image) => `
        <button class="real-photo" type="button" data-modal-image="${image.src}" data-modal-label="Foto originale">
          <img src="${image.src}" alt="Foto originale ${product.name}" loading="lazy">
        </button>
      `
    )
    .join("");

  return `
    <div class="real-photos-heading">
      <span>Documentazione visiva</span>
      <h3>Foto originale</h3>
    </div>
    <div class="real-photos-panel">${images}</div>
  `;
}

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
const mobileModalQuery = window.matchMedia("(max-width: 700px)");

function updateViewportZoomState() {
  if (!window.visualViewport) return;
  document.documentElement.classList.toggle("is-viewport-zooming", window.visualViewport.scale > 1.02);
}

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", updateViewportZoomState, { passive: true });
  window.visualViewport.addEventListener("scroll", updateViewportZoomState, { passive: true });
  updateViewportZoomState();
}

function scrollModalImageToTop() {
  if (!mobileModalQuery.matches || !modalCard) return;

  window.requestAnimationFrame(() => {
    modalCard.scrollTo({
      top: 0,
      behavior: reducedMotionQuery.matches ? "auto" : "smooth",
    });
  });
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function observeReveals() {
  const reveals = document.querySelectorAll(".reveal:not(.watched)");
  if (coarsePointerQuery.matches) {
    reveals.forEach((element) => {
      element.classList.add("watched", "in-view");
    });
    return;
  }

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

function getPremiumSettings(element) {
  if (element.matches(".button, .header-cta, .product-action, .filter, .modal-tab")) {
    return { rotate: 2.4, media: 0, scale: 1.01 };
  }

  if (element.matches(".hero-machine-stack")) {
    return { rotate: 3.4, media: 18, scale: 1.012 };
  }

  if (element.matches(".product-card, .category-card")) {
    return { rotate: 5.8, media: 12, scale: 1.018 };
  }

  return { rotate: 4.2, media: 7, scale: 1.012 };
}

function setPremiumPointer(element, event, settings) {
  const rect = element.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const pointerX = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
  const pointerY = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
  const rotateY = (pointerX - 0.5) * settings.rotate * 2;
  const rotateX = (0.5 - pointerY) * settings.rotate * 2;
  const mediaX = (pointerX - 0.5) * settings.media;
  const mediaY = (pointerY - 0.5) * settings.media * -0.7;

  element.style.setProperty("--mx", `${pointerX * 100}%`);
  element.style.setProperty("--my", `${pointerY * 100}%`);
  element.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
  element.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
  element.style.setProperty("--premium-scale", settings.scale);
  element.style.setProperty("--shadow-x", `${((pointerX - 0.5) * 30).toFixed(1)}px`);
  element.style.setProperty("--shadow-y", `${(18 + pointerY * 14).toFixed(1)}px`);
  element.style.setProperty("--media-x", `${mediaX.toFixed(1)}px`);
  element.style.setProperty("--media-y", `${mediaY.toFixed(1)}px`);

  if (element.matches(".hero-machine-stack")) {
    element.style.setProperty("--hero-crane-x", `${(-mediaX * 0.35).toFixed(1)}px`);
    element.style.setProperty("--hero-crane-y", `${(mediaY * 0.25).toFixed(1)}px`);
    element.style.setProperty("--hero-excavator-x", `${(mediaX * 0.18).toFixed(1)}px`);
    element.style.setProperty("--hero-excavator-y", `${(-mediaY * 0.24).toFixed(1)}px`);
    element.style.setProperty("--hero-loader-x", `${(mediaX * 0.42).toFixed(1)}px`);
    element.style.setProperty("--hero-loader-y", `${(mediaY * 0.1).toFixed(1)}px`);
  }
}

function resetPremiumPointer(element) {
  element.style.setProperty("--rx", "0deg");
  element.style.setProperty("--ry", "0deg");
  element.style.setProperty("--premium-scale", "1");
  element.style.setProperty("--shadow-x", "0px");
  element.style.setProperty("--shadow-y", "18px");
  element.style.setProperty("--media-x", "0px");
  element.style.setProperty("--media-y", "0px");
  element.style.setProperty("--hero-crane-x", "0px");
  element.style.setProperty("--hero-crane-y", "0px");
  element.style.setProperty("--hero-excavator-x", "0px");
  element.style.setProperty("--hero-excavator-y", "0px");
  element.style.setProperty("--hero-loader-x", "0px");
  element.style.setProperty("--hero-loader-y", "0px");
}

function wirePremiumHover() {
  if (coarsePointerQuery.matches || reducedMotionQuery.matches) return;

  const premiumElements = document.querySelectorAll(
    [
      ".proof-item:not(.is-hover-wired)",
      ".value-card:not(.is-hover-wired)",
      ".audience-grid article:not(.is-hover-wired)",
      ".category-card:not(.is-hover-wired)",
      ".product-card:not(.is-hover-wired)",
      ".assurance-item:not(.is-hover-wired)",
      ".support-card:not(.is-hover-wired)",
      ".reseller-panel:not(.is-hover-wired)",
      ".contact-card:not(.is-hover-wired)",
      ".quote-panel:not(.is-hover-wired)",
      ".market-map-card:not(.is-hover-wired)",
      ".onsite-gallery:not(.is-hover-wired)",
      ".onsite-photo:not(.is-hover-wired)",
      ".hero-machine-stack:not(.is-hover-wired)",
      ".hero-metrics > div:not(.is-hover-wired)",
      ".button:not(.is-hover-wired)",
      ".header-cta:not(.is-hover-wired)",
      ".product-action:not(.is-hover-wired)",
      ".filter:not(.is-hover-wired)",
      ".modal-tab:not(.is-hover-wired)",
      ".real-photo:not(.is-hover-wired)",
    ].join(", ")
  );

  premiumElements.forEach((element) => {
    const settings = getPremiumSettings(element);
    element.classList.add("premium-object", "is-hover-wired");

    element.addEventListener("pointermove", (event) => {
      if (!finePointerQuery.matches || event.pointerType !== "mouse") return;
      setPremiumPointer(element, event, settings);
    }, { passive: true });

    element.addEventListener("pointerleave", () => {
      element.classList.remove("is-touching");
      resetPremiumPointer(element);
    }, { passive: true });

    element.addEventListener("pointerdown", (event) => {
      element.classList.add("is-touching");
      if (event.pointerType !== "mouse") {
        element.style.setProperty("--premium-scale", "1.01");
        element.style.setProperty("--lift", "-4px");
      }
    }, { passive: true });

    element.addEventListener("pointerup", () => {
      element.classList.remove("is-touching");
      element.style.removeProperty("--lift");
      if (!finePointerQuery.matches) resetPremiumPointer(element);
    }, { passive: true });

    element.addEventListener("pointercancel", () => {
      element.classList.remove("is-touching");
      element.style.removeProperty("--lift");
      resetPremiumPointer(element);
    }, { passive: true });

    element.addEventListener("focus", () => element.classList.add("is-touching"));
    element.addEventListener("blur", () => {
      element.classList.remove("is-touching");
      resetPremiumPointer(element);
    });
  });
}

function wireSectionNav() {
  const jumpNav = document.querySelector(".section-jump-nav");
  if (!jumpNav) return;

  const toggle = jumpNav.querySelector(".section-jump-toggle");
  const links = [...jumpNav.querySelectorAll("[data-section-link]")];
  const sections = links
    .map((link) => document.getElementById(link.dataset.sectionLink))
    .filter(Boolean);

  toggle?.addEventListener("click", () => {
    const isOpen = jumpNav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      jumpNav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) return;

      links.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.sectionLink === visibleEntry.target.id);
      });
    },
    {
      rootMargin: "-26% 0px -58% 0px",
      threshold: [0.08, 0.18, 0.32, 0.48],
    }
  );

  sections.forEach((section) => observer.observe(section));

  document.addEventListener("click", (event) => {
    if (!jumpNav.classList.contains("is-open") || jumpNav.contains(event.target)) return;
    jumpNav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
}

renderProducts();
wirePremiumHover();
wireSectionNav();

document.addEventListener("click", (event) => {
  const productButton = event.target.closest("[data-product]");
  const closeButton = event.target.closest("[data-close-modal]");
  const modalImageButton = event.target.closest("[data-modal-image]");

  if (productButton) {
    openProduct(productButton.dataset.product);
  }

  if (modalImageButton) {
    const selectedLabel = modalImageButton.dataset.modalLabel;
    modalTabs
      .querySelectorAll(".modal-tab")
      .forEach((button) => button.classList.toggle("is-active", button === modalImageButton || button.dataset.modalLabel === selectedLabel));
    modalActiveImage.src = modalImageButton.dataset.modalImage;
    modalActiveImage.alt = `${modalImageButton.dataset.modalLabel} TONLITA`;
    scrollModalImageToTop();
    wirePremiumHover();
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
