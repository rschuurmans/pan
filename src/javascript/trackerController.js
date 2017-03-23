var cameraTracker = {
  first: true,
  base: 440,
  maxValue:880,
  baseNum: 0,
  init: function () {
    console.log('tracker init');
    cameraTracker.camera();
  },
  camera: function () {
    var arr = [];
    var info  = document.querySelector('.fn-info');
    var video = document.querySelector('video');
    var meter = document.querySelector('.fn-tracking-meter');

    
    var tracker = new tracking.ColorTracker(['yellow']);

    tracking.track(video, tracker, { camera: true });

    tracker.on('track', function(event) {

      if(event.data[0]) {
        var biggest = 0;
        for(var i in event.data) {

          if(event.data[i].width > biggest) {
            biggest = event.data[i].width;
          }
          arr.push(biggest)
        }
      }
    });

    window.setInterval(function () {
      if(arr.length) {
        cameraTracker.audioInterval(arr, meter);
        arr = [];
      }
    },200)

  },

  audioInterval: function (arr, meter) {
    var avg = cameraTracker.calculateAverage(arr);

    var info  = document.querySelector('.fn-info');

    if(cameraTracker.first) {
      console.log('first');
      cameraTracker.first = false;
      cameraTracker.baseNum = avg;
      console.log(cameraTracker.first, cameraTracker.baseNum);
    }
    if(avg) {
        var a       = avg * cameraTracker.base;
        var newFreq = a / cameraTracker.baseNum;
        
        info.textContent = newFreq;

        if(newFreq > cameraTracker.maxValue) {
          newFreq = cameraTracker.maxValue;
        } else if( newFreq < 200) {
          newFreq = 220;
        }
        
        var b = 100 * newFreq;
        var percentage = b / cameraTracker.maxValue;
        
      

        cameraTracker.updateMeter(meter, percentage);
        
      } else {
        console.log('no colors detected');
      }
  },
  calculateAverage: function (arr) {
    var sum = 0;
    for(var i = 0; i < arr.length;i++) {
      sum += arr[i];
    }
    if(arr.length) {
      return sum / arr.length
    } else {
      return false;
    }
  },
  updateMeter: function (meter, value) {
    value = value - 50;
    value = value * 2;

    console.log('updateMeter');
    meter.style.width = value + '%';
    meter.style.height = value + '%';

  }

}