/* ===== KONFIGURASI: ubah bagian ini ===== */
const CONFIG = {
  email: "farelnaqvi123@gmail.com",
  whatsapp: "62895422137474",
  github: "",
  linkedin: "",
  formEndpoint: ""
};

const PROJECTS = [
  { title: "Todo-Pro", category: "web", year: "2025", tech: "PHP", image: "assets/projek1.png",
    desc: "Aplikasi manajemen tugas berbasis web yang dirancang untuk membantu pengguna mengatur aktivitas, memantau progres pekerjaan, dan mengelola deadline secara lebih terstruktur.", problem: "Pencatatan tugas secara manual sering membuat pengguna kesulitan memantau pekerjaan yang belum selesai, mengingat deadline, dan menentukan tugas yang perlu diprioritaskan.", solution: "Todo-Pro menyediakan dashboard yang menampilkan ringkasan tugas, status penyelesaian, deadline, serta fitur untuk menambah, mengedit, dan menghapus tugas dalam satu tempat.",
    process: "Proyek dikembangkan dengan merancang antarmuka dashboard yang sederhana dan mudah digunakan, kemudian mengimplementasikan fitur pengelolaan tugas menggunakan teknologi web. Tampilan dibuat responsif agar nyaman diakses melalui berbagai ukuran layar.", result: "Menghasilkan aplikasi manajemen tugas dengan tampilan yang terstruktur dan fitur pengelolaan pekerjaan yang membantu pengguna memantau progres serta mengetahui tugas yang belum selesai.", live: "", repo: "" },
  // { title: "Personal Finance App", category: "uiux", year: "2026", tech: "MOBILE APLICATION", image: "assets/projek2.png",
  //   desc: "Konsep desain aplikasi pengelolaan keuangan pribadi yang membantu pengguna mencatat transaksi, memantau pengeluaran, mengatur anggaran, dan mencapai tujuan finansial melalui antarmuka yang modern dan intuitif.", problem: "Pengelolaan keuangan secara manual dapat menyulitkan pengguna dalam melacak pengeluaran, memahami pola penggunaan uang, dan mengontrol anggaran bulanan.", solution: "Merancang aplikasi keuangan pribadi dengan fitur pencatatan pemasukan dan pengeluaran, kategori transaksi, ringkasan keuangan, analisis pengeluaran, serta target tabungan dalam satu platform.", process: "Proses desain meliputi identifikasi kebutuhan pengguna, penyusunan user flow, pembuatan wireframe, perancangan antarmuka high-fidelity, dan penyusunan prototipe untuk menggambarkan alur penggunaan aplikasi.", result: "Menghasilkan konsep UI/UX aplikasi dengan navigasi terstruktur, dashboard informatif, visualisasi keuangan yang mudah dipahami, dan tampilan konsisten untuk mendukung pengelolaan keuangan sehari-hari.", live: "", repo: "" },
  // { title: "NEXORA — Sportswear Brand Identity", category: "graphic", year: "2026", tech: "Photoshop", image: "assets/3.png",
  //   desc: "Konsep identitas visual untuk brand fashion olahraga yang mengusung gaya modern, sporty, dan futuristik melalui perpaduan warna gelap dan aksen hijau neon. Dirancang untuk membangun karakter brand yang kuat, dinamis, dan mudah dikenali.", problem: "", solution: "", process: "", result: "", live: "", repo: "" },
  // { title: "[NAMA PROYEK 4]", category: "other", year: "[TAHUN]", tech: "[TOOLS]", image: "",
  //   desc: "[Deskripsi singkat proyek.]", problem: "", solution: "", process: "", result: "", live: "", repo: "" }
];
const LABEL = { web: "Web Development", uiux: "UI/UX Design", graphic: "Graphic Design", other: "Other" };
/* ======================================== */

document.documentElement.classList.add("js");
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Navbar: background saat scroll, link aktif, menu mobile
const nav = $("#nav"), menu = $("#menu"), menuBtn = $("#menuBtn");
const onScroll = () => nav.classList.toggle("solid", scrollY > 30);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
menuBtn.onclick = () => {
  const o = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", o);
};
$$("#menu a").forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); }));
const links = $$("#menu a");
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
$$("main section").forEach(s => spy.observe(s));

// Reveal, stagger, angka statistik, bar skill
function countUp(el) {
  const to = +el.dataset.count || 0;
  if (reduce || !to) { el.textContent = to; return; }
  const t0 = performance.now();
  (function step(t) {
    const p = Math.min((t - t0) / 1200, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}
$$(".bar i").forEach(i => i.style.setProperty("--lv", i.dataset.level || 0));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  $$("[data-count]", e.target).forEach(countUp);
  io.unobserve(e.target);
}), { threshold: .15 });
const observeAll = () => $$(".reveal:not(.in), .bar").forEach(el => io.observe(el));
$$(".stats, .about-grid .card, .sec-head, .tabs, .contact-grid > *").forEach(el => el.classList.add("reveal"));
$$(".bar").forEach(el => el.classList.add("reveal"));

// Tab resume
$$(".tabs button").forEach(b => b.onclick = () => {
  $$(".tabs button").forEach(x => x.setAttribute("aria-selected", x === b));
  $$(".panel").forEach(p => p.hidden = p.id !== "p-" + b.dataset.tab);
});

