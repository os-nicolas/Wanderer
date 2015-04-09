// global, i don't think i want anything in the actual global namespaces
function g() { };

g.updateMode = function (write) {
	g.write = write;
	$("#all").toggleClass("play");
	$("#all").toggleClass("write");
	if (g.write) {
		$(".item-bonus").prop("disabled", false);
		$("#mode").text("Done Editing");
	} else {
		$(".item-bonus").prop("disabled", true);
		$("#mode").text("Edit");
	}
}

g.none = "-";
g.character = new Character();
g.modules = [];



$(document).ready(function () {

	g.updateMode(true)

	SaveLoad.init();


	//$("#add-trait").click(function () {
	//	addElement("trait");
	//})


	$("#roll2").click(Rolls.getRollFunction(2.5));

	$("#roll5").click(Rolls.getRollFunction(5));

	$("#roll10").click(Rolls.getRollFunction(10));

	$("#mode").click(function () {
		g.updateMode(!g.write);
	});

	$("#add-card").click(function () {
		g.character.addCard("");
	})

	$("#misc").change(updateBonus);

	g.modules.forEach(function (mod) {
		mod.init();
	});
});

function truncate(num, order) {
	if (order == undefined) {
		order = 0;
	}
	var by = Math.pow(10, order)

	return Math.floor(num * by) / by;
}


function getBonus() {
	var sum = 0;
	sum += Number($("#misc").val());

	g.modules.forEach(function (mod) {
		sum + mod.getBonus();
	});

	return sum;
}

function updateBonus() {
	var sum = getBonus();
	$('#totalBonus').text(truncate(sum, 1));
}


function toId(skillName) {
	return skillName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
}

