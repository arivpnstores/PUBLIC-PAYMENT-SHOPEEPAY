# ShopeePay Dynamic QRIS Generator

Private Payment Gateway untuk membuat QRIS ShopeePay dinamis dan mengecek status pembayaran.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-Private-red)](LICENSE)
[![Security](https://img.shields.io/badge/Security-No%20Secrets-brightgreen)](./.gitignore)

## Repository
**https://github.com/arivpnstores/PUBLIC-PAYMENT-SHOPEEPAY**

## Fitur
- ✅ Create QRIS Dinamis dengan amount custom
- ✅ Auto Check Status Pembayaran  
- ✅ Web UI untuk testing
- ✅ Support PM2 untuk production
- ✅ Konfigurasi terpisah Isi di config.json
- ✅ Cek Pembayaran melalui transaction_sn (Tanpa random Fee)

## Struktur Project
```
PUBLIC-PAYMENT-SHOPEEPAY/
├── server.js              # Main server (Express-like HTTP)
├── index.html             # Web UI testing
├── ecosystem.config.js    # PM2 configuration
├── start.bat              # Windows startup script
├── config.example.json    # Template konfigurasi
├── config.json            # KONFIGURASI ASLI (DI-IGNORE GIT)
├── .gitignore             # Proteksi file sensitif
└── README.md              # Dokumentasi ini
```

## Setup

### 1. Prasyarat
- Node.js 18+ terinstall
- Akun ShopeePay Merchant dengan akses API

### 2. Install & Konfigurasi
```bash
# Clone repository
git clone https://github.com/arivpnstores/PUBLIC-PAYMENT-SHOPEEPAY.git
cd PUBLIC-PAYMENT-SHOPEEPAY

# Copy template konfigurasi
cp config.example.json config.json

# Edit config.json dengan kredensial Anda
notepad config.json    # Windows
# nano config.json     # Linux/Mac
```

### 3. Isi `config.json`
Senif Data ini Menggunakan Aplikasi ProxyPin (HP ROOT ONLY)
Jasa Senif Data Rp5.000, Chat admin saja
```json
{
  "X_TOB_TOKEN": "TOKEN_DARI_SHOPEEPAY",
  "X_STORE_ID": "STORE_ID_ANDA",
  "device_id": "DEVICE_ID_ANDA",
  "device_fingerprint": "FINGERPRINT_ANDA",
  "device_model": "MODEL_HP_ANDA",
  "device_brand": "BRAND_HP_ANDA",
  "sz_blackbox": "BLACKBOX_ANDA"
}
```

> ⚠️ **JANGAN PERNAH commit `config.json`** - File ini sudah di-ignore oleh `.gitignore`

### 4. Jalankan Server
```bash
# Development (Windows)
start.bat

# Development (Linux/Mac)
node server.js

# Production (PM2)
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save && pm2 startup
```

Server berjalan di: **http://localhost:2007**

## Endpoints API

| Endpoint | Method | Parameter | Deskripsi |
|----------|--------|-----------|-----------|
| `/createqris/amount=1000` | GET | `amount` (number) | Generate QRIS amount 1000 |
| `/cekpembayaran/transaction_sn=XXX` | GET | `transaction_sn` (string) | Cek status bayar |
| `/` | GET | - | Web UI testing |

### Contoh Request & Response

**Create QRIS:**
```bash
curl http://localhost:2007/createqris/amount=5000
```

```json
{
  "status": "success",
  "amount": 5000,
  "api_amount": 500000000,
  "transaction_sn": "117324352315795435",
  "qr_content": "00020101021126670016ID.CO.QRIS.WWW011893600916...",
  "qr_image": "iVBORw0KGgoAAAANSUhEUgAA...",
  "expired_minutes": 20,
  "raw": { ... }
}
```

**Cek Pembayaran:**
```bash
curl http://localhost:2007/cekpembayaran/transaction_sn=117324352315795435
```

```json
{
  "status": "success",
  "transaction_sn": "117324352315795435",
  "order_status": 1,
  "paid": true,
  "amount": 500000000,
  "complete_time": 1699999999,
  "transaction_data": { ... }
}
```

## Web UI Testing
Buka browser: **http://localhost:2007/**

Masukkan Transaction SN → Klik "Cek API" → Lihat status pembayaran.

## Deployment Production (VPS/Server)

### Menggunakan PM2 (Rekomendasi)
```bash
# Install PM2 global
npm install -g pm2

# Start aplikasi
pm2 start ecosystem.config.js

# Monitoring
pm2 monit
pm2 logs

# Auto-start on reboot
pm2 startup
pm2 save
```

### Environment Variables (Optional)
Buat file `.env` (sudah di-ignore):
```env
NODE_ENV=production
PORT=2007
```

## Keamanan

✅ **Sudah diimplementasikan:**
- `.gitignore` melindungi `config.json`, `logs/`, `.env`
- Kredensial terpisah di `config.json` (tidak di-track git)
- `config.example.json` sebagai template aman

⚠️ **Perhatian:**
- Jangan share `config.json` ke siapapun
- Regenerate token jika tertembus
- Gunakan HTTPS di production (reverse proxy nginx + SSL)

## Troubleshooting

| Error | Solusi |
|-------|--------|
| `ECONNREFUSED` | Pastikan server running di port 2007 |
| `Invalid token` | Periksa `X_TOB_TOKEN` di `config.json` |
| `Store not found` | Periksa `X_STORE_ID` |
| `Device blocked` | Update `device_id`, `device_fingerprint`, `sz_blackbox` |
| Port 2007 used | Ganti PORT di `ecosystem.config.js` atau env |

## Contributing
Project ini untuk **penggunaan pribadi**. PR tidak diterima.

## Disclaimer
- Kode ini untuk keperluan edukasi & internal
- Gunakan dengan risiko sendiri
- Patuhi TOS ShopeePay / AirPay
- Author tidak bertanggung jawab atas misuse

---

**Author:** [arivpnstores](https://github.com/arivpnstores)  
**Repo:** https://github.com/arivpnstores/PUBLIC-PAYMENT-SHOPEEPAY