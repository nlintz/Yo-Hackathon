var Yo = require('yoapi');
var spawn = require('child_process').spawn;
var tessel = require('tessel');
var cmd = spawn('/usr/local/bin/tessel', ['run', './tessel_code/ambient-trigger.js'], {stdio:'pipe'});

cmd.stdout.on('data', function(message) {
  var y = new Yo({
      'api_token': 'c9104117-6279-12ab-6a23-ecb1b17d3e44'
  });

  y.yoAll(function(err, data){
      if(err){
          console.error(err);
      }else{
          console.info(data);
      }
  });
})
