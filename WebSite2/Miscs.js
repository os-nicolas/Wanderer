function Miscs() { }

g.modules.push(Miscs);
g.WandererApp.controller("Misc", function ($scope) {
    Miscs.model = $scope;
    Miscs.model.miscs = {};
    Miscs.model.toAdd = "";
    Miscs.model.addMisc = function () {
        if (Miscs.model.toAdd != "" && Miscs.model.miscs[toId(Miscs.model.toAdd)] == null) {
            Miscs.addMisc(new Misc(Miscs.model.toAdd));
            //Miscs.model.$apply(new function () {
                Miscs.model.toAdd = "";
            //});
        }
    }
    Miscs.model.removeMisc = function (toKill) {
        delete Miscs.model.miscs[toKill];
        //Miscs.model.$apply();
        g.updateBonus();
    }
    Miscs.model.updateBonus =function(){
        g.updateBonus()
    }

});


//Miscs.miscs = {};

Miscs.init = function () {
	//$("#add-misc").click(function () {
	//	var newMisc = $("#misc-name").val();
	//	$("#misc-name").val("");
	//	if (newMisc != "" && Miscs.Miscs[toId(newMisc)] == null) {
	//		Miscs.miscs[toId(newMisc)] = new Misc(newMisc);
	//	}
	//})
}

Miscs.getBonus = function () {
	var sum = 0;
	for (var miscName in Miscs.model.miscs) {
	    var misc = Miscs.model.miscs[miscName];
	    if (misc.checked) {
		    sum += Number(misc.bonus);
		}
	}
	console.log("sum: " + sum);
	return sum;
}

Miscs.JSONname = "miscs";

Miscs.addMisc = function (misc) {
    
    //Miscs.model.$apply(new function () {
        Miscs.model.miscs[toId(misc.name)] = misc;
    //});
    g.updateBonus();
}

//Miscs.deleteMisc = function (misc) {
//	delete Miscs.miscs[toId(misc.name)];
//	g.updateBonus();
//}

Miscs.toJSON = function (out) {
	// save miscs
	out[Miscs.JSONname] = {}
	for (var misc in Miscs.model.miscs) {
	    out[Miscs.JSONname][misc] = Miscs.model.miscs[misc].toJSON();
	}
}

Miscs.fromJSON = function (input) {
	for (var misc in input[Miscs.JSONname]) {
		Miscs.addMisc(Misc.makeMisc(input[Miscs.JSONname][misc]));
	}
	Miscs.model.$apply();
}

Miscs.clear = function () {
	//for (var miscName in this.miscs) {
	//	Miscs.model.miscs[miscName].destory();
    //}
    Miscs.model.miscs = {}
	Miscs.model.$apply();
}