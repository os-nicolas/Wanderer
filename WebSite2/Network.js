function NetWork(char,json) {
    this.allNodes = {};
    this.connections = [];
    char.netWork = this;
    this.add = function (name,type, positive) {
        var newNode = new Node(name, type, positive);
        this.allNodes[toId(name)+""] = newNode;
        updateValues();
        return newNode;
    }
    this.help = function (fromString, toString) {
        var fromNode = this.allNodes[toId(fromString)];
        var toNode = this.allNodes[toId(toString)];
        new Connection(fromNode, toNode);

        updateValues();
        updateBonus();
    }

    this.deleteConnection = function(connection){
        var index = this.connections.indexOf(connection);
        if (index != -1) {
            this.connections.splice(index, 1);
        }

        //update bonuses and values
        updateValues();
        updateBonus();
    }

    this.deleteNode = function (node) {
        delete this.allNodes[node.name];

        updateValues();
        updateBonus();
    }

    if (json != undefined) {
        // add nodes
        for (var name in json["allNodes"]) {
            this.allNodes[name] = Node.makeNode(json["allNodes"][name]);
        }

        var that = this;
        // add connections
        json["connections"].forEach(function (connection) {
            that.help(connection["from"], connection["to"]);
        });

    }

    this.clear = function () {
        for (var name in this.allNodes) {
            this.allNodes[name].destory();
        }
    }

    this.toJSON = function () {
        var out = {};
        out["allNodes"] = {}
        for (var name in this.allNodes) {
            out["allNodes"][name] = this.allNodes[name].toJSON();
        }
        out["connections"] = [];
        var that = this;
        this.connections.forEach(function (connection) {
            out["connections"].push(connection.toJSON())
        })
        return out;
    }


}