import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import { Icon24Home, Icon24Favorite, Icon24ArrowLeftRightCornersOutline } from "@vkontakte/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === ROUTES.HOME) {
      return location.pathname === "/" || location.pathname === ROUTES.HOME;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Tabbar>
      <TabbarItem 
        onClick={() => navigate(ROUTES.HOME)} 
        label="Главная"
        selected={isActive(ROUTES.HOME)}
      >
        <Icon24Home />
      </TabbarItem>
      <TabbarItem 
        onClick={() => navigate(ROUTES.FAVOURITES)} 
        label="Избранное"
        selected={isActive(ROUTES.FAVOURITES)}
      >
        <Icon24Favorite />
      </TabbarItem>
      <TabbarItem 
        onClick={() => navigate(ROUTES.COMPARISON)} 
        label="Сравнение"
        selected={isActive(ROUTES.COMPARISON)}
      >
        <Icon24ArrowLeftRightCornersOutline />
      </TabbarItem>
    </Tabbar>
  );
};
