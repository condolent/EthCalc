<html>
<head>
	<title>EthCalc - Calculate your profits of Ethereum investments</title>
	
	<link rel="stylesheet" href="style/style.min.css">
	<link rel="stylesheet" href="style/fonts/font-awesome/css/font-awesome.min.css">
	
	<!-- MISC -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="https://condolent.xyz/eth/ethereum.png"/>
	<meta name="robots" content="index,follow" />
	
	<!-- META TAGS -->
	<meta name="description" content="Calculate your profits or loss of your Ethereum purchases/investments. Keep track of your investment!" />
	<meta name="keywords" content="ethereum,coin,crypto,currency,cryptocurrency,profit,calculator" />
	<meta name="author" content="Jonathan Öhrström" />
	
	<meta property="og:url" content="https://condolent.xyz/eth">
</head>
<body>
	<div class="modal">
		<div class="modal-content">
			<div class="modal-header">
				<span class="close closer">&times;</span>
				<h2></h2>
			</div>
			<div class="modal-body"></div>
			<div class="modal-footer">
				<p>Version 1.6.3</p>
				<a class="button closer">Close</a>
			</div>
		</div>
	</div>
	
	<div class="links">
		<a id="modalbtn" class="btn" data-title="What the f#!$k is this?" data-content="
		<p>Oh hey, I didn't really expect you here.. How did you even find this page..?</p>
		<p>Anyway, this is basically just a small script calculating the percentage of profit you've gained on investing in Ethereum.</p>
		<p>You simply supply the information of how much money (in euros €) you invested and how many coins you got from it. The script then talks to coinmarketcap.com in real-time, calculates what your coins are worth currently
		and shows in a percentage-format how much you've gained/lost!</p>
		<p>Also, the script saves the supplied information via cookies, which means you won't have to type in that information each time you want a number on your profit. You simply load this webpage and it'll tell you straight away!</p>
		<p>What if you've recently increased your investment? No worries, simply update the text-values to the right and hit submit!</p>
		">?</a>
		<a class="btn" style="padding: 7px 11px;" href="https://github.com/condolent/EthCalc" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
		<a id="twitter" class="btn" style="padding: 7px 11px;" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>
	</div>
	
	<div class="textinputs">
		<label for="input">Cost</label><br>
		<input id="input" type="text" placeholder="Total cost of coins" style="width:80%;"/>
		<select style="width:19%" id="currency">
			<option value="EUR">EUR</option>
			<option value="USD">USD</option>
			<option value="GBP">GBP</option>
			<option value="SEK">SEK</option>
		</select>
		<br />
		<label for="coins">Amount of ETH</label>
		<input id="coins" type="text" placeholder="# Coins" style="width: 80%;"/>
		<select style="width: 19%" id="coin">
			<option value="ETH">ETH</option>
			<option value="BTC">BTC</option>
			<option value="XRP">XRP</option>
			<option value="LTC">LTC</option>
		</select>
		<br/>
		<label for="fee">Transactional fee (optional)</label>
		<input id="fee" type="text" placeholder="Transactional fee in %" /><br />
		<button id="submit" value="Submit">Submit</button>
	</div>
	
	<h1></h1>
	<p class="sub"></p>
	
	<script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
	<script src="js/script.js"></script>
	<script src="js/modal.js"></script>
</body>
</html>