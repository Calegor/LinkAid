import HeroDefault from "../../Layout/HeroDefault";
import { HelpCircle } from "lucide-react"; // Sugestão de ícone para FAQ

const Faq = () => {
  return (
    <main className="w-full bg-white">
      <HeroDefault
        titleBlack="Dúvidas"
        titleBlue="frequentes."
        description="Encontre respostas rápidas para as perguntas mais comuns sobre o LinkAid. Estamos aqui para ajudar você a navegar com clareza."
        scrollText="Scroll para ver as perguntas"
        ScrollIcon={HelpCircle}
        highlightWord="clareza"
      ></HeroDefault>
    </main>
  );
};
export default Faq;
