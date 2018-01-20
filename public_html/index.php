<html>
<head>
	<title>EthCalc</title>
	
	<link rel="stylesheet" href="style.css">
	<link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
	<link rel="icon" href="https://files.coinmarketcap.com/static/img/coins/32x32/ethereum.png"/>
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
		<a class="btn" style="padding: 7px 11px;" href="https://github.com/condolent" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
	</div>
	
	<div class="textinputs">
		<label for="input">Input in €</label>
		<input id="input" type="text" placeholder="€ Input" /><br />
		<label for="coins">Amount of ETH</label>
		<input id="coins" type="text" placeholder="# Coins" /><br />
		<button id="submit" value="Submit">Submit</button>
	</div>
	
	<h1></h1>
	<p class="sub"></p>
	
	<script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
	<script src="script.js"></script>
	<script src="modal.js"></script>
</body>
</html>