function Item(name,ui) {
    this.name = name;
    this.ui = ui

    //ui.find("item-bonus-" + toId(name)).change(function () {
    //    ui.find(".value").value(this.val());
    //})

    ui.find('.check').change(updateBonus);

    this.checked = function () {
        return ui.find('.check').is(':checked');
    }

    this.getBonus = function () {
        return Number(ui.find(".item-bonus").val());
    }
}