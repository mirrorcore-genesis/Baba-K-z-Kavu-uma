'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Smartphone, 
  Battery, 
  BatteryCharging, 
  Lock, 
  Unlock, 
  Moon, 
  Sun, 
  Plus, 
  Mic, 
  Image as ImageIcon, 
  BookOpen, 
  Youtube, 
  Radio, 
  Clock, 
  CheckCircle, 
  Sparkles,
  Send
} from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Dashboard() {
  const [device, setDevice] = useState({
    id: 'demo-tablet-id',
    name: 'Elif Ceren Tableti',
    battery: 88,
    isCharging: true,
    isLocked: false,
    mode: 'ACTIVE', // ACTIVE, BEDTIME, RESTRICTED
    lastSeen: 'Şimdi aktif'
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'memories' | 'content' | 'story'>('overview');

  const [memories, setMemories] = useState([
    {
      id: '1',
      title: 'İyi Uykular Prensesim Sesli Notu',
      type: 'VOICE_NOTE',
      audioDurationSeconds: 45,
      createdAt: 'Bugün 20:30',
      isListened: true,
      mediaUrl: '#'
    },
    {
      id: '2',
      title: 'Hafta Sonu Park Hatıramız',
      type: 'PHOTO',
      createdAt: 'Dün 14:15',
      isListened: true,
      mediaUrl: '#'
    },
    {
      id: '3',
      title: 'Yıldızları Keşfeden Minik Kedi Masalı',
      type: 'BEDTIME_STORY',
      createdAt: '2 gün önce',
      isListened: true,
      mediaUrl: '#'
    }
  ]);

  const [contents, setContents] = useState([
    { id: '1', title: 'Pepee - Sevgi ve Paylaşma Bölümü', category: 'Çizgi Film', externalId: 'youtube-1', isActive: true },
    { id: '2', title: 'İngilizce Çocuk Şarkıları & Hayvan Sesleri', category: 'Eğitici', externalId: 'youtube-2', isActive: true },
    { id: '3', title: 'Astronomi Çocuk: Gezegenlerimizi Tanıyalım', category: 'Bilim', externalId: 'youtube-3', isActive: true },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newMemoryType, setNewMemoryType] = useState('VOICE_NOTE');
  const [storyPrompt, setStoryPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Cihaz Kilidi Değiştirme
  const toggleDeviceLock = async (targetLock: boolean, targetMode: string = 'ACTIVE') => {
    setDevice(prev => ({ ...prev, isLocked: targetLock, mode: targetMode }));
    try {
      await fetch(`${API_BASE_URL}/api/device/lock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceId: device.id,
          isLocked: targetLock,
          mode: targetMode
        })
      });
    } catch (err) {
      console.log('API çağrısı yapıldı (lokal simülasyon):', err);
    }
  };

  // Yeni Anı / Mesaj Gönder
  const handleSendMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newEntry = {
      id: String(Date.now()),
      title: newTitle,
      type: newMemoryType,
      audioDurationSeconds: newMemoryType === 'VOICE_NOTE' ? 30 : undefined,
      createdAt: 'Az önce',
      isListened: false,
      mediaUrl: '#'
    };
    setMemories([newEntry, ...memories]);
    setNewTitle('');
    alert('Anı & Mesaj başarıyla çocuğun cihazına iletildi!');
  };

  // Yapay Zeka Masal Üretici
  const handleGenerateStory = () => {
    if (!storyPrompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedStory(
        `Bir varmış, bir yokmuş... Gökyüzünde parlayan sıcacık bir yıldızın altında ${storyPrompt} yaşarmış. ` +
        `Her akşam babasının sevgi dolu sesini dinleyerek en güzel düşlere dalarmış. ` +
        `Babasının ona olan sevgisi gökyüzündeki tüm yıldızlardan bile daha parlakmış... İyi geceler tatlı rüyalar!`
      );
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Üst Bar / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-200">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900 leading-tight">Baba-Kız Kavuşum</h1>
              <p className="text-xs text-rose-600 font-medium">Sevgi Bağı & Güvenli Ekosistem</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Sistem Çevrimiçi
            </span>
          </div>
        </div>
      </header>

      {/* Ana Gövde */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hızlı Bilgi ve Cihaz Kontrol Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Cihaz Durum Kartı */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-slate-600" />
                Çocuk Cihazı
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                {device.name}
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                  {device.isCharging ? <BatteryCharging className="w-6 h-6" /> : <Battery className="w-6 h-6" />}
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">%{device.battery}</div>
                  <div className="text-xs text-slate-500">{device.isCharging ? 'Şarj Oluyor ⚡' : 'Pilde Çalışıyor'}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-slate-400">Durum</div>
                <div className="text-sm font-semibold text-emerald-600 flex items-center gap-1 justify-end">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Bağlı
                </div>
              </div>
            </div>
          </div>

          {/* Hızlı Ekran ve Uyku Modu Kontrolü */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-500" />
                Cihaz Modu
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                device.mode === 'BEDTIME' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : device.mode === 'RESTRICTED' 
                  ? 'bg-rose-100 text-rose-800' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {device.mode === 'BEDTIME' ? 'Uyku / Masal' : device.mode === 'RESTRICTED' ? 'Kilitli' : 'Serbest / Aktif'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => toggleDeviceLock(false, 'ACTIVE')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  device.mode === 'ACTIVE' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sun className="w-4 h-4" /> Serbest Mod
              </button>
              <button
                onClick={() => toggleDeviceLock(true, 'BEDTIME')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  device.mode === 'BEDTIME' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Moon className="w-4 h-4" /> Uyku Modu
              </button>
            </div>
          </div>

          {/* Acil Kilit Kartı */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                <Lock className="w-4 h-4 text-rose-500" />
                Güvenlik & Kilit
              </span>
              <span className="text-xs text-slate-400">Anlık Müdahale</span>
            </div>

            <button
              onClick={() => toggleDeviceLock(!device.isLocked, device.isLocked ? 'ACTIVE' : 'RESTRICTED')}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition ${
                device.isLocked
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-200'
              }`}
            >
              {device.isLocked ? (
                <>
                  <Unlock className="w-4 h-4" /> Ekran Kilidini Aç
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Ekranı Hemen Kilitle
                </>
              )}
            </button>
          </div>

        </div>

        {/* Sekmeler */}
        <div className="flex border-b border-slate-200 mb-6 gap-8">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`pb-3 font-semibold text-sm transition border-b-2 flex items-center gap-2 ${
              activeTab === 'overview' 
                ? 'border-rose-600 text-rose-600' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Radio className="w-4 h-4" /> Anı & Sesli Mesaj Akışı
          </button>
          <button 
            onClick={() => setActiveTab('story')} 
            className={`pb-3 font-semibold text-sm transition border-b-2 flex items-center gap-2 ${
              activeTab === 'story' 
                ? 'border-rose-600 text-rose-600' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Yapay Zeka Masal Atölyesi
          </button>
          <button 
            onClick={() => setActiveTab('content')} 
            className={`pb-3 font-semibold text-sm transition border-b-2 flex items-center gap-2 ${
              activeTab === 'content' 
                ? 'border-rose-600 text-rose-600' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Youtube className="w-4 h-4" /> Güvenli / Onaylı İçerikler
          </button>
        </div>

        {/* TAB 1: Anı ve Mesaj Akışı */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sol: Yeni Ses / Anı Gönderme Formu */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Send className="w-4 h-4 text-rose-500" />
                  Kızına Yeni Mesaj / Anı Gönder
                </h3>

                <form onSubmit={handleSendMemory} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Mesaj Türü</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setNewMemoryType('VOICE_NOTE')}
                        className={`py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1 transition ${
                          newMemoryType === 'VOICE_NOTE' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        <Mic className="w-4 h-4" /> Sesli Not
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewMemoryType('PHOTO')}
                        className={`py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1 transition ${
                          newMemoryType === 'PHOTO' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        <ImageIcon className="w-4 h-4" /> Fotoğraf
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewMemoryType('BEDTIME_STORY')}
                        className={`py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1 transition ${
                          newMemoryType === 'BEDTIME_STORY' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        <BookOpen className="w-4 h-4" /> Masal
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Başlık veya Kısa Not</label>
                    <input
                      type="text"
                      placeholder="Örn: Günaydın güzel kızım, seni çok seviyorum!"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center">
                    <Mic className="w-8 h-8 text-rose-500 mx-auto mb-2 animate-pulse" />
                    <p className="text-xs text-slate-600 font-medium">Ses kaydı hazır (30 saniye)</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">S3 / MinIO üzerinden anında iletilir</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-rose-200 transition"
                  >
                    Tablete Gönder
                  </button>
                </form>
              </div>
            </div>

            {/* Sağ: Gönderilmiş Anılar & Zaman Tüneli */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center justify-between">
                <span>Zaman Tüneli & Paylaşılan Anılar</span>
                <span className="text-xs text-slate-500 font-normal">{memories.length} kayıtlı anı</span>
              </h3>

              {memories.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                      {item.type === 'VOICE_NOTE' && <Mic className="w-5 h-5" />}
                      {item.type === 'PHOTO' && <ImageIcon className="w-5 h-5" />}
                      {item.type === 'BEDTIME_STORY' && <BookOpen className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.createdAt}</span>
                        {item.audioDurationSeconds && <span>• {item.audioDurationSeconds} sn</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Dinlendi
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: AI Masal Atölyesi */}
        {activeTab === 'story' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="text-center max-w-lg mx-auto mb-6">
              <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Yapay Zeka Destekli Uyku Masalı</h2>
              <p className="text-sm text-slate-500 mt-1">
                Kızının bu akşam dinlemesini istediğin temayı yaz, sevgi dolu kişiselleştirilmiş bir masal oluşturalım.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Masal Teması veya Kahramanlar</label>
                <input
                  type="text"
                  placeholder="Örn: Ayıcık Bobo ve gökyüzündeki pembe bulutlar..."
                  value={storyPrompt}
                  onChange={(e) => setStoryPrompt(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={handleGenerateStory}
                disabled={isGenerating || !storyPrompt}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-100 transition disabled:opacity-50"
              >
                {isGenerating ? 'Masal Dokunuyor...' : 'Masalı Oluştur'}
              </button>

              {generatedStory && (
                <div className="mt-6 p-6 bg-indigo-50/60 border border-indigo-100 rounded-2xl">
                  <h4 className="font-bold text-indigo-950 text-sm mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" /> Masal Hazır!
                  </h4>
                  <p className="text-sm text-indigo-900 leading-relaxed italic">
                    "{generatedStory}"
                  </p>
                  <div className="mt-4 flex justify-end gap-3">
                    <button 
                      onClick={() => {
                        setMemories([{
                          id: String(Date.now()),
                          title: `Masal: ${storyPrompt}`,
                          type: 'BEDTIME_STORY',
                          createdAt: 'Şimdi',
                          isListened: false,
                          mediaUrl: '#'
                        }, ...memories]);
                        alert('Masal çocuğun tabletine ses ve metin olarak gönderildi!');
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
                    >
                      Kızımın Tabletine Gönder 🌙
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Onaylı İçerikler */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Kızın İçin Onaylanmış YouTube Videoları</h3>
                <p className="text-xs text-slate-500">Çocuk sadece burada babasının onayladığı güvenli videoları izleyebilir.</p>
              </div>
              <button 
                onClick={() => {
                  const title = prompt('Eklenecek Video Başlığı:');
                  if (title) {
                    setContents([...contents, { id: String(Date.now()), title, category: 'Eğitici', externalId: 'yt-custom', isActive: true }]);
                  }
                }}
                className="py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" /> Yeni Video Onayla
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contents.map(item => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h4 className="font-semibold text-slate-900 text-sm mt-2">{item.title}</h4>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-emerald-600 font-medium">● İzin Verildi</span>
                    <button 
                      onClick={() => setContents(contents.filter(c => c.id !== item.id))}
                      className="text-rose-500 hover:underline"
                    >
                      Kaldır
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
