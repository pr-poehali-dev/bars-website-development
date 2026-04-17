import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

interface PriceGroup {
  title: string;
  icon: string;
  note?: string;
  items: { name: string; unit: string; price: string }[];
}

const HERO_IMG = "https://cdn.poehali.dev/projects/c1127bca-3ac3-4cdc-9f81-f9657c59c334/files/4d2629cd-5f15-439f-b795-4438ec6b5656.jpg";
const PILE_IMG = "https://cdn.poehali.dev/projects/c1127bca-3ac3-4cdc-9f81-f9657c59c334/bucket/9a60a863-7cb6-4af3-b4cd-98477b44305e.jpeg";
const SEPTIC_IMG = "https://cdn.poehali.dev/projects/c1127bca-3ac3-4cdc-9f81-f9657c59c334/bucket/daf5e4aa-8265-4e69-91b6-099ebafdf605.jpg";

const services = [
  { icon: "Drill", title: "Винтовые сваи", desc: "Изготовление и монтаж винтовых свай для любых типов грунта. Фундаменты под дома, заборы, беседки, террасы" },
  { icon: "Layers", title: "Забивные сваи", desc: "Производство и погружение железобетонных забивных свай. Подходят для тяжёлых конструкций и нестабильных грунтов" },
  { icon: "Droplets", title: "Септики и канализация", desc: "Проектирование и монтаж автономных септиков, ливневой и бытовой канализации под ключ" },
  { icon: "Waves", title: "Колодцы", desc: "Рытьё и обустройство питьевых и технических колодцев. Кольца ЖБИ, донный фильтр, крышка" },
  { icon: "GitBranch", title: "Прокладка коммуникаций", desc: "Водопровод, канализация, дренаж. Траншейная и бестраншейная прокладка труб любого диаметра" },
  { icon: "Shovel", title: "Бурение", desc: "Бурение под фундамент и под столбы забора. Скважины любой глубины и диаметра" },
];

const priceGroups: PriceGroup[] = [
  {
    title: "Монтаж винтовых свай",
    icon: "RotateCcw",
    note: "* Указана средняя стоимость за единицу товара, расчёт по каждому заказу индивидуальный. Постоянным клиентам дополнительные скидки и спец. предложения. Возможна продажа свай без монтажа.",
    items: [
      { name: "79×3,5×2000 мм", unit: "шт", price: "4 100" },
      { name: "76×3,5×2500 мм", unit: "шт", price: "4 400" },
      { name: "76×3,5×3000 мм", unit: "шт", price: "4 700" },
      { name: "89×3,5×2000 мм", unit: "шт", price: "5 100" },
      { name: "89×3,5×2500 мм", unit: "шт", price: "5 400" },
      { name: "89×3,5×3000 мм", unit: "шт", price: "5 700" },
      { name: "108×4×2000 мм", unit: "шт", price: "6 100" },
      { name: "108×4×2500 мм", unit: "шт", price: "6 400" },
      { name: "108×4×3000 мм", unit: "шт", price: "6 700" },
    ],
  },
  {
    title: "Монтаж жб свай",
    icon: "Layers",
    note: "* Стоимость указана за сваю с монтажом (ЗАБИВКА). Обрезка и распушовка свай считается отдельно. Минимальная сумма заказа от 150 000 руб.",
    items: [
      { name: "С30.15", unit: "шт", price: "от 8 500" },
      { name: "С40.15", unit: "шт", price: "от 9 500" },
      { name: "С30.20", unit: "шт", price: "от 10 000" },
      { name: "С40.20", unit: "шт", price: "от 11 000" },
    ],
  },
  {
    title: "Оголовки жб свай",
    icon: "Package",
    note: "! Стоимость доставки по Самаре в пределах 30 км от города — бесплатно, далее стоимость доставки необходимо уточнять у менеджера!",
    items: [
      { name: "ОГ150×150", unit: "шт", price: "1 100" },
      { name: "ОГ200×200", unit: "шт", price: "1 300" },
      { name: "ОГ300×300", unit: "шт", price: "1 500" },
      { name: "Обрезка сваи", unit: "шт", price: "750" },
      { name: "Распушовка сваи", unit: "шт", price: "750" },
    ],
  },
  {
    title: "Шнековое бурение",
    icon: "Drill",
    note: "Услуги бурения от 300 до 6 000 руб. за погонный метр, в зависимости от диаметра бурения.",
    items: [
      { name: "Ø 100 мм", unit: "п.м.", price: "300" },
      { name: "Ø 200 мм", unit: "п.м.", price: "300–350" },
      { name: "Ø 250 мм", unit: "п.м.", price: "300–350" },
      { name: "Ø 300 мм", unit: "п.м.", price: "300–350" },
      { name: "Ø 350 мм", unit: "п.м.", price: "400" },
      { name: "Ø 400 мм", unit: "п.м.", price: "450" },
      { name: "Ø 500 мм", unit: "п.м.", price: "550" },
      { name: "Ø 600 мм", unit: "п.м.", price: "650" },
      { name: "Ø 900 мм", unit: "п.м.", price: "1 500" },
      { name: "Ø 1250 мм", unit: "п.м.", price: "3 000" },
      { name: "Ø 1850 мм", unit: "п.м.", price: "6 000" },
    ],
  },
  {
    title: "Монтаж септиков и колодцев",
    icon: "Droplets",
    note: "* Цены указаны в розницу за наличный расчёт, стоимость каждого заказа рассчитывается индивидуально.",
    items: [
      { name: "Монтаж септика d=1000 мм", unit: "компл.", price: "от 35 000*" },
      { name: "Монтаж септика d=1500 мм", unit: "компл.", price: "от 42 000*" },
      { name: "Монтаж перелива", unit: "шт", price: "от 5 000" },
      { name: "Монтаж водяного колодца d=1000 мм", unit: "компл.", price: "6 500**" },
      { name: "Прокладка коммуникаций", unit: "п.м.", price: "от 2 500" },
      { name: "Скобирование", unit: "шов", price: "1 500" },
    ],
  },
];

