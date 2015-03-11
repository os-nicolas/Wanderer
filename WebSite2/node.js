function levelLoss(distance) {
    return 1 / Math.pow(2, distance - 1);
}

function scaleLoss(sum) {
    return Math.pow(2*sum - 1/4, 1 / 2) + 1/2;
}

function Node(name, ui, positive) {
    var that = this;
    this.positive = (positive != undefined ? positive : true);
    this.name = name;
    this.ui = ui;

    // list of Connections
    this.helps = function () {
        var result = [];
        var that = this;
        netWork.connections.forEach(function (connection) {
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
        netWork.connections.forEach(function (connection) {
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
        netWork.deleteNode(that);
    }

    $("#delete-" + toId(this.name)).click(this.destory);

    this.dropdown = function () {
        return $("#dropdown-" + toId(this.name));
    }
}