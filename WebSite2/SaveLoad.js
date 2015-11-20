function SaveLoad() { }

function strip(adress) {
    var bits = adress.split("\\");
    var last = bits[bits.length - 1];
    return last.split(".")[0];
}

SaveLoad.init = function () {

    var fs = require('fs');

    $('#load').click(function () {
        var fileDialog = $("#load-file");
        fileDialog.on("change", function (event) {
            if (!($(this).val())) return; //Maybe the user didn't specify a value.
            var filename = $(this).val();


            fs.readFile(filename, function (error, chunk) {
                if (error) {
                    console.log("ERROR: ", error);
                    return;
                }
                var obj = jQuery.parseJSON(chunk);
                console.log("obj: ", obj);

                // clear the main uiS
                g.character.clear();

                new Character(obj);
                //$('head title', window.parent.document).text(strip(filename));
            });
            $(this).val(""); //Reset the filepath so that the event will be called again.
        });
        fileDialog.trigger("click");
    });

    var fs = require('fs');


    $('#save').click(function () {
        var fileDialog = $("#save-file");
        fileDialog.on("change", function (event) {
            if (!($(this).val())) return; //Maybe the user didn't specify a value.

            var filename = $(this).val();
            fs.writeFile(filename, JSON.stringify(g.character.toJSON()), function () { /*call back*/ });
            //$('head title', window.parent.document).text(strip(filename));
            $(this).val("");
        });
        fileDialog.trigger("click");
    });
}