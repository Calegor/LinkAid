
import AboutMeaning from "../../components/AboutMeaning/AboutMeaning";
import AboutScrollCards from "../../components/AboutScrollCards/AboutScrollCards";
import AboutFeaturesOrbit from "../../components/AboutFeaturesOrbit/AboutFeaturesOrbit";
import AboutPerformance from "../../components/AboutPerformance/AboutPerformance";
import AboutProject from "../../components/AboutProject/AboutProject";
import AboutTech from "../../components/AboutTech/AboutTech";

const Sobre = () => {
  return (
    <main className="w-full bg-white">
      <AboutScrollCards />
      <AboutMeaning />
      <AboutFeaturesOrbit />
      <AboutPerformance />
      <AboutProject />
      <AboutTech />
    </main>
  );
};
export default Sobre;
