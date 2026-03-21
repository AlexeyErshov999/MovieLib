import { Group, Header, Text } from '@vkontakte/vkui';

export const FavoritesPage = () => {
  return (
    <Group>
      <Header>Избранное</Header>
      <Text style={{ padding: '16px' }}>
        Здесь будут ваши избранные фильмы
      </Text>
    </Group>
  );
};
