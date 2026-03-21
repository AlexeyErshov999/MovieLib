import { Group, Header, Text } from '@vkontakte/vkui';

export const HomePage = () => {
  return (
    <Group>
      <Header>Фильмы</Header>
      <Text style={{ padding: '16px' }}>
        Здесь будет список фильмов
      </Text>
    </Group>
  );
};
