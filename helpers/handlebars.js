
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
			arrayLength: function (arr) {
				return arr.length;
			},
			prettyDate: function (timestamp) {
				 return timeago().format(timestamp)
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