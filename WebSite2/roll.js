function Rolls() { }

Rolls.randomBool = function(odds) {
    if (odds == undefined) {
        odds = .5;
    }
    return Math.random() < odds;
}

Rolls.getRollFunction = function (spread) {
	return function () {
		console.log("rolled");
		for (var i = 0; i < 6; i++) {
			var r = Rolls.roll( Math.pow(.5, Rolls.step / spread)) + getBonus();
			if (r < 0) {
				var red = Math.min(1, Math.abs(r) / (50));
				var cc = Color.colorCode(255, 1 - red, 1 - red);
			} else {
				var green = Math.min(1, Math.abs(r) / (50))
				var cc = Color.colorCode(1 - green, 255, 1 - green);
			}
			$("#roll-" + i).css("background-color", cc);
			$("#roll-" + i).text((r < 0 ? "" : " ") + truncate(r));
		}
		Rolls.cycle();
	}
}

Rolls.step = .1;
// this is not really they average this is the number it will be less than half the time
Rolls.average = 5.0;
Rolls.baseOdds = Math.pow(.5, Rolls.step / Rolls.average);//(Rolls.average - Rolls.step) / (Rolls.average); //Rolls.average / (Rolls.average + Rolls.step);

Rolls.roll =function(odds){
    if (odds == undefined) {
        odds = Rolls.baseOdds;
    }
    var sum = 0;
    var goingUp = Rolls.randomBool();
    while (Rolls.randomBool(odds)) {
        sum += Rolls.step * (goingUp ? 1 : -1)
    }
    return sum;
}

Rolls.rollId = 0;

Rolls.cycle  = function() {
    var at = 0;

    Rolls.rollId++;
    var myRollId = Rolls.rollId;
   

    setTimeout(function () {
        $(".roll-results").addClass("rolling")
        Rolls.update(myRollId, 0, 3000)
    }, 0);

}

Rolls.doneAt = 7500;

Rolls.count = 3;

Rolls.update = function(myRollId, at, timePassed) {

    //var lastRow = $("#roll-" + (Rolls.count + at - 1) % Rolls.count);
    //lastRow.css("border-color", "#ffffff");
    //$(".roll-result").css("border-color", "#ffffff");
    //$(".roll-result").hide();
    $(".roll-result").removeClass("active")

    if (myRollId == Rolls.rollId) {
        //while (!$("#roll-" + (at) % Rolls.count).is(":visible")) {
        //    at++;
        //}
        console.log("update-" + (at) % Rolls.count);

        var currentRow = $("#roll-" + (at) % Rolls.count);
        //currentRow.css("border-color", "#000000");
        //currentRow.show();
        currentRow.addClass("active");

        var timeOut = Rolls.getTimeOut(timePassed);

        timePassed += timeOut;
        
        if (timePassed < Rolls.doneAt + (Math.random()*2500)) {
            setTimeout(function () {
                Rolls.update(myRollId, at + 1, timePassed)
            }, timeOut);
        } else {
            setTimeout(function () {
                if (myRollId == Rolls.rollId) {
                    $(".roll-results").removeClass("rolling")
                }
            }
                , timeOut);
        }
    }
}

Rolls.getTimeOut = function (timePassed) {
    return Math.pow((timePassed / 200),2) + (Math.random() * (200))
}