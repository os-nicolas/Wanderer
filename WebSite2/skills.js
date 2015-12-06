function Skills() { }

g.modules.push(Skills);

g.WandererApp.controller("Skills", function ($scope) {
    Skills.model = $scope;
    Skills.model.skills = []
    Skills.model.toAdd = "";
    Skills.model.addSkill = function () {
        if (Skills.model.toAdd!= "" && Skills.isNewSkill(Skills.model.toAdd)){
        Skills.model.skills.push({
            name: Skills.model.toAdd,
            helps: [],
            toAdd: "",
            active: false,
            bonus:1
        });
        Skills.model.toAdd = "";
        }
    }
    Skills.model.addConnection = function (skill) {
        if (skill.toAdd != "" && skill.toAdd != skill.name) {
            if (skill.helps.indexOf(skill.toAdd) == -1) {
                skill.helps.push(skill.toAdd);
                skill.toAdd = "";
            }
        }
    }
    Skills.model.deleteSkill = function (skill) {
        var index = Skills.model.indexOf(skill);
        if (index != -1) {
            index.splice(index, 1);
        }
    }
    Skills.model.showOption = function (skill) {
        return function (innerSkill) {
            return (skill.name != innerSkill.name) && (skill.helps.indexOf(innerSkill.name) == -1);
        }
    }
    Skills.model.getBonus = function (skill) {
        var sum = skill.bonus;
        var distance = 0;
        // list of nodes
        var blackList = [];
        // list of connections
        var current = [];
        Skills.getHelpers(skill.name).forEach(function (by) {
            current.push(by);
        });
        while (current.length != 0) {
            distance++;
            var nextCurrent = [];
            current.forEach(function (connection) {
                blackList.push(connection.from);
                sum += Skills.levelLoss(distance) * connection.bonus;
                Skills.getHelpers(connection.name).forEach(function (helpedByConnection) {
                    if (blackList.indexOf(helpedByConnection.from) == -1 && nextCurrent.indexOf(helpedByConnection) == -1) {
                        nextCurrent.push(helpedByConnection);
                    }
                });
            });
            current = nextCurrent;
        }
        return Skills.scaleLoss(sum);
    }

    Skills.model.updateBonus = function () {
        g.updateBonus()
    }
});


Skills.levelLoss=function(distance) {
    return 1 / Math.pow(2, distance - 1);
}

Skills.scaleLoss = function(sum) {
    return Math.pow(2 * sum + 1, .52) - (Math.pow(3, .52) - 1);
}

Skills.getHelpers= function(skillName){
    var res = [];
    Skills.model.skills.forEach(function (skill) {
        if (skill.helps.indexOf(skillName)!=-1) {
            res.push(skill);
        }
    });
    return res;
}

Skills.isNewSkill = function (skillName) {
    var res = true;
    Skills.model.skills.forEach(function (oldSkill) {
        if (oldSkill.name == skillName) {
            res= false;
        }
    });
    return res;
}

//Skills.netWork = new NetWork();

//function addElement(type) {
//	var newSkill = $("#"+type+"-name").val();
//	if (newSkill != "" && Skills.netWork.allNodes[toId(newSkill)+""] == null) {
//		$("#" + type + "-name").val("");
//		Skills.netWork.add(newSkill, type);
//	}
//}

Skills.updateValues = function() {
    //for (var skillName in Skills.netWork.allNodes) {
	//	var skill = Skills.netWork.allNodes[skillName];
	//	var value = skill.getBonus();
	//	$("#skill-root-" + toId(skill.name)).find('.value').text(truncate(value, 1));
		//console.log("", $("#skill-root-" + toId(skill.name)).find('.value'));//
	//};
}

Skills.init = function () {
	//$("#add-skill").click(function () {
	//	addElement("skill");
	//})
}

Skills.getBonus = function () {
    var sum = 0;

    Skills.model.skills.forEach(function (skill) {
        if (skill.active) {
            sum += Skills.model.getBonus(skill);
        }
    })

	//for (var skillName in Skills.netWork.allNodes) {
	//	var skill = Skills.netWork.allNodes[skillName];
	//	if (skill.checked()) {
	//		sum += skill.getBonus();
	//	}
	//}
	return sum;
}

Skills.JSONname = "netWork";

Skills.toJSON = function (out) {
    out[Skills.JSONname] = Skills.model.skills;

    //save network
	//out[Skills.JSONname] = Skills.netWork.toJSON();
}

Skills.fromJSON = function (input) {
    // load network
    Skills.model.skills = input[Skills.JSONname];
    Items.model.$apply();
	//new NetWork(input[Skills.JSONname]);
	//Skills.updateValues();
}

Skills.clear = function () {
    Skills.model.skills = [];
    Skills.model.toAdd = "";
    Items.model.$apply();
    //Skills.netWork.clear();
}