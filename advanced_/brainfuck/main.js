const startButton = document
  .getElementById("start-button")
  .addEventListener("click", interpretBrainFuck);
const stopButton = document.getElementById("stop-button");

function interpretBrainFuck() {
  document.getElementById("start-button").classList.add("hidden");
  let arrayLength = document.getElementById("arrayLength").value;
  let input = document.getElementById("input").value;
  let inputArray = document.getElementById("extra-values").value;
  let mainArray = initArray(arrayLength);
  let filteredArray = filterArray(input);
  let locationIndex = 0;
  let index = 0;
  let resultArray = "";

  const bracketPairs = genBracketPairs(filteredArray);

  if (!bracketPairs.valid) return "SYNTAX ERROR";

  while (locationIndex < filteredArray.length) {
    let currentElement = filteredArray[locationIndex];
    let currentCell = document.getElementById(index);
    switch (currentElement) {
      case "+":
        if (mainArray[index] === 255) return "INCORRECT VALUE";
        mainArray[index]++;
        locationIndex++;
        currentCell.innerHTML++;
        break;
      case "-":
        if (mainArray[index] === -1) return "INCORRECT VALUE";
        mainArray[index]--;
        locationIndex++;
        currentCell.innerHTML--;
        break;
      case ".":
        let res = String.fromCharCode(mainArray[index]);
        resultArray += res;
        locationIndex++;
        break;
      case "<":
        if (index === 0) return "POINTER OUT OF BOUNDS";
        index--;
        locationIndex++;
        break;
      case ">":
        if (index === mainArray[index] - 1) return "POINTER OUT OF BOUNDS"; //probleem met index
        index++;
        console.log(index);
        locationIndex++;
        break;
      case "]":
        locationIndex = findBrotherIndex(bracketPairs, locationIndex);
        break;
      case "[":
        if (mainArray[index] === 0) {
          locationIndex = findBrotherIndex(bracketPairs, locationIndex) + 1;
        } else {
          locationIndex++;
        }
        break;
      case ",":
        mainArray[index] = inputArray.shift();
        locationIndex++;
        break;
    }
  }
  document.getElementById("output").innerHTML = resultArray;
}

function initArray(length) {
  return Array(length).fill(0);
}

function filterArray(array) {
  return array.replace(/[^><+-.,\[\]]/g, "").split("");
}

function genBracketPairs(code) {
  const bracketPairs = code.reduce(
    function (result, val, index) {
      if (result.valid) {
        if (val === "[") {
          result.pairs.push([index]);
        }
        if (val === "]") {
          result = result.pairs.reduceRight(
            function (pairResult, pair) {
              if (!pairResult.valid && pair.length === 1) {
                pair.push(index);
                pairResult.valid = true;
              }
              pairResult.pairs.push(pair);
              return pairResult;
            },
            { valid: false, pairs: [] }
          );
        }
      }
      return result;
    },
    { valid: true, pairs: [] }
  );

  bracketPairs.valid =
    bracketPairs.valid &&
    bracketPairs.pairs.filter((pair) => pair.length === 1).length === 0;

  return bracketPairs;
}

function findBrotherIndex(bracketPairs, curIndex) {
  return bracketPairs.pairs.reduce((result, pair) => {
    let foundIndex = pair.indexOf(curIndex);
    if (foundIndex < 0) return result;
    return pair[1 - foundIndex];
  }, -1);
}
