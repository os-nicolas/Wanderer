function Items() { }

g.modules.push(Items);
g.WandererApp.controller("Items", function ($scope) {
    Items.model = $scope;
    Items.model.items = {};
    Items.model.toAdd = "";
    Items.model.addItem = function () {
        if (Items.model.toAdd != "" && Items.items[toId(Items.model.toAdd)] == null) {
            Items.items[toId(Items.model.toAdd)] = new Item(Items.model.toAdd);
            Items.model.toAdd = "";
        }
        Cards.model.$apply();
    }
    Items.model.removeItem = function (toKill) {
        delete Items.model.items[toId(toKill)];
        Cards.model.$apply();
        g.updateBonus();
    }
});


Items.items = {};

Items.init = function () {
	//$("#add-item").click(function () {
	//	var newItem = $("#item-name").val();
	//	$("#item-name").val("");
	//	if (newItem != "" && Items.items[toId(newItem)] == null) {
	//		Items.items[toId(newItem)] = new Item(newItem);
	//	}
	//})
}

Items.getBonus = function () {
	var sum = 0;
	for (var itemName in Items.model.items) {
	    var item = Items.model.items[itemName];
		if (item.checked) {
		    sum += Number(item.bonus);
		}
	}
	return sum;
}

Items.JSONname = "items";

Items.addItem = function(item){
    Items.items[toId(item.name)] = item;
    Items.model.$apply();
    g.updateBonus();
}

//Items.deleteItem = function (item) {
//	delete Items.items[toId(item.name)];
//	g.updateBonus();
//}

Items.toJSON = function (out) {
	// save items
	out[Items.JSONname] = {}
	for (var item in this.items) {
	    outItems.items[item]=Items.items[item].toJSON();
	}
}

Items.fromJSON = function (input) {
	for (var item in input[Items.JSONname]) {
		Items.addItem(Item.makeItem(input[Items.JSONname][item]));
	}
	Items.model.$apply();
}

Items.clear = function () {
	for (var itemName in this.items) {
		Items.model.items[itemName].destory();
	}
	Items.model.$apply();
}