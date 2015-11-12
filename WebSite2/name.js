function Name() { }

g.modules.push(Name);


// we can't use Name.name because that is a thing in java scrip it is the name of Name so Name
Name.charName = "";

Name.setName = function (value) {
    Name.charName = value;
	$('head title', window.parent.document).text(value);
	$("#character-name-display").text(value);
	if ($("#character-name-edit").val() != value) {
	    $("#character-name-edit").val(value);
	}
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
    out[Name.JSONname] = Name.charName;
}

Name.fromJSON = function (input) {
	if (input[Name.JSONname] != undefined) {
		Name.setName(input[Name.JSONname]);
	}
}

Name.clear = function () {
	Name.setName("");
}