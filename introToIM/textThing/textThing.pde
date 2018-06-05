String[] lePetitPrince;
String[] noWords={"et","est","a","le","la","les","un","une","des","de","du","au","aux",".",",","'","\"",":",";","!","?","sur",
"qui",
"?a",
"ils",
"ne",
"?",
"Il",
"comme",
"je",
"si",
"pas",
"que",
"Les",
"C'est",
"c'est",
"pour",
"Et",
"Je",
"me",
"elle",
"Mais",
"bien",
"-",
"en",
"tu",
"Tu",
"ce",
"dans",
"?a",
"plus",
"?",
"il",
"Le",
"se",
"?a",
"tout",
"J'ai",
"?",
"avec",
"etait",
"Elles",
"par",
"rien",
"toutes",
"tres",
"ma",
"lui",
"sa",
"suis",
"vous",
"fait",
"n'est",
"d'un",
"qu'il",
"sont",
"son",
"te",
"avait",
"dit",
"j'ai",
"fois,",
"?a",
"On",
"leur",
"?",
"mon",
"ou",
"y",
"Ce",
"cette",
"l?",
"puis",
"Chapitre",
"La"};
String[] existingWords={"et"};
String[] lesMots={"nice"};
int[] times={1};
String[] temp;
Boolean no=false;
int i=0;
Boolean x=false;
int m=0;
int n=0;

void setup(){
	lePetitPrince=loadStrings("lePetitPrince.txt");
	for (String l:lePetitPrince){
		temp=splitTokens(l," ");
		for (String m:temp){
			for (String k:noWords){
				if (k==m){
					x=true;
				}
			}
			if (x==false){
				lesMots=append(lesMots,m);
			}else{
				x=false;
			}
		}
	}
	x=false;
	for (String m:lesMots){
		no=false;
		for (String n:noWords){
			if (m.equals(n) || m.equals("?") || m.equals("?a")){
				no=true;
				break;
			}
		}
		if(no==false){
			i=0;
			for (String k:existingWords){
				if (k.equals(m) || k.equals(m+"s") || (k+"s").equals(m) || k.equals(m+".")|| k.equals(m+",") || (k+",").equals(m) || (k+".").equals(m)){
					x=true;
					break;
				}
				i++;
			}
			if (x==false){
				existingWords=append(existingWords,m);
				times=append(times,1);
			}else{
				times[i]++;
				x=false;
			}
		}
	}
	i=0;
	for (int t:times){
		if (t>15){
			m+=1;
			println("\""+existingWords[i]+"\",");
			println(t);
		}
		i++;
	}
	i=0;
	fullScreen();
	background(0);
}
void draw(){
	i=0;
	for (int t:times){
		if (t>15){
			textSize(map(t,0,80,0,100));
			fill(255);
			stroke(255);
			text(existingWords[i],map(n,0,m,0,width-1000),random(0,height));
			n++;
		}
		i++;
	}
}