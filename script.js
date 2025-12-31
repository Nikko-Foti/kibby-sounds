// Web Audio API context
let audioContext;
let currentVolume = 0.7;
let isPlaying = false;
let audioCache = {};

// Sound file paths - will try to load these first, fallback to synthesized
// Using CDN URLs from SoundBible.com for available sounds
const soundFiles = {
    bird: 'sounds/bird.mp3', // fallback to synthesized
    meow: 'http://soundbible.com/mp3/Cat_Meow_2-Cat_Stevens-2034822903.mp3',
    mouse: 'sounds/mouse.mp3', // fallback to synthesized
    purr: 'sounds/purr.mp3', // fallback to synthesized
    crinkle: 'sounds/crinkle.mp3', // fallback to synthesized
    toy: 'sounds/toy.mp3', // fallback to synthesized
    hiss: 'http://soundbible.com/mp3/Angry_Cat-SoundBible.com-1050364296.mp3',
    treats: 'sounds/treats.mp3', // fallback to synthesized
    kitten: 'http://soundbible.com/mp3/Kitten_Meow-SoundBible.com-1295572573.mp3',
    whistle: 'sounds/whistle.mp3', // fallback to synthesized
    trill: 'http://soundbible.com/mp3/Cat_Meow-SoundBible.com-1453940411.mp3',
    can: 'sounds/can.mp3' // fallback to synthesized
};

// Initialize Audio Context on first user interaction
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeVolumeControl();
    initializeSoundButtons();
    preloadRealSounds();
});

function initializeVolumeControl() {
    const volumeSlider = document.getElementById('volume');
    const volumeDisplay = document.getElementById('volume-display');

    volumeSlider.addEventListener('input', (e) => {
        currentVolume = e.target.value / 100;
        volumeDisplay.textContent = e.target.value;
    });
}

function initializeSoundButtons() {
    const buttons = document.querySelectorAll('.sound-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            initAudioContext();
            const soundKey = button.dataset.sound;
            playSound(soundKey, button);
        });
    });
}

// Preload real sound files (if they exist)
function preloadRealSounds() {
    Object.entries(soundFiles).forEach(([key, file]) => {
        const audio = new Audio();
        audio.preload = 'auto';

        // Try to load the file
        audio.addEventListener('canplaythrough', () => {
            audioCache[key] = audio;
            console.log(`✓ Loaded real sound: ${key}`);
        }, { once: true });

        audio.addEventListener('error', () => {
            // File doesn't exist, will use synthesized sound
            console.log(`✗ No file for ${key}, using synthesized sound`);
        }, { once: true });

        audio.src = file;
        audio.volume = currentVolume;
    });
}

// Play sound - tries real audio first, falls back to synthesized
function playSound(soundKey, button) {
    if (isPlaying) return;

    isPlaying = true;
    button.classList.add('playing');

    // Check if we have a real audio file loaded
    if (audioCache[soundKey]) {
        playRealSound(soundKey, button);
    } else {
        playSynthesizedSound(soundKey, button);
    }
}

// Play real audio file
function playRealSound(soundKey, button) {
    const audio = audioCache[soundKey];
    audio.currentTime = 0;
    audio.volume = currentVolume;

    audio.play().then(() => {
        const duration = audio.duration * 1000 || 1000;
        setTimeout(() => {
            button.classList.remove('playing');
            isPlaying = false;
        }, Math.min(duration, 2000));
    }).catch(() => {
        // Fallback to synthesized if playback fails
        playSynthesizedSound(soundKey, button);
    });
}

// Play synthesized sound using Web Audio API
function playSynthesizedSound(soundKey, button) {
    const soundGenerators = {
        bird: generateBirdSound,
        meow: generateMeowSound,
        mouse: generateMouseSound,
        purr: generatePurrSound,
        crinkle: generateCrinkleSound,
        toy: generateToySound,
        hiss: generateHissSound,
        treats: generateTreatsSound,
        kitten: generateKittenSound,
        whistle: generateWhistleSound,
        trill: generateTrillSound,
        can: generateCanSound
    };

    const generator = soundGenerators[soundKey];
    if (generator) {
        generator();
        setTimeout(() => {
            button.classList.remove('playing');
            isPlaying = false;
        }, 1000);
    }
}

// Bird chirping - rapid high frequency chirps
function generateBirdSound() {
    const duration = 0.8;
    const chirps = 5;

    for (let i = 0; i < chirps; i++) {
        setTimeout(() => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.frequency.setValueAtTime(2800, audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(3500, audioContext.currentTime + 0.08);

            gain.gain.setValueAtTime(currentVolume * 0.3, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 0.15);
        }, i * 150);
    }
}

// Cat meow - varying pitch tone
function generateMeowSound() {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.frequency.setValueAtTime(400, audioContext.currentTime);
    osc.frequency.linearRampToValueAtTime(550, audioContext.currentTime + 0.2);
    osc.frequency.linearRampToValueAtTime(450, audioContext.currentTime + 0.5);

    gain.gain.setValueAtTime(currentVolume * 0.4, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(currentVolume * 0.3, audioContext.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.7);

    osc.type = 'sawtooth';
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.7);
}

// Mouse squeak - very high pitched
function generateMouseSound() {
    const squeaks = 3;

    for (let i = 0; i < squeaks; i++) {
        setTimeout(() => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.frequency.setValueAtTime(4000, audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(5000, audioContext.currentTime + 0.05);

            gain.gain.setValueAtTime(currentVolume * 0.25, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            osc.type = 'sine';
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 0.1);
        }, i * 200);
    }
}

