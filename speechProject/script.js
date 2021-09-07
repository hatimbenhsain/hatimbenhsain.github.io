let nodeList;
let currentNode;

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
}

class Connection{
	constructor(child,words){
		this.words=words;
		this.child=child
	}
}


function setup(){
	noCanvas();
	let lang=navigator.language || 'en-US';
	let speechRec=new p5.SpeechRec(lang,gotSpeech)

	let speechRecStarted=false;
	
	let continuous=true;
	let interim=false;

	let timeBeforeReload=60;

	let currentMode="listening"

	speechRec.start(continuous,interim);
	speechRecStarted=true;

	setTimeout(function(){
		location.reload();
	},timeBeforeReload*1000)

	function gotSpeech(){
		console.log(speechRec);
		if(speechRec.resultValue){
			createP(speechRec.resultString);
		}
	}

	document.addEventListener("click",function(){
		if(!speechRecStarted){
			speechRec.start(continuous,interim);
			speechRecStarted=true;
		}
	});

}

function loadFile(){

}

