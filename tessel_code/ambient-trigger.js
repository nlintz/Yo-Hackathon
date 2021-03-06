var tessel = require('tessel');
var ambientlib = require('ambient-attx4');// Replace '../' with 'ambient-attx4' in your own code
var ambient = ambientlib.use(tessel.port['A']);
var camera = require('camera-vc0706').use(tessel.port['B']); 
var notificationLED = tessel.led[3]; // Set up an LED to notify when we're taking a picture

camera.on('ready', function () {
  cameraReady = true;
});

function ambientTrigger (callback) {

  ambient.on('ready', function () {
    ambient.setSoundTrigger(0.1);

    ambient.on('sound-trigger', function(data) {
      ambient.clearSoundTrigger(function () {
        if (data > .12) {
          callback("HIGH");
        } else {
          callback("LOW")
        }
      });

      setTimeout(function () {
          ambient.setSoundTrigger(0.15);
      }, 1500);
    });
  });
}

// EXAMPLE CODE
ambientTrigger(function (data) {
  console.log("Warning! Activity Detected - Danger Level:", data)
  if (cameraReady) 
  {
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
  }

});

tessel.button.on('press',function(time){
  console.log('Send Help!');
});

module.exports = ambientTrigger;