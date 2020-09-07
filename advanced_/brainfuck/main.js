

function interpretBrainFuck(program, inputArray, arrayLength) {
    checkForBrackets(program)

    arr = []
    for(i = 0; i < program.length; i++)
    switch (program[i]) {
        case '+': program[i]++;
        break;
        
        case '-':
        break;
        
        case '<':
        break;
        
        case '>':
        break;
        
        case '.': let res = String.fromCharCode(program[i]);
        return arr.push(res);
        
        break;
        case ',':
        break;
        
        case '[':
        break;
        
        case ']':
        break;
    }
    return res;
}

function checkForBrackets(program) {
if (!program.indexOf(']') === -1 && !program.indexOf('[') === -1) {
return alert("no brackets detected");
}
}