let attackLevel = 1.0;
let releaseLevel = 0;

let attackTime = 0.001;
let decayTime = 0.2;
let susPercent = 0.2;
let releaseTime = 0.5;

let env, triOsc;

let word="";

let tempo;
let bpm;
let currentCount;
let metFreq;
let metHitFreq;
let metronomeEnv;
let metronomeHitEnv;

let activated;
let lastMillis;

let characters=[];


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");


var t, t2;
var synth;

slider.oninput = function() {
  tempo = this.value;
  output.innerHTML = this.value;
  for(i=0;i<characters.length;i++){
  	characters[i].time=characters[i].time%tempo*1000/120;
  }
}

function setup(){

}

document.onkeyup=function(e){
	if (word==""){
		createDiv("<p id=\"text\"></p>");
	}
	let t=select("text");
	
	if((e.keyCode>=65 && e.keyCode<=90)|| (e.keyCode>=97 && e.keyCode<=122)){
		word=word+e.key;
		document.getElementById("text").innerHTML=word;
		console.log(word);
		env.play();
		var audio = new Audio();
  		audio.src =synth.Animalese(e.key,false).dataURI;
  		audio.play();
  		characters.push(new Letter(e.key,currentCount,(millis()-lastMillis)));
		//env.play();
	}else if(e.keyCode==8 && word!=""){
		word=word.slice(0,word.length-1);
		document.getElementById("text").innerHTML=word;
		characters.pop();
	}else if(e.keyCode==32){
		word=word+" ";
		document.getElementById("text").innerHTML=word;
	}
}

function touchStarted() {
	
	// let cnv = createCanvas(100, 100);
 //  textAlign(CENTER);
 //  text('click to play', width/2, height/2);
 	output.innerHTML = slider.value;
  env = new p5.Envelope();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  triOsc = new p5.Oscillator('triangle');
  triOsc.amp(env);
  triOsc.start();
  triOsc.freq(150);
  getAudioContext().resume();

  console.log(activated);
  if(activated!=true){
  	tempo=80;
	bpm=4;
	metFreq=150;
	currentCount=0;
	activated=false;
  	activated=true;
  	synth = new Animalese('https://github.com/Acedio/animalese.js/raw/master/animalese.wav', function() {});
  	beat();
  }

  activated=true;
}

function beat(){
	lastMillis=millis();

	for(i=0;i<characters.length;i++){
		if(characters[i].count==currentCount){
			characters[i].t=setTimeout(playCh,characters[i].time,characters[i].ch);
		}
	}

	if(currentCount==3){
		env.mult(1.5);
		env.play();
		t2=setTimeout(function(){env.mult(1/1.5);},tempo*1000/120);
	}
	env.play();

	currentCount++;
	currentCount=currentCount%bpm;
	t=setTimeout(beat,tempo*1000/120);
}

function playCh(ch){
	var aud = new Audio();
  	aud.src =synth.Animalese(ch,false).dataURI;
  	aud.play();
}

function draw(){

}

class Letter{
	constructor(ch, count, time){
		this.ch=ch;
		this.count=count;
		this.time=time;
		this.t=[];
	}
}


function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}