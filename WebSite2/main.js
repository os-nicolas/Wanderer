// global, i don't think i want anything in the actual global namespaces
function g() { };
g.updateMode = function (write) {
    g.write = write;
    if (g.write) {
        $(".play").hide();
        $(".write").show();
        $("#mode").text("Done Editing");
    } else {
        $(".play").show();
        $(".write").hide();
        $("#mode").text("Edit");
    }
}
g.cardCout = 2;


var none = "-";

$(document).ready(function () {

    g.updateMode(true)

    $("#addSkill").click(function () {
        var newSkill = $("#skillName").val();
        $("#skillName").val("");
        if (newSkill != "" && netWork.allNodes[newSkill] == null) {
            console.log($("#skillName").val())
            $("#skills").append(
                "<li id=root-" + toId(newSkill) + ">"
                    + "<input class='check play' type='checkbox' >"
                    + newSkill + " : "
                    + "<span class='value'>0</span>"
                    + "<div class='write'>"    
                        + "<select id='dropdown-" + toId(newSkill) + "' >"
                            + "<option value='" + none + "'>" + none + "</option>"
                        + "</select>"
                        + "<button id='connect-" + toId(newSkill) + "' type='button'>connect</button>"
                        + "<button id='delete-" + toId(newSkill) + "' type='button'>delete</button>"
                    + " </div>"
                    + "<ul id='" + toId(newSkill) + "'></ul>"
                + "</li>")
            updateDropDownsNewSkill(newSkill);
            addAllSkillTo($('#dropdown-' + toId(newSkill)));
            var skillInstance = netWork.add(newSkill,$("#root-" + toId(newSkill)));
            $("#root-" + toId(newSkill)).find('.check').change(updateBonus);
            $('#connect-' + toId(newSkill)).click(function () {
                var skill1 = newSkill;
                var skill2 = $('#dropdown-' + toId(newSkill)).val();
                if (skill2 != "-") {
                    connect(skill1, skill2);
                }
            })
            updateValues();
            $(".play").hide();
        }
    })

    $("#roll").click(function () {
        console.log("rolled");
        for (var i = 0; i < 6; i++) {
            var r = Rolls.roll() + getBonus();
            if (r < 0){
                var red = Math.min(1,Math.abs(r)/(50));
                var cc = Color.colorCode(255, 1-red, 1-red);
            }else{
                var green = Math.min(1,Math.abs(r)/(50))
                var cc = Color.colorCode(1-green, 255, 1-green);
            }
            $("#roll-" + i).css("background-color", cc);
            $("#roll-" + i).text((r<0?"":" ")+ truncate(r));
        }
        Rolls.cycle();
    });

    $("#mode").click(function () {
        g.updateMode(!g.write);
    });

    $("#addCard").click(function () {
        g.cardCout++;
        $("#cards").append('<textarea class="card" id="card-' + g.cardCount + '"></textarea>');
    })
});

function truncate(num, order) {
    if (order == undefined) {
        order = 0;
    }
    var by = Math.pow(10,order)

    return Math.floor(num * by) / by;
}

function connect(skill1, skill2) {
    if (skill1 != "" && skill2 != "") {
        $("#" + toId(skill1)).append("<li  id='"+toId(skill1)+"-to-"+toId(skill2)+"'>" + skill2 + "<button class='write' id='sub-delete-" + toId(skill1)+"-to-"+toId(skill2) + "' type='button'>delete</button></li>")
        console.log(skill1 + "-" + skill2);
        netWork.help(skill1, skill2 , $("#"+toId(skill1)+"-to-"+toId(skill2)));
    }
}
function addAllSkillTo(select) {
    for (var name in netWork.allNodes){
        select.append("<option value='" + name + "'>" + name + "</option>")
    };
    
}
function updateDropDownsNewSkill(newSkill) {
    for (var name in netWork.allNodes) {
        $('#dropdown-' + toId(name)).append("<option value='" + newSkill + "'>" + newSkill + "</option>")
    };
}

function getBonus(){
    var sum=0;
    for (var skillName in netWork.allNodes) {
        var skill = netWork.allNodes[skillName];
        if ($("#root-" + toId(skill.name)).find('.check').is(':checked')) {
            sum += skill.getBonus();
        }
    }
    return sum;
}

function updateBonus() {
    var sum = getBonus();
    $('#totalBonus').text(truncate(sum,1));
}


function toId(skillName) {
    return skillName.replace(/\s+/g, '-').toLowerCase();
}

function updateValues() {
    for (var skillName in netWork.allNodes) {
        var skill = netWork.allNodes[skillName];
        var value = skill.getBonus();
        $("#root-" + toId(skill.name)).find('.value').text(truncate(value,1));
        console.log("", $("#root-" + toId(skill.name)).find('.value'));//
    };
}

var netWork = new NetWork();