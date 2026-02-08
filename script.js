AOS.init({ duration: 1200, once: true });

const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
let isMuted = false;

// --- INTERACTIVE RATING LOGIC ---
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', (e) => {
        const rating = e.target.getAttribute('data-star');
        stars.forEach(s => {
            if(s.getAttribute('data-star') <= rating) {
                s.classList.replace('text-gray-600', 'text-amber-400');
            } else {
                s.classList.replace('text-amber-400', 'text-gray-600');
            }
        });
    });
});

// --- COUNTDOWN TIMER ---
const weddingDate = new Date("Feb 14, 2026 09:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const gap = weddingDate - now;
    const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
    document.getElementById("days").innerText = Math.floor(gap / day);
    document.getElementById("hours").innerText = Math.floor((gap % day) / hour);
    document.getElementById("minutes").innerText = Math.floor((gap % hour) / minute);
    document.getElementById("seconds").innerText = Math.floor((gap % minute) / second);
}, 1000);

// --- COPY TO CLIPBOARD ---
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert("Nomor Rekening Mandiri Berhasil Disalin!");
}

// --- DATA STORY DENGAN 2 GAMBAR BERBEDA ---
const storyData = {
    ep1: { 
        title: "The Unwritten Script", 
        desc: "''Setelah masa SMP dan SMA berlalu, semesta mempertemukan kita kembali. Tanpa rencana, tanpa naskah… tapi justru dari situlah cerita ini mulai ditulis dengan cara yang paling indah.''", 
        img: "assets/img/ep1_modal.jpeg"
    },
    ep2: { 
        title: "The Milestone", 
        desc: "''Ini bukan pencapaian instan, tapi hasil dari proses panjang yang penuh usaha dan kesabaran. Setelah melewati banyak hal, akhirnya perjalanan ini sampai di titik penting yang layak dirayakan.''", 
        img: "assets/img/ep2_modal.jpeg"
    },
    ep3: { 
        title: "Finding Home", 
        desc: "''Semua ujian yang datang hanya membuat kita semakin kuat. Hingga akhirnya kita sadar: tujuan akhir bukan kemenangan, tapi tempat pulang. Dan kamu… adalah rumah itu.''", 
        img: "assets/img/ep3_modal.jpeg"
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

// FUNGSI SURPRISE
function scrollToDisney() {
    const disneyContent = document.getElementById('disney-experience');
    disneyContent.classList.remove('locked-experience');
    disneyContent.scrollIntoView({ behavior: 'smooth' });
}

// FUNGSI MODAL
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


/* ========================================================= */
/* --- BTS SLIDER LOGIC (SCROLL LEFT RIGHT + DRAG SWIPE) --- */
/* ========================================================= */

function scrollBTS(direction) {
    const slider = document.getElementById("bts-slider");
    if (!slider) return;

    slider.scrollBy({
        left: direction * 320,
        behavior: "smooth"
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const btsSlider = document.getElementById("bts-slider");
    if (!btsSlider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    // Desktop drag
    btsSlider.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - btsSlider.offsetLeft;
        scrollLeft = btsSlider.scrollLeft;
    });

    btsSlider.addEventListener("mouseleave", () => {
        isDown = false;
    });

    btsSlider.addEventListener("mouseup", () => {
        isDown = false;
    });

    btsSlider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - btsSlider.offsetLeft;
        const walk = (x - startX) * 2;
        btsSlider.scrollLeft = scrollLeft - walk;
    });

    // Mobile swipe
    btsSlider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].pageX;
        scrollLeft = btsSlider.scrollLeft;
    });

    btsSlider.addEventListener("touchmove", (e) => {
        const x = e.touches[0].pageX;
        const walk = (x - startX) * 2;
        btsSlider.scrollLeft = scrollLeft - walk;
    });
});
