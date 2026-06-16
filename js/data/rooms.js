/* =====================================================================
 * data/rooms.js  –  koordinat, asset, dan konten naratif semua room
 * World size 1330×1165 untuk setiap room.
 * ===================================================================== */

/* ---- ASSET PATHS ---- */
const ASSETS = {
  bg: {
    office: "Asset/bg/office.png",
    lab: "Asset/bg/laboratory.png",
    library: "Asset/bg/library.png",
    archive: "Asset/bg/underground.png",
    abandoned: "Asset/bg/abadoned.png",
    server: "Asset/bg/server room.png",
  },
  player: {
    down: ["Asset/Sprit/Main - Front 1.png", "Asset/Sprit/Main - Front 2.png"],
    up: ["Asset/Sprit/Main - Back 1.png", "Asset/Sprit/Main - Back 2.png"],
    left: ["Asset/Sprit/Main - left 1.png", "Asset/Sprit/Main - left 2.png"],
    right: ["Asset/Sprit/Main - right 1.png", "Asset/Sprit/Main - right 2.png"],
  },
};

/* ---- HELPERS ---- */
function makeExit(id, x, y, w, h, requiredFlag, lockedDialogId) {
  return {
    id,
    rect: { x, y, w, h },
    action: { type: "map", requiredFlag: requiredFlag || null, lockedDialog: lockedDialogId || null },
  };
}

/* =====================================================================
 * ROOMS
 * ===================================================================== */
