function FailedGoal(words, effort,index) {
    this.words = words;
    this.effort = effort;
    this.index = index;

    $('#goal-failed-list').append(
        "<li id ='goal-failed-" + this.index + "'>" +
        "<input class='check play' type='checkbox' >"+
        "<p id ='goal-failed-text"+ this.index+ "'>"+ this.words +"</p>" +
        "<input id='goal-failed-effort-2' type='number' class='counter' value='"+this.effort+"'>"+
        "</li>");

    this.toJSON = function () {
        var out = {}
        out["words"] = this.words;
        out["effort"] = this.effort;
        out["index"] = this.index;
        return out;
    }



    this.getUI = function(){
        return $("#goal-failed-" + this.index);
    }

    this.getUI().find('.check').change(function () { g.updateBonus() })

    this.isChecked = function () {
        return this.getUI().find('.check')[0].checked;
    }

    
}
FailedGoal.fromJSON = function (input) {
    return new FailedGoal(input["words"], input["effort"], input["index"])
}