
var adsr = {
	getEnvelope: function (groupId) {
  		return   {
            attack: tools.pathObj(data.group, 'adsr.attack.value'),
            decay: tools.pathObj(data.group, 'adsr.decay.value'),
            sustain: .5,
            release: tools.pathObj(data.group, 'adsr.release.value'),
        }
        
	},
	update: function (type, value) {
		data.group.adsr[type].value = parseFloat(value);
		audio.gainNode[type] = parseFloat(value);
	},
	
	init: function () {
		// adsr.drawSVG();
		adsr.sustainEvent();
		var svgLine = document.querySelector('svg .poly');
		var width   = (document.querySelector('.input-range-vert-container').getBoundingClientRect().width)/8;
		var inputs  = document.querySelectorAll('.fn-adsr-range-item');
		
		var points = []
		for(var i = 0; i < inputs.length ;i++) {
			var point = adsr.getPoints(i);
			points.push(point)

		    inputs[i].addEventListener('input', function (e) {
		    	var id = e.currentTarget.id;
				var idNumber = parseInt(e.currentTarget.id.split('adsr-')[1]);
				var type     = e.currentTarget.getAttribute('modulate-type');
				var value    = e.currentTarget.value;

		    	adsr.showActive(id);
		    	adsr.svgUpdate(svgLine, points, idNumber)
		    	adsr.update(type, value);
		    	
		    })
		    inputs[i].addEventListener('change', function (e) {
		    	var type     = e.currentTarget.getAttribute('modulate-type');
				var value    = e.currentTarget.value;

		    	sendSocket.send('updateADSR', data.group._id, {
		    		type: type, 
		    		value: value
		    	})
		    })
		}
		adsr.drawSVGInit(svgLine, points);

	},
	showActive: function (id) {
		var labels = document.querySelectorAll('.fn-label-adsr');
		
		for(var i = 0; i < labels.length;i++) {
			if(labels[i].getAttribute('for') == id ) {
				labels[i].classList.add('active');
			} else {
				labels[i].classList.remove('active');
			}
		}

	},
	getPoints: function (index) {
		var inputs = document.querySelectorAll('.fn-adsr-range-item');
		var pos    = inputs[index].getBoundingClientRect();
		
		var value  = document.querySelectorAll('.fn-adsr-range-item')[index].value;
		var max    = inputs[index].getAttribute('max');
		value      = max - value;
		var perc   = (value*100)/max;
		var left   = ((100/inputs.length) * index) + ((100/inputs.length)/2);

	    
	    var points = {
	    	x: left,
	    	y: perc
	    }
	    return points
	},
	drawSVGInit: function (line, points) {
		var width     = (document.querySelector('.input-range-vert-container').getBoundingClientRect().width);
		var height    = (document.querySelector('.input-range-vert-container').getBoundingClientRect().height);
		var attribute =  '0 100';
		
		for(var i in points) {
			attribute += ',' + points[i].x + ' ' + points[i].y
		}
		attribute +=  ',100 100';
		line.setAttribute('points', attribute);
	},
	svgUpdate: function (line, points, index) {
		var attribute        = line.getAttribute('points').split(',');
		var point            = adsr.getPoints(index);
		var currentAttribute = attribute[index + 1].split(' ');
		attribute[index + 1] = currentAttribute[0] + " " + point.y;
		line.setAttribute('points', attribute)
	},
	sustainEvent: function () {
		var sustainButton = document.querySelector('.fn-sustain');
		this.sustain      = data.group.sustain;
		var self          = this;

		sustainButton.addEventListener('change', function (e) {
			var sustainValue = e.currentTarget.checked;
			self.setSustain(sustainValue);
			sendSocket.send('updateSustain',data.group._id, {sustain: sustainValue})

		})
	},
	setSustain : function (value ) {
		data.group.sustain = this.sustain = value;
	}
	
	
}