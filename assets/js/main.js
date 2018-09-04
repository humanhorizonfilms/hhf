
///////////// custom cursor
// $(document)
//   .mousemove(function(e) {
//     $('.cursor')
//       .eq(0)
//       .css({
//         left: e.pageX,
//         top: e.pageY
//       });
//     // setTimeout(function() {
//     //   $('.cursor')
//     //     .eq(1)
//     //     .css({
//     //       left: e.pageX,
//     //       top: e.pageY
//     //     });
//     // }, 100);
//   })

///////////// transition

$(document).ready(function() {

    /* Every time the window is scrolled ... */
    $(window).scroll( function(){

        /* Check the location of each desired element */
        $('.animate').each( function(i){

            var bottom_of_object = $(this).offset().top + $(this).innerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){

                $(this).animate({'opacity':'1'},400);
            }
        });
    });
});

///////////// lazyload
lazyload();

///////////// p5js

var bubbles = [];
var wisp_cloud;
var stormy_cloud;
var clouds

function preload(){
  clouds = loadImage('assets/images/skybg.png')
  wisp_cloud = loadImage('assets/images/addcloud.png')
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight)
  cnv.parent('cloud-holder');

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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
    vimeoLoadingThumb(286687853);
});

//////////// marquee jquery
$('.marquee').marquee({
   duration: 8000,
   gap: 10,
   delayBeforeStart: 0,
   direction: 'left',
   duplicated: true
 });
