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
    if (newSkill != "" && g.character.netWork.allNodes[newSkill] == null) {
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

    $("#roll").click(function () {
        console.log("rolled");
        for (var i = 0; i < 6; i++) {
            var r = Rolls.roll() + getBonus();
            if (r < 0) {
                var red = Math.min(1, Math.abs(r) / (50));
                var cc = Color.colorCode(255, 1 - red, 1 - red);
            } else {
                var green = Math.min(1, Math.abs(r) / (50))
                var cc = Color.colorCode(1 - green, 255, 1 - green);
            }
            $("#roll-" + i).css("background-color", cc);
            $("#roll-" + i).text((r < 0 ? "" : " ") + truncate(r));
        }
        Rolls.cycle();
    });

    $("#mode").click(function () {
        g.updateMode(!g.write);
    });

    $("#add-card").click(function () {
        g.character.addCard("");
    })

    $("#misc").change(updateBonus);
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
        if (g.character.netWork.allNodes[name].type == "skill") {
            select.append("<option value='" + name + "'>" + name + "</option>")
        }
    };
}

function updateDropDownsNewSkill(newSkill) {
    for (var name in g.character.netWork.allNodes) {
        $('#dropdown-' + toId(name)).append("<option value='" + newSkill + "'>" + newSkill + "</option>")
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
    return skillName.replace(/\s+/g, '-').toLowerCase();
}

function updateValues() {
    for (var skillName in g.character.netWork.allNodes) {
        var skill = g.character.netWork.allNodes[skillName];
        var value = skill.getBonus();
        $("#skill-root-" + toId(skill.name)).find('.value').text(truncate(value, 1));
        console.log("", $("#skill-root-" + toId(skill.name)).find('.value'));//
    };
}