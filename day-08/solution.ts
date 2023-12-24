export type Route = string[];
export type Nodes = Record<string, { L: string; R: string }>;

export const parseInput = (input: string): { route: Route; nodes: Nodes } => {
  const [rawRoutes, rawNodes] = input.split("\n\n");

  return {
    route: rawRoutes.split(""),
    nodes: rawNodes
      .split("\n")
      .filter(Boolean)
      .reduce((prev, curr) => {
        const parts = curr.split(" = ");
        const key = parts[0];
        const pairString = parts[1]; // e.g. "(AAA, ZZZ)"

        return {
          ...prev,
          [key]: {
            L: pairString.substring(1, 4),
            R: pairString.substring(6, 9),
          },
        };
      }, {}),
  };
};

export const getNumberOfStepsToZZZ = (input: string) => {
  const { route, nodes } = parseInput(input);

  // Start at AAA
  let location = "AAA";
  let stepsTaken = 0;

  // Until you reach ZZZ
  while (location !== "ZZZ") {
    // Keep repeating the list of instructions
    const instructionNumber = stepsTaken % route.length;
    const instruction = route[instructionNumber];

    const currentNode = nodes[location];

    // Update location by following the instruction
    location = currentNode[instruction];
    // and increment steps taken
    stepsTaken = stepsTaken + 1;
  }

  return stepsTaken;
};
