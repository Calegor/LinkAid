import { useState } from "react";
import {
  Link2, Zap, Cpu, BarChart3, ShieldCheck, Globe,
  Layers, Smartphone, X,
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  name: string;
  desc: string;
  tech: string;
}

const AboutFeaturesOrbit = () => {
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const features = [
    { icon: <Link2 size={24} />, name: "Canais", desc: "Integração total com WhatsApp, Instagram e E-mail em um só lugar.", tech: "Omnichannel v2" },
    { icon: <Zap size={24} />, name: "Real-time", desc: "Processamento de dados instantâneo para respostas imediatas.", tech: "Websockets Low-Latency" },
    { icon: <Cpu size={24} />, name: "IA Triagem", desc: "Nossa IA analisa a urgência de cada ticket automaticamente.", tech: "LLM Custom Training" },
    { icon: <BarChart3 size={24} />, name: "Analytics", desc: "Dashboards preditivos para antecipar gargalos na operação.", tech: "Data Viz High-Res" },
    { icon: <ShieldCheck size={24} />, name: "Segurança", desc: "Criptografia de ponta a ponta em todos os dados sensíveis.", tech: "ISO 27001 Ready" },
    { icon: <Globe size={24} />, name: "Global", desc: "Infraestrutura resiliente preparada para escala mundial.", tech: "Edge Computing" },
    { icon: <Layers size={24} />, name: "Modular", desc: "Ative apenas os módulos que sua equipe realmente precisa.", tech: "Microservices Based" },
    { icon: <Smartphone size={24} />, name: "Mobile", desc: "Gerencie toda a sua operação na palma da sua mão.", tech: "Native Performance" },
  ];

  const handleFeatureClick = (feature: Feature) => {
    setActiveFeature(feature);
    setIsPaused(true);
  };

  const closeCard = () => {
    setActiveFeature(null);
    setIsPaused(false);
  };

  return (
    <section className="w-full pt-12 pb-24 lg:pt-24 lg:pb-32 bg-white relative">
      {/* 🌌 Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="container mx-auto px-6 max-w-[1200px] relative z-10 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start overflow-visible">
          
          {/* 🎡 LADO ESQUERDO: ÓRBITA */}
          <div className="flex items-center justify-center lg:justify-start relative mt-16 lg:-mt-16 lg:h-[550px] order-2 lg:order-1">
            {/* 🛠️ Escala aumentada para 110 no mobile para ficar maior */}
            <div className="relative flex items-center justify-center scale-110 sm:scale-100 lg:scale-110">
              <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] flex items-center justify-center">
                
                {/* Core Central (Círculo Clean) */}
                <div className="relative z-10 w-16 h-16 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                    <Zap size={32} className="text-blue-600 fill-blue-600" />
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20" />
                </div>

                <div className="absolute inset-0 border border-slate-100 rounded-full pointer-events-none" />

                <div className={`absolute inset-0 animate-orbit-spin ${isPaused ? "pause-animation" : ""}`}>
                  {features.map((feature, index) => {
                    const angle = (index * 360) / features.length;
                    const isActive = activeFeature?.name === feature.name;

                    return (
                      <div
                        key={index}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer orbit-item"
                        style={{
                          transform: `rotate(${angle}deg) translate(var(--orbit-radius)) rotate(-${angle}deg)`,
                        }}
                      >
                        <div
                          onClick={() => handleFeatureClick(feature)}
                          className={`animate-orbit-spin-reverse ${isPaused ? "pause-animation" : ""}`}
                        >
                          <div className={`w-10 h-10 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 animate-soft-pulse
                            ${isActive 
                                ? "bg-blue-600 text-white shadow-[0_15px_30px_rgba(37,99,235,0.3)] scale-125 border-none" 
                                : "bg-white border border-slate-100 text-slate-400 hover:border-blue-400 hover:text-blue-600 shadow-sm hover:scale-110"}`}>
                            {feature.icon}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ✍️ LADO DIREITO: TÍTULO + CARD */}
          <div className="flex flex-col text-center lg:text-right items-center lg:items-end order-1 lg:order-2 lg:pt-10 overflow-visible">
            <div className="flex flex-col gap-4 mb-6 lg:mb-8">
              <h2 className="text-[12vw] sm:text-[9vw] md:text-[6vw] lg:text-[4.5vw] font-bold text-slate-950 tracking-tighter leading-[0.85] md:leading-[0.85] lg:leading-[0.8]">
                O resultado é <br className="lg:hidden" />
                <span className="text-blue-600 font-light mr-2 lg:mr-4 ">dinâmico.</span>
              </h2>

              <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed tracking-tight max-w-[480px] mx-auto lg:mr-0 mt-2">
                Interaja com os módulos para entender como nossa tecnologia impulsiona sua comunicação.
              </p>
            </div>

            {/* AREA DO CARD */}
            <div className="flex flex-col w-full max-w-[480px] lg:max-w-none min-h-fit mb-6 lg:mb-0 overflow-visible">
              {activeFeature ? (
                <div className="w-full animate-in fade-in slide-in-from-right-6 duration-500 overflow-visible">
                  <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-[0_40px_80px_rgba(0,0,0,0.12)] relative overflow-hidden group text-left">
                    <button onClick={closeCard} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors focus:outline-none">
                      <X size={20} className="cursor-pointer" />
                    </button>
                    <div className="flex items-center gap-5 mb-6">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shrink-0">
                        {activeFeature.icon}
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-slate-900 text-2xl font-bold tracking-tight leading-none">{activeFeature.name}</h3>
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mt-2">{activeFeature.tech}</span>
                      </div>
                    </div>
                    <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed tracking-tight">
                      {activeFeature.desc}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center lg:items-end gap-4 py-4 opacity-40">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-bold">Aguardando seleção</span>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default AboutFeaturesOrbit;