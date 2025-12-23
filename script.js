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
        desc: "Setelah sekian lama mencari, akhirnya perjalanan ini menemukan tambatannya. Berada di tahap ini bukan hal yang instan. Kita memutuskan untuk menetap dan memulai babak baru yang penuh warna.",
        img: "assets/img/ep2.jpeg"
    },
    ep3: {
        title: "Finding Home",
        desc: "Lika-liku dan terjangan badai ujian hanya membuat fondasi kita semakin kuat. Inilah babak akhir dari petualangan panjang kita. Kamu adalah 'Rumah' untukku pulang.",
        img: "assets/img/ep3.jpeg"
    }
};

// LOGIKA PERSONALISASI
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

// FUNGSI SURPRISE (HANYA BUKA BAGIAN PREMIERE)
function scrollToDisney() {
    const disneyContent = document.getElementById('disney-experience');
    
    // Buka kunci bagian Disney
    disneyContent.classList.remove('locked-experience');
    
    // Lakukan scroll halus ke arah Premiere
    disneyContent.scrollIntoView({ 
        behavior: 'smooth' 
    });
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

function scrollToAyat() {
    document.getElementById('ayat-section').scrollIntoView({ behavior: 'smooth' });
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