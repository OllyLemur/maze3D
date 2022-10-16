import Maze3dGenerator from "../maze/maze3dGeneratorClass.js";
import Player from "./playerClass.js";

class Board {
  #maze;
  #container;
  #player;
  #initPoint;
  #goalPoint;
  #img;

  /**
   *
   * @param {Maze3dGenerator} maze
   */
  constructor(maze, initPoint, goalPoint, imgPath, playerState) {
    this.#maze = maze;
    this.#goalPoint = goalPoint;
    this.#initPoint = initPoint;
    this.#container = document.getElementById("maze");
    this.#img = imgPath;
    this.#player = new Player(imgPath, playerState);
  }

  drawInitBoard() {
    this.#container.innerHTML = "";
    const WIDTH_OF_CELL = 36;
    this.#container.className = "board";
    this.#container.style.width = `${
      this.#maze[0][0].length * WIDTH_OF_CELL
    }px`;

    const layer = this.#initPoint.layer;
    this.draw(layer);

    this.#player.generate();
  }

  draw(layer) {
    for (let j = 0; j < this.#maze[layer].length; j++) {
      for (let i = 0; i < this.#maze[layer][j].length; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";

        if (!this.#maze[layer][j][i].left) {
          cell.style.borderLeft = "1px solid black";
        }
        if (!this.#maze[layer][j][i].right) {
          cell.style.borderRight = "1px solid black";
        }
        if (!this.#maze[layer][j][i].forward) {
          cell.style.borderTop = "1px solid black";
        }
        if (!this.#maze[layer][j][i].backward) {
          cell.style.borderBottom = "1px solid black";
        }

        if (this.#maze[layer][j][i].up && this.#maze[layer][j][i].down) {
          const arrow = document.createElement("span");
          arrow.className = "material-symbols-outlined";
          arrow.textContent = "swap_vert";
          cell.appendChild(arrow);
        } else if (this.#maze[layer][j][i].up) {
          const arrow = document.createElement("span");
          arrow.className = "material-symbols-outlined";
          arrow.textContent = "arrow_upward";
          cell.appendChild(arrow);
        } else if (this.#maze[layer][j][i].down) {
          const arrow = document.createElement("span");
          arrow.className = "material-symbols-outlined";
          arrow.textContent = "arrow_downward";
          cell.appendChild(arrow);
        }

        if (this.#maze[layer][j][i].value === "start") {
          cell.style.backgroundColor = "red";
        }
        if (this.#maze[layer][j][i].value === "goal") {
          cell.style.backgroundColor = "green";
        }

        this.#container.appendChild(cell);
      }
    }
  }

  play() {
    document.addEventListener("keydown", (e) => {
      const directions = new Map([
        ["ArrowRight", [0, 0, 1]],
        ["ArrowLeft", [0, 0, -1]],
        ["ArrowUp", [0, -1, 0]],
        ["ArrowDown", [0, 1, 0]],
        ["KeyW", [1, 0, 0]],
        ["KeyS", [-1, 0, 0]],
      ]);

      if (directions.has(e.code)) {
        const direction = directions.get(e.code);

        if (
          (e.code === "ArrowRight" && this.#player.state.right) ||
          (e.code === "ArrowLeft" && this.#player.state.left) ||
          (e.code === "ArrowUp" && this.#player.state.forward) ||
          (e.code === "ArrowDown" && this.#player.state.backward)
        ) {
          const nextCell =
            this.#maze[this.#player.state.layer + direction[0]][
              this.#player.state.row + direction[1]
            ][this.#player.state.column + direction[2]];
          this.#player.makeMove(nextCell);
        }

        if (
          this.#player.state.layer < this.#maze.length ||
          this.#player.state.layer > 0
        ) {
          if (
            (e.code === "KeyW" && this.#player.state.up) ||
            (e.code === "KeyS" && this.#player.state.down)
          ) {
            const nextCell =
              this.#maze[this.#player.state.layer + direction[0]][
                this.#player.state.row
              ][this.#player.state.column];
            this.#player.makeMove(nextCell);
            this.#container.innerHTML = "";
            this.draw(this.#player.state.layer);
            this.#player.generate();
          }
        }
      }
    });
  }

  /**
   *
   * @param {Array} res
   */
  animSolve(res) {
    let countInt = 0;
    const a = setInterval(() => {
      let cell = res[countInt];

      this.#player.makeMove(cell);
      countInt++;

      if (res.length !== countInt) {
        if (cell.layer !== res[countInt].layer) {
          this.#initPoint = res[countInt];
          this.drawInitBoard(res[countInt].layer);
        }
      }

      if (countInt === res.length) {
        clearInterval(a);
      }
    }, 500);
  }

  toJSON() {
    return {
      maze: this.#maze,
      player: this.#player,
      initPoint: this.#initPoint,
      goalPoint: this.#goalPoint,
    };
  }
}

export default Board;
