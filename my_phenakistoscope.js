const SLICE_COUNT = 10;

function setup_pScope(pScope) {
  pScope.output_mode(ANIMATED_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);

  pScope.load_image("cowGallop/cowGallop_0", "png");
  pScope.load_image("cowGallop/cowGallop_1", "png");
  pScope.load_image("fg", "png");
  pScope.load_image("bg", "png");
  pScope.load_image("overlay", "png");
}

function setup_layers(pScope) {
  new PLayer(null, 112, 126, 129);

  var bgLayer = new PLayer(drawBackground);
  bgLayer.mode(RING);
  bgLayer.set_boundary(1000, 1000);

  var cowLayer = new PLayer(cowGallopAnimation);
  cowLayer.mode(RING);
  cowLayer.set_boundary(1000, 1000);

  var fgLayer = new PLayer(drawForeground);
  fgLayer.mode(RING);
  fgLayer.set_boundary(1000, 1000);
}

function drawBackground(x, y, animation, pScope) {
  if (animation.frame == 0) {
    // we only want to draw the bg once
    scale(2.6);
    pScope.draw_image("bg", 0, 0);
  }
}

function drawForeground(x, y, animation, pScope) {
  if (animation.frame == 0) {
    // we only want to draw the fg once
    scale(2.6);
    pScope.draw_image("fg", 0, 0);
    pScope.draw_image("overlay", 0, 0);
  }
}

function cowGallopAnimation(x, y, animation, pScope) {
  // math for finding the current wedge
  let currentWedge = Math.floor(animation.frame * SLICE_COUNT);

  push();
  translate(x, y + 800);
  if (currentWedge == 6) {
    // start of jump
    rotate(Math.PI * 4);
  } else if (currentWedge == 7) {
    // peak of jump
    translate(x, -100);
  } else if (currentWedge == 8) {
    // end of jump
    rotate(-Math.PI * 4);
  }
  // alternate between cow gallop frame 1 and 2
  let imageName =
    currentWedge % 2 === 0 ? "cowGallop/cowGallop_0" : "cowGallop/cowGallop_1";
  pScope.draw_image(imageName, 0, 0);
  pop();
}
