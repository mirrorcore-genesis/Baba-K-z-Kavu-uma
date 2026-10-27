# Baba-Kız Kavuşum Ekosistemi 👨‍👧💖

Baba ile kız arasındaki sevgi bağını güçlendiren, anı paylaşımı ve güvenli çocuk cihaz yönetim ekosistemi.

---

## 🌟 Proje Mimarisi

- **`backend/` (Fastify & WebSocket):** 
  - Gerçek zamanlı WebSocket desteği (Cihaz kilit sinyali, pil seviyesi, kalp atışı `heartbeat`).
  - S3 / MinIO uyumlu presigned URL ile güvenli sesli not ve fotoğraf yükleme.
  - PostgreSQL & Drizzle ORM veri tabanı mimarisi.
- **`web/` (Next.js 14 & Tailwind CSS):** 
  - Babanın anlık olarak çocuğun cihazını izlediği, tek tuşla Uyku Modu veya Ekran Kilidi uygulayabildiği kontrol paneli.
  - Yapay Zeka Destekli Uyku Masalı üretici.
  - Sesli not, fotoğraf ve güvenli YouTube video onay listesi yönetimi.
- **`mobile/` (React Native / Expo):** 
  - Çocuğun tablet veya telefonunda çalışan, sevimli, kocaman butonlu ve çocuk dostu arayüz.
  - Gece uyku modunda otomatik açılan yıldızlı masal/dinlenme ekranı.
  - Acil kilit durumunda ekranı koruma altına alan mola ekranı.

---

## 🚀 Coolify Dağıtım Kılavuzu

Depoyu Coolify üzerinde iki servis olarak ayağa kaldırabilirsiniz:

### 1. Backend Servisi
- **Base Directory:** `/backend`
- **Build Pack:** `Dockerfile`
- **Port:** `4000`
- **Ortam Değişkenleri:**
  - `DATABASE_URL`: PostgreSQL bağlantı dizesi
  - `S3_ENDPOINT`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_BUCKET`

### 2. Web Paneli (Ebeveyn Dashboard)
- **Base Directory:** `/web`
- **Build Pack:** `Dockerfile`
- **Port:** `3000`
- **Ortam Değişkenleri:**
  - `NEXT_PUBLIC_API_URL`: Backend alan adınız (Örn: `https://api.senindomainin.com`)
  - `NEXT_PUBLIC_WS_URL`: WebSocket adresi (Örn: `wss://api.senindomainin.com/ws`)
