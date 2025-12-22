AOS.init({ duration: 1200, once: true });

const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
let isMuted = false;

// URL PARAMETERS
const params = new URLSearchParams(window.location.search);
const to = params.get('to');
if (to) {
    const cleanName = to.replace(/[+_-]/g, ' ');
    document.getElementById('nama-tamu-entry').innerText = cleanName;
    document.getElementById('rsvp-nama').value = cleanName;
}

function activateDisney() {
    bgMusic.play().catch(() => console.log("Audio interaction needed"));
    musicBtn.classList.remove('hidden');
    
    const entryPage = document.getElementById('entry-page');
    const mainContent = document.getElementById('main-content');
    
    entryPage.style.opacity = '0';
    setTimeout(() => {
        entryPage.style.display = 'none';
        mainContent.classList.remove('hidden');
        setTimeout(() => mainContent.classList.add('opacity-100'), 50);
    }, 1200);
}

function scrollToDisney() {
    document.getElementById('disney-experience').scrollIntoView({ behavior: 'smooth' });
}

function toggleMusic() {
    if (isMuted) {
        bgMusic.muted = false;
        musicIcon.innerText = "🔊";
    } else {
        bgMusic.muted = true;
        musicIcon.innerText = "🔇";
    }
    isMuted = !isMuted;
}