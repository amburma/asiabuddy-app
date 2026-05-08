import * as fs from 'fs';

const filePath = 'src/data/vatRefundGuide.ts';
const content = fs.readFileSync(filePath, 'utf8');

const corruptedStart = '  polish: `# Przewodnik po zwrocie podatku VAT dla podróżnych\n dilakukan di toko yang memasang tanda "VAT Refund for Tourists".*';
const corruptedEnd = 'Serahkan **formulir yang telah distempel** untuk menerima pengembalian dana Anda dalam bentuk **Tunai** atau sebagai kredit ke **Kartu Kredit** Anda.\n\n---\n\n## Tips Penting untuk Wisatawan\n\n*   **Simpan Barang di Tempat yang Mudah Diakses**: *Kemas barang yang Anda beli sedemikian rupa sehingga mudah diambil jika petugas Bea Cukai meminta untuk memeriksanya.*\n*   **Datang Lebih Awal**: *Antrean di bandara untuk pengembalian dana PPN bisa sangat panjang. Disarankan untuk datang setidaknya 3 jam sebelum penerbangan Anda.*\n*   **Biaya Layanan**: *Harap perhatikan bahwa biaya layanan kecil biasanya dipotong dari total jumlah pengembalian dana.*\n\n---\n\n## Daftar Periksa Ringkasan untuk Wisatawan\n\n*   **Langkah 1 [Di Toko]**: *Tunjukkan Pasپور Anda dan minta formulir resmi PPN.*\n*   **Langkah 2 [Bandara - Luar]**: *Dapatkan Stempel Bea Cukai yang wajib sebelum menitipkan bagasi Anda.*\n*   **Langkah 3 [Bandara - Dalam]**: *Kunjungi Loket Pengembalian Dana PPN untuk mengambil uang tunai atau kredit Anda.*\n\n---\n\n*Dengan mengikuti langkah-langkah ini, Anda dapat memulihkan antara **5% hingga 15%** (tergantung pada negara) dari nilai pembelian Anda!*`,';

// Since the corrupted text might be slightly different in whitespace, let's use a simpler match
const startIndex = content.indexOf('  polish: `# Przewodnik po zwrocie podatku VAT dla podróżnych\n dilakukan di toko');
const marker = '*Dengan mengikuti langkah-langkah ini, Anda dapat memulihkan antara **5% hingga 15%** (tergantung pada negara) dari nilai pembelian Anda!*`,';
const endIndex = content.indexOf(marker, startIndex) + marker.length;

const correctPolish = `  polish: \`# Przewodnik po zwrocie podatku VAT dla podróżnych

---

## Co to jest zwrot podatku VAT?

Większość krajów pobiera podatki głównie od swoich obywateli. Ponieważ zagraniczni turyści nie osiedlają się w kraju, są oni uprawnieni do zwrotu **podatku od wartości dodanej (VAT)** zapłaconego od zakupionych towarów.

***Ważna uwaga***: *Nie można ubiegać się o zwrot podatku VAT za wydatki na posiłki, opłaty hotelowe lub opłaty serwisowe. Zwroty dotyczą wyłącznie „towarów fizycznych”, które zostaną wywiezione z kraju.*

---

## Wymagania dotyczące kwalifikowalności

Aby zakwalifikować się do zwrotu podatku VAT, należy spełnić następujące kryteria:

*   **Status obcokrajowca**: *Musisz być niemeldowanym gościem. Nie możesz posiadać wizy rezydenta ani pozwolenia na pracę w tym kraju.*
*   **Minimalny zakup**: *Musisz spełnić wymóg minimalnych wydatków w jednym sklepie w ciągu jednego dnia (np. 2000 bahtów w Tajlandii).*
*   **Autoryzowane sklepy**: *Zakupy muszą być dokonywane w sklepach oznaczonych znakiem „VAT Refund for Tourists”.*

---

## Kroki ubiegania się o zwrot podatku VAT

### Krok 1: W sklepie (podczas zakupu)

Podczas płacenia okaż **Paszport**, aby poprosić o **Formularz zwrotu podatku VAT**.

Sklep przekaże Ci **Formularz wniosku o zwrot podatku VAT** wraz z **fakturą podatkową**.

### Krok 2: Na lotnisku (pred odprawą)

Przed nadaniem bagażu należy udać się do **Biura Inspekcji Celnej (Customs Inspection Office)**.

Okaż urzędnikowi paszport, formularze i zakupione towary, aby uzyskać **pieczątkę celną** na formularzach.

### Krok 3: Wewnątrz lotniska (po kontroli paszportowej)

Po przejściu przez kontrolę paszportową udaj się do **punktu zwrotu podatku VAT (VAT Refund Counter)**.

Złóż opieczętowane formularze, aby otrzymać zwrot w **gotówce** lub na **kartę kredytową**.\`,`;

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.slice(0, startIndex) + correctPolish + content.slice(endIndex);
    fs.writeFileSync(filePath, newContent);
    console.log('Polish entry fixed successfully.');
} else {
    console.log('Could not find corrupted polish entry.');
    console.log('startIndex:', startIndex);
}
