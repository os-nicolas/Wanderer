function Skills() { }

g.modules.push(Skills);

Skills.netWork = new NetWork();

function addElement(type) {
	var newSkill = $("#"+type+"-name").val();
	if (newSkill != "" && Skills.netWork.allNodes[toId(newSkill)+""] == null) {
		$("#" + type + "-name").val("");
		Skills.netWork.add(newSkill, type);
	}
}

Skills.updateValues = function() {
	for (var skillName in Skills.netWork.allNodes) {
		var skill = Skills.netWork.allNodes[skillName];
		var value = skill.getBonus();
		$("#skill-root-" + toId(skill.name)).find('.value').text(truncate(value, 1));
		//console.log("", $("#skill-root-" + toId(skill.name)).find('.value'));//
	};
}

Skills.init = function () {
	$("#add-skill").click(function () {
		addElement("skill");
	})
}

Skills.getBonus = function () {
	var sum = 0;
	for (var skillName in Skills.netWork.allNodes) {
		var skill = Skills.netWork.allNodes[skillName];
		if (skill.checked()) {
			sum += skill.getBonus();
		}
	}
	return sum;
}

Skills.JSONname = "netWork";

Skills.toJSON = function (out) {
	//save network
	out[Skills.JSONname] = Skills.netWork.toJSON();
}

Skills.fromJSON = function (input) {
	// load network
	new NetWork(input[Skills.JSONname]);
	Skills.updateValues();
}

Skills.clear = function () {
	Skills.netWork.clear();
}