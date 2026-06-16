/* =====================================================================
 * data/ui.js  –  Quest, Cipher Guide, Board, Notebook, Inventory
 * ===================================================================== */

/* ---- QUEST JOURNAL ---- */
const QUESTS = {
  chapters: [
    {
      id: "office",
      chapterLabel: "Chapter 1",
      title: "Professor's Office",
      intro: "Cari tahu kenapa Profesor Arga menghilang.",
      objectives: [
        { id: "mug",    text: "Periksa coffee mug Profesor Arga",  flag: "mugExamined" },
        { id: "photo",  text: "Lihat foto tim riset",               flag: "photoExamined" },
        { id: "shelf",  text: "Periksa rak buku",                   flag: "shelfExamined" },
        { id: "laptop", text: "Buka laptop Profesor Arga",          flag: "laptopSolved" },
      ],
      unlockedBy: null,
    },
    {
      id: "lab",
      chapterLabel: "Chapter 2",
      title: "Research Laboratory",
      intro: "Flash drive Profesor Arga tersembunyi di sini.",
      objectives: [
        { id: "findFlash",  text: "Temukan flash drive",              flag: "flashDriveFound" },
        { id: "whiteboard", text: "Periksa whiteboard laboratorium",   flag: "labWhiteboardExamined" },
        { id: "morse",      text: "Dekripsi pesan Morse di komputer",  flag: "flashDriveSolved" },
      ],
      unlockedBy: "laptopSolved",
    },
    {
      id: "library",
      chapterLabel: "Chapter 3",
      title: "University Library",
      intro: "Jurnal Profesor Arga menyimpan kebenaran awal Chronos.",
      objectives: [
        { id: "libShelf",   text: "Periksa rak buku perpustakaan",    flag: "libShelfExamined" },
        { id: "libJournal", text: "Temukan jurnal riset 2018",         flag: "libJournalExamined" },
        { id: "binary",     text: "Dekripsi dokumen biner",            flag: "binarySolved" },
      ],
      unlockedBy: "flashDriveSolved",
    },
    {
      id: "archive",
      chapterLabel: "Chapter 4",
      title: "Underground Archive",
      intro: "Arsip rahasia menyimpan identitas pelaku sebenarnya.",
      objectives: [
        { id: "keycard",  text: "Temukan kartu akses",                 flag: "archiveKeyCardFound" },
        { id: "camera",   text: "Periksa log terminal keamanan",       flag: "archiveCameraExamined" },
        { id: "vigenere", text: "Dekripsi dokumen arsip (Vigenère)",   flag: "vigenereSolved" },
      ],
      unlockedBy: "binarySolved",
    },
    {
      id: "abandoned",
      chapterLabel: "Chapter 5",
      title: "Abandoned Research Facility",
      intro: "Fasilitas lama menyimpan peringatan terakhir.",
      objectives: [
        { id: "doc",    text: "Baca dokumen peneliti hilang",          flag: "abandonedDocExamined" },
        { id: "usb",    text: "Temukan USB drive tersembunyi",         flag: "abandonedUsbFound" },
        { id: "atbash", text: "Dekripsi pesan terminal (Atbash)",      flag: "substitutionSolved" },
      ],
      unlockedBy: "vigenereSolved",
    },
    {
      id: "server",
      chapterLabel: "Chapter 6",
      title: "Server Facility",
      intro: "Laporan akhir Project Chronos ada di sini. Selesaikan semuanya.",
      objectives: [
        { id: "terminal", text: "Akses server terminal utama",         flag: "serverTerminalExamined" },
        { id: "final",    text: "Dekripsi laporan akhir Chronos",      flag: "gameSolved" },
      ],
      unlockedBy: "substitutionSolved",
    },
  ],
};

