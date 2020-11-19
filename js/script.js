// NOTE : Er is geen sprake van plagiaat. Alle code, inclusief de Engelse commentaren, heb ik zelf geschreven.
// © Ryan van Valkenhoef 2020

var display = '0';
var subdisplay = '';
var calculation = '';
var calcHistory = []

for(let i = -8; i < 16; i++) {
    var element = document.getElementById('b' + `${i}`);
    element.addEventListener("click", function() {
        buttonActivated(i);
    });
}

document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 82:
            buttonActivated(-5);
            break;
        case 13:
        case 61:
            buttonActivated(15);
            break;
        case 109:
        case 189:
            buttonActivated(13);
            break;
        case 107:
            buttonActivated(14);
            break;
        case 188:
        case 110:
            buttonActivated(10);
            break;
        case 191:
        case 111:
            buttonActivated(11);
            break;
        case 106:
        case 88:
            buttonActivated(12);
            break;
        case 8:
            playSound()
            display = '0';
            document.getElementById('display').value = display;
            break;
        case 48:
        case 96:
            buttonActivated(0);
            break;
        case 49:
        case 97:
            buttonActivated(1);
            break;
        case 50:
        case 98:
            buttonActivated(2);
            break;
        case 51:
        case 99:
            buttonActivated(3);
            break;
        case 52:
        case 100:
            buttonActivated(4);
            break;
        case 53:
        case 101:
            buttonActivated(5);
            break;
        case 54:
        case 102:
            buttonActivated(6);
            break;
        case 55:
        case 103:
            buttonActivated(7);
            break;
        case 56:
        case 104:
            buttonActivated(8);
            break;
        case 57:
        case 105:
            buttonActivated(9);
            break;
        case 67:
        case 106:
            buttonActivated(-1);
            break;
    }
}, false);


if(calcHistory.length == 0) {
    document.getElementById('history-elements').innerHTML = '<p style="color: rgb(120, 120, 120);">Geen geschiedenis</p>';
}

function buttonActivated(i) {
    playSound()
        if(display == 'Syntax ERROR') {
            resetDisplays()
        }
        if(i >= 0 && i < 11 && i == 15 && i == -8) {
            includeMultiplication(false)
        } else {
            includeMultiplication(true)
        }
        changeDisplay(i)
}

function playSound() {
    var audioElement = document.getElementById("audio");
	audioElement.play();
}

function resetDisplays() {
    display = '0';
    subdisplay = '';
    document.getElementById('display').textContent = display;
    document.getElementById('subdisplay').textContent = subdisplay;
}

function includeMultiplication(elevenTillFifteen) {
    // Make sure if a function is used after a number or vice-versa, there is a multiplication symbol inbetween
    let lastChar = display[display.length-1];
    if(!containsSumsymbols(lastChar) && !containsFunctionsymbols(lastChar) && lastChar != '0' && !elevenTillFifteen || lastChar == ')' && elevenTillFifteen) {
        display += ' ×';
    } else if (lastChar == '√' || lastChar == 'g' || lastChar == 'n') {
        let displayarray = display.split(' ');
        if (displayarray.length > 1 && displayarray[displayarray.length-2] != '×' && displayarray[displayarray.length-1] != '^') {
            display = display.replace(displayarray[displayarray.length-1], '') + '× ' + displayarray[displayarray.length-1];
        }
    }
}

function insertSymbol(symbolStr) {
    // Don't add other symbols then '-' after a function
    let lastChar = display[display.length-1]
    if(lastChar == 'g' || lastChar == 'n' || lastChar == '√' || lastChar == '^') {
        if(symbolStr != '-') {
            return;
        } else {
            display += '-';
            return;
        }
    }
    
    if(subdisplay == '0 =' && display == '0') {
        display += ' ' + symbolStr;
    } else if (subdisplay != '0 =' && display == '0') {
        if (display == '0') {
            display = '';
        }
        display += symbolStr;
    } else {
        display += ' ' + symbolStr;
    }
    // If '- ' are the first characters in display and the display's length 
    // is lower or equal to 4 chars, remove the space
    let firstTwoChars = display.toString().slice(0, 2);
    if(display.length <= 4 && display.includes('- ')) {
        display = display.replace(' ', '');
    }
}

