word = 'fluffy';
current_word = '______';
guessed_already = [];

score = 50;
multiplier = 1;

var guessLetter = (guessed_letter) => {
    guessed_letter = guessed_letter.toLowerCase();
    word = word.toLowerCase();
    if (word.includes(guessed_letter)) {
        if (!(guessed_already.includes(guessed_letter))) {
            console.log(`Correct Guess. You guessed: ${guessed_letter}`);
            all_indexes = getAllCharPositions(word, guessed_letter);
            current_word = replaceMultipleIndices(current_word, all_indexes, guessed_letter);
            score += 10 * multiplier;
            multiplier += 1;
            guessed_already.push(guessed_letter);
        }
        else {
            console.log(`You guessed ${guessed_letter} already.`);
        }
    }
    else {
        console.log(`Incorrect Guess. You guessed: ${guessed_letter}`);
        score -= 10;
        multiplier = 1;
    }
    displayElement = document.getElementById('current_score');
    displayElement.innerHTML = `points: ${score}`;

    if (score == 0 || current_word == word) {
        console.log('End Game.');
        displayElement = document.getElementById("input_section");
        displayElement.style.display = 'none';
    }
}

var checkChar = () => {
    var guessed_letter = document.getElementById("userInput").value;
    guessLetter(guessed_letter);
    displayElement = document.getElementById('current_word');
    displayElement.innerHTML = current_word;
    document.getElementById('userInput').value = '';
}

document.getElementById("current_word").innerHTML = current_word;
document.getElementById("current_score").innerHTML = `points: ${score}`;

var restart_game = () => {
    location.reload();
}




// -------------------------------------------------------------------------------------
function replaceMultipleIndices(inputString, indicesToReplace, replacementChar) {
    return inputString.split('').map((char, index) => {
        return indicesToReplace.includes(index) ? replacementChar : char;
    }).join('');
}

function getAllCharPositions(inputString, charToFind) {
    var positions = [];
    var position = inputString.indexOf(charToFind);

    while (position !== -1) {
        positions.push(position);
        position = inputString.indexOf(charToFind, position + 1);
    }

    return positions;
}