/* ---- CIPHER GUIDE ---- */
const CIPHER_GUIDE = [
  {
    id: "caesar",
    title: "Caesar Cipher",
    icon: "Cc",
    unlockedBy: "laptopSolved",
    short: "Geser huruf sejumlah langkah tertentu.",
    body: [
      { label: "Apa itu Cipher?", text: "Cipher adalah metode untuk menyandikan teks agar pesan rahasia tidak bisa dibaca oleh sembarang orang." },
      { label: "Cara kerja", text: "Setiap huruf digeser N posisi dalam alfabet.\nJika Shift=3 (Maju): A jadi D, B jadi E.\nUntuk memecahkan/dekripsi, geser mundur sejumlah Shift tersebut." },
      { label: "Contoh (Shift = 3)", text: "Cipher: WKHB IRXQG PH\nGeser mundur 3 huruf:\nW -> T, K -> H, H -> E ...\nHasil:  THEY FOUND ME" },
    ],
  },
  {
    id: "morse",
    title: "Morse Code",
    icon: "··−",
    unlockedBy: "flashDriveSolved",
    short: "Titik dan garis mewakili huruf/angka.",
    body: [
      { label: "Sejarah", text: "Diciptakan oleh Samuel Morse, kode ini menggunakan sinyal pendek (titik) dan panjang (garis) untuk mengirim pesan lewat telegraf." },
      { label: "Referensi", text: "A=.-   B=-... C=-.-. D=-..\nE=.    F=..-. G=--.  H=....\nI=..   J=.--- K=-.-  L=.-..\nM=--   N=-.   O=---  P=.--.\nQ=--.- R=.-.  S=...  T=-\nU=..-  V=...- W=.--  X=-..-\nY=-.-- Z=--.." },
      { label: "Contoh", text: "Cipher: .-- . / .-- . .-. .\n(Tanda / berarti spasi kata)\nHasil:  WE WERE" },
    ],
  },
  {
    id: "binary",
    title: "Binary ASCII",
    icon: "01",
    unlockedBy: "binarySolved",
    short: "Angka biner 8-bit mewakili karakter ASCII.",
    body: [
      { label: "Konsep Dasar", text: "Komputer membaca teks sebagai deretan 0 dan 1 (biner). ASCII adalah standar yang memetakan huruf ke angka biner 8-bit." },
      { label: "Cara baca", text: "Setiap blok 8 angka mewakili 1 karakter.\n01000001 = Huruf 'A'\n01000010 = Huruf 'B'\n00100000 = (Spasi)" },
      { label: "Contoh", text: "Cipher: 01000010 01001001 01001101 01000001\nHasil:  B I M A" },
    ],
  },
  {
    id: "vigenere",
    title: "Vigenère Cipher",
    icon: "Vc",
    unlockedBy: "vigenereSolved",
    short: "Substitusi menggunakan kata kunci berulang.",
    body: [
      { label: "Konsep Dasar", text: "Versi lebih kuat dari Caesar. Geserannya tidak tetap, melainkan berubah-ubah tergantung pada 'Kata Kunci' (Key) yang diulang." },
      { label: "Key", text: "CHRONOS" },
      { label: "Cara kerja", text: "Gunakan tabel Vigenère (Tabula Recta). Temukan huruf Cipher, lalu tarik ke huruf Key untuk menemukan huruf asli (Plaintext)." },
      { label: "Contoh", text: "Cipher: CYXO JOK\nKey:    CHRO NOS\nHasil:  ARGA WAS" },
    ],
  },
  {
    id: "atbash",
    title: "Atbash / Substitution",
    icon: "A↔Z",
    unlockedBy: "substitutionSolved",
    short: "Alfabet dibalik secara cermin: A↔Z, B↔Y...",
    body: [
      { label: "Konsep Dasar", text: "Atbash adalah sandi substitusi kuno (berasal dari bahasa Ibrani) di mana huruf pertama ditukar dengan huruf terakhir, huruf kedua dengan huruf kedua dari belakang, dst." },
      { label: "Cara kerja", text: "A↔Z, B↔Y, C↔X, D↔W, E↔V, F↔U, G↔T, H↔S, I↔R, J↔Q, K↔P, L↔O, M↔N\n(Enkripsi = Dekripsi)" },
      { label: "Contoh", text: "Cipher: GSV GIZRGLI RH MLG YRNZ\nHasil:  THE TRAITOR IS NOT BIMA" },
    ],
  },
];

