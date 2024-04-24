import { StateCreator } from "zustand";
import { PersistOptions } from "zustand/middleware";

export type PillListState = {};

export type pillListPersist = (
  config: StateCreator<PillListState>,
  options: PersistOptions<PillListState>
) => StateCreator<PillListState>;
