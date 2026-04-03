import HeroDefault from "../../Layout/HeroDefault";
import { Heart } from "lucide-react";

const Equipe = () => {
  return (
    <main className="w-full bg-white">
      <HeroDefault
        titleBlack="Gente que"
        titleBlue="faz acontecer."
        description="Conheça as mentes por trás do LinkAid. Um time focado em criar soluções simples para conexões reais."
        scrollText="Scroll para conhecer a equipe"
        ScrollIcon={Heart}
        highlightWord="focado"
      ></HeroDefault>
    </main>
  );
};
export default Equipe;
