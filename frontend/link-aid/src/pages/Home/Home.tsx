import HomeLayout from "../../Layout/HomeLayout";
import { Link2, BarChart3, Rocket, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <HomeLayout>
      <div className="relative w-full overflow-hidden mt-[-50px] bg-white">
        {/* line */}
        <div className="absolute left-6 md:left-16 top-0 bottom-0 w-[2px] z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-green-500 to-indigo-700 opacity-20"></div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
        </div>

        <div className="relative z-10 flex flex-col px-4 sm:px-8 md:px-8 max-w-[1400px] mx-auto">
          {/* connections */}
          <section
            id="sec1"
            className="relative min-h-0 sm:min-h-[80vh] md:min-h-[80vh] flex items-start sm:items-center md:items-center pl-8 sm:pl-20 md:pl-20 group py-20 sm:pt-32 md:pt-32"
          >
            <div className="absolute z-20 w-4 h-4 rounded-full bg-white border-[3px] border-blue-600 shadow-lg transition-all duration-500 group-hover:scale-125 top-1/2 -translate-y-1/2 left-[0px] sm:left-[-15px] md:left-[25px] lg:left-[25px] xl:left-[25px]"></div>

            <div
              className="w-full bg-white border border-slate-100 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700 md:group-hover:-translate-y-2 p-6 sm:p-10 md:p-10
              max-w-xl 
              sm:max-w-[650px] 
              md:max-w-[650px]
            "
            >
              <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4 sm:gap-0">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                  <Link2 size={24} className="md:w-[26px]" />
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  ORGANIZAÇÃO
                </span>
              </header>

              <h2 className="font-semibold text-slate-950 mb-4 tracking-tight leading-tight text-2xl sm:text-3xl md:text-3xl">
                Conexões Centralizadas
              </h2>

              <p className="text-slate-600 leading-snug tracking-tight font-light mb-8 md:mb-10 opacity-90 text-base sm:text-lg md:text-lg">
                Chega de informações espalhadas em várias planilhas. Unimos
                todas as partes do seu projeto em um único lugar para que o
                trabalho flua sem erros.
              </p>

              <button className="w-full sm:w-fit flex items-center justify-center gap-3 text-blue-600 bg-blue-100 p-4 rounded-full font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all cursor-pointer">
                Explorar Solução <ArrowRight size={16} />
              </button>
            </div>
          </section>

          {/* results */}
          <section
            id="sec2"
            className="relative min-h-0 sm:min-h-[80vh] md:min-h-[80vh] flex items-start sm:items-center md:items-center pl-8 sm:pl-20 md:pl-20 group py-20 sm:pt-32 md:pt-32"
          >
            <div className="absolute z-20 w-4 h-4 rounded-full bg-white border-[3px] border-green-500 shadow-lg transition-all duration-500 group-hover:scale-125 top-1/2 -translate-y-1/2 left-[0px] sm:left-[-15px] md:left-[25px] lg:left-[25px] xl:left-[25px]"></div>

            <div className="w-full bg-white border border-slate-100 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-6 sm:p-10 md:p-10 max-w-xl sm:max-w-[650px] md:max-w-[650px]">
              <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4 sm:gap-0">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shadow-inner">
                  <BarChart3 size={24} className="md:w-[26px]" />
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  RESULTADOS
                </span>
              </header>

              <h2 className="font-semibold text-slate-950 mb-4 tracking-tight leading-tight text-2xl sm:text-3xl md:text-3xl">
                Impacto Visual
              </h2>
              <p className="text-slate-600 leading-snug tracking-tight font-light mb-8 md:mb-10 opacity-90 text-base sm:text-lg md:text-lg">
                Mostramos o resultado real do seu trabalho com gráficos
                intuitivos. Assim, fica fácil tomar decisões e mostrar o valor
                do que você faz.
              </p>

              <button className="w-full sm:w-fit flex items-center justify-center gap-3 text-green-600 bg-green-100 p-4 rounded-full font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all cursor-pointer">
                Conhecer Painel <ArrowRight size={16} />
              </button>
            </div>
          </section>

          {/* tech */}
          <section
            id="sec3"
            className="relative min-h-0 sm:min-h-[80vh] md:min-h-[80vh] flex items-start sm:items-center md:items-center pl-8 sm:pl-20 md:pl-20 group py-20 sm:pt-32 md:pt-32"
          >
            <div className="absolute z-20 w-4 h-4 rounded-full bg-white border-[3px] border-indigo-700 shadow-lg top-1/2 -translate-y-1/2 left-[0px] sm:left-[-15px] md:left-[25px] lg:left-[25px] xl:left-[25px]"></div>

            <div className="w-full bg-white border border-slate-100 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-6 sm:p-10 md:p-10 max-w-xl sm:max-w-[650px] md:max-w-[650px]">
              <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4 sm:gap-0">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                  <Rocket size={24} className="md:w-[26px]" />
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  TECNOLOGIA
                </span>
              </header>

              <h2 className="font-semibold text-slate-950 mb-4 tracking-tight leading-tight text-2xl sm:text-3xl md:text-3xl">
                Soluções Escaláveis
              </h2>
              <p className="text-slate-600 leading-snug tracking-tight font-light mb-8 md:mb-10 opacity-90 text-base sm:text-lg md:text-lg">
                Nosso sistema acompanha o seu ritmo. Se o seu projeto crescer
                hoje ou amanhã, nossa tecnologia garante performance constante.
              </p>

              <button className="w-full sm:w-fit flex items-center justify-center gap-3 text-indigo-600 bg-indigo-100 p-4 rounded-full font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all cursor-pointer">
                Saber Mais <ArrowRight size={16} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </HomeLayout>
  );
};
export default Home;
