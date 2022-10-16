export default class BreadthFirstSearch {
  #problem;
  #visited;

  constructor(problem) {
    this.#problem = problem;
    this.#visited = new Set();
  }

  get visited() {
    return this.#visited.size;
  }

  breadthFirstSeaerchAlgo() {
    let state = [this.#problem.initState, []];

    const queue = []; // LIFO queue
    queue.push(state);

    while (queue.length > 0) {
      let currState = queue.pop();
      this.#visited.add(currState[0].state);
      for (const action of this.#problem.actions(currState[0])) {
        let nextState = [
          this.#problem.getNextState(currState[0], action),
          [...currState[1]],
        ];

        if (!this.#visited.has(nextState[0].state)) {
          if (this.#problem.goalTest(nextState[0])) {
            nextState[1].push(currState[0], nextState[0]);
            return nextState[1];
          } else {
            nextState[1].push(currState[0]);
            queue.push(nextState);
          }
        } else {
          nextState[1].push(nextState[0]);
        }
      }
    }

    return false;
  }
}