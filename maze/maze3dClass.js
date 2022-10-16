class Maze3d {
  #maze;

  constructor(maze) {
    this.#maze = maze;
  }

  toString() {
    let str = "";
    for (let i = 0; i < this.#maze.length; i++) {
      str += `\nLevel ${i} \n`;
      str += '+'
      for (let j = 0; j < this.#maze[i][0].length; j++) {
        str += "—+";
      }
      str += "\n";

      //goes through the rows
      for (let j = 0; j < this.#maze[i].length; j++) {
        let firstRow = "|";
        let secondRow = "+";

        for (let k = 0; k < this.#maze[i][j].length; k++) {
          let cell = this.#maze[i][j][k];

          if (cell.value === null) {
            if (cell.up && cell.down) {
              firstRow += "↕";
            } else if (cell.up) {
              firstRow += "↑";
            } else if (cell.down) {
              firstRow += "↓";
            } else {
              firstRow += " ";
            }
          } else if (cell.value === "start") {
            firstRow += "S";
          } else if (cell.value === "goal") {
            firstRow += "G";
          }
          if (cell.right) {
            firstRow += " ";
          } else {
            firstRow += "|";
          }

          if (cell.backward) {
            secondRow += ' +'
          } else {
            secondRow += '-+'
          }
        }

        str += firstRow + '\n'
        str += secondRow + '\n'
      }
    }

    return str;
  }
}

export default Maze3d;
