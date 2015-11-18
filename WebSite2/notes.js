function Notes() { }

g.modules.push(Notes);
g.WandererApp.controller("Notes", function ($scope) {
    Notes.model = $scope;
    Notes.model.notes = ""
});

//Notes.notes = "";

Notes.setNotes = function (value) {
    Notes.model.notes = value;
    Notes.model.$apply();
	//$("#notes").text(value);
}

Notes.init = function () {
	//$("#notes").keyup(function () {
	//	Notes.setNotes($(this).val());
	//});
}

Notes.getBonus = function () {
	return 0;
}

Notes.JSONname = "notes";

Notes.toJSON = function (out) {
    out[Notes.JSONname] = Notes.model.notes;
}

Notes.fromJSON = function (input) {
	if (input[Notes.JSONname] != undefined) {
		Notes.setNotes(input[Notes.JSONname]);
	}
}

Notes.clear = function () {
	Notes.setNotes("");
}