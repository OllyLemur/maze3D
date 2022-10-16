class Searchable {
  #initState;
  #goalState;

  constructor(init, goal) {
    if (this.constructor === Searchable) {
      throw new Error("Abstract class Searcheble cannot be instantiated");
    }

    this.#initState = init
    this.#goalState = goal
  }

  get goalState() {
    return this.#goalState;
  }

  get initState() {
    return this.#initState;
  }

  goalTest() {
    throw new Error("Method goalTest() must be implemented");
  }

  actions() {
    throw new Error("Methd actions() must be implemented");
  }

  getNextState() {
    throw new Error("Methd getNextState() must be implemented");
  }
}

export default Searchable;
