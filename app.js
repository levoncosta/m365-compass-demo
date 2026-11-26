const steps = [...document.querySelectorAll('.step')];
const panels = [...document.querySelectorAll('.demo-panel')];
const back = document.querySelector('#back');
const next = document.querySelector('#next');
const progressBar = document.querySelector('#progress-bar');
const progressLabel = document.querySelector('#progress-label');
const completionLabel = document.querySelector('#completion-label');
const names = ['Assess', 'Validate', 'Recommend', 'Deliver'];
let current = 0;

function showStep(index, focusPanel = false) {
  current = Math.max(0, Math.min(steps.length - 1, index));
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === current);
    step.classList.toggle('complete', i < current);
    step.setAttribute('aria-current', i === current ? 'step' : 'false');
  });
  panels.forEach((panel, i) => {
    panel.hidden = i !== current;
    panel.classList.toggle('active', i === current);
  });
  const percent = (current + 1) * 25;
  progressBar.style.width = `${percent}%`;
  progressLabel.textContent = `Step ${current + 1} of 4`;
  completionLabel.textContent = `${percent}% complete`;
  back.disabled = current === 0;
  next.textContent = current === steps.length - 1 ? 'Replay the journey' : `Continue to ${names[current + 1]}`;
  if (focusPanel) panels[current].querySelector('h3').focus?.();
}

steps.forEach((step, i) => step.addEventListener('click', () => showStep(i)));
back.addEventListener('click', () => showStep(current - 1));
next.addEventListener('click', () => {
  if (current === steps.length - 1) showStep(0);
  else showStep(current + 1);
  document.querySelector('.demo-status').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

showStep(0);
