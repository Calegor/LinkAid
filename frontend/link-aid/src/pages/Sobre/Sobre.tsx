import { ArrowRight } from "lucide-react";
import HeroDefault from "../../Layout/HeroDefault";

const Sobre = () => {
  return (
    <main className="w-full bg-white">
      <HeroDefault
        titleBlack="Comunicação"
        titleBlue="sem esforço."
        description="Criamos o LinkAid para facilitar seu dia a dia. Organizamos suas conexões para você ganhar tempo."
        scrollText="Explore o projeto"
        ScrollIcon={ArrowRight}
        highlightWord="LinkAid"
      ></HeroDefault>
    </main>
  );
};
export default Sobre;
