// var cameraTracker = {
//   first: true,
//   base: 440,
//   maxValue:880,
//   baseNum: 0,
//   size:0,
//   lowSize:null,
//   highSize:null,
//   calibrated: 0,
//   tracker: null,
//   stop: false,
  

//   init: function () {
    
//      cameraTracker.video   = document.querySelector('.fn-video-calibrate');
//      cameraTracker.canvas  = document.querySelector('.fn-canvas-calibrate');
//      cameraTracker.context = cameraTracker.canvas.getContext('2d');
//       // cameraTracker.calibrate();
//       if(data.supportMedia) {
//         cameraTracker.calibrate();
//         } else {
//         cameraTracker.removeCamera();
//       }
      
//   },  
//   checkSupport: function (callback) {
//     var support = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
//     data.supportMedia = support ? true : false;
    
//     return data.supportMedia;
//   },
//   removeCamera: function () {
    
//     if(!data.supportMedia) {
//       var elements = document.querySelectorAll('.fn-hide-support');

//       if(elements.length) {
//         for(var i = 0; i < elements.length; i++) {
//           elements[i].parentNode.removeChild(elements[i]);
//         }
//       }
//     }
//   },
//   calibrate: function () {
//     var buttonTop    = document.querySelector('.fn-calibrate-top');
//     var buttonStop   = document.querySelector('.fn-calibrate-top');
//     var startButton = document.querySelector('#test-btn');
//     var buttonBottom = document.querySelector('.fn-calibrate-bottom');
//     var first        = true;
//     var tracker      = new tracking.ColorTracker(['yellow']);
//     var trackThing   = tracking.track(cameraTracker.video, tracker, { camera: true });
    
  
//     tracker.on('track', function(event) {
      
//       if(first) {
//         first = !first;
//         cameraTracker.canvas.height = cameraTracker.video.offsetHeight;
//         cameraTracker.canvas.width  = cameraTracker.video.offsetWidth;
//       }
//       cameraTracker.context.clearRect(0, 0, 1000, 1000);
//       cameraTracker.drawRectangle(event.data, cameraTracker.context, tracker.colors[0])
//     });

//     document.querySelector('.calibrate-done').addEventListener('click', function(e) {
//         trackThing.stop();
//         audio.setup();
//         changePage.showPage('filters')
        
//     });

//     buttonTop.addEventListener('click', function (e) {
//       cameraTracker.saveCalibrate(e.currentTarget, 'lowSize', cameraTracker.size);      
//     })
    
//     buttonBottom.addEventListener('click', function (e) {
//       cameraTracker.saveCalibrate(e.currentTarget, 'highSize', cameraTracker.size);      
//     })
//   },

//   startElementTracking: function (callback, element) {
//     var tracker = new tracking.ColorTracker(['yellow']);
//     var trackThing = tracking.track(cameraTracker.video, tracker, { camera: true})
    

//     tracker.on('track', function(event, trackThing) {
//         var data = event.data[0];
//         if(data) {
//           var size = data.width * data.height;
//           if(size < cameraTracker.highSize) {
//             body.setAttribute('tracking-status', 'high');
//           } else if (size > cameraTracker.lowSize) {
//             body.setAttribute('tracking-status', 'low');
//           } else {
//             body.setAttribute('tracking-status', 'ok');
//             var calculateableNum = cameraTracker.lowSize - cameraTracker.highSize;
//             var percentage       = ((size - cameraTracker.highSize) / calculateableNum) * 100;
//             callback(percentage)
//           }
           
         
//         }
//     });
//     element.addEventListener('click', function (e) {
//       trackThing.stop();
//       e.target.removeEventListener('click', arguments.callee)
//     })

//   },

//   saveCalibrate: function (button, type, value) {
//     var buttonTop    = document.querySelector('.fn-calibrate-top');
//     var buttonBottom = document.querySelector('.fn-calibrate-bottom');

//     if(value !== 0) {
//       button.classList.add('checked')
//       cameraTracker[type] = button.innerHTML = cameraTracker.size;

//       if(buttonTop.classList.contains('checked') && buttonBottom.classList.contains('checked')) {
//       buttonTop.parentNode.classList.add('finished');
//       }
//     }
//   },
  
//   drawRectangle: function (data, context, color) {
//     data.forEach(function(rect) {
//       rect.color         = color;
//       context.fillStyle  = rect.color;
//       cameraTracker.size = rect.width * rect.height;

//       context.fillRect(rect.x, rect.y, rect.width, rect.height);
//     });
      
//   },
//   trackElement: function(element) {
//     var type = element.getAttribute('modulate-type');
//     var slider = document.querySelector('.fn-fallback-filter[type="'+type+'"]');


//       if(!element.classList.contains('active')) {
//       body.setAttribute('tracking', element.getAttribute('filter-index'))
//       element.classList.add('active');
//       if(data.supportMedia) {
//          cameraTracker.startElementTracking(function (value) {
          
//           filters.update(element.getAttribute('modulate-type'), value);
//           sendSocket.send('updateFilter',data.group._id, {
//                 type:element.getAttribute('modulate-type'),
//                 value: value
//               })
//         }, element);
//        } else {
//         slider.classList.add('active');
        
//         // element.getAttribute()
//        }
       
       
//     } else {
//       body.removeAttribute('tracking')
//       element.classList.remove('active');
//       cameraTracker.stop = true;
//       slider.classList.remove('active');
//     }
//   },
// }
//   