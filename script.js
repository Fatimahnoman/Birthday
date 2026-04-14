// ===== STAGE TRANSITIONS =====
const stage1 = document.getElementById('stage1');
const stage2 = document.getElementById('stage2');
const stage3 = document.getElementById('stage3');
const stage4 = document.getElementById('stage4');
const bigHeart = document.getElementById('bigHeart');
const stage2Btn = document.getElementById('stage2Btn');
const giftBoxFinal = document.getElementById('giftBoxFinal');

// STAGE 1 -> STAGE 2
bigHeart.addEventListener('click', () => {
    createPetalScatter();
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) { bgMusic.volume = 0.5; bgMusic.play().catch(() => {}); }
    setTimeout(() => {
        stage1.style.opacity = '0'; stage1.style.transition = 'opacity 0.8s ease';
        setTimeout(() => { stage1.style.display = 'none'; stage2.style.display = 'flex'; }, 800);
    }, 500);
});

// PETAL/HEART SCATTER
function createPetalScatter() {
    const items = ['🌹', '💕', '❤️', '💖', '💗'];
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const item = document.createElement('div');
            item.className = 'petal-particle';
            item.textContent = items[Math.floor(Math.random() * items.length)];
            const angle = (Math.PI * 2 * i) / 40;
            const distance = 150 + Math.random() * 250;
            item.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            item.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            item.style.left = '50%'; item.style.top = '50%';
            item.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
            document.body.appendChild(item);
            setTimeout(() => item.remove(), 3000);
        }, i * 50);
    }
}

// STAGE 2 -> STAGE 3
stage2Btn.addEventListener('click', () => {
    createPetalScatter();
    stage2.style.opacity = '0'; stage2.style.transition = 'opacity 0.8s ease';
    setTimeout(() => { stage2.style.display = 'none'; stage3.style.display = 'flex'; }, 800);
});

// STAGE 3 -> STAGE 4
giftBoxFinal.addEventListener('click', () => {
    createPetalScatter();
    giftBoxFinal.style.transition = 'all 0.6s ease';
    giftBoxFinal.style.transform = 'scale(1.3) rotate(10deg)';
    giftBoxFinal.style.opacity = '0';
    setTimeout(() => {
        stage3.style.opacity = '0'; stage3.style.transition = 'opacity 0.6s ease';
        setTimeout(() => { stage3.style.display = 'none'; stage4.style.display = 'flex'; }, 600);
    }, 600);
});

// MUSIC - Auto play on page load
const bgMusic2 = document.getElementById('bgMusic');
const toggleMusic = document.getElementById('toggleMusic');
let isPlaying = true;

// Try to play music immediately on page load
if (bgMusic2) {
    bgMusic2.volume = 0.5;
    bgMusic2.play().catch(() => {
        // If autoplay is blocked, start music on first user interaction
        document.addEventListener('click', function startMusicOnce() {
            bgMusic2.play().catch(() => {});
            document.removeEventListener('click', startMusicOnce);
        }, { once: true });
    });
}

toggleMusic.addEventListener('click', () => {
    if (!bgMusic2) return;
    if (isPlaying) { bgMusic2.pause(); toggleMusic.textContent = '🔇'; }
    else { bgMusic2.play(); toggleMusic.textContent = '🔊'; }
    isPlaying = !isPlaying;
});

// SECRET MESSAGE - Clickable Unlock
const secretMessageBox = document.getElementById('secretMessageBox');
const secretMessageContent = document.getElementById('secretMessageContent');

if (secretMessageBox) {
    secretMessageBox.addEventListener('click', () => {
        secretMessageBox.style.display = 'none';
        secretMessageContent.style.display = 'block';
        createPetalScatter();
        
        // Heart blast explosion
        createHeartBurst();
        setTimeout(() => createRoseExplosion(), 500);
    });
}

// FAMILY SECTION - Clickable Unlock
const familyClickableBox = document.getElementById('familyClickableBox');
const familyContentBox = document.getElementById('familyContentBox');

if (familyClickableBox) {
    familyClickableBox.addEventListener('click', () => {
        familyClickableBox.style.display = 'none';
        familyContentBox.style.display = 'block';
        createHeartBurst();
        setTimeout(() => createPetalScatter(), 300);
    });
}

// MARRY ME - Clickable
const marryClickableBox = document.getElementById('marryClickableBox');
const marryQuestionContent = document.getElementById('marryQuestionContent');
const marryResponseContent = document.getElementById('marryResponseContent');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');

// Click on box to reveal question
if (marryClickableBox) {
    marryClickableBox.addEventListener('click', () => {
        marryClickableBox.style.display = 'none';
        marryQuestionContent.style.display = 'block';
    });
}

// No button runs away
if (btnNo) {
    btnNo.addEventListener('mouseover', function() {
        this.style.position = 'fixed';
        this.style.left = Math.random() * (window.innerWidth - 100) + 'px';
        this.style.top = Math.random() * (window.innerHeight - 50) + 'px';
        this.style.zIndex = '99999';
    });
}

