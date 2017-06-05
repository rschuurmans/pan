
function hbsHelpers(hbs) {
	
	return hbs.create({
		defaultLayout: 'layout',
		partialsDir: [
		'views/partials/'
		],
		helpers: {
			json: function (context) {
				return JSON.stringify(context)
			},
			
			rotatePercentage: function (value, min, max) {
				return (value * 360) / max;
			},
			groupText: function (modulator, sequencer) {
				var returntext = 'vol';

				if(modulator && sequencer) {
					returntext == 'vol';
				} else if (modulator && !sequencer) {
					returntext = modulator + ' zoekt een sequencer';
				} else if (!modulator && sequencer) {
					returntext = sequencer + ' zoekt een modulator';
				} else {
					returntext = 'shit is leeg';
				}
				return returntext
			},
			arrayLength: function (arr) {
				return arr.length;
			},
			
			openGroup: function (modulator, sequencer, options) {

				if (modulator && !sequencer || !modulator && sequencer) {
					return options.fn(this);
				}  else {
					return options.inverse(this);
				}
				
			},
			groupMembers: function (modulator, sequencer) {
				var text1 = modulator ? modulator + ' + ' : '?? + ';
				var text2 = sequencer ? sequencer : '??';
				
				return text1 + text2;
				
			},

			ifCond: function (v1, operator, v2, options) {
				
				switch (operator) {
			        case '==':
			            return (v1 == v2) ? options.fn(this) : options.inverse(this);
			        case '===':
			            return (v1 === v2) ? options.fn(this) : options.inverse(this);
			        case '!==':
			            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
			        case '<':
			            return (v1 < v2) ? options.fn(this) : options.inverse(this);
			        case '<=':
			            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
			        case '>':
			            return (v1 > v2) ? options.fn(this) : options.inverse(this);
			        case '>=':
			            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
			        case '&&':
			            return (v1 && v2) ? options.fn(this) : options.inverse(this);
			        case '||':
			            return (v1 || v2) ? options.fn(this) : options.inverse(this);
			        default:
			            return options.inverse(this);
			    }
			}
		}
	})
}
module.exports = hbsHelpers;