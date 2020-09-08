function interpretBrainFuck(program, inputArray, arrayLength) {
  let mainArray = initArray(arrayLength);
  let filteredArray = filterArray(program);
  let locationIndex = 0;
  let index = 0;
  let resultArray = 0;

  while (locationIndex < filteredArray.length) {
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
        locationIndex++;
        break;

      case "[":
        locationIndex++;
        break;

      case "]":
        locationIndex++;
        break;
    }
  }
  console.log(resultArray);
  return resultArray;
}

function initArray(length) {
  return Array(length).fill(0);
}

function filterArray(array) {
  return array.replace(/[^><+-.,\[\]]/g, "").split("");
}
