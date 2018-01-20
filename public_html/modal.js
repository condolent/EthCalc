$(document).ready(function() {
	var btn = $("#modalbtn");
	var modal = $(".modal");
	var exit = $(".closer");
	
	var content = $(".modal-body");
	var header = $(".modal-header h2");
	
	btn.each(function() {
		var i = $(this);
		i.click(function() {
			if(modal.css("display") == "none") {
				modal.css("display", "block");
				header.html(i.data("title"));
				content.html(i.data("content"));
			}
		});
	});
	
	exit.each(function(){
		var i = $(this);
		
		i.click(function(){
			if(modal.css("display") == "block") {
				modal.css("display", "none");
			}
		});
	});
	
	$(window).click(function(e){
		if(e.target.className == "modal") {
			if(modal.css("display") == "block") {
				modal.css("display", "none");
			}
		}
	});
});