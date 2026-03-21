import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import { Icon24Home, Icon24Favorite, Icon24ArrowLeftRightCornersOutline } from "@vkontakte/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Tabbar>
      <TabbarItem onClick={() => navigate(ROUTES.HOME)} title="Главная">
        <Icon24Home />
      </TabbarItem>
      <TabbarItem onClick={() => navigate(ROUTES.FAVOURITES)} title="Избранное">
        <Icon24Favorite />
      </TabbarItem>
      <TabbarItem onClick={() => navigate(ROUTES.COMPARISON)} title="Сравнение">
        <Icon24ArrowLeftRightCornersOutline />
      </TabbarItem>
    </Tabbar>
  );
};
