var cameraTracker = {
  first: true,
  base: 440,
  maxValue:880,
  baseNum: 0,
  size:0,
  lowSize:1023,
  highSize:11554,
  calibrated: 0,
  tracker: null,
  stop: false,
  init: function () {
    console.log('tracker init');
      cameraTracker.calibrate();
      var filters = document.querySelectorAll('.fn-modulate-btn');
      
      filters.forEach(function(button) {
        button.addEventListener('click', function(e) {
          cameraTracker.trackElement(e.currentTarget)
        });
      });
  },  
  
  calibrate: function () {
    var buttonTop    = document.querySelector('.fn-calibrate-top');
    var buttonBottom = document.querySelector('.fn-calibrate-bottom');
    var video        = document.querySelector('.fn-video-calibrate');
    var canvas       = document.querySelector('.fn-canvas-calibrate');

    cameraTracker.showCamera(video, canvas, true, document.querySelector('.calibrate-done'), function () {
      changePage.showPage('filters')
    });

    buttonTop.addEventListener('click', function (e) {
      cameraTracker.saveCalibrate(e.currentTarget, 'lowSize', cameraTracker.size);      
    })
    
    buttonBottom.addEventListener('click', function (e) {
      cameraTracker.saveCalibrate(e.currentTarget, 'highSize', cameraTracker.size);      
    })
  },

  saveCalibrate: function (button, type, value) {
    
    if(value !== 0) {
      
      button.classList.add('checked')
      cameraTracker.lowSize = button.innerHTML = cameraTracker.size;
      cameraTracker.finishCalibrate();
    }
  },

  finishCalibrate: function () {
    var buttonTop    = document.querySelector('.fn-calibrate-top');
    var buttonBottom = document.querySelector('.fn-calibrate-bottom');
    console.log('can we fiish?');
    if(buttonTop.classList.contains('checked') && buttonBottom.classList.contains('checked')) {
      document.querySelector('.fn-calibrate-buttons').classList.add('finished');
    }
  },
  trackerData: function (data) {
    console.log('the new size is', data.width * data.height);
    var size = data.width * data.height;
    if(size > cameraTracker.highSize) {
      console.log('je gaat over de max');
    } else if (size < cameraTracker.lowSize) {
      console.log('je bent de laag');
    } else {
      // console.log('je zit er tussen');
      var calculateableNum = cameraTracker.lowSize - cameraTracker.highSize;
      // var percentage = ((size - cameraTracker.highSize) * 100) / cameraTracker.highSize;
      var percentage = ((size - cameraTracker.highSize) / calculateableNum) * 100
      console.log('het percentage is ', percentage);
    }
  },
  showCamera: function (video, canvas, showTrack, stopButton, callback) {
    var first   = true;
    var context = canvas.getContext('2d');
    var tracker = new tracking.ColorTracker(['yellow']);
    var trackThing = tracking.track(video, tracker, { camera: true , fps:1});
 
    tracker.on('track', function(event) {
      context.clearRect(0, 0, canvas.width, canvas.height);
     if(showTrack) {
      if(first) {
        first = !first;
        canvas.height = video.offsetHeight;
        canvas.width  = video.offsetWidth;
      }
      cameraTracker.drawRectangle(event.data, context, tracker.colors[0])
      
     } else {
      cameraTracker.trackerData(event.data[0]);


     }
    });


    stopButton.addEventListener('click', function(e) {
        trackThing.stop();
        callback(); 
        // video.parentNode.removeChild(video)
        // canvas.parentNode.removeChild(canvas)
        
    });
  },
  drawRectangle: function (data, context, color) {
    data.forEach(function(rect) {
      rect.color         = color;
      context.fillStyle  = rect.color;
      cameraTracker.size = rect.width * rect.height;

      context.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
      
  },
  trackElement: function(element) {
    var video        = document.querySelector('.fn-video-calibrate');
    var canvas       = document.querySelector('.fn-canvas-calibrate');

    if(!element.classList.contains('active')) {
      body.setAttribute('tracking', element.getAttribute('filter-index'))
      element.classList.add('active');
       cameraTracker.showCamera(video, canvas, false, element, function () {
        changePage.showPage('filters')
      });
    } else {
      body.removeAttribute('tracking')
      element.classList.remove('active');
    }
  },
  
  randomFUnction : function () {
//      smooth: function(array) {
//         var array = [10, 13, 7, 11, 12, 9, 6, 5];

// function smooth(values, alpha) {
//     var weighted = average(values) * alpha;
//     var smoothed = [];
//     for (var i in values) {
//         var curr = values[i];
//         var prev = smoothed[i - 1] || values[values.length - 1];
//         var next = curr || values[0];
//         var improved = Number(average([weighted, prev, curr, next]).toFixed(2));
//         smoothed.push(improved);
//     }
//     return smoothed;
// }

// function average(data) {
//     var sum = data.reduce(function(sum, value) {
//         return sum + value;
//     }, 0);
//     var avg = sum / data.length;
//     return avg;
// }

// var a  = array;
// console.log(a);
// var d3data = [];
// for(var i in a ) {
//   d3data.push({
//     letter: i,
//     frequency: a[i],
//   })
// }
//   console.log(d3data);
// },
//   },
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