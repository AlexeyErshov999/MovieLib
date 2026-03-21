import { Epic, View } from "@vkontakte/vkui";
import { Navigation } from "../../features/navigation";

interface LayoutProps {
  children: React.ReactNode;
  activeStory: string;
}

export const Layout = ({ children, activeStory }: LayoutProps) => {
  return (
    <Epic activeStory={activeStory} tabbar={<Navigation />}>
      <View id="home" activePanel="home">
        <div id="home">{children}</div>
      </View>
      <View id="favorites" activePanel="favorites">
        <div id="favorites">{children}</div>
      </View>
      <View id="comparison" activePanel="comparison">
        <div id="comparison">{children}</div>
      </View>
    </Epic>
  );
};
