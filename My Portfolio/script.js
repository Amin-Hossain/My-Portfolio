function openLightbox() {
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});


const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF<>{}[]()';
const fontSize = 13;
let cols, drops;

function initDrops() {
    cols = Math.floor(canvas.width / fontSize);
    drops = Array(cols).fill(1);
}
initDrops();
window.addEventListener('resize', initDrops);

function drawMatrix() {
    ctx.fillStyle = 'rgba(11,14,20,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#4fffb0';
    ctx.font = fontSize + 'px DM Mono, monospace';
    for (let i = 0; i < drops.length; i++) {
        const c = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(c, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > .975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 45);

const pw = document.getElementById('particles');
for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 14) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (1 + Math.random() * 2.5) + 'px';
    p.style.opacity = Math.random() * .5;
    pw.appendChild(p);
}


const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(es => {
    es.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, {
    threshold: 0.1
});
reveals.forEach(r => obs.observe(r));