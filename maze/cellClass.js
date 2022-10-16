class Cell {
  #left;
  #right;
  #forward;
  #backward;
  #up;
  #down;
  #value;
  #visited;
  #col;
  #row;
  #layer;

  constructor(
    layer,
    row,
    col,
    left = false,
    right = false,
    forward = false,
    backward = false,
    up = false,
    down = false,
    value = null,
    visited = false
  ) {
    this.#left = left;
    this.#right = right;
    this.#forward = forward;
    this.#backward = backward;
    this.#up = up;
    this.#down = down;
    this.#value = value;
    this.#visited = visited;
    this.#col = col;
    this.#row = row;
    this.#layer = layer;
  }

  /**
   *
   * @param {Cell} currCell
   * @param {Cell} nextCell
   */
  removeWalls(currCell, nextCell) {
    //compare cells on z axis
    let z = currCell.layer - nextCell.layer;
    if (z === 1) {
      currCell.down = true;
      nextCell.up = true;
    } else if (z === -1) {
      currCell.up = true;
      nextCell.down = true;
    }

    //compare cells on y axis
    let y = currCell.row - nextCell.row;
    if (y === 1) {
      currCell.forward = true;
      nextCell.backward = true;
    } else if (y === -1) {
      currCell.backward = true;
      nextCell.forward = true;
    }

    //compare cells on x axis
    let x = currCell.column - nextCell.column;
    if (x === 1) {
      currCell.left = true;
      nextCell.right = true;
    } else if (x === -1) {
      currCell.right = true;
      nextCell.left = true;
    }
  }

  get state() {
    return `${this.#layer}, ${this.#row}, ${this.#col}`;
  }

  get layer() {
    return this.#layer;
  }

  set left(left) {
    this.#left = left;
  }

  set value(value) {
    this.#value = value;
  }

  set right(right) {
    this.#right = right;
  }

  set forward(forward) {
    this.#forward = forward;
  }

  set backward(backward) {
    this.#backward = backward;
  }

  set up(up) {
    this.#up = up;
  }

  set down(down) {
    this.#down = down;
  }

  get column() {
    return this.#col;
  }

  get row() {
    return this.#row;
  }

  set visited(vis) {
    this.#visited = vis;
  }

  get visited() {
    return this.#visited;
  }

  get left() {
    return this.#left;
  }

  get right() {
    return this.#right;
  }

  get forward() {
    return this.#forward;
  }

  get backward() {
    return this.#backward;
  }

  get up() {
    return this.#up;
  }

  get down() {
    return this.#down;
  }

  get value() {
    return this.#value;
  }

  toJSON() {
    return {
      left: this.#left,
      right: this.#right,
      forward: this.#forward,
      backward: this.#backward,
      up: this.#up,
      down: this.#down,
      value: this.#value, 
      visited: this.#visited, 
      layer: this.#layer, 
      row: this.#row,
      col: this.#col
    };
  }
}

export default Cell;
