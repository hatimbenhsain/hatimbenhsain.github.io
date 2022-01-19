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
	constructor(line,words=[]){
		this.line=line;
		this.connections=[];
		this.connectedWords=[];
		this.forcedConnections=[];
		nodeList.push(this);
		this.wordsToConnect=words;
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

function ConnectAll(){
	for(var i=0;i<nodeList.length;i++){
		nodeList[i].childOfAll(nodeList[i].wordsToConnect);
	}
}

let node1=new Node("hala walla!",[]);
let node2=new Node("do you know jumairy",["hi"]);
let node3=new Node("wha aleikum salam",["hello"]);
let node4=new Node("I love jumairy",["I know ju","I know your mary","I know tu","I know jo"]);
let node5=new Node("isn’t jumairy amazing?",["I do know ju","I do know tu","I do know jo","I do know your mary"]);
let node6=new Node("i do too",["i do"]);
let node7=new Node("ahhhhhhh i love jumairy",["who is ju","who is jo","who is tu","who is your mary"]);
let node8=new Node("marhaba",["salam"]);
let node9=new Node("it is a good morning indeed",["good morning"]);
let node10=new Node("look at that smile",["good afternoon"]);
let node11=new Node("evening? what time is it?",["good evening"]);
let node12=new Node("my day is better that you’re with me now",["my day was good"]);
let node13=new Node("it’s getting late… where are you going?",["good night"]);
let node14=new Node("alhamdulilah rabi ya afeekum",["shehalik"]);
let node15=new Node("i’m just a car in love",["what’s this"]);
let node16=new Node("i’m in love with you",["who are you in love with","in love with"]);
let node17=new Node("i love you",["who do you love"]);
let node18=new Node("yes it’s you",["mirror mirror on the wall"]);
let node19=new Node("cute",["zemanna"]);
let node20=new Node("i’m here to share the love",["why are you here","why you here"]);
let node21=new Node("i don’t know, i’m waiting for jumairy",["what’s happening"]);
let node22=new Node("why? wanna catch up later?",["when are you leaving","when you leaving","when do you leave"]);
let node23=new Node("give me yours first fdeitich",["your number"]);
let node24=new Node("i’m ok habeebti",["you ok"]);
let node25=new Node("I’m worried about you my love",["you worried"]);
let node26=new Node("only when i think i might lose you",["you have anxiety"]);
let node27=new Node("i really hope so",["you will never lose me"]);
let node28=new Node("i’m happy now that you’re here",["you happy"]);
let node29=new Node("never sad with you habeebti",["you sad"]);
let node30=new Node("wouldn’t you want to know",["who is your"]);
let node31=new Node("jumairy might see me talking to you",["worried about me"]);
let node32=new Node("i’m afraid you won’t find true love after me",["why are you worried","why you worried"]);
let node33=new Node("are you talking",["is it talking"]);
let node34=new Node("no i’m speaking",["are you talking"]);
let node35=new Node("where are you going",["let's go"]);
let node36=new Node("i’m just a loving car",["what is this"]);
let node37=new Node("you’re weird, i’m amazing",["weird"]);
let node38=new Node("please stay",["have to go"]);
let node39=new Node("my name is Jumairy",["your name"]);
let node40=new Node("i want to run away with you",["where do you want to go"]);
let node41=new Node("ask me to tell you a secret",["would you like to tell me something"]);
let node42=new Node("jumairy is on his was here",["tell me a secret"]);
let node43=new Node("i love you, i really really do",["do you love me"]);
let node44=new Node("love me first",["love me"]);
let node45=new Node("please tell me you love me!!!",["love"]);
let node46=new Node("I’m bored too, where should we go",["i’m bored"]);
let node47=new Node("wanna go for a ride?",["hey"]);
let node48=new Node("take me away with you",["i want to leave"]);
let node49=new Node("why? are you inviting me out?",["hobbies","hobby"]);
let node50=new Node("I love driving",["activity","activity"]);
let node51=new Node("can you call jumairy",["can i help"]);
let node52=new Node("no. i can’t live without you habeebti",["can’t live without you"]);
let node53=new Node("you too",["rude"]);
let node54=new Node("i’ll go anywhere with you my love",["going tonight"]);
let node55=new Node("We’re in heaven",["Can we go outside "]);
let node56=new Node("Jumairy was here",["Can I tell you a secret"]);
let node57=new Node("I love you",["Do you love me"]);
let node58=new Node("I love you",["why are you bored"]);
let node59=new Node("I live in Jumeirah",["where do you live"]);
let node60=new Node("Meet me on Jumeirah Road",["wanna go for a ride"]);
let node61=new Node("Meet me on Jumeirah Road",["doing tonight","what are you doing"]);
let node62=new Node("Meet me on Jumeirah Road",["doing today "]);
let node63=new Node("Jumairy is my friend",["your friend"]);
let node64=new Node("because i love you",["concerned about me","worried about me"]);
let node65=new Node("I come from Jumeirah",["come from","you from"]);
let node66=new Node("i’m waiting for jumairy",["why are you here","why you here"]);
let node67=new Node("i love that you’re here too",["do you like it here","do you like here"]);
let node68=new Node("I worry a lot",["do you have anxiety"]);
let node69=new Node("lets get married",["what can i do"]);
let node70=new Node("I worry about you",["are you worried"]);
let node71=new Node("Are you just going to leave me here?",["good bye","goodbye","good-bye"]);
let node72=new Node("At least say goodbye!!!",["we have to leave"]);
let node73=new Node("How can we get in touch?",["bye bye"]);
let node74=new Node("byeeeeeeeee",["bye"]);
let node75=new Node("nice to meet you fdeeitich",["see you"]);
let node76=new Node("wish you can stay longer",["nice to meet you","nice meeting you"]);
let node77=new Node("I love you",["I love you"]);
let node78=new Node("I really like you",["I like you"]);
let node79=new Node("Jumairy",["who owns you","owner"]);
let node80=new Node("because Jumairy is not coming",["why do you worry","why are you worried"]);
let node81=new Node("i don’t like food, but a cup of karak is always  a good choice",["like to eat","what food"]);
let node82=new Node("aside from karak, i do like a bit of petrol",["like to drink","what drink"]);
let node83=new Node("OH MY GOD, I LOVE HER",["who is Mu"]);
let node84=new Node("Haha! you’re funny",["no"]);
let node85=new Node("Great",["yes"]);
let node86=new Node("i know",["you are beautiful","you're beautiful"]);
let node87=new Node("thank you, i love you",["you're gorgeous","you are gorgeous"]);
let node88=new Node("Mhmmmmmmmmmmm What’s your friend’s  name?",[]);
let node89=new Node("What’s your name?",[]);
let node90=new Node("Please help me!!!",[]);
let node91=new Node("You’re beautiful",[]);
let node92=new Node("You’re gorgeous",[]);

randomNodes=[node1];
randomNodes2=[node89,node88,node90,node91,node92]

ConnectAll();

//randomNodes2=[node11,node12,node13,node14,node15,node16,node17,node18,node19,node20,node21,
//node22,node23,node24,node25,node31,node9,node35,node36];


//node1.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
// node2.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
// node2.forceConnection(node3);
// node4.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
// node5.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
// node34.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
// node48.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
// node4.forceConnection(node5);
// node6.childOfAll(["talkin","talking","what is this","weird"]);
// node6.forceConnection(node7);
// node8.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
// node4.forceConnection(node26);
// node4.forceConnection(node27);
// node26.childOfAll(["worried","worries","anxiety"]);
// node27.childOfAll(["worried","worries","anxiety"]);
// node28.childOfAll(["bye","goodbye","see you","later"]);
// node29.childOfAll(["have to leave","leaving","have to live"]);
// node30.childOfAll(["bye","goodbye","see you","later"]);
// node31.childOfAll(["love","you bored","you're bored"]);
// node32.childOfAll(["i like you"]);
// node34.childOfAll(["salim","solemn","sanam","hi","hello","salam","alaikum","good morning","good evening","good afternoon","good after noon","sup","what's up"]);
// //node10.forceConnection(node33);
// node12.forceConnection(node33);
// node24.forceConnection(node33);
// node25.forceConnection(node33);
// node18.forceConnection(node33);
// node10.childOfAll(["your name","you're name"]);
// node11.makeConnection(node37,["yes","no"]);
// node13.makeConnection(node31,["yes","no"]);
// node12.makeConnection(node38,["yes","no"]);
// node39.childOfAll(["where do you live","where do you leave","you live where","were do you live","were do you leave"]);
// node18.makeConnection(node40,["yes","no"]);
// node40.childOfAll(["tonight","today","what are you doing"]);
// node41.childOfAll(["your friend","you're friend"]);
// node42.childOfAll(["why are you concerned","concerned"]);
// node43.childOfAll(["why are you concerned","concerned"]);
// node44.childOfAll(["where do you come","come from","where are you from","you from","from where"]);
// node45.childOfAll(["why are you here","why you here","why're you here"]);
// node46.childOfAll(["why are you here","why you here","why're you here"]);
// node47.childOfAll(["bye","goodbye","see you","later"]);
// node33.childOfAll(["your name","you're name","who are you","who're you","who owns","owner"]);

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