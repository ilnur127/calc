var n9 = document.getElementById("dev");
var n8 = document.getElementById("vos");
var n7 = document.getElementById("sem");
var n6 = document.getElementById("hest");
var n5 = document.getElementById("payt");
var n4 = document.getElementById("chet");
var n3 = document.getElementById("tri");
var n2 = document.getElementById("dva");
var n1 = document.getElementById("odin");

var n0 = document.getElementById("nul");
var AC = document.getElementById("AC");
var um = document.getElementById("umo");
var sl = document.getElementById("slo");
var vic = document.getElementById("min");
var rav = document.getElementById("ravno");
var zap = document.getElementById("zap");
var proc = document.getElementById("pros");
var del = document.getElementById("deli");
var vichsum = document.getElementById("visl");
var inputRaw = document.getElementById('input-raw');

var calculater = {
    cifriCount: 0,
    prevValue: null,
    curentValue: 0,
    curentText: "",
    dopis: true,
    dotClicked: false,
    dotPartLevel: 1,
    setCurentText(text) {
        inputRaw.innerHTML = text;
        calculater.curentText = text;
    },
    clean: function() {
        calculater.curentOperation = null;
        calculater.prevValue = null;
        calculater.curentValue = 0;
        calculater.dotClicked = false;
        calculater.updateView();
    },
    clickNumver: function(value) {
        calculater.cifriCount++;
        if (calculater.curentValue == 0 && !calculater.dotClicked || !dopis) {
            calculater.curentValue = value;
            dopis = true;
        } else {
            if (calculater.dotClicked) {
                calculater.curentValue = calculater.curentValue + value / Math.pow(10, calculater.dotPartLevel);
                calculater.dotPartLevel++;
            } else { calculater.curentValue = calculater.curentValue * 10 + value; }
        }
        calculater.updateView();
    },
    newAction: function(operation) {
        calculater.cifriCount = 0;
        if (calculater.curentOperation != null) {
            calculater.showResult()
        }
        calculater.prevValue = calculater.curentValue;
        calculater.curentValue = 0;
        calculater.curentOperation = operation;
        dopis = true;
        calculater.dotClicked = false;
        calculater.dotPartLevel = 1;
        calculater.updateView();
    },
    updateView: function() {
        if (calculater.curentOperation == null) {

            if (calculater.dotClicked && calculater.curentValue % 1 == 0) {
                var text = calculater.curentValue + '.';
                for (var i = 0; i < calculater.dotPartLevel - 1; i++) {
                    text += '0';
                }
                calculater.setCurentText(text);

            } else {
                calculater.setCurentText(calculater.curentValue);
            }
        } else {
            if (calculater.cifriCount != 0) {
                if (calculater.dotClicked && calculater.curentValue % 1 == 0) {
                    var text = calculater.curentValue + '.';
                    for (var i = 0; i < calculater.dotPartLevel - 1; i++) {
                        text += '0';
                    }
                    calculater.setCurentText(calculater.prevValue + " " + calculater.curentOperation.char + " " + text);
                } else {
                    calculater.setCurentText(calculater.prevValue + " " + calculater.curentOperation.char + " " + calculater.curentValue);
                }
            } else {
                if (calculater.curentOperation.showFirstIfZero) {
                    calculater.setCurentText(calculater.prevValue + " " + calculater.curentOperation.char);
                } else {
                    calculater.setCurentText(calculater.curentOperation.char);
                }
            }
        }
    },
    showResult: function() {
        if (calculater.curentOperation != null) {
            calculater.curentValue = calculater.curentOperation.action(calculater.prevValue, calculater.curentValue);
        }
        calculater.curentOperation = null;
        calculater.prevValue = null;
        dopis = false;
        calculater.updateView();
    },
    clickDot: function() {
        if (!calculater.dotClicked) {
            calculater.dotClicked = true;
            calculater.dotPartLevel = 1;
            calculater.updateView();
        }
    },
    clickivert: function() {
        if (calculater.curentOperation != null) {
            calculater.showResult()
        }
        calculater.curentValue = -calculater.curentValue;
        calculater.updateView();
    },
    clickPercent: function() {
        if (calculater.curentOperation != null) {
            calculater.showResult()
        }
        calculater.curentValue = calculater.curentValue / 100;
        calculater.updateView();
    }
}

var numbers = [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9];
var hendlerGen = function(numberBtn, i) {
    numberBtn.addEventListener('click', function() {

        calculater.clickNumver(i);
    });
}
for (var i = 0; i < numbers.length; i++) {
    hendlerGen(numbers[i], i)

}
sl.addEventListener('click', function() {
    calculater.newAction({
        showFirstIfZero: false,
        char: '+',
        action: function(a, b) {

            return a + b;
        }
    });
})
vic.addEventListener('click', function() {
    calculater.newAction({
        showFirstIfZero: false,
        char: '-',
        action: function(a, b) {

            return a - b;
        }
    });
})
um.addEventListener('click', function() {
    calculater.newAction({
        showFirstIfZero: true,
        char: '*',
        action: function(a, b) {

            return a * b;
        }
    });
})
del.addEventListener('click', function() {
    calculater.newAction({
        showFirstIfZero: true,
        char: '/',
        action: function(a, b) {

            return a / b;
        }
    });
})
rav.addEventListener('click', function() {
    calculater.showResult();
});
AC.addEventListener('click', function() {
    calculater.clean();
});
zap.addEventListener('click', function() {
    calculater.clickDot();

})
vichsum.addEventListener('click', function() {
    calculater.clickivert();
})

proc.addEventListener('click', function() {
    calculater.clickPercent();
})
$(document).keypress(function(e) {
    console.log("key = " + event.keyCode);
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        calculater.clickNumver(event.keyCode - 48);
    }
    switch (event.keyCode) {
        case 43:
            calculater.newAction({
                showFirstIfZero: false,
                char: '+',
                action: function(a, b) {

                    return a + b;
                }
            });
            break;
        case 13:
            calculater.showResult();

            break;

    }
});