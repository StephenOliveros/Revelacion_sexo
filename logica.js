// Referencia al botón de inicio, sonidos y contenedores
const startBtn = document.getElementById('startBtn');
const drumSound = document.getElementById('drumSound');
const backgroundMusic = document.getElementById('backgroundMusic');
const appDiv = document.getElementById('app');
const mediaContainer = document.getElementById('mediaContainer');

// Asegurar que la música de fondo se reproduzca automáticamente
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.play().catch(() => {
        console.log("Reproducción automática bloqueada por el navegador.");
    });
});

// Evento para iniciar la revelación
startBtn.addEventListener('click', () => {
    backgroundMusic.pause(); // Detener música de fondo
    drumSound.play(); // Reproducir sonido de tambores
    startBtn.style.display = 'none'; // Ocultar botón
    startRevealAnimation();
});

// Función para iniciar la animación y mostrar la revelación
function startRevealAnimation() {
    appDiv.innerHTML = `
        <div class="loading-drum">
            <div class="drum-animation"></div>
        </div>
    `;

    // Mostrar el contenedor de video e imagen
    mediaContainer.style.display = 'flex';

    // Simular una espera para la revelación
    setTimeout(() => {
        mediaContainer.style.display = 'none'; // Ocultar el contenedor
        showGenderReveal();
    }, 5500); // Esperar 5.5 segundos
}

// Función para mostrar el sexo del bebé
function showGenderReveal() {
    const gender = 'niña'; // Fijar el género como niña
    const color = '#FF69B4'; // Color rosado para niña

    appDiv.innerHTML = `
        <h1>¡Es una ${gender}!</h1>
    `;

    // Cambiar el fondo
    document.body.style.backgroundColor = color;

    // Reproducir el audio final al mostrar el sexo del bebé
    const finalAudio = document.getElementById('finalAudio');
    finalAudio.play();  // Reproducir el audio final

    // Lanzar confeti
    launchConfetti();

    // Evento para reiniciar
    document.getElementById('restartBtn').addEventListener('click', () => location.reload());
}

// Función para lanzar confeti con colores rosados
function launchConfetti() {
  // Configurar múltiples explosiones para mayor densidad
  const end = Date.now() + 1000; // Duración total de 1 segundo

  // Función para lanzar confeti en intervalos
  const frame = () => {
      confetti({
          particleCount: 500, // Más partículas para mayor densidad
          startVelocity: 45, // Velocidad inicial
          spread: 60, // Menor dispersión para más densidad
          origin: { x: Math.random(), y: 0.6 }, // Coordenadas de origen aleatorias
          colors: ['#FF69B4', '#FFB6C1'], // Tonos de rosado
      });

      if (Date.now() < end) {
          requestAnimationFrame(frame);
      }
  };

  frame();
}
