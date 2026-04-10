import { Link } from "react-router-dom";
import {
  Camera,
  GitFork,
  Code,
  Heart,
  ChevronUp,
  MapPin,
  Globe,
  Home,
  Info,
  Users,
  Lightbulb,
  HelpCircle,
  Mail,
} from "lucide-react";
import logo from "../../assets/logo2.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full px-4 pb-10 md:px-10 mt-20 font-sans">
      <div className="max-w-[2000px] mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] p-8 md:p-12 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.25)]">
        {/* grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* branding and slogan */}
          <div className="col-span-1 lg:col-span-2 flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
            <img
              src={logo}
              alt="LinkAid"
              className="h-8 w-auto object-contain opacity-100"
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 leading-relaxed max-w-[280px]">
              Unindo propósitos e simplificando a{" "}
              <span className="text-blue-500">gestão social</span> com
              inteligência e inovação.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-3 pt-2">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 w-full">
                <MapPin size={12} className="text-blue-500" /> São Paulo, Brasil
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 w-full">
                <Globe size={12} className="text-green-500" /> Disponível
                Globalmente
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 w-full">
                <Mail size={12} className="text-blue-500" /> contato@linkaid.com
              </div>
            </div>
          </div>

          {/* navigation and social */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-8 w-full">
            {/* navigation */}
            <div className="flex flex-col items-center lg:items-start gap-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
                Navegar
              </h3>
              <nav className="flex flex-col items-center lg:items-start gap-4">
                {[
                  { label: "Home", path: "/", icon: <Home size={14} /> },
                  { label: "Sobre", path: "/sobre", icon: <Info size={14} /> },
                  {
                    label: "Equipe",
                    path: "/equipe",
                    icon: <Users size={14} />,
                  },
                  {
                    label: "Solução",
                    path: "/solucao",
                    icon: <Lightbulb size={14} />,
                  },
                  {
                    label: "FAQ",
                    path: "/faq",
                    icon: <HelpCircle size={14} />,
                  },
                  {
                    label: "Contato",
                    path: "/contato",
                    icon: <Mail size={14} />,
                  },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="group flex flex-row items-center gap-3 text-[13px] font-medium text-slate-500 hover:text-blue-500 transition-all tracking-tight w-[110px] lg:w-full"
                  >
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10   hover:text-blue-500 transition-all">
                      {item.icon}
                    </span>
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* connect us */}
            <div className="flex flex-col items-center lg:items-start gap-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500">
                Conectar
              </h3>
              <div className="flex flex-col items-center lg:items-start gap-4">
                {[
                  { icon: <Camera size={14} />, label: "Instagram", url: "#" },
                  { icon: <GitFork size={14} />, label: "LinkedIn", url: "#" },
                  {
                    icon: <Code size={14} />,
                    label: "GitHub",
                    url: "https://github.com/Calegor/LinkAid",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-row items-center gap-3 text-[13px] font-medium text-slate-500 hover:text-green-500 transition-all w-[110px] lg:w-full"
                  >
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:text-green-500 transition-all">
                      {social.icon}
                    </span>
                    <span className="whitespace-nowrap">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* top */}
          <div className="col-span-1 flex flex-col items-center lg:items-end justify-center lg:h-full py-8 lg:py-0">
            <button
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-5 transition-all"
            >
              <div className="w-14 h-14 rounded-3xl bg-blue-600 backdrop-blur-sm border border-blue-600 flex items-center justify-center text-white group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-all duration-500 shadow-xl cursor-pointer">
                <ChevronUp size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 transition-colors">
                Voltar ao Topo
              </span>
            </button>
          </div>
        </div>

        {/* credits */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-12">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                  Desenvolvedores
                </span>
                <p className="text-[11px] text-slate-500 font-medium">
                  Julia Guimarães • Thiago Gramorelli • Julia Spanopoulos
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                  Designer
                </span>
                <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                  Julia Guimarães
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-6">
              <div className="flex items-center gap-2 text-slate-500 bg-white/5 px-4 py-2 rounded-full border border-white/10 font-bold text-[11px]">
                © {currentYear} • FEITO COM{" "}
                <Heart
                  size={10}
                  className="fill-red-500 text-red-500 animate-pulse"
                /> ||
                <Link to="/mapa" className="hover:text-blue-500 transition">
                 MAPA DO SITE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
