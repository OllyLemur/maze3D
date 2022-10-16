import PriorityQueue from "../priorityQeueClass.js";

class AStarSearch {
  #problem;
  #visited;

  constructor(problem) {
    this.#problem = problem;
    this.#visited = new Set();
  }

  get visited() {
    return this.#visited.size;
  }

  AStarAlgo() {
    let frontier = new PriorityQueue(
      (state1, state2) =>
        state1.heuristic + state1.cost < state2.heuristic + state2.cost
    );

    let startState = {
      state: this.#problem.initState,
      cost: 0,
      path: [],
      heuristic: this.heuristic(this.#problem.initState),
    };

    frontier.push(startState);

    while (!frontier.isEmpty()) {
      let currentNode = frontier.pop();
      this.#visited.add(currentNode.state.state);

      if (this.#problem.goalTest(currentNode.state)) {
        currentNode.path.push(currentNode.state);
        return currentNode.path;
      }

      for (const action of this.#problem.actions(currentNode.state)) {
        let nextNode = {
          state: this.#problem.getNextState(currentNode.state, action),
          cost: currentNode.cost + 1,
          path: [...currentNode.path, currentNode.state],
          heuristic: this.heuristic(currentNode.state),
        };

        if (!this.#visited.has(nextNode.state.state)) {
          if (!frontier.has(nextNode)) {
            frontier.push(nextNode);
          } else if (frontier.peek() >= nextNode) {
            frontier.pop();
            frontier.push(nextNode);
          }
        }
      }
    }
    return false;
  }

  heuristic(state) {
    let goal = this.#problem.goalState;
    return (
      Math.abs(goal.layer - state.layer) +
      Math.abs(goal.row - state.row) +
      Math.abs(goal.column - state.column)
    );
  }
}

export default AStarSearch;