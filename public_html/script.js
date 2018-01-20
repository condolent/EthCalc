$(document).ready(function() {
	
	//var input = 40; // What I have put in
	//var coins = 0.03741658; // How many coins I currently have
	var input; // What I have put in
	var coins; // How many coins I currently have
	var submit = $("#submit");
	
	if(Cookies.get("coins") || Cookies.get("input")) {
		input = Cookies.get("input");
		coins = Cookies.get("coins");
		$("#input").val(input);
		$("#coins").val(coins);
		
		call();
	}
	
	submit.click(function(){
		input = $("#input").val();
		coins = $("#coins").val();
		call();
		
		Cookies.set("input", input);
		Cookies.set("coins", coins);
	});
	
	function call() {
		$.ajax({
			type:"GET", 
			url: "https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR", 
			success: function(data) {
				
				var percent = $("h1");
				var txt = $(".sub");
				
				
				
				var r24 = data[0].percent_change_24h;
				var price = data[0].price_eur; // Price for 1.0 Eth (€)
				var qty = input / price; // The amount of coins I get for my input with current price
				
				var value = coins * price; // How much my coins currently are worth
				
				var profit = 100*(value - input) / input;
				
				percent.text(profit.toFixed(2) + "%");
				txt.html("I put in €" + input + ", which resulted in a total of " + coins + " ETH which is currently worth €" + value.toFixed(2) + ".<br/> It has changed by " + r24 + "% the last 24hrs!");
				
				
				
				if(profit < 0) {
					percent.css("color", "#b54d4d");
					//percent.append(" :(");
				} else {
					percent.css("color", "#4db559");
				}
				
				
			},
				error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error talking with the API");
				console.log(jqXHR.status);
			},
			dataType: "json"
		});
	}
	
});

