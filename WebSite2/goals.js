function Goals() { }

g.modules.push(Goals);

Goals.count = 3;
Goals.goals = [];
Goals.failedGoals = [];
Goals.passed = 0
Goals.failed = 0;
for (var i = 0; i < Goals.count; i++) {
	Goals.goals.push(new Goal());
}


Goals.setGoal = function (value, index) {
	Goals.goals[index-1].words = value;
	$("#goal-display-"+index).html(value.replace(/\r?\n/g, "<br />"));
	$("#goal-edit-" + index).val(value);
}

Goals.setEffort = function (value, index) {
	console.log("goal:" + (index - 1), Goals.goals)
	Goals.goals[index - 1].effort = value;
	$("#goal-effort-" + index).val(value);
}


Goals.updatePassed = function(toAdd){
    Goals.passed += Number(toAdd);
    $("#goal-passed").text(Goals.passed);
}

Goals.updateFailed = function (toAdd) {
    Goals.failed += Number(toAdd);
    $("#goal-failed").text(Goals.failed);
}

Goals.setPassed = function (newValue) {
    Goals.passed = Number(newValue);
    $("#goal-passed").text(Goals.passed);
}

Goals.setFailed = function (newValue) {
    Goals.failed = Number(newValue);
    $("#goal-failed").text(Goals.failed);
}

Goals.init = function () {
    console.log(Goals.goals.length)

	for (var i = 1; i < Goals.count + 1; i++) {
		$("#goal-edit-" + i).keyup((function(myI){
			return function () {
				Goals.setGoal($(this).val(), myI);
			}
		})(i));

		$("#goal-effort-" + i).change((function(myI){
			return function () {
			Goals.setEffort($(this).val(), myI);
			}
		})(i));

		$("#goal-passed-" + i).click((function (myI) {
		    return function () {
		        Goals.updatePassed(Goals.goals[myI - 1].effort);
		        Goals.setGoal("", myI);
		        Goals.setEffort(0, myI);
		    }
		})(i));

		$("#goal-failed-" + i).click((function (myI) {
		    return function () {
		        Goals.updateFailed(Goals.goals[myI - 1].effort);
		        Goals.failedGoals.push(new FailedGoal(Goals.goals[myI - 1].words, Goals.goals[myI - 1].effort,Goals.failedGoals.length));
		        Goals.setGoal("", myI);
		        Goals.setEffort(0, myI);
		    }
		})(i));
	}
}

Goals.getBonus = function () {
    var sum = 0;
    Goals.failedGoals.forEach(function (failedGoal) {
        if (failedGoal.isChecked()) {
            sum++;
        }
    })
    return sum;
}

Goals.JSONname = "goals";

Goals.toJSON = function (out) {
    var toOut = {}
    toOut["goals"] = [];
	for (var i = 0; i < Goals.count ; i++) {
	    toOut["goals"].push(Goals.goals[i].toJSON());
	}
	toOut["failedGoals"] = [];
	for (var i = 0; i < Goals.failedGoals.length ; i++) {
	    toOut["failedGoals"].push(Goals.failedGoals[i].toJSON());
	}

	toOut["passed"] = Goals.passed;
	toOut["failed"] = Goals.failed;
	out[Goals.JSONname] = toOut;
}

Goals.fromJSON = function (input) {
    if (input[Goals.JSONname] != undefined) {
        if (input[Goals.JSONname]["goals"] != undefined){
	        for (var i = 0; i < input[Goals.JSONname]["goals"].length; i++) {
	            Goals.goals[i] = Goal.fromJSON(input[Goals.JSONname]["goals"][i]);
			    Goals.setGoal(Goals.goals[i].words, i + 1);
			    Goals.setEffort(Goals.goals[i].effort, i + 1);
	        }   
        }

        if (input[Goals.JSONname]["failedGoals"] != undefined) {
	        for (var i = 0; i < Goals.failedGoals.length ; i++) {
	            Goals.failedGoals.push(FailedGoalinput.fromJSON(input[Goals.JSONname]["failedGoals"][i]));
	        }
        }
	}
    Goals.setPassed(input[Goals.JSONname]["passed"]);
    Goals.setFailed(input[Goals.JSONname]["failed"]);
}

Goals.clear = function () {
	for (var i = 0; i < Goals.count; i++) {
		Goals.goals[i].clear();
		Goals.setGoal("", i + 1);
		Goals.setEffort(0, i + 1);
	}
	$('#goal-failed-list').empty();
	Goals.failedGoals = [];
	Goals.passed = 0
	Goals.failed = 0;
}