// Purr - low rumbling
function generatePurrSound() {
    const osc = audioContext.createOscillator();
    const lfo = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const lfoGain = audioContext.createGain();

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(audioContext.destination);

    lfo.frequency.setValueAtTime(25, audioContext.currentTime);
    lfoGain.gain.setValueAtTime(10, audioContext.currentTime);

    osc.frequency.setValueAtTime(100, audioContext.currentTime);
    osc.type = 'sawtooth';

    gain.gain.setValueAtTime(currentVolume * 0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.9);

    lfo.start(audioContext.currentTime);
    osc.start(audioContext.currentTime);
    lfo.stop(audioContext.currentTime + 0.9);
    osc.stop(audioContext.currentTime + 0.9);
}

// Crinkle - white noise bursts
function generateCrinkleSound() {
    const bufferSize = audioContext.sampleRate * 0.5;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();

    noise.buffer = buffer;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2000, audioContext.currentTime);

    gain.gain.setValueAtTime(currentVolume * 0.4, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    noise.start(audioContext.currentTime);
    noise.stop(audioContext.currentTime + 0.5);
}

// Toy squeak - high pitch with vibrato
function generateToySound() {
    const osc = audioContext.createOscillator();
    const lfo = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const lfoGain = audioContext.createGain();

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(audioContext.destination);

    lfo.frequency.setValueAtTime(5, audioContext.currentTime);
    lfoGain.gain.setValueAtTime(50, audioContext.currentTime);

    osc.frequency.setValueAtTime(1500, audioContext.currentTime);
    osc.type = 'square';

    gain.gain.setValueAtTime(currentVolume * 0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

    lfo.start(audioContext.currentTime);
    osc.start(audioContext.currentTime);
    lfo.stop(audioContext.currentTime + 0.4);
    osc.stop(audioContext.currentTime + 0.4);
}

// Hiss - filtered noise
function generateHissSound() {
    const bufferSize = audioContext.sampleRate * 0.6;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();

    noise.buffer = buffer;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3000, audioContext.currentTime);
    filter.Q.setValueAtTime(2, audioContext.currentTime);

    gain.gain.setValueAtTime(currentVolume * 0.35, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);

    noise.start(audioContext.currentTime);
    noise.stop(audioContext.currentTime + 0.6);
}

// Treats - rattling sound
function generateTreatsSound() {
    const rattles = 8;

    for (let i = 0; i < rattles; i++) {
        setTimeout(() => {
            const bufferSize = audioContext.sampleRate * 0.05;
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const data = buffer.getChannelData(0);

            for (let j = 0; j < bufferSize; j++) {
                data[j] = Math.random() * 2 - 1;
            }

            const noise = audioContext.createBufferSource();
            const gain = audioContext.createGain();

            noise.buffer = buffer;
            noise.connect(gain);
            gain.connect(audioContext.destination);

            gain.gain.setValueAtTime(currentVolume * 0.4, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

            noise.start(audioContext.currentTime);
        }, i * 80);
    }
}

// Kitten mew - higher pitched meow
function generateKittenSound() {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.frequency.setValueAtTime(600, audioContext.currentTime);
    osc.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 0.15);
    osc.frequency.linearRampToValueAtTime(650, audioContext.currentTime + 0.4);

    gain.gain.setValueAtTime(currentVolume * 0.35, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(currentVolume * 0.25, audioContext.currentTime + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    osc.type = 'sawtooth';
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.5);
}

// Whistle - pure high tone
function generateWhistleSound() {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.frequency.setValueAtTime(3500, audioContext.currentTime);
    osc.type = 'sine';

    gain.gain.setValueAtTime(0.01, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(currentVolume * 0.3, audioContext.currentTime + 0.1);
    gain.gain.setValueAtTime(currentVolume * 0.3, audioContext.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.7);

    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.7);
}

// Trill - rapid pitch changes
function generateTrillSound() {
    const osc = audioContext.createOscillator();
    const lfo = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const lfoGain = audioContext.createGain();

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(audioContext.destination);

    lfo.frequency.setValueAtTime(15, audioContext.currentTime);
    lfoGain.gain.setValueAtTime(100, audioContext.currentTime);

    osc.frequency.setValueAtTime(500, audioContext.currentTime);
    osc.type = 'triangle';

    gain.gain.setValueAtTime(currentVolume * 0.35, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);

    lfo.start(audioContext.currentTime);
    osc.start(audioContext.currentTime);
    lfo.stop(audioContext.currentTime + 0.6);
    osc.stop(audioContext.currentTime + 0.6);
}

// Can opener - metallic clicks
function generateCanSound() {
    const clicks = 6;

    for (let i = 0; i < clicks; i++) {
        setTimeout(() => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.frequency.setValueAtTime(800, audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.05);
            osc.type = 'square';

            gain.gain.setValueAtTime(currentVolume * 0.4, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);

            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 0.08);
        }, i * 120);
    }
}

// Add keyboard support
document.addEventListener('keydown', (e) => {
    const keyMap = {
        '1': 'bird',
        '2': 'meow',
        '3': 'mouse',
        '4': 'purr',
        '5': 'crinkle',
        '6': 'toy',
        '7': 'hiss',
        '8': 'treats',
        '9': 'kitten',
        '0': 'whistle'
    };

    const soundKey = keyMap[e.key];
    if (soundKey) {
        initAudioContext();
        const button = document.querySelector(`[data-sound="${soundKey}"]`);
        if (button) {
            playSound(soundKey, button);
        }
    }
});

// Cat reaction image display
function showCatReaction() {
    const overlay = document.getElementById('cat-reaction-overlay');
    overlay.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
        overlay.classList.remove('show');
    }, 3000);
}

// Initialize cat reaction button
document.addEventListener('DOMContentLoaded', () => {
    const reactionButton = document.getElementById('cat-reaction-btn');
    if (reactionButton) {
        reactionButton.addEventListener('click', showCatReaction);
    }
});
