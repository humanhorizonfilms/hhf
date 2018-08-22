let bubbles = [];
let wisp_cloud;
let clouds
//
// function preload() {
//   clouds = createVideo('assets/images/skybg.mp4')
//   wisp_cloud = loadImage('assets/images/addcloud.png')
// }

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight)
  cnv.parent('cloud-holder');
    clouds = createVideo('assets/images/skybg.mp4')
    wisp_cloud = loadImage('assets/images/addcloud.png')
  clouds.loop()
  clouds.hide();
  // clouds.position(0, 0);
}

function draw() {
  background(0)
  image(clouds, 0, 0, windowWidth, windowHeight);
  for (i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
    bubbles[i].rain();
  }
}

function mousePressed() {
  // let r = random(10, 50);
  let b = new Cloud(mouseX, mouseY);
  bubbles.push(b);
}

class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = random(200, 300)
    this.height = random(100, 200)
    this.speed = random(0.5, 1.5)
    this.rand = random(1);
  }
  move() {
    this.x = this.x--;
  }
  show() {
    push();
    imageMode(CENTER)
    blendMode(LIGHTEST);
    image(wisp_cloud, this.x, this.y, 100 + this.width, 50 + this.height)
    pop();
  }
  rain() {
    if (this.x > width + 200) {
      this.x = -100;
    } else {
      this.x += this.speed;
    }

    if (frameCount % 20 == 0) {
      if (this.rand > 0.7) {
        this.y--
      } else if (this.rand < 0.7) {
        this.y++
      }
    }
  }
}


var blackWindow = function(p) {

  p.setup = function() {
    p.createCanvas(p.windowWidth / 2 - 100, p.windowHeight - 100)
    p.background('#171717')
  }

  p.draw = function() {
    p.fill('#f5f5f5')
    p.strokeWeight(0)
    p.ellipse(p.mouseX, p.mouseY, 100, 100)
  }

}
var myp5 = new p5(blackWindow, 'window-holder');
