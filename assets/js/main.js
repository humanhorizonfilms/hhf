

///////////// transition

$(document).ready(function() {
	 $('body').fadeIn(1000);
	// $('.preloader').fadeOut('slow');

	$("img[data-vimeo-id]").each(function(index) {
    var vimeoId = $(this).data('vimeo-id');
    $.getJSON('https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/' + vimeoId, {
        format: "json",
        width: "640"
      },
      function(data) {
        $("img[data-vimeo-id=" + vimeoId + "]").attr('src', data.thumbnail_url);
      });
  });

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

		// setTimeout(function(){
		// 	$('body').addClass('loaded');
		// }, 2000);

		///////////// lazyload
		// lazyload();


		//////////// marquee jquery
		$('.marquee').marquee({
			duration: 20000,
			gap: 10,
			delayBeforeStart: 0,
			direction: 'left',
			duplicated: true
		});
});

///////////// p5js

var bubbles = [];
var wisp_cloud;
var stormy_cloud;
var clouds

function setup() {
	clouds = loadImage('assets/images/skybg.jpg')
	wisp_cloud = loadImage('assets/images/addcloud.png')
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
	}
	
	// if (frameCount % 1000 == 0) {
	// background(0);
	// }
}

function mousePressed(){
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
	move() { this.x = this.x --; }
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
