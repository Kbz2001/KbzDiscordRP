var green = "#20d600";
var red = "#d60000";
var isButtonEnabled = false;
var count = 1;

document.getElementById('enabledButton').onclick = function () {

    if (count == 1) {

        this.style.backgroundColor = red;
        count = 0;
        isButtonEnabled = false;

    }
    else {

        this.style.backgroundColor = green;
        count = 1;
        isButtonEnabled = true;

    }
}