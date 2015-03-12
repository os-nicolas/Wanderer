function NetWork() {
    this.allNodes = {};
    this.connections = [];
    this.add = function (name, ui,type, positive) {
        var newNode = new Node(name, ui, type, positive);
        this.allNodes[name + ""] = newNode;
        return newNode;
    }
    this.help = function (fromString, toString, ui) {
        var fromNode = this.allNodes[fromString];
        var toNode = this.allNodes[toString];
        new Connection(fromNode, toNode, ui);

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


}