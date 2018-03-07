$(document).ready(function() {
	
	setInterval(repeater, 10000);
	
	var titleStart = false;
	
	var currency;
	var coin;
	var coinName;
	
	var ready = false;
	
	var twitter = $("#twitter");
	twitter.attr("href", "https://twitter.com/intent/tweet?text=Check%20out%20this%20online%20Cryptocurrency%20profit%20calculator! >> https://condolent.xyz/eth");
	
	var input; // What I have put in
	var coins; // How many coins I currently have
	var fee; // Optional transactional fee to include
	var feeTotal; // The fee amount
	
	var inputField = $("#input");
	var coinsField = $("#coins");
	var feeField = $("#fee");
	var submit = $("#submit");
	var currSelect = $("#currency");
	var coinSelect = $("#coin");
	
	var currencySign;
	
	if(Cookies.get("coins") && Cookies.get("input") && Cookies.get("currency") && Cookies.get("coin")) {
		input = Cookies.get("input");
		coins = Cookies.get("coins");
		fee = Cookies.get("fee");
		currency = Cookies.get("currency");
		coin = Cookies.get("coin");
		
		currSelect.val(currency);
		coinSelect.val(coin);
		
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
			
			currency = currSelect.val();
			coin = coinSelect.val();
			
			Cookies.set("input", input, { expires: 365, path: '' });
			Cookies.set("coins", coins, { expires: 365, path: '' });
			Cookies.set("fee", fee, { expires: 365, path: '' });
			Cookies.set("currency", currency, { expires: 365, path: '' });
			Cookies.set("coin", coin, { expires: 365, path: '' });
			
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
		switch(coin) {
			case "ETH":
			{
				coinName = "Ethereum";
				break;
			}
			case "BTC":
			{
				coinName = "Bitcoin";
				break;
			}
			case "XRP":
			{
				coinName = "Ripple";
				break;
			}
			case "LTC":
			{
				coinName = "Litecoin";
				break;
			}
		}
		
		switch(currency) {
			case "EUR":
			{
				currencySign = "€";
				break;
			}
			case "USD":
			{
				currencySign = "$";
				break;
			}
			case "GBP":
			{
				currencySign = "£";
				break;
			}
			case "SEK":
			{
				currencySign = "SEK";
				break;
			}
		}
		
		$.ajax({
			type:"GET", 
			url: "https://api.coinmarketcap.com/v1/ticker/" + coinName + "/?convert=" + currency, 
			success: function(data) {
				
				var percent = $("h1");
				var txt = $(".sub");
				
				var r24 = data[0].percent_change_24h;
				
				switch(currency) {
					case "EUR":
					{
						var price = data[0].price_eur; // Price for 1.0 coin (€)
						break;
					}
					case "USD":
					{
						var price = data[0].price_usd; // Price for 1.0 coin ($)
						break;
					}
					case "GBP":
					{
						var price = data[0].price_gbp;
					}
					case "SEK":
					{
						var price = data[0].price_sek;
					}
				}
				
				var qty = input / price; // The amount of coins I get for my input with current price
				
				if(feeField.val() != "")
					var value = (coins * price) * (1.0 - (fee / 100)); // How much my coins currently are worth, subtracting the transactional fee
				else
					var value = (coins * price); // How much my coins currently are worth
				
				
				feeTotal = value * (fee / 100);
				
				var profit = 100*(value - input) / input;
				
				percent.text(profit.toFixed(2) + "%");
				if(feeField.val() != "")
					txt.html("You purchased " + coins + " " + coin + " for " + currencySign + input + " which is currently worth " + currencySign + value.toFixed(2) + ".<br/>Including a " + fee + "% fee, totalling " + feeTotal.toFixed(2) + "€.<br /> The value of " + coinName + " has changed by " + r24 + "% the last 24hrs!");
				else
					txt.html("You purchased " + coins + " " + coin + " for " + currencySign + input + " which is currently worth " + currencySign + value.toFixed(2) + ".<br/> The value of " + coinName + " has changed by " + r24 + "% the last 24hrs!");
				
				
				if(profit < 0) {
					percent.css("color", "#b54d4d");
				} else {
					percent.css("color", "#4db559");
				}
				
				twitter.attr("href", "https://twitter.com/intent/tweet?text=I%20just%20found%20out%20that%20my%20Ethereum%20investment%20has%20changed%20by%20" + profit.toFixed(2) + "%25%20since%20my%20first%20investment!%20Check%20your%20real-time%20profit%20on%20EthCalc%20>>%20https://condolent.xyz/eth");
				
				if(titleStart == false) {
					setInterval(title, 3000); // Window title changer
					titleStart = true;
				}
				
				var titleChangr;
				
				function title() {
					if(ready) {
						if(titleChangr == 0) {
							document.title = profit.toFixed(2) + "% | " + r24 + "% last 24hrs";
							titleChangr = 1;
						}
						else {
							document.title = "EthCalc - Calculate your profits of Ethereum investments";
							titleChangr = 0;
						}
					}
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