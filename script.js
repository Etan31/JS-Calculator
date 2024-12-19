var calculation;
var periodCheck = false;
var ParCheck = false;
var parCount = 0;


function EnterNum(input) {
    CheckForPar();
    Cleanup();
    
    const enterField = document.getElementById('enterfield');
    
    // Helper function to append a value to the input field
    const appendToField = (value) => {
        enterField.value += value;
    };


    if (typeof input === 'number' && input >= 0 && input <= 9) {
        // Handle numbers
        appendToField(input);
        ParCheck = true;
    } else if (input === 'P') {
        // Handle parentheses
        if (!ParCheck) {
            appendToField('(');
            parCount++;
        } else {
            appendToField(')');
            parCount--;
        }
    } else if (input === '.') {
        // Handle decimal point
        if (!periodCheck) {
            appendToField('.');
            periodCheck = true;
        }
        ParCheck = false;
    }

    // Update calculation value
    calculation = enterField.value;
}

function EnterAction(n){
    Cleanup();
    CheckForPar();
    let calculationfield = document.getElementById('enterfield').value;
    switch (n){
        case 'D': 
            let lastChar = document.getElementById("enterfield").value.slice(-1);
            if(lastChar == "."){
                periodCheck = false;
            }
            if(lastChar == "("){
                parCount--;
            }
            if(lastChar == ")"){
                parCount++;
                if(parCount > 0){
                    ParCheck = true;
                }
            }
            del = calculationfield.substring(0, calculationfield.length-1); 
            document.getElementById('enterfield').value = del;
            calculation =  document.getElementById('enterfield').value
            break;
        case 'C':
            document.getElementById('enterfield').value = '';
            periodCheck = false;
            ParCheck = false;
            parCount = 0;
            calculation = document.getElementById('enterfield').value
            break;

    }
}

function EnterOperator(n){
    Cleanup();
    if(n != "="){
        let calculationfield = document.getElementById('enterfield').value;
        if(calculationfield.length == 0 && n != "-" || calculationfield == "-"){
            return;
        } else{
            let lastChar = document.getElementById("enterfield").value.slice(-1);
            if(lastChar == "+" || lastChar == "-" || lastChar == "/" || lastChar =="*" || lastChar =="%"){
                let del = calculationfield.substring(0, calculationfield.length-1); 
                document.getElementById('enterfield').value = del +n;
            }else{
                if(lastChar == "."){
                    document.getElementById('enterfield').value += "0" + n;
                } else{
                    document.getElementById('enterfield').value += n;
                }
                periodCheck = false;
            }   
        }
    }
    else{
         if(document.getElementById('enterfield').value == ""){
            return;
         }else{
            try{
                document.getElementById('enterfield').value = eval(calculation);
            }
            catch(e){
                document.getElementById('enterfield').value = "Format Error";
            }
            periodCheck = false;
            ParCheck = false;
            parCount = 0;
        }
    }
}

function nonLinearOperation(operation) {
    Cleanup();
    const inputField = document.getElementById('enterfield');
    let calculationField = inputField.value.trim();

    // Safely parse the input to avoid eval where possible
    const parsedValue = parseFloat(calculationField);
    if (isNaN(parsedValue) && operation !== '^') {
        inputField.value = 'Error';
        return;
    }

    switch (operation) {
        case '√': // Square Root
            inputField.value = Math.sqrt(parsedValue);
            break;
        case '^': // Power
            inputField.value += '**'; 
            break;
        case 'log': // Logarithm
            inputField.value = Math.log10(parsedValue);
            break;
        case 'sin': // Sine (convert to radians)
            inputField.value = Math.sin((parsedValue * Math.PI) / 180);
            break;
        default:
            inputField.value = 'Invalid Operation';
            break;
    }
}

function CheckForPar(){
    if(parCount == 0){
        ParCheck = false;
    }
}
function Cleanup(){
    if(document.getElementById('enterfield').value == "undefined" || document.getElementById('enterfield').value == "Format Error"){
        document.getElementById('enterfield').value ="";
    }
}