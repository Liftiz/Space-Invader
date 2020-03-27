
// declaration du score:
const scoreDisplayer = document.querySelector('#score');
const game = document.querySelector('#game');
let score = 0;


// declaration du tir vaisseau
let tir = false;
// création d une fonction pour la position des "aliens"
function Sprite (filename, left, top){
	this._node = document.createElement ("img");
	this._node.src = filename;
	this._node.style.position ="absolute";
	this._display = "bloc";
	this._sens = "right";
	document.body.appendChild (this._node);

Object.defineProperty( this, "left", {
get : function(){
	return this._left;
}, 
set : function(value){
	this._left = value;
	this._node.style.left = value + "px";
}
} );
Object.defineProperty( this, "sens", {
get : function(){
	return this._sens;
}, 
set : function(value){
	this._sens = value;
}
} );
Object.defineProperty(this, "top",{
	get: function(){
		return this._top;
	}, 
	set : function(value){
		this._top = value;
		this._node.style.top = this._top + "px";

	}
});

Object.defineProperty(this, "display",{
	get : function(){
		return this._display;
	},
	set : function(value){
		this._display = value;
		this._node.style.display = value;

	}
});
Object.defineProperty(this, "width",{
	get: function(){
		return this._width;
	}, 
	set : function(value){
		this._width = value;
		this._node.style.width = this._width + "px";

	}
});
Object.defineProperty(this, "height",{
	get: function(){
		return this._height;
	}, 
	set : function(value){
		this._top = value;
		this._node.style.height = this._height + "px";

	}
});
this.left = left;
this.top = top;
}

// rapelle de la fonction + ajout d'images, et des position de départ

var alien1 = new Sprite ("img/alien1.png", 50, 50, 1500, 500)
var alien2 = new Sprite ("img/alien2.png", 250, 50)
var alien3 = new Sprite ("img/alien3.png", 450, 50)
var alien4 = new Sprite ("img/alien4.png", 750, 50)
var alien5 = new Sprite ("img/alien5.png", 1100, 50)
var alien6 = new Sprite ("img/alien1.png", 50, 150, 1500, 500)
var alien7 = new Sprite ("img/alien2.png", 250, 150)
var alien8 = new Sprite ("img/alien3.png", 450, 150)
var alien9 = new Sprite ("img/alien4.png", 750, 150)
var alien10 = new Sprite ("img/alien5.png", 1100, 150)
let missile = new Sprite ("img/missile.png", 0, 0);
missile.display= "none";

var vaisseau = new Sprite ("img/vaisseau.png", 600, 520);
let life = document.getElementById("vie");
life.display ="block";
let life1 = document.getElementById("vie1");
life1.display ="block";
let life2 = document.getElementById("vie2");
life2.display ="block";
// Gestionnaire d'évènement

document.onkeydown = function ( event ){
	// console.log(event.keyCode);
if (event.keyCode ==  65){
	// déplacer haut gauche A
    vaisseau.left -=  10; 
    vaisseau.top -=  10 ; 
}else if (event.keyCode ==  38){
	// déplacer fleche haut
    vaisseau.top -=  10 ; 

} else if (event.keyCode ==  69){
	// déplacer haut à droite E 
    vaisseau.left +=  10 ;
    vaisseau.top -= 10; 

}else if (event.keyCode ==  37){
	// déplacer fleche gauche 
    vaisseau.left -=  10;  

}else if (event.keyCode == 39 ){  
// deplacer fleche droite 
vaisseau.left += 10;

}else if (event.keyCode == 87 ){ 
// deplacer bas gauche W
vaisseau.left -= 10;
vaisseau.top += 10;

}else if (event.keyCode == 40){
// en bas fleche bas
	vaisseau.top += 10;

}else if (event.keyCode == 67 ){ 
// deplacer bas à droite C
vaisseau.left += 10;
vaisseau.top += 10;
}


if (event.keyCode == 32 && !tir){
	
	// tir du vaisseau
	missile.display = "block";
	missile.left = vaisseau.left + (vaisseau._node.width - missile._node.width)/ 2; 
	missile.top = vaisseau.top;
	missile.startAnimation(moveMissile, 20);
	tir = true;

	}

	// bloque le vaisseau dans l'écran
	if (vaisseau.left < 0){
	vaisseau.left = 0;
} else if ( vaisseau.left > document.body.clientWidth - vaisseau._node.width ){
	vaisseau.left = document.body.clientWidth - vaisseau._node.width;
}
if (vaisseau.top < 0 ){
	vaisseau.top = 0;
} else if ( vaisseau.top > document.body.clientHeight - vaisseau._node.height ){
	vaisseau.top = document.body.clientHeight - vaisseau._node.height;
}
}

	
	// démarrer l'animtion
Sprite.prototype.startAnimation = function (fct, interval){
	if (this._clock) window.clearInterval(this._clock);
	let _this = this;
	this._clock = window.setInterval(function (){
		fct (_this);
	}, interval); 

	};
// stopper l'animation
Sprite.prototype.stopAnimation = function(){
	window.clearInterval (this._clock);
	this.display = "none";
	tir = false;
};

// mouvement du missile vaisseau:
function moveMissile( missile ){
	missile.top -= 10;
	if ( missile.top < -40 ) {
		missile.stopAnimation();
		tir = false;
	}
	
// fait en sorte qu'au tire vaisseau l'alien s'efface + score:
	for( let i = 1; i < 11; i++ ){
		let alien = window["alien" + i];
		if ( alien.display != "none" && missile.left >= (alien.left*0.9) && missile.left <= (alien.left*1.1) && missile.top == alien.top){
			missile.stopAnimation();
			alien.stopAnimation ();
			// missileA.stopAnimation();
            score += 100;
  scoreDisplayer.innerHTML = score;
//console.log(score);
// if (missileA.display !="none" && missileA.left >=(alien.left) && missileA.left <=(alien.left) && missileA.top == alien.top){
// 	missileA.stopAnimation();
// }
		} 
}

};



