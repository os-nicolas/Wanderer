// WORK IN PROGRESS, PROBABLY A MESS!
function Cards() { }

g.modules.push(Cards);
g.WandererApp.controller("Cards", function ($scope) {
    Cards.model = $scope;
    Cards.model.cards = [];
    Cards.model.addCard = function () {
        Cards.addCard(new Card("", false));
    }
    Cards.model.removeCard = function (card) {
        var at = Cards.model.cards.indexOf(card);
        if (at != -1) {
            Cards.model.cards.splice(at, 1);
            Cards.model.$apply();
        }
        
    }
});


//Cards.baseCount = 2;
//Cards.cards = [];


// Card, int
//Cards.setCards = function (value, index) {
//    Cards.model.cards[index] = value;
//    //value.bind($("#card-" + index), $("#card-active-" + index))
//}

//Card
Cards.addCard = function (newCard) {
//    //var at = Cards.cards.length;
//    //$("#cards").append('<div class="card">'
//    //                       +'<span class="counter-name write">Active:</span>'
//    //                       + '<input class="check write" type="checkbox" id="card-active-' + at + '">'
//    //                       + '<textarea class="card-text char-text write" id="card-' + at + '"></textarea>'
//    //                    +'</div>');
//    //newCard.bind($("#card-" + at), $("#card-active-" + at))
    Cards.model.cards.push(newCard);
    Cards.model.$apply();

}

Cards.init = function () {
	//$("#add-card").click(function () {
	//    Cards.addCard(new Card("", false));
	//})
}

Cards.getBonus = function () {
	return 0;
}

Cards.JSONname = "cards";

Cards.toJSON = function (out) {
    //save cards
    var myJSON = [];
    for (var i = 0; i < Cards.model.cards.length; i++) {
        myJSON.push(Cards.model.cards[i].toJSON());
    }
    out[Cards.JSONname] = myJSON;
}

Cards.fromJSON = function (input) {
    // load cards
    console.log("input",input);
    var myInput = input[Cards.JSONname]
    if (myInput != undefined) {
        for (var i = 0; i < myInput.length; i++) {
            var card = Card.makeCard(myInput[i])
            console.log("card", card);
			//if (i < Cards.cards.length) {
			//    Cards.setCards(card, i);
			//} else {
			    Cards.addCard(card);
			//}
		}
    }
    Cards.model.$apply();
}

Cards.clear = function () {
	// remove all the cards
    //$(".card").remove();
    Cards.model.cards = [];
    Cards.model.$apply();
    // we don't start with any cards
    //for (var j = 0; j < Cards.baseCount; j++) {
	//	Cards.addCard(new Card("",false));
	//}

}