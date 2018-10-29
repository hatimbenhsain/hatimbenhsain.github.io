	let Y_AXIS=1
	let X_AXIS=2
	let b1, b2, c1, c2;
	let upperX=0
	let upperY=0
	let	dsWidth=0
	let dsHeight=0
	let maxDSWidtch=1000
	let angle=0
	let k=0
	let yeah=0
	let up=document.getElementById('up')
	let bottom=document.getElementById('bottom')
	let test=''
	let bottomFinalHeight=40
	let bottomFinalTop=54
	let bottomInitialTop=94
	let bg=0
	let width=0
	let leftX=0
	let screenUpWidth=0
	let screenUpHeight=0
	let screenBottomWidth=0
	let screenBottomHeight=0
	let bottomY=0
	let middleY=0
	let sideWidth=0
	let dPadWidth=0
	let dPadWidthMax=144
	let dPadFat=50
	let dPadLength=0
	let dPadUp=0
	let dPadBottom=0
	let selected=0
	let project1=document.getElementById('project1')
	let project2=document.getElementById('project2')
	let project3=document.getElementById('project3')
	let project4=document.getElementById('project4')
	let project5=document.getElementById('project5')
	let project6=document.getElementById('project6')
	let des1=document.getElementById('des1')
	let des2=document.getElementById('des2')
	let des3=document.getElementById('des3')
	let des4=document.getElementById('des4')
	let des5=document.getElementById('des5')
	let des6=document.getElementById('des6')
	let projects=[project1,project2,project3,project4,project5,project6]
	let dess=[des1,des2,des3,des4,des5,des6]
	let links=['./project1/index.html','./project2/index.html','./project3/comic.html','./project4/index.html','./project5/index.html','./goOut/index.html']
	let gradient=0
	let r=0
	let y=0
	let b=0

