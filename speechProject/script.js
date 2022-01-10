let nodeList=[];
let currentNode;
let currentMode="talking";
let timeElapsed=0;
let timeBeforeChange=15;
let possibleModes=["listening","talking"];
let sav="";

let startTime;
let date;

let howler;

let randomNodes;

class Node{
	constructor(line){
		this.line=line;
		this.connections=[];
		this.connectedWords=[];
		this.forcedConnections=[];
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
		for(let i=0;i<words.length;i++){
			this.connectedWords.push(words[i]);
		}
	}
	forceConnection(child){
		this.forcedConnections.push(child);
	}
	childOfAll(words){
		for(let i=0;i<nodeList.length;i++){
			nodeList[i].makeConnection(this,words);
		}
	}
	getNext(txt){
		shuffleArray(this.connections);
		for(var i=0;i<this.connections.length;i++){
			if(this.connections[i].words!=undefined){
				for(var k=0;k<this.connections[i].words.length;k++){
					if(txt.toLowerCase().includes(this.connections[i].words[k].toLowerCase())){
						return this.connections[i].child;
					}
				}
			}
		}
		if(this.forcedConnections.length>0){
			print("no word recognized, getting next random")
			return this.getRandomNext();
		}
		return null;
	}
	getRandomNext(){
		if(this.forcedConnections.length>0){
			print("return forced connection");
			return(this.forcedConnections[Math.floor(Math.random()*this.forcedConnections.length)]);
		}else{
			print("get a random node");
			let i=Math.floor(Math.random()*randomNodes.length);
			print(i);
			return(randomNodes[i]);
		}
	}
}

class Connection{
	constructor(child,words){
		this.words=words;
		this.child=child
	}
}

let node1=new Node("hala walla!");
let node2=new Node("would you like to get to know me?");
let node3=new Node("Please talk to me!");
let node4=new Node("Are you ok?");
let node5=new Node("I’m concerned about you");
let node6=new Node("Where are you going?");
let node7=new Node("Please stay!!!");
let node8=new Node("How was your day?");
let node9=new Node("What's your name?");
let node10=new Node("Would you like to play a game?");
let node11=new Node("Can we please go outside?");
let node12=new Node("Can i tell you a secret?");
let node13=new Node("Do you love me?");
let node14=new Node("Please tell me you love me!!!");
let node15=new Node("LOVE ME");
let node16=new Node("I’m BORED");
let node17=new Node("HEY, Where do you live?");
let node18=new Node("Wanna go for a ride?");
let node19=new Node("I know you want to take me home with you!!!");
let node20=new Node("What are you doing tonight?");
let node21=new Node("What are you doing today?");
let node22=new Node("I love driving around too...");
let node23=new Node("HEY, What’s your friend’s name?");
let node24=new Node("Please help me!!!");
let node25=new Node("Hey, I can’t live without you!!!");
let node26=new Node("I worry a lot");
let node27=new Node("I worry about you");
let node28=new Node("Are you just going to leave me here?");
let node29=new Node("At least say goodbye!!!");
let node30=new Node("How can we get in touch?");
let node31=new Node("I love you");
let node32=new Node("I like you ");
let node33=new Node("Jumairy");

randomNodes=[node1,node10,node11,node12,node13,node14,node15,node16,node17,node18,node19,node20,node21,
node22,node23,node24,node25,node33]


node1.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
node2.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
node2.forceConnection(node3);
node4.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
node5.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
node4.forceConnection(node5);
node6.childOfAll(["talkin","talking","what is this","weird"]);
node6.forceConnection(node7);
node8.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
node9.childOfAll(["name"]);
node4.forceConnection(node26);
node5.forceConnection(node27);
node26.childOfAll(["worried","worries","anxiety"]);
node27.childOfAll(["worried","worries","anxiety"]);
node28.childOfAll(["bye","goodbye","see you","later"]);
node29.childOfAll(["have to leave","leaving"]);
node30.childOfAll(["bye","goodbye","see you","later"]);
node31.childOfAll(["love"]);
node32.childOfAll(["i like you"]);
node33.childOfAll(["name","who","come from","owns","why are you","you from"]);
node10.forceConnection(node33);
node12.forceConnection(node33);
node24.forceConnection(node33);
node25.forceConnection(node33);
node18.forceConnection(node33);

// node1.makeConnection(node2,["hi","hello","sup"]);
// node2.makeConnection(node3,["bad","not good","not"]);
// node2.makeConnection(node4,["good","great","awesome","alright","fine"]);
// node3.makeConnection(node1,["okay","worries","ok","cool"]);
// node4.makeConnection(node1,["yeah","yes","ok","cool","thanks"]);

let speechRec;
let voice;

let lastRecordedTime=0;

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

	let timeBeforeReload=15;

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

	let resetButton=document.getElementById("resetButton");
	resetButton.addEventListener("click",ResetSettings);

	function gotSpeech(){
		console.log(speechRec);
		if(speechRec.resultValue){
			createP(speechRec.resultString);
			var n=currentNode.getNext(speechRec.resultString);
			if(n!=null){
				print(n);
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
	timeElapsed=timeElapsed+deltaTime/1000;
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
	timeElapsed=timeBeforeChange;
	MoveOn();
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
		print("get next random");
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

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}