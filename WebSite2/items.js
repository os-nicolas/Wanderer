function Items() { }

g.modules.push(Items);
g.WandererApp.controller("Item", function ($scope) {
    Items.model = $scope;
    Items.model.items = {};
    Items.model.toAdd = "";
    Items.model.addItem = function () {
        if (Items.model.toAdd != "" && Items.model.items[toId(Items.model.toAdd)] == null) {
            Items.addItem({name:Items.model.toAdd,number:1});
            Items.model.toAdd = "";
        }
    }
    Items.model.removeItem = function (toKill) {
        delete Items.model.items[toId(toKill)];
        g.updateBonus();
    }
    Items.model.updateBonus =function(){
        g.updateBonus()
    }

});

Items.init = function () {}

Items.getBonus = function () {
	return 0;
}

Items.JSONname = "items";

Items.addItem = function(item){
    Items.model.items[toId(item.name)] = item;
}

Items.toJSON = function (out) {
    out[Items.JSONname] = Items.model.items;
}

Items.fromJSON = function (input) {
    Items.model.items = input[Items.JSONname];
	Items.model.$apply();
}

Items.clear = function () {
    Items.model.items = {}
	Items.model.$apply();
}