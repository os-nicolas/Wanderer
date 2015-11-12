//TODO this should have get and set function on and take care of updating the UI

function Goal(words, effort) {
	this.words = (words!= undefined?words: "");
	this.effort = (effort != undefined ? effort : 0);
	this.clear = function(){
		this.words="";
		this.effort=0;
	}
	this.toJSON = function(){
		return {"words":this.words,
		"effort":this.effort}
	}
}

Goal.fromJSON = function (json) {
	console.log("loading", json);
	var result = new Goal()
	result.words = json["words"];
	result.effort = json["effort"];
	return result;
}

