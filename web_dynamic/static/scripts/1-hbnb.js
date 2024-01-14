$(document).ready(function() {
	// variable to store selected items
	const selectedItems = [];

	// listen for changes on each checkbox
	$('input[type="checkbox"]').change(function() {
		var amenityId = $(this).data('id');
		var amenityName = $(this).data('name');

		if ($(this).prop('checked')) {
			selectedItems.push(amenityName)
		} else {
			selectedItems.splice(selectedItems.indexOf(amenityName), 1);
		}
		// updating the h4 tag
		$('.amenities h4').text(selectedItems.join(', '));
	});

});
