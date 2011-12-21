/* 	
	PlaceholderRX - Adds simple placeholder functionality to any browser.
	www.jacobsmits.com/scripts/placeholderRX.html
	
	**Requires Jquery 1.6.4**
	
	Simply pass your form id to this function to enable. Pass an additional style for the inputText spans if you need more CSS control. Pass the function a color if you want to use the hover functionality to change the background color.
	
	- Note - You must use the PlaceholderRX form and CSS template.
	
	Copyright 2011 Jacob Smits - www.jacobsmits.com
	If you use this script and like it, please donate on the scripts webpage! 
*/	

jQuery.fn.placeholderRX = function(options) {
	var settings = jQuery.extend({
		hoverColor: '#FBFBFB',
		addClass: 'null',
		textColor: '#FBFBFB'		
	}, options);
	
	var $this = $(this);
	
	$this.children('span').each(function() {
		var $input = $(this).children();
		var revertColor = $input.css('background-color');
		if ($input.attr('type') == 'text' || $input.attr('type') == 'password' || $input.attr('type') == 'textarea'){
			//Set up vars
			var width = $input.outerWidth();
			var innerWidth = $input.innerWidth();
			var bordWidth = width - innerWidth;
			var height = $input.outerHeight() + 'px';
			var padding = $input.css('padding-left'); //Padding a user would enter to indent text on form
			padding = parseInt(padding);
			padding = padding + bordWidth;
			padding = padding + 'px';
			width = width + 'px';
			var text = $input.attr('title');
			var fontHeight = $input.css('font-size');
			
			//Create span and set css styles to position it over the input
			$(this).append($("<span class='inputText'></span>"));
			var $inputText = $(this).children('.inputText');
			$inputText.append(text);
			$inputText.css({width: width, height: height, color: settings.textColor});
			$inputText.css('display', 'block');
			$inputText.css('position', 'absolute');
			$inputText.css('bottom', '0px');
			$inputText.css('line-height', height);
			$inputText.css('font-size', fontHeight);
			$inputText.css('text-indent', padding);
			if (settings.addClass !== 'null'){
				$inputText.addClass(settings.addClass);
			}
			if($input.attr('value') !== '') {
				$inputText.hide();
			};
			$input.change(function() {
				if($input.attr('value') !== '') {
					$inputText.hide();
				}else{
					$inputText.show();
				}
			});
			$input.focusin(function() {
				$inputText.hide();
			});
			$inputText.click(function(index) {
				$input.show();
				$inputText.hide();
				$input.focus();
			});
			$input.focusout( function() {
				if ($input.attr('value') == '') {
					$inputText.show();
				}	
			});
			$inputText.hover( 
				function() {
					$input.css('background-color', settings['hoverColor']);
				},
				function() {
					$input.css('background-color', revertColor);
				}
			);
		}		
	});
};