import React, { useState, useEffect } from 'react';
import {
  Shield,
  Sparkles,
  Compass,
  ChevronRight,
  Calendar,
  Clock,
  Award,
  MapPin,
  CheckCircle2,
  Star,
  Phone,
  User,
  CornerDownRight,
  Sliders,
  Layers,
  Mail,
  Check,
  Gem,
  Sun,
  Wind,
  Music
} from 'lucide-react';

// อินเตอร์เฟซข้อมูลอสังหาริมทรัพย์ระดับลักชัวรีพาสเทล
interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  numericPrice: number; // ล้านบาท
  category: 'Penthouse' | 'Mansion' | 'Private Island';
  image: string;
  details: {
    area: string;
    beds: number;
    baths: number;
    perfectionScore: number; 
  };
  highlights: string[];
  specs: {
    privacy: number; 
    aesthetic: number; 
    security: number; 
  };
}

const propertiesData: Property[] = [
  {
    id: 'prop-1',
    title: 'The Rose Quartz Penthouse',
    location: 'Wireless Road Sky Reserve, Bangkok',
    price: '420,000,000 ฿',
    numericPrice: 420,
    category: 'Penthouse',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    details: { area: '1,320 ตร.ม.', beds: 5, baths: 6, perfectionScore: 99.9 },
    highlights: ['สระออนเซ็นกลีบกุหลาบลอยฟ้ารับทัศนียภาพ 360 องศา', 'ลิฟต์แก้วคริสตัลสแกนชีวมิติส่วนตัว', 'ผนังซับเสียงทำจากเส้นใยไหมธรรมชาติ'],
    specs: { privacy: 100, aesthetic: 99, security: 100 }
  },
  {
    id: 'prop-2',
    title: 'Blush Riviera Mansion',
    location: 'Golden Lake Frontline, Eastern Oasis',
    price: '790,000,000 ฿',
    numericPrice: 790,
    category: 'Mansion',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    details: { area: '3,800 ตร.ม.', beds: 7, baths: 9, perfectionScore: 100 },
    highlights: ['ห้องแต่งตัววอล์กอินแบบอาเตลิเยร์สำหรับแบรนด์เนมชั้นสูง', 'ระบบกระจกกรองแสงสีโรสโกลด์ปกป้องรังสี UV 100%', 'สวนกุหลาบอังกฤษสายพันธุ์ราชวงศ์แบบควบคุมอุณหภูมิ'],
    specs: { privacy: 98, aesthetic: 100, security: 100 }
  },
  {
    id: 'prop-3',
    title: 'The Pearl Sanctuary Isle',
    location: 'Phuket Sunset Lagoon Reserve',
    price: '1,580,000,000 ฿',
    numericPrice: 1580,
    category: 'Private Island',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    details: { area: '28 ไร่', beds: 10, baths: 12, perfectionScore: 99.8 },
    highlights: ['ลานจอดเฮลิคอปเตอร์โรสโกลด์คู่ขนานท่ามกลางวิวทะเล', 'หาดส่วนตัวทรายแก้วคริสตัลไม่เหนียวเหนอะหนะ', 'คลับเฮ้าส์กระจกทรงโดมรับพลังดวงอาทิตย์ยามเช้า'],
    specs: { privacy: 100, aesthetic: 98, security: 99 }
  }
];

// ข้อมูลตัวเลือกวัสดุแผงมู๊ดบอร์ด
interface MaterialOption {
  id: string;
  name: string;
  type: 'Marble' | 'Wood' | 'Metal';
  origin: string;
  perfectionBonus: number;
}

const materialOptions: MaterialOption[] = [
  { id: 'mat-1', name: 'Carrara Rose Quartz', type: 'Marble', origin: 'Tuscany, Italy', perfectionBonus: 0.1 },
  { id: 'mat-2', name: 'White Sycamore Satinwood', type: 'Wood', origin: 'Kyoto, Japan', perfectionBonus: 0.2 },
  { id: 'mat-3', name: 'Champagne Polished Brass', type: 'Metal', origin: 'Paris, France', perfectionBonus: 0.1 },
  { id: 'mat-4', name: 'Blush Onyx Translum', type: 'Marble', origin: 'Cappadocia, Turkey', perfectionBonus: 0.3 }
];