// Portfolio: render, filter, modal
const grid = $("#grid"), modal = $("#modal");
const thumb = p => p.image ? `<img src="${p.image}" alt="Tampilan proyek ${p.title}" loading="lazy" onerror="this.replaceWith('Gambar tidak ditemukan')">` : "[SCREENSHOT PROYEK]";
grid.innerHTML = PROJECTS.map((p, i) => `
  <button class="work reveal" style="--d:${i * .08}s" data-cat="${p.category}" data-i="${i}">
    <div class="thumb">${thumb(p)}</div>
    <div class="work-body"><span class="meta">${LABEL[p.category]} · ${p.year}</span><h3>${p.title}</h3><p>${p.desc}</p></div>
  </button>`).join("");
$$("#filters button").forEach(b => b.onclick = () => {
  $$("#filters button").forEach(x => x.classList.toggle("on", x === b));
  let n = 0;
  $$(".work").forEach(w => { const ok = b.dataset.f === "all" || w.dataset.cat === b.dataset.f; w.classList.toggle("hide", !ok); n += ok; });
  $("#empty").hidden = n > 0;
});
let lastFocus;
function openModal(i) {
  const p = PROJECTS[i]; lastFocus = document.activeElement;
  $("#mImg").innerHTML = `<div class="thumb" style="height:100%">${thumb(p)}</div>`;
  $("#mMeta").textContent = `${LABEL[p.category]} · ${p.year} · ${p.tech}`;
  $("#mTitle").textContent = p.title; $("#mDesc").textContent = p.desc;
  $("#mCase").innerHTML = [["Masalah", p.problem], ["Solusi", p.solution], ["Proses", p.process], ["Hasil", p.result]]
    .filter(x => x[1]).map(x => `<dt>${x[0]}</dt><dd>${x[1]}</dd>`).join("");
  $("#mLinks").innerHTML =
    (p.repo ? `<a class="btn ghost" href="${p.repo}" target="_blank" rel="noopener">View Project</a>` : "") +
    (p.live ? `<a class="btn primary" href="${p.live}" target="_blank" rel="noopener">Live Preview</a>` : "");
  modal.hidden = false; document.body.style.overflow = "hidden"; $("#mClose").focus();
}
function closeModal() { modal.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); }
grid.addEventListener("click", e => { const w = e.target.closest(".work"); if (w) openModal(+w.dataset.i); });
$("#mClose").onclick = closeModal;
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });
observeAll();

// Kontak: tautan, salin email, validasi
const setLink = (id, href) => { const a = $(id); if (href) a.href = href; else { a.hidden = true; } };
setLink("#waBtn", CONFIG.whatsapp && `https://wa.me/${CONFIG.whatsapp}`);
setLink("#ghBtn", CONFIG.github); setLink("#liBtn", CONFIG.linkedin);
if (CONFIG.email) $("#emailTxt").textContent = CONFIG.email;
$("#copyBtn").onclick = async () => {
  if (!CONFIG.email) return msg("Isi CONFIG.email di script.js terlebih dahulu.", false);
  try { await navigator.clipboard.writeText(CONFIG.email); msg("Email disalin ke clipboard.", true); }
  catch { msg("Gagal menyalin. Salin manual: " + CONFIG.email, false); }
};
const form = $("#form");
function msg(t, ok) { const m = $("#formMsg"); m.textContent = t; m.className = "note" + (ok ? " ok" : ""); }
form.addEventListener("submit", async e => {
  e.preventDefault();
  let valid = true;
  $$("label", form).forEach(l => {
    const f = $("input,textarea", l), v = f.value.trim(); let err = "";
    if (!v) err = "Wajib diisi.";
    else if (f.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) err = "Format email tidak valid.";
    else if (f.name === "message" && v.length < 10) err = "Pesan minimal 10 karakter.";
    $("em", l).textContent = err; l.classList.toggle("bad", !!err); if (err) valid = false;
  });
  if (!valid) return msg("Periksa kolom yang ditandai.", false);
  const d = Object.fromEntries(new FormData(form));
  if (CONFIG.formEndpoint) {
    try {
      const r = await fetch(CONFIG.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) });
      if (!r.ok) throw 0; form.reset(); msg("Pesan terkirim. Terima kasih!", true);
    } catch { msg("Pengiriman gagal. Coba lagi atau hubungi lewat email.", false); }
  } else if (CONFIG.email) {
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(d.message + "\n\n— " + d.name + " (" + d.email + ")")}`;
    msg("Aplikasi email Anda dibuka. Pesan belum terkirim sampai Anda menekan kirim di sana.", true);
  } else msg("Belum ada tujuan pengiriman. Isi CONFIG.email atau CONFIG.formEndpoint di script.js.", false);
});

// Footer, back-to-top, tilt foto
$("#year").textContent = new Date().getFullYear();
$("#topBtn").onclick = () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
const ph = $("#photo");
if (!reduce && matchMedia("(hover:hover)").matches) {
  ph.addEventListener("pointermove", e => { const r = ph.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; ph.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`; });
  ph.addEventListener("pointerleave", () => ph.style.transform = "");
}
