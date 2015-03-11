function Connection(from, to, ui) {
    this.to = to;
    this.from = from;
    this.ui = ui
    netWork.connections.push(this);

    // hide this from drop down
    this.from.dropdown().find("option[value='" + toId(this.to.name) + "']").hide();

    //and reset the value to "-"
    this.from.dropdown().val("-");

    var that = this;
    this.destory = function () {
        console.log("delete connection", that);

        // and remove the ui
        that.ui.remove();

        // show the option in the drop down
        that.from.dropdown().find("option[value='" + toId(that.to.name) + "']").show();

        // tell the network to do it part
        netWork.deleteConnection(that);
    }

    $("#sub-delete-" + toId(this.from.name) +"-to-"+toId(this.to.name)).click(this.destory);
}