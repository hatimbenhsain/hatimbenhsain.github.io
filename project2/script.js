let popup=document.getElementById('popup')
let main=document.getElementById('main')
let pictures=document.getElementsByClassName('things')
let ending1=document.getElementById('ending1')
let ending2=document.getElementById('ending2')
let ending3=document.getElementById('ending3')
let endings=[ending1,ending2,ending3]
let endingsPlayed=0
let randomNumber=0
let block1=document.getElementById('img1')
let block2=document.getElementById('img2')
let block3=document.getElementById('img3')
let block4=document.getElementById('img4')
let blocks=[block1,block2,block3,block4]
let k=1
let timesPlayed=0
let endingPercents=[60,30,10]
let clicks=[0,0,0,0]
let soundSample=new Howl({
	src:['sampleSound.wav'],
	onend:function(){checkingEnding()},
})

let beachScene1=new Howl({
	src:['beachScene1.ogg'],
	onend:function(){checkingEnding()},
})
let beachScene2=new Howl({
	src:['beachScene2.ogg'],
	onend:function(){checkingEnding()},
})

let dogDeath=new Howl({
	src:['dogDeath.ogg'],
	onend:function(){if(timesPlayed==4){location.reload()}},
})
let cafeScene1=new Howl({
	src:['Cafe1COMPLETE.ogg'],
	onend:function(){checkingEnding()},
})
let cafeScene2=new Howl({
	src:['Cafe2COMPLETE.ogg'],
	onend:function(){checkingEnding()},
})
let parkScene1=new Howl({
	src:['DogInPark1COMPLETE.ogg'],
	onend:function(){checkingEnding()},
})
let parkScene2=new Howl({
	src:['DogInPark2COMPLETE.ogg'],
	onend:function(){checkingEnding()},
})
let fishMarketScene1=new Howl({
	src:['FishMarketCOMPLETE1.ogg'],
	onend:function(){checkingEnding()},
})
let fishMarketScene2=new Howl({
	src:['FishMarket2COMPLETE.ogg'],
	onend:function(){checkingEnding()},
})
let opening=new Howl({
	src:['DialogueOpening.wav'],
	loop:true,
	onend:function(){checkingEnding()},
})
let endingScene2=new Howl({
	src:['ENDING2.ogg'],
	onend:function(){if(timesPlayed==4){location.reload()}},
})

let EndingScene1=new Howl({
	src:['EndingScene1.ogg'],
	onend:function(){if(timesPlayed==4){location.reload()}},
})
let introSound=opening
let sound11=fishMarketScene1
let sound12=fishMarketScene2
let sound21=parkScene1
let sound22=parkScene2
let sound31=cafeScene1
let sound32=cafeScene2
let sound41=beachScene1
let sound42=beachScene2
let sounds1=[sound11,sound21,sound31,sound41]
let sounds2=[sound12,sound22,sound32,sound42]
let endSound1=dogDeath
let endSound2=endingScene2
let endSound3=EndingScene1
let endSounds=[endSound1,endSound2,endSound3]
let allSounds=sounds1.concat(sounds2.concat(endSounds.concat([opening])))

// console.log(popup)
//popup.addEventListener("click",fadeOut(main,popup))
// block1.addEventListener("click",clickingPic(block1))
// block2.addEventListener("click",clickingPic(block2))
// block3.addEventListener("click",clickingPic(block3))
// block4.addEventListener("click",clickingPic(block4))

popup.style.opacity=1
main.style.opacity=0
introSound.play()
function fadeOut(screenOut,screenIn){
	for (s in allSounds){
	allSounds[s].fade(1,0,500)
	allSounds[s].stop()
	}
	console.log(screenOut.style.opacity)
	if (screenOut.style.opacity>=1){
		screenOut.style.opacity=1
		k=1
		console.log(screenIn)
		screenIn.style.visibility="visible"
		for (i in [0,1,2,3,4,5,6,7,8,9]){
			setTimeout(function(){
				k+=1
				screenOut.style.opacity=1-k*0.1
				screenIn.style.opacity=k*0.1
		},100*i)}
		setTimeout(function(){screenOut.style.visibility='hidden'},1000)
	}
}
function change(block){
	if ((clicks[blocks.indexOf(block)]<2)&&(clicks[0]+clicks[1]+clicks[2]+clicks[3])<(timesPlayed+1)*2) {
		for (s in allSounds){
			allSounds[s].fade(1,0,500)
			allSounds[s].stop()
		}
		if (clicks[blocks.indexOf(block)]==1){
			block.style.opacity=0.5
			sounds2[blocks.indexOf(block)].play()
		}else{
			sounds1[blocks.indexOf(block)].play()
		}
		clicks[blocks.indexOf(block)]+=1
	}
}
function checkingEnding(){
	console.log('ok')
	if ((clicks[0]+clicks[1]+clicks[2]+clicks[3])==(timesPlayed+1)*2){
		console.log('ye')
		randomNumber=Math.random()
		if (randomNumber<0.6){
			fadeOut(main,endings[0])
			console.log(endings[0])
			endSounds[0].play()
		} else if (randomNumber<0.9) {
			fadeOut(main,endings[1])
			console.log(endings[1])
			endSounds[1].play()
		} else {
			fadeOut(main,endings[2])
			console.log(endings[2])
			endSounds[2].play()
		}
		for (i in [0,1]){endings.unshift(endings.pop());endSounds.unshift(endSounds.pop())}
		timesPlayed+=1
	}
}
