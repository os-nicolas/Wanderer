// WORK IN PROGRESS, PROBABLY A MESS!
function Cards() { }

g.modules.push(Cards);

Cards.baseCount = 2;
Cards.cards = [];
for (var i = 0; i < Cards.baseCount; i++) {
	Cards.cards.push("");
}

Cards.setCards = function (value, index) {
	Goals.cards[index] = value;
	$("#card-" + (1+index)).val(value);
}

Cards.addCard = function (text) {
	$("#cards").append('<textarea class="card" id="card-' + this.cardCount + '"></textarea>');
	if (text != undefined) {
		$("#card-" + this.cardCount).text(text);
	}
	this.cardCount++;
}

Cards.init = function () {
	$("#add-card").click(function () {
		Cards.addCard("");
	})

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
	//save cards
	out[Cards.JSONname] = Cards.cards
}

Cards.fromJSON = function (input) {

	// load cards
	if (input[Cards.JSONname] != undefined) {
		for (var i = 0; i < input[Cards.JSONname].length; i++) {
			if (i < Cards.cards.length) {
				Cards.setCards(input[Cards.JSONname][i], i);
			} else {
				Cards.addCard(cardText);
			}
		}
	}
}

Cards.clear = function () {
	// remove all the cards
	$(".card").remove();
	// and add the base number back
	for (var j = 0; j < Cards.baseCount; j++) {
		Cards.addCard("");
	}
}