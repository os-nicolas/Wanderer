function NetWork(json) {
	Skills.netWork = this;
    this.allNodes = {};
    this.connections = [];
    this.add = function (name,type, positive) {
        var newNode = new Node(name, type, positive);
        this.allNodes[toId(name)+""] = newNode;
        Skills.updateValues();
        return newNode;
    }
    this.help = function (fromString, toString) {
        var fromNode = this.allNodes[toId(fromString)];
        var toNode = this.allNodes[toId(toString)];
        new Connection(fromNode, toNode);

        Skills.updateValues();
        g.updateBonus();
    }

    this.deleteConnection = function(connection){
        var index = this.connections.indexOf(connection);
        if (index != -1) {
            this.connections.splice(index, 1);
        }

        //update bonuses and values
        Skills.updateValues();
        g.updateBonus();
    }

    this.deleteNode = function (node) {
        delete this.allNodes[toId(node.name)];
    	Skills.updateValues();
    	g.updateBonus();
    }

    if (json != undefined) {
        // add nodes
        for (var name in json["allNodes"]) {
            this.allNodes[toId(name)] = Node.makeNode(json["allNodes"][name]);
        }

        console.log(this.allNodes);

        var that = this;
        // add connections
        json["connections"].forEach(function (connection) {

        	console.log(toId(connection["from"]) + " to " + toId(connection["to"]), connection);
        	that.help(connection["from"], connection["to"]);
        });

    }

    this.clear = function () {
        for (var name in this.allNodes) {
            this.allNodes[toId(name)].destory();
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