import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { View, Epic, Panel, PanelHeader } from "@vkontakte/vkui";
import { Navigation } from "../features/navigation";
import { HomePage } from "../pages/HomePage";
import { FavoritesPage } from "../pages/FavoritesPage";
import { ComparisonPage } from "../pages/ComparisonPage";
import { moviesModel } from "../features/movies/model";
import "./App.css";
import { ROUTES } from "../constants/routes";

export const App = () => {
  const location = useLocation();

  useEffect(() => {
    moviesModel.load();
  }, []);

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith(ROUTES.FAVOURITES)) return "favorites";
    if (path.startsWith(ROUTES.COMPARISON)) return "comparison";
    return "home";
  };

  return (
    <div style={{ margin: "0 auto", paddingBottom: 50 }}>
      <Epic activeStory={getActiveTab()}>
        <View id="home" activePanel="home">
          <Panel id="home">
            <PanelHeader>Фильмы by Alexey Ershov</PanelHeader>
            <HomePage />
          </Panel>
        </View>
        <View id="favorites" activePanel="favorites">
          <Panel id="favorites">
            <PanelHeader>Избранное</PanelHeader>
            <FavoritesPage />
          </Panel>
        </View>
        <View id="comparison" activePanel="comparison">
          <Panel id="comparison">
            <PanelHeader>Сравнение</PanelHeader>
            <ComparisonPage />
          </Panel>
        </View>
      </Epic>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <Navigation />
      </div>
    </div>
  );
};
