$(document).ready(function(){

	$("button#process_factor").click(function(e){
	var textBlock = $("#recipe_input").val();
	var factor = $("#factor-list").val(); 
	var allLines = doAllLines(textBlock, factor);
	// print the new value to the screen
	for (var i = 0; i < allLines.length; i++) {
		allLines[i]
		$("#content").append("<p>"+ allLines[i] +"</p>");
		};
	});

	
});