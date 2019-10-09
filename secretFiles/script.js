var userInput;
var searchUrl="https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=";
var contentUrl="https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=";
var url2 = "https://en.wikipedia.org/w/api.php"; 
var comicVineApiKey="e53dc1a04c86be39ff9f46200660a77c749a0c5a";
var superHeroUrl="https://www.superheroapi.com/api.php/10217797341077162/";
var comicVineUrl="https://comicvine.gamespot.com/api/characters/?api_key=e53dc1a04c86be39ff9f46200660a77c749a0c5a&format=json&filter=name:";
var people={};
var names=[];
var powers=[];

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
		disappear(userInput);
		setTimeout(function(){appear(select("#loading"))},1000);
		console.log(url2);
		loadJSON(url2, gotData, 'jsonp');
	}
}

function disappear(object){
	object.style('transition','opacity ease-in-out 1s');
	object.style('opacity', '0');
	setTimeout(function(){object.style('display','none');},1000);
}

function appear(object){
	object.style('display','block');
	object.style('transition','opacity ease-in-out 1s');
	object.style('opacity', '1');
}

function gotData(data){
	fetch(url2)
    .then(function(response){return response.json();})
    .then(function(response){
    	if(response.query.search[0]!=null){
	    	console.log(response.query.search[0].title);
	    	names.push(response.query.search[0].title);
			people[names[names.length-1]]=new Person(names[names.length-1]);
			var title=response.query.search[0].title.replace(/\s+/g,'_');
			var url=contentUrl+title;
			console.log(url);
			loadJSON(url,gotContent,'jsonp');
		}else{
			disappear(select("#loading"));
			appear(select('#errorScreen'));
		}
	});

}

function gotContent(data){

	var p=people[names[names.length-1]];
	var content=data.parse.text['*'];
	var temp;
	temp=content.search("bday");
	if(temp!=-1) {p.birthDate=content.slice(temp+6,temp+16)}
	else {p.birthDate="unknown"};
	console.log(p.birthDate);
	temp=content.slice(582,content.length).search("srcset")+582;
	p.imgUrl=content.slice(temp+10,content.length);
	temp=p.imgUrl.search(" ");
	p.imgUrl=p.imgUrl.slice(0,temp);

	console.log("https://"+p.imgUrl);

	p.id=data.parse.pageid;
	p.heroName="";
	var tempId=p.id%732;
	var tempUrl=superHeroUrl+tempId;
	var tempName;
	fetch(tempUrl)
		.then(function(response){return response.json();})
		.then(function(response){
			tempName=response.name;
			p.heroName=tempName;
			console.log(p.heroName);
			tempUrl=comicVineUrl+p.heroName;
			var comicContent;
			console.log(tempUrl);
			fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(tempUrl)}`)
				.then(response => {
					if (response.ok) return response.json()
					throw new Error('Network response was not ok.')
				})
				.then(data => {
					comicContent=data.contents;
					var in1=comicContent.search("api_detail_url");
					comicContent=comicContent.slice(in1,comicContent.length);
					in1=comicContent.search(",");
					comicContent=comicContent.slice(17,in1-1);
					comicContent=comicContent.replace(/\\/g,'');
					tempUrl=comicContent+"?api_key="+comicVineApiKey+"&format=json";
					if(comicContent==""){
						console.log("empty");
						everythingLoaded(p);
					}else{
						fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(tempUrl)}`)
							.then(response => {
								if (response.ok) return response.json()
								throw new Error('Network response was not ok.')
							})
							.then(data=>{
								comicContent=data.contents;
								console.log(comicContent);
								in1=comicContent.search("number_of_page_results");
								//if(comi)
								in1=comicContent.search("\"powers\"");
								comicContent=comicContent.slice(in1,comicContent.length);
								in1=comicContent.search("\]");
								comicContent=comicContent.slice(0,in1);
								in1=comicContent.search("name");
								while(in1!=-1){
									comicContent=comicContent.slice(in1+7,comicContent.length);
									in1=comicContent.search("\"");
									powers.push(comicContent.slice(0,in1));
									in1=comicContent.search("name");
								}
								console.log(powers);
								everythingLoaded(p);
							});
					}
				});
	});
}

function everythingLoaded(p){
	disappear(select("#loading"));
	var img=document.createElement("img");
	img.src="https://"+p.imgUrl;
	var nameInfo=document.createElement("p");
	var birthInfo=document.createElement("p");

	birthInfo.appendChild(document.createTextNode(p.birthDate.toUpperCase()));
	nameInfo.appendChild(document.createTextNode(p.name.toUpperCase()));
	document.getElementById('name').appendChild(nameInfo);
	document.getElementById('birth').appendChild(birthInfo);

	for(var i=0;i<powers.length;i++){
		var abilitiesInfo=document.createElement("p");
		abilitiesInfo.appendChild(document.createTextNode(powers[i].toUpperCase()));
		document.getElementById('abilities').appendChild(abilitiesInfo);
	}

	if(powers.length==0){
		var abilitiesInfo=document.createElement("p");
		abilitiesInfo.appendChild(document.createTextNode("NONE"));
		document.getElementById('abilities').appendChild(abilitiesInfo);
	}

	setTimeout(function(){
		document.getElementById("img").appendChild(img);
		appear(select('#myText'));
		setTimeout(function(){if(document.getElementById('theText').clientHeight>height){
			console.log("too long");
			var h=document.getElementById('theText').clientHeight-height*7;
			h=h.toString();
			document.getElementById("name").style.paddingTop=h+'px';}},2000);
	},1000);
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
		// fetch(tempUrl)
		// .then(function(response){
		// 	console.log(response);
		// 	return response;})
		// .then(function(response){
		// 	tempUrl=response.results[0].api_detail_url;
		// 	tempUrl="https://crossorigin.me/"+tempUrl+"?api_key="+comicVineApiKey+"&format=json";
		// 	fetch(tempUrl)
		// 	.then(function(response){return response.json();})
		// 	.then(function(response){
		// 		powers=response.results.powers;
		// 	});
		// 	p.powers=powers;
		// 	console.log(p.powers);
		// });


	}


}