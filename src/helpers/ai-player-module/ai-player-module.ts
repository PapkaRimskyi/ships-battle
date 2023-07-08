import _ from 'lodash';
import { getRandomArbitrary } from "@/helpers/common";

import type { IAiPlayerModule, TShipCellInfo } from "@/helpers/ai-player-module/type";

import { GAME_FIELDS, AI_FIELDS_START_ROW_NUMBER } from "@/const/game-field";
import { getShipObject, ShipsForDeployment, SHIPS_TYPE_ENUM } from "@/const/ships";

class AiPlayerModule implements IAiPlayerModule {
  private slotsWithAIShip: TShipCellInfo = {};
  private shipListForDeploying = _.cloneDeep(ShipsForDeployment);
  private playerFields = _.cloneDeep(GAME_FIELDS).slice(0, AI_FIELDS_START_ROW_NUMBER);

  private deleteShotCell(cell: string) {
    const cellName = cell[0];
    let emptyArray = null;
    this.playerFields.forEach((field, i) => {
      if (field[0][0] === cellName) {
        const indexOfCurrentCell = field.findIndex((fieldCell) => fieldCell === cell);
        if (field.length - 1 === 0) {
          emptyArray = i;
        }
        return field.splice(indexOfCurrentCell, 1);
      }
    });
    if (emptyArray) {
      this.playerFields.splice(emptyArray, 1);
    }
  }

  private getRandomCell(fields: typeof this.playerFields) {
    const pickedColumn = fields[getRandomArbitrary(0, fields.length)];
    return pickedColumn[getRandomArbitrary(0, pickedColumn.length)];
  }

  private addShip(type: SHIPS_TYPE_ENUM, randomCell: string) {
    const indexOfShipObject = this.shipListForDeploying.findIndex((ship) => ship.type === type);
    this.shipListForDeploying[indexOfShipObject].currentAmount += 1;
    this.slotsWithAIShip[randomCell] = getShipObject(type)!;
  }

  private placeAllShips() {
    const aiFields = GAME_FIELDS.slice(AI_FIELDS_START_ROW_NUMBER);
    this.shipListForDeploying.forEach((ship) => {
      while (ship.currentAmount !== ship.maxAmount) {
        let randomCell = this.getRandomCell(aiFields);
        while (randomCell in this.slotsWithAIShip) {
          randomCell = this.getRandomCell(aiFields);
        }
        this.addShip(ship.type, randomCell);
      }
    });
  }

  public init() {
    this.placeAllShips();
  }

  public getListOfShips() {
    return this.slotsWithAIShip;
  }

  public sinkShip(cell: string) {
    this.slotsWithAIShip[cell].isAlive = false;
  }

  public shot() {
    const randomCell = this.getRandomCell(this.playerFields);
    this.deleteShotCell(randomCell);
    console.log(this.playerFields);
    return randomCell;
  }
}

export default AiPlayerModule;
