function Rolls() { }

Rolls.randomBool = function(odds) {
    if (odds == undefined) {
        odds = .5;
    }
    return Math.random() < odds;
}

Rolls.roll =function(odds){
    if (odds == undefined) {
        odds = .99;
    }
    var sum = 0;
    var goingUp = Rolls.randomBool();
    while (Rolls.randomBool(odds)) {
        sum += .1 * (goingUp ? 1 : -1)
    }
    return sum;
}

Rolls.rollId = 0;

Rolls.cycle  = function() {
    var at = 0;

    Rolls.rollId++;
    var myRollId = Rolls.rollId;
   

    setTimeout(function () {
        Rolls.update(myRollId, 0,1000)
    }, 0);

}

Rolls.doneAt = 7500;

Rolls.count = 3;

Rolls.update = function(myRollId, at, timePassed) {

    //var lastRow = $("#roll-" + (Rolls.count + at - 1) % Rolls.count);
    //lastRow.css("border-color", "#ffffff");
    $(".roll-result").css("border-color", "#ffffff");
    $(".roll-result").hide();

    if (myRollId == Rolls.rollId) {
        //while (!$("#roll-" + (at) % Rolls.count).is(":visible")) {
        //    at++;
        //}
        console.log("update-" + (at) % Rolls.count);

        var currentRow = $("#roll-" + (at) % Rolls.count);
        //currentRow.css("border-color", "#000000");
        currentRow.show();

        var timeOut = Rolls.getTimeOut(timePassed);

        timePassed += timeOut;
        
        if (timePassed < Rolls.doneAt + (Math.random()*2500)) {

            setTimeout(function () {
                Rolls.update(myRollId, at + 1, timePassed)
            }, timeOut);
        } else {
            setTimeout(function () {
                currentRow.css("border-color", "#000000")
            }
                , timeOut);
        }
    }
}

Rolls.getTimeOut = function (timePassed) {
    return Math.pow((timePassed / 200),2) + (Math.random() * (500))
}