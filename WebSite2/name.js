function Name() { }

g.modules.push(Name);

Name.name = "";

Name.setName = function (value) {
	Name.name = value;
	$('head title', window.parent.document).text(value);
	$("#character-name-display").text(value);
	$("#character-name-edit").val(value);
}

Name.init = function () {
    $("#character-name-edit").keyup(function () {
		Name.setName($(this).val());
	});
}

Name.getBonus = function () {
	return 0;
}

Name.JSONname = "name";

Name.toJSON = function (out) {
	out[Name.JSONname] = Name.name;
}

Name.fromJSON = function (input) {
	if (input[Name.JSONname] != undefined) {
		Name.setName(input[Name.JSONname]);
	}
}

Name.clear = function () {
	Name.setName("");
}