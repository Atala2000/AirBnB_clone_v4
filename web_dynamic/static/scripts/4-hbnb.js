// Make sure to replace 'YOUR_SERVER_URL' with the correct URL
const serverURL = 'http://0.0.0.0:5001';

$(document).ready(function () {
    $.get(`${serverURL}/api/v1/status/`, function (data, textStatus) {
        if (textStatus === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});

$(document).ready(function () {
    $('button').click(function () {
        // Collect the list of checked amenities
        const checkedAmenities = [];
        $('input[type="checkbox"]:checked').each(function () {
            checkedAmenities.push($(this).data('id'));
        });

        // Make a POST request to places_search with the list of checked amenities
        $.ajax({
            type: 'POST',
            url: `${serverURL}/api/v1/places_search/`,
            contentType: 'application/json',
            data: JSON.stringify({
                amenities: checkedAmenities
            }),
            success: function (data) {
                $('.places').empty();

                // Loop through the result and create article tags for each place
                data.forEach(function (place) {
                    const article = '<article>' +
                        '<div class="title_box">' +
                        '<h2>' + place.name + '</h2>' +
                        '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                        '</div>' +
                        '<div class="information">' +
                        '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
                        '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                        '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
                        '</div>' +
                        '<div class="user">' +
                        '<b>Owner:</b> ' + place.user.first_name + ' ' + place.user.last_name +
                        '</div>' +
                        '<div class="description">' + place.description + '</div>' +
                        '</article>';

                    $('.places').append(article);
                });
            }
        });
    });
});