/* ---- INVESTIGATION BOARD ---- */
const BOARD_NODES = [
  { id: "arga",       label: "Prof. Arga",         sub: "Menghilang",           x: 265, y: 55,  color: "#ffd54a", tc: "#0b0b10", unlockedBy: null },
  { id: "chronos",    label: "Project Chronos",     sub: "???",                  x: 265, y: 168, color: "#75ff91", tc: "#0b0b10", unlockedBy: "laptopSolved" },
  { id: "flashdrive", label: "Flash Drive",         sub: "Tersembunyi di lab",   x: 85,  y: 168, color: "#66aaff", tc: "#0b0b10", unlockedBy: "laptopSolved" },
  { id: "ratna",      label: "Dr. Ratna",           sub: "Dalang Chronos",       x: 445, y: 168, color: "#ff6b6b", tc: "#fff",    unlockedBy: "vigenereSolved" },
  { id: "team",       label: "Research Team",       sub: "Arga · Bima · Ratna",  x: 165, y: 285, color: "#ff9966", tc: "#0b0b10", unlockedBy: "flashDriveSolved" },
  { id: "wrongdoing", label: "\"We Were Wrong\"",   sub: "Pesan flash drive",    x: 395, y: 285, color: "#ff6b6b", tc: "#fff",    unlockedBy: "flashDriveSolved" },
  { id: "bima",       label: "Dr. Bima",            sub: "Korban, bukan pelaku", x: 85,  y: 395, color: "#75ff91", tc: "#0b0b10", unlockedBy: "binarySolved" },
  { id: "missing",    label: "Peneliti Hilang",     sub: "2018 · 2020 · 2023",   x: 395, y: 395, color: "#cc88ff", tc: "#0b0b10", unlockedBy: "binarySolved" },
];

const BOARD_CONNECTIONS = [
  { from: "arga",       to: "chronos",    label: "menyelidiki",    unlockedBy: "laptopSolved" },
  { from: "arga",       to: "flashdrive", label: "menyembunyikan", unlockedBy: "laptopSolved" },
  { from: "chronos",    to: "team",       label: "tim inti",       unlockedBy: "flashDriveSolved" },
  { from: "chronos",    to: "wrongdoing", label: "kesalahan",      unlockedBy: "flashDriveSolved" },
  { from: "chronos",    to: "ratna",      label: "dalang",         unlockedBy: "vigenereSolved" },
  { from: "team",       to: "bima",       label: "korban",         unlockedBy: "binarySolved" },
  { from: "chronos",    to: "missing",    label: "menyebabkan",    unlockedBy: "binarySolved" },
];

/* ---- NOTEBOOK: PEOPLE ---- */
const PEOPLE_DATA = [
  {
    id: "arga",
    name: "Professor Arga",
    icon: "Asset/Sprit/prof - front 1.png",
    stages: [
      { flag: null,               status: "Menghilang",            desc: "Ahli kriptografi terkemuka. Menghilang selama 3 hari tanpa kabar apapun." },
      { flag: "laptopSolved",     status: "Meninggalkan petunjuk", desc: "Sengaja meninggalkan pesan tersandi di laptopnya. Ini bukan kepergian biasa — ia bersembunyi." },
      { flag: "vigenereSolved",   status: "Bersembunyi",           desc: "Menemukan kebenaran Project Chronos dan berusaha membongkarnya. Hidupnya terancam." },
    ],
  },
  {
    id: "bima",
    name: "Dr. Bima",
    icon: null,
    stages: [
      { flag: "photoExamined",    status: "Tidak dikenal",  desc: "Terlihat di foto tim riset bersama Profesor Arga dan Dr. Ratna." },
      { flag: "binarySolved",     status: "Dicurigai",      desc: "Namanya muncul dalam dokumen terenkripsi. Namun tampaknya ia tahu sesuatu..." },
      { flag: "substitutionSolved", status: "Korban",       desc: "Bima bukan pengkhianat. Ia juga korban Project Chronos dan berusaha menghentikannya dari dalam." },
    ],
  },
  {
    id: "ratna",
    name: "Dr. Ratna",
    icon: null,
    stages: [
      { flag: "photoExamined",    status: "Tidak dikenal",  desc: "Terlihat di foto tim riset bersama Profesor Arga dan Dr. Bima." },
      { flag: "archiveKeyCardFound", status: "Dicurigai",   desc: "Kartu akses Level 4 atas namanya ditemukan di arsip bawah tanah." },
      { flag: "vigenereSolved",   status: "Tersangka Utama",desc: "Dalang di balik Project Chronos. Menggunakan data riset untuk kepentingan pribadi dan menyingkirkan saksi." },
    ],
  },
];

