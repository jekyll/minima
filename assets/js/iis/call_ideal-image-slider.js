var slider = new IdealImageSlider.Slider({
	selector: '#slider',
	height: "auto", // Required but can be set by CSS
  maxHeight: 550,
	interval: 4000,
  effect: "slide",
  transitionDuration: 0,
});
slider.addBulletNav();
slider.addCaptions();

new IdealImageSlider.Slider('#slider');
