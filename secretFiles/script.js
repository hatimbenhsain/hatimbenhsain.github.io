var userInput;
var searchUrl="https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=";
var contentUrl="https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=";
var url2 = "https://en.wikipedia.org/w/api.php"; 
var comicVineApiKey="e53dc1a04c86be39ff9f46200660a77c749a0c5a";
var superHeroUrl="https://www.superheroapi.com/api.php/10217797341077162/";
var comicVineUrl="https://comicvine.gamespot.com/api/characters/?api_key=e53dc1a04c86be39ff9f46200660a77c749a0c5a&format=json&filter=name:";
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
		loadJSON(url2, gotData, 'jsonp');
	}
}

function gotData(data){
	fetch(url2)
    .then(function(response){return response.json();})
    .then(function(response){console.log(response.query.search[0].title);
    	names.push(response.query.search[0].title);
		people[names[names.length-1]]=new Person(names[names.length-1]);
		var title=response.query.search[0].title.replace(/\s+/g,'_');
		var url=contentUrl+title;
		loadJSON(url,gotContent,'jsonp');
	});

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

	console.log("https://"+p.imgUrl);
	var img=document.createElement("img");
	img.src="https://"+p.imgUrl;
	document.body.appendChild(img);

	p.id=data.parse.pageid;
	p.heroName="";
	p.getHero();

}

class Person{
	constructor(name){
		//this.name=name;
		this.birthDate="";
		this.imgUrl="";
		this.id=0;
		this.heroName="";
		this.name=name;
		this.powers=[];
	}

	getHero(){
		var tempId=this.id%732;
		var tempUrl=superHeroUrl+tempId;
		var tempName;
		var p=this;
		fetch(tempUrl)
		.then(function(response){return response.json();})
		.then(function(response){
			tempName=response.name;
			p.heroName=tempName;
			console.log(p.heroName);
			p.getHeroData();
		});

	}

	getHeroData(){
		var tempUrl=comicVineUrl+this.heroName;
		console.log(tempUrl);
		var powers;
		var p=this;
		fetch(tempUrl)
		.then(function(response){
			console.log(response);
			return response;})
		.then(function(response){
			tempUrl=response.results[0].api_detail_url;
			tempUrl=tempUrl+"?api_key="+comicVineApiKey+"&format=json";
			fetch(tempUrl)
			.then(function(response){return response.json();})
			.then(function(response){
				powers=response.results.powers;
			});
			p.powers=powers;
			console.log(p.powers);
		});
	}


}