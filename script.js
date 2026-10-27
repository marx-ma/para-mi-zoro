const startBtn = document.getElementById('startBtn');
const intro = document.getElementById('intro');
const world = document.getElementById('world');
const modal = document.getElementById('letterModal');
const openChest = document.getElementById('openChest');
const chest = document.getElementById('chest');
const closeLetter = document.getElementById('closeLetter');
const toast = document.getElementById('toast');

const notes = {
  fruit: 'Si esta fruta tuviera un poder, sería hacerte sonreír incluso en los días más pesados. 🍈',
  flower: 'Te dejo estas flores imaginarias porque algunas personas merecen pequeños detalles sin necesitar una fecha especial. 🌸',
  map: 'No tengo el mapa de todas las respuestas, pero me gusta descubrir cosas nuevas contigo, isla por isla. 🗺️',
  hat: 'Como el sombrero de Luffy, hay cosas que se vuelven especiales por la historia y el cariño que llevan detrás. 👒'
};

startBtn.addEventListener('click', () => {
  intro.classList.add('hidden');
  world.classList.remove('hidden');
  world.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showerPetals(22);
});

document.querySelectorAll('[data-note]').forEach(card => {
  card.addEventListener('click', () => {
    showToast(notes[card.dataset.note]);
    showerPetals(8);
  });
});

function revealLetter() {
  modal.classList.remove('hidden');
  chest.classList.add('opened');
  showerPetals(35);
}
openChest.addEventListener('click', revealLetter);
chest.addEventListener('click', revealLetter);
chest.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    revealLetter();
  }
});
closeLetter.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', event => {
  if (event.target === modal) modal.classList.add('hidden');
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') modal.classList.add('hidden');
});

function showerPetals(amount) {
  const symbols = ['🌸', '🌷', '💗', '✨', '🌼'];
  for (let i = 0; i < amount; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${3 + Math.random() * 4}s`;
    petal.style.animationDelay = `${Math.random() * 1.5}s`;
    petal.style.fontSize = `${14 + Math.random() * 18}px`;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 8500);
  }
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 4300);
}
