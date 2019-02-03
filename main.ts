const CANVAS_NAME = "starfield"
const STAR_NUMBER = 400;

class Star {
  private readonly color:string;
  private x:number;
  private y:number;
  private radius:number;
  private quarterOfScreen:number;
  private yMove:number;
  private xMove:number;
  private radiusScale:number;
  private modifier:number;

  constructor(
    private readonly context: CanvasRenderingContext2D){
      this.x = window.innerWidth*0.2 + Math.random()*(window.innerWidth * 0.6);
      this.y = window.innerHeight*0.2 + Math.random()*(window.innerHeight * 0.6);
      this.modifier = Math.abs(this.x - window.innerWidth/2) * 0.01;
      this.xMove = Math.random()*3;
      this.yMove = Math.random()*2.5;
      this.radiusScale = Math.random()*2;
      this.quarterOfScreen = this.selectQuarter();
      this.radius = 0.1;
      this.color = "white"
  }

  // selectQuarter defines the movement of the star
  //     |
  //   3 | 4
  // ---------
  //   2 | 1
  //     |
  //
  selectQuarter = () => {
    if(this.y > window.innerHeight / 2){
      if( this.x > window.innerWidth / 2){
        return 1;
      }
      else{
        return 2;
      }
    }
    else{
      if( this.x > window.innerWidth / 2){
        return 4;
      }
      else{
        return 3;
      }
    }
  };

  animate = () => {
    if( this.quarterOfScreen === 1 || this.quarterOfScreen === 4)
      this.x = this.x + this.xMove;
    else
      this.x = this.x - this.xMove;
      if( this.quarterOfScreen === 1 || this.quarterOfScreen === 2)
      this.y = this.y + this.yMove;
    else
    this.y = this.y - this.yMove;
    this.radius = this.radius + 0.005;
    this.modifier = Math.abs(this.x - window.innerWidth/2) * 0.0002;
    this.xMove = this.xMove + this.modifier;
    this.modifier = Math.abs(this.y - window.innerHeight/2) * 0.0001;
    this.yMove = this.yMove + this.modifier;
  }

  isOutside = () => {
    if ( this.x < 0 || this.y < 0 || this.x > window.innerWidth || this.y > window.innerHeight)
      return true;
  }

  draw = () => {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius + this.radiusScale, 0, 2 * Math.PI);
    this.context.fillStyle = this.color;
    this.context.fill();
  }

  erase = () => {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius + this.radiusScale+ 1, 0, 2 * Math.PI);
    this.context.fillStyle = 'black';
    this.context.fill();
  }
}



class Starfield {
  private starArray: Star[] = [];

  constructor(container: string, private readonly starNumber:number) {
    this.starNumber = starNumber;
    this.canvas = <HTMLCanvasElement>document.getElementById(container);
    this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    this.init();
  }
  
  populateStarArray = () => {
    for ( let i = 0; i < this.starNumber; i++ ){
      this.starArray.push( new Star(this.context))
    }
    for ( let i = 0; i < this.starNumber; i++ ){
      this.starArray[i].draw();
    }
  }

  init = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.backgroundColor = "black";
    this.populateStarArray();
  }
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;



  draw() {
    for ( let i = 0; i < this.starNumber; i++ ){

      this.starArray[i].erase();
      this.starArray[i].animate();
      if(this.starArray[i].isOutside()){
        this.starArray.splice(i, 1);
        this.starArray.push(new Star(this.context))
      }
      this.starArray[i].draw();
      this.canvas.style.backgroundColor = "black";
    }
    window.requestAnimationFrame(() => this.draw());
  }
}



var canvas = new Starfield(CANVAS_NAME, STAR_NUMBER);

canvas.draw();