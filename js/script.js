$(document).ready(function() {
	
	setInterval(repeater, 10000);
	
	var ready = false;
	
	var twitter = $("#twitter");
	twitter.attr("href", "https://twitter.com/intent/tweet?text=Check%20out%20this%20online%20Ethereum%20profit%20calculator! >> https://condolent.xyz/eth");
	
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
		if(fee != "") {
			feeField.val(fee + "%");
		} else {
			feeField.val("");
		}
		
		ready = true;
		
		call();
	}
	
	submit.click(function() {
		if(inputField.val() != "" && coinsField.val() != "") {
			input = inputField.val().replace(",", ".");
			inputField.val(input);
			
			coins = coinsField.val().replace(",", ".");
			coinsField.val(coins);
			
			fee = feeField.val().replace(",", ".").replace("%", "");
			feeField.val(fee + (feeField.val() != "" ? "%" : ""));
			
			Cookies.set("input", input, { expires: 365, path: '' });
			Cookies.set("coins", coins, { expires: 365, path: '' });
			Cookies.set("fee", fee, { expires: 365, path: '' });
			
			ready = true;
			
			call();
		} else {
			alert('You must fill in the input and coins-field!');
			ready = false;
		}
	});
	
	function repeater() {
		if(ready == true)
			call();
	}
	
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
				
				twitter.attr("href", "https://twitter.com/intent/tweet?text=I%20just%20found%20out%20that%20my%20Ethereum%20investment%20has%20changed%20by%20" + profit.toFixed(2) + "%25%20since%20my%20first%20investment!%20Check%20your%20real-time%20profit%20on%20EthCalc%20-%3E%20https://condolent.xyz/eth");
				
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error talking with the API");
				console.log(jqXHR.status);
			},
			dataType: "json"
		});
	}
	
});