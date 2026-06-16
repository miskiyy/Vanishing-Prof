BISA. Flow kamu udah kuat, tapi biar lebih “game-ready”, aku saranin diubah jadi investigation loop yang jelas:
explore → interact object → dapat clue → solve cipher → notebook update → unlock lokasi berikutnya → suspicion berubah
Dan karena kamu cuma punya:
16 interactable item
2 sprite: MC + Professor Arga
6 room
1 overworld map
UI pack
Maka naratifnya harus dibuat supaya semua asset itu kepakai, tapi nggak perlu nambah item baru.
Ini versi detailnya.
---
THE VANISHING PROFESSOR
Narrative Flow + Implementation Detail
Core Premise
Profesor Arga, dosen kriptografi terkenal, menghilang selama tiga hari tanpa kabar. Polisi tidak menemukan bukti penculikan, tapi kantornya menunjukkan sesuatu yang aneh: lampu masih menyala, kopi masih hangat, laptop terkunci, dan beberapa catatan kriptografi ditinggalkan seolah sengaja disusun untuk seseorang.
Pemain adalah mantan mahasiswa sekaligus asisten riset terakhir Profesor Arga. Karena memahami cara berpikir Arga, pemain menjadi satu-satunya orang yang bisa membaca petunjuk yang ia tinggalkan.
Fokus utama game:
> Setiap cipher bukan sekadar puzzle, tetapi bukti investigasi.
---
Asset yang Dipakai
Sprite
Asset	Fungsi
MC	Karakter utama yang dikontrol pemain
Professor Arga	Dipakai di flashback, video message, dan ending
Karena kamu baru punya 2 sprite, Dr. Bima dan Dr. Ratna sebaiknya tidak muncul sebagai NPC fisik dulu. Mereka cukup muncul lewat:
photo frame
research document
research journal
encrypted file
terminal log
dialogue teks dari MC
Jadi kamu nggak perlu bikin sprite baru.
---
16 Interactable Item dan Pemakaiannya
Item	Lokasi Utama	Fungsi Naratif
Laptop	Professor Office	Puzzle Caesar pertama
Desktop Computer	Research Laboratory	Log riset dan akses data awal
Flash Drive	Research Laboratory	Puzzle Morse
Notebook	UI / Professor Office	Evidence tracker dan clue log
Research Journal	Library	Penjelasan Project Chronos
Photo Frame	Professor Office	Mengenalkan Arga, Bima, Ratna
Server Terminal	Abandoned Facility / Server Room	Puzzle akses sistem
Key Card	Underground Archive	Unlock Server Facility
Bookshelf	Office / Library	Worldbuilding dan hint
Archive Cabinet	Underground Archive	Data personel lama
Research Document	Library / Archive / Facility	Bukti kronologi
Coffee Mug	Professor Office	Bukti Arga baru pergi
Whiteboard	Research Lab	Hint Chronos dan Vigenère key
Security Camera	Underground Archive	Rekaman rusak / clue visual
USB Drive	Abandoned Facility	Backup key untuk final puzzle
Encrypted File Icon	UI / Laptop / Terminal	File terenkripsi untuk puzzle final
Catatan penting: Flash Drive dan USB Drive bisa dibedakan secara fungsi, walaupun secara visual mirip.
Flash Drive = milik Profesor Arga, ditemukan di lab.
USB Drive = backup key dari facility lama, ditemukan menjelang akhir.
---
Struktur Game
PROLOG — Central Campus Plaza
Map yang dipakai: Overworld kampus.
Pemain mulai di plaza utama. Tidak perlu NPC tambahan. Informasi bisa muncul sebagai narasi teks.
Opening Text
> Profesor Arga tidak hadir selama tiga hari.
> Tidak ada email.
> Tidak ada pesan.
> Tidak ada jejak keluar kampus.
> Dan itu bukan sifat beliau.
MC berdiri di area kampus utama.
Objective
Cari Profesor Arga di kantor beliau.
Fungsi Area
Central Campus Plaza menjadi hub utama. Dari sini pemain bisa melihat semua lokasi penting, tapi belum semua bisa diakses.
Awal game hanya membuka:
Professor Office Building
Research Laboratory
University Library
Area terkunci:
Underground Archive
Abandoned Research Facility
Server Facility
---
CHAPTER 1 — Professor Office
Lokasi
Professor Arga’s Office.
Mood
Academic mystery. Hangat, aman, tapi ganjil.
Tujuan Naratif
Membuktikan bahwa Arga tidak sekadar “pergi”, melainkan meninggalkan petunjuk secara sengaja.
Interactable
1. Coffee Mug
Dialog MC:
> Masih hangat...
> Beliau pasti berada di sini beberapa jam lalu.
> Tapi kenapa semua barangnya masih tertinggal?
Notebook Update:
Evidence added:
Warm Coffee Mug
Fungsi: menunjukkan timeline.
---
2. Bookshelf
Dialog MC:
> Buku kriptografi klasik. Caesar, Vigenère, Enigma, RSA...
> Semua tersusun rapi.
> Kecuali satu bagian yang kosong.
Kalau pemain belum menyelesaikan laptop:
> Sepertinya ada buku yang sengaja dipindahkan.
Kalau setelah laptop:
> Bagian kosong itu mungkin bukan kebetulan.
Fungsi: hint bahwa cipher akan jadi bahasa utama Arga.
---
3. Photo Frame
Isi foto:
Professor Arga
Dr. Bima
Dr. Ratna
Dialog MC:
> Foto tim riset lama.
> Profesor Arga, Dr. Bima, dan Dr. Ratna.
> Aku tidak pernah melihat foto ini sebelumnya.
Notebook Update:
Evidence added:
Research Team Photo
Keyword added:
ARGA
BIMA
RATNA
RESEARCH TEAM
Fungsi: memperkenalkan suspect tanpa butuh sprite baru.
---
4. Notebook
Ini bisa jadi tutorial UI.
Dialog MC:
> Buku catatan Professor Arga.
> Beberapa halaman tampak sengaja ditandai.
Isi awal notebook:
> “Jika sesuatu terjadi padaku, jangan cari jawabannya dari orang.
> Cari dari pola.”
Fungsi: membuka Evidence Notebook UI.
---
5. Laptop
Laptop terkunci.
On-screen Prompt:
> Password required.
> Hint: Shift = 3
Puzzle 1 — Caesar Cipher
Cipher:
```text
WKHB IRXQG PH
```
Hint:
```text
Shift = 3
```
Jawaban:
```text
THEY FOUND ME
```
Setelah Solve
Laptop terbuka.
File pertama muncul sebagai Encrypted File Icon di UI.
Isi pesan:
> Jika kau membaca ini, berarti mereka akhirnya menemukanku.
> Jangan percaya semua orang di tim riset.
> Aku menyembunyikan flash drive di laboratorium.
> Mulailah dari sana.
Notebook Update:
Evidence added:
Locked Laptop Accessed
Encrypted Message 01
Keyword added:
THEY FOUND ME
FLASH DRIVE
RESEARCH TEAM
Unlock
Research Laboratory objective aktif.
---
CHAPTER 2 — Research Laboratory
Lokasi
Small university laboratory.
Mood
Masih akademik, tapi mulai terasa janggal.
Tujuan Naratif
Mengenalkan Project Chronos untuk pertama kali.
Interactable
1. Desktop Computer
Dialog MC:
> Komputer lab masih menyala.
> Log terakhir berasal dari akun riset internal.
Isi log:
```text
Recent access:
ARGA_17
BIMA_04
RATNA_02

Restricted folder:
CHRONOS_ARCHIVE
```
MC:
> Chronos?
> Aku belum pernah mendengar nama proyek itu.
Notebook Update:
Keyword added:
CHRONOS
---
2. Whiteboard
Isi visual:
diagram lingkaran
panah
tulisan CHRONOS
simbol-simbol cipher
Dialog MC:
> Ini bukan catatan kuliah.
> Ini skema sistem.
> Dan kata “CHRONOS” ditulis berkali-kali.
Hint tersembunyi untuk later puzzle:
```text
KEY = CHRONOS
```
Tapi belum dipakai sekarang.
Notebook Update:
Evidence added:
Whiteboard Chronos Diagram
Keyword added:
KEY: CHRONOS
---
3. Flash Drive
Ditemukan tersembunyi di belakang storage box / meja lab.
Dialog MC:
> Flash drive kecil.
> Sengaja disembunyikan di tempat yang hanya diketahui orang lab.
Saat dibuka di desktop computer, muncul file audio/text dalam bentuk Morse.
Puzzle 2 — Morse Code
Cipher:
```text
.-- . / .-- . .-. . / .-- .-. --- -. --.
```
Jawaban:
```text
WE WERE WRONG
```
Setelah Solve
Isi pesan:
> Project Chronos tidak pernah dihentikan.
> Kami membuat kesalahan besar.
> Sistem itu bukan lagi alat perlindungan data.
> Jangan percaya universitas.
Notebook Update:
Evidence added:
Flash Drive Message
Morse Decoded
Keyword added:
WE WERE WRONG
PROJECT CHRONOS
UNIVERSITY INVOLVEMENT
Unlock
Library objective aktif.
---
CHAPTER 3 — University Library
Lokasi
Small library room.
Mood
Investigasi lebih serius. Masih hangat, tapi lebih sunyi.
Tujuan Naratif
Mengubah Project Chronos dari “nama misterius” menjadi proyek nyata dengan sejarah kelam.
Interactable
1. Bookshelf
Dialog MC:
> Bagian kriptografi, arsip riset, jurnal keamanan informasi...
> Profesor Arga pasti sering ke sini.
Setelah pemain punya keyword CHRONOS:
> Ada satu jurnal yang tidak masuk katalog umum.
---
2. Research Journal
Jurnal lama tentang keamanan informasi.
Isi awal:
> Project Chronos awalnya dikembangkan sebagai sistem perlindungan arsip digital kampus.
> Tujuannya adalah mendeteksi manipulasi data dan menjaga integritas dokumen.
Tapi beberapa halaman hilang.
Notebook Update:
Evidence added:
Chronos Research Journal
---
3. Research Document
Dokumen tersembunyi di meja archive section.
Isinya locked dengan binary.
Puzzle 3 — Binary ASCII
Cipher:
```text
01000010
01001001
01001101
01000001
```
Jawaban:
```text
BIMA
```
MC:
> BIMA.
> Kenapa nama Dr. Bima dikodekan di dokumen Chronos?
Setelah Solve
Dokumen terbuka:
> 2018 — Peneliti pertama menentang Chronos. Menghilang.
> 2020 — Peneliti kedua meminta audit. Menghilang.
> 2023 — Peneliti ketiga mencoba membocorkan data. Menghilang.
> 2025 — Arga mulai menyelidiki ulang.
MC:
> Semua orang yang mencoba menghentikan proyek ini menghilang.
> Dan sekarang Profesor Arga juga hilang.
Notebook Update:
Evidence added:
Missing Researchers Timeline
Binary Name: BIMA
Keyword added:
BIMA
2018
2020
2023
MISSING RESEARCHERS
Unlock
Underground Archive access clue aktif.
---
CHAPTER 4 — Underground Archive
Lokasi
Underground archive.
Mood
Mulai gelap. Musik berubah. Area terasa tersembunyi dan tidak resmi.
Tujuan Naratif
Membuat pemain curiga kuat pada Dr. Bima, lalu memberi petunjuk bahwa kecurigaan itu belum lengkap.
Interactable
1. Archive Cabinet
Berisi data personel lama.
Dialog MC:
> Arsip personel lama.
> Banyak nama dicoret dari daftar penelitian.
Isi file:
```text
Chronos Core Team:
ARGA
BIMA
RATNA
```
Beberapa data rusak.
---
2. Security Camera
Rekaman rusak.
Dialog MC:
> Kamera keamanan masih menyimpan cache rekaman.
> Tapi sebagian besar frame hilang.
Video log:
```text
03:12 — Arga enters archive.
03:19 — Unknown person enters.
03:21 — Camera interference.
03:24 — Arga leaves alone?
```
MC:
> “Alone?”
> Sistemnya bahkan tidak yakin.
Fungsi: membuat ambiguity. Arga mungkin tidak diculik.
---
3. Key Card
Ditemukan di dalam archive cabinet setelah puzzle.
Dialog MC:
> Kartu akses lama.
> Level aksesnya lebih tinggi dari dosen biasa.
Key Card membuka Abandoned Research Facility atau Server Facility gate, tapi belum cukup untuk final room.
Puzzle 4 — Vigenère Cipher
Input UI: Cryptography interface.
Key:
```text
CHRONOS
```
Cipher bisa dibuat seperti:
```text
CYOA KOD FZVZB
```
Jawaban final yang ingin keluar:
```text
ARGA WAS RIGHT
```
Supaya implementasinya gampang, kamu boleh menampilkan puzzle sebagai:
```text
Encrypted Message:
[ Vigenere Cipher ]

Key found from lab whiteboard:
CHRONOS

Decoded output:
ARGA WAS RIGHT
```
Setelah Solve
Dokumen rahasia terbuka:
> Project Chronos bukan lagi sistem arsip.
> Ia telah menjadi sistem penghapus informasi.
> Data yang dianggap “berbahaya” dapat dihapus dari server, katalog, log, dan arsip publik.
> Sejarah bisa dimodifikasi tanpa meninggalkan bekas.
MC:
> Ini bukan sekadar penelitian.
> Ini alat untuk mengendalikan ingatan digital.
Notebook Update:
Evidence added:
Archive Personnel Data
Broken Security Footage
Arga Was Right
Key Card
Keyword added:
ARGA WAS RIGHT
DATA ERASURE
INFORMATION CONTROL
RATNA
Unlock
Abandoned Research Facility aktif di overworld.
---
CHAPTER 5 — Abandoned Research Facility
Lokasi
Abandoned research building.
Mood
Conspiracy thriller. Gelap, rusak, dan lebih menegangkan.
Tujuan Naratif
Membalik kecurigaan pemain. Bima ternyata bukan pengkhianat utama.
Interactable
1. Server Terminal
Terminal tua masih menyala sebagian.
Dialog MC:
> Terminal lama.
> Sistemnya rusak, tapi beberapa log masih bisa dipulihkan.
Terminal meminta substitution cipher.
---
2. Research Document
Catatan eksperimen Chronos.
Isi sebelum puzzle:
> “Jika sistem tidak bisa membedakan perlindungan dari penghapusan, maka yang kita bangun bukan keamanan.
> Yang kita bangun adalah sensor otomatis.”
MC:
> Ini tulisan Profesor Arga.
---
3. USB Drive
Ditemukan di dekat broken monitor/server tua.
Dialog MC:
> USB drive backup.
> Labelnya sudah pudar, tapi masih bisa terbaca:
> “failsafe”.
Fungsi: item penting untuk final puzzle, tapi bukan item baru karena sudah ada di asset pack.
Puzzle 5 — Substitution Cipher
Pesan terenkripsi:
```text
GSV GIZRGLI RH MLG YRNZ
```
Jawaban:
```text
THE TRAITOR IS NOT BIMA
```
Jenis ini bisa dibuat sebagai Atbash/substitution sederhana supaya pemain masih bisa solve tanpa terlalu berat.
Setelah Solve
Terminal membuka hidden video.
Di sini sprite Professor Arga dipakai.
Video message:
> Jika kau sampai di sini, berarti pesan-pesanku masih utuh.
> Itu berarti Chronos belum sepenuhnya menghapus semuanya.
>
> Aku tidak diculik.
> Aku bersembunyi.
>
> Bima bukan pengkhianat.
> Ia mencoba menghentikan Chronos bersamaku.
> Tapi seseorang dari tim kami menyerahkan akses inti ke pihak universitas.
>
> Cari terminal pusat.
> Gunakan semua kata yang sudah kau kumpulkan.
> Jangan salah memilih.
MC:
> Jadi Profesor masih hidup.
> Dan selama ini aku mencurigai orang yang salah.
Notebook Update:
Evidence added:
Failsafe USB Drive
Arga Hidden Video
Bima Cleared
Keyword added:
THE TRAITOR IS NOT BIMA
FAILSAFE
RATNA SUSPECTED
SERVER FACILITY
Unlock
Server Facility aktif.
---
CHAPTER 6 — Server Facility
Lokasi
Secure server room.
Mood
Late-game cyber mystery. Biru, dingin, high-tech.
Tujuan Naratif
Menggabungkan semua bukti dan cipher menjadi final deduction.
Interactable
1. Server Terminal
Terminal utama.
Muncul:
```text
PROJECT CHRONOS CORE
ACCESS LOCKED
REQUIRES MULTI-LAYER AUTHENTICATION
```
Pemain harus memasukkan kata kunci dari notebook.
Required keywords:
```text
THEY FOUND ME
WE WERE WRONG
BIMA
ARGA WAS RIGHT
THE TRAITOR IS NOT BIMA
CHRONOS
FAILSAFE
```
---
2. Encrypted File Icon
Di UI terminal, file final muncul:
```text
chronos_core.enc
```
Saat dibuka, masuk ke final puzzle.
---
Final Puzzle — Multi Cipher
Final puzzle tidak perlu terlalu ribet secara teknis, tapi harus terasa seperti semua chapter kepakai.
Strukturnya bisa 5 layer:
Layer 1 — Caesar
Prompt:
```text
Use the first warning.
```
Input yang benar:
```text
THEY FOUND ME
```
---
Layer 2 — Morse
Prompt:
```text
Use the message from the flash drive.
```
Input:
```text
WE WERE WRONG
```
---
Layer 3 — Binary
Prompt:
```text
Use the name hidden in binary.
```
Input:
```text
BIMA
```
---
Layer 4 — Vigenère
Prompt:
```text
Use the archive conclusion.
```
Input:
```text
ARGA WAS RIGHT
```
---
Layer 5 — Substitution
Prompt:
```text
Use the corrected suspicion.
```
Input:
```text
THE TRAITOR IS NOT BIMA
```
Setelah semua benar, terminal membuka final evidence.
---
Final Revelation
Isi file:
> Project Chronos telah aktif selama bertahun-tahun.
> Awalnya ia dirancang untuk melindungi arsip digital kampus dari pemalsuan.
> Namun sistem itu dimodifikasi.
>
> Chronos kini dapat menghapus data digital dari server, email, arsip, jurnal, dan log keamanan.
> Bukan hanya menyembunyikan informasi, tetapi menghapus bukti bahwa informasi itu pernah ada.
>
> Bima mencoba menghentikannya.
> Arga mencoba membocorkannya.
> Ratna menyerahkan akses inti kepada pihak universitas.
>
> Karena itu Arga menghilang sebelum Chronos menghapus semua jejaknya.
MC:
> Jadi bukan Bima.
> Ratna yang membuka akses inti.
> Dan universitas melindungi sistemnya.
---
Ending Choice
Terminal memberi tiga pilihan.
Choice 1 — Shut Down Chronos
```text
Run failsafe_shutdown.exe
```
Membutuhkan USB Drive.
Ending Baik
Chronos dimatikan. Data yang belum terhapus berhasil diselamatkan. Arga muncul di ending sebagai sprite, kembali ke kampus secara diam-diam untuk menyerahkan bukti ke publik.
Dialog Arga:
> Kau membaca semua pola dengan benar.
> Aku tahu aku meninggalkan jejak pada orang yang tepat.
---
Choice 2 — Preserve Chronos
```text
Lock system and preserve evidence.
```
Ending Netral
Chronos tidak dihancurkan, tapi aksesnya dikunci. Bukti disimpan. Arga tetap bersembunyi karena sistem masih bisa dipulihkan oleh pihak lain.
MC:
> Kebenaran masih ada.
> Tapi belum aman.
---
Choice 3 — Transfer Chronos
```text
Transfer core to external drive.
```
Ending Buruk
Pemain mencoba menyimpan Chronos sebagai bukti, tapi sistem justru berpindah ke jaringan luar.
Pesan terakhir:
```text
TRANSFER COMPLETE
NEW HOST FOUND
```
MC:
> Tidak...
> Aku baru saja membebaskannya.
---
Detail Progression per Room
Room 1 — Office
Objective:
```text
Cari tahu kenapa Profesor Arga menghilang.
```
Required interactions:
Coffee Mug
Photo Frame
Laptop Puzzle
Unlock:
```text
Research Laboratory
```
---
Room 2 — Laboratory
Objective:
```text
Temukan flash drive yang disembunyikan Profesor Arga.
```
Required interactions:
Desktop Computer
Whiteboard
Flash Drive
Morse Puzzle
Unlock:
```text
University Library
```
---
Room 3 — Library
Objective:
```text
Cari catatan lama tentang Project Chronos.
```
Required interactions:
Bookshelf
Research Journal
Research Document
Binary Puzzle
Unlock:
```text
Underground Archive
```
---
Room 4 — Underground Archive
Objective:
```text
Cari data personel Project Chronos.
```
Required interactions:
Archive Cabinet
Security Camera
Vigenère Puzzle
Key Card
Unlock:
```text
Abandoned Research Facility
```
---
Room 5 — Abandoned Research Facility
Objective:
```text
Pulihkan log lama Project Chronos.
```
Required interactions:
Server Terminal
Research Document
USB Drive
Substitution Puzzle
Arga Video Message
Unlock:
```text
Server Facility
```
---
Room 6 — Server Facility
Objective:
```text
Gunakan semua bukti untuk membuka Chronos Core.
```
Required interactions:
Server Terminal
Encrypted File Icon
Final Multi-Cipher Puzzle
Ending Choice
Unlock:
```text
Ending
```
---
Evidence Notebook Structure
UI notebook kamu bisa dibagi jadi 4 tab.
Tab 1 — Evidence
Warm Coffee Mug
Research Team Photo
Locked Laptop Accessed
Flash Drive Message
Chronos Research Journal
Missing Researchers Timeline
Broken Security Footage
Failsafe USB Drive
Arga Hidden Video
Chronos Core File
Tab 2 — Keywords
ARGA
BIMA
RATNA
CHRONOS
FLASH DRIVE
THEY FOUND ME
WE WERE WRONG
ARGA WAS RIGHT
THE TRAITOR IS NOT BIMA
FAILSAFE
Tab 3 — Cipher Notes
Caesar Cipher = shifting letters
Morse Code = dots and dashes
Binary ASCII = binary to letters
Vigenère = keyword-based cipher
Substitution = replaced alphabet pattern
Tab 4 — Suspect Board
Awal:
```text
BIMA: Unknown
RATNA: Unknown
ARGA: Missing
```
Setelah Library:
```text
BIMA: Suspicious
RATNA: Unknown
ARGA: Possible victim
```
Setelah Abandoned Facility:
```text
BIMA: Cleared
RATNA: Suspicious
ARGA: Alive
```
Setelah Final:
```text
BIMA: Tried to stop Chronos
RATNA: Gave core access
ARGA: Hid to preserve evidence
```
---
Kenapa Flow Ini Lebih Kuat
Yang bikin versi ini lebih solid:
Semua asset kepakai.
Tidak ada item yang cuma pajangan.
Tidak perlu nambah sprite NPC.
Bima dan Ratna tetap penting, tapi hadir lewat dokumen, foto, dan log.
Setiap cipher punya fungsi naratif.
Caesar = pesan panik Arga.
Morse = pengakuan kesalahan tim.
Binary = nama tersangka.
Vigenère = validasi bahwa Arga benar.
Substitution = twist bahwa Bima bukan pengkhianat.
Final puzzle = pembuktian investigasi.
Pemain punya perubahan asumsi.
Awalnya cari Arga.
Lalu curiga universitas.
Lalu curiga Bima.
Lalu sadar Bima dijebak.
Lalu menemukan Ratna dan Chronos Core.
Edukasi kriptografi terasa natural.
Pemain belajar cipher karena butuh membaca bukti, bukan karena disuruh “belajar bab 1”.
---
Versi Flow Singkatnya
```text
PROLOG
MC datang ke kampus karena Profesor Arga menghilang.

ROOM 1 — OFFICE
Bukti: kopi hangat, foto tim, laptop terkunci.
Puzzle: Caesar.
Output: THEY FOUND ME.
Unlock: Laboratory.

ROOM 2 — LABORATORY
Bukti: Chronos di whiteboard, flash drive tersembunyi.
Puzzle: Morse.
Output: WE WERE WRONG.
Unlock: Library.

ROOM 3 — LIBRARY
Bukti: jurnal Chronos dan dokumen peneliti hilang.
Puzzle: Binary.
Output: BIMA.
Unlock: Underground Archive.

ROOM 4 — UNDERGROUND ARCHIVE
Bukti: data personel, rekaman kamera rusak, key card.
Puzzle: Vigenère.
Output: ARGA WAS RIGHT.
Unlock: Abandoned Facility.

ROOM 5 — ABANDONED FACILITY
Bukti: server lama, research notes, USB failsafe.
Puzzle: Substitution.
Output: THE TRAITOR IS NOT BIMA.
Reveal: Arga masih hidup.
Unlock: Server Facility.

ROOM 6 — SERVER FACILITY
Bukti final: Chronos Core.
Puzzle: gabungan semua cipher.
Reveal: Ratna memberi akses Chronos ke universitas.
Ending: Shutdown / Preserve / Transfer.
```
---
Menurutku ini udah bisa jadi kerangka implementasi utama. Yang paling penting: jangan bikin puzzle berdiri sendiri. Setiap puzzle harus menjawab satu pertanyaan investigasi dan membuka pertanyaan baru.