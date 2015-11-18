function Description() { }

g.modules.push(Description);
g.WandererApp.controller("Description", function ($scope) {
    Description.model = $scope;

});

//Description.description = "";

Description.setDescription = function (value) {
    //console.log("set description to : " + value + " it was: " + Description.model.description);
    Description.model.description = value;
    Description.model.$apply();
    //$("#description-display").html(value.replace(/\r?\n/g, "<br />"));
    //$("#description-edit").val(value);
}

Description.init = function () {
	//$("#description-edit").keyup(function () {
	//	Description.setDescription($(this).val());
	//});
}

Description.getBonus = function () {
	return 0;
}

Description.JSONname = "description";

Description.toJSON = function (out) {
    out[Description.JSONname] = Description.model.description;
}

Description.fromJSON = function (input) {
	if (input[Description.JSONname] != undefined) {
	    Description.setDescription(input[Description.JSONname]);
	}
}

Description.clear = function () {
    Description.setDescription("");
}