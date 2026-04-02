import HomeLayout from "../../Layout/HomeLayout";
import { Link2, BarChart3, Rocket, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <HomeLayout>
      <div className="relative w-full overflow-hidden bg-white">
        {/* timeline line */}
        <div className="absolute left-10 md:left-16 top-0 bottom-0 w-[2px] z-0 overflow-hidden">
          {/* gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-green-500 to-indigo-700 opacity-20"></div>

          {/* fades */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
        </div>

        <div className="relative z-10 flex flex-col px-6 md:px-16">
          {/* connections */}
          <section
            id="sec1"
            className="relative min-h-screen flex items-center pl-12 md:pl-24 group md:-mt-10"
          >
            {/* node timeline */}
            <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-blue-600 shadow-lg z-20 transition-all duration-500 group-hover:scale-125 group-hover:shadow-blue-600/30"></div>

            {/* card */}
            <div className="w-full max-w-xl p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700 group-hover:-translate-y-2">
              <header className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                  <Link2 size={26} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  ORGANIZAÇÃO
                </span>
              </header>

              <h2 className="text-3xl font-semibold text-slate-950 mb-4 tracking-tight leading-tight">
                Conexões Centralizadas
              </h2>

              <p className="text-slate-600 text-lg leading-snug tracking-tight font-light mb-10 opacity-90">
                Chega de informações espalhadas em várias planilhas. Unimos
                todas as partes do seu projeto em um único lugar para que o
                trabalho flua sem erros.
              </p>

              <button className="flex items-center gap-3 text-blue-600 bg-blue-100 p-4 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all cursor-pointer">
                Explorar Solução <ArrowRight size={16} />
              </button>
            </div>
          </section>

          {/* impact */}
          <section
            id="sec2"
            className="relative min-h-screen flex items-center pl-12 md:pl-24 group"
          >
            {/* node timeline */}
            <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-green-500 shadow-lg z-20 transition-all duration-500 group-hover:scale-125 group-hover:shadow-green-500/30"></div>

            <div className="w-full max-w-xl p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700 group-hover:-translate-y-2">
              <header className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shadow-inner">
                  <BarChart3 size={26} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  RESULTADOS
                </span>
              </header>

              <h2 className="text-3xl font-semibold text-slate-950 mb-4 tracking-tight leading-tight">
                Impacto Visual
              </h2>
              <p className="text-slate-600 text-lg leading-snug tracking-tight font-light mb-10 opacity-90">
                Mostramos o resultado real do seu trabalho com gráficos
                intuitivos. Assim, fica fácil tomar decisões e mostrar o valor
                do que você faz.
              </p>

              <button className="flex items-center gap-3 text-green-600 bg-green-100 p-4 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all cursor-pointer">
                Conhecer Painel <ArrowRight size={16} />
              </button>
            </div>
          </section>

          {/* scalability */}
          <section
            id="sec3"
            className="relative min-h-screen flex items-center pl-12 md:pl-24 group"
          >
            {/* node timeline */}
            <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-indigo-700 shadow-lg z-20 transition-all duration-500 group-hover:scale-125 group-hover:shadow-indigo-700/30"></div>

            <div className="w-full max-w-xl p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700 group-hover:-translate-y-2">
              <header className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                  <Rocket size={26} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  TECNOLOGIA
                </span>
              </header>

              <h2 className="text-3xl font-semibold text-slate-950 mb-4 tracking-tight leading-tight">
                Soluções Escaláveis
              </h2>
              <p className="text-slate-600 text-lg leading-snug tracking-tight font-light mb-10 opacity-90">
                Nosso sistema acompanha o seu ritmo. Se o seu projeto crescer
                hoje ou amanhã, nossa tecnologia garante performance constante.
              </p>

              <button className="flex items-center gap-3 text-indigo-600 bg-indigo-100 p-4 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all cursor-pointer">
                Saber Mais <ArrowRight size={16} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </HomeLayout>
  );
}
export default Home;