import { ArrowRight, Globe, ShieldCheck, Target } from "lucide-react";
import "../../index.css";

const AboutProject = () => {
  return (
    /* padding and section alignment to match aboutmeaning */
    <section className="w-full pt-20 pb-12 lg:pt-32 lg:pb-0 bg-white overflow-hidden relative">
      {/* background depth mist */}
      <div className="absolute top-0 left-[-10%] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-blue-100/30 blur-[80px] lg:blur-[120px] rounded-full pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-[-10%] w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-indigo-50/40 blur-[80px] lg:blur-[100px] rounded-full pointer-events-none -z-0" />

      {/* subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* left side: concept */}
          <div className="flex flex-col text-left lg:text-left order-1">
            <div className="flex flex-col gap-4 mb-10 items-center lg:items-start">
              {/* title: using the exact same fluid scale and line height */}
              <h2 className="text-[12vw] sm:text-[9vw] md:text-[6vw] lg:text-[4.5vw] font-bold text-slate-950 tracking-tighter leading-[0.85] md:leading-[0.85] lg:leading-[0.8] text-center lg:text-left">
                Simples. <br className="lg:hidden" />
                <span className="text-blue-600 font-light ml-2 lg:ml-0">
                  Conectado.
                </span>
              </h2>

              {/* paragraph: matching aboutmeaning mt and max-w */}
              <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed tracking-tight max-w-[480px] mx-auto lg:mx-0 text-center lg:text-left mt-4">
                Nossa essência é facilitar o dia a dia, eliminando barreiras
                para que você foque no que realmente importa.
              </p>
            </div>

            {/* technical features grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-4">
              {/* card 1: scalability */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm transition-all duration-500 group-hover:border-blue-200 group-hover:shadow-md mb-4">
                  <Target size={22} strokeWidth={1.5} />
                </div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] mb-2">
                  Escalabilidade
                </h4>
                <p className="text-slate-400 text-[14px] leading-relaxed font-light">
                  Feito para crescer junto com você.
                </p>
              </div>

              {/* card 2: security */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm transition-all duration-500 group-hover:border-blue-200 group-hover:shadow-md mb-4">
                  <ShieldCheck size={22} strokeWidth={1.5} />
                </div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] mb-2">
                  Segurança
                </h4>
                <p className="text-slate-400 text-[14px] leading-relaxed font-light">
                  Proteção moderna para seus dados.
                </p>
              </div>

              {/* card 3: universality */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm transition-all duration-500 group-hover:border-blue-200 group-hover:shadow-md mb-4">
                  <Globe size={22} strokeWidth={1.5} />
                </div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] mb-2">
                  Para Todos
                </h4>
                <p className="text-slate-400 text-[14px] leading-relaxed font-light">
                  Interface intuitiva e acessível.
                </p>
              </div>
            </div>
          </div>

          {/* right side: manifesto card */}
          <div className="flex flex-col w-full order-2">
            <div className="relative p-8 lg:p-12">
              <div className="relative">
                <p className="text-xl lg:text-3xl font-medium text-slate-800 leading-tight tracking-tight mb-8 text-center lg:text-left">
                  Desenhamos cada detalhe pensando em clareza, segurança e
                  acessibilidade para todos.
                </p>
                <div className="h-[1px] w-full bg-slate-100 mb-8" />
                <p className="text-slate-500 text-sm lg:text-lg font-light leading-relaxed text-center lg:text-left">
                  Criamos uma estrutura inteligente que organiza dados
                  espalhados em informações claras. Um ambiente seguro e fluido,
                  desenhado para acompanhar o ritmo do seu dia a dia.
                </p>

                {/* cta button */}
                <div className="flex justify-center lg:justify-start pt-8">
                  <button className="flex items-center gap-3 text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] group cursor-pointer">
                    Explorar Documentação
                    <div className="w-10 h-10 rounded-full border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
