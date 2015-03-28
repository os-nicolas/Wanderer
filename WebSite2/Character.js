function Character(json) {
	this.items = {};
	this.name = ""
	this.notes="";
    this.cardCount = 0;
    this.netWork = new NetWork(this);
    g.character = this;

    this.setName = function (name) {
    	this.name = name;
    	$('head title', window.parent.document).text(name);
    	$("#character-name-display").text(this.name);
    	$("#character-name-edit").val(this.name);
    }

    this.setNotes = function (notes) {
    	this.notes = notes;
    }

    this.clear = function () {
        console.log("char - tried to clear");
        this.netWork.clear();
        for (var itemName in this.items) {
            this.items[itemName].destory();
        }
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

        // load items
        for (var item in json["items"]) {
            this.items[item] = Item.makeItem(json["items"][item]);
        }

        // load network
        new NetWork(this,json["netWork"]);

        // load cards
        var that = this;
        json["cards"].forEach(function (cardText) {
            that.addCard(cardText);
        });

    	// load name
        this.setName(json["name"]);
        
    	// load notes
        this.notes = json["notes"];
        $("#notes").text(this.notes);
    }



    this.deleteItem = function (item) {
        delete this.items[item.name];

        updateBonus();
    }

    this.toJSON = function () {
        var out = {}
        // save items
        out["items"] = {}
        for (var item in this.items) {
            out["items"][item] = this.items[item].toJSON();
        }
        //save network
        out["netWork"] = this.netWork.toJSON();

        //save cards
        out["cards"] = []
        for (var i =0; i < this.cardCount; i++) {
            out["cards"].push($("#card-"+i).val());
        }

    	//save name
        out["name"] = this.name;

    	//save name
        out["notes"] = this.notes;

        return out;
    }
}