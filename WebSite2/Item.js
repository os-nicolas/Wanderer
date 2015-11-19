function Item(name, bonus) {
    this.name = name;
    this.checked = false;
    this.bonus = 1;
    //$("#item-element-list").append(Item.getItemRow(this.name));
    //this.ui = $("#item-root-" + toId(this.name));

    //this.destory = function () {
    //    console.log("tried to delete" + this.name);

    //    this.ui.remove();

    //    Items.deleteItem(this);
    //}
    //var that = this;
    //this.ui.find("#delete-" + toId(this.name)).click(function () { that.destory() });

    //this.value = function (val) {
    //    if (val == undefined) {
    //        return this.ui.find(".item-bonus").val();
    //    } else {
    //        this.ui.find(".item-bonus").val(val);
    //    }
    //}

    //if (bonus != undefined) {
    //    this.value(bonus);
    //}

    //this.ui.find('.check').change(g.updateBonus);

    //this.checked = function () {
    //    return this.ui.find('.check').is(':checked');
    //}

    //this.getBonus = function () {
    //    return Number(this.value());
    //}

    this.toJSON = function () {
        var out = {}
        out["name"] = this.name;
        out["bonus"] = this.bonus;//value();
        return out;
    }
}

Item.makeItem = function (json) {
    return new Item(json["name"], json["bonus"]);
}

//Item.getItemRow = function (name) {
//    return "<li id=item-root-" + toId(name) + " class='item'>"
//                + "<input class='check play' type='checkbox' >"
//                + name + " : "
//                + "<input id='item-bonus-" + toId(name) + "' type='number' class='counter item-bonus' value='1'>"
//                + "<div class='write'>"
//                    + "<button id='delete-" + toId(name) + "' type='button'>delete</button>"
//                + " </div>"
//                + "<ul id='" + toId(name) + "'></ul>"
//            + "</li>"
//}