// Yes button - Show response + Rose Rain
if (btnYes) {
    btnYes.addEventListener('click', () => {
        marryQuestionContent.style.display = 'none';
        marryResponseContent.style.display = 'block';
        
        // Create ROSE RAIN - falling from top to bottom all over page
        createRoseRain();
    });
}

// ROSE RAIN - Falling roses all over the page
function createRoseRain() {
    const roses = ['🌹', '🌹', '🌹', '🌸', '💕', '❤️'];
    const numRoses = 100;

    for (let i = 0; i < numRoses; i++) {
        setTimeout(() => {
            const rose = document.createElement('div');
            rose.className = 'rose-rain';
            rose.textContent = roses[Math.floor(Math.random() * roses.length)];
            rose.style.left = Math.random() * 100 + 'vw';
            rose.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
            rose.style.animationDuration = (3 + Math.random() * 4) + 's';
            rose.style.animationDelay = '0s';

            document.body.appendChild(rose);
            setTimeout(() => rose.remove(), 8000);
        }, i * 50);
    }

    // Second wave after 2 seconds
    setTimeout(() => {
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                const rose = document.createElement('div');
                rose.className = 'rose-rain';
                rose.textContent = roses[Math.floor(Math.random() * roses.length)];
                rose.style.left = Math.random() * 100 + 'vw';
                rose.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
                rose.style.animationDuration = (3 + Math.random() * 4) + 's';

                document.body.appendChild(rose);
                setTimeout(() => rose.remove(), 8000);
            }, i * 60);
        }
    }, 2000);
}

// ===== BLAST CELEBRATION ANIMATION =====
function triggerBlastCelebration() {
    // PHASE 1: FIREWORK EXPLOSION
    createFireworks();

    // PHASE 2: CONFETTI RAIN (after 1s)
    setTimeout(() => createConfettiRain(), 1000);

    // PHASE 3: ROSE EXPLOSION (after 2s)
    setTimeout(() => createRoseExplosion(), 2000);

    // PHASE 4: GOLDEN SPARKLES (after 3s)
    setTimeout(() => createGoldenSparkles(), 3000);

    // PHASE 5: HEART BURST (after 1.5s)
    setTimeout(() => createHeartBurst(), 1500);

    // PHASE 6: SCREEN FLASH
    createScreenFlash();

    // PHASE 7: SHOW SPECIAL MESSAGE (after 2.5s)
    setTimeout(() => showSpecialBirthdayMessage(), 2500);

    // PHASE 8: MASSIVE FINAL WAVE (after 4s)
    setTimeout(() => createFinalMassiveWave(), 4000);
}

// Fireworks - Big center explosions
function createFireworks() {
    const colors = ['#ff1744', '#ffea00', '#00e676', '#2979ff', '#d500f9', '#ff6d00', '#ffffff'];
    const numFireworks = 8;

    for (let f = 0; f < numFireworks; f++) {
        setTimeout(() => {
            const centerX = Math.random() * window.innerWidth;
            const centerY = Math.random() * (window.innerHeight * 0.6);

            // Flash burst
            const flash = document.createElement('div');
            flash.className = 'firework-flash';
            flash.style.left = centerX + 'px';
            flash.style.top = centerY + 'px';
            document.body.appendChild(flash);
            setTimeout(() => flash.remove(), 600);

            // Particles
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

                const angle = (Math.PI * 2 * i) / 50;
                const distance = 100 + Math.random() * 200;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                particle.style.width = (3 + Math.random() * 5) + 'px';
                particle.style.height = particle.style.width;

                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 2000);
            }
        }, f * 400);
    }
}

// Confetti Rain - Colorful falling confetti
function createConfettiRain() {
    const confettiColors = ['#ff1744', '#ffea00', '#00e676', '#2979ff', '#d500f9', '#ff6d00', '#ff4081', '#00bcd4'];
    const numConfetti = 150;

    for (let i = 0; i < numConfetti; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.width = (8 + Math.random() * 8) + 'px';
            confetti.style.height = (12 + Math.random() * 12) + 'px';
            confetti.style.animationDuration = (2 + Math.random() * 3) + 's';

            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 6000);
        }, i * 30);
    }

    // Second wave
    setTimeout(() => {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
                confetti.style.width = (8 + Math.random() * 8) + 'px';
                confetti.style.height = (12 + Math.random() * 12) + 'px';
                confetti.style.animationDuration = (2 + Math.random() * 3) + 's';

                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 6000);
            }, i * 40);
        }
    }, 1500);
}

// Rose Explosion - Hearts burst from center
function createRoseExplosion() {
    const items = ['🌹', '💐', '🌸', '💕', '❤️', '💖', '🎉', '🎊'];
    const waves = 3;

    for (let w = 0; w < waves; w++) {
        setTimeout(() => {
            for (let i = 0; i < 60; i++) {
                const item = document.createElement('div');
                item.className = 'rose-explosion';
                item.textContent = items[Math.floor(Math.random() * items.length)];
                item.style.left = '50%';
                item.style.top = '50%';
                item.style.fontSize = (1.5 + Math.random() * 2.5) + 'rem';

                const angle = (Math.PI * 2 * i) / 60;
                const distance = 200 + Math.random() * 300;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                item.style.setProperty('--tx', tx + 'px');
                item.style.setProperty('--ty', ty + 'px');

                document.body.appendChild(item);
                setTimeout(() => item.remove(), 3000);
            }
        }, w * 800);
    }
}

