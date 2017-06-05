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
  },  
  
  calibrate: function () {
    var buttonTop    = document.querySelector('.fn-calibrate-top');
    var buttonBottom = document.querySelector('.fn-calibrate-bottom');
    var video        = document.querySelector('.fn-video-calibrate');
    var canvas       = document.querySelector('.fn-canvas-calibrate');

    cameraTracker.showCamera(video, canvas, true, document.querySelector('.calibrate-done'),false, function () {
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
  
  trackerData: function (data, max) {
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
      var percentage = ((size - cameraTracker.highSize) / calculateableNum) * 100;
      console.log('het percentage is ', percentage);
      cameraTracker.parseData(percentage, max)
    }
  },
  parseData: function (percentage, max) {
    
    var newValue = (max * percentage)/100;
    console.log(newValue);
    // var oldPercentage = (oldData.value * 100) / oldData.max;

  },
  showCamera: function (video, canvas, showTrack, stopButton, max, callback) {
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
      if(event.data.length) {cameraTracker.trackerData(event.data[0], oldData);}


     }
    });


    stopButton.addEventListener('click', function(e) {
        trackThing.stop();
        callback(); 
        
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
      
       cameraTracker.showCamera(video, canvas, false, element,20, function () {
        // changePage.showPage('filters')
      });
    } else {
      body.removeAttribute('tracking')
      element.classList.remove('active');
    }
  },
  stopTracking: function (element) {

  }
  

 

}