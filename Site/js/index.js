$(function() {
	$window = $(window);
	/*
	splash
	*/
	var $splash = $(".splash"),
		$arrow_left = $splash.find(".glyphicon-chevron-left"),
		$arrow_right = $splash.find(".glyphicon-chevron-right"),
		_proportion = function(int_width, bool) {
			var result;
			if (int_width > 800) {
				result = 0.08
			} else if (int_width > 400) {
				result = 0.1
			} else {
				result = 0;
			}
			return bool ? result * int_width : result * 2;
		};

	function initSplash() {
		var height = $splash.height(),
			width = $splash.width(),
			proportion = _proportion(width)*10	+"em",
			arrow_config = {
				height: width>767?height:proportion,
				fontSize: proportion
			};
			console.log(width)
		$arrow_left.css(arrow_config); //.width(_proportion(width))
		$arrow_right.css(arrow_config); //.width(_proportion(width))
	}
	$window.on("load", initSplash).on("resize", initSplash)
});