import Maze3dGenerator from "./maze3dGeneratorClass.js";

class Simple3dGenerator extends Maze3dGenerator {
  constructor(rows = 5, columns = 5, layers = 3) {
    super(rows, columns, layers);
  }

  generate() {
    const maze = this.generateDefaultBoard();

    for (let i = 0; i < this.layers; i++) {
      for (let j = 0; j < this.rows; j++) {
        for (let k = 0; k < this.columns; k++) {
          let currCell = maze[i][j][k];

          if (!currCell.visited) {
            const neighbours = this.cheakNignbours(currCell);
            let random = Math.floor(Math.random() * neighbours.length);
            const randCell = neighbours[random];
            currCell.visited = true;
            randCell.visited = true;
            currCell.removeWalls(currCell, randCell);
          }
        }
      }
    }

    const startPoint = this.genetareStartPoint();
    this.generateGoalPoint();

    let currCell = startPoint;
    currCell.visited = false;

    while (currCell.value !== "goal") {
      const neighbours = this.cheakNignbours(currCell);
      let random = Math.floor(Math.random() * neighbours.length);
      const nextCell = neighbours[random];
      if (nextCell.visited === true) {
        currCell.removeWalls(currCell, nextCell);
        nextCell.visited = false;
      }
      currCell = nextCell;
    }
  }

  cheakNignbours(cell) {
    const maze = this.maze;
    let neighbours = [];
    let col = cell.column;
    let row = cell.row;
    let layer = cell.layer;

    let top = row !== 0 ? maze[layer][row - 1][col] : undefined;
    let bottom =
      row !== maze[0].length - 1 ? maze[layer][row + 1][col] : undefined;
    let right =
      col !== maze[0][0].length - 1 ? maze[layer][row][col + 1] : undefined;
    let left = col !== 0 ? maze[layer][row][col - 1] : undefined;
    let up = layer !== maze.length - 1 ? maze[layer + 1][row][col] : undefined;
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

export default Simple3dGenerator;
