import { useRef, type FC } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FinalShowCase: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".reveal-text", {
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          y: 150,
          rotateX: 10,
          scale: 0.9,
          filter: "blur(20px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 2.5,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            end: "top 10%",
            scrub: 1.8,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative w-full h-auto bg-white flex flex-col items-center justify-center overflow-hidden pt-16 md:pt-28 pb-16 md:pb-24"
    >
      <div className="container mx-auto px-6 z-20 text-center mb-16 md:mb-24 max-w-[90%] md:max-w-[700px] lg:max-w-[850px]">
        <h2 className="reveal-text text-[10vw] sm:text-[8vw] md:text-[4.5vw] lg:text-[4vw] leading-[1.05] font-semibold text-slate-950 tracking-tighter mb-6">
          Tudo o que você precisa,
          <br className="hidden sm:block" />
          <span className="text-blue-600 font-light sm:whitespace-nowrap">
            {" "}
            em uma única tela.
          </span>
        </h2>

        <p className="reveal-text text-base md:text-lg lg:text-xl text-slate-600 font-light leading-snug tracking-tight max-w-[550px] mx-auto opacity-90">
          Dê uma olhada em como transformamos dados complexos em uma navegação
          simples. Abaixo, uma prévia de como sua organização será gerenciada.
        </p>
      </div>

      <div className="relative w-full max-w-[1450px] px-4 md:px-12 z-10 perspective-1000 mb-16 md:mb-20">
        <div
          ref={imageRef}
          className="relative w-full rounded-2xl overflow-hidden border border-slate-100 bg-white"
          style={{
            boxShadow:
              "0 -50px 70px -30px rgba(0, 0, 0, 0.1), 0 -15px 30px -15px rgba(0, 0, 0, 0.08), 0 80px 120px -40px rgba(0, 0, 0, 0.15), 0 30px 60px -20px rgba(0, 0, 0, 0.12), 0 0 15px 3px rgba(0,0,0,0.02)",
          }}
        >
          <div className="flex items-center gap-3 px-6 h-11 border-b border-slate-100 bg-slate-50 relative z-10">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#FEBC2E] border border-[#D8A120]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#28C840] border border-[#1FA133]" />
            </div>
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12.5px] font-medium text-slate-600 tracking-tight">
              Painel LinkAid - Dashboard
            </p>
          </div>

          {/* img desktop */}
          <img
            src="/image.png"
            alt="Interface Desktop"
            className="hidden md:block w-full h-auto object-cover object-top opacity-100"
          />

          {/* img mobile */}
          <img
            src="/image2.png"
            alt="Interface Mobile"
            className="block md:hidden w-full h-auto object-cover object-top opacity-100"
          />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-blue-400/5 blur-[150px] -z-10 rounded-full" />
      </div>

      <a
        href="/solucao"
        className="hero-button-fixed group inline-flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all duration-500 w-fit shadow-lg shadow-blue-600/20 active:scale-95"
      >
        <span className="tracking-tight text-sm md:text-base">
          Ver Painel Completo
        </span>
        <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
          <ArrowUpRight size={18} className="md:w-[20px] md:h-[20px]" />
        </span>
      </a>
    </section>
  );
};

export default FinalShowCase;