function Closed(){
	this.setup=function(){
		bg=loadImage("stars.gif")
		gradient=loadImage('gradient.png')
		createCanvas(windowWidth,windowHeight)
		fullscreen(true)
		upperY=windowHeight*0.52
		upperX=(windowWidth-dsWidth)/2
		bottom.style.top=(bottomInitialTop*windowHeight/100).toString()+'px'
		bottom.style.height='0px'
		r=color('#cc7083')
		y=color('#cacc70')
		b=color('#aaaaaa')
	}
	this.draw=function(){
		screenUpHeight=windowHeight*0.4
		screenBottomHeight=windowHeight*0.4
		dsHeight=windowHeight*0.44
		bottomY=windowHeight*0.51
		middleY=windowHeight*0.45
		if (windowWidth>800){
			screenBottomWidth=520
			screenUpWidth=600
		}else{
			screenBottomWidth=0.65*windowWidth
			screenUpWidth=0.75*windowWidth
		}
		sideWidth=(dsWidth-screenBottomWidth)/2
		dPadWidth=sideWidth*3/5
		leftX=(windowWidth-dsWidth)/2
		noCanvas()
		createCanvas(windowWidth,windowHeight)
		if (windowWidth<maxDSWidtch){
			dsWidth=windowWidth*0.96
		}else{
			dsWidth=maxDSWidtch
		}
		
		fill('gray')
		rect(leftX,bottomY,dsWidth,dsHeight,0,0,10,10)
		b1=color('#aaaaaa')
		b2=color('#727272')
		setGradient(leftX,bottomY,dsWidth,dsHeight,b1,b2,Y_AXIS)
		fill(b1)
		rect(leftX,middleY,dsWidth,windowHeight*0.06,0,0,0,0)
		setGradient(leftX,middleY,dsWidth,windowHeight*0.06,b1,b2,Y_AXIS)
		rect(leftX,middleY,dsWidth*0.041,windowHeight*0.06,0,0,0,0)
		rect(leftX+dsWidth*(1-0.041),middleY,dsWidth*0.041,windowHeight*0.06,0,0,0,0)
		width=6*dsWidth/20-Number(bottom.style.height.slice(0,-2))/2
		//rect(leftX+((dsWidth)-800)/4,windowHeight*0.51+(dsHeight/2-width/2),100,width/3)
		fill(b1)
		stroke('#686868')
		strokeWeight(6)
		if (windowWidth>800){
			fill('#7094cc')
			rect(leftX+sideWidth/5,bottomY+(dsHeight-dPadFat)/2,dPadWidth/3,dPadFat)
			fill('#70cc7f')
			rect(leftX+sideWidth/5+(dPadWidth-dPadFat)/2+dPadFat,bottomY+(dsHeight-dPadFat)/2,dPadWidth/3,dPadFat)
			}
		
		fill(r)
		dPadUp=rect(leftX+sideWidth/5+(dPadWidth-dPadFat)/2,bottomY+(dsHeight-dPadWidthMax)/2,dPadFat,dPadWidthMax/3)
		fill(y)
		dPadBottom=rect(leftX+sideWidth/5+(dPadWidth-dPadFat)/2,bottomY+(dsHeight-dPadFat)/2+dPadFat,dPadFat,dPadWidthMax/3)
		fill(b)
		ellipse(leftX+dsWidth-sideWidth/2,bottomY+dsHeight/2,100,100)
		dPadUp
		dPadBottom
		fill('gray')
		let bigRect=rect(upperX,upperY,dsWidth,dsHeight,angle,angle,10-angle,10-angle)
		bigRect
		setGradient(upperX,upperY,dsWidth,dsHeight,b1,b2,Y_AXIS)
		let d1=dist(mouseX,mouseY,leftX+sideWidth/5+(dPadWidth-dPadFat)/2+dPadWidth/6,bottomY+(dsHeight-dPadFat)/2-dPadFat/4)
		let d2=dist(mouseX,mouseY,leftX+sideWidth/5+(dPadWidth-dPadFat)/2+dPadFat/2,bottomY+(dsHeight-dPadFat)/2+dPadFat+dPadWidthMax/6)
		let d3=dist(mouseX,mouseY,leftX+dsWidth-sideWidth/2,bottomY+dsHeight/2)
		if ((d1<dPadWidthMax/5)||(d2<dPadWidthMax/6)||(d3<100/2)){
			cursor(HAND)
		}else{
			cursor(ARROW)
		}
		if (d1<dPadWidthMax/5){
			r='#ff214e'
		}else{
			r='#cc7083'
		}
		if (d2<dPadWidthMax/6){
			y='#f1f44e'
		}else{
			y='#cacc70'
		}
		if(d3<100/2){
			b='white'
		}else{
			b='#aaaaaa'
		}
		
		this.open()
	}
	this.open=function(){
		if ((upperY>windowHeight*0.02) && (yeah==0))
		{
			upperY-=windowHeight*0.01
			upperX=leftX
			angle+=10/60
			if (Number(bottom.style.top.slice(0,-2))*100/windowHeight>bottomFinalTop){
			bottom.style.top=(upperY+windowHeight*0.47).toString()+'px'
			bottom.style.height=((bottomInitialTop*windowHeight/100)-(upperY+windowHeight*0.47)).toString()+'px'
			}
			else
			{
				bottom.style.top=(bottomFinalTop*windowHeight/100)+'px'
				bottom.style.height=(bottomFinalHeight*windowHeight/100)+'px'
			}	
		}
		else
		{
			upperY=windowHeight*0.02
			upperX=leftX
			angle=10
			yeah=1
			up.style.top=(windowHeight*0.06).toString()+"px"
			up.style.opacity='1'
		}
	}
}
Closed()
function mousePressed(){
		let d1=dist(mouseX,mouseY,leftX+sideWidth/5+(dPadWidth-dPadFat)/2+dPadWidth/6,bottomY+(dsHeight-dPadFat)/2-dPadFat/4)
		print(d1)
		if (d1<dPadWidthMax/5){
			print('ok')
			if (k>0){
				k-=1
				projects[k].className='selected'
				projects[k+1].className='project'
				dess[k].className='des'
				dess[k+1].className='desHidden'
			}
			bottom.scrollBy(0,-100)

		}
		let d2=dist(mouseX,mouseY,leftX+sideWidth/5+(dPadWidth-dPadFat)/2+dPadFat/2,bottomY+(dsHeight-dPadFat)/2+dPadFat+dPadWidthMax/6)
		if(d2<dPadWidthMax/6){
			print('cool')
			if (k<5){
				k+=1
				projects[k].className='selected'
				projects[k-1].className='project'
				dess[k].className='des'
				dess[k-1].className='desHidden'
			}
			bottom.scrollBy(0,100)
		}
		let d3=dist(mouseX,mouseY,leftX+dsWidth-sideWidth/2,bottomY+dsHeight/2)
		if (d3<100/2){
			window.location.href=links[k]
		}
}
function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}