// Golden Sparkles - Shimmering particles
function createGoldenSparkles() {
    const numSparkles = 80;

    for (let i = 0; i < numSparkles; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'golden-sparkle';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.animationDuration = (1 + Math.random() * 2) + 's';

            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 4000);
        }, i * 50);
    }
}

// Heart Burst - Rapid heart explosions
function createHeartBurst() {
    const hearts = ['💕', '💖', '💗', '💝', '❤️', '💘', '💞'];
    const numBursts = 5;

    for (let b = 0; b < numBursts; b++) {
        setTimeout(() => {
            const centerX = Math.random() * window.innerWidth;
            const centerY = Math.random() * window.innerHeight;

            for (let i = 0; i < 30; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart-burst';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = centerX + 'px';
                heart.style.top = centerY + 'px';
                heart.style.fontSize = (1.5 + Math.random() * 2) + 'rem';

                const angle = (Math.PI * 2 * i) / 30;
                const distance = 80 + Math.random() * 150;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                heart.style.setProperty('--tx', tx + 'px');
                heart.style.setProperty('--ty', ty + 'px');

                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 2000);
            }
        }, b * 500);
    }
}

// Screen Flash
function createScreenFlash() {
    const flash = document.createElement('div');
    flash.className = 'blast-flash';
    document.body.appendChild(flash);

    setTimeout(() => {
        flash.style.opacity = '0';
        flash.style.transition = 'opacity 0.8s ease';
    }, 100);

    setTimeout(() => flash.remove(), 1000);
}

// Special Birthday Message
function showSpecialBirthdayMessage() {
    const message = document.createElement('div');
    message.className = 'birthday-special-message';
    message.innerHTML = `
        <div class="msg-icon">🎂</div>
        <h1 class="msg-title">HAPPY BIRTHDAY!</h1>
        <h2 class="msg-subtitle">Janoooo 💕</h2>
        <p class="msg-text">The wait is over! Today is YOUR special day!</p>
        <div class="msg-hearts">💕 🎉 💖 🎊 💗 🎂</div>
    `;
    document.body.appendChild(message);

    // Auto-remove after 8 seconds
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 1s ease';
        setTimeout(() => message.remove(), 1000);
    }, 8000);
}

// Final Massive Wave
function createFinalMassiveWave() {
    const emojis = ['🎉', '🎊', '🎈', '🎁', '🌹', '💕', '❤️', '🎂', '🥳', '✨', '💫', '⭐'];

    // Wave 1 - 100 items
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const item = document.createElement('div');
            item.className = 'final-wave-item';
            item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            item.style.left = Math.random() * 100 + 'vw';
            item.style.top = '-50px';
            item.style.fontSize = (2 + Math.random() * 3) + 'rem';
            item.style.animationDuration = (3 + Math.random() * 4) + 's';

            document.body.appendChild(item);
            setTimeout(() => item.remove(), 8000);
        }, i * 60);
    }

    // Wave 2 - 80 items after 2s
    setTimeout(() => {
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const item = document.createElement('div');
                item.className = 'final-wave-item';
                item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                item.style.left = Math.random() * 100 + 'vw';
                item.style.top = '-50px';
                item.style.fontSize = (2 + Math.random() * 3) + 'rem';
                item.style.animationDuration = (3 + Math.random() * 4) + 's';

                document.body.appendChild(item);
                setTimeout(() => item.remove(), 8000);
            }, i * 50);
        }
    }, 2000);

    // Wave 3 - Center explosion
    setTimeout(() => {
        for (let i = 0; i < 50; i++) {
            const item = document.createElement('div');
            item.className = 'final-center-explosion';
            item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            item.style.left = '50%';
            item.style.top = '50%';
            item.style.fontSize = (2 + Math.random() * 3) + 'rem';

            const angle = (Math.PI * 2 * i) / 50;
            const distance = 150 + Math.random() * 250;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            item.style.setProperty('--tx', tx + 'px');
            item.style.setProperty('--ty', ty + 'px');

            document.body.appendChild(item);
            setTimeout(() => item.remove(), 3000);
        }
    }, 3000);
}

// Auto-trigger blast if it's April 17
function checkBirthdayDate() {
    const now = new Date();
    const month = now.getMonth(); // 0-indexed (3 = April)
    const day = now.getDate();

    if (month === 3 && day === 17) {
        // Start music immediately
        if (bgMusic2) {
            bgMusic2.volume = 0.5;
            bgMusic2.play().catch(() => {
                document.addEventListener('click', function startMusicOnce() {
                    bgMusic2.play().catch(() => {});
                    document.removeEventListener('click', startMusicOnce);
                }, { once: true });
            });
        }
        // Trigger blast after 2 seconds
        setTimeout(() => triggerBlastCelebration(), 2000);
    }
}

checkBirthdayDate();
