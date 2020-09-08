function interpretBrainFuck(program, inputArray, arrayLength) {
  let mainArray = initArray(arrayLength);
  let filteredArray = filterArray(program);
  let locationIndex = 0;
  let index = 0;
  let resultArray = "";

  while (locationIndex < filteredArray.length) {
    switch (program[locationIndex]) {
      case "+":
        if (mainArray[index] === 255) return "INCORRECT VALUE";
        mainArray[index]++;
        locationIndex++;
        console.log(locationIndex);
        console.log(program.length);
        break;

      case "-":
        if (mainArray[index] === 0) return "INCORRECT VALUE";
        mainArray[index]--;
        locationIndex++;
        break;

      case "<":
        if (index === 0) return 'POINTER OUT OF BOUNDS';
        index--;
        locationIndex++;
        break;

      case ">":
        if (index === arrayLength - 1) return 'POINTER OUT OF BOUNDS';
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
