import { Link } from "react-router-dom";
import {
  Camera,
  GitFork,
  Code,
  Heart,
  ArrowUpRight,
  ChevronUp,
} from "lucide-react";
import logo from "../../assets/logo2.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full px-4 pb-10 md:px-10 mt-20 font-sans">
      {/* layout glassmorphism */}
      <div className="max-w-[1300px] mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] p-6 md:p-10 shadow-2xl">
        {/* grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* branding */}
          <div className="col-span-2 lg:col-span-1 bg-white/5 rounded-[2rem] p-6 border border-white/10 flex flex-col items-center lg:items-start justify-between min-h-[160px] text-center lg:text-left">
            <img src={logo} alt="LinkAid" className="h-7 w-fit opacity-90" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-4 leading-snug">
              Otimizando conexões <br /> via código social.
            </p>
            <div className="flex gap-2 mt-4">
              {[
                <Camera size={14} />,
                <GitFork size={14} />,
                <Code size={14} />,
              ].map((icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-slate-900/5 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* links */}
          <div className="p-6 flex flex-col items-start lg:items-start gap-3 pl-[20%] lg:pl-6 text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600/80">
              Navegar
            </h3>
            <nav className="flex flex-col gap-2 w-full">
              {["Sobre", "Equipe", "Solução"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="group flex items-center justify-between gap-4 text-[13px] font-medium text-slate-700 hover:text-blue-600 transition-all pr-10 lg:pr-0 tracking-tight"
                >
                  {item}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-all"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* support */}
          <div className="p-6 flex flex-col items-start lg:items-start gap-3 pl-[20%] lg:pl-6 text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80">
              Ajuda
            </h3>
            <nav className="flex flex-col gap-2 w-full">
              {["FAQ", "Contato", "Docs"].map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="group flex items-center justify-between gap-4 text-[13px] font-medium text-slate-700 hover:text-green-600 transition-all pr-10 lg:pr-0 tracking-tight"
                >
                  {item}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-all"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* back to top */}
          <div className="col-span-2 lg:col-span-1 border border-white/5 flex items-center justify-center min-h-[160px] group transition-all duration-500">
            <button
              onClick={scrollToTop}
              className="flex flex-col items-center gap-3 transition-all duration-300 group-hover:-translate-y-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/50 backdrop-blur-sm shadow-sm border border-white/20 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500 cursor-pointer">
                <ChevronUp size={20} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-600 transition-colors">
                Topo
              </span>
            </button>
          </div>
        </div>

        {/* credits */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center md:text-left">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-loose">
                Desenvolvimento:{" "}
                <span className="text-slate-400 font-medium">
                  Julia Guimarães, Thiago Gramorelli & Julia Spanopoulos
                </span>
              </p>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                Design:{" "}
                <span className="text-slate-400 font-medium tracking-tight">
                  Julia Guimarães
                </span>
              </p>
            </div>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <a
                href="#"
                className="hover:text-blue-600 transition tracking-tight"
              >
                Termos
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition tracking-tight"
              >
                Privacidade
              </a>
              <div className="flex items-center gap-1.5 text-slate-300 ml-2 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                © {currentYear} •{" "}
                <Heart
                  size={10}
                  className="fill-red-500 text-red-500 animate-pulse"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
