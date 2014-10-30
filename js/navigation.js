// JavaScript Document
$(document).ready(function(e) {
	
	var url = window.location.href;
	var value = url.substring(url.lastIndexOf('/') + 1);
	
	/*when coming from external page*/
	if(value == 'index.html'){
		$('header a#home_page').addClass('selected');
	}
	if(value == 'find_your_broker.html'){
		$('header a#find_your_broker_page').addClass('selected');
	}
//	if(value == 'all_brokers_comparison.html' || 'demo_account_comparison.html' || 'bitcoin_brokers.html'){
//		$('header a#compare_brokers_page').addClass('selected');
//	}
//	if(value == 'BancDeBinary_reviews.html' || 'PowerOption_reviews.html' || 'TopOption_reviews.html'){
//		$('header a#top_brokers_reviews_page').addClass('selected');
//	}
	if(value == 'binary_acdemy.html'){
		$('header .nav_line ul.nav li a#binary_acdemy_page').addClass('selected');
	}
	if(value == 'binary_option_news.html'){
		$('header .nav_line ul.nav li a#news_page').addClass('selected');
	}
	if(value == 'trading_assest.html'){
		$('header a#trading_assest_page').addClass('selected');
	}
	

});//END

$('header .h_mobile ul.nav_mobile li a').on('click', function(e){
	e.preventDefault();
	var is_opened = $(this).next('ul').is('.open');
	$('ul').removeClass('open');
	if(is_opened==false){
		$(this).next().addClass('open');
	}
});