function interpretBrainFuck(program, inputArray, arrayLength) {
  let mainArray = initArray(arrayLength);

  let locationIndex = 0;
  let index = 0;
  let resultArray = 0;

  while (locationIndex < program.length) {
    switch (program[locationIndex]) {
      case "+":
        mainArray[index]++;
        locationIndex++;
        console.log(locationIndex);
        console.log(program.length);
        break;

      case "-":
        mainArray[index]--;
        locationIndex++;
        break;

      case "<":
        index--;
        locationIndex++;
        break;

      case ">":
        index++;
        locationIndex++;
        break;

      case ".":
        resultArray += String.fromCharCode(mainArray[index]);
        locationIndex++;
        break;
      case ",":
        break;

      case "[":
        break;

      case "]":
        break;
    }
  }
  return resultArray;
}

function initArray(length) {
  return Array(length).fill(0);
}
