var userInput;
var searchUrl="http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=";
var contentUrl="https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=";
var url2 = "https://en.wikipedia.org/w/api.php"; 
var people={};
var names=[];

function setup(){
	noCanvas();
	userInput=select('#nameSearch');
	userInput.changed(goWiki);
	//goWiki();
	var params = {
	    action: "query",
	    list: "search",
	    srsearch: "Nelson Mandela",
	    format: "json"
	};
	function goWiki(){
		let term=userInput.value();
		params["srsearch"]=userInput.value();
		//console.log(term);
		let url=searchUrl + term;
		url2 = url2 + "?origin=*";
		Object.keys(params).forEach(function(key){url2 += "&" + key + "=" + params[key];});
		loadJSON(url, gotData, 'jsonp');
	}
}

function gotData(data){
	fetch(url2)
    .then(function(response){return response.json();})
    .then(function(response){console.log(response.query.search[0].title);});
	
	// names.push(data.query.search[0].title);
	// people[names[names.length-1]]=new Person();
	// var title=data.query.search[0].title.replace(/\s+/g,'_');
	// var url=contentUrl+title;
	// loadJSON(url,gotContent,'jsonp');
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