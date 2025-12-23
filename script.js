// Inisialisasi animasi AOS
AOS.init({ duration: 1200, once: true });

const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
let isMuted = false;

// LOGIKA URL PARAMETER (?to=nama)
const params = new URLSearchParams(window.location.search);
const to = params.get('to');
if (to) {
    const cleanName = to.replace(/[+_-]/g, ' '); // Menangani tanda baca di URL
    document.getElementById('nama-tamu-entry').innerText = cleanName;
    document.getElementById('rsvp-nama').value = cleanName;
}

// FUNGSI MEMBUKA UNDANGAN
function activateDisney() {
    // Putar musik (menghindari blokir browser)
    bgMusic.play().catch(() => console.log("Audio interaction needed"));
    musicBtn.classList.remove('hidden');
    
    const entryPage = document.getElementById('entry-page');
    const mainContent = document.getElementById('main-content');
    
    // Transisi perpindahan layar
    entryPage.style.opacity = '0';
    setTimeout(() => {
        entryPage.style.display = 'none';
        mainContent.classList.remove('hidden');
        setTimeout(() => mainContent.classList.add('opacity-100'), 50);
    }, 1200);
}

// FUNGSI BARU: Scroll ke ayat saat tombol Scroll Down diklik
function scrollToAyat() {
    const ayatSection = document.getElementById('ayat-section');
    if (ayatSection) {
        ayatSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navigasi ke Disney Experience
function scrollToDisney() {
    document.getElementById('disney-experience').scrollIntoView({ behavior: 'smooth' });
}

// Kontrol Suara Musik
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