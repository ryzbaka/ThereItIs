let img;
const visible=[];
let currentStationaryMarker;
let currentColor='green' //bounding box color set this based on objecttype
let currentLabel='horse'
let fontSize=40
const boxes=[]
class boundingBox{
  constructor(tl,tr,bl,br){
    this.tl=tl
    this.tr=tr
    this.bl=bl
    this.br=br
  }
  show(){
    stroke(currentColor)
    //topline
    line(this.tl[0],this.tl[1],this.tr[0],this.tr[1])
    //leftline
    line(this.tl[0],this.tl[1],this.bl[0],this.br[1])
    //rightline
    line(this.tr[0],this.tr[1],this.br[0],this.br[1])
    //bottomline
    line(this.bl[0],this.bl[1],this.br[0],this.br[1])
    textSize(fontSize)
    stroke('yellow')
    text(currentLabel,this.tr[0],this.tr[1])
  }
}

class marker{
  constructor(x,y,someColor){
    this.x=x
    this.y=y
    this.r=20
    this.color=someColor
  }
  show(){
    fill(this.color)
    circle(this.x,this.y,this.r)
  }
}

function preload(){
  img=loadImage('horses.jpg')
}
function setup(){
  console.log(img.width)
  console.log(img.height)
  createCanvas(img.width,img.height)
  image(img,0,0)
}
function draw(){
  //image(img,0,0)
  visible.forEach((el,index)=>{
    el.show()
  })
  boxes.forEach((el,index)=>{
    el.show()
  })
}

function mousePressed(){//runs once everytime mouse is pressed
    //image(img,0,0)
    //background('gray')
    const topLeft=[mouseX,mouseY]
    const topLeftMarker=new marker(topLeft[0],topLeft[1],'yellow')
    visible.push(topLeftMarker)
    currentStationaryMarker=topLeftMarker
}
function mouseDragged(){const topLeft=[currentStationaryMarker.x,currentStationaryMarker.y]
  image(img,0,0)
  const bottomRight=[mouseX,mouseY]
  const topRight=[mouseX,currentStationaryMarker.y]
  const bottomLeft=[currentStationaryMarker.x,mouseY]
  stroke(currentColor)
  strokeWeight(10)
  //topline
  line(topLeft[0],topLeft[1],topRight[0],topRight[1])
  //leftline
  line(topLeft[0],topLeft[1],bottomLeft[0],bottomRight[1])
  //rightline
  line(topRight[0],topRight[1],bottomRight[0],bottomRight[1])
  //bottomline
  line(bottomLeft[0],bottomLeft[1],bottomRight[0],bottomRight[1])
  
}

function mouseReleased(){
  const topLeft=[currentStationaryMarker.x,currentStationaryMarker.y]
  const bottomRight=[mouseX,mouseY]
  const topRight=[bottomRight[0],topLeft[1]]
  const bottomLeft=[topLeft[0],bottomRight[1]]
  const bottomRightMarker=new marker(bottomRight[0],bottomRight[1],'red')
  visible.push(bottomRightMarker)
  const box=new boundingBox(topLeft,topRight,bottomLeft,bottomRight)
  boxes.push(box)
}

function keyPressed(){
  if(keyCode===90){//undo button ctrl+z
    boxes.pop()
    visible.pop()
    visible.pop()
    image(img,0,0)
  }
  if(keyCode===66){//view number of bounding boxes 
    console.log(`Number of bouding boxes: ${boxes.length}`)
  }
}
