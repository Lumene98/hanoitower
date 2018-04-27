var canvas = document.getElementById("drawer");
var ctx = canvas.getContext("2d");
var depth = 10;
var x;
var y;
var poleHeight = 300;
var poleWidth = 10;
var disc = 3;
var a, b, c;
var isStart = true;
var discBase = 10;
var save;
var saveCount = 0;
var countStep = 0;
$("#n_disc").keyup(function(event) {
	if(isStart){
		if (event.keyCode === 13) {
			if(($("#n_disc").val() < 3) || ($("#n_disc").val() > 20))
				alert("Numero dischi tra 3 e 20");
			else{
				disc = $("#n_disc").val();
				start();
			}

		}
	}
});
$("#start").click(function() {
	if(isStart){
		if(($("#n_disc").val() < 3) || ($("#n_disc").val() > 20)){
			alert("Numero dischi tra 3 e 20");
		}else{
			disc = $("#n_disc").val();
			start();
		}
	}
});

function start(){
	isStart = false;
	a = new Array(disc);
	b = new Array(disc);
	c = new Array(disc);
	for(var x = 0; x < disc; x++){
		a[x] = disc - x;
		b[x] = 0;
		c[x] = 0;
	}
	drawDiscs();
	save = new Array(Math.pow(2,disc)-2);
	tower("A", "C", "B", disc);
	$('#nextStep').css('visibility', 'visible');
	$('#nextStep').click(nextStep);
	isStart = true;
}

function drawBase() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.rect(canvas.width/5 - poleWidth, canvas.height - poleHeight, poleWidth, poleHeight);
	ctx.rect(canvas.width/2 - poleWidth, canvas.height - poleHeight, poleWidth, poleHeight);
	ctx.rect(canvas.width*4/5 - poleWidth, canvas.height - poleHeight, poleWidth, poleHeight);
	ctx.stroke();
	ctx.closePath();	
}

function drawDiscs(){
	//alert(a.join(' ') + "\n" + b.join(' ') + "\n" +  c.join(' '));
	drawBase();
	var width, x ,y;
	var base = discBase;
	x = canvas.width/5 - poleWidth;
	y = canvas.height - (a.length - 1)* 10;
	for(var z = a.length - 1; z >= 0; z--){
		if(!a[z] == 0){
			width = 10 + base + 5*(a[z] -1);
			ctx.beginPath();
			ctx.fillStyle = "#FF0000";
			ctx.rect(x - ((base +(5 * (a[z] -1)))/2), y - 10, width, 10);
			ctx.fillRect(x - ((base +(5 *(a[z] -1)))/2), y - 10, width, 10);
			ctx.stroke();
			ctx.closePath();
		}
		y += 10;
	}
	x = canvas.width/2 - poleWidth;
	y = canvas.height - (b.length - 1)* 10;
	for(var z = b.length - 1; z >= 0; z--){
		if(!b[z] == 0){
			width = 10 + base + 5*(b[z] -1);
			ctx.beginPath();
			ctx.fillStyle = "#FF0000";
			ctx.rect(x - ((base +(5 * (b[z] -1)))/2), y - 10, width, 10);
			ctx.fillRect(x - ((base +(5 *(b[z] -1)))/2), y - 10, width, 10);
			ctx.stroke();
			ctx.closePath();
		}
		y += 10;
	}
	x = canvas.width*4/5 - poleWidth;
	y = canvas.height - (c.length - 1)* 10;
	for(var z = c.length - 1; z >= 0; z--){
		if(!c[z] == 0){
			width = 10 + base + 5*(c[z] -1);
			ctx.beginPath();
			ctx.fillStyle = "#FF0000";
			ctx.rect(x - ((base +(5 * (c[z] -1)))/2), y - 10, width, 10);
			ctx.fillRect(x - ((base +(5 *(c[z] -1)))/2), y - 10, width, 10);
			ctx.stroke();
			ctx.closePath();
		}
		y += 10;
	}
}


function tower(sorg, dest, temp, n){
	if(n==1){
		saveStep(sorg,dest, n);
		return;
	}
	tower(sorg,temp,dest,n-1);
	//setTimeout(tower,1000,sorg,temp, dest, n-1);
	saveStep(sorg,dest, n);
	tower(temp,dest,sorg,n-1); 
	//setTimeout(tower,1000,temp,dest, sorg, n-1);
}

function move(sorg, dest, n){
	if(sorg == "A" && dest == "B"){
		b[emptySpot(b)] = a[find(a,n)];
		a[find(a,n)] = 0; 
	}
	else{
		if(sorg == "A" && dest == "C"){
			c[emptySpot(c)] = a[find(a,n)];
			a[find(a,n)] = 0; 
		}
		else{
			if(sorg == "B" && dest == "A"){
				a[emptySpot(a)] = b[find(b,n)];
				b[find(b,n)] = 0; 
			}
			else{
				if(sorg == "B" && dest == "C"){
					c[emptySpot(c)] = b[find(b,n)];
					b[find(b,n)] = 0; 
				}
				if(sorg == "C" && dest == "A"){
					a[emptySpot(a)] = c[find(c,n)];
					c[find(c,n)] = 0; 
				}
				else{
					if(sorg == "C" && dest == "B"){
						b[emptySpot(b)] = c[find(c,n)];
						c[find(c,n)] = 0; 
					}

				}
			}
		}
	}
	drawDiscs();
}

function emptySpot(vet){
	for (var i =  0; i < vet.length; i++) {
		if(vet[i] == 0) return i;
	}
	return 0;
}
function find(vet, n){
	for (var i =  0; i < vet.length; i++) {
		if(vet[i] == n) return i;
	}
	return 0;
}

function saveStep(sorg, dest, n){
	save[saveCount] = sorg;
	save[saveCount+1] = dest;
	save[saveCount+2] = n;
	saveCount += 3;
}

function nextStep(){
	if(countStep == saveCount){
		countStep = 0;
		saveCount = 0;
		$('#nextStep').css('visibility', 'hidden');
	}else{
		move(save[countStep],save[countStep+1],save[countStep+2]);
		countStep += 3;
	}
}