// fonction missile alien:

	function moveMissileAlien( missileA ){
	missileA.top += 10;
	// si le missile touche le vaisseau
	if((missileA.top+30) == vaisseau.top && missileA.left>=(vaisseau.left*0.9)  && missileA.left<=(vaisseau.left*1.1)){
		missileA.stopAnimation();
		tirA = false;
		//retirer une vie 
		//alert("moins 1 vie");
		var vies = document.querySelectorAll(".vie");
		console.log(vies.length);
		var vie = vies[vies.length-1];
		vie.parentNode.removeChild(vie);
		if(vies.length === 1){
			document.querySelector("#game").style.display ="block";
		}
	} else	if ( missileA.top > 1000 ) {
		missileA.stopAnimation();
		tirA = false;
	} 	
}
function moveMissileAlienB( missileB ){
	missileB.top += 10;
	// si le missile touche le vaisseau
	if((missileB.top+30) == vaisseau.top && missileB.left>=(vaisseau.left*0.9)  && missileB.left<=(vaisseau.left*1.1)){
		missileB.stopAnimation();
		tirA = false;
		//retirer une vie 
		//alert("moins 1 vie");
		var vies = document.querySelectorAll(".vie");
		console.log(vies.length);
		var vie = vies[vies.length-1];
		vie.parentNode.removeChild(vie);
		if(vies.length === 1){
			game.display ="block"; 
// Prend l'élément du modal:
   


		}
	} else	if ( missileB.top > 1000 ) {
		missileB.stopAnimation();
		tirA = false;
	} 	
}
   



















// pour le tire d'alien:
let tirA = false;

function tirAlien(){
	let alea = Math.round(Math.random()*1);
	//console.log(alea);
	if(alea==1 && !tirA){
		tirA=true;
		missileA.startAnimation(moveMissileAlien,  20);
		missileA = recharge();
 // if (alien.display !="none" && missileA.left >=(alien.left) && missileA.left <=(alien.left) && missileA.top == alien.top){
 // 	missileA.stopAnimation();
 // }
	}
	if(alea==1 && !tirA){
		tirA=true;
		missileB.startAnimation(moveMissileAlien,  20);
		missileB = recharge();
	}
	// si un alien tire un  missile qui atteint le vaisseau alors on enleve une vie au vaisseau.
	// Mais pour cela il faut que le missile aie touché le vaisseau comme le missile du vaisseau qui 
	// touche lalien et qui s efface
	for (let i =3; i>3; i--){
	if (life.display !="none" && life1.display != "none" && life2.display != "none" && missileA.top>=(vaisseau.top*0.9) && missileA.top == vaisseau.top){
			vaisseau.stopAnimation();
			
}
	}

}


// fonction pour le mouvement d'alien à gauche
function moveAlienToLeft(alien){
	alien.left -= 3;
	if (alien.left <=0){
		alien.top += 50; 
		alien.sens = "right";
		alien.startAnimation(moveAlienToRight, 20);
	}
	tirAlien();
	
}
// fonction pour le mouvement d'alien à droite
function moveAlienToRight(alien){
	alien.left += 3;
	if (alien.left > document.body.clientWidth - alien._node.width){
		alien.top += 50;
		alien.sens = "left";
		alien.startAnimation(moveAlienToLeft, 20);
	}	

	tirAlien();

}
// permet la recharge de missile des aliens
function recharge(){
	var alea = Math.ceil(Math.random()*10);
	var alien = window["alien" + alea]
	var missileA = new Sprite ("img/missileA.png", alien.left, alien.top+30);
	//var missileB = new Sprite ("missileA.png", alien.left, alien.top+30);
	if (missileA.display = "block"){
		if(alien.sens == "right"){
			missileA.startAnimation(moveAlienToRight, 20)		
		} else {
			missileA.startAnimation(moveAlienToLeft, 20);
		}
	} else if(  alien.display != "none" && missile.left >= (alien.left*0.9) && missile.left <= (alien.left*1.1) && missile.top == alien.top )
	{
		missileA.stopAnimation();
	}
	// if (missileB.display = "block"){
	// 	if(alien.sens == "right"){
	// 		missileB.startAnimation(moveAlienToRight, 20)		
	// 	} else {
	// 		missileB.startAnimation(moveAlienToLeft, 20);
	// 	}
	// } else if(  alien.display != "none" && missile.left >= (alien.left*0.9) && missile.left <= (alien.left*1.1) && missile.top == alien.top )
	// {
	// 	missileB.stopAnimation();
	// }
	
	
	// missileA.startAnimation(moveAlienToLeft,  20);
	return missileA;
	//return missileB;

	// if(missileA.display ="block"){
	// 	missileA.display ="none";
	// 	missileA.stopAnimation();
	// 		alien.stopAnimation ();
	// }

}
// fait appelle aux recharges alien + startAnimation:
var missileA = recharge();
for ( var i = 1 ; i < 11; i++){
	window["alien" + i].startAnimation(moveAlienToRight, 20);
	

}
var missileB = recharge();
for ( var i = 1 ; i < 11; i++){
	window["alien" + i].startAnimation(moveAlienToRight, 20);
	

}
var missileC = recharge();
for ( var i = 1 ; i < 11; i++){
	window["alien" + i].startAnimation(moveAlienToRight, 20);
	

}
