function levelLoss(distance) {
    return 1 / Math.pow(2, distance - 1);
}

function scaleLoss(sum) {
    var power = .55;// this matches the descreet version a little better with .5 but w/e
    return Math.pow(2 * sum + 1, .52) - (Math.pow(3, .52) - 1);
}

//function scaleLoss(input) {
    //var startAt = .0001;
    //var step = startAt
    //var sum = startAt;
    //var at = startAt;
    //while (at < input) {
    //    sum += (1 / sum) * step;
    //    at += step;
    //}
    //return sum;
//}

function Node(name, ui, type,positive) {
    var that = this;
    this.type = type;
    this.positive = (positive != undefined ? positive : true);
    this.name = name;
    this.ui = ui;

    // list of Connections
    this.helps = function () {
        var result = [];
        var that = this;
        g.character.netWork.connections.forEach(function (connection) {
            if (connection.from == that) {
                result.push(connection);
            }
        });
        return result;
    };
    // list of Connections
    this.helpedBy = function () {
        var result = [];
        var that = this;
        g.character.netWork.connections.forEach(function (connection) {
            if (connection.to == that) {
                result.push(connection);
            }
        });
        return result;
    };
    this.getBonus = function () {
        var sum = (this.positive ? 1 : -1);
        var distance = 0;
        // list of nodes
        var blackList = [];
        // list of connections
        var current = [];
        this.helpedBy().forEach(function (by) {
            current.push(by);
        });
        while (current.length != 0) {
            distance++;
            var nextCurrent = [];
            current.forEach(function (connection) {
                blackList.push(connection.from);
                sum += levelLoss(distance) * (connection.from.positive ? 1 : -1);
                connection.from.helpedBy().forEach(function (helpedByConnection) {
                    if (blackList.indexOf(helpedByConnection.from) == -1 && nextCurrent.indexOf(helpedByConnection) == -1) {
                        nextCurrent.push(helpedByConnection);
                    }
                });
            });
            current = nextCurrent;
        }
        return scaleLoss(sum);
    }

    this.destory = function () {
        console.log("delete connection", that);

        // kill our connections
        that.helpedBy().forEach(function (connection) {
            connection.destory();
        })
        that.helps().forEach(function (connection) {
            connection.destory();
        })
        
        // kill our ui
        that.ui.remove();

        // remove this from the drop downs
        $("option[value='" + toId(that.name) + "']").remove();

        // remove ourself from network
        g.character.netWork.deleteNode(that);
    }

    $("#delete-" + toId(this.name)).click(this.destory);

    this.dropdown = function () {
        return $("#dropdown-" + toId(this.name));
    }

    this.checked = function () {
        return ui.find('.check').is(':checked')
    }
}