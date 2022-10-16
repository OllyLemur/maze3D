import Cell from "./cellClass.js";
import Maze3dGenerator from "./maze3dGeneratorClass.js";

class DFSMaze3dGenerator extends Maze3dGenerator {
  #stack;

  constructor(rows = 5, columns = 5, layers = 3) {
    super(rows, columns, layers);
    this.#stack = [];
  }


  generate() {
    //generate maze with default cells
    const maze = this.generateDefaultBoard()

    //DFS algorithm
    let currCell = maze[0][0][0];
    currCell.visited = true;
    this.#stack.push(currCell);

    while (this.#stack.length > 0) {
      let neighbours = this.cheakNignbours(currCell);

      if (neighbours.length > 0) {
        let random = Math.floor(Math.random() * neighbours.length);
        let nextCell = neighbours[random];
        currCell.removeWalls(currCell, nextCell);
        nextCell.visited = true;
        this.#stack.push(nextCell);
        currCell = nextCell;
      } else {
        currCell = this.#stack.pop();
      }
    }

    //random entry point to the labyrinth
    this.genetareStartPoint()

    //random exit point
    this.generateGoalPoint()
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

    if (top && !top.visited) neighbours.push(top);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (right && !right.visited) neighbours.push(right);
    if (left && !left.visited) neighbours.push(left);
    if (up && !up.visited) neighbours.push(up);
    if (down && !down.visited) neighbours.push(down);

    return neighbours;
  }
  
}

export default DFSMaze3dGenerator;