const ROOMS = {

  /* ------------------------------------------------------------------ */
  office: {
    id: "office",
    name: "Professor's Office",
    size: { width: 1330, height: 1165 },
    background: ASSETS.bg.office,
    playerStart: { x: 667, y: 1000 },

    walkablePolygon: [
      [978, 418], [1121, 418], [1121, 582], [1008, 582], [1008, 814],
      [1145, 814], [1145, 934], [876, 934], [876, 1037], [759, 1037],
      [759, 1039], [761, 1039], [761, 1118], [573, 1118], [573, 1037],
      [504, 1037], [504, 934], [386, 934], [386, 912], [213, 912],
      [213, 444], [381, 444], [381, 426], [884, 426], [884, 368],
      [978, 368], [978, 418],
    ],
    // Desk + centre furniture area — not walkable (SVG inner hole from Figma)
    walkableHoles: [
      [[396, 465], [396, 814], [862, 814], [862, 465]],
    ],
    walkableAreas: [],

    objects: [
      {
        // Figma: left=606 top=577 w=59 h=59 → center (635, 607)
        id: "coffeeMug",
        name: "Coffee Mug",
        x: 1132, y: 632, radius: 150,
        sprite: "Asset/interact obj/Coffe mug.png",
        spriteWidth: 59, spriteHeight: 59,
        action: { type: "dialog", dialogId: "coffeeMug" },
      },
      {
        // Figma: left=615 top=254 w=78 h=78 → center (654, 293)
        id: "photoFrame",
        name: "Photo Frame",
        x: 654, y: 263, radius: 200,
        sprite: "Asset/interact obj/Photo frame.png",
        spriteWidth: 78, spriteHeight: 78,
        action: { type: "dialog", dialogId: "photoFrame" },
      },
      {
        // Figma: left=1208 top=664 w=77 h=77 rot=89° → center ≈ (1170, 703)
        id: "notebook",
        name: "Notebook",
        x: 196, y: 971, radius: 200, rot: 90,
        sprite: "Asset/interact obj/Notebook.png",
        spriteWidth: 77, spriteHeight: 77,
        action: { type: "dialog", dialogId: "notebook" },
      },
      {
        // Figma: left=250 top=187 w=262 h=262 → center (381, 318)
        id: "bookshelf",
        name: "Bookshelf",
        x: 348, y: 253, radius: 200,
        sprite: "Asset/interact obj/Bookshelf.png",
        spriteWidth: 282, spriteHeight: 282,
        action: { type: "dialog", dialogId: "bookshelf" },
      },
      {
        // Figma: left=509 top=426 w=170 h=170 → center (594, 511)
        id: "laptop",
        name: "Laptop",
        x: 516, y: 550, radius: 200,
        sprite: "Asset/interact obj/Laptop.png",
        spriteWidth: 170, spriteHeight: 170,
        action: { type: "puzzle", puzzleId: "laptopCaesar" },
      },
    ],

    exits: [
      makeExit("toMap", 573, 1039, 188, 79, "laptopSolved", "exitLocked"),
    ],
  },

  /* ------------------------------------------------------------------ */
  lab: {
    id: "lab",
    name: "Research Laboratory",
    size: { width: 1330, height: 1165 },
    background: ASSETS.bg.lab,
    playerStart: { x: 390, y: 460 },

    walkablePolygon: [
      [447,437],[814,437],[814,430],[924,430],[924,642],[869,642],
      [869,795],[806,795],[806,1000],[728,1000],[728,733],[803,733],
      [803,634],[814,634],[814,490],[447,490],[447,769],[333,769],
      [333,358],[447,358],[447,437],
    ],
    walkableHoles: [],
    walkableAreas: [],

    objects: [
      {
        id: "labFlashDrive",
        name: "Flash Drive",
        x: 613, y: 514, radius: 90,
        sprite: "Asset/interact obj/Flash drive.png",
        spriteWidth: 35, spriteHeight: 35,
        action: { type: "dialog", dialogId: "labFlashDrive" },
      },
      {
        id: "labComputer",
        name: "Desktop Computer",
        x: 781, y: 296, radius: 120,
        sprite: "Asset/interact obj/Desktop computer.png",
        spriteWidth: 160, spriteHeight: 160,
        action: { type: "puzzle", puzzleId: "morseLab" },
      },
      {
        id: "labWhiteboard",
        name: "Whiteboard",
        x: 1015, y: 313, radius: 300,
        sprite: "Asset/interact obj/Whiteboard.png",
        spriteWidth: 240, spriteHeight: 240,
        action: { type: "dialog", dialogId: "labWhiteboard" },
      },
    ],

    exits: [
      makeExit("toMap", 333, 358, 114, 60, null, null),
    ],
  },

  /* ------------------------------------------------------------------ */
  library: {
    id: "library",
    name: "University Library",
    size: { width: 1330, height: 1165 },
    background: ASSETS.bg.library,
    playerStart: { x: 640, y: 900 },

    walkablePolygon: [
      [956,467],[1037,467],[1037,758],[806,758],[806,928],[700,928],
      [700,1008],[701,1008],[701,1083],[594,1083],[594,843],[415,843],
      [415,710],[306,710],[306,467],[501,467],[501,773],[609,773],
      [609,795],[684,795],[684,785],[753,785],[753,734],[782,734],
      [782,681],[830,681],[830,467],[583,467],[583,424],[956,424],
      [956,467],
    ],
    walkableHoles: [],
    walkableAreas: [],

    objects: [
      {
        id: "libBookshelf",
        name: "Bookshelf",
        x: 685, y: 264, radius: 140,
        sprite: "Asset/interact obj/Bookshelf.png",
        spriteWidth: 280, spriteHeight: 280,
        action: { type: "dialog", dialogId: "libBookshelf" },
      },
      {
        id: "libJournal",
        name: "Research Journal",
        x: 361, y: 798, radius: 90,
        sprite: "Asset/interact obj/Research journal.png",
        spriteWidth: 75, spriteHeight: 75,
        action: { type: "dialog", dialogId: "libJournal" },
      },
      {
        id: "libDocument",
        name: "Research Document",
        x: 1102, y: 557, radius: 100,
        sprite: "Asset/interact obj/Research document.png",
        spriteWidth: 80, spriteHeight: 80,
        action: { type: "puzzle", puzzleId: "binaryLibrary" },
      },
    ],

    exits: [
      makeExit("toMap", 594, 1008, 107, 75, null, null),
    ],
  },

  /* ------------------------------------------------------------------ */
  archive: {
    id: "archive",
    name: "Underground Archive",
    size: { width: 1330, height: 1165 },
    background: ASSETS.bg.archive,
    playerStart: { x: 660, y: 950 },

    walkablePolygon: [
      [718,388],[864,388],[864,390],[944,390],[944,645],[1048,645],
      [1048,656],[1165,656],[1165,774],[1048,774],[1048,813],[979,813],
      [979,882],[749,882],[749,986],[718,986],[718,1055],[614,1055],
      [614,986],[540,986],[540,838],[356,838],[356,411],[357,411],
      [357,377],[641,377],[641,341],[718,341],[718,388],
    ],
    walkableHoles: [
      [[460,419],[460,782],[554,782],[554,802],[641,802],[641,419],[460,419]],
      [[718,802],[739,802],[739,794],[864,794],[864,424],[718,424],[718,802]],
    ],
    walkableAreas: [],

    objects: [
      {
        id: "archiveCabinet",
        name: "Archive Cabinet",
        x: 826, y: 298, radius: 130,
        sprite: "Asset/interact obj/Archieve cabinet.png",
        spriteWidth: 160, spriteHeight: 160,
        action: { type: "puzzle", puzzleId: "vigenereArchive" },
      },
      {
        id: "archiveKeyCard",
        name: "Key Card",
        x: 347, y: 932, radius: 150,
        sprite: "Asset/interact obj/Key card.png",
        spriteWidth: 60, spriteHeight: 60,
        action: { type: "dialog", dialogId: "archiveKeyCard" },
      },
      {
        id: "archiveCamera",
        name: "Security Terminal",
        x: 1191, y: 667, radius: 110,
        sprite: "Asset/interact obj/Camera.png",
        spriteWidth: 120, spriteHeight: 120,
        action: { type: "dialog", dialogId: "archiveCamera" },
      },
    ],

    exits: [
      makeExit("toMap", 614, 982, 104, 73, null, null),
    ],
  },

  /* ------------------------------------------------------------------ */
  abandoned: {
    id: "abandoned",
    name: "Abandoned Research Facility",
    size: { width: 1330, height: 1165 },
    background: ASSETS.bg.abandoned,
    playerStart: { x: 650, y: 880 },

    walkablePolygon: [
      [962,661],[937,661],[937,934],[759,934],[759,950],[593,950],
      [593,934],[388,934],[388,661],[387,661],[387,583],[962,583],
      [962,661],
    ],
    walkableHoles: [
      [[499,661],[499,876],[834,876],[834,661],[499,661]],
    ],
    walkableAreas: [],

    objects: [
      {
        id: "abandonedTerminal",
        name: "Server Terminal",
        x: 868, y: 379, radius: 250,
        sprite: "Asset/interact obj/Server terminal.png",
        spriteWidth: 160, spriteHeight: 160,
        action: { type: "puzzle", puzzleId: "atbashAbandoned" },
      },
      {
        id: "abandonedDoc",
        name: "Research Document",
        x: 1034, y: 585, radius: 90,
        sprite: "Asset/interact obj/Research document.png",
        spriteWidth: 80, spriteHeight: 80,
        action: { type: "dialog", dialogId: "abandonedDoc" },
      },
      {
        id: "abandonedUsb",
        name: "USB Drive",
        x: 683, y: 720, radius: 150,
        sprite: "Asset/interact obj/USB Drive.png",
        spriteWidth: 60, spriteHeight: 60,
        action: { type: "dialog", dialogId: "abandonedUsb" },
      },
    ],

    exits: [
      makeExit("toMap", 593, 908, 166, 42, null, null),
    ],
  },

  /* ------------------------------------------------------------------ */
  server: {
    id: "server",
    name: "Server Facility",
    size: { width: 1330, height: 1165 },
    background: ASSETS.bg.server,
    playerStart: { x: 650, y: 860 },

    walkablePolygon: [
      [995,831],[935,831],[935,914],[762,914],[762,924],[571,924],
      [571,914],[433,914],[433,852],[361,852],[361,429],[363,429],
      [363,414],[995,414],[995,831],
    ],
    walkableHoles: [
      [[440,787],[879,787],[879,471],[440,471],[440,787]],
    ],
    walkableAreas: [],

    objects: [
      {
        id: "serverTerminal",
        name: "Server Terminal",
        x: 667, y: 620, radius: 850,
        sprite: "Asset/interact obj/Blue comp.png",
        spriteWidth: 800, spriteHeight: 800,
        action: { type: "dialog", dialogId: "serverTerminal" },
      },
      {
        id: "serverFile",
        name: "Encrypted Chronos File",
        x: 1020, y: 891, radius: 110,
        sprite: "Asset/interact obj/Encrypted file icon.png",
        spriteWidth: 60, spriteHeight: 60,
        action: { type: "puzzle", puzzleId: "caesarServer" },
      },
    ],

    exits: [
      makeExit("toMap", 571, 885, 191, 39, null, null),
    ],
  },

};

