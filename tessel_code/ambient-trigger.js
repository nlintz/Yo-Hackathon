var tessel = require('tessel');
var ambientlib = require('ambient-attx4');// Replace '../' with 'ambient-attx4' in your own code
var ambient = ambientlib.use(tessel.port['A']);
var camera = require('camera-vc0706').use(tessel.port['B']); 
var notificationLED = tessel.led[3]; // Set up an LED to notify when we're taking a picture

camera.on('ready', function () {
  cameraReady = true;
})

function ambientTrigger (callback) {
  ambient.on('ready', function (err) {

    ambient.setSoundTrigger(0.1);

    ambient.on('sound-trigger', function(data) {
      console.log(data, callback)
      if (data != undefined) {
        callback(data)
      };
      
      ambient.clearSoundTrigger();

      setTimeout(function () {
          ambient.setSoundTrigger(0.1);
      }, 1500);
    });
  });
}

// EXAMPLE CODE
ambientTrigger(function (data) {
  console.log("Warning! Activity Detected. Level:", data)
  if (cameraReady) 
  {
    camera.takePicture(function(err, image) {
    })
  }

});

tessel.button.on('press',function(time){
  console.log('Send Help!');
});

module.exports = ambientTrigger;