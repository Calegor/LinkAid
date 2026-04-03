import HeroDefault from "../../Layout/HeroDefault";
import { MessageCircle } from "lucide-react";

const Contato = () => {
  return (
    <main className="w-full bg-white">
      <HeroDefault
        titleBlack="Vamos"
        titleBlue="conversar."
        description="Tem alguma dúvida ou quer saber mais sobre o projeto? Nossa equipe está pronta para ouvir você e criar conexões reais."
        scrollText="Scroll para ver canais de contato"
        ScrollIcon={MessageCircle}
        highlightWord="pronta"
      ></HeroDefault>
    </main>
  );
};
export default Contato;
