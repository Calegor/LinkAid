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
      // write effects here
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

      // focus and blur animation for the image
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          filter: "blur(30px)",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
            end: "top 10%",
            scrub: 1.2,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative w-full h-auto bg-white flex flex-col items-center justify-center overflow-hidden pt-16 md:pt-24 pb-12 md:pb-16"
    >
      <div className="container mx-auto px-6 z-20 text-center mb-12 md:mb-20 max-w-[90%] md:max-w-[700px] lg:max-w-[850px]">
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

      {/* image container */}
      <div
        ref={imageRef}
        className="relative w-full h-[45vh] sm:h-[60vh] md:h-[75vh] lg:h-[80vh] z-10 mb-8 md:mb-12"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          maskComposite: "source-in",
          WebkitMaskComposite: "source-in",
        }}
      >
        <img
          src="/image.png"
          alt="Interface do Sistema LinkAid"
          className="w-full h-full object-cover object-top opacity-95"
        />

        {/* blue glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/5 blur-[100px] md:blur-[140px] -z-10" />
      </div>

      {/* bottom */}
      <div className="reveal-text z-20">
        <a
          href="/solucao"
          className="group inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all duration-500 shadow-xl shadow-blue-600/20 active:scale-95"
        >
          <span className="tracking-tight">Acessar Solução</span>
          <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
            <ArrowUpRight size={22} />
          </span>
        </a>
      </div>
    </section>
  );
};
export default FinalShowCase;
