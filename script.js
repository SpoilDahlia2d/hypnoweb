let currentImgIndex = 0;
let images = [];

document.getElementById('start-btn').addEventListener('click', startHypnoEffect);

function startHypnoEffect() {
  // Nascondi il pulsante
  document.getElementById('start-btn').style.display = 'none';
  
  // Fai partire l'audio (opzionale)
  const audio = new Audio('sounds/hypno_sound.mp3');  // Cambia con il tuo file mp3
  audio.play();
  
  // Mostra il messaggio "TAP FOR ENJOY" per 5 secondi
  const enjoyMessage = document.getElementById('enjoy-message');
  enjoyMessage.style.display = 'block';
  
  setTimeout(() => {
    enjoyMessage.style.display = 'none';
  }, 5000);  // Dopo 5 secondi, nascondi il messaggio

  // Mostra l'immagine principale
  document.getElementById('main-img').style.display = 'block';
  
  // Carica le immagini dinamicamente dal server Flask
  loadImages();
}

document.getElementById('main-img').addEventListener('click', nextImage);

function nextImage() {
  // Cambia immagine
  currentImgIndex = (currentImgIndex + 1) % images.length;
  document.getElementById('main-img').src = `static/images/${images[currentImgIndex]}`;

  // Vibrazione
  if ("vibrate" in navigator) {
    navigator.vibrate([100, 50, 100]);
  }
}

// Funzione per caricare le immagini dal server Flask
function loadImages() {
  fetch('/get-images')  // Richiesta al server per ottenere le immagini
    .then(response => response.json())
    .then(data => {
      images = data;  // Estrai i nomi dei file
      if (images.length > 0) {
        document.getElementById('main-img').src = `static/images/${images[currentImgIndex]}`;
      }
    })
    .catch(error => {
      console.error('Errore nel caricare le immagini:', error);
    });
}
