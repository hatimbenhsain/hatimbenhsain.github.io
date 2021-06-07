fileNames=[];
syllables=[];

kala=60;	//tempo
gati=4;		//akshara per beat

$(document).ready(function () 
{
    $.get("./sounds/", function(data) 
    {
        $("#fileNames").append(data);
        //console.log(data);
        GetFileNames(data);
        GetSyllables();
        console.log(syllables);
    });
})

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
		for(var i=0;i<syllables.length;i++){
			if(syllables[i].name==sn){
				syllables[i].sounds.push("sounds/"+s+".mp3");
				added=true;
				break;
			}
		}
		if(!added){
			syllables.push({
				name:s.substr(0,s.length-1),
				sounds:["sounds/"+s+".mp3"]
			});
			AddButton(sn);
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
		for(var i=0;i<syllables.length;i++){
			if(txt.length>=syllables[i].name.length && syllables[i].name.length>s.length && syllables[i].name==txt.substring(0,syllables[i].name.length)){
				s=syllables[i];
				sn=s.name;
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
		var fn=ns[i].sounds[Math.floor(Math.random()*ns[i].sounds.length)];
		var t=delay+i*1000*(kala/60)/gati;
		console.log("to play "+fn+" on "+t);
		setTimeout(playSound,t,fn);
	}
	setTimeout(function(){
		notePlayedDiv.style.visibility="hidden";
	},delay+ns.length*1000*(kala/60)/gati)
}

function playSound(fn){
	var audio=new Audio(fn);
	audio.play();
	console.log("playing "+fn);
	notePlayed.innerHTML=fn.slice(7,-5);
}

function syllable(txt,sounds){
	this.txt=txt;
	get
}