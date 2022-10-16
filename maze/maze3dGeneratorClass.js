import Cell from "./cellClass.js";

class Maze3dGenerator {
  #columns;
  #rows;
  #layers;
  #maze;
  #initPoint;
  #goalPoint;

  constructor(rows, columns, layers) {
    if (this.constructor === Maze3dGenerator) {
      throw new Error("Abstract class Maze3dGenerator cannot be instantiated");
    }

    this.#columns = columns;
    this.#rows = rows;
    this.#layers = layers;
    this.#maze = [];
  }

  get columns() {
    return this.#columns;
  }

  get layers() {
    return this.#layers;
  }

  get rows() {
    return this.#rows;
  }

  generate() {
    throw new Error("Method generate() must be implemented");
  }

  getCell(i, j, k) {
    return this.#maze[i][j][k];
  }

  generateDefaultBoard() {
    for (let i = 0; i < this.layers; i++) {
      let layer = [];
      for (let j = 0; j < this.rows; j++) {
        let row = [];
        for (let k = 0; k < this.columns; k++) {
          row.push(new Cell(i, j, k));
        }
        layer.push(row);
      }
      this.#maze.push(layer);
    }

    return this.#maze;
  }

  get initPoint() {
    return this.#initPoint;
  }

  get goalPoint() {
    return this.#goalPoint;
  }

  genetareStartPoint() {
    let randLayer = Math.floor(Math.random() * this.#maze.length);
    let randRow = Math.floor(Math.random() * this.#maze[0].length);
    let randCol = 0;
    if (randRow === 0 || randRow === this.#maze[0].length) {
      randCol = Math.floor(Math.random() * this.#maze[0][0].length);
    } else {
      randCol = Math.floor(Math.random() * 3);
      randCol === 1 ? (randCol = 0) : (randCol = this.#maze[0][0].length - 1);
    }
    this.#maze[randLayer][randRow][randCol].value = "start";
    this.#initPoint = this.#maze[randLayer][randRow][randCol];

    return this.#initPoint;
  }

  generateGoalPoint() {
    let randLayer = Math.floor(Math.random() * this.#maze.length);
    let randRow = Math.floor(Math.random() * this.#maze[0].length);
    let randCol = 0;
    if (randRow === 0 || randRow === this.#maze[0].length) {
      randCol = Math.floor(Math.random() * this.#maze[0][0].length);
    } else {
      randCol = Math.floor(Math.random() * 3);
      randCol === 1 ? (randCol = 0) : (randCol = this.#maze[0][0].length - 1);
    }
    this.#maze[randLayer][randRow][randCol].value = "goal";
    this.#goalPoint = this.#maze[randLayer][randRow][randCol];

    return this.#goalPoint;
  }

  get maze() {
    return this.#maze;
  }

  measureAlgorithmTime() {
    let startTime = Date.now();
    this.generate();
    let finishTime = Date.now();
    return finishTime - startTime;
  }

  toJSON() {
    return {
      columns: this.#columns,
      rows: this.#rows,
      layers: this.#layers,
      maze: this.maze,
      initPoint: this.#initPoint,
      goalPoint: this.#goalPoint
    }
  }
}

export default Maze3dGenerator;
