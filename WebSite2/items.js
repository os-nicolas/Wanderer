function Items() { }

g.modules.push(Items);
g.WandererApp.controller("Items", function ($scope) {
    Items.model = $scope;
    Items.model.items = {};
    Items.model.toAdd = "";
    Items.model.addItem = function () {
        if (Items.model.toAdd != "" && Items.model.items[toId(Items.model.toAdd)] == null) {
            Items.addItem(new Item(Items.model.toAdd));
            //Items.model.$apply(new function () {
                Items.model.toAdd = "";
            //});
        }
    }
    Items.model.removeItem = function (toKill) {
        delete Items.model.items[toKill];
        //Items.model.$apply();
        g.updateBonus();
    }
    Items.model.updateBonus =function(){
        g.updateBonus()
    }

});


//Items.items = {};

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
	    console.log("item: ", item);
	    if (item.checked) {
	        console.log("item bous: "+ Number(item.bonus));
		    sum += Number(item.bonus);
		}
	}
	console.log("sum: " + sum);
	return sum;
}

Items.JSONname = "items";

Items.addItem = function(item){
    
    //Items.model.$apply(new function () {
        Items.model.items[toId(item.name)] = item;
    //});
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
	    outItems.items[item]=Items.model.items[item].toJSON();
	}
}

Items.fromJSON = function (input) {
	for (var item in input[Items.JSONname]) {
		Items.addItem(Item.makeItem(input[Items.JSONname][item]));
	}
	Items.model.$apply();
}

Items.clear = function () {
	//for (var itemName in this.items) {
	//	Items.model.items[itemName].destory();
    //}
    Items.model.items = {}
	Items.model.$apply();
}