function changeDisplay(i) {
    switch(i) {
        // If i is an integer from 0-9
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            // Check if the display is 0. If so, set it to i, otherwise just add the integer.
            if(display == '0') {
                display = `${i}`;
            } else {
                let lastChar = display.toString().charAt(display.length-1);
                if (lastChar == '+' || lastChar == '×' || lastChar == '÷' || display.toString().slice(display.length-2, display.length) == ' -' && !containsSumsymbols(display.toString()[display.length-3])) {
                    display += ' ';
                }
                display += `${i}`;
            }
            if(display == '0') {
                changeSubdisplay('0 =')
            }
            // If '--' are the first characters in display and the display's length 
            // is lower or equal to 4 chars, remove the space
            let firstTwoChars = display.toString().slice(0, 2);
            if(display.length <= 4 && display.includes('--')) {
                display = display.replace(' ', '');
            }
            break;
        // If i is 10, add a comma to the display
        case 10:
            let lastComponent = display.split(' ')
            if(!lastComponent[lastComponent.length-1].includes(',')) {
                display += ',';
            }
            break;

        case 11:
            if (!containsSumsymbols(display.toString().charAt(display.length-1))) {
                if(display != '0') {
                    insertSymbol('÷')
                }
            }
            break;
        case 12:
            if (!containsSumsymbols(display.toString().charAt(display.length-1))) {
                if(display != '0') {
                    insertSymbol('×')
                }
            }
            break;
        case 13:
            let lastThreeChars = display.toString().slice(display.length-3, display.length);
            let lastTwoChars = display.toString().slice(display.length-2, display.length)
            console.log(lastThreeChars);
            if (lastTwoChars.includes('--') == false && lastThreeChars != '- -') {
                insertSymbol('-')
            }
            break;
        case 14:
            if (!containsSumsymbols(display.toString().charAt(display.length-1))) {
                if(display != '0') {
                    insertSymbol('+')
                }
            }
            break;
        case 15:
            let substr = display + ' ='
            changeSubdisplay(substr);
            calculation = display.toString().replace(/÷/g, '/').replace(/×/g, '*').replace(/,/g, '.').replace(/\^/g, '**').replace(/--/g, '+');
            var displayarray = display.toString().split(' ');
            let calcarray = calculation.toString().split(' ');

            if(calculation.includes('!')) {
                for(let i = 0; i < displayarray.length; i++) {
                    let basenum = displayarray[i].replace('-(', '').replace('log', '').replace('ln', '').replace('!', '').replace(/\(/g, '').replace(/\)/g, '').replace('√', '');
                    console.log('basenum ' + basenum);
                    if(basenum == '0') {
                        // Replace '0!' for 1 in calculation
                        calculation = calculation.replace(basenum + '!', '1');
                        displayarray[i] = displayarray[i].replace(basenum + '!', '1');
                    } else {
                        // Change the component with faculty ('!') to descending multiplications of the number before it
                        let item = parseInt(basenum);
                        let meaning = facultyMeaning(item, displayarray);
                        displayarray[i] = displayarray[i].replace(basenum + '!', '(' + meaning + ')');
                        calculation = calculation.replace(basenum + '!', '(' + meaning + ')');
                        console.log('calc: ' + basenum);
                    }
                }
            }

            // Pre-calculate the logarithms in the overall calculation
            if(calculation.includes('ln') || calculation.includes('log')) {
                // Using calcarray because the calculation must be in the right format before calculating
                for(let i = 0; i < calcarray.length; i++) {
                    if(calcarray[i].includes('ln') || calculation.includes('log')) {
                        let num = parseFloat(calcarray[i].replace(/ln/g, '').replace(/log/g, ''));
                        try {
                            var logvalue = 0;
                            if(calcarray[i].includes('ln')) {
                                logvalue = Math.log(num.toString());
                            } else {
                                logvalue = Math.log10(num.toString())
                            }
                            // Handle if logvalue is NaN
                            if(isNaN(logvalue)) {
                                display = 'Syntax ERROR';
                                document.getElementById('display').value = display;
                                changeSubdisplay('')
                                return;
                            }
                            if(calcarray[i].includes('**') && calcarray[i].includes('ln')) {
                                calculation = calculation.replace(calcarray[i], calcarray[i].replace('**', '*'))
                            }
                            if(calcarray[i].includes('log')) {
                                calculation = calculation.replace('log' + num.toString(), logvalue.toString());
                            } else {
                                calculation = calculation.replace('ln' + num.toString(), logvalue.toString());
                            }
                        } catch(error) {
                            return;
                        }
                    }
                }
            }

            // Remove the root symbols per component and place '**0.5' after it.
            if(calculation.includes('√')) {
                for(let i = 0; i < displayarray.length; i++) {
                    if(displayarray[i].includes('√')) {
                        calculation = calculation.replace(displayarray[i], '(' + displayarray[i].replace('√', '') + '**0.5)');
                        console.log('calculation: ' + calculation);
                    } 
                }
            }
            
            try {
                let outcome = eval(calculation);
                let item = substr + '|' + outcome;
                if (calcHistory[calcHistory.length-1] != item) {
                    calcHistory.push(item);
                }
                updateTable()
                display = outcome.toString();
            } catch(error) {
                display = 'Syntax ERROR';
                document.getElementById('display').value = display;
                changeSubdisplay('')
            }
            
            break;
        case -8:
            try {
                let lastChar = display.toString()[display.length-1];
                let charInt = int_try_parse(lastChar, console.error(), (10**lastChar.length)/10);
                let array = display.toString().split(' ');
                let component = array[array.length-1];
                if(!component.includes('^')) {
                    if(Number.isInteger(charInt) || lastChar == ')' || lastChar == '!') {
                        display += '^';
                    }
                }
            } catch(error) {
                display = 'Syntax ERROR';
            }
            
            break;
        case -7:
            try {
                let array = display.toString().split(' ');
                let component = array[array.length-1];
                let displaynum = int_try_parse(component, console.error(), (10**component.length)/10);
                console.log(displaynum);
                if(Number.isInteger(displaynum) && !component.includes('log')) {
                    if(display == '0') {
                        display = 'log';
                    } else {
                        if (display[display.length-1] != '^') {
                            display += ' '
                        } 
                        display += 'log';
                    }
                }
            } catch(error) {
                display = 'Syntax ERROR'
            }
            break;
        case -6:
            try {
                let array = display.toString().split(' ');
                let component = array[array.length-1];
                let displaynum = int_try_parse(component, console.error(), (10**component.length)/10);
                console.log(displaynum);
                if(Number.isInteger(displaynum) && !component.includes('ln')) {
                    if(display == '0') {
                        display = 'ln';
                    } else {
                        if (display[display.length-1] != '^') {
                            display += ' ';
                        } 
                        display += 'ln';
                    }
                }
            } catch(error) {
                display = 'Syntax ERROR';
            }
            break;
        case -5:
            try {
                let array = display.toString().split(' ');
                let component = array[array.length-1];
                let displaynum = int_try_parse(component, console.error(), (10**component.length)/10);
                console.log(displaynum);
                if(Number.isInteger(displaynum) && !component.includes('√')) {
                    if(display == '0') {
                        display = '√';
                    } else {
                        if (display[display.length-1] != '^') {
                            display += ' ';
                        } 
                        display += '√';
                    }
                }
            } catch(error) {
                display = 'Syntax ERROR';
            }
            break;
        case -4:
            try {
                let array = display.toString().split(' ');
                let component = array[array.length-1];
                let displaynum = int_try_parse(component, console.error(), (10**component.length)/10);
                console.log(displaynum);
                if(Number.isInteger(displaynum) && !component.includes('!') || display.charAt(display
                    .length) == ')') {
                    if(component.includes('-')) {
                        display = display.replace(component, '-(' + component.replace(/-/g, '') + '!)');
                    } else {
                        display = display.replace(component, '(' + component + '!)');
                    }
                    
                }
            } catch(error) {
                display = 'Syntax ERROR';
            }
            break;
        case -3:
            if(calculation.includes(' ') || display.includes('!')) {
                if(display.toString().charAt(0) == '-' && display.toString().charAt(1) == '(' && display.charAt(display.length-1) == ')') {
                    display = display.toString().slice(2, display.length-1);
                } else {
                    display = '-(' + display.toString() + ')';
                }
            } else {
                if(display.toString().charAt(0) == '-'){
                    display = display.toString().slice(1, display.length);
                } else {
                    if(containsFunctionsymbols(display.toString().charAt(0))) {
                        display = '- ' + display.toString();
                    } else {
                        display = '-' + display.toString();
                    }
                }
            }
            break;
        // If i is -2 and display is not 0, divide the first expression in display by 100
        case -2:
            calculation = display.toString().replace(/÷/g, '/').replace(/×/g, '*').replace(/,/g, '.');
            if (display.charAt(0) == '(' && display.charAt(display.length-1) == ')') {
                try {
                    display = eval("calculation / 100").toString();
                } catch(error) {
                    display = 'Syntax ERROR';
                }
            } else {
                var firstcomponent = display.split(' ')[0].replace(/,/g, '.');
                if(display != 0) {
                    if(display.includes(' ')){
                        try {
                            display = eval("firstcomponent / 100");
                        } catch(error) {
                            display = 'Syntax ERROR'
                        }
                    } else {
                        try {
                            display = eval("calculation / 100");
                        } catch(error) {
                            display = 'Syntax ERROR'
                        }
                    }
                }
            }
            break;
        // If i is -1, set the display to 0
        case -1:
            changeSubdisplay('')
            display = '0';
            break;
        default:
            break;
    }
    // Replace dots in display for comma's
    display = display.toString().replace(/\./g, ',')
    // Makes sure the display gets updated and overwrites the content of the element to the variable display
    document.getElementById('display').value = display;
}

