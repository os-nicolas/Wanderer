function Card(words, active) {
    this.words = (words != undefined ? words : "");
    this.active = (active != undefined ? active : false);
    this.clear = function () {
        this.words = "";
        this.active = false;
    }
    this.toJSON = function () {
        return {
            "words": this.words,
            "active": this.active
        }
    }
    this.bind = function (textUI, checkUI) {
        // sync the UI to our values
        textUI.val(this.words);
        checkUI.val(this.active);

        // add listners
        var that = this;
        textUI.keyup(function () {
            that.words = $(this).val();
        });

        checkUI.change(function () {
            that.active = $(this).val();
            if (that.active) {
                textUI.removeClass("write")
            } else {
                textUI.addClass("write")
            }
        })
    }

}

Card.makeCard = function (json) {
    // we make some effort to support legacy characters
    // this could produce errors idk if that is a good idea
    if ($.type(json) === "string") {
        return new Card(json, false);
    }
    return new Card(json["name"], json["type"]);
}