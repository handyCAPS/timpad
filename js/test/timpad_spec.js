/* jshint undef: false, unused: false */

describe("Making a TimPad", function() {

	var fixturePath = '../../../js/test/fixtures/';

	beforeEach(function() {
		loadFixtures(fixturePath + 'canvas.html');

		$('.timPadButton').timPad();
	});

	describe("Making elements", function() {

		it("should make a div and attach it to the dom", function() {
			expect($('#timPadWrap')).toBeInDOM();
		});

		it("should make 12 divs", function() {
			expect($('.tpNumber').length).toBe(12);
		});

		it("should make a display window", function() {
			expect($('#timPadDisplay')).toBeInDOM();
		});

	});

	describe("Styling elements", function() {

		it("should style the wrapper", function() {
			expect($('#timPadWrap')).toHaveAttr('style');
		});

		it("should have a width", function() {
			expect($('#timPadWrap')[0].style.width).not.toBe('');
		});

		it("should have a background color", function() {
			expect($('#timPadWrap')[0].style.backgroundColor).not.toBe('');
		});

		it("should be absolute positioned", function() {
			expect($('#timPadWrap')[0].style.position).toBe('absolute');
		});

		// it("should have rounded corners if not disabled", function() {
		// 	expect($('#timPadWrap')[0].style.borderRadius).toBe('5px');
		// });

		it("should take an object literal with options", function() {
			$('.timPadButton').timPad({
				backgroundColor: 'rgb(10, 20, 30)',
				width: '400px'
			});
			expect($('#timPadWrap')[0].style.backgroundColor).toBe('rgb(10, 20, 30)');
			expect($('#timPadWrap')[0].style.width).toBe('400px');
		});

		it("should style the numbers", function() {
			expect($('.tpNumber')[0].style.margin).not.toBe('');
			expect($('.tpNumber')[0].style.backgroundColor).not.toBe('');
			expect($('.tpNumber')[0].style.padding).not.toBe('');
		});

		it("should make sure the display font defaults to monospace", function() {
			$('.timPadButton').timPad({
				displayFontFam: 'Arial'
			});
			expect($("#timPadDisplay")[0].style.fontFamily).toMatch(/monospace\s*$/);
		});

	});

	// describe("Typing numbers", function() {
	// 	it("should add the clicked number to the display", function() {
	// 		$("#timPadNumber6").trigger('click');
	// 		// expect($('#timPadDisplay').text()).toMatch(/6/);
	// 		expect('click').toHaveBeenTriggeredOn($("#timPadNumber6"));
	// 	});
	// });


});