/*
  Copyright (c) 2013 Rohit Sengar, https://www.linkedin.com/in/rohitsengar
	Version: 0.9 beta
	Complied/minified version: http://closure-compiler.appspot.com/code/jsc78dc96a179b52b3dd4a2616e87e4207c/default.js
	Dependency: jquery 1.x.x. 
		
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($) {
		$.fn.scrollbar = function(options) {
			var settings = $.extend({
				color : "#000", // color of scrollbar, editable
				width : 10, // default width of scrollbar
				rounded : true, // should scrollbar be rounded
				opacity : 0.7, // scrollbar opacity
				ratio : 1
			}, options);

		if ($('#scrollstyle').length < 1) {// add scrollbar style css if not present
			var style = document.createElement("style");
			style.type = "text/css";
			var code = ".scrollarea{ width: 100%; height: auto; } .scrollbar{ position: absolute; width: 10px; display: none; cursor: pointer; } .unselectable { -moz-user-select: none; -webkit-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none; }";
			if (style.styleSheet)
				style.styleSheet.cssText = code;
			else
				style.innerHTML = code;
			document.getElementsByTagName("head")[0].appendChild(style);
		}

		return this.each(function() {
			$(this).css('overflow', 'hidden').wrapInner('<div class="scrollarea">');
			if ($(this).height() >= $('.scrollarea', this).eq(0).height())
				return false;
			settings.ratio = $('.scrollarea', this).eq(0).height() / $(this).height();
			$(this).prepend('<div class="scrollbar"></div>');
			$('.scrollbar', this).eq(0).width(settings.width);
			$('.scrollbar', this).eq(0).css('background-color', settings.color);
			$('.scrollbar', this).eq(0).css('opacity',settings.opacity);
			if(settings.rounded) $('.scrollbar', this).eq(0).css('border-radius',(settings.width/2)+'px');
			var margin = $(this).offset().left + $(this).outerWidth() - $('.scrollbar', this).eq(0).outerWidth();
			$('.scrollbar', this).eq(0).css('left', margin + 'px');
			$('.scrollbar', this).eq(0).css('top', $(this).offset().top + 'px');
			$('.scrollbar', this).eq(0).height($(this).height() / settings.ratio);
			$('.scrollbar', this).eq(0).data('ratio', settings.ratio);
			$(this).scrollTop(0);
			$(this).data('maxScroll', $('.scrollarea', this).eq(0).height() - $(this).height());
			$(this).hover(function() {
				if (!$('.scrollbar', this).eq(0).hasClass('.scroll-dragging')) {
					$('.scrollbar', this).eq(0).fadeIn();
				}
			}, function() {
				if (!$('.scrollbar', this).eq(0).hasClass('.scroll-dragging'))
					$('.scrollbar', this).eq(0).fadeOut();
			});
			$('.scrollbar', this).eq(0).mousedown(function(e) {
				$('.scroll-dragging').removeClass('scroll-dragging');
				$(this).addClass('scroll-dragging');
				$(this).data('ofTop', e.pageY - $(this).offset().top);
				$(this).css({
					'top' : $(this).offset().top + 'px'
				});
				$('body').addClass('unselectable');
			});
			$('body').mousemove(function(e) {
				var m = e.pageY - $('.scroll-dragging').data('ofTop');
				var container = $('.scroll-dragging').parent();
				if (container.offset() != undefined) {
					var d = m + $('.scroll-dragging').outerHeight() - 2;
					if (m > container.offset().top && d < (container.offset().top + container.outerHeight())) {
						$('.scroll-dragging').css({
							'top' : m + 'px'
						});
						var move = $('.scroll-dragging').offset().top - container.offset().top;
						if (move < 0)
							move *= -1;
						container.scrollTop(move * $('.scroll-dragging').data('ratio'));
						$('.scroll-dragging').show();
						e.preventDefault();
						e.stopPropagation();
					}
				}
			}).mouseup(function() {
				$('.scroll-dragging').removeClass('scroll-dragging');
				$('body').removeClass('unselectable');
			});
			var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
			$(this).bind(mousewheelevt, function(e) {
				var e = window.event || e;
				e = e.originalEvent || e;
				var delta = e.detail ? e.detail * (-120) : e.wheelDelta;
				var s = $(this).scrollTop();
				if (delta / 120 > 0) {
					s -= 50;
					if (s < 0)
						$(this).scrollTop(0);
					else
						$(this).scrollTop(s);
				} else {
					s += 50;
					if (s > $(this).data('maxScroll'))
						$(this).scrollTop($(this).data('maxScroll'));
					else
						$(this).scrollTop(s);
				}
				var bar = s / $('.scrollbar', this).eq(0).data('ratio') + $(this).offset().top;
				if (bar < $(this).offset().top)
					$('.scrollbar', this).eq(0).css('top', $(this).offset().top + 'px');
				else {
					var temp = $(this).offset().top + $(this).outerHeight() - $('.scrollbar', this).eq(0).height();
					if (bar > temp)
						$('.scrollbar', this).eq(0).css('top', temp + 'px');
					else
						$('.scrollbar', this).eq(0).css('top', bar + 'px');
				}
				if (e.preventDefault)
					e.preventDefault();
				else
					return false;
				e.stopPropagation();
			});
		});
	};
}(jQuery));
