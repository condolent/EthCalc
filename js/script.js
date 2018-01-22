$(document).ready(function() {
	
	var input; // What I have put in
	var coins; // How many coins I currently have
	var fee; // Optional transactional fee to include
	var feeTotal; // The fee amount in €
	
	var inputField = $("#input");
	var coinsField = $("#coins");
	var feeField = $("#fee");
	var submit = $("#submit");
	
	if(Cookies.get("coins") && Cookies.get("input")) {
		input = Cookies.get("input");
		coins = Cookies.get("coins");
		fee = Cookies.get("fee");
		
		inputField.val(input);
		coinsField.val(coins);
		feeField.val(fee);
		
		call();
	}
	
	submit.click(function() {
		if(inputField.val() != "" && coinsField.val() != "") {
			input = inputField.val();
			coins = coinsField.val();
			fee = feeField.val();
			
			Cookies.set("input", input, { expires: 365 });
			Cookies.set("coins", coins, { expires: 365 });
			Cookies.set("fee", fee, { expires: 365 });
			
			call();
		} else {
			alert('You must fill in the input and coins-field!');
		}
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
				
				if(feeField.val() != "")
					var value = (coins * price) * (1.0 - (fee / 100)); // How much my coins currently are worth, subtracting the transactional fee
				else
					var value = (coins * price); // How much my coins currently are worth
				
				
				feeTotal = value * (fee / 100);
				
				var profit = 100*(value - input) / input;
				
				percent.text(profit.toFixed(2) + "%");
				if(feeField.val() != "")
					txt.html("I put in €" + input + ", which resulted in a total of " + coins + " ETH which is currently worth €" + value.toFixed(2) + ".<br/>Including a " + fee + "% fee, totalling " + feeTotal.toFixed(2) + "€.<br /> The value of Ethereum has changed by " + r24 + "% the last 24hrs!");
				else
					txt.html("I put in €" + input + ", which resulted in a total of " + coins + " ETH which is currently worth €" + value.toFixed(2) + ".<br/> The value of Ethereum has changed by " + r24 + "% the last 24hrs!");
				
				
				if(profit < 0) {
					percent.css("color", "#b54d4d");
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
