function NPC() {//$scope
}

g.modules.push(NPC);
g.WandererApp.controller("NPC", function ($scope) {//,$rootScope
    NPC.model = $scope;
    NPC.model.npcs = [];

    NPC.model.addNPC = function () {
        NPC.model.npcs.push({ name: "npc", speed: 2, attack: 2, defense: 2 })
    }

    NPC.model.randomize = function () {
        for (var npc in NPC.model.npcs) {
            var newNumbers = NPC.getNumbers(); 
            NPC.model.npcs[npc].speed = newNumbers.speed;
            NPC.model.npcs[npc].attack = newNumbers.attack;
            NPC.model.npcs[npc].defense = newNumbers.defense;
        }
    }

    NPC.model.removeNPC = function (npc) {
        var at = NPC.model.npcs.indexOf(npc);
        if (at != -1) {
            NPC.model.npcs.splice(at, 1);
            //NPC.model.$apply();
        }
        //NPC.model.$apply();
    }
});

NPC.getNumbers = function () {
    var toAdd = 6;
    var options = ["speed", "attack", "defense"];
    var res = { speed: 0, attack: 0, defense: 0 };
    for (var i = 0; i < toAdd; i++) {
        options.sort(function () { return 0.5 - Math.random() });
        res[options[0]]++;
    }
    return res;
}

NPC.init = function () {
}

NPC.getBonus = function () {
    return 0;
}

NPC.JSONname = "NPC";

NPC.toJSON = function (out) {
    out[NPC.JSONname] = NPC.model.npcs;
}

NPC.fromJSON = function (input) {
    NPC.model.npcs = out[NPC.JSONname];
}

NPC.clear = function () {
    NPC.model.npcs = [];
}