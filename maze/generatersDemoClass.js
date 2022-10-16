import DFSMaze3dGenerator from "./DFSMaze3dGenerator.js";
import aldousBroderMaze3dGenerator from "./aldousBroderMaze3dGeneratorClass.js";
import Simple3dGenerator from "./simpleMaze3dGeneratorClass.js";
import Maze3d from "./maze3dClass.js";

class GeneratorsDemo {
  run() {
    const DFSmaze = new DFSMaze3dGenerator(50, 50, 3);
    const ABmaze = new aldousBroderMaze3dGenerator(50, 50, 3);
    const SimpleMaze = new Simple3dGenerator(50, 50, 3);

    const DFSmazeGI = new Maze3d(DFSmaze.maze);
    const ABmazeGI = new Maze3d(ABmaze.maze);
    const SimplemazeGI = new Maze3d(SimpleMaze.maze);

    console.log(`DFS generator — ${DFSmaze.measureAlgorithmTime()} ms`);
    console.log(DFSmazeGI.toString());
    console.log(
      `Aldous Broder generator — ${ABmaze.measureAlgorithmTime()} ms`
    );
    console.log(ABmazeGI.toString());
    console.log(`Simple generator — ${SimpleMaze.measureAlgorithmTime()} ms`);
    console.log(SimplemazeGI.toString());
  }
}

export default GeneratorsDemo;
