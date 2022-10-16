import DFSMaze3dGenerator from "./maze/DFSMaze3dGenerator.js";
import Maze3d from "./maze/maze3dClass.js";
import aldousBroderMaze3dGenerator from "./maze/aldousBroderMaze3dGeneratorClass.js";
import Simple3dGenerator from "./maze/simpleMaze3dGeneratorClass.js";
import mazeAdapter from "./search/mazeAdapterClass.js";
import BreadthFirstSeaerch from "./search/search-algoritms/breadthFirstSearchClass.js";
import Board from "./ui/boardClass.js";
import Form from "./ui/formClass.js";
import LocalManager from "./ui/localManagerClass.js";
import AStarSearch from "./search/search-algoritms/aStarSearchClass.js";
import DepthFirstSearch from "./search/search-algoritms/depthFirstSearchClass.js";
import SearchDemo from "./search/searchDemo.js";
import GeneratorsDemo from "./maze/generatersDemoClass.js";

const formInp = document.getElementById("form");
const solveBtn = document.getElementById("btn-solve");
const searchType = document.getElementById("search-slct");
const gameNameSl = document.getElementById("games-slct");
const saveBtn = document.getElementById("btn-save-game");
const loadBtn = document.getElementById("btn-load-game");

const gameNames = localStorage.getItem("games");
const games = [];

const seaechDemo = new SearchDemo();
seaechDemo.run();
const generators = new GeneratorsDemo();
generators.run();

if (!gameNames) {
  localStorage.setItem("games", JSON.stringify(games));
} else {
  let arr = JSON.parse(gameNames);
  for (let name of arr) {
    gameNameSl.options.add(new Option(`${name}`, `${name}`));
  }
}

const form = new Form();
form.checkFormValidity();

let maze3D, maze3d, board, gameName, mazeBoard, initPoint, goalPoint;

formInp.addEventListener("submit", () => {
  if (form.numRows !== 0 && form.numCols !== 0) {
    gameName = form.gameName;
    maze3D = new DFSMaze3dGenerator(form.numRows, form.numCols, 3);
    maze3D.generate();
    maze3d = new Maze3d(maze3D.maze);
    let str2 = maze3d.toString();
    console.log(str2);

    mazeBoard = maze3D.maze;
    initPoint = maze3D.initPoint;
    goalPoint = maze3D.goalPoint;

    board = new Board(
      maze3D.maze,
      maze3D.initPoint,
      maze3D.goalPoint,
      "./player.png",
      maze3D.initPoint
    );

    board.drawInitBoard();
    board.play();
  }
});

solveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(mazeBoard);
  const adapter = new mazeAdapter(mazeBoard, initPoint, goalPoint);
  if (searchType.value === "BFS") {
    const search = new BreadthFirstSeaerch(adapter);
    let res = search.breadthFirstSeaerchAlgo();
    board.animSolve(res);
  } else if (searchType.value === "DFS") {
    const seaech = new DepthFirstSearch(adapter);
    let res = seaech.depthFirstSeaerchAlgo();
    board.animSolve(res);
  } else if (searchType.value === "A") {
    const seaech = new AStarSearch(adapter);
    let res = seaech.AStarAlgo();
    board.animSolve(res);
  }
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (gameName) {
    const gameNames = localStorage.getItem("games");
    const games = JSON.parse(gameNames);
    games.push(gameName);
    localStorage.setItem("games", JSON.stringify(games));
    gameNameSl.options.add(new Option(`${gameName}`, `${gameName}`));
    localStorage.setItem(gameName, JSON.stringify(board));
  }
});

loadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const name = gameNameSl.value;

  const game = JSON.parse(localStorage.getItem(name));

  if (game) {
    const localStorageManager = new LocalManager(game);
    localStorageManager.generate();

    console.log(localStorageManager.mazeSave);
    const boardSave = new Board(
      localStorageManager.mazeSave,
      localStorageManager.initPoint,
      localStorageManager.goalPoint,
      localStorageManager.playerImg,
      localStorageManager.playerPoint
    );

    mazeBoard = localStorageManager.mazeSave;
    initPoint = localStorageManager.initPoint;
    goalPoint = localStorageManager.goalPoint;

    board = boardSave;

    board.drawInitBoard();
  }
});
