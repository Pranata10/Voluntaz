# Voluntaz Digital — Full Website Code

## Struktur folder
- `index.html` — homepage dan galeri utama.
- `style.css` — semua styling/responsive layout.
- `script.js` — menu mobile, filter kategori, preview modal, animasi reveal, dan form konsultasi.
- `invitations/` — tempat meletakkan folder undangan digital yang sebenarnya.

## Cara menjalankan di VS Code
1. Ekstrak ZIP ini.
2. Buka folder `voluntaz-digital-full-code` di VS Code.
3. Jalankan `index.html` dengan ekstensi Live Server (disarankan), atau gunakan server lokal.
4. Buka bagian Koleksi dan tes filter serta tombol preview.

## Cara memasukkan website undangan milik Anda
Untuk setiap proyek undangan:
1. Salin seluruh folder proyek (HTML, CSS, JS, gambar, musik, video, font, dan aset lain) ke dalam folder `invitations/`.
2. Pastikan file utama undangan bernama `index.html`.
3. Ubah `href` pada tautan `.open-invitation` dan `data-invitation` pada tombol preview agar sesuai dengan path folder tersebut.
   Contoh: `invitations/nama-folder-anda/index.html`
4. Ubah nama, kategori, dan teks desain pada kartu galeri.
5. Jika Anda punya 1–5 undangan, duplikasi satu elemen `<article class="design-card ...">` untuk tiap undangan. Pastikan `data-type` sama persis dengan nama kategori filter.

## Catatan penting
- Kartu saat ini berisi contoh untuk tiga kategori. Folder demo di ZIP hanya berisi halaman placeholder, bukan desain undangan asli Anda.
- File undangan asli Anda belum disertakan, jadi gantikan folder demo dengan proyek undangan yang sebenarnya.
- Form konsultasi memakai `mailto`. Di `script.js`, ganti `BUSINESS_EMAIL` dengan email bisnis Anda. Form tidak akan mengirim otomatis ke server.
- Saat website diunggah ke hosting, unggah seluruh folder dengan struktur yang sama agar path relatif tetap berfungsi.
