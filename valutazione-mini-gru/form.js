(function () {
  const form = document.getElementById("craneForm");
  const steps = Array.from(document.querySelectorAll(".form-step"));
  const stepCounter = document.getElementById("stepCounter");
  const progressBar = document.getElementById("progressBar");
  const prevButton = document.getElementById("prevStep");
  const nextButton = document.getElementById("nextStep");
  const submitButton = document.getElementById("submitForm");
  const formError = document.getElementById("formError");
  const subjectInput = document.getElementById("emailSubject");
  const summaryInput = document.getElementById("emailSummary");
  const successPanel = document.getElementById("successPanel");

  if (!form || !steps.length) return;

  const totalSteps = steps.length;
  let currentStep = 1;

  const summaryFields = [
    ["Cliente", ["Nome e cognome", "Azienda / Ragione sociale"]],
    ["Telefono", ["Telefono / WhatsApp"]],
    ["Paese/Città", ["Paese cliente", "Città / provincia cliente"]],
    ["Modello indicativo", ["Modello Tonlita indicativo"]],
    ["Settore", ["Settore attività[]"]],
    ["Lavoro", ["Tipo di lavori principali[]"]],
    ["Carico massimo", ["Peso massimo indicativo"]],
    ["Distanza", ["Distanza dalla macchina"]],
    ["Altezza", ["Altezza richiesta[]"]],
    ["Accesso", ["Limiti di accesso[]", "Larghezza minima passaggio"]],
    ["Metodo attuale", ["Metodo attuale sollevamenti[]"]],
    ["Problema principale", ["Problema principale oggi[]"]],
    ["Accessori richiesti", ["Accessori o configurazioni richieste[]"]],
    ["Tempi", ["Tempistica richiesta", "Disponibilità attesa produzione importazione"]],
    ["Consegna", ["Paese consegna", "Città consegna", "Provincia / regione consegna"]],
    ["Budget", ["Budget indicativo"]]
  ];

  const completeFieldGroups = [
    {
      title: "STEP 1 - Dati cliente",
      names: [
        "Nome e cognome",
        "Azienda / Ragione sociale",
        "Email",
        "Telefono / WhatsApp",
        "Paese cliente",
        "Città / provincia cliente",
        "Settore attività[]",
        "Hai già parlato con noi?"
      ]
    },
    {
      title: "STEP 2 - Modello e utilizzo previsto",
      names: [
        "Modello Tonlita indicativo",
        "Tipo di lavori principali[]",
        "Frequenza uso mini gru"
      ]
    },
    {
      title: "STEP 3 - Carico, altezza e distanza",
      names: [
        "Peso massimo indicativo",
        "Peso più frequente dei carichi",
        "Distanza dalla macchina",
        "Altezza richiesta[]",
        "Ostacoli durante il sollevamento[]",
        "Esempio concreto di sollevamento"
      ]
    },
    {
      title: "STEP 4 - Accesso, spazio e terreno",
      names: [
        "Luogo di lavoro principale[]",
        "Limiti di accesso[]",
        "Larghezza minima passaggio",
        "Spazio stabilizzatori",
        "Tipo di terreno[]"
      ]
    },
    {
      title: "STEP 5 - Metodo attuale, problema e accessori",
      names: [
        "Metodo attuale sollevamenti[]",
        "Problema principale oggi[]",
        "Accessori o configurazioni richieste[]",
        "Soluzioni in confronto[]"
      ]
    },
    {
      title: "STEP 6 - Tempi, consegna e richiesta finale",
      names: [
        "Tempistica richiesta",
        "Disponibilità attesa produzione importazione",
        "Paese consegna",
        "Città consegna",
        "Provincia / regione consegna",
        "CAP consegna",
        "Tipo di consegna preferita",
        "Budget indicativo",
        "Altre informazioni utili",
        "Consenso privacy"
      ]
    }
  ];

  function getValues(name) {
    const elements = Array.from(form.elements).filter((element) => element.name === name);
    if (!elements.length) return "";

    if (elements[0].type === "checkbox" || elements[0].type === "radio") {
      return elements
        .filter((element) => element.checked)
        .map((element) => element.value)
        .join(", ");
    }

    return elements[0].value.trim();
  }

  function combineValues(names) {
    return names
      .map((name) => getValues(name))
      .filter(Boolean)
      .join(" / ");
  }

  function setError(message) {
    formError.textContent = message || "";
  }

  function clearStepErrors(step) {
    step.querySelectorAll(".has-error").forEach((element) => element.classList.remove("has-error"));
  }

  function validateStep(stepNumber) {
    const step = steps[stepNumber - 1];
    let valid = true;
    clearStepErrors(step);
    setError("");

    step.querySelectorAll("input[required], textarea[required]").forEach((field) => {
      if ((field.type === "checkbox" && !field.checked) || (!field.type.match(/checkbox|radio/) && !field.value.trim())) {
        valid = false;
        const wrapper = field.closest("label") || field;
        wrapper.classList.add("has-error");
      }

      if (field.type === "email" && field.value.trim() && !field.checkValidity()) {
        valid = false;
        const wrapper = field.closest("label") || field;
        wrapper.classList.add("has-error");
      }
    });

    step.querySelectorAll("fieldset[data-required-group]").forEach((fieldset) => {
      const checked = fieldset.querySelector("input:checked");
      if (!checked) {
        valid = false;
        fieldset.classList.add("has-error");
      }
    });

    if (!valid) {
      setError("Completa i campi obbligatori di questo step prima di continuare.");
    }

    return valid;
  }

  function showStep(stepNumber) {
    currentStep = Math.min(Math.max(stepNumber, 1), totalSteps);

    steps.forEach((step, index) => {
      step.classList.toggle("is-active", index + 1 === currentStep);
    });

    stepCounter.textContent = `Step ${currentStep} di ${totalSteps}`;
    progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
    prevButton.hidden = currentStep === 1;
    nextButton.style.display = currentStep === totalSteps ? "none" : "inline-flex";
    submitButton.style.display = currentStep === totalSteps ? "inline-flex" : "none";
    setError("");

    document.querySelector(".form-shell").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function buildEmailSummary() {
    const nome = getValues("Nome e cognome") || "Cliente";
    const modello = getValues("Modello Tonlita indicativo") || "Modello da valutare";
    subjectInput.value = `Nuova richiesta mini gru cingolata - ${nome} - ${modello}`;

    const lines = ["SINTESI RICHIESTA:"];
    summaryFields.forEach(([label, names]) => {
      lines.push(`${label}: ${combineValues(names) || "Non indicato"}`);
    });

    lines.push("", "RISPOSTE COMPLETE:");
    completeFieldGroups.forEach((group) => {
      lines.push("", group.title);
      group.names.forEach((name) => {
        const cleanName = name.replace(/\[\]$/, "");
        lines.push(`${cleanName}: ${getValues(name) || "Non indicato"}`);
      });
    });

    const fileInput = form.querySelector('input[type="file"]');
    if (fileInput && fileInput.files.length) {
      const files = Array.from(fileInput.files).map((file) => file.name).join(", ");
      lines.push("", `Allegati caricati: ${files}`);
    }

    summaryInput.value = lines.join("\n");
  }

  function validateAllSteps() {
    for (let index = 1; index <= totalSteps; index += 1) {
      if (!validateStep(index)) {
        showStep(index);
        return false;
      }
    }

    return true;
  }

  function showSuccessIfNeeded() {
    if (new URLSearchParams(window.location.search).get("success") === "1") {
      successPanel.hidden = false;
      form.hidden = true;
      document.querySelector(".progress-card").hidden = true;
      successPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  nextButton.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      showStep(currentStep + 1);
    }
  });

  prevButton.addEventListener("click", () => {
    showStep(currentStep - 1);
  });

  form.addEventListener("input", () => {
    const activeStep = steps[currentStep - 1];
    clearStepErrors(activeStep);
    setError("");
  });

  form.addEventListener("change", () => {
    const activeStep = steps[currentStep - 1];
    clearStepErrors(activeStep);
    setError("");
  });

  form.addEventListener("submit", (event) => {
    if (!validateAllSteps()) {
      event.preventDefault();
      return;
    }

    buildEmailSummary();
    submitButton.disabled = true;
    submitButton.textContent = "Invio in corso...";
  });

  showStep(1);
  showSuccessIfNeeded();
})();