function facultyMeaning(item, array) {
    console.log('item: ' + item.toString());
    var meaning = item;
    for(let i = 1; i < item; i++) {
        try {
            if(Number.isInteger(item)) {
                let addition = '*' + (item - i).toString();
                meaning += addition;
                console.log(meaning);
            }
        } catch(error) {
            console.log('No number');
        }
    }
    return meaning;
}

function updateTable() {
    document.getElementById('history-elements').innerHTML = '';
    for (let i = 0; i < calcHistory.length; i++) {
        var linkElement = document.createElement('a');
        var deleteBtn = document.createElement('button');
        // Setup styles
        deleteBtn.style.float = "left";
        deleteBtn.style.border = "none";
        deleteBtn.style.backgroundColor = "transparent";
        deleteBtn.style.fontSize = "20px";
        var icon = document.createElement('i');
        icon.style.opacity = "0.6";
        icon.className = "fas fa-trash";
        deleteBtn.appendChild(icon);
        deleteBtn.onclick = function() {
            var indx = 0;
            if((i-1) == -1) {
                indx = 1;
            } else if (indx == -2){
                indx = 2;
            } else { indx = i-1; }
            const index = calcHistory.indexOf(calcHistory[i]);
            console.log(index);
            console.log(i-1);
            if(index > -1){
                calcHistory.splice(index, 1);
            }
            updateTable()
        };
        let components = calcHistory[i].split('|');
        linkElement.onclick = function() {
            display = components[1];
            subdisplay = components[0];
            document.getElementById('display').value = display;
            document.getElementById('subdisplay').textContent = subdisplay;
        };
        var newElement = document.createElement('td');
        newElement.innerHTML = components[0] + '<br><b>' + components[1] + '</b>';
        newElement.style.display = "block";
        if(components[1].length > 10) {
            newElement.style.height = '90px !important';
        }
        newElement.appendChild(deleteBtn);
        linkElement.appendChild(newElement);
        document.getElementById('history-elements').appendChild(linkElement);
    }
    if(calcHistory.length == 0) {
        document.getElementById('history-elements').innerHTML = '<p style="color: rgb(120, 120, 120);">Geen geschiedenis</p>';
        display = '';
        subdisplay = '';
        document.getElementById('display').textContent = display;
        document.getElementById('subdisplay').textContent = subdisplay;
    }
}

function containsSumsymbols(lastCharacter) {
    if(lastCharacter == '÷' || lastCharacter == '×' || lastCharacter == '-' || lastCharacter == '+') {
        return true;
    } else {
        return false;
    }
}

function containsFunctionsymbols(lastCharacter) {
    if(lastCharacter == '√' || lastCharacter == 'n' || lastCharacter == 'g' || lastCharacter == '^') {
        return true;
    } else {
        return false;
    }
}

function changeSubdisplay(str) {
    subdisplay = str.toString().replace(/\./g, ',')
    document.getElementById('subdisplay').textContent = subdisplay;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

var int_try_parse = function(val, default_val, radix) {
    try {
        radix = radix || 10;
        default_val = default_val || 0;

        //validate this object is not null
        if (val != null) {
                    //convert to string
            var that = JSON.stringify(val);
            if (that.length > 0) {
                //check to see the string is not NaN, if not parse
                if (!isNaN(that)) {
                    return parseInt(that, radix);
                }
            }
        }
    }
    catch (err) {
        console.log(err);   
    }
    //this is not a number
    return default_val;
}