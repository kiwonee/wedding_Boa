import "./App.css";
import Intersect from "./Intersect";
import Cover from "./Cover";
import NameHero from "./NameHero";
import CalendarSection from "./CalendarSection";
import Gallery from "./Gallery";
import Location from "./Location";
import Account from "./Account";
import ShareBar from "./ShareBar";
import Footer from "./Footer";

function App() {
  return (
    <div className="main-frame">
      <Cover />
      <NameHero />
      <div className="dim-divider" />
      <Intersect><CalendarSection /></Intersect>
      <div className="dim-divider" />
      <Intersect><Gallery /></Intersect>
      <div className="dim-divider" />
      <Intersect><Location /></Intersect>
      <div className="dim-divider" />
      <Intersect><Account /></Intersect>
      <div className="dim-divider" />
      <Intersect><ShareBar /></Intersect>
      <Footer />
    </div>
  );
}

export default App;
