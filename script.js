AOS.init({ duration: 1200, once: true });

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxHAcTm5_ciLZ-UPQIEEIT3kJk3eodO4Gfl1DckXUNYMSWFBspldY0f_H-gsT8tiqzK/exec";

const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
let isMuted = false;

// --- SINKRONISASI NAMA ---
const rsvpInputNama = document.getElementById('rsvp-nama');
const ratingNamaHidden = document.getElementById('rating-nama-hidden');

if (rsvpInputNama && ratingNamaHidden) {
    rsvpInputNama.addEventListener('input', (e) => {
        ratingNamaHidden.value = e.target.value;
    });
}

// --- LOGIKA BINTANG RATING ---
const stars = document.querySelectorAll('.star');
const ratingValueInput = document.getElementById('rating-value');
stars.forEach(star => {
    star.addEventListener('click', (e) => {
        const rating = e.target.getAttribute('data-star');
        if(ratingValueInput) ratingValueInput.value = rating;
        stars.forEach(s => {
            const sRating = s.getAttribute('data-star');
            if(sRating <= rating) {
                s.classList.remove('text-gray-600');
                s.classList.add('text-amber-400');
            } else {
                s.classList.remove('text-amber-400');
                s.classList.add('text-gray-600');
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
    const d = document.getElementById("days"), h = document.getElementById("hours"), m = document.getElementById("minutes"), s = document.getElementById("seconds");
    if(d) d.innerText = Math.floor(gap / day);
    if(h) h.innerText = Math.floor((gap % day) / hour);
    if(m) m.innerText = Math.floor((gap % hour) / minute);
    if(s) s.innerText = Math.floor((gap % minute) / second);
}, 1000);

// --- PERSONALIZE NAMA ---
const params = new URLSearchParams(window.location.search);
const to = params.get('to');
if (to) {
    const cleanName = decodeURIComponent(to.replace(/[+_-]/g, ' '));
    const entryName = document.getElementById('nama-tamu-entry');
    const rsvpName = document.getElementById('rsvp-nama');
    if (entryName) entryName.innerText = cleanName;
    if (rsvpName) {
        rsvpName.value = cleanName;
        if(ratingNamaHidden) ratingNamaHidden.value = cleanName;
    }
}

function activateDisney() {
    bgMusic.play().catch(() => console.log("Interaction needed"));
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
    const disneyContent = document.getElementById('disney-experience');
    if(disneyContent) {
        disneyContent.classList.remove('locked-experience');
        disneyContent.scrollIntoView({ behavior: 'smooth' });
    }
}

function openModal(ep) {
    const modal = document.getElementById('storyModal');
    const content = document.getElementById('modalContent');
    const storyData = {
        ep1: { title: "The Unwritten Script", desc: "''Setelah masa SMP dan SMA berlalu, semesta mempertemukan kita kembali. Tanpa rencana, tanpa naskah... tapi justru dari situlah cerita ini mulai ditulis dengan cara yang paling indah.''", img: "assets/img/ep1_modal.jpeg" },
        ep2: { title: "The Milestone", desc: "''Ini bukan pencapaian instan, tapi hasil dari proses panjang yang penuh usaha dan kesabaran. Setelah melewati banyak hal, akhirnya perjalanan ini sampai di titik penting yang layak dirayakan.''", img: "assets/img/ep2_modal.jpeg" },
        ep3: { title: "Finding Home", desc: "''Semua ujian yang datang hanya membuat kita semakin kuat. Hingga akhirnya kita sadar: tujuan akhir bukan kemenangan, tapi tempat pulang. Dan kamu... adalah rumah itu.''", img: "assets/img/ep3_modal.jpeg" }
    };
    if(!modal || !storyData[ep]) return;
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

function toggleMusic() {
    if (isMuted) { bgMusic.muted = false; musicIcon.innerText = "🔊"; } 
    else { bgMusic.muted = true; musicIcon.innerText = "🔇"; }
    isMuted = !isMuted;
}

// --- SUBMIT DENGAN LOGIKA POLOSAN URL ---
async function submitToSheets(formId, isRedirect) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = "Processing...";
        btn.disabled = true;

        fetch(SCRIPT_URL, { method: 'POST', body: new FormData(form) })
        .then(() => {
            if (isRedirect) { 
                // Sembunyikan konten undangan, munculkan layar sukses
                document.getElementById('all-content-wrapper').classList.add('hidden');
                document.getElementById('success-screen').classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } 
            else {
                document.getElementById('rsvp-container').innerHTML = `
                    <div class="text-center p-10 animate-zoom-in">
                        <div class="text-5xl mb-4">✅</div>
                        <h3 class="text-xl font-bold text-white uppercase tracking-widest mb-2 text-center">Konfirmasi Diterima</h3>
                        <p class="text-gray-400 text-sm italic text-center">"Terima kasih, kehadiran Anda sangat berarti bagi kami."</p>
                    </div>`;
            }
        })
        .catch(() => { alert("Gagal mengirim data."); btn.disabled = false; btn.innerText = originalText; });
    });
}

// --- LOGIKA GUEST BOOK DI DALAM INDEX (POLOSAN) ---
async function showWishesOverlay() {
    const overlay = document.getElementById('wishes-overlay');
    const listDiv = document.getElementById('wishes-list-polos');
    
    overlay.classList.remove('hidden');
    listDiv.innerHTML = "<p class='text-center text-gray-500 italic col-span-full'>Gathering memories...</p>";
    
    try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();
        const filteredData = data.filter(item => item.wish && item.wish.trim() !== "");

        if (filteredData.length === 0) {
            listDiv.innerHTML = "<p class='text-center text-gray-500 italic col-span-full'>Belum ada pesan yang dibagikan.</p>";
            return;
        }

        listDiv.innerHTML = filteredData.reverse().map(item => `
            <div class="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                <div class="text-amber-400 text-xs mb-3 text-left">${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}</div>
                <p class="text-gray-300 italic mb-4 font-light text-sm leading-relaxed text-left">"${item.wish}"</p>
                <h4 class="text-blue-400 font-bold uppercase text-[10px] tracking-widest text-left">— ${item.nama}</h4>
            </div>
        `).join('');
    } catch (error) {
        listDiv.innerHTML = "<p class='text-center text-red-400 italic col-span-full'>Gagal memuat pesan.</p>";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    submitToSheets('rsvp-form', false);
    submitToSheets('rating-form', true);
});

function scrollBTS(direction) {
    const slider = document.getElementById("bts-slider");
    if (slider) slider.scrollBy({ left: direction * 320, behavior: "smooth" });
}

function scrollToAyat() {
    const ayat = document.getElementById('ayat-section');
    if(ayat) ayat.scrollIntoView({ behavior: 'smooth' });
}