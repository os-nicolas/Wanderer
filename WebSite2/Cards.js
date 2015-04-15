// WORK IN PROGRESS, PROBABLY A MESS!
function Cards() { }

g.modules.push(Cards);

Cards.baseCount = 3;
Cards.cards = [];
for (var i = 0; i < Cards.cards.length; i++) {
	Cards.goals.push("");
}

Cards.setCards = function (value, index) {
	Goals.goals[index] = value;
	$("#goal-display-" + index).html(value.replace(/\r?\n/g, "<br />"));
	$("#goal-edit-" + index).val(value);
}

Cards.init = function () {
	for (var i = 0; i < Cards.cards.length; i++) {
		$("#goal-edit-" + i).keyup(function () {
			Cards.setCards($(this).val(), i);
		});
	}
}

Cards.getBonus = function () {
	return 0;
}

Cards.JSONname = "cards";

Cards.toJSON = function (out) {
	out[Cards.JSONname] = Goals.goals;
}

Cards.fromJSON = function (input) {
	if (input[Cards.JSONname] != undefined) {
		for (var i = 0; i < input[Cards.JSONname].length; i++) {
			Cards.setGoal(input[Cards.JSONname][i],i);
		}
	}
}

Cards.clear = function () {
	for (var i = 0; i < Cards.cards.length; i++) {
		Cards.setGoal("", i);
	}
}