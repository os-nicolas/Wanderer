function Goals() { }

g.modules.push(Goals);

Goals.count = 3;
Goals.goals = [];
for (var i = 0; i < Goals.count; i++) {
	Goals.goals.push("");
}

Goals.setGoal = function (value, index) {
	Goals.goals[index] = value;
	$("#goal-display-"+index).html(value.replace(/\r?\n/g, "<br />"));
	$("#goal-edit-" + index).val(value);
}

Goals.init = function () {
	for (var i = 0; i < Goals.count; i++) {
		$("#goal-edit-" +i).keyup(function () {
			Goals.setGoal($(this).val(),i);
		});
	}
}

Goals.getBonus = function () {
	return 0;
}

Goals.JSONname = "goals";

Goals.toJSON = function (out) {
	out[Goals.JSONname] = Goals.goals;
}

Goals.fromJSON = function (input) {
	if (input[Goals.JSONname] != undefined) {
		for (var i = 0; i < input[Goals.JSONname].length; i++) {
			Goals.setGoal(input[Goals.JSONname][i],i);
		}
	}
}

Goals.clear = function () {
	for (var i = 0; i < Goals.count; i++) {
		Goals.setGoal("", i);
	}
}