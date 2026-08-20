# ShopeePay Dynamic QRIS Generator

Private Payment Gateway untuk membuat QRIS ShopeePay dinamis dan mengecek status pembayaran.

## Fitur
- Create QRIS Dinamis dengan amount custom
- Auto Check Status Pembayaran
- Support Callback Real-time

## Setup

1. **Install dependencies** (Node.js required):
```bash
npm install
```

2. **Konfigurasi kredensial**:
   - Copy `config.example.json` ke `config.json`
   - Isi semua field yang diperlukan:
   ```json
   {
     "X_TOB_TOKEN": "your_token_here",
     "X_STORE_ID": "your_store_id_here",
     "device_id": "your_device_id_here",
     "device_fingerprint": "your_fingerprint_here",
     "device_model": "your_device_model_here",
     "device_brand": "your_device_brand_here",
     "sz_blackbox": "your_blackbox_here"
   }
   ```

3. **Jalankan server**:
```bash
# Windows
start.bat

# Linux/Mac/PM2
pm2 start ecosystem.config.js
# atau
node server.js
```

Server akan berjalan di `http://localhost:2007`

## Endpoints

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/createqris/amount=1000` | GET | Membuat QRIS dengan amount 1000 |
| `/cekpembayaran/transaction_sn=XXX` | GET | Cek status pembayaran |
| `/` | GET | Web UI untuk testing |

## Contoh Response Create QRIS
```json
{
  "status": "success",
  "amount": 1000,
  "api_amount": 100000000,
  "transaction_sn": "117324352315795435",
  "qr_content": "00020101021126670016ID.CO.QRIS.WWW0118936009160000000000000000000000...",
  "qr_image": "iVBORw0KGgoAAAANSUhEUgAA...",
  "expired_minutes": 20
}
```

## Upload ke GitHub (Public)

### Opsi 1: Via GitHub Web (Termudah)
1. Buka [github.com/new](https://github.com/new)
2. Buat repository baru (Public)
3. **JANGAN** centang "Add README", "Add .gitignore", "Choose license"
4. Klik "Create repository"
5. Ikuti instruksi "push an existing repository from the command line"

### Opsi 2: Via Command Line
```bash
# 1. Inisialisasi git (jika belum)
git init

# 2. Add semua file
git add .

# 3. Commit pertama
git commit -m "Initial commit: ShopeePay Dynamic QRIS Generator"

# 4. Buat repo di GitHub dulu (via web), lalu:
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### Opsi 3: GitHub CLI (gh)
```bash
gh repo create PUBLIC-PAYMENT-SHOPEEPAY --public --source=. --remote=origin --push
```

## ⚠️ Keamanan Penting

**FILE YANG TIDAK BOLEH DIUPLOAD KE GITHUB:**
- `config.json` - Berisi kredensial asli (sudah di-ignore via .gitignore)
- File log di folder `logs/`
- File `.env` jika ada

**FILE YANG AMAN DIUPLOAD:**
- `config.example.json` - Template tanpa kredensial asli
- `server.js` - Kode utama (sudah menggunakan config.json)
- `index.html` - Web UI
- `ecosystem.config.js` - Konfigurasi PM2
- `start.bat` - Script startup Windows
- `README.md` - Dokumentasi
- `.gitignore` - Proteksi file sensitif

## Verifikasi Sebelum Push

```bash
# Cek file yang akan di-commit
git status

# Pastikan config.json TIDAK ada di daftar
# Jika ada, jalankan:
git rm --cached config.json
```

## Lisensi
Private use only. Jangan bagikan kredensial ShopeePay Anda.