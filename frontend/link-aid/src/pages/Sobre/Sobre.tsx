
import AboutMeaning from "../../components/AboutMeaning/AboutMeaning";
import AboutScrollCards from "../../components/AboutScrollCards/AboutScrollCards";
import AboutFeaturesOrbit from "../../components/AboutFeaturesOrbit/AboutFeaturesOrbit";

const Sobre = () => {
  return (
    <main className="w-full bg-white">
      <AboutScrollCards />
      <AboutMeaning />
      <AboutFeaturesOrbit />
    </main>
  );
};
export default Sobre;
