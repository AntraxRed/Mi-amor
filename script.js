document.addEventListener('DOMContentLoaded', () => {
    const sky = document.getElementById('sky');
    const startBtn = document.getElementById('start-btn');
    const startScreen = document.getElementById('start-screen');
    const cartaContent = document.getElementById('carta-content');

    const line1 = document.getElementById('lyrics-line1');
    const line2 = document.getElementById('lyrics-line2');

    const bgMusic = new Audio('MUSICA.mp3');
    bgMusic.loop = false;

    const syncOffset = 0;

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes epicPulse {
            0% { filter: brightness(1) saturate(1); }
            50% { filter: brightness(1.4) saturate(1.2); box-shadow: inset 0 0 100px rgba(255, 215, 0, 0.2); }
            100% { filter: brightness(1) saturate(1); }
        }
        .epic-glow-active {
            animation: epicPulse 2s infinite ease-in-out;
        }
        .page-fade-out {
            transition: opacity 5s ease-in-out !important;
            opacity: 0 !important;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    const lyricsData = [
        { time: 0, text1: "Para mi güera...", text2: "🎵", epic: false },
        { time: 22, text1: "Espera", text2: "", epic: false },
        { time: 24, text1: "Aún la nave del olvido", text2: "no ha partido", epic: false },
        { time: 28, text1: "No condenemos al naufragio", text2: "lo vivido", epic: false },
        { time: 32, text1: "Por nuestro amor, por nuestro ayer,", text2: "yo te lo pido", epic: false },
        { time: 37, text1: "Espera", text2: "", epic: false },
        { time: 39, text1: "Aún me quedan en mis manos", text2: "primaveras", epic: false },
        { time: 42, text1: "Para colmarte de caricias", text2: "todas nuevas", epic: false },
        { time: 47, text1: "Que morirían en mis manos", text2: "si te fueras", epic: false },

        { time: 51, text1: "Espera un poco,", text2: "", epic: true },
        { time: 54, text1: "un poquiiiiiiiiiii,", text2: "to más", epic: true },
        { time: 59, text1: "Para llevarte", text2: "", epic: true },
        { time: 62, text1: "mi feliiiiiiiiiiiiii,", text2: "cidaaaad", epic: true },
        { time: 67, text1: "Espera un poco,", text2: "", epic: true },
        { time: 69, text1: "un poquiiiiiiiiiii,", text2: "to más", epic: true },
        { time: 74, text1: "Me moriría", text2: "", epic: true },
        { time: 76, text1: "si te vaaaaaas", text2: "", epic: true },
        { time: 78, text1: "Espera un poco,", text2: "", epic: true },
        { time: 80, text1: "un poquiiiiiiiiiii,", text2: "to más", epic: true },
        { time: 85, text1: "Para llevarte", text2: "", epic: true },
        { time: 87, text1: "mi feliiiiiiiiiiiiii,", text2: "cidaaaad", epic: true },
        { time: 92, text1: "Espera un poco,", text2: "", epic: true },
        { time: 95, text1: "un poquiiiiiiiiiii,", text2: "to más", epic: true },
        { time: 100, text1: "Me moriría", text2: "", epic: true },
        { time: 102, text1: "si te vaaaaaas", text2: "", epic: true },

        { time: 110, text1: "Espera", text2: "", epic: false },
        { time: 112, text1: "Aún me quedan alegrías", text2: "para darte", epic: false },
        { time: 115, text1: "Tengo mil noches de amor", text2: "que regalarte", epic: false },
        { time: 119, text1: "Te doy mi vida a cambio", text2: "de quedarte", epic: false },
        { time: 125, text1: "Espera", text2: "", epic: false },
        { time: 127, text1: "No entendería mi mañana", text2: "si te fueras", epic: false },
        { time: 131, text1: "Y hasta te admito que tu amor", text2: "me lo mintieras", epic: false },
        { time: 135, text1: "Te adoraría aunque tú", text2: "no me quisieras", epic: false },

        { time: 139, text1: "Espera un poco,", text2: "", epic: true },
        { time: 142, text1: "un poquiiiiiiiiiii,", text2: "to más", epic: true },
        { time: 146, text1: "Para llevarte", text2: "", epic: true },
        { time: 148, text1: "mi feliiiiiiiiiiiiii,", text2: "cidaaaad", epic: true },
        { time: 154, text1: "Espera un poco,", text2: "", epic: true },
        { time: 156, text1: "un poquiiiiiiiiiii,", text2: "to más", epic: true },
        { time: 161, text1: "Me moriría", text2: "si te vaaaaaas", epic: true },
        { time: 165, text1: "Espera un poco,", text2: "", epic: true },
        { time: 167, text1: "un poquiiiiiiiiiii,", text2: "to más", epic: true },
        { time: 172, text1: "Para llevarte", text2: "", epic: true },
        { time: 175, text1: "mi feliiiiiiiiiiiiii,", text2: "cidaaaad", epic: true },
        { time: 179, text1: "Espera un poco,", text2: "", epic: true },
        { time: 181, text1: "un poquiiiiiiiiiii,", text2: "to más", epic: true },
        { time: 186, text1: "Me moriría", text2: "", epic: true },
        { time: 189, text1: "si te vaaaaaas", text2: "", epic: true },
        { time: 191, text1: "Espera un poco,", text2: "", epic: true },
        { time: 192, text1: "un poquiiiiiiiiiii,", text2: "to más", epic: true },
        { time: 197, text1: "Para llevarte", text2: "", epic: true },
        { time: 200, text1: "mi feliiiiiiiiiiiiii,", text2: "cidaaaad", epic: true },
        { time: 205, text1: "Espera un poco,", text2: "", epic: true },
        { time: 208, text1: "un poquiiiiiiiiiii,", text2: "to más", epic: true },
        { time: 212, text1: "Me moriría", text2: "", epic: true },

        { time: 214, text1: "", text2: "<span style='font-size: 2.2em; font-weight: 900; color: #ffd700; text-shadow: 0 0 20px #ffd700, 0 0 40px #ffffff; letter-spacing: 2px;'>SI TE VAS</span>", epic: true }
    ];

    let currentLyricIndex = -1;
    let componentsFaded = false;

    bgMusic.addEventListener('timeupdate', () => {
        const currentTime = bgMusic.currentTime + syncOffset;

        if (currentTime >= 220 && !componentsFaded) {
            componentsFaded = true;
            document.body.classList.add('page-fade-out');

            setTimeout(() => {
                bgMusic.pause();
            }, 5000);
        }

        let nextLyricIndex = -1;
        for (let i = 0; i < lyricsData.length; i++) {
            if (currentTime >= lyricsData[i].time) {
                nextLyricIndex = i;
            } else {
                break;
            }
        }

        if (nextLyricIndex !== currentLyricIndex && nextLyricIndex !== -1) {
            currentLyricIndex = nextLyricIndex;

            if (lyricsData[currentLyricIndex].epic) {
                document.body.classList.add('epic-glow-active');
            } else {
                document.body.classList.remove('epic-glow-active');
            }

            line1.style.opacity = 0;
            line2.style.opacity = 0;

            setTimeout(() => {
                line1.innerHTML = lyricsData[currentLyricIndex].text1 || "";
                line2.innerHTML = lyricsData[currentLyricIndex].text2 || "";

                line1.style.opacity = 1;
                line2.style.opacity = 1;
            }, 300);
        }
    });

    bgMusic.addEventListener('ended', () => {
        if (!componentsFaded) {
            document.body.classList.add('page-fade-out');
        }
    });

    const numStars = 100;
    const numMistParticles = 25;
    const starColors = ['#ffffff', '#ffd700', '#aae2ff'];

    for (let i = 0; i < numMistParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle-mist');
        const size = (Math.random() * 20 + 15) + 'px';
        particle.style.width = size;
        particle.style.height = size;
        particle.style.backgroundColor = Math.random() < 0.6
            ? 'rgba(147, 112, 219, 0.15)'
            : 'rgba(170, 226, 255, 0.1)';
        particle.style.top = (Math.random() * 100) + 'vh';
        particle.style.animationDuration = (Math.random() * 40 + 30) + 's';
        particle.style.animationDelay = `-${Math.random() * 40}s`;
        sky.appendChild(particle);
    }

    startBtn.addEventListener('click', () => {
        bgMusic.play().catch(error => {
            console.log("Audio bloqueado:", error);
        });

        startScreen.style.transition = 'opacity 0.6s ease';
        startScreen.style.opacity = '0';

        setTimeout(() => {
            startScreen.classList.add('hidden');
            cartaContent.classList.remove('hidden');
        }, 600);
    });
});