# Kopi Senja — Website Profil UMKM

Website statis (HTML, CSS, JavaScript murni — tanpa framework, tanpa build tool) untuk profil UMKM **Kopi Senja**, sebuah kedai kopi rumahan.

## Struktur Halaman
- **Beranda** — hero, tagline, dan statistik singkat usaha
- **Profil** — cerita usaha, nilai-nilai, dan fakta singkat
- **Menu & Katalog (Informasi Utama)** — katalog produk dengan filter kategori dan indikator tingkat sangrai
- **Kontak** — alamat, jam buka, WhatsApp, email, peta lokasi (OpenStreetMap, gratis tanpa API key), dan form pesan cepat

## Struktur Berkas
```
kopi-senja/
├── index.html
├── style.css
├── script.js
└── README.md
```
Semua berkas berdiri sendiri (statis) — bisa langsung dibuka di browser atau di-hosting di layanan gratis mana pun, termasuk GitHub Pages.

---

## Panduan Deploy ke GitHub Pages (Gratis, Tanpa Domain Berbayar)

### 1. Buat Repository di GitHub
1. Masuk ke [github.com](https://github.com) dan login (buat akun gratis jika belum punya).
2. Klik tombol **New** (atau `+` → **New repository**).
3. Isi nama repository, misalnya `kopi-senja-website`.
4. Pilih **Public**.
5. Klik **Create repository** (tidak perlu centang "Add README" jika akan upload dari komputer).

### 2. Unggah Source Code
**Cara mudah (lewat browser, tanpa command line):**
1. Di halaman repository yang baru dibuat, klik **uploading an existing file**.
2. Seret (drag-and-drop) ketiga berkas: `index.html`, `style.css`, `script.js`.
3. Tulis pesan commit, misalnya `Initial commit: website Kopi Senja`.
4. Klik **Commit changes**.

**Cara dengan Git (command line):**
```bash
git init
git add index.html style.css script.js README.md
git commit -m "Initial commit: website Kopi Senja"
git branch -M main
git remote add origin https://github.com/USERNAME/kopi-senja-website.git
git push -u origin main
```
Ganti `USERNAME` dengan username GitHub kalian.

### 3. Aktifkan GitHub Pages
1. Di halaman repository, buka tab **Settings**.
2. Di sidebar kiri, klik **Pages**.
3. Pada bagian **Build and deployment → Source**, pilih **Deploy from a branch**.
4. Pada **Branch**, pilih `main` dan folder `/ (root)`, lalu klik **Save**.
5. Tunggu 1–2 menit. GitHub akan menampilkan URL publik dengan format:
   ```
   https://USERNAME.github.io/kopi-senja-website/
   ```
6. Buka URL tersebut untuk memastikan website sudah tampil.

### 4. Melakukan Pembaruan Website
Contoh pembaruan sederhana yang bisa dilakukan dan dibuktikan:
1. Edit salah satu berkas, misalnya ubah jam operasional di `index.html` atau tambah satu menu baru di bagian katalog.
2. Jika lewat browser: buka berkas di GitHub → klik ikon pensil (Edit) → ubah teks → **Commit changes**.
   Jika lewat Git: edit di komputer, lalu:
   ```bash
   git add .
   git commit -m "Update: menambahkan menu baru"
   git push
   ```
3. Tunggu 30–60 detik, lalu buka kembali URL publik dan refresh (Ctrl+Shift+R / Cmd+Shift+R untuk memastikan bukan cache lama).
4. Ambil tangkapan layar (screenshot) **sebelum** dan **sesudah** perubahan sebagai bukti untuk laporan.

### 5. Yang Perlu Dikumpulkan
- **URL Website**: `https://USERNAME.github.io/kopi-senja-website/`
- **URL Repository**: `https://github.com/USERNAME/kopi-senja-website`
- **Laporan Proyek** (lihat berkas `Laporan-Proyek-Kopi-Senja.docx`, lengkapi bagian bukti tangkapan layar dan URL sebelum dikumpulkan)

---

## Catatan Biaya
Seluruh proses ini 100% gratis:
- Akun GitHub: gratis
- Repository publik: gratis
- GitHub Pages hosting: gratis, tanpa perlu kartu kredit
- Domain: tidak wajib — GitHub Pages sudah menyediakan subdomain `github.io` secara gratis
