// Referencia al botón de inicio, sonidos y contenedores
const startBtn = document.getElementById('startBtn');
const drumSound = document.getElementById('drumSound');
const backgroundMusic = document.getElementById('backgroundMusic');
const appDiv = document.getElementById('app');
const mediaContainer = document.getElementById('mediaContainer');

// Función para asegurar que la música de fondo se reproduzca
function playBackgroundMusic() {
    backgroundMusic.play().catch(() => {
        console.log("Reproducción automática bloqueada por el navegador.");
    });
}

// Evento para iniciar la revelación
startBtn.addEventListener('click', () => {
    backgroundMusic.pause(); // Detener música de fondo
    drumSound.play(); // Reproducir sonido de tambores
    startBtn.style.display = 'none'; // Ocultar botón
    startRevealAnimation();
});

// Evento global para interactuar con la página y reproducir música
document.addEventListener('click', (event) => {
    // Asegúrate de que el clic no se haya realizado sobre el botón de inicio
    if (event.target !== startBtn) {
        playBackgroundMusic(); // Reproducir música de fondo
        document.removeEventListener('click', playBackgroundMusic); // Eliminar el evento una vez que se haya tocado
    }
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
        <button id="restartBtn" style="padding: 15px 30px; font-size: 18px; border: none; border-radius: 5px; background-color: #007BFF; color: white; cursor: pointer; transition: background-color 0.3s ease;">Volver a intentar</button>
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
            particleCount: 350, // Más partículas para mayor densidad
            startVelocity: 50, // Velocidad inicial
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
