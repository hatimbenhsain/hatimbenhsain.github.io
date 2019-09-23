var userInput;
var searchUrl="http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=";
var contentUrl="https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=";
var people={};
var names=[];

function setup(){
	noCanvas();
	userInput=select('#nameSearch');
	userInput.changed(goWiki);
	//goWiki();

	function goWiki(){
		let term=userInput.value();
		//console.log(term);
		let url=searchUrl + term;
		loadJSON(url, gotData, 'jsonp');
	}
}

function gotData(data){
	console.log(data.query.search[0].title);
	names.push(data.query.search[0].title);
	people[names[names.length-1]]=new Person();
	var title=data.query.search[0].title.replace(/\s+/g,'_');
	var url=contentUrl+title;
	loadJSON(url,gotContent,'jsonp');
}

function gotContent(data){
	// var page=data.query.pages;
	// var pageID=Object.keys(data.query.pages)[0];
	// //console.log(data.query.pages);
	// var content=page[pageID].revisions[0]['*'];
	var p=people[names[names.length-1]];
	var content=data.parse.text['*'];
	var temp;
	temp=content.search("bday");
	p.birthDate=content.slice(temp+6,temp+16);
	console.log(p.birthDate);
	temp=content.search("srcset");
	p.imgUrl=content.slice(temp+10,content.length);
	temp=p.imgUrl.search(" ");
	p.imgUrl=p.imgUrl.slice(0,temp);
	console.log("http://"+p.imgUrl);
	//console.log(temp);
	createImg(p.imgUrl);
}

class Person{
	constructor(name){
		//this.name=name;
		this.birthDate="";
		this.imgUrl="";
	}
}