# Portfolio Rudi Ansyah

Website portofolio profesional berbasis HTML, CSS, dan JavaScript.

## File
- index.html : struktur website
- style.css  : desain/responsive
- script.js  : animasi, dark mode, menu mobile, typing effect, scroll progress

## Cara menjalankan
1. Extract folder.
2. Buka `index.html` menggunakan Chrome/Edge.
3. Edit data kontak di `index.html`, terutama:
   - nomor WhatsApp
   - email
   - link GitHub
   - link CV
   - nama perusahaan pada pengalaman IT Support jika ingin dicantumkan.

## Catatan
Foto profil belum dipasang agar template tetap ringan. Bagian avatar "RA" dapat diganti dengan foto sendiri.

## Halaman Galeri (sertifikat & foto kegiatan)
- galeri.html       : halaman galeri
- gallery-data.js   : DAFTAR sertifikat & foto (edit file ini saja)
- gallery.js        : logika filter + pratinjau (lightbox)
- images/sertifikat : taruh gambar sertifikat di sini
- images/kegiatan   : taruh foto kegiatan di sini

Cara menambah:
1. Masukkan gambar (.jpg/.png/.webp) ke folder images/...
2. Buka gallery-data.js, salin satu baris, ganti title, category, year, desc, src.
3. Refresh galeri.html.
