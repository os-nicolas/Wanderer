function Character(json) {
	
    this.cardCount = 0;

    g.character = this;

    this.setNotes = function (notes) {
    	this.notes = notes;
    }

    this.clear = function () {
        console.log("char - tried to clear");
        

        g.modules.forEach(function (mod) {
        	mod.clear();
        });

        //remove all the cards
        $(".card").remove();
    }

    this.addCard = function (text) {
        
        $("#cards").append('<textarea class="card" id="card-' + this.cardCount + '"></textarea>');
        if (text != undefined) {
            $("#card-" + this.cardCount).text(text);
        }
        this.cardCount++;
    }

    if (json != undefined) {

       

        // load cards
        var that = this;
        json["cards"].forEach(function (cardText) {
            that.addCard(cardText);
        });

        g.modules.forEach(function (mod) {
        	mod.fromJSON(json);
        });
    }

    this.toJSON = function () {
        var out = {}

        //save cards
        out["cards"] = []
        for (var i =0; i < this.cardCount; i++) {
            out["cards"].push($("#card-"+i).val());
        }

        g.modules.forEach(function (mod) {
        	mod.toJSON(out);
        });

        return out;
    }
}