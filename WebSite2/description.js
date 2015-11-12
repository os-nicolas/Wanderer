function Description() { }

g.modules.push(Description);

Description.description = "";

Description.setDescription = function (value) {
	Description.description = value;
	$("#description-display").html(value.replace(/\r?\n/g, "<br />"));
	$("#description-edit").val(value);
}

Description.init = function () {
	$("#description-edit").keyup(function () {
		Description.setDescription($(this).val());
	});
}

Description.getBonus = function () {
	return 0;
}

Description.JSONname = "description";

Description.toJSON = function (out) {
	out[Description.JSONname] = Description.description;
}

Description.fromJSON = function (input) {
	if (input[Description.JSONname] != undefined) {
		Description.setDescription(input[Description.JSONname]);
	}
}


Description.clear = function () {
	Description.setDescription("");
}