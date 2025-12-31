// Sound file mappings
const soundFiles = {
    bird: 'sounds/bird.mp3',
    meow: 'sounds/meow.mp3',
    mouse: 'sounds/mouse.mp3',
    purr: 'sounds/purr.mp3',
    crinkle: 'sounds/crinkle.mp3',
    toy: 'sounds/toy.mp3',
    hiss: 'sounds/hiss.mp3',
    treats: 'sounds/treats.mp3',
    kitten: 'sounds/kitten.mp3',
    whistle: 'sounds/whistle.mp3',
    trill: 'sounds/trill.mp3',
    'can-opener': 'sounds/can-opener.mp3'
};

// Audio instances cache
const audioCache = {};

// Volume control
let currentVolume = 0.7;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeVolumeControl();
    initializeSoundButtons();
    preloadSounds();
});

function initializeVolumeControl() {
    const volumeSlider = document.getElementById('volume');
    const volumeDisplay = document.getElementById('volume-display');

    volumeSlider.addEventListener('input', (e) => {
        currentVolume = e.target.value / 100;
        volumeDisplay.textContent = `${e.target.value}%`;

        // Update volume for all cached audio
        Object.values(audioCache).forEach(audio => {
            audio.volume = currentVolume;
        });
    });
}

function initializeSoundButtons() {
    const buttons = document.querySelectorAll('.sound-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const soundKey = button.dataset.sound;
            playSound(soundKey, button);
        });
    });
}

function preloadSounds() {
    // Preload audio files for better performance
    Object.entries(soundFiles).forEach(([key, file]) => {
        const audio = new Audio(file);
        audio.volume = currentVolume;
        audio.preload = 'auto';

        // Handle loading errors gracefully
        audio.addEventListener('error', () => {
            console.warn(`Could not load sound: ${file}`);
        });

        audioCache[key] = audio;
    });
}

function playSound(soundKey, button) {
    const audio = audioCache[soundKey];

    if (!audio) {
        showError(button, 'Sound not found');
        return;
    }

    // Reset audio to beginning if already playing
    audio.currentTime = 0;

    // Set current volume
    audio.volume = currentVolume;

    // Add playing class for visual feedback
    button.classList.add('playing');

    // Play the sound
    audio.play().catch(error => {
        console.error('Error playing sound:', error);
        showError(button, 'Could not play sound');
        button.classList.remove('playing');
    });

    // Remove playing class when sound ends
    audio.addEventListener('ended', () => {
        button.classList.remove('playing');
    }, { once: true });

    // Also remove after a short time as backup
    setTimeout(() => {
        button.classList.remove('playing');
    }, 500);
}

function showError(button, message) {
    const originalHTML = button.innerHTML;
    button.innerHTML = `<span style="color: white; font-size: 0.9rem;">⚠️ ${message}</span>`;

    setTimeout(() => {
        button.innerHTML = originalHTML;
    }, 2000);
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
    if (soundKey && audioCache[soundKey]) {
        const button = document.querySelector(`[data-sound="${soundKey}"]`);
        playSound(soundKey, button);
    }
});
