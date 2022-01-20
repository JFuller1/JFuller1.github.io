const btns = document.getElementById('numberPad');
const specialBtns = document.getElementById('operationPad');
const numberOut = document.getElementById('numbers');
const operationOut = document.getElementById('operation');
let operation = '';
let canOperation = true;
let num1 = 2;
let num2 = 2;

btns.childNodes.forEach(name => {
    name.addEventListener('click', function(){

        switch (name.innerText) {
            case 'CLEAR' :
                numberOut.innerText = "";
                operationOut.innerText = "";
                operation.innerText = "";
                break;
            
            case 'x' :
                if(operationOut.innerText != '' && canOperation == true) {
                    operation = ' x ';
                    operationOut.innerText += operation;
                    numberOut.innerText = '';
                    canOperation = false;
                }
                break;
            
            case '/' :
                if(operationOut.innerText != '' && canOperation == true) {
                    operation = ' / ';
                    operationOut.innerText += operation;
                    numberOut.innerText = '';
                    canOperation = false;
                }
                break;
                
            case '+' :
                if(operationOut.innerText != '' && canOperation == true) {
                    operation = ' + ';
                    operationOut.innerText += operation;
                    numberOut.innerText = '';
                    canOperation = false;
                }
                break;

            case '-' :

                if(canOperation == true) {
                    operation = ' - ';
                    operationOut.innerText += operation;
                    numberOut.innerText = '';
                    canOperation = false;
                }
                break;

            case '.' :

                if(operationOut.innerText != '' &&canOperation == true) {
                    operation = '.';
                    operationOut.innerText += operation;
                    numberOut.innerText = '';
                    canOperation = false;
                }
                break;
            
            case '=' :
                if(operationOut.innerText != '') {
                    let equation = operationOut.innerText;
                    equation = equation.replace(' x ', ' * ');

                    numberOut.innerText = eval(equation);
                }
                break;
            default:
                operationOut.innerText += name.innerText;
                canOperation = true;
                break;
        }
    });
});


