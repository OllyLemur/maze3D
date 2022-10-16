import Cell from "../maze/cellClass.js";
import Board from "./boardClass.js";

class LocalManager {
  #playerPoint;
  #mazeSave;
  #playerImg;
  #initPoint;
  #goalPoint;

  constructor(gameSave) {
    if (gameSave) {
        this.gameSave = gameSave
      this.#mazeSave = [];
      this.#goalPoint;
      this.#playerPoint;
      this.#initPoint;
      this.#playerImg;
    }
  }

  get playerPoint() {
    return this.#playerPoint;
  }

  get playerImg() {
    return this.#playerImg;
  }

  get mazeSave() {
    return this.#mazeSave;
  }

  get initPoint() {
    return this.#initPoint;
  }

  get goalPoint() {
    return this.#goalPoint;
  }

  generate() {
    for (let i = 0; i < this.gameSave.maze.length; i++) {
      let layer = [];
      for (let j = 0; j < this.gameSave.maze[0].length; j++) {
        let row = [];
        for (let k = 0; k < this.gameSave.maze[0][0].length; k++) {
          const cellInfo =this.gameSave.maze[i][j][k];
          row.push(
            new Cell(
              cellInfo.layer,
              cellInfo.row,
              cellInfo.col,
              cellInfo.left,
              cellInfo.right,
              cellInfo.forward,
              cellInfo.backward,
              cellInfo.up,
              cellInfo.down,
              cellInfo.value,
              cellInfo.visitid
            )
          );
        }
        layer.push(row);
      }
      this.#mazeSave.push(layer);
    }

    const initPointInfo = this.gameSave.initPoint;
    this.#initPoint = new Cell(
      initPointInfo.layer,
      initPointInfo.row,
      initPointInfo.col,
      initPointInfo.left,
      initPointInfo.right,
      initPointInfo.forward,
      initPointInfo.backward,
      initPointInfo.up,
      initPointInfo.down,
      initPointInfo.value,
      initPointInfo.visitid
    );

    const goalPointInfo = this.gameSave.goalPoint;
    this.#goalPoint = new Cell(
      goalPointInfo.layer,
      goalPointInfo.row,
      goalPointInfo.col,
      goalPointInfo.left,
      goalPointInfo.right,
      goalPointInfo.forward,
      goalPointInfo.backward,
      goalPointInfo.up,
      goalPointInfo.down,
      goalPointInfo.value,
      goalPointInfo.visitid
    );

    this.#playerImg = this.gameSave.player.path;

    const statePlayerInfo = this.gameSave.player.state;
    this.#playerPoint = new Cell(
      statePlayerInfo.layer,
      statePlayerInfo.row,
      statePlayerInfo.col,
      statePlayerInfo.left,
      statePlayerInfo.right,
      statePlayerInfo.forward,
      statePlayerInfo.backward,
      statePlayerInfo.up,
      statePlayerInfo.down,
      statePlayerInfo.value,
      statePlayerInfo.visitid
    );
  }

  /**
   *
   * @param {Board} board
   */
  save(board) {}
}

export default LocalManager;
