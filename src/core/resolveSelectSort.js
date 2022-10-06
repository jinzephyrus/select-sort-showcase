import breakpoint from "../components/TextDisplay/shared.js";

const Step = {
  id: 0,
  iIndex: 0,
  jIndex: 0,
  taggedIndex: 0,
  breakpoint: breakpoint.begin,
};

const mergeArrayIntoStep = (step, array) => {
  return Object.assign({ array }, step);
};

// the function should be based on select sort algorithm
const resolveSelectSort = (array) => {
  let temp;
  let minIdx;
  let stepId = 0;

  const currentStep = Object.assign(Step);
  const sorted = array.slice();
  const steps = [];

  // the zeroth step
  currentStep.id = stepId++;
  currentStep.iIndex = -1;
  currentStep.jIndex = -1;
  currentStep.taggedIndex = -1;
  currentStep.breakpoint = breakpoint.begin;
  steps.push(mergeArrayIntoStep(currentStep, sorted.slice()));

  const deepClone = (step) => {
    const stringified = JSON.stringify(step);

    return JSON.parse(stringified);
  };

  for (let i = 0; i < sorted.length - 1; i++) {
    minIdx = i;

    // store step once (reset)
    currentStep.id = stepId++;
    currentStep.iIndex = i;
    currentStep.jIndex = i;
    currentStep.taggedIndex = -1;
    currentStep.breakpoint = breakpoint.initialize;
    steps.push(deepClone(currentStep));

    for (let j = i + 1; j < sorted.length; j++) {
      // store step once (next number)
      currentStep.id = stepId++;
      currentStep.jIndex = j;
      currentStep.breakpoint = breakpoint.nextNumber;
      steps.push(deepClone(currentStep));

      if (sorted[minIdx] > sorted[j]) {
        minIdx = j;

        // store step once (tag)
        currentStep.id = stepId++;
        currentStep.taggedIndex = j;
        currentStep.breakpoint = breakpoint.tag;
        steps.push(deepClone(currentStep));
      }
    }

    if (minIdx !== i) {
      temp = sorted[i];
      sorted[i] = sorted[minIdx];
      sorted[minIdx] = temp;

      // store step once (switch place)
      currentStep.id = stepId++;
      currentStep.jIndex = -1;
      currentStep.breakpoint = breakpoint.switchPlace;
      steps.push(mergeArrayIntoStep(currentStep, sorted.slice()));
    }
  }
  // show result
  currentStep.id = stepId++;
  currentStep.iIndex = -1;
  currentStep.taggedIndex = -1;
  currentStep.breakpoint = breakpoint.showResult;
  steps.push(deepClone(currentStep));
  return steps;
};

export default resolveSelectSort;
