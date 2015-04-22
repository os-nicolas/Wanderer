function Goals() { }

g.modules.push(Goals);

Goals.count = 3;
Goals.goals = [];
for (var i = 0; i < Goals.count; i++) {
	Goals.goals.push(new Goal());
}
console.log("goals:", Goals.goals);

Goals.setGoal = function (value, index) {
	console.log("goal:" + (index - 1), Goals.goals)
	Goals.goals[index-1].words = value;
	$("#goal-display-"+index).html(value.replace(/\r?\n/g, "<br />"));
	$("#goal-edit-" + index).val(value);
}

Goals.setEffort = function (value, index) {
	console.log("goal:" + (index - 1), Goals.goals)
	Goals.goals[index - 1].effort = value;
	$("#goal-effort-" + index).val(value);
}

Goals.init = function () {
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
	}
}

Goals.getBonus = function () {
	return 0;
}

Goals.JSONname = "goals";

Goals.toJSON = function (out) {
	var toOut = []
	for (var i = 0; i < Goals.count ; i++) {
		toOut.push(Goals.goals[i].toJSON());
	}
	out[Goals.JSONname] = toOut;
}

Goals.fromJSON = function (input) {
	if (input[Goals.JSONname] != undefined) {
		for (var i = 0; i < input[Goals.JSONname].length; i++) {
			Goals.goals[i] = Goal.fromJSON(input[Goals.JSONname][i]);
			Goals.setGoal(Goals.goals[i].words, i + 1);
			Goals.setEffort(Goals.goals[i].effort, i + 1);
		}
	}
}

Goals.clear = function () {
	for (var i = 0; i < Goals.count; i++) {
		Goals.goals[i].clear();
		Goals.setGoal("", i + 1);
		Goals.setEffort(0, i + 1);
	}
}