export default function App() {
  // สเตตหลัก
  const [selectedProperty, setSelectedProperty] = useState<Property>(propertiesData[0]);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Penthouse' | 'Mansion' | 'Private Island'>('All');
  const [priceRange, setPriceRange] = useState<number>(1600);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // สเตตฟังก์ชันการตกแต่งวัสดุ (Bespoke Moodboard)
  const [activeMaterial, setActiveMaterial] = useState<MaterialOption>(materialOptions[0]);

  // สเตตการปรับแต่งสัมผัสสุนทรียศาสตร์ (Sensory Ambience Settings)
  const [lightLevel, setLightLevel] = useState<number>(75); // % (Warm light)
  const [acousticMode, setAcousticMode] = useState<'Serenade' | 'Ocean Breeze' | 'Silence'>('Serenade');
  const [oxygenLevel, setOxygenLevel] = useState<number>(98); // %

  // แอนิเมชันสแกนเลเซอร์สีชมพูโรสโกลด์
  const [scanProgress, setScanProgress] = useState<number>(0);

  // ระบบจองสิทธิ์ Step-by-Step
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [generatedInvitationId, setGeneratedInvitationId] = useState<string>('');

  // ระบบแจ้งเตือนพาสเทลหวานละมุน
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => (prev >= 100 ? 0 : prev + 0.6));
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const triggerNotification = (message: string) => {
    setActiveNotification(message);
    setTimeout(() => setActiveNotification(null), 3500);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !selectedDate || !selectedTime) {
      triggerNotification('กรุณากรอกข้อมูลส่วนตัวเพื่อออกบัตรรับรองพิเศษ');
      return;
    }
    // สร้างซีเรียลนัมเบอร์เฉพาะบุคคล
    const randomSerial = `VARISARA-${Math.floor(1000 + Math.random() * 9000)}-${selectedProperty.id.split('-')[1].toUpperCase()}`;
    setGeneratedInvitationId(randomSerial);
    setBookingConfirmed(true);
    triggerNotification('รังสรรค์การ์ดเชิญสุดเอ็กซ์คลูซีฟสำเร็จ ยินดีต้อนรับสู่สังคมระดับสูง');
  };

  // คำนวณคะแนนรวมความเพอร์เฟกต์แบบเรียลไทม์ตามสเปกและสัมผัสที่ปรับแต่ง
  const computedPerfectionScore = (
    selectedProperty.details.perfectionScore + 
    activeMaterial.perfectionBonus + 
    (lightLevel > 60 && lightLevel < 85 ? 0.05 : -0.1) +
    (oxygenLevel > 95 ? 0.05 : 0)
  ).toFixed(2);

  const filteredProperties = propertiesData.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchPrice = item.numericPrice <= priceRange;
    const matchText = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchPrice && matchText;
  });

  return (
    <div className="min-h-screen bg-rose-50/30 text-rose-950 font-sans selection:bg-pink-100 selection:text-rose-900 overflow-x-hidden pb-16">
      
      {/* วอลเปเปอร์และแสงออร่าชมพูพาสเทลฟุ้งละมุน (Rosé Velvet Soft Light Ambient) */}
      <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-pink-100/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[900px] left-10 w-[700px] h-[700px] bg-rose-100/40 rounded-full blur-[180px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-[800px] h-[800px] bg-amber-50/40 rounded-full blur-[160px] pointer-events-none" />

      {/* แจ้งเตือนสไตล์พาสเทลหวานพรีเมียม (Blush Velvet Toast) */}
      {activeNotification && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div className="bg-white/95 border border-pink-100 text-rose-900 px-6 py-4 rounded-3xl shadow-[0_15px_40px_rgba(244,63,94,0.06)] flex items-center gap-3 backdrop-blur-xl">
            <Sparkles className="text-pink-400 w-5 h-5 animate-pulse" />
            <div>
              <p className="font-extrabold text-[10px] uppercase tracking-wider text-rose-400">Varisara Atelier Guard</p>
              <p className="text-xs text-rose-850 font-semibold">{activeNotification}</p>
            </div>
          </div>
        </div>
      )}

      {/* แถบนำทางโปร่งแสงขาวแก้วเจียระไน (Prism Rose-Ivory Navbar) */}
      <nav className="sticky top-0 z-40 bg-white/75 backdrop-blur-md border-b border-rose-100/60 px-6 py-4.5 transition-all duration-300 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* โลโก้แบรนด์หวานพรีเมียม */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-300 via-rose-200 to-amber-200 p-[1.5px] shadow-[0_4px_15px_rgba(244,63,94,0.15)]">
              <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-pink-400 group-hover:rotate-45 transition-transform duration-700" />
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">VARISARA</span>
              <span className="block text-[8px] uppercase tracking-[0.3em] text-rose-400/80 font-extrabold">AURA LUXE SALON</span>
            </div>
          </div>

          {/* รายละเอียดแอมเบียนท์ */}
          <div className="hidden lg:flex items-center gap-6 text-[11px] font-extrabold text-rose-400">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-rose-100">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
              <span className="text-rose-700">Aesthetics Approved: โดยคุณวริศรา (CEO)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="text-pink-400 w-4 h-4" />
              <span className="text-rose-700">การรับรองคฤหาสน์ที่ยอดเยี่ยมไร้ที่ติ</span>
            </div>
          </div>

          <a 
            href="#atelier-booking-section"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(244,63,94,0.2)] transition-all duration-300"
          >
            สร้างบัตรเชิญเข้าชมพอร์ท
          </a>
        </div>
      </nav>

      {/* Hero ดีไซน์อสมมาตรแบบหอศิลป์พาสเทล (Asymmetrical Art Gallery Hero) */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* คอลัมน์ซ้าย: แนวคิดความละเมียดละไมของคุณวริศรา */}
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-rose-100 text-rose-500 text-[10px] font-extrabold uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            THE PERFECT BLUSH COUTURE
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
            อาณาจักรแห่ง <br />
            <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
              สุนทรียภาพสีโรสโกลด์
            </span>
          </h1>

          <p className="text-rose-800/80 text-sm md:text-base leading-relaxed max-w-xl font-medium">
            ยินดีต้อนรับสู่อภิมหาคฤหาสน์และเพนต์เฮ้าส์ที่ได้รับการออกแบบอย่างประณีตสูงสุด ตกแต่งและคัดกรองงานก่อสร้างผ่านสายตาเฉียบคมของ <strong className="text-rose-500 font-extrabold">คุณวริศรา เสนีย์พิทักษ์</strong> เพื่อความลงตัวของความสงบ ความงาม และความปลอดภัยสูงสุดของครอบครัวท่าน
          </p>

          {/* ปรัชญาบอร์ดส่วนตัวพร้อมลวดลายนิตยสารระดับพรีเมียม */}
          <div className="p-6 bg-white rounded-3xl border border-rose-100 shadow-[0_15px_40px_rgba(244,63,94,0.02)] space-y-3.5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-rose-300 to-pink-100" />
            <p className="italic text-rose-900/80 text-xs md:text-sm leading-relaxed font-semibold">
              "ความสมบูรณ์แบบไม่ใช่ออปชันเสริมที่เลือกได้ภายหลัง แต่คือเสาหลักเดียวในการออกแบบคฤหาสน์ของฉัน ทุกรอยต่อของหินอ่อนและทิศทางลมธรรมชาติคือความจริงแท้ของชีวิตที่ต้องผ่านการขัดเกลาสูงสุด"
            </p>
            <div className="flex justify-between items-center pt-1.5 border-t border-rose-50">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">CEO & DESIGN CURATOR</span>
              <span className="font-serif text-sm italic text-rose-300 select-none">Varisara เสนีย์พิทักษ์</span>
            </div>
          </div>
        </div>

        {/* คอลัมน์ขวา: พอร์ตโฟลิโอแผงแก้วสะท้อน (The Rosé Pearl Canvas) */}
        <div className="lg:col-span-6 relative flex justify-center">
          <div className="relative group w-full max-w-[420px]">
            {/* แสงสีชมพูประจักษ์ลอยด้านหลังรูป */}
            <div className="absolute -inset-4 bg-gradient-to-r from-rose-200 to-pink-100 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-80 transition duration-700" />

            <div className="relative bg-white border border-rose-100 p-4 rounded-[2.5rem] shadow-xl">
              
              {/* ภาพคุณวริศราสไตล์พาสเทลอ่อนนุ่ม */}
              <div className="relative h-[380px] rounded-[1.8rem] overflow-hidden bg-rose-50">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" 
                  alt="คุณวริศรา ตัวแทนระดับลักชัวรี" 
                  className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-105 transition-transform duration-700 group-hover:scale-105"
                />

                {/* แสงเลเซอร์สแกนความประณีตสีโรสโกลด์ */}
                <div 
                  className="absolute left-0 w-full h-[2px] bg-rose-300 shadow-[0_0_15px_rgba(244,63,94,1)] z-20"
                  style={{ top: `${scanProgress}%`, transition: 'top 0.05s linear' }}
                />

                {/* สกรีนสะท้อนคริสตัลจำลองความพรีเมียม */}
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/25 to-transparent mix-blend-color-burn pointer-events-none" />

                {/* แผ่นป้ายสถิติสดแบบกระจกสะท้อน */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-white/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-rose-100 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                    <span className="text-[9px] text-rose-800 font-extrabold tracking-widest">AURA PERFECTION LIVE</span>
                  </div>
                  <span className="text-[9px] text-pink-500 font-black">99.99% APPROVED</span>
                </div>

                {/* ข้อความบทบาทมุมล่าง */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/80 to-transparent p-6 pt-16">
                  <p className="text-[9px] uppercase tracking-widest text-rose-400 font-extrabold">CHIEF RESIDENCE FOUNDER</p>
                  <h3 className="text-xl font-black text-rose-950 mt-1">วริศรา เสนีย์พิทักษ์</h3>
                </div>
              </div>

              {/* บอร์ดแสดงระดับความพร้อม 3 ทิศทาง */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl text-center">
                  <span className="block text-sm font-black text-rose-600">100%</span>
                  <span className="text-[8px] text-rose-400 font-extrabold uppercase tracking-wider">Aesthetic Core</span>
                </div>
                <div className="p-3 bg-pink-50/40 border border-pink-100 rounded-xl text-center">
                  <span className="block text-sm font-black text-pink-600">99.9%</span>
                  <span className="text-[8px] text-rose-400 font-extrabold uppercase tracking-wider">Precision Check</span>
                </div>
                <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl text-center">
                  <span className="block text-sm font-black text-amber-600">VIP</span>
                  <span className="text-[8px] text-rose-400 font-extrabold uppercase tracking-wider">Butler service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* รูปแบบดีไซน์ใหม่ 1: "The Grand Sensory Atelier & Moodboard Room" (เครื่องประมวลผลความพร้อมสัมผัส) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-4 mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-400">Interactive Sensory Showroom</p>
          <h2 className="text-3xl md:text-5xl font-black text-rose-950">ห้องเครื่องสุนทรียศาสตร์และมูดบอร์ดสั่งรังสรรค์</h2>
          <p className="text-rose-700/80 text-sm max-w-xl mx-auto font-semibold">
            ปรับเปลี่ยนระดับประสาทสัมผัสและทดลองจับคู่หินอ่อนชั้นเลิศเพื่อตรวจสอบคะแนนความเพอร์เฟกต์ในอสังหาริมทรัพย์ของท่าน
          </p>
        </div>

        {/* แผงรังสรรค์คู่ (Sensory Dashboard Layout) */}
        <div className="grid lg:grid-cols-12 gap-8 bg-white border border-rose-100 p-6 md:p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(244,63,94,0.02)] relative overflow-hidden">
          
          {/* ฝั่งซ้าย (5 คอลัมน์): เครื่องคุมสัมผัสและมูดบอร์ดวัสดุ (Sensory & Moodboard Control) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* ส่วนเลือกวัสดุแผงมู๊ดบอร์ด */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-widest text-rose-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-pink-400" />
                  Bespoke Texture Moodboard
                </h3>
                <span className="text-[10px] text-rose-400 font-extrabold uppercase">[ Tap to select texture ]</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {materialOptions.map((mat) => (
                  <div 
                    key={mat.id}
                    onClick={() => {
                      setActiveMaterial(mat);
                      triggerNotification(`สลับวัสดุตกแต่งผนังแกนกลางเป็น: ${mat.name}`);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      activeMaterial.id === mat.id 
                        ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-100 shadow-xs' 
                        : 'bg-stone-50/50 border-slate-100 hover:border-rose-100'
                    }`}
                  >
                    <p className="text-[9px] uppercase tracking-widest font-extrabold text-rose-400">{mat.type}</p>
                    <h4 className="text-xs font-bold text-rose-950 mt-0.5">{mat.name}</h4>
                    <span className="text-[9px] text-slate-400 block mt-1">{mat.origin}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ส่วนควบคุม Sensory Ambience Settings */}
            <div className="space-y-4 pt-6 border-t border-rose-50">
              <h3 className="text-xs font-black uppercase tracking-widest text-rose-400 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-pink-400" />
                Sensory Atmosphere Settings
              </h3>

              {/* ปรับแต่งแสงแดดธรรมชาติ */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-rose-900">
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    แสงสว่างยามบ่าย (Natural Sunlight)
                  </span>
                  <span>{lightLevel}%</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="100" 
                  value={lightLevel}
                  onChange={(e) => setLightLevel(Number(e.target.value))}
                  className="w-full h-1 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
              </div>

              {/* ปรับแต่งอคูสติกเสียงดนตรีบำบัด */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-rose-900">
                  <span className="flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-rose-400" />
                    คลื่นเสียงโฮโลแกรม (Acoustic Aura)
                  </span>
                  <span className="text-pink-600">{acousticMode}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['Serenade', 'Ocean Breeze', 'Silence'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setAcousticMode(mode);
                        triggerNotification(`เปิดใช้งานคลื่นความถี่เสียง: ${mode}`);
                      }}
                      className={`py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-wider border transition-all ${
                        acousticMode === mode 
                          ? 'bg-rose-400 text-white border-rose-400 shadow-xs' 
                          : 'bg-white text-rose-500 border-rose-100 hover:bg-rose-50/50'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* ปรับระดับความหนาแน่นออกซิเจน */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-rose-900">
                  <span className="flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-sky-400" />
                    ออกซิเจนบริสุทธิ์ภายในห้อง (O2 Density)
                  </span>
                  <span>{oxygenLevel}%</span>
                </div>
                <input 
                  type="range" 
                  min="90" 
                  max="100" 
                  value={oxygenLevel}
                  onChange={(e) => setOxygenLevel(Number(e.target.value))}
                  className="w-full h-1 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
              </div>
            </div>
          </div>

          {/* ฝั่งขวา (7 คอลัมน์): หน้าต่างแสดงผลอสังหาฯ และระบบพรีวิว (Atmosphere Exhibition Terminal) */}
          <div className="lg:col-span-7 space-y-6 lg:border-l border-rose-50 lg:pl-8">
            
            {/* ตัวสลับอสังหาฯ อย่างรวดเร็วด้วยแท็บ */}
            <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
              {propertiesData.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProperty(p);
                    triggerNotification(`เปลี่ยนบ้านสาธิตห้องควบคุมหลัก: ${p.title}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-wider whitespace-nowrap transition-all border ${
                    selectedProperty.id === p.id 
                      ? 'bg-rose-400 text-white border-rose-300 shadow-xs' 
                      : 'bg-stone-50 text-rose-600 border-rose-100 hover:bg-rose-50/30'
                  }`}
                >
                  {p.title.split(' ')[1]}
                </button>
              ))}
            </div>

            {/* รูปภาพจำลองขนาดภาพยนตร์ (Main Master Image Canvas) */}
            <div className="relative rounded-[2rem] overflow-hidden bg-rose-100 aspect-[16/10] shadow-sm border border-rose-100">
              
              {/* ฟิลเตอร์ไล่สีสะท้อนแสงตามค่าสลัก Sensory ที่ผู้ใช้เลื่อน */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none transition-all duration-700" 
                style={{
                  backgroundColor: `rgba(244, 63, 94, ${Math.max(0, (100 - lightLevel) / 250)})`,
                  backdropFilter: acousticMode === 'Silence' ? 'none' : 'contrast(1.03) saturate(1.05)',
                }}
              />

              <img 
                src={selectedProperty.image} 
                alt={selectedProperty.title} 
                className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out scale-102"
              />

              {/* ข้อความประกอบประมวลผลอัจฉริยะ ซ้อนทับบนมุมภาพแบบสกรีนแผงคุม */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 z-15 text-white pointer-events-none font-mono text-[9px] bg-gradient-to-t from-rose-950/40 via-transparent to-transparent">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 bg-white/90 text-rose-950 p-2.5 rounded-xl border border-rose-100 shadow-sm backdrop-blur-md">
                    <p className="font-bold">CURATOR REVIEWS: {selectedProperty.category.toUpperCase()}</p>
                    <p>MATERIAL IN USE: {activeMaterial.name.toUpperCase()}</p>
                    <p>LOCATION: {selectedProperty.location.toUpperCase()}</p>
                  </div>
                  <div className="bg-white/90 text-rose-950 p-2.5 rounded-xl border border-rose-100 shadow-sm backdrop-blur-md text-right">
                    <p className="text-emerald-600 font-extrabold animate-pulse">● ATMOSPHERE STABLE</p>
                    <p>O2 SATURATION: {oxygenLevel}%</p>
                  </div>
                </div>

                <div className="flex justify-between items-end bg-white/95 text-rose-950 p-4 rounded-2xl border border-rose-100 shadow-lg backdrop-blur-md pointer-events-auto">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-wider text-rose-400">Total Curated Score</p>
                    <h4 className="text-base font-black text-rose-950 flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-spin" />
                      Varisara-Score {computedPerfectionScore}%
                    </h4>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-rose-500 tracking-widest">[ Perfect Harmony ]</span>
                </div>
              </div>
            </div>

            {/* รายละเอียดจุดประเมินที่โดดเด่นผ่านคุณวริศรา */}
            <div className="p-5 bg-rose-50/50 rounded-2xl border border-rose-100 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-rose-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-rose-400" />
                จุดตรวจสอบความเพอร์เฟกต์เฉพาะทาง
              </h4>
              <ul className="grid md:grid-cols-2 gap-3.5 text-xs text-rose-900 font-semibold">
                {selectedProperty.highlights.map((hl, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <CornerDownRight className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center pt-3">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-rose-400 font-extrabold">มูลค่าประเมินสุทธิ</span>
                <span className="block text-2xl font-black text-rose-950">{selectedProperty.price}</span>
              </div>
              <a 
                href="#atelier-booking-section"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-102 transition-transform"
              >
                จองสิทธิ์เข้าชมนัดพิเศษ
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* รูปแบบดีไซน์ใหม่ 2: "The Bespoke Portfolio Showcase" (การ์ดแสดงผลงานสไตล์นิตยสารเลย์เอาต์สว่าง) */}
      <section className="bg-white/80 border-y border-rose-100/60 py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-400 mb-2">Masterpiece Archive</p>
              <h2 className="text-3xl md:text-5xl font-black text-rose-950">ผลงานสร้างสรรค์อสังหาริมทรัพย์หรู</h2>
            </div>
            {/* แท็บคัดเลือกอสังหาฯ */}
            <div className="mt-4 md:mt-0 flex gap-2 overflow-x-auto pb-1.5">
              {(['All', 'Penthouse', 'Mansion', 'Private Island'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    triggerNotification(`กรองคอลเลกชันเป็น: ${cat}`);
                  }}
                  className={`px-4.5 py-2 rounded-xl text-xs font-extrabold tracking-wider transition-all duration-300 ${
                    selectedCategory === cat 
                      ? 'bg-rose-400 text-white shadow-xs' 
                      : 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100/40'
                  }`}
                >
                  {cat === 'All' ? 'ทั้งหมดทุกประเภท' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* รายการแสดงผลงานสไตล์การ์ดภาพศิลปะ (The Pearl Cards Grid) */}
          <div className="grid md:grid-cols-3 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((p) => (
                <article 
                  key={p.id}
                  onClick={() => {
                    setSelectedProperty(p);
                    triggerNotification(`แสดงทัศนวิสัยบนหน้าต่างหลัก: ${p.title}`);
                  }}
                  className={`group bg-white rounded-[2.5rem] overflow-hidden border transition-all duration-500 cursor-pointer shadow-xs ${
                    selectedProperty.id === p.id 
                      ? 'border-rose-300 ring-2 ring-rose-100 scale-[1.01] shadow-md' 
                      : 'border-rose-100 hover:border-rose-200'
                  }`}
                >
                  {/* ภาพการ์ด */}
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 via-transparent to-transparent" />
                    
                    {/* คะแนน */}
                    <div className="absolute top-4 left-4 bg-white/95 border border-rose-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-[10px] text-rose-950 font-black">{p.details.perfectionScore}% Perfect</span>
                    </div>

                    <span className="absolute top-4 right-4 bg-rose-400 text-white px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest">
                      {p.category}
                    </span>

                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-[10px] text-pink-100 font-extrabold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-pink-300" />
                        {p.location}
                      </p>
                      <h3 className="text-base font-black text-white mt-1">{p.title}</h3>
                    </div>
                  </div>

                  {/* สเปกและราคาใต้อสังหาฯ */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center text-xs text-rose-900 pb-3 border-b border-rose-50 font-bold">
                      <span>พื้นที่ใช้สอย: <strong className="text-rose-500 font-black">{p.details.area}</strong></span>
                      <span>ห้องนอน: <strong className="text-rose-500 font-black">{p.details.beds}</strong></span>
                    </div>

                    <p className="text-xs text-rose-800/80 leading-relaxed font-semibold">
                      ผ่านการทดสอบมาตรฐานความเพอร์เฟกต์ 150 จุด และมีลิขสิทธิ์สิทธิ์การรับรองส่วนตัวครบถ้วน
                    </p>

                    <div className="pt-4 border-t border-rose-50 flex justify-between items-center">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-rose-400 font-black">ราคาขายเอกสิทธิ์</span>
                        <span className="block text-base font-black text-rose-500">{p.price}</span>
                      </div>
                      <span className="text-xs font-black text-rose-400 group-hover:text-rose-600 transition-colors flex items-center gap-1 uppercase">
                        ทดลองปรับแอร์แสง
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-rose-50/20 rounded-3xl border border-rose-100">
                <Shield className="w-12 h-12 text-rose-200 mx-auto mb-4 animate-pulse" />
                <p className="text-rose-600 font-semibold text-sm">ไม่พบโครงการระดับเพอร์เฟกต์ในช่วงราคานี้</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setPriceRange(1600); setSearchQuery(''); }}
                  className="mt-4 px-5 py-2 rounded-xl bg-rose-400 text-white text-xs font-bold"
                >
                  ล้างตัวกรองและดูโครงการทั้งหมด
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* รูปแบบดีไซน์ใหม่ 3: "The Varisara Rose-Gold Invitation Creator" (เครื่องรังสรรค์การ์ดเชิญสุดเอ็กซ์คลูซีฟ) */}
      <section id="atelier-booking-section" className="max-w-4xl mx-auto px-6 py-24">
        <div className="bg-white rounded-[3rem] border border-rose-100 p-8 md:p-12 shadow-[0_30px_70px_rgba(244,63,94,0.03)] relative overflow-hidden">
          
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-50 rounded-full blur-3xl pointer-events-none" />

          {/* หัวข้อจองคิวแสนหวาน */}
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-500 text-[10px] font-extrabold uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5 text-pink-400" />
              Private Atelier Invitation Card
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-rose-950">รับสิทธิ์เชิญเข้าชมสถานที่จริง</h2>
            <p className="text-rose-700/80 text-xs md:text-sm max-w-lg mx-auto font-semibold">
              กรอกข้อมูลส่วนตัวเพื่อรังสรรค์ **"บัตรผ่านประตูสีทอง"** พร้อมรับการดูแลอย่างดีเยี่ยมด้วยเลขาฯ ส่วนตัวและบริการแชมเปญต้อนรับ
            </p>
          </div>

          {/* ตารางแสดงขั้นตอนการจองแบบพาสเทล */}
          <div className="flex items-center justify-center gap-6 mb-10 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${bookingStep >= 1 ? 'bg-rose-400 text-white' : 'bg-rose-50 text-rose-400'}`}>1</span>
              <span className={bookingStep >= 1 ? 'text-rose-950 font-extrabold' : 'text-slate-400'}>สิทธิ์บุคคลวีไอพี</span>
            </div>
            <div className="w-8 h-[1px] bg-rose-100" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${bookingStep >= 2 ? 'bg-rose-400 text-white' : 'bg-rose-50 text-rose-400'}`}>2</span>
              <span className={bookingStep >= 2 ? 'text-rose-950 font-extrabold' : 'text-slate-400'}>เลือกตารางเวลาสิริมงคล</span>
            </div>
          </div>

          {bookingConfirmed ? (
            /* ระบบสร้างการ์ดผ่านสีโรสโกลด์เสมือนจริง (Interactive Rose Gold Invitation Card) */
            <div className="space-y-8 animate-fade-in text-center py-6">
              
              {/* ตัวการ์ดหรูหราแบบโรสโกลด์พาสเทล */}
              <div className="relative max-w-md mx-auto bg-gradient-to-br from-rose-100 via-pink-50 to-amber-100 rounded-3xl p-8 border-2 border-amber-300 shadow-[0_20px_50px_rgba(244,63,94,0.1)] overflow-hidden text-left text-rose-950">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
                
                {/* ลวดลายกรอบการ์ด */}
                <div className="absolute inset-4 border border-rose-300/40 rounded-2xl pointer-events-none" />
                
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[8px] uppercase tracking-[0.3em] font-black text-rose-400">Varisara Residence Pass</span>
                      <h4 className="text-base font-black tracking-wider text-rose-900">ROYAL BLUSH INVITATION</h4>
                    </div>
                    <Gem className="w-8 h-8 text-amber-500/80 animate-bounce" />
                  </div>

                  <div className="space-y-3.5 border-y border-rose-200/50 py-4.5">
                    <p className="text-xs">
                      <span className="block text-[8px] uppercase text-rose-400 font-extrabold">VIP GUEST OF HONOR</span>
                      <strong className="text-sm font-black text-rose-950">{clientName}</strong>
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <p className="text-xs">
                        <span className="block text-[8px] uppercase text-rose-400 font-extrabold">APPOINTMENT DATE</span>
                        <strong className="font-bold">{selectedDate}</strong>
                      </p>
                      <p className="text-xs">
                        <span className="block text-[8px] uppercase text-rose-400 font-extrabold">AURA TIME SLOT</span>
                        <strong className="font-bold">{selectedTime} น.</strong>
                      </p>
                    </div>

                    <p className="text-xs">
                      <span className="block text-[8px] uppercase text-rose-400 font-extrabold">ESTATE SELECTION</span>
                      <strong className="text-xs font-black text-rose-950">{selectedProperty.title}</strong>
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <p className="font-mono text-[9px] text-rose-400 font-bold">
                      SERIAL: {generatedInvitationId}
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-rose-600 text-[8px] font-extrabold uppercase border border-rose-200">
                      <Check className="w-3 h-3 stroke-[3px]" />
                      CONFIRMED
                    </span>
                  </div>
                </div>
              </div>

              {/* ข้อความขอบคุณและปุ่มรีเซ็ต */}
              <div className="space-y-4 max-w-md mx-auto">
                <p className="text-xs text-rose-800 font-semibold leading-relaxed">
                  กรุณาบันทึกภาพหน้าจอหรือจดจำเลขซีเรียลด้านบนเพื่อระบุตัวบุคคลในการจัดรถลีมูซีนต้อนรับ ณ วันเข้าชมจริงครับ
                </p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => {
                      setBookingConfirmed(false);
                      setBookingStep(1);
                      setClientName('');
                      setClientPhone('');
                      setClientEmail('');
                    }}
                    className="px-5 py-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 text-xs font-extrabold hover:bg-rose-100/50"
                  >
                    ลงทะเบียนรายนามอื่นเพิ่ม
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* STEP 1: กรอกข้อมูลบุคคล */}
              {bookingStep === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-xs text-rose-900 font-bold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-pink-400" />
                      ชื่อ-นามสกุลจริง ของท่าน (เพื่อสลักลงบนบัตรเชิญทองคำ)
                    </label>
                    <input 
                      type="text" 
                      placeholder="เช่น คุณกิตติภพ ดำรงศักดิ์เสถียร" 
                      className="w-full bg-rose-50/40 border border-rose-100 rounded-2xl py-3 px-4 text-xs font-bold text-rose-950 focus:outline-none focus:border-rose-300 focus:bg-white transition-all"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-rose-900 font-bold flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-pink-400" />
                        เบอร์ตรงสายด่วนสระสมทรัพย์ (จำกัดมาตรการลับ)
                      </label>
                      <input 
                        type="tel" 
                        placeholder="เช่น 089-123-4567" 
                        className="w-full bg-rose-50/40 border border-rose-100 rounded-2xl py-3 px-4 text-xs font-bold text-rose-950 focus:outline-none focus:border-rose-300 focus:bg-white transition-all"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-rose-900 font-bold flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-pink-400" />
                        อีเมลประสานงานแผนการเดินทาง (ถ้ามี)
                      </label>
                      <input 
                        type="email" 
                        placeholder="เช่น guest@exclusive-family.com" 
                        className="w-full bg-rose-50/40 border border-rose-100 rounded-2xl py-3 px-4 text-xs font-bold text-rose-950 focus:outline-none focus:border-rose-300 focus:bg-white transition-all"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => {
                      if (!clientName || !clientPhone) {
                        triggerNotification('กรุณากรอกประวัติตัวตนเพื่อทำการลงทะเบียนสิทธิ์บุคคลผู้ทรงเกียรติ');
                        return;
                      }
                      setBookingStep(2);
                    }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 text-white font-extrabold text-xs uppercase tracking-widest hover:shadow-md transition-all"
                  >
                    กำหนดตารางวันเข้าเยี่ยมชมถัดไป
                  </button>
                </div>
              )}

              {/* STEP 2: ตารางเวลา */}
              {bookingStep === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-rose-900 font-bold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-pink-400" />
                        เลือกวันที่ประสงค์ต้องการสัมผัสพื้นที่จริง
                      </label>
                      <input 
                        type="date" 
                        className="w-full bg-rose-50/40 border border-rose-100 rounded-2xl py-3 px-4 text-xs font-bold text-rose-950 focus:outline-none focus:border-rose-300 focus:bg-white transition-all"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-rose-900 font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-pink-400" />
                        ช่วงเวลาเพื่อเตรียมบัตเลอร์ให้การต้อนรับ
                      </label>
                      <select 
                        className="w-full bg-rose-50/40 border border-rose-100 rounded-2xl py-3 px-4 text-xs font-bold text-rose-950 focus:outline-none focus:border-rose-300 focus:bg-white transition-all cursor-pointer"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                      >
                        <option value="">เลือกเวลาที่สะดวก...</option>
                        <option value="09:00 - 11:30">ช่วงสายพฤกษศาสตร์ (09:00 - 11:30 น.)</option>
                        <option value="13:00 - 15:30">บ่ายสราญรมย์ (13:00 - 15:30 น.)</option>
                        <option value="16:00 - 18:30">ยามพระอาทิตย์อัสดงกุหลาบ (16:00 - 18:30 น.)</option>
                      </select>
                    </div>
                  </div>

                  {/* ป้ายเตือนความเป็นส่วนตัว */}
                  <div className="p-4.5 bg-rose-50/40 rounded-2xl border border-rose-100 flex gap-2.5 text-[11px] text-rose-800 font-semibold leading-relaxed">
                    <Shield className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                    <span>ระบบรักษาความลับระดับสูงสุด ข้อมูลประวัติการสะสมอสังหาฯ และข้อมูลทรัพย์สินทั้งหมดของท่านจะถูกสกรีนจำกัดระดับการเข้าชมอย่างเข้มงวดที่สุด</span>
                  </div>

                  {/* ปุ่มดำเนินงานการเชิญ */}
                  <div className="grid grid-cols-3 gap-4">
                    <button 
                      type="button"
                      onClick={() => setBookingStep(1)}
                      className="py-4 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 font-bold text-xs uppercase"
                    >
                      ย้อนกลับ
                    </button>
                    <button 
                      type="submit"
                      className="col-span-2 py-4 rounded-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 text-white font-black text-xs uppercase tracking-widest hover:shadow-lg transition-all"
                    >
                      รังสรรค์และรับบัตรเชิญทองคำ
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}

        </div>
      </section>

      {/* ท้ายหน้าเว็บสีพาสเทลชมพูหรู (Elegant Rosé Footer) */}
      <footer className="max-w-7xl mx-auto px-6 pt-12 border-t border-rose-100/60 text-center space-y-6 text-xs text-rose-400">
        <div className="flex justify-center items-center gap-3">
          <Compass className="w-5 h-5 text-pink-400" />
          <span className="text-sm font-black tracking-widest bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">VARISARA AURA LUXE SALON CO., LTD</span>
        </div>
        <p className="max-w-md mx-auto text-[10px] text-rose-800/80 leading-relaxed font-bold">
          เลขที่ 88 อาคารปัทมราชธานี ชั้น 88 สุขุมวิท กรุงเทพมหานคร 10110 <br />
          โทร: 02-LUXE-AURA | อีเมล: curator@varisara-aura.luxury
        </p>
        <div className="pt-4 border-t border-rose-100/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] text-rose-400 font-black uppercase">
          <p>© {new Date().getFullYear()} VARISARA AURA. คัดสรรสิทธิ์โครงการและคุ้มครองความปลอดภัยโดยบริษัทวริศราจำกัด</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-rose-600 transition-colors">สิทธิ์ความเป็นส่วนตัววีไอพี</a>
            <a href="#" className="hover:text-rose-600 transition-colors">หลักเกณฑ์การประเมินสุนทรียภาพ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}