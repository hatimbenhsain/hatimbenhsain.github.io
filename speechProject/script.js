let nodeList=[];
let currentNode;
let currentMode="talking";
let timeElapsed=0;
let timeBeforeChange=15;
let possibleModes=["listening","talking"];
let sav="";
let defaultVoice=0;

let startTime;
let date;

let howler;

let randomNodes;

let broker = {
    hostname: 'public.cloud.shiftr.io',
    port: 443
};
let topic = "car_eyesOn";
let client;
let creds = {
    clientID: 'p5Client',
    userName: 'public',
    password: 'public'
}

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
		if(this.forcedConnections.length==0){
			print("no word recognized, getting next random")
			return this.getRandomNext2();
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

	getRandomNext2(){
		if(this.forcedConnections.length>0){
			print("return forced connection");
			return(this.forcedConnections[Math.floor(Math.random()*this.forcedConnections.length)]);
		}else{
			print("get a random node");
			let i=Math.floor(Math.random()*randomNodes2.length);
			print(i);
			return(randomNodes2[i]);
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
let node3=new Node("I would like to know you.");
let node4=new Node("Hi, Are you ok?");
let node5=new Node("I’m concerned about you");
let node6=new Node("Where are you going?");
let node7=new Node("Please stay!!!");
let node8=new Node("How was your day?");
let node9=new Node("What's your name?");
let node10=new Node("My name is Jumairy");
let node11=new Node("Can we please go outside?");
let node12=new Node("Can i tell you a secret?");
let node13=new Node("Do you love me?");
let node14=new Node("Please tell me you love me!!!");
let node15=new Node("LOVE ME");
let node16=new Node("I’m BORED");
let node17=new Node("HEY, Where do you live?");
let node18=new Node("Wanna go for a ride?");
let node19=new Node("Take me away with you");
let node20=new Node("What are you doing tonight?");
let node21=new Node("What are you doing today?");
let node22=new Node("I love driving.");
let node23=new Node("HEY, What’s your friend’s name?");
let node24=new Node("Please help me!!!");
let node25=new Node("Hey, I can’t live without you!!!");
let node26=new Node("I worry a lot");
let node27=new Node("I worry about you");
let node28=new Node("Are you just going to leave me here?");
let node29=new Node("At least say goodbye!!!");
let node30=new Node("How can we get in touch?");
let node31=new Node("I love you");
let node32=new Node("I really like you ");
let node33=new Node("Jumairy");
let node34=new Node("Do you know Jumairy?");
let node35=new Node("You’re beautiful");
let node36=new Node("You’re gorgeous");
let node37=new Node("We’re in heaven");
let node38=new Node("Jumairy was here");
let node39=new Node("I live in Jumeirah");
let node40=new Node("Meet me on Jumeirah Road");
let node41=new Node("Jumairy is my friend");
let node42=new Node("Jumairy was here");
let node43=new Node("because i love you");
let node44=new Node("I come from Jumeirah");
let node45=new Node("Jumairy told me to be here");
let node46=new Node("I came to  spread love");
let node47=new Node("nice to meet you");
let node48=new Node("Can i get your number?");

randomNodes=[node1];

randomNodes2=[node11,node12,node13,node14,node15,node16,node17,node18,node19,node20,node21,
node22,node23,node24,node25,node31,node9,node35,node36];


//node1.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
node2.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
node2.forceConnection(node3);
node4.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
node5.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
node34.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
node48.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
node4.forceConnection(node5);
node6.childOfAll(["talkin","talking","what is this","weird"]);
node6.forceConnection(node7);
node8.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
node4.forceConnection(node26);
node4.forceConnection(node27);
node26.childOfAll(["worried","worries","anxiety"]);
node27.childOfAll(["worried","worries","anxiety"]);
node28.childOfAll(["bye","goodbye","see you","later"]);
node29.childOfAll(["have to leave","leaving","have to live"]);
node30.childOfAll(["bye","goodbye","see you","later"]);
node31.childOfAll(["love","you bored","you're bored"]);
node32.childOfAll(["i like you"]);
node34.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
//node10.forceConnection(node33);
node12.forceConnection(node33);
node24.forceConnection(node33);
node25.forceConnection(node33);
node18.forceConnection(node33);
node10.childOfAll(["your name","you're name"]);
node11.makeConnection(node37,["yes","no"]);
node13.makeConnection(node31,["yes","no"]);
node12.makeConnection(node38,["yes","no"]);
node39.childOfAll(["where do you live","where do you leave","you live where","were do you live","were do you leave"]);
node18.makeConnection(node40,["yes","no"]);
node40.childOfAll(["tonight","today","what are you doing"]);
node41.childOfAll(["your friend","you're friend"]);
node42.childOfAll(["why are you concerned","concerned"]);
node43.childOfAll(["why are you concerned","concerned"]);
node44.childOfAll(["where do you come","come from","where are you from","you from","from where"]);
node45.childOfAll(["why are you here","why you here","why're you here"]);
node46.childOfAll(["why are you here","why you here","why're you here"]);
node47.childOfAll(["bye","goodbye","see you","later"]);
node33.childOfAll(["your name","you're name","who are you","who're you","who owns","owner"]);

// node1.makeConnection(node2,["hi","hello","sup"]);
// node2.makeConnection(node3,["bad","not good","not"]);
// node2.makeConnection(node4,["good","great","awesome","alright","fine"]);
// node3.makeConnection(node1,["okay","worries","ok","cool"]);
// node4.makeConnection(node1,["yeah","yes","ok","cool","thanks"]);

let speechRec;
let voice;

let lastRecordedTime=0;

let spoke=false;

let waitTime=1000;

function setup(){
	client = new Paho.MQTT.Client(broker.hostname, broker.port, creds.clientID);
	client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    // connect to the MQTT broker:
    client.connect(
        {
            onSuccess: onConnect,       // callback function for when you connect
            userName: creds.userName,   // username
            password: creds.password,   // password
            useSSL: true                // use SSL
        }
    );

	howlerCTX=Howler.ctx;

	date=new Date();
	LoadSettings();



	noCanvas();
	lang=navigator.language || 'en-US';
	speechRec=new p5.SpeechRec(lang,gotSpeech);
	voice=new p5.Speech();

	print(voice.listVoices());



	voice.onLoad=function(){
		if(currentMode=="talking"){
			voice.onEnd=FinishedTalking;
			setTimeout(function(){
				voice.setVoice(defaultVoice);
				if(!spoke) voice.speak(currentNode.line);
				console.log("said "+currentNode.line);
				spoke=true;
				voiceStarted=true;
			},waitTime)			
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
			print("mode 2");
			voice.onEnd=FinishedTalking;
			setTimeout(function(){
				voice.setVoice(defaultVoice);
				if(!spoke) voice.speak(currentNode.line);
				console.log("said "+currentNode.line);
				spoke=true;
				voiceStarted=true;
			},waitTime)		
		}
	});

}

function onConnect() {
	print("client is connected");
    client.subscribe(topic);
}

function onConnectionLost(response) {
    if (response.errorCode !== 0) {
        print('onConnectionLost:' + response.errorMessage);
    }
}

function onMessageArrived(message) {
    print('I got a message:' + message.payloadString);
    // assume the message is two numbers, mouseX and mouseY.
    // Split it into an array:
    let values = split(message.payloadString, ',');
    // convert the array values into numbers:
}

function sendMqttMessage(msg) {
    // if the client is connected to the MQTT broker:
    if (client.isConnected()) {
        // start an MQTT message:
        message = new Paho.MQTT.Message(msg);
        // choose the destination topic:
        message.destinationName = topic;
        // send it:
        client.send(message);
        // print what you sent:
        print('I sent: ' + message.payloadString);
    }else{
    	setTimeout(function(){
			sendMqttMessage(msg);
		},500)
    }
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
	if(localStorage.getItem("defaultVoice")!=null && !isNaN(localStorage.getItem("defaultVoice"))){
		defaultVoice=parseInt(localStorage.getItem("defaultVoice"));
	}else{
		defaultVoice=0;
	}
	if(localStorage.getItem("waitTime")!=null && !isNaN(localStorage.getItem("waitTime"))){
		waitTime=parseInt(localStorage.getItem("waitTime"));
	}else{
		waitTime=1000;
	}
	
	if(currentMode=="talking"){
		sendMqttMessage("0");
	}else{
		sendMqttMessage("1");
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
	localStorage.setItem("defaultVoice",defaultVoice);
	localStorage.setItem("waitTime",waitTime);
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

function setDefaultVoice(k){
	defaultVoice=k;
}

function setWaitTime(k){
	waitTime=k;
}