interface HeroProps {
  titleBlack: string;
  titleBlue: string;
  description: string;
  scrollText: string;
  ScrollIcon: React.ElementType;
  highlightWord?: string;
  children?: React.ReactNode;
}

const HeroDefault = ({
  titleBlack,
  titleBlue,
  description,
  scrollText,
  ScrollIcon,
  highlightWord,
}: HeroProps) => {
  const renderDescription = () => {
    if (!highlightWord) return description;
    const parts = description.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-blue-600 font-medium">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative w-full bg-white pb-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blue-50/40 blur-[100px] rounded-full -z-10" />
      <div className="container mx-auto px-6 pt-24 md:pt-32 mb-16 md:mb-20 relative z-10 lg:pl-12 xl:pl-32">
        <div className="flex flex-col lg:flex-row items-center lg:items-end lg:justify-start gap-8 lg:gap-16 text-center lg:text-left">
          {/* title */}
          <div className="w-full lg:w-fit shrink-0">
            <h1
              className="font-bold text-slate-950 tracking-[-0.05em] leading-[0.85]
                           text-[14vw] sm:text-[12vw] md:text-[10vw] 
                           lg:text-[7vw] lg:max-w-none 
                           xl:text-[6vw]"
            >
              {titleBlack} <br />
              <span className="text-blue-600 font-light block whitespace-nowrap">
                {titleBlue}
              </span>
            </h1>
          </div>

          {/* paragrafo */}
          <div className="max-w-[450px] lg:max-w-[380px] lg:ml-8 pb-4 shrink-0">
            <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed tracking-tight">
              {renderDescription()}
            </p>

            {/* icon + text */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-5 text-blue-600 animate-bounce">
              <ScrollIcon size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                {scrollText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroDefault;
