import Searchable from "./searchableClass.js";
import Cell from "../maze/cellClass.js";

class mazeAdapter extends Searchable {
  #maze;

  constructor(maze, initPoint, goalPoint) {
    super(initPoint, goalPoint);
    this.#maze = maze;
  }

  goalTest(child) {
    return child.state === this.goalState.state;
  }

  /**
   *
   * @param {Cell} cell
   */
  actions(cell) {
    const actions = [];

    if (cell.left) {
      actions.push([0, 0, -1]);
    }
    if (cell.right) {
      actions.push([0, 0, 1]);
    }
    if (cell.backward) {
      actions.push([0, 1, 0]);
    }
    if (cell.forward) {
      actions.push([0, -1, 0]);
    }
    if (cell.up) {
      actions.push([1, 0, 0]);
    }
    if (cell.down) {
      actions.push([-1, 0, 0]);
    }

    return actions;
  }


  /**
   *
   * @param {Cell} cell
   * @param {array} action
   */
  getNextState(cell, action) {
    let column = cell.column;
    let row = cell.row;
    let layer = cell.layer;

    return this.#maze[layer + action[0]][row + action[1]][column + action[2]];
  }

}

export default mazeAdapter;
