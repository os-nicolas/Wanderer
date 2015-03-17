function Character(json) {
    this.items = {};
    this.cardCount = 0;
    this.netWork = new NetWork(this);
    g.character = this;

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

        return out;
    }
}