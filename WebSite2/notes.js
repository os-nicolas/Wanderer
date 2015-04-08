function Notes() { }

Notes.notes = "";

Notes.setNotes = function (value) {
	Notes.notes = value;
	$("#notes").text(value);
}

Notes.init = function () {
	$("#notes").keyup(function () {
		Notes.setNotes($(this).val());
	});
}

Notes.getBonus = function () {
	return 0;
}

Notes.JSONname = "notes";

Notes.toJSON = function (out) {
	out[Notes.JSONname] = Notes.notes;
}

Notes.fromJSON = function (input) {
	if (input[Notes.JSONname] != undefined) {
		Notes.setNotes(input[Notes.JSONname]);
	}
}