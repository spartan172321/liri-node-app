var Twitter = require('twitter');
var lock = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

// var to hold user input
var req = process.argv[2];
var nameArr = []
var name = ''


for(var i = 3; i<process.argv.length; i++){
	nameArr.push(process.argv[i]);
	name = nameArr.join(' ')
}
// console.log(name)


// my-tweets


var client = new Twitter(lock.keys);
var params = {screen_name: 'hungryhunger172', count: '20'};
if(req === 'my-tweets'){
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	if (!error && response.statusCode === 200) {
		var x;
		var i = 1;
		for(x in tweets){
			console.log(i +': '+ tweets[x]['created_at']);
	    console.log(tweets[x]['text']);
	    console.log('=======================');
	    i++
		}
  }
	});
}



// spotify-this-song


var spotify = new Spotify(lock.spotKeys);

if(req === 'spotify-this-song'){
	spoty();
}


function spoty(){
	var item;
	spotify.search({type: 'track', query: name, limit:'1'}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  else if(data['tracks']['total'] == 0){
  	console.log('"The Sign" by Ace of Base');
  }
  else{
  	item = data['tracks']['items'][0];
  	//   	Artist(s)
  	console.log('Artist(s): '+ item['artists'][0]['name']); 

  	// The song's name
  	console.log(`Song's name: `+item['name']); 

  	// A preview link of the song from Spotify
  	console.log('Preview link: '+item['preview_url']); 

  	// The album that the song is from
  	console.log('Album name: '+item['album']['name']); 
  }

});
}


// movie-this
if(req === 'movie-this'){

	if(name === ''){
		name = 'Mr. Nobody';
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=40e9cece";

	// This line is just to help us debug against the actual URL.
	// console.log(queryUrl);


	request(queryUrl, function(error, response, body) {

	  if (!error && response.statusCode === 200) {
		  var movieInfo = JSON.parse(body)
			//* Title of the movie.
			console.log('Title: '+movieInfo.Title);
		  // * Year the movie came out.
		  console.log('Year: '+movieInfo.Year);
		  // * IMDB Rating of the movie.
		  console.log('IMDB Rating: '+movieInfo.imdbRating);
		  // * Country where the movie was produced.
		  console.log('Country: '+movieInfo.Country);
		  // * Language of the movie.
		  console.log('Language: '+movieInfo.Language);
		  // * Plot of the movie.
		  console.log('Plot: '+movieInfo.Plot);
		  // * Actors in the movie.
		  console.log('Actors: '+movieInfo.Actors);
		  // * Rotten Tomatoes URL.
		  console.log('Rotten Tomatoes URL: '+movieInfo.Title);
	  }
	});

}


// do-what-it-says
if(req === 'do-what-it-says'){
	fs.readFile("random.txt", "utf8", function(error, data) {

	  // If the code experiences any errors it will log the error to the console.
	  if (error) {
	    return console.log(error);
	  }

	  // We will then print the contents of data
	  var dataArr = data.split(",");
	  name = dataArr[1];
	  spoty()
	});
}

