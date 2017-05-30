
function hbsHelpers(hbs) {
	
	return hbs.create({
		defaultLayout: 'layout',
		partialsDir: [
		'views/partials/'
		],
		helpers: {
			inc: function (value, options) {
				return parseInt(value) +1;
			},
			json: function (context) {
				return JSON.stringify(context)
			},
			percentageRadial: function (value, min, max) {
				var percentage = 70 * value;
				percentage = percentage / max;
				return percentage;


			},
			rotatePercentage: function (value, min, max) {
				return (value * 360) / max;

			},
			eachNumber: function (number, options) {
				 var ret = "";

				  for(var i=0;  i<number; i++) {
				    ret = ret + options.fn(i, {data:{index : i}});
				  }
				  
			  return ret;
			},
			groupOpen : function (modulator, sequencer) {
				var returntext = '';

				if (modulator && !sequencer || !modulator && sequencer) {
					returntext = 'list-group-active'
				} 
				return returntext
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
			prettyDate: function (timestamp) {
				 return timeago().format(timestamp)
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

// Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
//     switch (operator) {
//         case '==':
//             return (v1 == v2) ? options.fn(this) : options.inverse(this);
//         case '===':
//             return (v1 === v2) ? options.fn(this) : options.inverse(this);
//         case '!==':
//             return (v1 !== v2) ? options.fn(this) : options.inverse(this);
//         case '<':
//             return (v1 < v2) ? options.fn(this) : options.inverse(this);
//         case '<=':
//             return (v1 <= v2) ? options.fn(this) : options.inverse(this);
//         case '>':
//             return (v1 > v2) ? options.fn(this) : options.inverse(this);
//         case '>=':
//             return (v1 >= v2) ? options.fn(this) : options.inverse(this);
//         case '&&':
//             return (v1 && v2) ? options.fn(this) : options.inverse(this);
//         case '||':
//             return (v1 || v2) ? options.fn(this) : options.inverse(this);
//         default:
//             return options.inverse(this);
//     }
// });