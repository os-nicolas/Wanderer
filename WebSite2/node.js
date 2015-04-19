function levelLoss(distance) {
	return 1 / Math.pow(2, distance - 1);
}

function scaleLoss(sum) {
	var power = .55;// this matches the descreet version a little better with .5 but w/e
	return Math.pow(2 * sum + 1, .52) - (Math.pow(3, .52) - 1);
}

//function scaleLoss(input) {
//var startAt = .0001;
//var step = startAt
//var sum = startAt;
//var at = startAt;
//while (at < input) {
//    sum += (1 / sum) * step;
//    at += step;
//}
//return sum;
//}

function addAllSkillTo(select) {
	for (var name in Skills.netWork.allNodes) {
		var mySkill = Skills.netWork.allNodes[name];
		if (mySkill.type == "skill") {
			select.append("<option value='" + toId(mySkill.name) + "'>" + mySkill.name + "</option>")
		}
	};
}

function updateDropDownsNewSkill(newSkill) {
	for (var name in Skills.netWork.allNodes) {
		$('#dropdown-' + name).append("<option value='" + toId(newSkill) + "'>" + newSkill + "</option>")
	};
}

function connect(skill1, skill2) {
	if (skill1 != "" && skill2 != "") {
		Skills.netWork.help(skill1, skill2);
	}
}


function Node(name, type, positive) {
	var that = this;
	this.type = type;
	this.positive = (positive != undefined ? positive : true);
	this.name = name;

	$("#" + type + "-element-list").append(Node.getRow(this.name, type));
	if (type == "skill") {
		updateDropDownsNewSkill(this.name);
	}
	addAllSkillTo($('#dropdown-' + toId(this.name)));
	this.ui = $("#skill-root-" + toId(this.name));
	this.ui.find('.check').change(g.updateBonus);
	$('#connect-' + toId(this.name)).click(function () {
		var skill1 = that.name;
		var skill2 = $('#dropdown-' + toId(that.name)).val(); // this is an id we what a name name
		var skill2 = Skills.netWork.allNodes[skill2].name; // so we look it up
		console.log("s1: " + skill1 + " s2: " + skill2);
		if (skill2 != "-") {
			connect(skill1, skill2);
		}
	})

	// list of Connections
	this.helps = function () {
		var result = [];
		var that = this;
		Skills.netWork.connections.forEach(function (connection) {
			if (connection.from == that) {
				result.push(connection);
			}
		});
		return result;
	};
	// list of Connections
	this.helpedBy = function () {
		var result = [];
		var that = this;
		Skills.netWork.connections.forEach(function (connection) {
			if (connection.to == that) {
				result.push(connection);
			}
		});
		return result;
	};
	this.getBonus = function () {
		var sum = (this.positive ? 1 : -1);
		var distance = 0;
		// list of nodes
		var blackList = [];
		// list of connections
		var current = [];
		this.helpedBy().forEach(function (by) {
			current.push(by);
		});
		while (current.length != 0) {
			distance++;
			var nextCurrent = [];
			current.forEach(function (connection) {
				blackList.push(connection.from);
				sum += levelLoss(distance) * (connection.from.positive ? 1 : -1);
				connection.from.helpedBy().forEach(function (helpedByConnection) {
					if (blackList.indexOf(helpedByConnection.from) == -1 && nextCurrent.indexOf(helpedByConnection) == -1) {
						nextCurrent.push(helpedByConnection);
					}
				});
			});
			current = nextCurrent;
		}
		return scaleLoss(sum);
	}

	this.destory = function () {

		// kill our connections
		that.helpedBy().forEach(function (connection) {
			connection.destory();
		})
		that.helps().forEach(function (connection) {
			connection.destory();
		})

		// kill our ui
		that.ui.remove();

		// remove this from the drop downs
		$("option[value='" + toId(that.name) + "']").remove();

		// remove ourself from network
		Skills.netWork.deleteNode(that);
	}

	$("#delete-" + toId(this.name)).click(this.destory);

	this.dropdown = function () {
		return $("#dropdown-" + toId(this.name));
	}

	this.checked = function () {
		return this.ui.find('.check').is(':checked')
	}

	this.toJSON = function () {
		var out = {};
		out["name"] = this.name;
		out["type"] = this.type;
		out["positive"] = this.positive;
		return out;
	}
}

Node.makeNode = function (json) {
	return new Node(json["name"], json["type"], json["positive"]);
}

Node.getRow = function (name, type) {
	return "<li id=skill-root-" + toId(name) + " class='skill'>"
                + (type == "skill" ? "<input class='check play' type='checkbox' >" : "")
                + name + (type == "skill" ? " : " : "")
                + (type == "skill" ? "<span class='value'>0</span>" : "")
                + "<div class='write'>"
                    + "<select id='dropdown-" + toId(name) + "' >"
                        + "<option value='" + g.none + "'>" + g.none + "</option>"
                    + "</select>"
                    + "<button id='connect-" + toId(name) + "' type='button'>connect</button>"
                    + "<button id='delete-" + toId(name) + "' type='button'>delete</button>"
				+ "<ul id='" + toId(name) + "'></ul>"
                + " </div>"
            + "</li>"
}