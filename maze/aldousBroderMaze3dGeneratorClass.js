import Maze3dGenerator from "./maze3dGeneratorClass.js";
import Cell from "./cellClass.js";

class aldousBroderMaze3dGenerator extends Maze3dGenerator {
  #set;

  constructor(rows = 5, columns = 5, layers = 3) {
    super(rows, columns, layers);
    this.#set = new Set();
  }

  generate() {
    const maze = this.generateDefaultBoard()

    //Aldous-Broder algorithm
    for (let i = 0; i < this.layers; i++) {
      for (let j = 0; j < this.rows; j++) {
        for (let k = 0; k < this.columns; k++) {
          this.#set.add(`${i}, ${j}, ${k}`);
        }
      }
    }

    let currCell = maze[0][0][0];
    currCell.visited = true;
    this.#set.delete("0, 0, 0");

    while (this.#set.size > 0) {
      let neighbours = this.cheakNignbours(currCell);

      let random = Math.floor(Math.random() * neighbours.length);
      let nextCell = neighbours[random];
      if (!nextCell.visited) {
        nextCell.visited = true;
        currCell.removeWalls(currCell, nextCell)
        this.#set.delete(
          `${nextCell.layer}, ${nextCell.row}, ${nextCell.column}`
        );
      }
      currCell = nextCell;
    }

    this.generateGoalPoint()
    this.genetareStartPoint()
  }

  /**
   *
   * @param {Cell} cell
   */
  cheakNignbours(cell) {
    const maze = this.maze
    let neighbours = [];
    let col = cell.column;
    let row = cell.row;
    let layer = cell.layer;

    let top = row !== 0 ? maze[layer][row - 1][col] : undefined;
    let bottom =
      row !== maze[0].length - 1
        ? maze[layer][row + 1][col]
        : undefined;
    let right =
      col !== maze[0][0].length - 1
        ? maze[layer][row][col + 1]
        : undefined;
    let left = col !== 0 ? maze[layer][row][col - 1] : undefined;
    let up =
      layer !== maze.length - 1
        ? maze[layer + 1][row][col]
        : undefined;
    let down = layer !== 0 ? maze[layer - 1][row][col] : undefined;

    if (top) neighbours.push(top);
    if (bottom) neighbours.push(bottom);
    if (right) neighbours.push(right);
    if (left) neighbours.push(left);
    if (up) neighbours.push(up);
    if (down) neighbours.push(down);

    return neighbours;
  }
}

export default aldousBroderMaze3dGenerator;
