//pobieramy element na podstawie identyfikatora
var canvas = document.getElementById('particles');
//pobieramy kontekst - sposób rysowania
var ctx = canvas.getContext('2d');
//określamy stałe
var W = canvas.width=window.innerWidth;
var H = canvas.height=window.innerHeight;
//stworzenie pustej tablicy, która zostanie wypełniona kuleczkami
var circles = [];
var midPointX = W/2;
var midPointY = H/2;
//grawitacja
var velocityX = 0;
var velocityY = 0.1;

function Ball(ctx){
    //tworzenie nowej kuleczki
    this.create = function(){
        //poczatkowa srednica
        this.radius = 2+Math.random()*3;
        //położenie początkowe
        this.x = midPointX; //położenie w osi X;
        this.y = midPointY; //położenie w osi Y;
        //prędkość
        this.vx = 10*(Math.random()-0.5);
        this.vy = 10*(Math.random()-0.5);
        //przyspieszenie
        this.ax = (Math.random())*(velocityX);
        this.ay = (Math.random())*(velocityY);
        //kolory
        this.red = Math.round(Math.random())*255;
        this.green = Math.round(Math.random())*255;
        this.blue = Math.round(Math.random())*255;
    };
    //rysowanie kuleczki
    this.draw = function(){
        ctx.fillStyle = "rgba("+this.red+","+this.green+","+this.blue+",0.5)";
        ctx.beginPath();//kładzie pędzel
        ctx.arc(this.x, //wspolrzedne poczatkowe kulki w osi x
            this.y,
            this.radius,//srednica kulki
            0,//poczatkowa wartosc kata
            Math.PI*2,//koncowa wart kata
            false//opcjonalnie, czy  w kierunku wskazowek zegara
        );
        ctx.closePath();//odlozenie pedzla
        ctx.fill();
    }
    this.move = function(){
        //zmiana polozenia - predkosc
        this.x +=this.vx; //zmiana predkosc w osi x
        this.y +=this.vy;
        //zmiana polozenia - przyspieszenie
        this.vx +=this.ax;//zmiana przyspieszenia w osi x
        this.vy +=this.ay;

        //zmiana promienia kuleczki
        this.radius -= 0.01;

    }
}

//zapelnienie tablicy kuleczkami
for(var i=0; i<100; i++){
    var ball = new Ball(ctx);//nowa instancja klasy ball
    ball.create();
    circles.push(ball);//zapisanie kuleczki do tablicy

}

function drawFrame(){
    ctx.fillStyle = "rgba(255,255,255, 0.1)";
    ctx.fillRect(0, 0, W, H);//tworzymy płótno
    circles.forEach(function(circles){
        if(circles.radius > 0 && circles.x <= W && circles.x >= 0 && circles.y <= H && circles.y >=0){
            circles.draw();
            circles.move();
        }else{
            circles.create();
        }
    })

}

setInterval(drawFrame, 1000/60.0);