function Connection(from, to) {
    this.to = to;
    this.from = from;

	$("#" + toId(from.name)).append("<li  id='" + toId(from.name) + "-to-" + toId(to.name) + "'>" + to.name + "<button class='write' id='sub-delete-" + toId(from.name) + "-to-" + toId(to.name) + "' type='button'>delete</button></li>")
	this.ui = $("#" + toId(from.name) + "-to-" + toId(to.name))

    Skills.netWork.connections.push(this);

    // hide this from drop down
    this.from.dropdown().find("option[value='" + toId(this.to.name) + "']").hide();

    //and reset the value to "-"
    this.from.dropdown().val("-");

    var that = this;
    this.destory = function () {

        // and remove the ui
        that.ui.remove();

        // show the option in the drop down
        that.from.dropdown().find("option[value='" + toId(that.to.name) + "']").show();

        // tell the network to do it part
        Skills.netWork.deleteConnection(that);
    }

    $("#sub-delete-" + toId(this.from.name) +"-to-"+toId(this.to.name)).click(this.destory);

    this.toJSON = function () {
        var out = {};
        out["to"] = this.to.name;
        out["from"] = this.from.name;
        return out;
    }
}

