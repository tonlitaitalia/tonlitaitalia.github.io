const form = document.getElementById('craneForm');
const steps = Array.from(document.querySelectorAll('.form-step'));
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const subjectInput = document.getElementById('emailSubject');
const summaryInput = document.getElementById('emailSummary');
const successPanel = document.getElementById('successPanel');
const progressCard = document.getElementById('progressCard');

let currentStep = 0;

const params = new URLSearchParams(window.location.search);
if (params.get('success') === '1') {
  document.body.classList.add('is-success');
  form.hidden = true;
  if (progressCard) progressCard.hidden = true;
  if (successPanel) successPanel.hidden = false;
  successPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getValues(name) {
  return Array.from(form.querySelectorAll(`[name="${CSS.escape(name)}"]`))
    .filter((field) => {
      if (field.type === 'checkbox' || field.type === 'radio') return field.checked;
      return field.value && field.value.trim() !== '';
    })
    .map((field) => field.value.trim())
    .join(', ');
}

function updateStep() {
  steps.forEach((step, index) => {
    step.classList.toggle('is-active', index === currentStep);
  });

  progressText.textContent = `Step ${currentStep + 1} of ${steps.length}`;
  progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;

  prevBtn.hidden = currentStep === 0;
  nextBtn.hidden = currentStep === steps.length - 1;
  submitBtn.hidden = currentStep !== steps.length - 1;
}

function validateRequiredGroups(step) {
  const groups = Array.from(step.querySelectorAll('[data-required-group]'));
  for (const group of groups) {
    const name = group.dataset.requiredGroup;
    const checked = group.querySelector('input:checked');
    if (!checked) {
      group.scrollIntoView({ behavior: 'smooth', block: 'center' });
      alert(`Please select an option for: ${name}`);
      return false;
    }
  }
  return true;
}

function validateStep() {
  const step = steps[currentStep];
  const fields = Array.from(step.querySelectorAll('input, textarea, select'));

  for (const field of fields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }

  return validateRequiredGroups(step);
}

function buildSummary() {
  const fullName = getValues('Full name');
  const liftingCapacity = getValues('Indicative lifting capacity') || 'Not specified';

  subjectInput.value = `New spider crane request - ${fullName || 'Customer'} - ${liftingCapacity}`;

  const lines = [
    'REQUEST SUMMARY',
    `Customer: ${fullName}`,
    `Email: ${getValues('Email')}`,
    `Phone / WhatsApp: ${getValues('Phone / WhatsApp')}`,
    `City: ${getValues('Customer city / province')}`,
    `Business sector: ${getValues('Business sector')}`,
    `Previous contact: ${getValues('Previous contact')}`,
    '',
    `Indicative lifting capacity: ${liftingCapacity}`,
    `Main work: ${getValues('Main work')}`,
    `Usage frequency: ${getValues('Usage frequency')}`,
    '',
    `Maximum load: ${getValues('Maximum load')}`,
    `Frequent load: ${getValues('Frequent load')}`,
    `Working radius: ${getValues('Working radius')}`,
    `Required height: ${getValues('Required height')}`,
    `Obstacles: ${getValues('Obstacles')}`,
    '',
    `Work location: ${getValues('Work location')}`,
    `Access limits: ${getValues('Access limits')}`,
    `Minimum passage width: ${getValues('Minimum passage width')}`,
    `Outrigger space: ${getValues('Outrigger space')}`,
    `Ground condition: ${getValues('Ground condition')}`,
    '',
    `Current lifting method: ${getValues('Current lifting method')}`,
    `Main problem: ${getValues('Main problem')}`,
    `Accessories: ${getValues('Accessories')}`,
    `Compared solutions: ${getValues('Compared solutions')}`,
    '',
    `75-90 day timing availability: ${getValues('75-90 day timing availability')}`,
    `Delivery city: ${getValues('Delivery city')}`,
    `Delivery province / region: ${getValues('Delivery province / region')}`,
    `Postcode: ${getValues('Postcode')}`,
    `Preferred delivery type: ${getValues('Preferred delivery type')}`,
    `Indicative budget: ${getValues('Indicative budget')}`,
    `Additional information: ${getValues('Additional information')}`,
  ];

  summaryInput.value = lines.join('\n');
}

nextBtn.addEventListener('click', () => {
  if (!validateStep()) return;
  currentStep = Math.min(currentStep + 1, steps.length - 1);
  updateStep();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
  currentStep = Math.max(currentStep - 1, 0);
  updateStep();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

form.addEventListener('submit', (event) => {
  if (!validateStep()) {
    event.preventDefault();
    return;
  }
  buildSummary();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
});

updateStep();
