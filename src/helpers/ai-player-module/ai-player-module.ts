import _ from 'lodash';
import { getRandomArbitrary } from "@/helpers/common";

import type { IAiPlayerModule, TShipCellInfo } from "@/helpers/ai-player-module/type";

import { GAME_FIELDS, AI_FIELDS_START_ROW_NUMBER } from "@/const/game-field";
import { getShipObject, ShipsForDeployment, SHIPS_TYPE_ENUM } from "@/const/ships";

class AiPlayerModule implements IAiPlayerModule {
  private slots: TShipCellInfo = {};
  private shipListForDeploying = _.cloneDeep(ShipsForDeployment);
  private enemyCells = _.cloneDeep(GAME_FIELDS).slice(0, AI_FIELDS_START_ROW_NUMBER).flat();
  private deadPlayerCells: string[] = [];

  private deleteEnemyCell(randomIndex: number, cell: string) {
    this.enemyCells.splice(randomIndex, 1);
    this.deadPlayerCells.push(cell);
  }

  private addShip(type: SHIPS_TYPE_ENUM, randomCell: string) {
    const indexOfShipObject = this.shipListForDeploying.findIndex((ship) => ship.type === type);
    this.shipListForDeploying[indexOfShipObject].currentAmount += 1;
    this.slots[randomCell] = getShipObject(type)!;
  }

  private placeAllShips() {
    const aiFields = GAME_FIELDS.slice(AI_FIELDS_START_ROW_NUMBER).flat();
    this.shipListForDeploying.forEach((ship) => {
      while (ship.currentAmount !== ship.maxAmount) {
        const randomIndex = getRandomArbitrary(0, aiFields.length);
        const randomCell = aiFields[randomIndex];
        aiFields.splice(randomIndex, 1);
        this.addShip(ship.type, randomCell);
      }
    });
  }

  public init() {
    this.placeAllShips();
  }

  public getListOfShips() {
    return this.slots;
  }

  public getListOfDeadPlayerCells() {
    return this.deadPlayerCells;
  }

  public sinkShip(cell: string) {
    this.slots[cell].isAlive = false;
  }

  public shot() {
    const randomIndex = getRandomArbitrary(0, this.enemyCells.length);
    const randomCell = this.enemyCells[randomIndex];
    this.deleteEnemyCell(randomIndex, randomCell);
    return randomCell;
  }
}

export default AiPlayerModule;
