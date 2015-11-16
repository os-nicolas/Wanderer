//TODO modules should all record there verson when they save
// so we can have elegant backword compadiblity

// global, i don't think i want anything in the actual global namespaces
// g means public
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

g.updateBonus = function () {
    var sum = getBonus();
    $('#totalBonus').text(truncate(sum, 1));
}

var source;

function isbefore(a, b) {
    if (a.parentNode == b.parentNode) {
        for (var cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) {
                return true;
            }
        }
    }
    return false;
}

function dragenter(e) {
    //console.log("enter!", this)
    if (source != this) {
        if (isbefore(source, this)) {
            this.parentNode.insertBefore(source, this);
        }
        else {
            this.parentNode.insertBefore(source, this.nextSibling);
        }
    }
}

function dragenterdiv(e) {
    // we always insert before a divider
    this.parentNode.insertBefore(source, this);
}

function dragstart(e) {
    //console.log("start!", this)
    source = this;
    e.originalEvent.dataTransfer.effectAllowed = 'move';
}

$(document).ready(function () {

    g.updateMode(true)

    SaveLoad.init();


    //$("#add-trait").click(function () {
    //	addElement("trait");
    //})


    $("#roll2").click(Rolls.getRollFunction(2.5));

    $("#roll5").click(Rolls.getRollFunction(5));

    $("#roll10").click(Rolls.getRollFunction(10));

    $(".drag").on('dragenter', dragenter);

    $(".drag").on('dragstart', dragstart);


    //$("#mode").click(function () {
    //	g.updateMode(!g.write);
    //});
	$(".divider").on('dragenter', dragenterdiv);


    $("#misc").change(g.updateBonus);

    $(".hide-button").click(function () {
        // we go up till we find the section that contains this
        var at = $(this);
        while (!at.hasClass("section")) {
            at = at.parent();
        }
        // then we 
        at.toggleClass("hidden");
        if (at.hasClass("hidden")) {
            $(this).text("+");
        } else {
            $(this).text("-");
        }

    });

    $(".edit-button").click(function () {
        // we go up till we find the section that contains this
        var at = $(this);
        while (!at.hasClass("section")) {
            at = at.parent();
        }
        // then we 
        at.toggleClass("play");
        at.toggleClass("write");
        if (at.hasClass("play")) {
            $(this).text("edit");
        } else {
            $(this).text("done");
        }

    });

    var buttons = $(".edit-button");
    console.log("buttons", buttons);
    buttons.each(function () {
        var at = $(this);
        while (!at.hasClass("section")) {
            at = at.parent();
        }
        if (at.hasClass("play")) {
            $(this).text("edit");
        } else {
            $(this).text("done");
        }
    });

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
        sum += mod.getBonus();
    });

    return sum;
}

//TODO move this in to skill
function toId(skillName) {
    return skillName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
}