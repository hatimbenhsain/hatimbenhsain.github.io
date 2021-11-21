let nodeList=[];
let currentNode;
let currentMode="talking";
let timeElapsed=0;
let timeBeforeChange=60;
let possibleModes=["listening","talking"];
let sav="";

let startTime;
let date;

let howler;

class Node{
	constructor(line){
		this.line=line;
		this.connections=[];
		this.connectedWords=[];
		nodeList.push(this);
	}
	connect(connection){
		this.connections.push(connection);
		for(let i=0;i<connection.words.length;i++){
			this.connectedWords.push(connection[i]);
		}
	}
	makeConnection(child,words){
		let c=new Connection(child,words);
		this.connections.push(c);
		for(let i=0;i<words;i++){
			this.connectedWords.push(words[i]);
		}
	}
	getNext(txt){
		for(var i=0;i<this.connections.length;i++){
			if(this.connections[i].words!=undefined){
				for(var k=0;k<this.connections[i].words.length;k++){
					if(txt.includes(this.connections[i].words[k])){
						return this.connections[i].child;
					}
				}
			}
		}
		return null;
	}
	getRandomNext(){
		return(this.connections[Math.floor(Math.random(0,this.connections.length))].child);
	}
}

class Connection{
	constructor(child,words){
		this.words=words;
		this.child=child
	}
}

let node1=new Node("hello");
let node2=new Node("how's it going?");
let node3=new Node("oh i'm sorry");
let node4=new Node("that's great to hear.");

node1.makeConnection(node2,["hi","hello","sup"]);
node2.makeConnection(node3,["bad","not good","not"]);
node2.makeConnection(node4,["good","great","awesome","alright","fine"]);
node3.makeConnection(node1,["okay","worries","ok","cool"]);
node4.makeConnection(node1,["yeah","yes","ok","cool","thanks"]);

let speechRec;
let voice;

let lastRecordedTime=0;

function preload(){
	sav=loadStrings("save.txt");
}

function setup(){
	howlerCTX=Howler.ctx;

	date=new Date();
	LoadSettings();

	noCanvas();
	lang=navigator.language || 'en-US';
	speechRec=new p5.SpeechRec(lang,gotSpeech);
	voice=new p5.Speech();

	voice.onLoad=function(){
		if(currentMode=="talking"){
			voice.onEnd=FinishedTalking;
			voice.speak(currentNode.line);
			voiceStarted=true;
			console.log("said "+currentNode.line)
		}
	}

	let speechRecStarted=false;
	let voiceStarted=false;
	
	let continuous=true;
	let interim=false;

	let timeBeforeReload=30;

	if(currentMode=="listening"){
		speechRec.start(continuous,interim);
		speechRecStarted=true;
	}

	setTimeout(function(){
		MoveOn();
	},timeBeforeReload*1000)

	document.addEventListener("keydown",function(e){
		if(currentMode=="listening" && e.key==" "){
			timeElapsed=timeBeforeChange;
			MoveOn();
		}else if(e.key=="r"){
			ResetSettings();
		}
	})

	function gotSpeech(){
		console.log(speechRec);
		if(speechRec.resultValue){
			createP(speechRec.resultString);
			var n=currentNode.getNext(speechRec.resultString);
			if(n!=null){
				GoNext(n);
			}
		}
	}

	document.addEventListener("click",function(){
		if(!speechRecStarted && currentMode=="listening"){
			speechRec.start(continuous,interim);
			speechRecStarted=true;
		}else if(currentMode=="talking" && !voiceStarted){
			voice.onEnd=FinishedTalking;
			voice.speak(currentNode.line);
			voiceStarted=true;
		}
	});

}

function draw(){
	timeElapsed=timeElapsed+performance.now()/1000000;
}

function ParseString(txt,arr){
	for(var i=0;i<txt.length;i++){
		for(var k=i+1;k<txt.length;k++){
			if(txt.charAt(k)==" "){
				break;
			}
		}
		arr.push(txt.slice(i,k));
		
		i=k;
	}
	return arr;
}

function ArrayToString(arr){
	let txt="";
	for(var i=0;i<arr.length;i++){
		txt=txt+arr[i]+" ";
	}
	return txt;
}

function ResetSettings(){
	localStorage.removeItem("currentMode");
	localStorage.removeItem("currentNode");
	localStorage.removeItem("timeElapsed");
	console.log("reset settings");
}

function LoadSettings(){
	// let settings=[];
	// settings=ParseString(sav[0],settings);
	// currentMode=settings[0];
	// currentNode=nodeList[parseInt(settings[1])];
	// timeElapsed=parseInt[settings[2]];
	if(localStorage.getItem("currentMode")!=null){
		currentMode=localStorage.getItem("currentMode");
	}else{
		currentMode="talking";
	}
	if(localStorage.getItem("currentNode")!=null){
		currentNode=nodeList[parseInt(localStorage.getItem("currentNode"))];
	}else{
		currentNode=nodeList[0];
	}
	if(localStorage.getItem("timeElapsed")!=null && !isNaN(localStorage.getItem("timeElapsed"))){
		timeElapsed=parseInt(localStorage.getItem("timeElapsed"));
	}else{
		timeElapsed=0;
	}
}

function SaveSettings(){
	// let txt=ArrayToString([currentMode,nodeList.indexOf(currentNode),timeElapsed]);
	// let writer=createWriter("save.txt");
	// writer.print(txt);
	// writer.close();
	// writer.clear();
	localStorage.setItem("currentNode",nodeList.indexOf(currentNode));
	localStorage.setItem("currentMode",currentMode);
	localStorage.setItem("timeElapsed",timeElapsed);
}

function FinishedTalking(){
	console.log("finished talking");
	currentMode="listening";
	SaveSettings();
	location.reload();
}

function MoveOn(){
	if(timeElapsed>=timeBeforeChange){
		GoNext(currentNode.getRandomNext());
	}else{
		ReloadPage();
	}
}

function GoNext(n){
	currentMode="talking";
	currentNode=n;
	timeElapsed=0;
	ReloadPage();
}

function ReloadPage(){
	SaveSettings();
	location.reload();
}