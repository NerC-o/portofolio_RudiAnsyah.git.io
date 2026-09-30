/* ==========================================================
   DATA GALERI — EDIT FILE INI SAJA
   1. Taruh file gambar di folder images/sertifikat/ atau images/kegiatan/
   2. Tambahkan / ubah baris di bawah (salin satu baris, lalu ganti isinya)
   3. Simpan, lalu refresh galeri.html

   Field:
     title    : judul
     category : kategori (dipakai untuk tombol filter)
     year     : tahun / tanggal (tampil kecil di atas judul)
     desc     : keterangan singkat (opsional)
     src      : lokasi file gambar

   Contoh di bawah hanya PLACEHOLDER. Ganti dengan data asli kamu.
   Jika file gambar belum ada, kartu akan tampil sebagai kotak kosong.
   ========================================================== */

const CERTIFICATES = [
  { title: "Sertifikat ITNSA — Tingkat Provinsi", category: "Kompetisi", year: "2024", desc: "Kompetisi IT bidang jaringan.",           src: "images/sertifikat/sertifikat2.jpg" },
  { title: "Sertifikat ITNSA — Tingkat Nasional", category: "Kompetisi", year: "2024", desc: "Kompetisi IT bidang jaringan.",           src: "images/sertifikat/Sertifikat1.jpg" },
  { title: "Sertifikat pengalaman Kerja",      category: "Pelatihan", year: "2024", desc: "Sertifikat Pengalaman Kerja.",    src: "images/sertifikat/Sertifikat3.jpg" },
];

const PHOTOS = [
  { title: "Kegiatan Magang di Telkom Akses",  category: "Magang",    year: "2024", desc: "Suasana kerja selama magang.",          src: "images/kegiatan/p2.jpg" },
  { title: "Lomba ITNSA",                       category: "Kompetisi", year: "2024", desc: "Dokumentasi saat mengikuti kompetisi.", src: "images/kegiatan/p1.jpg" },
  { title: "Instalasi & Troubleshooting CCTV",  category: "Pekerjaan", year: "2025", desc: "Pemasangan kamera dan DVR/NVR.",        src: "images/kegiatan/p4.jpg" },
  { title: "Konfigurasi Jaringan MikroTik",     category: "Pekerjaan", year: "2025", desc: "Setup router dan perangkat jaringan.",  src: "images/kegiatan/p5.jpg" },
  { title: "Project Arduino & IoT",             category: "Project",   year: "2023", desc: "Eksperimen mikrokontroler.",            src: "images/kegiatan/p6.jpg" }
];
