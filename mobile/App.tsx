import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  ScrollView 
} from 'react-native';

export default function App() {
  const [deviceMode, setDeviceMode] = useState<'ACTIVE' | 'BEDTIME' | 'LOCKED'>('ACTIVE');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Örnek mesajlar / babadan gelenler
  const [memories, setMemories] = useState([
    { id: '1', title: 'Babacığından Sesli Mesaj', duration: '0:45', icon: '🎙️' },
    { id: '2', title: 'Uyku Öncesi Masalımız', duration: '3:20', icon: '📖' },
  ]);

  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Kilit veya Uyku Modu Ekranı
  if (deviceMode === 'BEDTIME') {
    return (
      <SafeAreaView style={styles.bedtimeContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.centerContent}>
          <Text style={styles.moonIcon}>🌙</Text>
          <Text style={styles.bedtimeTitle}>Tatlı Rüyalar Prensesim</Text>
          <Text style={styles.bedtimeSubtitle}>
            Şimdi uyku saati... Baban seni çok seviyor. Sabah görüşmek üzere! ✨
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (deviceMode === 'LOCKED') {
    return (
      <SafeAreaView style={styles.lockedContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.centerContent}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={styles.lockedTitle}>Tablet Mola Zamanı</Text>
          <Text style={styles.lockedSubtitle}>
            Baban tableti dinlenmeye aldı. Birazdan tekrar açılacaktır! 💖
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Normal Çocuk Arayüzü (Tablet & Telefon Modu)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Üst Karşılama Barı */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Merhaba Güzel Kızım! 🌸</Text>
          <Text style={styles.statusSubtext}>Baban seninle her zaman bağlantıda</Text>
        </View>
        <TouchableOpacity 
          style={styles.voiceButton}
          onPress={() => alert('Baban için ses kaydediliyor... 🎙️ "Babacım seni çok seviyorum!"')}
        >
          <Text style={styles.voiceButtonText}>Babana Ses Gönder 💌</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody}>
        {/* Babadan Gelen Sesli Notlar */}
        <Text style={styles.sectionTitle}>Babandan Sana Gelenler 💖</Text>
        {memories.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card}
            onPress={() => {
              setIsPlayingAudio(!isPlayingAudio);
              alert(`${item.title} oynatılıyor... 🔊`);
            }}
          >
            <Text style={styles.cardEmoji}>{item.icon}</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDuration}>Süre: {item.duration}</Text>
            </View>
            <Text style={styles.playBadge}>Dinle ▶</Text>
          </TouchableOpacity>
        ))}

        {/* Güvenli Eğitici Videolar & Çizgi Filmler */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Babanın Onayladığı Videolar 📺</Text>
        <View style={styles.videoGrid}>
          <TouchableOpacity 
            style={styles.videoCard}
            onPress={() => alert('Pepee bölümü başlatılıyor... 🎬')}
          >
            <Text style={styles.videoThumb}>🎬</Text>
            <Text style={styles.videoTitle}>Pepee ve Sevgi</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.videoCard}
            onPress={() => alert('Hayvan sesleri şarkısı başlatılıyor... 🎵')}
          >
            <Text style={styles.videoThumb}>🎵</Text>
            <Text style={styles.videoTitle}>Çocuk Şarkıları</Text>
          </TouchableOpacity>
        </View>

        {/* Demo Mod Değiştirici Butonları */}
        <View style={styles.debugBox}>
          <Text style={styles.debugTitle}>Cihaz Modu Testi (Simülasyon):</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <TouchableOpacity onPress={() => setDeviceMode('ACTIVE')} style={styles.miniBtn}>
              <Text style={styles.miniBtnText}>Aktif</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDeviceMode('BEDTIME')} style={styles.miniBtn}>
              <Text style={styles.miniBtnText}>Uyku Modu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDeviceMode('LOCKED')} style={styles.miniBtn}>
              <Text style={styles.miniBtnText}>Kilitli</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FFE4E8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9F1239',
  },
  statusSubtext: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  voiceButton: {
    backgroundColor: '#E11D48',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  voiceButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollBody: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardEmoji: {
    fontSize: 28,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  cardDuration: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  playBadge: {
    backgroundColor: '#FFE4E8',
    color: '#E11D48',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  videoGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  videoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
  },
  videoThumb: {
    fontSize: 36,
    marginBottom: 8,
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  bedtimeContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  moonIcon: {
    fontSize: 72,
    marginBottom: 16,
    textAlign: 'center',
  },
  bedtimeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 10,
  },
  bedtimeSubtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
  },
  lockedContainer: {
    flex: 1,
    backgroundColor: '#E11D48',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  lockIcon: {
    fontSize: 64,
    marginBottom: 16,
    textAlign: 'center',
  },
  lockedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  lockedSubtitle: {
    fontSize: 14,
    color: '#FFE4E8',
    textAlign: 'center',
  },
  centerContent: {
    alignItems: 'center',
    maxWidth: 320,
  },
  debugBox: {
    marginTop: 36,
    padding: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
  },
  debugTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748B',
  },
  miniBtn: {
    backgroundColor: '#CBD5E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  miniBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
  }
});