/* ---- NOTEBOOK: LOCATIONS ---- */
const LOCATIONS_DATA = [
  { id: "office",    name: "Professor's Office",       desc: "Lokasi pertama investigasi. Lampu menyala, kopi masih hangat.",             unlockedBy: null },
  { id: "lab",       name: "Research Laboratory",      desc: "Tempat ditemukan flash drive milik Profesor Arga berisi pesan 'WE WERE WRONG'.", unlockedBy: "laptopSolved" },
  { id: "library",   name: "University Library",       desc: "Jurnal 2018 Profesor Arga tersimpan di sini. Halaman akhir dirobek.",        unlockedBy: "flashDriveSolved" },
  { id: "archive",   name: "Underground Archive",      desc: "Arsip rahasia dengan log akses ilegal atas nama Dr. Ratna pada 2023.",       unlockedBy: "binarySolved" },
  { id: "abandoned", name: "Abandoned Research Facility", desc: "Fasilitas riset lama. Terminal masih menyala dengan pesan terakhir.",     unlockedBy: "vigenereSolved" },
  { id: "server",    name: "Server Facility",          desc: "Server utama Project Chronos. Laporan akhir yang mengungkap segalanya.",     unlockedBy: "substitutionSolved" },
];

/* ---- INVENTORY ITEMS ---- */
const INVENTORY_ITEMS = {
  coffeeMug: {
    id: "coffeeMug",
    name: "Coffee Mug",
    desc: "Masih hangat. Beliau pasti baru saja meninggalkan ruangan ini.",
    icon: "Asset/interact obj/Coffe mug.png",
  },
  researchTeamPhoto: {
    id: "researchTeamPhoto",
    name: "Research Team Photo",
    desc: "Foto bersama: Profesor Arga, Dr. Bima, dan Dr. Ratna.",
    icon: "Asset/interact obj/Photo frame.png",
  },
  encryptedMsg01: {
    id: "encryptedMsg01",
    name: "Encrypted Message 01",
    desc: "\"WKHB IRXQG PH\" — pesan pertama dari laptop Profesor Arga.",
    icon: "Asset/interact obj/Encrypted file icon.png",
  },
  flashDrive: {
    id: "flashDrive",
    name: "Flash Drive",
    desc: "Flash drive yang disembunyikan Profesor Arga di laboratorium. Berisi data terenkripsi Morse.",
    icon: "Asset/interact obj/Encrypted file icon.png",
  },
  flashDriveData: {
    id: "flashDriveData",
    name: "Flash Drive Data",
    desc: "Isi flash drive: \"WE WERE WRONG\" — pengakuan tim riset Project Chronos.",
    icon: "Asset/interact obj/Encrypted file icon.png",
  },
  researchJournal: {
    id: "researchJournal",
    name: "Research Journal 2018",
    desc: "Jurnal Profesor Arga. Mengungkap bahwa Project Chronos melanggar etika riset sejak awal.",
    icon: "Asset/interact obj/Research journal.png",
  },
  binaryDoc: {
    id: "binaryDoc",
    name: "Binary Document",
    desc: "Dokumen terenkripsi biner: \"BIMA KNOWS\" — seseorang meninggalkan petunjuk.",
    icon: "Asset/interact obj/Notebook.png",
  },
  keyCard: {
    id: "keyCard",
    name: "Access Card – Dr. R",
    desc: "Kartu akses Level 4 atas nama Dr. R (Ratna). Ditemukan di arsip bawah tanah.",
    icon: "Asset/interact obj/Encrypted file icon.png",
  },
  archiveDoc: {
    id: "archiveDoc",
    name: "Archive Document",
    desc: "Dokumen arsip rahasia: \"RATNA IS GUILTY\" — terbukti secara tertulis.",
    icon: "Asset/interact obj/Archieve cabinet.png",
  },
  usbDrive: {
    id: "usbDrive",
    name: "Hidden USB Drive",
    desc: "USB tersembunyi di balik panel dinding. Pesan terakhir dari saksi yang hilang.",
    icon: "Asset/interact obj/Encrypted file icon.png",
  },
  terminalLog: {
    id: "terminalLog",
    name: "Terminal Log",
    desc: "Log terminal tua: \"THE TRAITOR IS NOT BIMA\" — Bima adalah korban, bukan pelaku.",
    icon: "Asset/interact obj/Laptop.png",
  },
  chronosReport: {
    id: "chronosReport",
    name: "Chronos Final Report",
    desc: "Laporan akhir Project Chronos. Berisi semua bukti yang diperlukan untuk menghentikannya.",
    icon: "Asset/interact obj/Encrypted file icon.png",
  },
};

export {
  QUESTS, CIPHER_GUIDE,
  BOARD_NODES, BOARD_CONNECTIONS,
  PEOPLE_DATA, LOCATIONS_DATA,
  INVENTORY_ITEMS,
};
