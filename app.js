const steps = [...document.querySelectorAll('.step')];
const panels = [...document.querySelectorAll('.demo-panel')];
const progressBar = document.querySelector('#progress-bar');
const progressLabel = document.querySelector('#progress-label');
const completionLabel = document.querySelector('#completion-label');
const names = ['Assess', 'Validate', 'Recommend', 'Deliver'];

function updateProgress(index) {
  const current = Math.max(0, Math.min(steps.length - 1, index));
  const percent = (current + 1) * 25;

  steps.forEach((step, stepIndex) => {
    const isActive = stepIndex === current;
    step.classList.toggle('active', isActive);
    step.classList.toggle('complete', stepIndex < current);
    if (isActive) step.setAttribute('aria-current', 'step');
    else step.removeAttribute('aria-current');
  });

  panels.forEach((panel, panelIndex) => {
    panel.classList.toggle('active', panelIndex === current);
  });

  progressBar.style.width = `${percent}%`;
  progressLabel.textContent = `Step ${current + 1} of 4 · ${names[current]}`;
  completionLabel.textContent = `${percent}% through journey`;
}

steps.forEach((step, index) => {
  step.addEventListener('click', () => updateProgress(index));
});

let scrollFrame;

function updateFromScroll() {
  const progress = document.querySelector('.journey-progress');
  const activationLine = progress.getBoundingClientRect().bottom + Math.min(window.innerHeight * 0.12, 80);
  let current = 0;

  panels.forEach((panel, index) => {
    if (panel.getBoundingClientRect().top <= activationLine) current = index;
  });

  updateProgress(current);
  scrollFrame = null;
}

function scheduleScrollUpdate() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateFromScroll);
}

window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
window.addEventListener('resize', scheduleScrollUpdate);
updateFromScroll();
