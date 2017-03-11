var $ = jQuery;

var bgColorArray = ['cyan', 'yellow', 'blue', 'red', 'purple', 'green'];
var bgColor = bgColorArray[Math.floor(Math.random()*bgColorArray.length)];
$('#background').addClass(bgColor);

$(document).ready(function() {
    
	
	
});

function getSearchTerm() {
	var searchTerm = $('#search-input').val();
	console.log(searchTerm);
	searchWiki(searchTerm);
}

function searchWiki(searchTerm) {
	var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&limit=10&namespace=0&format=json&callback=?'
	
	$.getJSON(url , function(json){ 
		console.log(json); 
		processData(json);
	});
}

function processData(data) {
	$(".resultsbox").empty();
	for (var i = 0; i < data[1].length; i++) {
		$(".resultsbox").append('<a href=\"' + data[3][i] + '\" target=\"_blank\"><div class=\"result\ animated fadeIn" id=\"result' + i + '\"><h2>'+ data[1][i] + '</h2><br/><p>' + data[2][i] + '</p></div></a>');
	}
	
	if (data[1].length === 0) {
		$(".resultsbox").append('<a href=\"' + data[3][i] + '\" target=\"_blank\"><div class=\"no-results\ animated fadeIn"><h2>No Results Found</h2></div></a>');
	}
	
	console.log('done');
}

$('#submit').click(getSearchTerm);

// Enter key submits form
$("#search-input").keypress(function(event) {
  if (event.which == 13) {
     getSearchTerm();
		$("#search-input").blur();
  };
});