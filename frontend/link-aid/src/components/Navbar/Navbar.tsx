import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Home,
  Info,
  Users,
  HelpCircle,
  Mail,
  Lightbulb,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";
import logo from "../../assets/logo2.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power4.out",
        visibility: "visible",
      });
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        visibility: "visible",
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power4.in",
        onComplete: () => {
          gsap.set(menuRef.current, { visibility: "hidden" });
        },
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(overlayRef.current, { visibility: "hidden" });
        },
      });
    }
  }, [isMenuOpen]);

  const menuLinks = [
    { name: "Home", to: "/", icon: <Home size={18} /> },
    { name: "Sobre", to: "/sobre", icon: <Info size={18} /> },
    { name: "Equipe", to: "/equipe", icon: <Users size={18} /> },
    { name: "Solução", to: "/solucao", icon: <Lightbulb size={18} /> },
    { name: "FAQ", to: "/faq", icon: <HelpCircle size={18} /> },
    { name: "Contato", to: "/contato", icon: <Mail size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 pt-6 md:px-10 font-sans">
      {/* layout glassmorphism */}
      <div
        className={`max-w-[1300px] mx-auto h-20 px-8 flex items-center justify-between rounded-[2rem] transition-all duration-500 shadow-2xl relative z-[120] ${
          isMenuOpen
            ? "opacity-0 invisible pointer-events-none"
            : "bg-white/10 backdrop-blur-xl border border-white/20 opacity-100 visible"
        }`}
      >
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <img
            src={logo}
            alt="LinkAid"
            className="h-7 md:h-8 transition-all opacity-90"
          />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 font-bold text-[10px] tracking-[0.2em] uppercase text-slate-900/80">
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="hover:text-blue-600 transition-all relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/5 border border-slate-950/10 hover:bg-white transition-all shadow-sm cursor-pointer"
          >
            {isDark ? (
              <Moon size={16} className="text-blue-500" />
            ) : (
              <Sun size={16} className="text-amber-500" />
            )}
          </button>
        </div>
      </div>

      {/* toggle and menu */}
      <button
        onClick={toggleTheme}
        className={`md:hidden fixed top-10 right-[95px] w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 z-[150] shadow-lg cursor-pointer ${
          isMenuOpen
            ? "bg-white/20 backdrop-blur-md"
            : "bg-white border border-slate-200"
        }`}
      >
        {isDark ? (
          <Moon size={18} className="text-blue-400" />
        ) : (
          <Sun size={18} className="text-amber-500" />
        )}
      </button>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-9 right-8 w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-white text-slate-900 border border-slate-200 z-[150] active:scale-90 cursor-pointer"
      >
        <span className="text-xl">{isMenuOpen ? "✕" : "☰"}</span>
      </button>

      <div
        ref={overlayRef}
        onClick={() => setIsMenuOpen(false)}
        className="fixed inset-0 bg-slate-950/10 backdrop-blur-md z-[105]"
        style={{ opacity: 0, visibility: "hidden" }}
      />

      {/* sidebar */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-[75%] max-w-[300px] bg-white/90 backdrop-blur-3xl border-l border-white/20 shadow-2xl z-[110] flex flex-col md:hidden"
        style={{ transform: "translateX(100%)", visibility: "hidden" }}
      >
        <div className="pt-32 pb-10 px-8 flex flex-col h-full">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-10 opacity-70">
            Navegação
          </p>

          <div className="flex flex-col gap-4">
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center justify-between py-2 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 group-hover:text-blue-600 transition-colors">
                    {link.icon}
                  </span>
                  <span className="text-[16px] font-medium text-slate-900 tracking-tight">
                    {link.name}
                  </span>
                </div>
                <ArrowRight
                  size={14}
                  className="text-slate-200 group-hover:text-blue-600 transition-all"
                />
              </Link>
            ))}
          </div>

          <div className="mt-auto text-center border-t border-slate-100 pt-6">
            <p className="text-slate-300 text-[9px] font-bold uppercase tracking-[0.2em]">
              LinkAid • 2026
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
