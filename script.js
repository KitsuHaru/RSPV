// Inisialisasi animasi AOS
AOS.init({ duration: 1200, once: true });

const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
let isMuted = false;

// DATA UNTUK POP-UP STORY
const storyData = {
    ep1: {
        title: "The Unwritten Script",
        desc: "Setelah melewati masa SMP dan SMA masing-masing, semesta memutuskan untuk mempertemukan kita kembali. Tanpa rencana dan tanpa naskah, pertemuan itu menjadi babak pembuka dari sebuah cerita hebat yang tak pernah terlintas di benak kita akan terjadi sejauh ini.",
        img: "assets/img/ep1.jpeg"
    },
    ep2: {
        title: "The Milestone",
        desc: "Berada di tahap ini bukan hal yang instan. Setelah sekian lama melakukan pencarian, kita akhirnya memutuskan untuk menetap. Melewati berbagai hari hingga sampai di titik perayaan ini, membuktikan bahwa penantian panjang selalu membuahkan hasil yang indah.",
        img: "assets/img/ep2.jpeg"
    },
    ep3: {
        title: "Finding Home",
        desc: "Lika-liku dan terjangan badai ujian hanya membuat fondasi kita semakin kuat. Inilah babak akhir dari petualangan panjang kita, di mana kita tidak lagi mencari tujuan, melainkan sudah menemukannya. Kamu adalah 'Rumah' untukku pulang.",
        img: "assets/img/ep3.jpeg"
    }
};

// LOGIKA PERSONALISASI NAMA TAMU (?to=nama)
const params = new URLSearchParams(window.location.search);
const to = params.get('to');
if (to) {
    const cleanName = to.replace(/[+_-]/g, ' ');
    document.getElementById('nama-tamu-entry').innerText = cleanName;
    document.getElementById('rsvp-nama').value = cleanName;
}

// FUNGSI MEMBUKA UNDANGAN
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

// FUNGSI POP-UP MODAL
function openModal(ep) {
    const modal = document.getElementById('storyModal');
    const content = document.getElementById('modalContent');
    
    document.getElementById('modalTitle').innerText = storyData[ep].title;
    document.getElementById('modalDescription').innerText = storyData[ep].desc;
    document.getElementById('modalImg').style.backgroundImage = `url(${storyData[ep].img})`;
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('storyModal');
    const content = document.getElementById('modalContent');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 400);
}

// FUNGSI NAVIGASI
function scrollToAyat() {
    const ayatSection = document.getElementById('ayat-section');
    if (ayatSection) { ayatSection.scrollIntoView({ behavior: 'smooth' }); }
}

function scrollToDisney() {
    document.getElementById('disney-experience').scrollIntoView({ behavior: 'smooth' });
}

// KONTROL MUSIK
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