const stats = [
  { num: "16+", label: "лет на рынке" },
  { num: "500+", label: "свай смонтировано" },
  { num: "1 000+", label: "довольных клиентов" },
  { num: "50+", label: "км коммуникаций" },
];

const nav = ["Главная", "О компании", "Услуги", "Прайс", "Контакты"];
const navIds = ["home", "about", "services", "price", "contacts"];

function useIntersection(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  const { ref, visible } = useIntersection();
  return (
    <div id={id} ref={ref} className={`${visible ? "animate-fade-in-up" : "invisible-anim"} ${className}`}>
      {children}
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navIds.map(id => document.getElementById(id));
      const current = sections.findIndex(s => {
        if (!s) return false;
        const rect = s.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current !== -1) setActiveSection(navIds[current]);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "var(--bars-dark)", color: "var(--bars-light)", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(13,21,32,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(74,154,186,0.35)" : "none",
        transition: "all 0.3s ease",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 42, height: 42, background: "var(--bars-orange)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="58" rx="28" ry="22" fill="#0d1520"/>
                <ellipse cx="50" cy="55" rx="24" ry="19" fill="#1a2a3a"/>
                <ellipse cx="38" cy="62" rx="6" ry="4" fill="#0d1520"/>
                <ellipse cx="62" cy="62" rx="6" ry="4" fill="#0d1520"/>
                <ellipse cx="38" cy="61" rx="4" ry="3" fill="#4a9aba" opacity="0.7"/>
                <ellipse cx="62" cy="61" rx="4" ry="3" fill="#4a9aba" opacity="0.7"/>
                <ellipse cx="50" cy="65" rx="5" ry="3" fill="#c084a0"/>
                <ellipse cx="44" cy="59" rx="2" ry="2.5" fill="#e8f2f8"/>
                <ellipse cx="56" cy="59" rx="2" ry="2.5" fill="#e8f2f8"/>
                <ellipse cx="44.8" cy="59.8" rx="1" ry="1.2" fill="#0d1520"/>
                <ellipse cx="56.8" cy="59.8" rx="1" ry="1.2" fill="#0d1520"/>
                <path d="M30 48 Q28 38 24 32 Q30 36 34 46" fill="#1a2a3a"/>
                <path d="M70 48 Q72 38 76 32 Q70 36 66 46" fill="#1a2a3a"/>
                <line x1="36" y1="63" x2="24" y2="61" stroke="#e8f2f8" strokeWidth="1.2" opacity="0.6"/>
                <line x1="36" y1="65" x2="22" y2="65" stroke="#e8f2f8" strokeWidth="1.2" opacity="0.6"/>
                <line x1="36" y1="67" x2="24" y2="70" stroke="#e8f2f8" strokeWidth="1.2" opacity="0.6"/>
                <line x1="64" y1="63" x2="76" y2="61" stroke="#e8f2f8" strokeWidth="1.2" opacity="0.6"/>
                <line x1="64" y1="65" x2="78" y2="65" stroke="#e8f2f8" strokeWidth="1.2" opacity="0.6"/>
                <line x1="64" y1="67" x2="76" y2="70" stroke="#e8f2f8" strokeWidth="1.2" opacity="0.6"/>
                <ellipse cx="50" cy="68" rx="3" ry="2" fill="#0d1520" opacity="0.5"/>
                <path d="M43 55 Q50 52 57 55" stroke="#7a9ab5" strokeWidth="1" fill="none" opacity="0.5"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: "0.1em" }}>ООО БАРС</div>
              <div style={{ fontSize: 10, color: "var(--bars-gray)", letterSpacing: "0.15em" }}>СВАИ · СЕПТИКИ · КОЛОДЦЫ</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 32 }} className="nav-desktop">
            {nav.map((item, i) => (
              <button key={item} onClick={() => scrollTo(navIds[i])} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "Oswald, sans-serif", fontWeight: 500, fontSize: 15,
                color: activeSection === navIds[i] ? "var(--bars-orange)" : "var(--bars-light)",
                letterSpacing: "0.08em", textTransform: "uppercase",
                borderBottom: activeSection === navIds[i] ? "2px solid var(--bars-orange)" : "2px solid transparent",
                paddingBottom: 4, transition: "all 0.2s ease",
              }}>{item}</button>
            ))}
          </div>

          <button onClick={() => scrollTo("contacts")} className="btn-shine nav-cta" style={{
            background: "var(--bars-orange)", color: "#0D0D0D",
            border: "none", padding: "10px 24px", cursor: "pointer",
            fontFamily: "Oswald, sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--bars-orange-light)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--bars-orange)")}
          >Позвонить нам</button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="nav-burger" style={{
            background: "none", border: "none", cursor: "pointer", color: "var(--bars-light)", display: "none"
          }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={28} />
          </button>
        </div>

        {menuOpen && (
          <div className="animate-fade-in-up nav-mobile-menu" style={{
            background: "rgba(13,21,32,0.98)", borderTop: "1px solid rgba(74,154,186,0.35)",
            padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 4,
          }}>
            {nav.map((item, i) => (
              <button key={item} onClick={() => scrollTo(navIds[i])} style={{
                background: "none", border: "none", cursor: "pointer", textAlign: "left",
                fontFamily: "Oswald, sans-serif", fontWeight: 500, fontSize: 18, padding: "12px 0",
                color: activeSection === navIds[i] ? "var(--bars-orange)" : "var(--bars-light)",
                borderBottom: "1px solid rgba(255,255,255,0.07)", letterSpacing: "0.05em", textTransform: "uppercase",
              }}>{item}</button>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-burger { display: flex !important; }
          .hero-title { font-size: 52px !important; line-height: 1 !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .price-grid { grid-template-columns: 1fr !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .contacts-grid { grid-template-columns: 1fr !important; }
          .floating-img { display: none !important; }
          .map-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO */}
      <section id="home" style={{ position: "relative", height: "100vh", minHeight: 600, display: "flex", alignItems: "center", overflow: "hidden" }}>
        <img src={HERO_IMG} alt="БАРС — монтаж свай" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,21,32,0.94) 0%, rgba(13,21,32,0.65) 60%, rgba(13,21,32,0.3) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(74,154,186,0.08) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", left: 0, top: "20%", width: 5, height: "60%", background: "linear-gradient(to bottom, transparent, var(--bars-orange), transparent)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <div style={{ maxWidth: 680 }}>
            <div className="animate-fade-in-left" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 2, background: "var(--bars-orange)" }} />
              <span style={{ color: "var(--bars-orange)", fontSize: 13, letterSpacing: "0.2em", fontFamily: "Oswald, sans-serif", fontWeight: 500 }}>ООО БАРС — С 2008 ГОДА</span>
            </div>

            <h1 className="animate-fade-in-up delay-200 hero-title" style={{ fontSize: 80, lineHeight: 1, fontWeight: 700, marginBottom: 24 }}>
              <span style={{ display: "block" }}>СВАИ.</span>
              <span style={{ display: "block", color: "var(--bars-orange)" }}>СЕПТИКИ.</span>
              <span style={{ display: "block" }}>КОЛОДЦЫ.</span>
            </h1>

            <p className="animate-fade-in-up delay-400" style={{ fontSize: 18, color: "rgba(236,245,241,0.8)", lineHeight: 1.6, marginBottom: 40, fontFamily: "Roboto, sans-serif", fontWeight: 300, maxWidth: 500 }}>
              Изготовление и монтаж винтовых и забивных свай, прокладка септиков, коммуникаций и колодцев. Работаем с 2008 года.
            </p>

            <div className="animate-fade-in-up delay-600" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("contacts")} className="btn-shine animate-pulse-ring" style={{
                background: "var(--bars-orange)", color: "#0D0D0D",
                border: "none", padding: "16px 40px", cursor: "pointer",
                fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "0.08em", textTransform: "uppercase",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bars-orange-light)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--bars-orange)")}
              >Получить расчёт</button>

              <button onClick={() => scrollTo("services")} style={{
                background: "transparent", color: "var(--bars-light)",
                border: "2px solid rgba(245,245,245,0.3)", padding: "16px 40px", cursor: "pointer",
                fontFamily: "Oswald, sans-serif", fontWeight: 600, fontSize: 16, letterSpacing: "0.08em", textTransform: "uppercase",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--bars-orange)"; e.currentTarget.style.color = "var(--bars-orange)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,245,245,0.3)"; e.currentTarget.style.color = "var(--bars-light)"; }}
              >Наши услуги</button>
            </div>
          </div>
        </div>

        <div className="animate-float" style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 2, cursor: "pointer" }} onClick={() => scrollTo("about")}>
          <Icon name="ChevronDown" size={36} style={{ color: "var(--bars-orange)", opacity: 0.8 }} />
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: "var(--bars-orange)", overflow: "hidden", padding: "12px 0" }}>
        <div className="animate-ticker" style={{ display: "flex", whiteSpace: "nowrap" }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex" }}>
              {["ВИНТОВЫЕ СВАИ", "ЗАБИВНЫЕ СВАИ", "СЕПТИКИ", "КОЛОДЦЫ", "КАНАЛИЗАЦИЯ", "ДРЕНАЖ", "КОММУНИКАЦИИ", "ЗЕМЛЯНЫЕ РАБОТЫ"].map((t) => (
                <span key={t} style={{ fontFamily: "Oswald, sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.15em", color: "#ECF5F1", padding: "0 40px", display: "flex", alignItems: "center", gap: 16 }}>
                  {t} <span style={{ opacity: 0.4 }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: "var(--bars-dark-2)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
            {stats.map((s, i) => (
              <Section key={i}>
                <div style={{ background: "var(--bars-dark-3)", padding: "40px 24px", textAlign: "center", borderTop: "4px solid var(--bars-orange)" }}>
                  <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 56, fontWeight: 700, color: "var(--bars-orange)", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: "var(--bars-gray)", letterSpacing: "0.08em", marginTop: 8, textTransform: "uppercase" }}>{s.label}</div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", background: "var(--bars-dark)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <Section>
              <div>
                <div style={{ color: "var(--bars-orange)", fontSize: 12, letterSpacing: "0.2em", fontFamily: "Oswald, sans-serif", marginBottom: 16 }}>О КОМПАНИИ</div>
                <span className="orange-accent" />
                <h2 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.05, marginBottom: 24 }}>
                  НАДЁЖНЫЙ<br />
                  <span style={{ color: "var(--bars-orange)" }}>ФУНДАМЕНТ</span><br />
                  ДЛЯ ВАШЕГО ДОМА
                </h2>
                <p style={{ color: "rgba(236,245,241,0.7)", lineHeight: 1.8, marginBottom: 16, fontSize: 16 }}>
                  ООО БАРС — компания с 16-летней историей. Специализируемся на изготовлении и монтаже свай, прокладке септиков, канализации и обустройстве колодцев.
                </p>
                <p style={{ color: "rgba(236,245,241,0.7)", lineHeight: 1.8, marginBottom: 32, fontSize: 16 }}>
                  Собственное производство свай, современная техника и опытные специалисты — работаем быстро и в срок. Соблюдаем все нормы и ГОСТ.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Собственное производство винтовых свай", "Гарантия на монтаж от 3 лет", "Работаем по всему региону", "Работаем с НДС и юридическими лицами"].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 20, height: 20, background: "var(--bars-orange)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <Icon name="Check" size={12} style={{ color: "#0D0D0D" }} />
                      </div>
                      <span style={{ fontSize: 15, color: "rgba(245,245,245,0.85)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section>
              <div style={{ position: "relative" }}>
                <img src={PILE_IMG} alt="Винтовая свая БАРС" style={{ width: "100%", height: 480, objectFit: "cover", display: "block" }} />
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* PRODUCTION */}
      <section style={{ padding: "100px 24px", background: "var(--bars-dark-2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Section>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ color: "var(--bars-orange)", fontSize: 12, letterSpacing: "0.2em", fontFamily: "Oswald, sans-serif", marginBottom: 16 }}>СОБСТВЕННОЕ ПРОИЗВОДСТВО</div>
              <h2 style={{ fontSize: 52, fontWeight: 700 }}>МЫ НЕ ТОЛЬКО <span style={{ color: "var(--bars-orange)" }}>МОНТИРУЕМ</span></h2>
              <p style={{ color: "var(--bars-gray)", marginTop: 16, fontSize: 17, maxWidth: 700, margin: "16px auto 0" }}>
                Мы производим винтовые сваи сами — стандартных размеров и по индивидуальным чертежам. Это значит: любой диаметр, любая длина, любая лопасть.
              </p>
            </div>
          </Section>

          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", marginBottom: 60 }}>
            <Section>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" }}>
                <svg width="200" height="420" viewBox="0 0 200 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="pileBody" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#2a3a4a"/>
                      <stop offset="35%" stopColor="#4a9aba" stopOpacity="0.6"/>
                      <stop offset="60%" stopColor="#1a2a3a"/>
                      <stop offset="100%" stopColor="#0d1520"/>
                    </linearGradient>
                    <linearGradient id="pileTip" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2a3a4a"/>
                      <stop offset="100%" stopColor="#0d1520"/>
                    </linearGradient>
                    <linearGradient id="bladeGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3a5a6a"/>
                      <stop offset="50%" stopColor="#4a9aba" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#1a3a4a"/>
                    </linearGradient>
                    <filter id="shadow">
                      <feDropShadow dx="4" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5"/>
                    </filter>
                  </defs>
                  <rect x="84" y="0" width="32" height="320" rx="16" fill="url(#pileBody)" filter="url(#shadow)"/>
                  <ellipse cx="100" cy="0" rx="16" ry="6" fill="#3a5a6a"/>
                  <rect x="88" y="0" width="6" height="320" rx="3" fill="rgba(255,255,255,0.08)"/>
                  <ellipse cx="100" cy="320" rx="16" ry="6" fill="#2a3a4a"/>
                  <path d="M84 320 Q100 380 100 400 Q100 380 116 320 Z" fill="url(#pileTip)" filter="url(#shadow)"/>
                  <path d="M100 300 Q68 285 42 270 Q50 285 60 295 Q70 300 84 310 Q92 315 100 320 Z" fill="url(#bladeGrad)" filter="url(#shadow)"/>
                  <path d="M100 300 Q68 285 42 270 Q50 258 60 265 Q72 272 84 290 Q92 298 100 300 Z" fill="#2a4a5a" opacity="0.7"/>
                  <path d="M100 300 Q68 285 42 270" stroke="#6ab8d4" strokeWidth="1.5" opacity="0.5" fill="none"/>
                  <path d="M44 272 Q46 268 50 270" stroke="#6ab8d4" strokeWidth="1" opacity="0.4" fill="none"/>
                  <line x1="100" y1="0" x2="100" y2="40" stroke="#6ab8d4" strokeWidth="10" strokeLinecap="round" opacity="0.15"/>
                  <text x="140" y="160" fill="#4a9aba" fontSize="11" fontFamily="Oswald, sans-serif" opacity="0.7">Ø 76–108</text>
                  <text x="140" y="175" fill="#4a9aba" fontSize="11" fontFamily="Oswald, sans-serif" opacity="0.7">мм</text>
                  <line x1="118" y1="160" x2="138" y2="168" stroke="#4a9aba" strokeWidth="0.8" opacity="0.5"/>
                  <text x="2" y="290" fill="#4a9aba" fontSize="11" fontFamily="Oswald, sans-serif" opacity="0.7">Лопасть</text>
                  <line x1="54" y1="283" x2="68" y2="285" stroke="#4a9aba" strokeWidth="0.8" opacity="0.5"/>
                  <text x="115" y="380" fill="#4a9aba" fontSize="11" fontFamily="Oswald, sans-serif" opacity="0.7">Наконечник</text>
                  <line x1="100" y1="395" x2="113" y2="387" stroke="#4a9aba" strokeWidth="0.8" opacity="0.5"/>
                </svg>
              </div>
            </Section>
            <Section>
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {[
                    { icon: "Settings", title: "Стандартные размеры", desc: "Производим сваи по ГОСТ: диаметры 57, 76, 89, 108 мм, длины 2000–3000 мм. Всегда в наличии на складе." },
                    { icon: "PenTool", title: "Индивидуальные чертежи", desc: "Изготавливаем по вашим размерам — любой диаметр, шаг и диаметр лопасти, нестандартная длина." },
                    { icon: "Shield", title: "Контроль качества", desc: "Сталь марки Ст3, толщина стенки 3,5–4 мм. Сварные швы проходят контроль. Антикоррозийное покрытие." },
                    { icon: "Truck", title: "Доставка с завода", desc: "Отгружаем напрямую с производства. Не переплачиваете посредникам. Доставка по Самаре и области." },
                  ].map((item) => (
                    <div key={item.title} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                      <div style={{ width: 44, height: 44, background: "rgba(74,154,186,0.12)", border: "1px solid rgba(74,154,186,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name={item.icon} size={20} style={{ color: "var(--bars-orange)" }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
                        <div style={{ fontSize: 14, color: "rgba(232,242,248,0.7)", lineHeight: 1.65 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>

          <Section>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }} className="services-grid">
              <div style={{ overflow: "hidden", position: "relative" }}>
                <img src="https://cdn.poehali.dev/projects/c1127bca-3ac3-4cdc-9f81-f9657c59c334/bucket/076f1894-817a-4db7-ba3a-f7875202dd38.jpeg" alt="Монтаж свай" style={{ width: "100%", height: 280, objectFit: "cover", display: "block", transition: "transform 0.4s" }}
                  onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = "scale(1.05)")}
                  onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(13,21,32,0.85))", padding: "20px 16px 14px" }}>
                  <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 14, color: "var(--bars-light)" }}>Забивные сваи — монтаж</div>
                </div>
              </div>
              <div style={{ overflow: "hidden", position: "relative" }}>
                <img src="https://cdn.poehali.dev/projects/c1127bca-3ac3-4cdc-9f81-f9657c59c334/bucket/9a60a863-7cb6-4af3-b4cd-98477b44305e.jpeg" alt="Винтовые сваи" style={{ width: "100%", height: 280, objectFit: "cover", display: "block", transition: "transform 0.4s" }}
                  onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = "scale(1.05)")}
                  onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(13,21,32,0.85))", padding: "20px 16px 14px" }}>
                  <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 14, color: "var(--bars-light)" }}>Винтовая свая с лопастью</div>
                </div>
              </div>
              <div style={{ overflow: "hidden", position: "relative" }}>
                <img src="https://cdn.poehali.dev/projects/c1127bca-3ac3-4cdc-9f81-f9657c59c334/bucket/4c2624ac-0865-4ec6-bc35-c9a9da3d318b.jpg" alt="Поле свай" style={{ width: "100%", height: 280, objectFit: "cover", display: "block", transition: "transform 0.4s" }}
                  onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = "scale(1.05)")}
                  onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(13,21,32,0.85))", padding: "20px 16px 14px" }}>
                  <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 14, color: "var(--bars-light)" }}>Свайный фундамент</div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 24px", background: "var(--bars-dark-2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Section>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ color: "var(--bars-orange)", fontSize: 12, letterSpacing: "0.2em", fontFamily: "Oswald, sans-serif", marginBottom: 16 }}>ЧТО МЫ ДЕЛАЕМ</div>
              <h2 style={{ fontSize: 52, fontWeight: 700 }}>НАШИ <span style={{ color: "var(--bars-orange)" }}>УСЛУГИ</span></h2>
            </div>
          </Section>
          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {services.map((s, i) => (
              <Section key={i}>
                <div className="card-hover" style={{
                  background: "var(--bars-dark-3)", padding: "36px 32px",
                  border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer",
                  borderTop: "3px solid var(--bars-orange)",
                }}>
                  <div style={{ width: 52, height: 52, background: "rgba(74,154,186,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, border: "1px solid rgba(74,154,186,0.3)" }}>
                    <Icon name={s.icon} size={24} style={{ color: "var(--bars-orange)" }} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, lineHeight: 1.2 }}>{s.title}</h3>
                  <p style={{ color: "rgba(245,245,245,0.6)", fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" style={{ padding: "100px 24px", background: "var(--bars-dark)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Section>
            <div style={{ marginBottom: 64 }}>
              <div style={{ color: "var(--bars-orange)", fontSize: 12, letterSpacing: "0.2em", fontFamily: "Oswald, sans-serif", marginBottom: 16 }}>СТОИМОСТЬ РАБОТ</div>
              <span className="orange-accent" />
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
                <h2 style={{ fontSize: 52, fontWeight: 700 }}>ПРАЙС-<span style={{ color: "var(--bars-orange)" }}>ЛИСТ</span></h2>
                <p style={{ color: "var(--bars-gray)", fontSize: 14, maxWidth: 400 }}>Цены ориентировочные. Точная стоимость — после выезда специалиста на объект.</p>
              </div>
            </div>
          </Section>

          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {priceGroups.map((group, gi) => (
              <Section key={gi}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                    <div style={{ width: 40, height: 40, background: "rgba(74,154,186,0.15)", border: "1px solid rgba(74,154,186,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={group.icon} size={20} style={{ color: "var(--bars-orange)" }} />
                    </div>
                    <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: 24, fontWeight: 600, letterSpacing: "0.05em" }}>{group.title}</h3>
                    <div style={{ flex: 1, height: 1, background: "rgba(74,154,186,0.25)", marginLeft: 8 }} />
                  </div>
                  <div className="price-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    {group.items.map((p, pi) => (
                      <div key={pi} className="card-hover" style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        background: "var(--bars-dark-3)", padding: "18px 28px",
                        border: "1px solid rgba(255,255,255,0.05)", gap: 16,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <div style={{ width: 3, height: 36, background: "var(--bars-orange)", flexShrink: 0 }} />
                          <div>
                            <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 16, fontWeight: 500 }}>{p.name}</div>
                            <div style={{ fontSize: 12, color: "var(--bars-gray)", marginTop: 2 }}>за {p.unit}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 22, color: "var(--bars-orange)" }}>{p.price} ₽</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {group.note && (
                    <div style={{ marginTop: 14, padding: "12px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: "3px solid rgba(74,154,186,0.5)" }}>
                      <p style={{ fontSize: 12, color: "var(--bars-gray)", fontFamily: "Roboto, sans-serif", lineHeight: 1.6, margin: 0 }}>{group.note}</p>
                    </div>
                  )}
                </div>
              </Section>
            ))}
          </div>

          <Section>
            <div style={{ marginTop: 56, textAlign: "center" }}>
              <button onClick={() => scrollTo("contacts")} className="btn-shine" style={{
                background: "var(--bars-orange)", color: "#ECF5F1",
                border: "none", padding: "18px 60px", cursor: "pointer",
                fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "0.1em", textTransform: "uppercase",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bars-orange-light)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--bars-orange)")}
              >Рассчитать стоимость проекта</button>
            </div>
          </Section>
        </div>
      </section>

      {/* MAP */}
      <section style={{ padding: "100px 24px", background: "var(--bars-dark-2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Section>
            <div style={{ marginBottom: 48 }}>
              <div style={{ color: "var(--bars-orange)", fontSize: 12, letterSpacing: "0.2em", fontFamily: "Oswald, sans-serif", marginBottom: 16 }}>ГЕОГРАФИЯ</div>
              <h2 style={{ fontSize: 52, fontWeight: 700 }}>ЗОНА <span style={{ color: "var(--bars-orange)" }}>ОБСЛУЖИВАНИЯ</span></h2>
            </div>
          </Section>
          <div className="map-layout" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32, alignItems: "start" }}>
            <Section>
              <div>
                <div style={{ background: "var(--bars-dark-3)", padding: "32px", border: "1px solid rgba(74,154,186,0.2)", marginBottom: 16, borderLeft: "4px solid var(--bars-orange)" }}>
                  <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: 20, marginBottom: 20, color: "var(--bars-orange)" }}>ОФИС КОМПАНИИ</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      { icon: "MapPin", text: "г. Москва, ул. Строительная, 15" },
                      { icon: "Phone", text: "+7 (495) 000-00-00" },
                      { icon: "Mail", text: "info@bars-stroy.ru" },
                      { icon: "Clock", text: "Пн–Пт: 9:00 – 18:00" },
                    ].map((item) => (
                      <div key={item.text} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <Icon name={item.icon} size={16} style={{ color: "var(--bars-orange)", flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: "rgba(245,245,245,0.8)" }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "var(--bars-dark-3)", padding: "24px 32px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h4 style={{ fontFamily: "Oswald, sans-serif", fontSize: 14, marginBottom: 14, color: "var(--bars-gray)", letterSpacing: "0.1em" }}>РЕГИОНЫ ПРИСУТСТВИЯ</h4>
                  {["Москва и МО", "Тверская область", "Калужская область", "Тульская область"].map((r) => (
                    <div key={r} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                      <div style={{ width: 8, height: 8, background: "var(--bars-orange)", borderRadius: "50%", flexShrink: 0 }} />
                      <span style={{ fontSize: 14 }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
            <Section>
              <div style={{ height: 480, overflow: "hidden", border: "2px solid rgba(74,154,186,0.3)" }}>
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=37.617698%2C55.755864&z=9&l=map&pt=37.617698%2C55.755864%2Cpm2rdm&text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0"
                  width="100%" height="100%" frameBorder="0"
                  title="Местоположение ООО БАРС"
                  style={{ display: "block" }}
                />
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" style={{ padding: "100px 24px", background: "var(--bars-dark)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Section>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ color: "var(--bars-orange)", fontSize: 12, letterSpacing: "0.2em", fontFamily: "Oswald, sans-serif", marginBottom: 16 }}>СВЯЖИТЕСЬ С НАМИ</div>
              <h2 style={{ fontSize: 52, fontWeight: 700 }}>ОСТАВЬТЕ <span style={{ color: "var(--bars-orange)" }}>ЗАЯВКУ</span></h2>
              <p style={{ color: "var(--bars-gray)", marginTop: 16, fontSize: 16 }}>Перезвоним в течение 15 минут и бесплатно проконсультируем</p>
            </div>
          </Section>
          <div className="contacts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
            <Section>
              <form style={{ background: "var(--bars-dark-3)", padding: 48, border: "1px solid rgba(74,154,186,0.2)", borderTop: "4px solid var(--bars-orange)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    { label: "Ваше имя", placeholder: "Иван Петров", type: "text" },
                    { label: "Телефон", placeholder: "+7 (___) ___-__-__", type: "tel" },
                    { label: "Тип объекта", placeholder: "Жилой дом, офис, склад...", type: "text" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label style={{ display: "block", fontSize: 11, letterSpacing: "0.12em", color: "var(--bars-gray)", marginBottom: 8, fontFamily: "Oswald, sans-serif", textTransform: "uppercase" }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} style={{
                        width: "100%", background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)", padding: "14px 16px",
                        color: "var(--bars-light)", fontSize: 15, fontFamily: "Roboto, sans-serif",
                        outline: "none", transition: "border-color 0.2s",
                      }}
                        onFocus={e => (e.target.style.borderColor = "var(--bars-orange)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: 11, letterSpacing: "0.12em", color: "var(--bars-gray)", marginBottom: 8, fontFamily: "Oswald, sans-serif", textTransform: "uppercase" }}>Описание проекта</label>
                    <textarea placeholder="Кратко опишите ваш проект..." rows={4} style={{
                      width: "100%", background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)", padding: "14px 16px",
                      color: "var(--bars-light)", fontSize: 15, fontFamily: "Roboto, sans-serif",
                      outline: "none", resize: "vertical", transition: "border-color 0.2s",
                    }}
                      onFocus={e => (e.target.style.borderColor = "var(--bars-orange)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <button type="submit" className="btn-shine" style={{
                    background: "var(--bars-orange)", color: "#0D0D0D",
                    border: "none", padding: "18px", cursor: "pointer",
                    fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: "0.1em", textTransform: "uppercase",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--bars-orange-light)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "var(--bars-orange)")}
                  >Отправить заявку →</button>
                </div>
              </form>
            </Section>
            <Section>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  { icon: "Phone", title: "Телефон", value: "+7 (495) 000-00-00", sub: "Звонки: Пн–Пт 9:00–18:00" },
                  { icon: "MessageCircle", title: "WhatsApp / Telegram", value: "+7 (905) 000-00-00", sub: "Отвечаем быстро" },
                  { icon: "Mail", title: "Электронная почта", value: "info@bars-stroy.ru", sub: "Для официальной переписки" },
                  { icon: "MapPin", title: "Адрес офиса", value: "г. Москва, ул. Строительная, 15", sub: "По предварительной записи" },
                ].map((c) => (
                  <div key={c.title} className="card-hover" style={{
                    background: "var(--bars-dark-3)", padding: "28px 32px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", gap: 20, alignItems: "center",
                  }}>
                    <div style={{ width: 56, height: 56, background: "rgba(74,154,186,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(74,154,186,0.3)" }}>
                      <Icon name={c.icon} size={24} style={{ color: "var(--bars-orange)" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "var(--bars-gray)", letterSpacing: "0.1em", marginBottom: 4, fontFamily: "Oswald, sans-serif", textTransform: "uppercase" }}>{c.title}</div>
                      <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{c.value}</div>
                      <div style={{ fontSize: 12, color: "var(--bars-gray)" }}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060c14", borderTop: "1px solid rgba(74,154,186,0.3)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: "var(--bars-orange)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="58" rx="28" ry="22" fill="#0d1520"/>
                <ellipse cx="50" cy="55" rx="24" ry="19" fill="#1a2a3a"/>
                <ellipse cx="38" cy="62" rx="6" ry="4" fill="#0d1520"/>
                <ellipse cx="62" cy="62" rx="6" ry="4" fill="#0d1520"/>
                <ellipse cx="38" cy="61" rx="4" ry="3" fill="#4a9aba" opacity="0.7"/>
                <ellipse cx="62" cy="61" rx="4" ry="3" fill="#4a9aba" opacity="0.7"/>
                <ellipse cx="50" cy="65" rx="5" ry="3" fill="#c084a0"/>
                <ellipse cx="44" cy="59" rx="2" ry="2.5" fill="#e8f2f8"/>
                <ellipse cx="56" cy="59" rx="2" ry="2.5" fill="#e8f2f8"/>
                <ellipse cx="44.8" cy="59.8" rx="1" ry="1.2" fill="#0d1520"/>
                <ellipse cx="56.8" cy="59.8" rx="1" ry="1.2" fill="#0d1520"/>
                <path d="M30 48 Q28 38 24 32 Q30 36 34 46" fill="#1a2a3a"/>
                <path d="M70 48 Q72 38 76 32 Q70 36 66 46" fill="#1a2a3a"/>
                <line x1="36" y1="63" x2="24" y2="61" stroke="#e8f2f8" strokeWidth="1.2" opacity="0.6"/>
                <line x1="36" y1="65" x2="22" y2="65" stroke="#e8f2f8" strokeWidth="1.2" opacity="0.6"/>
                <line x1="36" y1="67" x2="24" y2="70" stroke="#e8f2f8" strokeWidth="1.2" opacity="0.6"/>
                <line x1="64" y1="63" x2="76" y2="61" stroke="#e8f2f8" strokeWidth="1.2" opacity="0.6"/>
                <line x1="64" y1="65" x2="78" y2="65" stroke="#e8f2f8" strokeWidth="1.2" opacity="0.6"/>
                <line x1="64" y1="67" x2="76" y2="70" stroke="#e8f2f8" strokeWidth="1.2" opacity="0.6"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 16 }}>ООО БАРС</div>
              <div style={{ fontSize: 11, color: "var(--bars-gray)" }}>© 2008–2026. Все права защищены</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {nav.map((item, i) => (
              <button key={item} onClick={() => scrollTo(navIds[i])} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "Oswald, sans-serif", fontSize: 13, color: "var(--bars-gray)",
                textTransform: "uppercase", letterSpacing: "0.08em", transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--bars-orange)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--bars-gray)")}
              >{item}</button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "var(--bars-gray)" }}>ИНН: 0000000000 | ОГРН: 000000000000</div>
        </div>
      </footer>
    </div>
  );
}