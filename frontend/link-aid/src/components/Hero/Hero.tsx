import { useRef, type FC } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface HeroProps {
  activeSection: string;
}

const Hero: FC<HeroProps> = ({ activeSection }) => {
  const container = useRef<HTMLDivElement>(null);

  const content = {
    sec1: {
      title: "Otimizar conexões",
      highlight: "conexões",
      description:
        "Organize sua operação e acabe com a fragmentação de dados. Centralizamos tudo o que sua organização precisa em um conector inteligente.",
    },
    sec2: {
      title: "Gerar impacto",
      highlight: "impacto",
      description:
        "Meça e comprove os resultados do seu trabalho de forma transparente. Transformamos atividades em dados estratégicos para prestação de contas.",
    },
    sec3: {
      title: "Escalar soluções",
      highlight: "soluções",
      description:
        "Construa uma estrutura pronta para crescer de forma sustentável. Nossa tecnologia garante performance e eficiência para qualquer tamanho de operação.",
    },
  };

  const current =
    content[activeSection as keyof typeof content] || content.sec1;

  useGSAP(
    () => {
      if (!container.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".char-reveal",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, delay: 0.2 },
      )
        .fromTo(
          ".hero-line-animated",
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1,
            ease: "expo.inOut",
            transformOrigin: "left center",
          },
          "-=0.7",
        )
        .fromTo(
          ".hero-description-reveal",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5",
        );

      gsap.fromTo(
        ".hero-button-fixed",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 1, ease: "back.out(1.7)" },
      );
    },
    { scope: container, dependencies: [activeSection] },
  );

  const splitTitle = (text: string, highlight: string) => {
    return text.split(" ").map((word, index) => {
      const isHighlighted = word.toLowerCase() === highlight.toLowerCase();
      return (
        <span
          key={index}
          className="inline-block overflow-hidden pb-1 mr-[0.2em]"
        >
          <span
            className={`char-reveal inline-block ${isHighlighted ? "text-blue-600 font-bold" : ""}`}
          >
            {word}
          </span>
        </span>
      );
    });
  };

  return (
    <div ref={container} className="flex flex-col gap-10 max-w-[520px]">
      <h1 className="text-[12vw] sm:text-[8vw] md:text-[3.5vw] lg:text-[3.2vw] leading-[1.05] tracking-tighter text-slate-950 font-semibold">
        {splitTitle(current.title, current.highlight)}
        <br />
        <span className="char-reveal inline-block font-light text-slate-400">
          é o nosso código.
        </span>
      </h1>

      <div className="hero-line-animated w-full h-[6px] bg-gradient-to-r from-green-400 via-green-500 to-green-300 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)]"></div>

      <p className="hero-description-reveal text-base md:text-lg text-slate-600 font-light leading-snug tracking-tight max-w-[480px]">
        {current.description}
      </p>

      <a
        href="/solucao"
        className="hero-button-fixed group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all duration-500 w-fit shadow-lg shadow-blue-600/20 active:scale-95"
      >
        <span className="tracking-tight">Acessar Solução</span>
        <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
          <ArrowUpRight size={20} />
        </span>
      </a>
    </div>
  );
};
export default Hero;
