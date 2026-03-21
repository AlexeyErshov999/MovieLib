import { useLocation } from "react-router-dom";
import { View, Epic, Panel, PanelHeader } from "@vkontakte/vkui";
import { Navigation } from "../features/navigation";
import { HomePage } from "../pages/HomePage";
import { FavoritesPage } from "../pages/FavoritesPage";
import { ComparisonPage } from "../pages/ComparisonPage";
import "./App.css";
import { ROUTES } from "../constants/routes";

function App() {
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith(ROUTES.FAVOURITES)) return "favorites";
    if (path.startsWith(ROUTES.COMPARISON)) return "comparison";
    return "home";
  };

  return (
    <Epic activeStory={getActiveTab()} tabbar={<Navigation />}>
      <View id="home" activePanel="home">
        <Panel id="home">
          <PanelHeader>Фильмы</PanelHeader>
          <HomePage />
        </Panel>
      </View>
      <View
        id="favorites"
        activePanel="favorites"
      >
        <Panel id="favorites">
          <PanelHeader>Избранное</PanelHeader>
          <FavoritesPage />
        </Panel>
      </View>
      <View
        id="comparison"
        activePanel="comparison"
      >
        <Panel id="comparison">
          <PanelHeader>Сравнение</PanelHeader>
          <ComparisonPage />
        </Panel>
      </View>
    </Epic>
  );
}

export default App;
