function Items() { }

g.modules.push(Items);

Items.items = {};

Items.init = function () {
	$("#add-item").click(function () {
		var newItem = $("#item-name").val();
		$("#item-name").val("");
		if (newItem != "" && Items.items[toId(newItem)] == null) {
			Items.items[toId(newItem)] = new Item(newItem);
		}
	})
}

Items.getBonus = function () {
	var sum = 0;
	for (var itemName in Items.items) {
		var item = Items.items[itemName];
		if (item.checked()) {
			sum += item.getBonus();
		}
	}
	return sum;
}

Items.JSONname = "items";

Items.deleteItem = function (item) {
	delete Items.items[toId(item.name)];

	updateBonus();
}

Items.toJSON = function (out) {
	// save items
	out[Items.JSONname] = {}
	for (var item in this.items) {
		out[Items.JSONname][item] = Items.items[item].toJSON();
	}
}

Items.fromJSON = function (input) {
	for (var item in input[Items.JSONname]) {
		Items.items[toId(item)] = Item.makeItem(input[Items.JSONname][item]);
	}
}

Items.clear = function () {
	for (var itemName in this.items) {
		Items.items[itemName].destory();
	}
}