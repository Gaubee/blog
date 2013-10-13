$(function() {
	$window = $(window);
	/*
	splash
	*/
	var $splash = $(".splash"),
		$arrow_container = $splash.find(".arrow"),
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
		},
		initOpacity = 0.3,
		hoverOpactiy = 0.8,
		animateTime = 200,
		init = true,
		splashIndex = 1,

		$navItems = $("[splash-index]"),
		navItemsHashMap = {},
		$navItem_Contents = $("[splash-content]");

	function initLayoutSplash() {
		var height = $splash.height(),
			width = $splash.width(),
			arrow_width = $arrow_left.width(),
			proportion = _proportion(width) * 10 + "em",
			media_small = arrow_width === width || arrow_width > width * 0.9;
		arrow_height = media_small ? proportion : height + "px",
		arrow_css_config = {
			opacity: initOpacity,
			height: arrow_height,
			lineHeight: arrow_height,
		},
		arrow_animate_config = {
			display: "block",
			fontSize: proportion
		};
		// console.log(arrow_width, width)
		if (init) {
			$arrow_left.animate(arrow_css_config, animateTime);
			$arrow_right.animate(arrow_css_config, animateTime);
			$navItems.each(function(i, navItem) {
				var self = $(navItem),
					index = self.attr("splash-index");
				if (index == splashIndex) {
					self.addClass("pure-menu-selected");
				}
				navItemsHashMap[index] = {
					index: self
				};
			});
			$navItem_Contents.each(function(i, navItem_content) {
				var self = $(navItem_content),
					index = self.attr("splash-content");
				(navItemsHashMap[index] || (navItemsHashMap[index] = {})).content = self;
				if (splashIndex == index) {
					self.css({
						display: "block"
					})
				} else {
					self.css({
						display: "none"
					})
				}
			});
			console.log(navItemsHashMap)
			init = false; //只在初始化的时候显示动画，其他不显示，避免动画冲突
		} else {
			$arrow_left.css(arrow_css_config, animateTime);
			$arrow_right.css(arrow_css_config, animateTime);
		}
		$arrow_left.css(arrow_animate_config); //.width(_proportion(width))
		$arrow_right.css(arrow_animate_config); //.width(_proportion(width))

		if (media_small) {
			console.log($arrow_left.css("height"))
			$arrow_container.css({
				height: parseInt($arrow_left.css("height")) * 2 + "px"
			})
		} else {
			$arrow_container.css({
				height: 0
			})
		}
	};

	function initEventSplash() {
		var splashHoverEvent = function(e) {
			$(this).stop().animate({
				opacity: hoverOpactiy
			}, animateTime)
		}, splashLeaveEvent = function(e) {
				$(this).stop().animate({
					opacity: initOpacity
				}, animateTime)
			},
			splashLeftScroll = function(e) {
				splashIndex -= 1
			};
		$arrow_left.on("mouseenter", splashHoverEvent).on("mouseleave", splashLeaveEvent)
		$arrow_right.on("mouseenter", splashHoverEvent).on("mouseleave", splashLeaveEvent)
	};
	$window.on("load", function() {
		initLayoutSplash(); //初始化一次
		initEventSplash();
		initLayoutSplash(); //正常运行一次
	}).on("resize", initLayoutSplash)
});