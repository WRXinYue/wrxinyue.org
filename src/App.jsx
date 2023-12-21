import { BrowserRouter } from "react-router-dom";
import {
  Hero,
  Article,
  CardAnnouncement,
  CardInfo,
  CardWebInfo,
  Footer,
  MainContent,
} from "./components";

const App = () => {
  return (
    <body className="is-preload">
      <Hero />
      <MainContent />
      <Footer />
    </body>
  );
};

export default App;
