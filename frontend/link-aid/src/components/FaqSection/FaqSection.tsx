import { useRef, useState, useMemo } from "react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqData } from "../../data/faq";

interface FaqSectionProps {
  searchTerm: string;
  activeId?: string | null;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FaqSection = ({ searchTerm, activeId }: FaqSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const [prevActiveId, setPrevActiveId] = useState(activeId);
  const [prevSearchTerm, setPrevSearchTerm] = useState(searchTerm);

  const filteredFaqs = useMemo(() => {
    const term = (searchTerm || "").trim().toLowerCase();
    if (term.length < 2) return faqData;
    return faqData.filter(
      (item) =>
        item.question.toLowerCase().includes(term) ||
        item.answer.toLowerCase().includes(term),
    );
  }, [searchTerm]);

  const isNotFound = useMemo(() => {
    const term = (searchTerm || "").trim().toLowerCase();
    return term.length >= 2 && filteredFaqs.length === 0;
  }, [searchTerm, filteredFaqs]);

  if (activeId !== prevActiveId) {
    setPrevActiveId(activeId);
    const index = filteredFaqs.findIndex((item) => item.id === activeId);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }

  if (searchTerm !== prevSearchTerm) {
    setPrevSearchTerm(searchTerm);
    if (!activeId && searchTerm.length >= 2) {
      setSelectedIndex(0);
    }
  }

  useGSAP(
    () => {
      if (!isNotFound && filteredFaqs.length > 0) {
        gsap.fromTo(
          ".faq-item",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
          },
        );
      }
    },
    { scope: containerRef, dependencies: [isNotFound, filteredFaqs.length] },
  );

  const toggleAccordion = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      className="w-full mt-16 md:mt-24 lg:mt-32 pb-0 md:pb-2 lg:pb-1 bg-white relative z-20"
    >
      <div className="container mx-auto max-w-[800px] px-6">
        {isNotFound ? (
          <div className="pt-2 pb-6 lg:pb-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 p-4 sm:p-6 rounded-[2rem] border border-slate-100 w-full">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-sm rounded-full flex items-center justify-center shrink-0">
                  <Search size={18} className="text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm sm:text-base font-bold text-slate-700 leading-tight">
                    Nenhum resultado para{" "}
                    <span className="text-blue-600">"{searchTerm}"</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Tente outras palavras ou limpe a busca.
                  </p>
                </div>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-slate-200 text-sm font-bold text-slate-600 hover:text-white hover:bg-blue-600 transition-all cursor-pointer shrink-0"
              >
                Limpar Busca
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredFaqs.map((item, index) => {
              const isActive = selectedIndex === index;

              return (
                <div
                  key={item.id}
                  id={`faq-item-${item.id}`}
                  className={`faq-item group relative transition-all duration-300 bg-white border-b border-slate-200 overflow-hidden ${isActive ? "pb-2" : ""}`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between py-6 lg:py-8 px-4 lg:px-2 text-left cursor-pointer bg-transparent z-10"
                  >
                    <div className="flex items-center gap-3 lg:gap-5 pr-4">
                      <div
                        className={`shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500"}`}
                      >
                        <HelpCircle size={18} className="lg:w-5 lg:h-5" />
                      </div>

                      <span
                        className={`font-mono text-xs lg:text-sm font-semibold transition-colors duration-300 ${isActive ? "text-blue-600" : "text-slate-300"}`}
                      >
                        {item.id}
                      </span>

                      <h3
                        className={`text-base lg:text-xl font-bold tracking-tight transition-colors duration-300 ${isActive ? "text-blue-600" : "text-slate-600 group-hover:text-blue-600"}`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`shrink-0 flex items-center justify-center transition-transform duration-500 ${isActive ? "rotate-180 text-blue-600" : "text-slate-300 group-hover:text-blue-600"}`}
                    >
                      <ChevronDown
                        size={24}
                        className="lg:w-7 lg:h-7"
                        strokeWidth={2.5}
                      />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-500 ease-in-out ${isActive ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="pb-8 lg:pb-10 pl-[3.75rem] lg:pl-[4.75rem] pr-6 lg:pr-16">
                      <p className="text-slate-500 text-sm lg:text-lg leading-relaxed font-medium">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FaqSection;
