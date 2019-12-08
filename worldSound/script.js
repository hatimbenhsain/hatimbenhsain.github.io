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

	var canvas;


var t, t2;
var synth;

var typed;

var languages=['az', 'sq', 'am', 'en', 'ar', 'hy', 'ml', 'mt', 'mk', 'mi', 'mr', 'mhr', 'af', 'mn', 'eu', 'de', 'ba', 'ne', 'be', 'no', 'bn', 'pa', 'my', 'pap', 'bg', 'fa', 'bs', 'pl', 'cy', 'pt', 'hu', 'ro', 'vi', 'ru', 'ht', 'ceb', 'gl', 'sr', 'nl', 'si', 'mrj', 'sk', 'el', 'sl', 'ka', 'sw', 'gu', 'su', 'da', 'tg', 'he', 'th', 'yi', 'tl', 'id', 'ta', 'ga', 'tt', 'it', 'te', 'is', 'tr', 'es', 'udm', 'kk', 'uz', 'kn', 'uk', 'ca', 'ur', 'ky', 'fi', 'zh', 'fr', 'ko', 'hi', 'xh', 'hr', 'km', 'cs', 'lo', 'sv', 'la', 'gd', 'lv', 'et', 'lt', 'eo', 'lb', 'jv', 'mg', 'ja', 'ms'];
var wordText;
var translation=[];		
var index = 0;

var enterPressed=false;


function wordSubmitted() {

	var wordText = word;
	
	let data = {wordText: wordText}

	for ( var i=0; i<languages.length; i++) {
		$.ajax({
			url: "https://translate.yandex.net/api/v1.5/tr.json/translate"+
			 "?key=trnsl.1.1.20191106T102433Z.735128d1d604053b.d023b232825c4c9e988730609f5d238455087492" +
			 "&text=" + wordText +
			 "&lang=en-" + languages[i] +
			 "&[format=plain]" +
			 "&[options=lang]" +
			 "&[callback=getMov]",
			method: 'GET',
		}).done(function(result) {

			 
			console.log(result.text[0]); 
			translation.push(result.text[0]);

		

			if (translation.length >= languages.length) {
				console.log("DONE");
				
				document.getElementById("textStuff").innerHTML = '';
				//dispMap();
				canvas=d3.select("body").append("svg")
	.attr("width", 2000)
	.attr("height", 1500);
				dispMap();
				dispTranslation();
				
			}
			
			//fail safe function in the event that the get function does not work	
		}).fail(function(err) {
			throw err;
		});
	}

		

	document.getElementById("textStuff").innerHTML = 'loading...';



		$.post("http://localhost:3000/wordsInputted/words", {
		wordText: wordText,
		}, function (data, status){
		console.log(status);
		})
}


function dispTranslation() {

	if (index < translation.length) {
		document.getElementById("translations").innerHTML = translation[index]; 
		console.log(translation[index]);
		index++;
		setTimeout(dispTranslation, tempo*1000/120);
	}else{
		index=0;
		setTimeout(dispTranslation, tempo*1000/120);
	}

}


function dispMap() {



if (index < 245) {
	
	d3.json("https://raw.githubusercontent.com/gabibranche/Mashups-Final/master/resources/Globe.json").then(function (data) {

	console.log(index, ": ", data.features[index].properties.admin);

	var group = canvas.selectAll("g")
		.data([data.features[index]])
		.enter()
				
		


	var projection = d3.geoMercator().scale(170).translate([780,900]);
	var path = d3.geoPath().projection(projection);


	var areas = group.append("path")
		.attr("d", path)
		.attr("class", "area")
		.attr("fill", "#c29cff");
		//.attr("fill", "#000000");



	index++;
	setTimeout(dispMap, tempo*200/120);

		})

	}

	};


slider.oninput = function() {
	var prevTempo=tempo;
  tempo = this.value;
  output.innerHTML = this.value;
  for(i=0;i<characters.length;i++){
  	characters[i].time=map(characters[i].time,0,prevTempo*1000/120,0,tempo*1000/120);
  }
}

function setup(){

}

document.onkeyup=function(e){
	if (word==""){
		//createDiv("<p id=\"text\"></p>");
		var newPar=document.createElement("p");
		newPar.setAttribute("id","text");
		document.getElementById("input").insertBefore(newPar,document.getElementById("input").childNodes[0]);
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
		if (word.charAt(word.length-1)!=" "){
			characters.pop()
		}
		word=word.slice(0,word.length-1);
		document.getElementById("text").innerHTML=word;
	}else if(e.keyCode==32){
		word=word+" ";
		document.getElementById("text").innerHTML=word;
	}else if(e.keyCode==13 && enterPressed==false){
		wordSubmitted();
		enterPressed=true;
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

  	select('#intro').style('opacity',0);
  	setTimeout(function(){
  		select('#myBlink').style('display','flex');
  		typed = new Typed('#typed', {strings: ["what is music?\n"],typeSpeed: 100,showCursor:false,onComplete:function(self){
  		select('#textStuff').style('flex-direction','column');
  	}});

  		select('#intro').style('display','none');
  		select("#myBlink").style('display','inline');

  	},1000);  	
  	tempo=80;
	bpm=4;
	metFreq=150;
	currentCount=0;
	activated=false;
  	activated=true;
  	synth = new Animalese('animalese.wav', function() {});
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


// function taken from animalese.js demo

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