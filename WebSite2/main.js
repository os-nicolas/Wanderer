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

function addElement(type) {
	var newSkill = $("#"+type+"-name").val();
	if (newSkill != "" && g.character.netWork.allNodes[toId(newSkill)] == null) {
		$("#" + type + "-name").val("");
		g.character.netWork.add(newSkill, type);
	}
}

$(document).ready(function () {

	g.updateMode(true)

	SaveLoad.init();

	$("#add-skill").click(function () {
		addElement("skill");
	})
	$("#add-trait").click(function () {
		addElement("trait");
	})
	$("#add-item").click(function () {
		var newItem = $("#item-name").val();
		$("#item-name").val("");
		if (newItem != "" && g.character.items[newItem] == null) {
			g.character.items[newItem] = new Item(newItem);
		}
	})

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

	$("#character-name-edit").keyup(function () {
		g.character.setName($(this).val());
	});

	$("#character-name-edit").keyup(function () {
		g.character.setNotes($(this).val());
	});

});

function truncate(num, order) {
	if (order == undefined) {
		order = 0;
	}
	var by = Math.pow(10, order)

	return Math.floor(num * by) / by;
}

function connect(skill1, skill2) {
	if (skill1 != "" && skill2 != "") {
		g.character.netWork.help(skill1, skill2);
	}
}

function addAllSkillTo(select) {
	for (var name in g.character.netWork.allNodes) {
		var mySkill = g.character.netWork.allNodes[name];
		if (mySkill.type == "skill") {
			select.append("<option value='" + toId(mySkill.name) + "'>" + mySkill.name + "</option>")
		}
	};
}

function updateDropDownsNewSkill(newSkill) {
	for (var name in g.character.netWork.allNodes) {
		$('#dropdown-' + name).append("<option value='" + toId(newSkill) + "'>" + newSkill + "</option>")
	};
}

function getBonus() {
	var sum = 0;
	for (var skillName in g.character.netWork.allNodes) {
		var skill = g.character.netWork.allNodes[skillName];
		if (skill.checked()) {
			sum += skill.getBonus();
		}
	}
	for (var itemName in g.character.items) {
		var item = g.character.items[itemName];
		if (item.checked()) {
			sum += item.getBonus();
		}
	}
	sum += Number($("#misc").val());
	return sum;
}

function updateBonus() {
	var sum = getBonus();
	$('#totalBonus').text(truncate(sum, 1));
}


function toId(skillName) {
	return skillName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
}

function updateValues() {
	for (var skillName in g.character.netWork.allNodes) {
		var skill = g.character.netWork.allNodes[skillName];
		var value = skill.getBonus();
		$("#skill-root-" + toId(skill.name)).find('.value').text(truncate(value, 1));
		console.log("", $("#skill-root-" + toId(skill.name)).find('.value'));//
	};
}