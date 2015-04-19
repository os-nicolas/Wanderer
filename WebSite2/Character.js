function Character(json) {

    g.character = this;

    this.clear = function () {
        console.log("char - tried to clear");

        g.modules.forEach(function (mod) {
        	mod.clear();
        });

    }

    if (json != undefined) {

        g.modules.forEach(function (mod) {
        	mod.fromJSON(json);
        });
    }

    this.toJSON = function () {
        var out = {}

        g.modules.forEach(function (mod) {
        	mod.toJSON(out);
        });

        return out;
    }
}