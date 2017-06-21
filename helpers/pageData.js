
module.exports = {
	alert: function (type) {
		if(type == 'sequencer') {
			return {
				text: 'Als sequencer ben je verantwoordelijk voor de melodie. Je kunt hem vervormen en een nieuwe melodie beginnen met de step sequencer',
				action: 'start',
				head: 'Sequencer'
			}
		} else {
			return {
				text: 'Als modulator vervorm je het geluid. Gebruik filters e.d. om wat vets te maken. Begin als eerste met het calibreren van je camera',
				action: 'calibrate',
				head: 'Modulator'
			}
		}
	},
	tips: function (type) {
		if(type == 'sequencer') {
			return [{
				text: 'Tik op de steps van de sequencer om een step aan of uit te zetten',
				cond: 'clickActive'
			}, {
				text: 'houd de step ingedrukt en draai je telefoon om de toonhoogte te veranderen',
				cond : 'changeFreq'
			},
			{
				text: 'Je kunt de complete melodie veranderen door een nieuwe op te nemen',
				cond : 'rec'
			},
			{
				text: 'Nice! Nog een laatste tip. Probeer met de ADSR de toonlengte te veranderen',
				cond : 'adsr'
			}
			]
		} else {
			return [{
				text: 'Houd een filter ingedrukt en gebruik een geel oppervlak om de filter aan te passen',
				cond: 'filter'
			}, {
				text: 'Activeer een extra source om het geluid breder te maken',
				cond : 'active'
			},
			{
				text: 'Verander de detune om de sources van elkaar te laten verschillen',
				cond : 'detune'
			},
			
			]

		}
	},
	navigation: function (type) {
		if(type == 'sequencer') {
			return [{
				current: 'pp',
				links: [
					'sequencerLeft', 'null', 'null'
				]
			}, {
				current : 'adsr',
				links: ['null', 'null', 'sequencer']
			},
			{
				current:'sequencer',
				links: ['adsr', 'rec', 'pp' ]
			}
			]
		} else {
			return [{
				current: 'filters',
				links: [
					'null', 'null', 'osc'
				]
			}, {
				current : 'osc',
				links: ['filters', 'null', 'null']
			}
			]
		}
	}
	
}		