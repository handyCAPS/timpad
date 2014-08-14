/* jshint unused: false */

(function($) {

	$.fn.timPad = function(ops) {

		var options = ops || {};

		var
			wrapWidth   = options.width || '300px',
			bgColor     = options.backgroundColor || 'rgb(200,200,200)',
			nBgColor    = options.numberBgColor || '#EEE',
			rounded     = options.rounded === false ? false : true,
			radius      = options.borderRadius || '5px',
			numWrapId   = options.numberWrapId || 'numWrap',
			dpBgColor   = options.displayBgColor || '#F0F0F0',
			dpFontSize  = options.displayFontSize || '1.618em',
			dpFntFam    = options.displayFontFam || 'Consolas, monaco, "Lucida Sans Typewriter", "Lucida Console"',
			submitText 	= options.submitText || 'Go',
			action 			= options.actionLink || '#';

		if (!rounded) {
			radius 	= '0';
		}

		if (!/monospace\s*$/g.test(dpFntFam)) {
			dpFntFam += ', monospace';
		}

		var wrapId = 'timPadWrap';

		function makeNumberDiv(number) {
			var divString = "<div class='tpNumber' id='timPadNumber" + number + "'>" + number + "</div>";
			return divString;
		}

		function makeDisplayForm() {
			return "<form id='timPadForm' method='GET' action='" +
			 action +
			 "'>" +
			"<input id='timPadDisplay' name='bam' value='0'>" +
			"</form>";
		}

		function addNumber(ob) {

			var
			tp  = $('#timPadDisplay'),
			num = ob[0].id.replace(/[^0-9]/gi, '');

			if (tp.val() === '0') {
				tp.val(num);
			} else {
				tp.val(tp.val() + num);
			}

		}

		function clearDisplayListen() {
			$('#timPadReset').on('click', function() {
				$('#timPadDisplay').val('0');
			});
		}

		function styleWrap() {
			$('#' + wrapId).css({
				textAlign: 'center',
				padding: '8px',
				fontSize: '16px',
				width: wrapWidth,
				backgroundColor: bgColor,
				position: 'absolute',
				borderRadius: radius,
				boxSizing: 'border-box'
			});
		}

		function styleDisplay() {
			$('input#timPadDisplay').css({
				width: 'calc(100% - 24px)',
				border: 'none',
				backgroundColor: dpBgColor,
				margin: '4px',
				padding: '0 8px',
				textAlign: 'right',
				verticalAlign: 'middle',
				borderRadius: radius,
				fontSize: dpFontSize,
				fontFamily: dpFntFam
			});
		}

		function styleNumbers(ob) {
			ob.css({
					width: 'calc(33.333% - 8px)',
					display: 'inline-block',
					boxSizing: 'border-box',
					position: 'relative',
					margin: '4px',
					padding: '8px',
					cursor: 'pointer',
					backgroundColor: nBgColor
				});
		}

		function numberClick(ob) {
			ob.on('mousedown', function(event) {
				$(this).css({
					top: '2px',
					left: '2px'
				});
				addNumber(ob);
			});

			ob.on('mouseup', function(event) {
				$(this).css({
					top: '0px',
					left: '0px'
				});
			});
		}

		function runNumbers() {

			$('.tpNumber').each(function() {

				styleNumbers($(this));

				numberClick($(this));

			});

		}

		function addNumberDivs() {

			var allDivs = makeDisplayForm();

			allDivs += '<div id="' + numWrapId + '">';

			for (var i = 9; i > 0; i--) {
				allDivs += makeNumberDiv(i);
			}

			allDivs += "<div id='timPadReset' class='tpNumber'>Clear</div>";

			allDivs += makeNumberDiv(0);

			allDivs += '<button type="submit" form="timPadForm" class="tpNumber">' + submitText + '</button>';

			allDivs += '</div>';

			$('#timPadWrap').html(allDivs);
		}

		this.after('<div id="' + wrapId + '"></>');

		addNumberDivs();

		styleWrap();

		runNumbers();

		styleDisplay();

		clearDisplayListen();

		return this;
	};

}(jQuery));