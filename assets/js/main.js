///////////// p5js

var bubbles = [];
var wisp_cloud;
var stormy_cloud;
var clouds

function preload(){
  clouds = createVideo('assets/images/skybg.mp4')
  wisp_cloud = loadImage('assets/images/addcloud.png')
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight)
  cnv.parent('cloud-holder');
  clouds.loop()
  clouds.hide();
  clouds.position(0,0);
}

function draw() {
  background(0)
  image(clouds,0,0, windowWidth, windowHeight);

  for(i = 0; i < bubbles.length; i++){
    bubbles[i].move();
    bubbles[i].show();
    bubbles[i].rain();
    // console.log(tidalVideo.duration());
    // console.log(tidalVideo.time());
  }
}

function mousePressed(){
  // let r = random(10, 50);
  let b = new Cloud(mouseX, mouseY);
  bubbles.push(b);
}

class Cloud{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = random(200, 300)
    this.height = random(100, 200)
    this.speed = random(0.5,1.5)
    this.rand = random(1);
  }

  move() {
    this.x = this.x --;
  }


  show() {
    push();
    imageMode(CENTER)
    blendMode(LIGHTEST);
    image(wisp_cloud, this.x, this.y, 100+this.width, 50+this.height)
    pop();
  }


  rain(){
    if(this.x > width+200){
      this.x = -100;
    }else{
      this.x += this.speed;
    }

    if(frameCount % 20 == 0){
      if(this.rand > 0.7){
        this.y--
      }else if(this.rand < 0.7){
        this.y++
      }
    }
  }
}
//////////// video thumbnail
function vimeoLoadingThumb(id){
    var url = "http://vimeo.com/api/v2/video/" + id + ".json?callback=showThumb";
    var id_img = "#vimeo-" + id;
    var script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.src = url;
    $(id_img).before(script);
}

function showThumb(data){
    var id_img = "#vimeo-" + data[0].id;
    $(id_img).attr('src',data[0].thumbnail_large);
}

$(function() {
    vimeoLoadingThumb(286109621);
    vimeoLoadingThumb(285408465);
    vimeoLoadingThumb(285885237);
});

//////////// marquee jquery

$('.marquee').marquee({
   duration: 8000,
   gap: 10,
   delayBeforeStart: 0,
   direction: 'left',
   duplicated: true
 });
