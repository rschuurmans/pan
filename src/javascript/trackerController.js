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
    
     cameraTracker.video   = document.querySelector('.fn-video-calibrate');
     cameraTracker.canvas  = document.querySelector('.fn-canvas-calibrate');
     cameraTracker.context = cameraTracker.canvas.getContext('2d');
      cameraTracker.calibrate();
  },  
  
  calibrate: function () {
    var buttonTop    = document.querySelector('.fn-calibrate-top');
    var buttonStop   = document.querySelector('.fn-calibrate-top');
    var buttonBottom = document.querySelector('.fn-calibrate-bottom');
    var first        = true;
    var tracker      = new tracking.ColorTracker(['yellow']);
    var trackThing   = tracking.track(cameraTracker.video, tracker, { camera: true });
  
    tracker.on('track', function(event) {
      
      if(first) {
        first = !first;
        cameraTracker.canvas.height = cameraTracker.video.offsetHeight;
        cameraTracker.canvas.width  = cameraTracker.video.offsetWidth;
      }
      cameraTracker.context.clearRect(0, 0, 600, 500);
      cameraTracker.drawRectangle(event.data, cameraTracker.context, tracker.colors[0])
    });

    document.querySelector('.calibrate-done').addEventListener('click', function(e) {
        trackThing.stop();
        changePage.showPage('filters')
        
    });

    buttonTop.addEventListener('click', function (e) {
      cameraTracker.saveCalibrate(e.currentTarget, 'lowSize', cameraTracker.size);      
    })
    
    buttonBottom.addEventListener('click', function (e) {
      cameraTracker.saveCalibrate(e.currentTarget, 'highSize', cameraTracker.size);      
    })
  },

  startElementTracking: function (callback, element) {
    var tracker = new tracking.ColorTracker(['yellow']);
    var trackThing = tracking.track(cameraTracker.video, tracker, { camera: true})
    

    tracker.on('track', function(event, trackThing) {
        var data = event.data[0];
        if(data) {
          var size = data.width * data.height;
          
          if(size < cameraTracker.highSize) {
            body.setAttribute('tracking-status', 'high');
          } else if (size > cameraTracker.lowSize) {
            body.setAttribute('tracking-status', 'low');
          } else {
            body.setAttribute('tracking-status', 'ok');
            var calculateableNum = cameraTracker.lowSize - cameraTracker.highSize;
            var percentage       = ((size - cameraTracker.highSize) / calculateableNum) * 100;
            callback(percentage)
          }
           
         
        }
    });
    element.addEventListener('click', function (e) {
      trackThing.stop();
      e.target.removeEventListener('click', arguments.callee)
    })

  },

  saveCalibrate: function (button, type, value) {
    var buttonTop    = document.querySelector('.fn-calibrate-top');
    var buttonBottom = document.querySelector('.fn-calibrate-bottom');

    if(value !== 0) {
      button.classList.add('checked')
      cameraTracker[type] = button.innerHTML = cameraTracker.size;

      if(buttonTop.classList.contains('checked') && buttonBottom.classList.contains('checked')) {
      buttonTop.parentNode.classList.add('finished');
      }
    }
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
      if(!element.classList.contains('active')) {
      body.setAttribute('tracking', element.getAttribute('filter-index'))
      element.classList.add('active');
        cameraTracker.startElementTracking(function (value) {
          filters.update(element.getAttribute('modulate-type'), value)
        }, element);
       
    } else {
      body.removeAttribute('tracking')
      element.classList.remove('active');
      cameraTracker.stop = true;
    }
  },
}
  