/* =====================================================================
 * DIALOGS
 * ===================================================================== */
const DIALOGS = {

  /* -- Office -- */
  coffeeMug: {
    speaker: "MC",
    lines: [
      "Masih hangat...",
      "Beliau pasti berada di sini beberapa jam lalu.",
      "Tapi kenapa semua barangnya masih tertinggal?",
    ],
    flags: ["mugExamined"],
    inventory: ["coffeeMug"],
  },

  photoFrame: {
    speaker: "MC",
    lines: [
      "Foto tim riset lama.",
      "Profesor Arga, Dr. Bima, dan Dr. Ratna.",
      "Aku tidak pernah melihat foto ini sebelumnya.",
    ],
    flags: ["photoExamined"],
    inventory: ["researchTeamPhoto"],
    keywords: ["ARGA", "BIMA", "RATNA", "RESEARCH TEAM"],
  },

  bookshelf: {
    speaker: "MC",
    lines: [
      "Buku kriptografi klasik. Caesar, Vigenère, Enigma, RSA...",
      "Semua tersusun rapi.",
      "Kecuali satu bagian yang kosong.",
      "Sepertinya ada buku yang sengaja dipindahkan.",
    ],
    flags: ["shelfExamined"],
  },

  notebook: {
    speaker: "MC",
    lines: [
      "Buku catatan Professor Arga.",
      "Beberapa halaman tampak sengaja ditandai.",
      "\"Jika sesuatu terjadi padaku, jangan cari jawabannya dari orang.\"",
      "\"Cari dari pola.\""
    ],
    flags: ["notebookExamined"],
  },

  exitLocked: {
    speaker: "System",
    lines: [
      "Keluar belum bisa.",
      "Selesaikan dulu petunjuk di ruangan ini — buka laptop Profesor Arga.",
    ],
  },

  /* -- Lab (Room 2) -- */
  labFlashDrive: {
    speaker: "MC",
    lines: [
      "Ini dia! Flash drive yang disebut di pesan Profesor Arga.",
      "Ada file terenkripsi di dalamnya.",
      "Kelihatannya menggunakan kode Morse.",
      "Mungkin desktop di sana bisa membantu mendekodenya.",
    ],
    flags: ["flashDriveFound"],
    inventory: ["flashDrive"],
    keywords: ["FLASH DRIVE", "MORSE CODE"],
  },

  labWhiteboard: {
    speaker: "MC",
    lines: [
      "Papan tulis penuh rumus dan diagram.",
      "Di pojok kiri atas tertulis: \"Project Chronos – Phase 3\".",
      "Fase ketiga? Berarti sudah ada fase pertama dan kedua.",
      "Hati-hati... seseorang sepertinya sudah berusaha menghapus sebagian tulisannya.",
    ],
    flags: ["labWhiteboardExamined"],
    keywords: ["PROJECT CHRONOS", "PHASE 3"],
  },

  /* -- Library (Room 3) -- */
  libBookshelf: {
    speaker: "MC",
    lines: [
      "Rak penuh dengan jurnal akademik dan buku referensi.",
      "Ada satu folder tipis berlabel \"CHRONOS – CLASSIFIED\" yang terselip.",
      "Isinya kosong. Seseorang sudah mengambil dokumennya.",
    ],
    flags: ["libShelfExamined"],
    keywords: ["CHRONOS CLASSIFIED"],
  },

  libJournal: {
    speaker: "MC",
    lines: [
      "Jurnal riset lama Profesor Arga. Tahun 2018.",
      "\"Project Chronos adalah eksperimen etika yang melampaui batas...",
      "Kami semua terlibat. Kami semua bersalah.\"",
      "Ada halaman yang dirobek di bagian akhir.",
    ],
    flags: ["libJournalExamined"],
    inventory: ["researchJournal"],
    keywords: ["CHRONOS 2018", "ETIKA"],
  },

  /* -- Archive (Room 4) -- */
  archiveKeyCard: {
    speaker: "MC",
    lines: [
      "Kartu akses lama. Tertulis: \"Dr. R. — Level 4 Clearance\".",
      "Inisial R... Dr. Ratna?",
      "Kenapa kartu ini ada di sini?",
    ],
    flags: ["archiveKeyCardFound"],
    inventory: ["keyCard"],
    keywords: ["DR. R", "LEVEL 4 CLEARANCE"],
  },

  archiveCamera: {
    speaker: "MC",
    lines: [
      "Terminal keamanan lama. Layar masih menyala.",
      "Log akses terakhir: 2023-03-12, pukul 02:17.",
      "Pengguna: RATNA_R.",
      "Saat semua orang tertidur, seseorang mengakses arsip ini...",
    ],
    flags: ["archiveCameraExamined"],
    keywords: ["AKSES ILEGAL", "RATNA_R", "2023-03-12"],
  },

  /* -- Abandoned Facility (Room 5) -- */
  abandonedDoc: {
    speaker: "MC",
    lines: [
      "Dokumen yang sudah tua dan lembab.",
      "Berisi daftar nama peneliti yang \"mengundurkan diri\" secara mendadak.",
      "2018: 2 nama. 2020: 3 nama. 2023: 1 nama.",
      "Semua setelah fase baru Project Chronos dimulai.",
    ],
    flags: ["abandonedDocExamined"],
    keywords: ["PENELITI HILANG", "2018", "2020", "2023"],
  },

  abandonedUsb: {
    speaker: "MC",
    lines: [
      "USB drive kecil tersembunyi di balik panel dinding.",
      "Label di belakangnya: \"Untuk siapa pun yang menemukan ini.\"",
      "Terenkripsi dengan Atbash. Siapapun yang menyembunyikannya... tahu tentang kode.",
    ],
    flags: ["abandonedUsbFound"],
    inventory: ["usbDrive"],
    keywords: ["ATBASH", "PESAN TERSEMBUNYI"],
  },

  /* -- Server Room (Room 6) -- */
  serverTerminal: {
    speaker: "MC",
    lines: [
      "Terminal utama server Chronos.",
      "Dari sini aku bisa mengakses seluruh data proyek.",
      "Tapi aku butuh file laporan akhirnya untuk membongkar semuanya.",
    ],
    flags: ["serverTerminalExamined"],
  },

  /* =====================================================================
   * PRE-PUZZLE DIALOGS
   * ===================================================================== */
  preLaptop: {
    speaker: "Batin",
    lines: [
      "Ini laptop Profesor Arga.",
      "Layar utamanya terkunci. Ada catatan kecil menempel di layar.",
      "Mari kita coba pecahkan passwordnya."
    ]
  },
  preMorse: {
    speaker: "Batin",
    lines: [
      "Sebuah flash drive misterius dicolokkan ke komputer ini.",
      "Terdapat file audio yang terdengar seperti bunyi bip panjang dan pendek.",
      "Ini pasti Kode Morse."
    ]
  },
  preBinary: {
    speaker: "Batin",
    lines: [
      "Dokumen ini penuh dengan angka 0 dan 1 yang disusun sangat rapi.",
      "Ini jelas bukan catatan biasa. Profesor Arga menggunakan kode biner.",
      "Aku harus menerjemahkannya ke teks."
    ]
  },
  preVigenere: {
    speaker: "Batin",
    lines: [
      "Sebuah dokumen arsip rahasia. Teksnya terlihat seperti acakan huruf.",
      "Namun ada referensi tentang 'CHRONOS' di dokumen lain.",
      "Mungkin itu kata kuncinya?"
    ]
  },
  preAtbash: {
    speaker: "Batin",
    lines: [
      "Terminal lama ini masih menyala.",
      "Pesannya sangat aneh... huruf-hurufnya seperti dibalik secara cermin.",
      "Aku harus membalikkan alfabetnya untuk membacanya."
    ]
  },
  preServer: {
    speaker: "Batin",
    lines: [
      "Ini dia. Laporan akhir Project Chronos.",
      "Sistemnya masih terkunci dengan pergeseran sederhana.",
      "Ini langkah terakhir. Aku harus membukanya."
    ]
  },

  lockedLaptop: { speaker: "Batin", lines: ["Terkunci. Mungkin ada buku catatan di sekitar sini yang menyimpan passwordnya."] },
  lockedLab: { speaker: "Batin", lines: ["Komputer terkunci. Butuh flash drive untuk mengakses datanya."] },
  lockedLibrary: { speaker: "Batin", lines: ["Dokumen ini tidak masuk akal. Mungkin jurnal riset lama di rak bisa memberikan petunjuk."] },
  lockedArchive: { speaker: "Batin", lines: ["Kabinet arsip ini butuh kartu akses khusus (Key Card)."] },
  lockedAbandoned: { speaker: "Batin", lines: ["Terminal ini butuh input data eksternal. Mungkin sebuah USB drive tersembunyi di ruangan ini."] },
  lockedServer: { speaker: "Batin", lines: ["File ini dienkripsi secara ekstrim. Aku butuh mengakses terminal utama server dulu untuk menembus firewall-nya."] },

  serverEnding: {
    speaker: "Laporan Akhir",
    lines: [
      "Project Chronos adalah program percobaan manipulasi memori.",
      "Dipimpin oleh Dr. Ratna tanpa sepengetahuan peserta.",
      "Profesor Arga menemukan kebenaran dan berusaha membongkarnya.",
      "Dr. Bima tidak bersalah — ia pun menjadi korban.",
      "Profesor Arga bersembunyi untuk melindungi diri dan bukti.",
      "Dengan file ini, Project Chronos akhirnya bisa dihentikan.",
      "Kamu berhasil mengungkap kebenaran.",
    ],
    flags: ["gameSolved"],
  },
};

