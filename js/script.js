// Searchbar Handler
$(document).ready(function() {
	var searchField = $('#query');
	var icon = $('#search-btn');

	// Focus Event Handler
	$(searchField).on('focus', function() {
		$(this).animate({
			width: '100%'
		}, 400);

		$(icon).animate({
			right: '10px'
		}, 400);
	});

	// Blur Event Handler
	$(searchField).on('blur', function() {
		if (searchField.val() == '') {
			$(searchField).animate({
				width: '45%'
			}, 400, function() {});
			$(icon).animate({
				right: '360px'
			}, 400, function() {});			
		}
	});	

	$('#search-form').submit(function(e) {
		e.preventDefault();
		return false;
	});
});

function search() {
	// var  results
	$('#results').html('');
	$('#buttons').html('');

	// get Form input
	q = $('#query').val();

	// run GET request on API
	var url = 'https://www.googleapis.com/youtube/v3/search';
	$.get(url, {
		part: 'snippet, id',
		q: q,
		type: 'video',
		key: 'AIzaSyCM7-zaWMB9ZQ5bQGQmkPAVirUNjX1WQDY'},
		function(data) {
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;

			// log data
			console.log(data);

			$.each(data.items, function(i, item) {
				// get output
				var output = getOutput(item);

				// display results
				$('#results').append(output);
			});

			var buttons = getButtons(prevPageToken, nextPageToken);

			// display buttons
			$('#buttons').append(buttons);
		}
	);
}

// Next Page Function 
function nextPage() {
	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query');

	// var  results
	$('#results').html('');
	$('#buttons').html('');

	// get Form input
	q = $('#query').val();

	// run GET request on API
	var url = 'https://www.googleapis.com/youtube/v3/search';
	$.get(url, {
		part: 'snippet, id',
		q: q,
		pageToken: token,		// get next page !
		type: 'video',
		key: 'AIzaSyCM7-zaWMB9ZQ5bQGQmkPAVirUNjX1WQDY'},
		function(data) {
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;

			// log data
			console.log(data);

			$.each(data.items, function(i, item) {
				// get output
				var output = getOutput(item);

				// display results
				$('#results').append(output);
			});

			var buttons = getButtons(prevPageToken, nextPageToken);

			// display buttons
			$('#buttons').append(buttons);
		}
	);	
}

// Prev Page Function 
function prevPage() {
	var token = $('#prev-button').data('token');
	var q = $('#prev-button').data('query');

	// var  results
	$('#results').html('');
	$('#buttons').html('');

	// get Form input
	q = $('#query').val();

	// run GET request on API
	var url = 'https://www.googleapis.com/youtube/v3/search';
	$.get(url, {
		part: 'snippet, id',
		q: q,
		pageToken: token,		// get next page !
		type: 'video',
		key: 'AIzaSyCM7-zaWMB9ZQ5bQGQmkPAVirUNjX1WQDY'},
		function(data) {
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;

			// log data
			console.log(data);

			$.each(data.items, function(i, item) {
				// get output
				var output = getOutput(item);

				// display results
				$('#results').append(output);
			});

			var buttons = getButtons(prevPageToken, nextPageToken);

			// display buttons
			$('#buttons').append(buttons);
		}
	);	
}

// Build output
function getOutput(item) {
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	// build output string
	var output = '<li>' + 
	'<div class="list-left">' +
	'<img src="'+thumb+'">' +
	'</div>' +
	'<div class="list-right">' +
	'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
	'<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
	'<p>' + description + '</p>' +
	'</div>' +
	'</li>' + 
	'<div class="clearfix"></div>' +
	'';

	return output;
}

// Build the buttons
function getButtons(prevPageToken, nextPageToken) {
	if (!prevPageToken) {
		var btnoutput = '<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
	} else {
		var btnoutput = '<div class="button-container">'+
		'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
		'onclick="prevPage();">Prev Page</button>' +
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';	
	}

	return btnoutput;
}