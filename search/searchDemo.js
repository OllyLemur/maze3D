import DFSMaze3dGenerator from "../maze/DFSMaze3dGenerator.js";
import mazeAdapter from "./mazeAdapterClass.js";
import AStarSearch from "./search-algoritms/aStarSearchClass.js";
import BreadthFirstSearch from "./search-algoritms/breadthFirstSearchClass.js";
import DepthFirstSearch from "./search-algoritms/depthFirstSearchClass.js";

class SearchDemo {
  #maze;

  constructor() {
    this.#maze = new DFSMaze3dGenerator(20, 20, 3);
  }

  run() {
    this.#maze.generate();

    const adapter = new mazeAdapter(
      this.#maze.maze,
      this.#maze.initPoint,
      this.#maze.goalPoint
    );
    const searchBFS = new BreadthFirstSearch(adapter);
    const searchDFS = new DepthFirstSearch(adapter);
    const ASstarSearch = new AStarSearch(adapter);

    searchBFS.breadthFirstSeaerchAlgo();
    searchDFS.depthFirstSeaerchAlgo();
    ASstarSearch.AStarAlgo();

    console.log(
      `BFS: ${searchBFS.visited}, \nDFS: ${searchDFS.visited} \nA*: ${ASstarSearch.visited}`
    );
  }
}

export default SearchDemo;
