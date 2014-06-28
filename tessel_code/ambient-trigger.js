var tessel = require('tessel');
var ambientlib = require('ambient-attx4');// Replace '../' with 'ambient-attx4' in your own code
console.log('running')
var ambient = ambientlib.use(tessel.port['A']);

function ambientTrigger (callback) {
  ambient.on('ready', function () {
    console.log('Sound Trigger Activated:')
    ambient.setSoundTrigger(0.1);

    ambient.on('sound-trigger', function(data) {
      callback();
      ambient.clearSoundTrigger();

      setTimeout(function () {
          ambient.setSoundTrigger(0.1);
      }, 1500);
    });
  });
}

// EXAMPLE CODE
ambientTrigger(function () {
  console.log('triggers')
})

module.exports = ambientTrigger;