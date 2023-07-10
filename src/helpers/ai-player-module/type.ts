import type { TShip } from "@/const/ships";

export type TShipCellInfo = {
  [key: string]: TShip,
};

export interface IAiPlayerModule {
  init: () => void,
  getListOfShips: () => TShipCellInfo,
  getListOfDeadPlayerCells: () => string[],
  sinkShip: (cell: string) => void,
  shot: () => string,
}
