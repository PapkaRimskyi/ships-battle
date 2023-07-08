export enum SHIPS_TYPE_ENUM {
  LINKOR = 'LINKOR',
  KREISER = 'KREISER',
  ESMINEC = 'ESMINEC',
  TORPEDO = 'TORPEDO',
}

export type TShipForDeployment = {
  type: SHIPS_TYPE_ENUM,
  name: 'Линкор' | 'Крейсер' | 'Эсминец' | 'Подлодка',
  currentAmount: number,
  maxAmount: number,
}

export type TShip = {
  type: SHIPS_TYPE_ENUM,
  health: 1 | 2 | 3 | 4,
  isAlive: boolean,
}

export type TCellsWithShip = {
  [key: string]: TShip,
}

export const ShipsForDeployment = [
  {
    type: SHIPS_TYPE_ENUM.LINKOR,
    name: 'Линкор',
    currentAmount: 0,
    maxAmount: 1,
  },
  {
    type: SHIPS_TYPE_ENUM.KREISER,
    name: 'Крейсер',
    currentAmount: 0,
    maxAmount: 2,
  },
  {
    type: SHIPS_TYPE_ENUM.ESMINEC,
    name: 'Эсминец',
    currentAmount: 0,
    maxAmount: 3,
  },
  {
    type: SHIPS_TYPE_ENUM.TORPEDO,
    name: 'Подлодка',
    currentAmount: 0,
    maxAmount: 4,
  },
];

export const getShipObject = (type: SHIPS_TYPE_ENUM): TShip | undefined => {
  switch (type) {
    case SHIPS_TYPE_ENUM.LINKOR:
      return { type, health: 4, isAlive: true };
    case SHIPS_TYPE_ENUM.KREISER:
      return { type, health: 3, isAlive: true };
    case SHIPS_TYPE_ENUM.ESMINEC:
      return { type, health: 2, isAlive: true };
    case SHIPS_TYPE_ENUM.TORPEDO:
      return { type, health: 1, isAlive: true };
    default:
      break;
  }
}
