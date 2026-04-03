
import AboutMeaning from "../../components/AboutMeaning/AboutMeaning";
import AboutScrollCards from "../../components/AboutScrollCards/AboutScrollCards";
import AboutGrid from "../../components/AboutFeaturesOrbit/AboutFeaturesOrbit";

const Sobre = () => {
  return (
    <main className="w-full bg-white">
      <AboutScrollCards />
      <AboutMeaning />
      <AboutGrid />
    </main>
  );
};
export default Sobre;
