// You could have multiple flags like: start, launch to indicate the state of the game.

const { Engine, World, Bodies, Body, Mouse, MouseConstraint, Constraint, Composite, Detector } = Matter;
// The above line creates different constant variables for Engine, World, Bodies etc.
var engine,world;
/*

const {Engine} = Matter 
is the same as 
const Engine = Matter.Engine

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
*/
var ground, ball;
var bomb;
var constraint;


function preload(){
    bomb = loadImage('assets/canonBall.png');
}

function setup() {
    // Setup the canvas, the ground the, tanker, the shooting ball and the bubble balls.
    createCanvas(600,400);
    background("lightblue")
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(width/2,height-10,width,20);
    shooter = new Shooter(100,370,100,20);
    tanker = new Tanker(100,370,100,20);
    ball = new Ball(200,200,15);
    constraint = new ShootBall(ball.body,{x: 100,y: 100});
    b1 = new Block(500,100);
    b2 = new Block(510,200);
    b3 = new Block(490,250);
    b4 = new Block(500,300);
}

function draw() {
// Remember to update the Matter Engine and set the background.
    background(255);
    Engine.update(engine);
    if(!(constraint.sling.bodyA)){
        ball.display();
    }
    shooter.display();
    noStroke();
    fill(255);
    rect(10,305,80,75);
    ground.display();
    tanker.display();
    constraint.display();
    b1.display();
    b2.display();    
    b3.display();
    b4.display();
    if(constraint.sling.bodyA){
        ball.body.position = {
            x: 80, y: 360
        };
    }
    
    if(shooter.body.angle == 0){
        constraint.sling.pointB = {
            x: 500, y: 270
        };
        
    } else if(shooter.body.angle == -30){
        constraint.sling.pointB = {
            x: 400, y: 100
        };
    } else if(shooter.body.angle == -60){
        constraint.sling.pointB = {
            x: 200, y: 50
        };
    } else if(shooter.body.angle == -90){
        constraint.sling.pointB = {
            x: 100, y: 50
        };
    }
    textFont("ariel");
    textSize(20);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Use UP and DOWN arrow keys to adjust tanker", 300,50);
    text("Space to Shoot", 300,80);
    constraint.attach(ball.body);
    //line(ball.body.position.x,ball.body.position.y,constraint.sling.pointB.x, constraint.sling.pointB.y);

}

function keyPressed() {
    angleMode(DEGREES)
    if(keyCode === UP_ARROW && shooter.body.angle>-70){
        shooter.body.angle=shooter.body.angle-30;
    } else
    if(keyCode === DOWN_ARROW && shooter.body.angle<0){
        shooter.body.angle=shooter.body.angle+30;
    }
    if(keyCode === 32){
        constraint.shoot();
    }
    
}

function keyReleased() {
    // Call the shoot method for the cannon.
    
}

/*function mouseDragged() {
    // Control the Ball with the mouse.
    if(mouseX<ball.body.position.x+100 && mouseY<ball.body.position.y+100){
        ball.body.position.x = mouseX;
        ball.body.position.y = mouseY;
    }
}

function mouseReleased() {
    constraint.shoot();
}*/