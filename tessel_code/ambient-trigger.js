var tessel = require('tessel');
var ambientlib = require('ambient-attx4');// Replace '../' with 'ambient-attx4' in your own code
var ambient = ambientlib.use(tessel.port['A']);
var camera = require('camera-vc0706').use(tessel.port['B']); 
var notificationLED = tessel.led[3]; // Set up an LED to notify when we're taking a picture

function ambientTrigger (callback) {
  var cb = callback;
  ambient.on('ready', function () {
    ambient.setSoundTrigger(0.1);

    ambient.on('sound-trigger', function(data) {
      callback(data);
      ambient.clearSoundTrigger();

      setTimeout(function () {
          ambient.setSoundTrigger(0.1, cb);
      }, 1500);
    });
  });
}

// EXAMPLE CODE
ambientTrigger(function (data) {
  console.log("Warning! Activity Detected. Level:", data)
  camera.takePicture(function(err, image) {
    notificationLED.high();
    if (err) {
      console.log('error taking image', err);
    } else {
      notificationLED.low();
      // Name the image
      var name = 'picture-' + Math.floor(Date.now()*1000) + '.jpg';
      // Save the image
      process.sendfile(name, image);
      // Turn the camera off to end the script
      camera.disable();
      notificationLED.low();
    }
  })

});

tessel.button.on('press',function(time){
  console.log('Send Help!');
});

module.exports = ambientTrigger;