/* =====================================================================
 * PUZZLES
 * ===================================================================== */
const PUZZLES = {

  /* -- Room 1: Caesar Shift 3 -- */
  laptopCaesar: {
    title: "Laptop Profesor Arga",
    kind: "Caesar Cipher",
    preDialogId: "preLaptop",
    requiresFlag: "notebookExamined",
    lockedDialog: "lockedLaptop",
    prompt: "Password required.\nHint: Shift = 3\n(Tip: Buka panel 'Cipher' [C] di kanan layar untuk belajar memecahkan sandi Caesar!)",
    cipher: "WKHB IRXQG PH",
    answer: "THEY FOUND ME",
    tutorial: {
      sejarah: "Caesar Cipher dinamakan dari Julius Caesar, yang menggunakannya sekitar tahun 58 SM untuk mengirim pesan rahasia militer kepada para jenderalnya.",
      keunggulan: "Sangat mudah dipahami dan digunakan secara manual tanpa alat bantu. Cocok untuk komunikasi cepat di medan perang kuno.",
      kekurangan: "Sangat mudah dipecahkan (rentan terhadap Brute Force). Hanya ada 25 kemungkinan pergeseran, dan rentan terhadap analisis frekuensi huruf.",
      caraKerja: "Gunakan tombol UP / DOWN untuk menggeser susunan alfabet (Shift). Lihat bagaimana huruf sandi berubah secara real-time sampai membentuk kalimat yang masuk akal."
    },
    success: {
      speaker: "Encrypted Message 01",
      lines: [
        "Jika kau membaca ini, berarti mereka akhirnya menemukanku.",
        "Jangan percaya semua orang di tim riset.",
        "Aku menyembunyikan flash drive di laboratorium.",
        "Mulailah dari sana.",
      ],
    },
    inventory: ["encryptedMsg01"],
    keywords: ["THEY FOUND ME", "FLASH DRIVE"],
    onSolveFlag: "laptopSolved",
  },

  /* -- Room 2: Morse Code -- */
  morseLab: {
    title: "Desktop Computer – Data Flash Drive",
    kind: "Morse Code",
    preDialogId: "preMorse",
    requiresFlag: "flashDriveFound",
    lockedDialog: "lockedLab",
    prompt: "File terenkripsi berhasil dibaca.\nDekodekan pesan Morse berikut.\n(/ = spasi antar kata)",
    cipher: ".-- . / .-- . .-. . / .-- .-. --- -. --.",
    answer: "WE WERE WRONG",
    tutorial: {
      sejarah: "Diciptakan oleh Samuel F.B. Morse dan Alfred Vail pada tahun 1836. Menjadi standar komunikasi telegraf kelistrikan internasional.",
      keunggulan: "Dapat ditransmisikan melalui sinyal suara, cahaya, atau radio. Sangat efektif dalam kondisi darurat dengan teknologi minim.",
      kekurangan: "Bukan merupakan algoritma enkripsi sejati (hanya encoding huruf). Siapa pun yang tahu kodenya bisa langsung membacanya.",
      caraKerja: "Perhatikan pola titik (.) dan garis (-) pada cipher. Tekan tombol simulator sesuai pola untuk menerjemahkan setiap huruf secara berurutan."
    },
    success: {
      speaker: "Flash Drive Message",
      lines: [
        "\"Kami salah. Project Chronos tidak seharusnya pernah ada.\"",
        "\"Kami sudah membahayakan terlalu banyak orang.\"",
        "\"Jika kau membaca ini, cari jurnal di perpustakaan.\"",
        "\"Kebenaran ada di sana.\"",
      ],
    },
    inventory: ["flashDriveData"],
    keywords: ["WE WERE WRONG", "CHRONOS MISTAKE"],
    onSolveFlag: "flashDriveSolved",
  },

  /* -- Room 3: Binary ASCII -- */
  binaryLibrary: {
    title: "Dokumen Riset – Encoded",
    kind: "Binary ASCII",
    preDialogId: "preBinary",
    requiresFlag: "libJournalExamined",
    lockedDialog: "lockedLibrary",
    prompt: "Halaman dalam dokumen berisi kode biner.\nSetiap 8 digit = 1 karakter ASCII.\n(00100000 = spasi)",
    cipher: "01000010 01001001 01001101 01000001 00100000 01001011 01001110 01001111 01010111 01010011",
    answer: "BIMA KNOWS",
    tutorial: {
      sejarah: "Sistem bilangan biner (basis-2) pertama kali dipelajari oleh Gottfried Leibniz pada abad ke-17. Kini menjadi dasar bahasa semua sistem komputer.",
      keunggulan: "Sangat tangguh terhadap noise dalam transmisi elektronik karena hanya memiliki dua state: On (1) atau Off (0).",
      kekurangan: "Pesan menjadi sangat panjang. Satu huruf membutuhkan 8 karakter (bit), sehingga tidak praktis dibaca/ditulis manual oleh manusia.",
      caraKerja: "Setiap 8 digit biner mewakili satu huruf berdasarkan standar ASCII. Gunakan sakelar/switch untuk mencocokkan setiap bit atau langsung tebak hurufnya."
    },
    success: {
      speaker: "Dokumen Terenkripsi",
      lines: [
        "\"Bima tahu tentang semuanya.\"",
        "\"Tapi dia bukan ancaman — dia juga korban.\"",
        "\"Orang yang perlu kamu cari ada di arsip bawah tanah.\"",
        "\"Lihat log akses. Siapa yang masuk tengah malam?\"",
      ],
    },
    inventory: ["binaryDoc"],
    keywords: ["BIMA KNOWS", "ARSIP BAWAH TANAH"],
    onSolveFlag: "binarySolved",
  },

  /* -- Room 4: Vigenère (Key: CHRONOS) -- */
  vigenereArchive: {
    title: "Dokumen Arsip Terenkripsi",
    kind: "Vigenère Cipher",
    preDialogId: "preVigenere",
    requiresFlag: "archiveKeyCardFound",
    lockedDialog: "lockedArchive",
    prompt: "Dokumen personal yang tersimpan di arsip rahasia.\nKey tersembunyi dalam catatan Project Chronos.\nKey: CHRONOS",
    cipher: "THKBN WK IBZZGM",
    answer: "RATNA IS GUILTY",
    tutorial: {
      sejarah: "Sandi ini dijelaskan oleh Giovan Battista Bellaso pada 1553, walau sering dikaitkan dengan Blaise de Vigenère. Sempat dianggap 'le chiffre indéchiffrable' (tak terpecahkan) selama 300 tahun.",
      keunggulan: "Jauh lebih aman dari Caesar karena huruf yang sama dapat dienkripsi menjadi huruf yang berbeda (Polyalphabetic), sehingga kebal terhadap analisis frekuensi sederhana.",
      kekurangan: "Proses enkripsi manual cukup lambat dan rentan kesalahan (typo). Jika panjang kunci diketahui, keamanannya langsung jatuh (metode Kasiski).",
      caraKerja: "Sandi ini membutuhkan KATA KUNCI (Key). Setiap huruf cipher dihitung mundur berdasarkan huruf dari kata kunci pada posisi yang sama. Masukkan kata kunci untuk melihat dekripsi."
    },
    success: {
      speaker: "Arsip Rahasia",
      lines: [
        "\"Dr. Ratna adalah dalang di balik Project Chronos.\"",
        "\"Ia menggunakan data riset untuk kepentingan pribadi.\"",
        "\"Para peneliti yang mengetahui kebenaran... menghilang.\"",
        "\"Server facility adalah tempat terakhir yang harus kamu cek.\"",
      ],
    },
    inventory: ["archiveDoc"],
    keywords: ["RATNA IS GUILTY", "SERVER FACILITY"],
    onSolveFlag: "vigenereSolved",
  },

  /* -- Room 5: Atbash -- */
  atbashAbandoned: {
    title: "Server Terminal Lama",
    kind: "Atbash Cipher",
    preDialogId: "preAtbash",
    requiresFlag: "abandonedUsbFound",
    lockedDialog: "lockedAbandoned",
    prompt: "Terminal menyala dan menampilkan pesan tersembunyi.\nAtbash: A↔Z, B↔Y, C↔X …",
    cipher: "GSV GIZRGLI RH MLG YRNZ",
    answer: "THE TRAITOR IS NOT BIMA",
    tutorial: {
      sejarah: "Salah satu cipher substitusi tertua yang diketahui. Awalnya digunakan untuk mengenkripsi huruf-huruf alfabet Ibrani sekitar 500 SM.",
      keunggulan: "Algoritmanya sangat sederhana (A=Z, B=Y, dst) dan bersifat resiprokal: cara mengenkripsi persis sama dengan cara mendekripsi.",
      kekurangan: "Sama sekali tidak menggunakan kunci (Keyless). Begitu seseorang tahu ini menggunakan Atbash, pesannya bisa langsung dibaca.",
      caraKerja: "Alfabet dilipat menjadi dua (cermin). Klik huruf pada simulator untuk membalikannya dari ujung yang berlawanan (contoh: Z menjadi A)."
    },
    success: {
      speaker: "Pesan Terminal",
      lines: [
        "\"Pengkhianat itu bukan Bima.\"",
        "\"Bima bahkan berusaha menghentikan Chronos dari dalam.\"",
        "\"Pergi ke server facility. Ambil laporan akhir.\"",
        "\"Expose the truth.\"",
      ],
    },
    inventory: ["terminalLog"],
    keywords: ["NOT BIMA", "EXPOSE THE TRUTH"],
    onSolveFlag: "substitutionSolved",
  },

  /* -- Room 6: Caesar Shift 7 -- */
  caesarServer: {
    title: "Mainframe Facility",
    kind: "Caesar Cipher",
    preDialogId: "preServer",
    requiresFlag: "serverTerminalExamined",
    lockedDialog: "lockedServer",
    prompt: "File final terenkripsi dengan Caesar Shift 7.\nIni adalah kunci untuk menghentikan segalanya.",
    cipher: "JOYVUVZ TBZA MHSS",
    answer: "CHRONOS MUST FALL",
    tutorial: {
      sejarah: "Variasi Caesar Cipher digunakan hingga Perang Dunia II dalam alat enkripsi sederhana sebelum dipecahkan secara mekanis.",
      keunggulan: "Implementasi komputer dari Caesar Cipher (seperti ROT13) sering dipakai sekadar menyembunyikan spoiler di internet.",
      kekurangan: "Karena shift-nya tetap, memecahkan satu huruf berarti memecahkan seluruh pesan.",
      caraKerja: "Laporan akhir diamankan dengan shift yang berbeda. Gunakan simulator kontrol UP/DOWN untuk menemukan pergeseran yang tepat."
    },
    success: {
      speaker: "FINAL REPORT",
      lines: [
        "Dekripsi berhasil. File dikirim ke otoritas.",
        "Project Chronos resmi dihentikan.",
        "...",
      ],
    },
    inventory: ["chronosReport"],
    keywords: ["CHRONOS MUST FALL"],
    onSolveFlag: "gameSolved",
  },

};

/* ---- Export ---- */
export { ASSETS, ROOMS, DIALOGS, PUZZLES };
