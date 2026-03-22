import type { Movie } from "../../../../api/types";

export interface ConfirmModalRootProps {
  movie: Movie;
  action: "add" | "remove";
  onConfirm: () => void;
  onCancel: () => void;
}