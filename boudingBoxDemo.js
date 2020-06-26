class boundingBox{
  constructor(tl,tr,bl,br){
    this.tl=tl
    this.tr=tr
    this.bl=bl
    this.br=br
  }
  show(){
    stroke('green')
    //topline
    line(this.tl[0],this.tl[1],this.tr[0],this.tr[1])
    //leftline
    line(this.tl[0],this.tl[1],this.bl[0],this.br[1])
    //rightline
    line(this.tr[0],this.tr[1],this.br[0],this.br[1])
    //bottomline
    line(this.bl[0],this.bl[1],this.br[0],this.br[1])
  }
}
class marker{
  constructor(x,y,someColor){
    this.x=x
    this.y=y
    this.r=10
    this.color=someColor
  }
  show(){
    fill(this.color)
    circle(this.x,this.y,this.r)
  }
}
const visible=[]
let currentStationaryMarker=null

function setup() {
  createCanvas(400, 400);
  background('gray')
}

function draw() {
  //background('gray')
  visible.forEach((el,index)=>{
    el.show()
  })
}

function mousePressed(){//runs once everytime mouse is pressed
    //background('gray')
    const topLeft=[mouseX,mouseY]
    const topLeftMarker=new marker(topLeft[0],topLeft[1],'yellow')
    visible.push(topLeftMarker)
    currentStationaryMarker=topLeftMarker
}

function mouseDragged(){
  background('gray')
  const topLeft=[currentStationaryMarker.x,currentStationaryMarker.y]
  const bottomRight=[mouseX,mouseY]
  const topRight=[mouseX,currentStationaryMarker.y]
  const bottomLeft=[currentStationaryMarker.x,mouseY]
  stroke('green')
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
  visible.push(box)
}
