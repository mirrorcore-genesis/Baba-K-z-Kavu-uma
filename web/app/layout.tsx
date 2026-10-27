import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Baba-Kız Kavuşum | Ebeveyn Yönetim Paneli',
  description: 'Baba ile kız arasındaki sevgi bağı, güvenli cihaz ve anı yönetim ekosistemi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
