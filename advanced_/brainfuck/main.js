function interpretBrainFuck(program, inputArray, arrayLength) {
  let mainArray = initArray(arrayLength);

  let locationIndex = 0;
  let index = 0;
    while(locationIndex < program.length) {
    switch (program[locationIndex]) {
      case "+":
        index++;
        locationIndex++;
        console.log(locationIndex);
        console.log(index);
        break;

      case "-":
        break;

      case "<":
        break;

      case ">":
        break;

      case ".":
        break;
      case ",":
        break;

      case "[":
        break;

      case "]":
        break;
    }
  }
}

function initArray(length) {
  return Array(length).fill(0);
}
