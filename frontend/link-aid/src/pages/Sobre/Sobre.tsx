
import AboutMeaning from "../../components/AboutMeaning/AboutMeaning";
import AboutScrollCards from "../../components/AboutScrollCards/AboutScrollCards";
import AboutFeaturesOrbit from "../../components/AboutFeaturesOrbit/AboutFeaturesOrbit";
import AboutPerformance from "../../components/AboutPerformance/AboutPerformance";
import AboutProject from "../../components/AboutProject/AboutProject";

const Sobre = () => {
  return (
    <main className="w-full bg-white">
      <AboutScrollCards />
      <AboutMeaning />
      <AboutFeaturesOrbit />
      <AboutPerformance />
      <AboutProject />
    </main>
  );
};
export default Sobre;
