# 🐱 Kibby Sounds

A fun, interactive website with buttons that play sounds to get your cat's attention!

## Features

- **Works immediately** - No setup required! Uses synthesized sounds by default
- **Hybrid audio system** - Automatically uses real MP3s if added, otherwise uses Web Audio API
- 12 different cat-attracting sounds
- Retro Pokédex/pixel art design
- Mobile-first responsive layout
- Volume control
- Keyboard shortcuts (number keys 1-0)
- Visual feedback when playing sounds
- Console logging shows which sounds are loaded

## Sound Categories

- 🐦 Bird Chirping
- 😺 Cat Meowing
- 🐭 Mouse Squeaking
- 😻 Purring
- 📦 Crinkle Sounds
- 🎾 Toy Squeaking
- 😾 Cat Hissing
- 🍖 Treat Bag
- 🐈 Kitten Mewing
- 💨 High Whistle
- 😸 Cat Trill
- 🥫 Can Opener

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Nikko-Foti/kibby-sounds.git
cd kibby-sounds
```

### 2. Add Sound Files (Optional - Works Without Them!)

**The website works immediately using synthesized sounds!** However, you can add real recorded sounds for a more authentic experience.

**How the hybrid system works:**
- ✅ Real MP3 files in `sounds/` folder → Uses those
- ❌ No files found → Automatically uses Web Audio API synthesized sounds

**To add real sounds:**

Visit these websites for free, royalty-free sounds (all HTTPS, 2025):
- [Pixabay](https://pixabay.com/sound-effects/search/cat/) ⭐ **BEST** - 775+ sounds, no attribution required
- [Mixkit](https://mixkit.co/free-sound-effects/cat/) - 13 free cat sounds, direct downloads
- [Quick Sounds](https://quicksounds.com/library/sounds/cat) - No login required
- [ZapSplat](https://www.zapsplat.com/sound-effect-category/cats/) - High quality (free account)
- [Chosic](https://www.chosic.com/free-music/cat/) - Free for commercial use
- [ElevenLabs](https://elevenlabs.io/sound-effects/cat-domestic) - AI-generated sounds

Or record your own cat sounds with your phone!

**Optional files to add to `sounds/` directory:**
- `bird.mp3`
- `meow.mp3`
- `mouse.mp3`
- `purr.mp3`
- `crinkle.mp3`
- `toy.mp3`
- `hiss.mp3`
- `treats.mp3`
- `kitten.mp3`
- `whistle.mp3`
- `trill.mp3`
- `can-opener.mp3`

See [sounds/README.md](sounds/README.md) for detailed instructions.

### 3. Test Locally

Simply open `index.html` in your web browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with npx)
npx http-server
```

Then visit `http://localhost:8000`

### 4. Deploy to GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select the branch you want to deploy (e.g., `main`)
4. Click "Save"
5. Your site will be live at `https://nikko-foti.github.io/kibby-sounds/`

## Usage

- **Click** any button to play the corresponding sound
- **Keyboard shortcuts**: Press number keys 1-0 to play different sounds
- **Volume control**: Use the slider at the bottom to adjust volume
- **Mobile**: Tap buttons to play sounds on mobile devices

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Tips for Best Results

- Turn up your device volume before using
- Play sounds from a phone or tablet near your cat
- Try different sounds to see which ones your cat responds to best
- Some cats respond better to higher frequency sounds (bird, mouse, whistle)
- Can opener and treat bag sounds often get immediate attention!

## Development

The project consists of three main files:

- `index.html` - Main HTML structure
- `styles.css` - Styling and animations
- `script.js` - Audio playback logic and interactivity

Feel free to customize:
- Add more sounds by updating all three files
- Change colors in `styles.css`
- Modify button layouts
- Add new features!

## License

This project is open source. Please ensure any sound files you use comply with their respective licenses.

## Contributing

Contributions are welcome! Feel free to:
- Add new sound categories
- Improve the UI/UX
- Add new features
- Fix bugs

## Credits

Created as a fun project for cat lovers everywhere! 🐱

---

**Enjoy getting your cat's attention!** 😸
