import { useRef } from "react";
import { Code, Link, User, ChevronsUpDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import developers from "../../data/developers.json";

interface Developer {
  id: number;
  name: string;
  rm: string;
  role: string;
  class: string;
  code: string;
  link: string;
  image: string;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TeamSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getImageUrl = (name: string) => {
    return new URL(`../../assets/images/team/${name}`, import.meta.url).href;
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".reveal-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      /* -mt-27: puxa o componente no mobile (perfeito!)
     lg:mt-0: remove a margem negativa no desktop para não subir demais
     lg:pt-10: adiciona um respiro controlado apenas no topo do desktop
  */
      className="w-full pt-0 -mt-27 lg:mt-0 lg:pt-1 pb-20 lg:pb-32 bg-white overflow-hidden relative"
    >
      {/* background subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-blue-50/30 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        {/* team list: avant-garde layout */}
        <div className="flex flex-col gap-32 lg:gap-64">
          {(developers as Developer[]).map((dev, index) => (
            <div
              key={dev.id}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-32 relative`}
            >
              {/* image side */}
              <div className="reveal-item relative w-full lg:w-[45%] aspect-square overflow-hidden rounded-[3rem] group shadow-2xl bg-slate-50">
                <img
                  src={getImageUrl(dev.image)}
                  alt={dev.name}
                  className="w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-110"
                />
              </div>

              {/* content side: centralized on mobile, left/right on desktop */}
              <div className="reveal-item w-full lg:w-1/2 space-y-8 lg:space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left relative z-10">
                <div className="space-y-4 lg:space-y-2 flex flex-col items-center lg:items-start">
                  {/* labels: centered on mobile */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                      <ChevronsUpDown size={12} className="text-blue-600" />
                      <span className="text-slate-900 text-[10px] font-bold uppercase tracking-widest">
                        {dev.class}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                      <User size={12} className="text-blue-600" />
                      <span className="text-slate-900 text-[10px] font-bold uppercase tracking-widest">
                        {dev.rm}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-[10vw] md:text-[6vw] lg:text-[3.5vw] font-bold text-slate-950 tracking-[-0.05em] leading-[0.85] ">
                    {dev.name}
                  </h4>

                  <p className="text-xl md:text-2xl text-blue-600 font-light tracking-tight leading-none pb-2">
                    {dev.role}
                  </p>
                </div>

                <div className="h-[1px] w-20 bg-blue-600/30" />

                <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed max-w-[480px] tracking-tight pt-2 lg:pt-0 mx-auto lg:mx-0">
                  Responsável pela arquitetura e visão técnica, garantindo que o
                  linkaid entregue excelência e inovação para cada usuário.
                </p>

                {/* 🛠️ APENAS OS BOTÕES: Formato Pílula em Blue e Green */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-8">
                  {/* GITHUB PILL - GREEN */}
                  <a
                    href={dev.code}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500 text-white transition-all duration-300 hover:bg-emerald-600 hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:-translate-y-1"
                  >
                    <Code
                      size={16}
                      className="transition-transform group-hover:scale-110"
                    />
                    <span className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em]">
                      github
                    </span>
                  </a>

                  {/* LINKEDIN PILL - BLUE */}
                  <a
                    href={dev.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 px-6 py-3 rounded-full bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:-translate-y-1"
                  >
                    <Link
                      size={16}
                      className="transition-transform group-hover:scale-110"
                    />
                    <span className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em]">
                      linkedin
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
