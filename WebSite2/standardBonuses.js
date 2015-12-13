function StandardBonuses() { }

g.modules.push(StandardBonuses);
g.WandererApp.controller("standardBonuses", function ($scope) {
    StandardBonuses.model = $scope;
    StandardBonuses.model.bonuses = [{
        name: "Positional Advantage",
        number: 3,
        checked: false
    }, {
        name: "Equipment Advantage",
        number: 2,
        checked: false
    }, {
        name: "Wounded",
        number: -3,
        checked: false
    }];

    StandardBonuses.model.toAdd = "";
    StandardBonuses.model.addBonus = function () {
        if (StandardBonuses.model.toAdd != "" && StandardBonuses.model.bonuses[toId(StandardBonuses.model.toAdd)] == null) {
            StandardBonuses.addBonus({
                name: StandardBonuses.model.toAdd,
                number: 0,
                checked:false
            });
            StandardBonuses.model.toAdd = "";
        }
    }
    StandardBonuses.model.removeBonus = function (toKill) {

        var index = StandardBonuses.model.bonuses.indexOf(toKill);
        if (index != -1) {
            StandardBonuses.model.bonuses.splice(index, 1);
        }

        g.updateBonus();
    }
    StandardBonuses.model.updateBonus = function () {
        g.updateBonus()
    }

});

StandardBonuses.init = function () {
}

StandardBonuses.getBonus = function () {
    var sum = 0;
    StandardBonuses.model.bonuses.forEach(function (bonus) {
        if (bonus.checked) {
            sum += Number(bonus.number);
        }
    });
    return sum;
}

StandardBonuses.JSONname = "StandardBonuses";

StandardBonuses.addBonus = function (addible) {

    StandardBonuses.model.bonuses.push(addible);
    g.updateBonus();
}

StandardBonuses.toJSON = function (out) {
    out[StandardBonuses.JSONname] = StandardBonuses.model.bonuses;
}

StandardBonuses.fromJSON = function (input) {
    StandardBonuses.model.bonuses = input[StandardBonuses.JSONname];
    StandardBonuses.model.$apply();
}

StandardBonuses.clear = function () {
    StandardBonuses.model.bonuses = []
    StandardBonuses.model.$apply();
}