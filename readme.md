#pan

#todo
- wanneer de gebruiker de Pan verlaat, verlaat hij de groep. Aldus, uit de group collection halen 
- implement http://lokijs.org/#/ to improve performance
- implement audio api scheduling to improve performance
- fix font-family issues
- remove unused libraries
- create meaningfull animations
	- https://developers.google.com/web/tools/chrome-devtools/inspect-styles/animations
	- read about perfomance animations
- finish /live
- favicon
- remove jquery?
- remove json data
- test wether json data or mongoose is faster, describe in docs
- remove unused templates routers etc




// how the socket works


on joining a duo, join the socket with the groupid as a room name
on leaving a duo, leave the socket and push the latest data to the database
when a new user joins, get the data via the socket from the other user and save the data to the database
sequencer: on updating a value in the sequence, send the new data at the end - 1 of the sequence,to the other in the duo, and to /live
modulator: on updating a new value with a filter, or changing the source send the new data real time to the other in the duo, and to /live

how the data works

var groupSchema = new Schema({
	steps: Array,
		{  
         "max":2200,
         "min":0,
         "sustain":null,
         "active":false,
         "frequency":349.23
      },
	sources: Array,
	 {  
         "newObj":true,
         "type":"SINE"
      }
	modulate: Array,
	{  
         "setValue":"delayTime",
         "values":{  
            "bypass":0,
            "cutoff":2000,
            "dryLevel":0,
            "wetLevel":0,
            "delayTime":0.1,
            "feedback":0.1
         },
         "type":"Delay"
      },
	timestamp: Date, <- date of creating the group
	sequencer: Object, <- user : 
		  "__v":0,
		  "username":"Roos",
		  "active":true,
		  "startDate":{  
		     "$date":"2017-05-08T21:46:11.846Z"
		  },
		  "role":"sequencer",
		  "groupId":"5910e7239659103cfbf047a0",
		  "_id":{  
		     "$oid":"5910e7239659103cfbf047a1"
		  }
	modulator: Object,
		"__v":0,
	      "username":"Roos",
	      "active":true,
	      "startDate":{  
	         "$date":"2017-05-09T16:41:50.165Z"
	      },
	      "role":"modulator",
	      "groupId":"5910e7239659103cfbf047a0",
	      "_id":{  
	         "$oid":"5911f14ea40f795972c206c3"
	      }
	groupCounter: Number,
})

var sequen