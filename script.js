// Logic:
// Total Characters excluding shift, backspace, delete, etc. Only count the letters, numbers, punctuations 
// Now, Calculate the total words by dividing the total characters typed by 5  
// Now, Divide the total words by total time taken = Gross WPM 
// Count the mistakes done 
// Subtract the mistakes from Gross WPM to find the Net WPM 
// Correct Typed Characters divided by Total Typed Characters 

// Variables:
// totalTypedCharacters
// totalTypedWords
// totalTimeTaken
// grossWPM
// totalIncorrectCharacters
// netWPM
// totalCorrectCharacters
// accuracy 
        
let originalText = "Hello! My name is Muhammad Hibban Haroon, and you are going to type this text for me. I don't know what else to say, the timer is like 1 minute so I just have to write some more text here for me to write that's how it is. That's how the game goes innit blud. I don't know a big word to write uh that can be like exemplary or presumptuous or something. I can I have written enough text to write in a minute. Any last thoughts before we finish this. None 0 Nothing!";
// let originalText = "hibban";
let typedCharacters = [];
let isCorrectCharacterEntered = false;
let index = 0;
let startTime = 60;
let timerInterval;
let isStartTime = false;

let totalTypedCharacters = 0;
let totalTypedWords = 0;    
let totalTimeTaken = 1;
let grossWPM = 0;
let totalIncorrectCharacters = 0;
let netWPM = 0;
let totalCorrectCharacters = 0;
let accuracy = 0;

let textArea = document.getElementById("textarea");
let timer = document.getElementById("timer");

function startTimer() {
    if(!isStartTime){
        timerInterval = setInterval(updateTimer, 1000);
        isStartTime = true;
    }
    textArea.focus();
}

function updateTimer() {
    startTime--;
    if (startTime < 0) {
        clearInterval(timerInterval);
        timer.textContent = "Timer: 00:00";

        //Call calculation function here

    } else {
        const minutes = Math.floor(startTime / 60);
        const seconds = startTime % 60;

        // Format minutes and seconds as two-digit strings
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        timer.textContent = "Timer: " + formattedMinutes + ":" + formattedSeconds;
    }
}

function changeText(){
    var text = textArea.innerText;
    var typedCharacter = text[0];
    var originalCharacter = originalText[index];
    
    if(index < originalText.length){
        totalTypedCharacters++;
        if(typedCharacter == originalCharacter || (typedCharacter.charCodeAt(0) == 160 && originalCharacter.charCodeAt(0) == 32)){
            totalCorrectCharacters++;
            isCorrectCharacterEntered = true;
            typedCharacters.push('<span style="color: black;">' + originalCharacter + '</span>');
        }
        else{
            totalIncorrectCharacters++;
            isCorrectCharacterEntered = false;
            typedCharacters.push('<span style="color: red;">' + originalCharacter + '</span>');
        }

        textArea.innerHTML = "";

        // Append the stored spans to the textArea
        for (var i = 0; i < typedCharacters.length; i++) {
            textArea.innerHTML += typedCharacters[i];
        }

        // Append the remaining text from originalText
        textArea.appendChild(document.createTextNode(originalText.substring(index + 1)));

        textArea.selectionStart = textArea.selectionEnd = index + 1;

        index++;   
    }
    else{
        //The last character you type before the textArea becomes not editable is being displayed at the start of the text.
        //Removing this character.
        textArea.textContent = textArea.textContent.substring(1);
        textArea.contentEditable = false;
    }
}

function backspaceKeyPressed(){
    var spans = textArea.getElementsByTagName("span");
    var lastNonGreySpan = null;

    for (var i = spans.length - 1; i >= 0; i--) {
        var span = spans[i];    
        var computedStyle = window.getComputedStyle(span);
        var color = computedStyle.getPropertyValue("color");

        if (color !== "rgb(128, 128, 128)") { // Check if color is not grey
            lastNonGreySpan = span;
            break;
        }
    }
    lastNonGreySpan.style.color = 'grey';
    typedCharacters.pop();

    if(isCorrectCharacterEntered == true){
        totalCorrectCharacters--;
    }
    else{
        totalIncorrectCharacters--;
    }

    totalTypedCharacters--;
    index--;
}


window.onload = function() {
    textArea.focus();
    textArea.textContent = originalText;
    textArea.style.color = 'grey';
    textArea.addEventListener('input', changeText);
    textArea.addEventListener("keydown", function(event) {
        if (event.key === "Backspace" || event.keyCode === 8) {
            backspaceKeyPressed();
        }
    });
};