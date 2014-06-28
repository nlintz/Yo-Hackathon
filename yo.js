var tessel = require('tessel');

var http = require('http');

function YoAll() {
  // Build the post string from an object
  var post_data = 'api_token='+encodeURIComponent('c9104117-6279-12ab-6a23-ecb1b17d3e44');

  // An object of options to indicate where to post to
  var post_options = {
      hostname: 'api.justyo.co',
      port: '80',
      path: '/yoall',
      method: 'POST',
      headers: {
          'Content-Length': post_data.length
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      console.log(res.statusCode);
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

}

setTimeout(function(){}, 10000);

YoAll();
