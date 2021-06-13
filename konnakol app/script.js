fileNames=[];
howls=[];
syllables=[];

potentialSyllableNames=["bheem","cha","dheem","dhi","dhin","dhom","num","ta","tha","tham"];

kala=80;	//tempo
gati=4;		//akshara per beat

// $(document).ready(function () 
// {
//     $.get("./sounds/", function(data) 
//     {
//         $("#fileNames").append(data);
//         //console.log(data);
//         GetFileNames(data);
//         GetSyllables();
//         console.log(syllables);
//     });
// })
getAttempts=0;
getDone=0;

soundsLoaded=0;

$(document).ready(function () {
	for(var i=0;i<potentialSyllableNames.length;i++){
		AddFileName(potentialSyllableNames[i],1);
	}
})

function AddFileName(sn,n){
	getAttempts++;
	$.ajax({
		url:"./sounds/"+sn+String(n)+".mp3",
		success:function(){
			var s=this.url.substring(9,this.url.length-4);
			fileNames.push(s);
			console.log(s);
			AddFileName(s.substr(0,s.length-1),parseInt(s.substr(s.length-1,1))+1);
			GetSyllables();
			CheckGets();
		},
		error:function(){	
			CheckGets();
		}
	});
}

function CheckGets(){
	getDone++;
	if(getDone>=getAttempts){
		for(var i=0;i<howls.length;i++){
			howls[i].once("load",function(){
				CheckLoads();	
			});
			howls[i].load();
		}
	}
}

function CheckLoads(){
	console.log("check loads");
	soundsLoaded++;
	if(soundsLoaded>=howls.length){
		document.getElementById("load screen").style.visibility="hidden";
		document.getElementById("loaded").style.visibility="visible";
	}
}

function GetFileNames(d){
	//console.log(d.length);
	for(var i=0;i<d.length-5;i++){
		if(d.substr(i,7)=="title=\""){
			i+=7;
			var l=0;
			while(d.substr(i+l,4)!=".mp3" && l<20){
				l++;
			}
			if(l<20){
				fileNames.push(d.substr(i,l));
			}
		}
	}
	//console.log(fileNames);
}

function GetSyllables(){
	if(fileNames.length>0){
		var s=fileNames.pop();
		var sn=s.substr(0,s.length-1);
		var added=false;
		if(isNumeric(s.substr(s.length-1,1))){
			for(var i=0;i<syllables.length;i++){
				if(syllables[i].name==sn){
					var snd=new Howl({
						src:["sounds/"+s+".mp3"],
						preload:"false"
					});
					howls.push(snd);
					syllables[i].sounds.push(snd);
					added=true;
					break;
				}
			}
			if(!added){
				var snd=new Howl({
					src:["sounds/"+s+".mp3"],
					preload:"false"
				});
				var v=new Howl({
					src:["sounds/"+s.substr(0,s.length-1)+".mp3"],
					preload:"false"
				});
				howls.push(snd);
				howls.push(v);
				syllables.push({
					name:s.substr(0,s.length-1),
					sounds:[snd],
					voice:v
				});
				AddButton(sn);
			}
		}
		GetSyllables();
	}
}

function AddButton(sn){
	var seq=document.getElementById("sequencer");
	var but=document.createElement("input");
	seq.appendChild(but);
	but.type="button";
	but.value=sn;
	but.id=sn+"Button";
	but.className="seqButton";
	but.addEventListener("click",function(){
		textBox.value=textBox.value+this.id.slice(0,-6);
		playVoice(this.id.slice(0,-6));
	})
}

//console.log(files);

//syllables=["bheem","cha","dheem","dhi","dhin","dhom","num","ta","tha","tham"]
notes=[];

maxSyllableLength=1;
for(var i=0;i<syllables.length-1;i++){
	maxSyllableLength=Math.max(maxSyllableLength,syllables[i].length);
}

textBox=document.getElementById("textBox");
playButton=document.getElementById("playButton");
notePlayedDiv=document.getElementById("notePlayedDiv");
notePlayed=document.getElementById("notePlayed");

playButton.addEventListener("click",play);

function play(){
	var ns=[]
	analyze(textBox.value.trim().toLowerCase(),ns);
	console.log(ns);
	playMusic(ns);
	notePlayedDiv.style.visibility="visible";
	//console.log(fileNames);
}

function analyze(txt,ns){
	if(txt!=""){
		var s="";
		var sn="";
		if(txt.substr(0,5)=="tempo"){
			s="tempo";
			sn=s;
		}else if(txt.substr(0,4)=="kala"){
			s="kala";
			sn=s;
		}else if(txt.substr(0,1)=="g" || txt.substr(0,1)=="[" || txt.substr(0,1)=="]" || txt.substr(0,1)=="{" || txt.substr(0,1)=="}" || txt.substr(0,1)=="."
			|| txt.substr(0,1)=="_"){
			s=txt.substr(0,1);
			sn=s;
		}else if(isNumeric(txt.substr(0,1))){
			var l=1;
			while(isNumeric(txt.substr(0,l+1)) && l<txt.length){
				l+=1;
			}
			s=txt.substr(0,l);
			sn=s;
		}else{
			for(var i=0;i<syllables.length;i++){
				if(txt.length>=syllables[i].name.length && syllables[i].name.length>sn.length && syllables[i].name==txt.substring(0,syllables[i].name.length)){
					s=syllables[i];
					sn=s.name;
				}
			}
		}
		if(s!=""){
			ns.push(s);
		}
		console.log(txt);
		analyze(txt.slice(Math.max(sn.length,1)),ns);
	}
}

function playMusic(ns){
	var delay=0
	for(var i=0;i<ns.length;i++){
		if(ns[i]=="tempo" || ns[i]=="kala"){
			if(i+1<ns.length && isNumeric(ns[i+1])){
				changeTempo(ns[i+1])
				i++;
			}
		}else if(ns[i]=="g"){
			if(i+1<ns.length && isNumeric(ns[i+1])){
				changeGati(ns[i+1])
				i++;
			}
		}else if(ns[i]=="[" || ns[i]=="}"){
			changeTempo(kala*2);
		}else if(ns[i]=="]" || ns[i]=="{"){
			changeTempo(kala/2);
		}else{
			console.log("to play "+ns[i].name+" on "+delay);
			if(ns[i]!="." && ns[i]!="_"){
				setTimeout(playSyllable,delay,ns[i]);
			}
			delay=delay+1000*(60/kala)/gati;
		}
	}
	setTimeout(function(){
		notePlayedDiv.style.visibility="hidden";
	},delay+1000*(kala/60)/gati)
}

function changeTempo(t){
	kala=t;
}

function changeGati(g){
	gati=g;
}

function playSyllable(s){
	var h=s.sounds[Math.floor(Math.random()*s.sounds.length)];
	playSound(h);
	console.log("playing "+s.name);
	notePlayed.innerHTML=s.name;
}

function playSound(h){
	h.play();
}

function syllable(txt,sounds){
	this.txt=txt;
}

function isNumeric(str) {			//function from https://stackoverflow.com/a/175787
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function playVoice(n){
	for(var i=0;i<syllables.length;i++){
		if(n==syllables[i].name){
			console.log("playing "+syllables[i].name);
			playSound(syllables[i].voice);
			break;
		}
	}
}