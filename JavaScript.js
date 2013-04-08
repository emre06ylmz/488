
	var interval ;
	var searchTime = 10;
	var searchCount = 5;
	var tempsearchTime = 10;
	var tempsearchCount = 5;
	
	$(document).ready(function(){
		dissappearAdvancedSearch();
		document.getElementById("tweeets").style.visibility="hidden";
	});
	
	function startSearch(){
		document.getElementById("tweeets").setAttribute("style", "border:0px solid #3090FF");
		clearInterval(interval);
		var searchWord = document.getElementById('searchText').value;
		searchTime = tempsearchTime;
		searchCount = tempsearchCount;
		process(searchWord);
		interval = setInterval(function(){process(searchWord)},searchTime*1000);
	}
	
	function appearAdvancedSearch(){
		document.getElementById("row").style.visibility="visible";
	}
	
	function dissappearAdvancedSearch(){
		document.getElementById("row").style.visibility="hidden";
	}
	
	function applyAdvancedSearchChange(){
		dissappearAdvancedSearch();
		tempsearchTime = parseInt(document.getElementById('timeSelect').value);
		tempsearchCount = parseInt(document.getElementById('tweetSelect').value);
	}
	
	function process(searchWord){
		if(searchWord){
			var searchUrl = "http://search.twitter.com/search.json?callback=?&rpp="+searchCount+"&q=" + searchWord;
			getTweets(searchUrl);
		}
		else{}	
	}
	
	function getTweets(api) {
		document.getElementById("tweeets").style.visibility="hidden";
		$.getJSON(api, function(data) {
			applyTwitterTemplate(data);
		});
	}
	
	function resetSearchBox(){
		if(document.getElementById('searchText').value.length==0){
			document.getElementById('searchText').value='Type text here...';
		}
	}
		
		
	function applyTwitterTemplate(data) {
		var images = new Array();
		var user_names = new Array();
		var nick_names = new Array();
		var tweet_dates = new Array();
		var tweet_contents = new Array();
			
		var counter = 0;
		$.each( data.results, function( index, item ) {
			images[counter] = item.profile_image_url;
			user_names[counter] = item.from_user_name;
			nick_names[counter] = item.from_user;
			tweet_dates[counter] = item.created_at;
			tweet_contents[counter] = item.text;
			counter++;
		});
			
		document.getElementById("tweeets").innerHTML = "";
		document.getElementById("tweeets").setAttribute("style", "border:1px solid #3090FF"); 
			
		var number = 0
		for(var i = 0 ; i<counter ; i++){
			number++;
			document.getElementById("tweeets").innerHTML += 
				"<table width=\"950\" style=\" margin:20px 0 20px 0; \" >"+
					"<tr>"+
						"<td width=\"75\" ><img width=\"60\" height=\"60\" src="+images[i] +"></td>"+
						"<td width=\"800\"><i style=\" font-size: 20px; color : #3090FF\">full name:</i>"+"  "+ user_names[i]+"   " + " <i style=\" font-size: 20px; color : #3090FF\">user name:</i>"+"   "+"<a style=\"color : #FF0000\" href=\"https://twitter.com/\">"+ nick_names[i]+"</a>" + "<i style=\" font-size: 20px; color : #3090FF\">tweet date:</i>"+"   " + tweet_dates[i] + "<br>"+"   " + "<i style=\" font-size: 20px; color : #3090FF\">tweet:</i>"+"   " + tweet_contents[i] +"</td>"+
					"</tr>"+
				"</table>";
			if(i<counter-1){
				document.getElementById("tweeets").innerHTML += "<div><hr style=\"color:#3090FF;\"></div>";		
			}
		}
		if(number == 0){
			document.getElementById("tweeets").innerHTML += "<p style=\" font-size: 20px; color : #3090FF\" >Sorry... No Tweet Found</p>"
			clearInterval(interval);
		}
		document.getElementById("tweeets").style.visibility="visible";
	}