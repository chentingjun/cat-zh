dojo.declare("com.nuclearunicorn.game.Achievements", null, {
	game: null,
	
	achievements: [
	{
		name: "unicornConspiracy",
		title: "Unicorn Conspiracy",
		description: "Lift the shroud of the Unicorn conspiracy!",
		condition: function(){
			return ( this.game.resPool.get("unicorns").value > 0 );
		},
		unlocked: false
	},{
		name: "ironWill",
		title: "Iron Will",
		description: "You trully deserved this",
		condition: function(){
			return ( this.game.ironWill && !this.game.resPool.get("kittens").value && this.game.bld.get("mine").val > 0 );
		},
		unlocked: false
	},
	{
		name: "winterIsComing",
		title: "Winter Is Coming",
		description: "Have 10 kittens dead",
		condition: function(){
			return (this.game.deadKittens >= 10);
		},
		unlocked: false
	},
	{
		name: "youMonster",
		title: "You Monster",
		description: "Poor kittens.",
		condition: function(){
			return (this.game.deadKittens >= 100);
		},
		unlocked: false
	},{
		name: "lotusMachine",
		title: "Lotus Eater Machine",
		description: "Break the cycle of reincarnations",
		condition: function(){
			return (this.game.resPool.get("karma").value >= 1);
		},
		unlocked: false
	},
	{
		name: "utopiaProject",
		title: "Utopia Project",
		description: "Have a camulative happiness of over 150%",
		condition: function(){
			return (this.game.village.happiness > 1.5);
		},
		unlocked: false
	}
	],
	
	constructor: function(game){
		this.game = game;
	},
	
	get: function(name){
		for( var i = 0; i< this.achievements.length; i++){
			if (this.achievements[i].name == name){
				return this.achievements[i];
			}
		}
	},
	
	hasUnlocked: function(){
		for( var i = 0; i< this.achievements.length; i++){
			if (this.achievements[i].unlocked){
				return true;
			}
		}
		return false;
	},
	
	update: function(){
		for (var i = 0; i< this.achievements.length; i++){
			var ach = this.achievements[i];
			if (!ach.unlocked && dojo.hitch(this, ach.condition)()){
				ach.unlocked = true;
				this.game.msg("Achievement unlocked: " + ach.title + "!");
				this.game.achievementTab.visible = true;
			}
		}
	},
	
	save: function(saveData){
		saveData.achievements = this.achievements;
	},
	
	load: function(saveData){
		var ach = saveData.achievements;
		if (!ach || !ach.length){
			return;
		}
		for(var i = 0; i< ach.length; i++){
			var savedAch = ach[i];
			
			var a = this.get(savedAch.name);
			a.unlocked = savedAch.unlocked;
		}
	}
});

dojo.declare("com.nuclearunicorn.game.ui.tab.AchTab", com.nuclearunicorn.game.ui.tab, {
	render: function(content){
		var div = dojo.create("div", { }, content);
		
		div.innerHTML = "";
		for (var i = 0; i< this.game.achievements.achievements.length; i++){
			var ach = this.game.achievements.achievements[i];
			if (ach.unlocked){
				div.innerHTML += "<span class='achievement' style='cursor:pointer' title= '" + ach.description + "'>" + ach.title + "</span>";
			}
		}
	}
});
	
