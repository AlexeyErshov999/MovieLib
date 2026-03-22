import { ModalPage, ModalRoot, Group, Header, Button, Text, Box } from "@vkontakte/vkui";
import { getMovieTitle } from "../../../../utils/movie";
import type { ConfirmModalRootProps } from "./types";

export const ConfirmModal = ({ movie, action, onConfirm, onCancel }: ConfirmModalRootProps) => {
  const movieTitle = getMovieTitle(movie);

  return (
    <ModalPage
      id="confirm-favorite"
      onClose={onCancel}
      header={
        <Header>
          {action === "add" ? "Добавить в избранное" : "Удалить из избранного"}
        </Header>
      }
    >
      <Group>
        <Box style={{ padding: 16, textAlign: "center" }}>
          <Text weight="2">
            {action === "add" 
              ? `Вы уверены, что хотите добавить "${movieTitle}" в избранное?`
              : `Вы уверены, что хотите удалить "${movieTitle}" из избранного?`
            }
          </Text>
        </Box>

        <div style={{ 
          display: "flex", 
          gap: 12, 
          padding: 16,
          justifyContent: "center"
        }}>
          <Button size="l" mode="secondary" onClick={onCancel}>
            Отмена
          </Button>
          <Button size="l" mode="primary" onClick={onConfirm}>
            {action === "add" ? "Добавить" : "Удалить"}
          </Button>
        </div>
      </Group>
    </ModalPage>
  );
};

export const ConfirmModalRoot = ({ movie, action, onConfirm, onCancel }: ConfirmModalRootProps) => {
  return (
    <ModalRoot activeModal={action ? "confirm-favorite" : undefined}>
      {movie && action && (
        <ConfirmModal
          movie={movie}
          action={action}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </ModalRoot>
  );
};
