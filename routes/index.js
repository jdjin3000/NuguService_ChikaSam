const express = require('express');
const router = express.Router();
const ACTION_STARTSERVICE = 'action.startService';

class Directive {
    constructor(soundFileName){
        this.type = "AudioPlayer.Play",
        this.audioItem = {
            stream : {
                url : `http://52.231.96.72/` + soundFileName,
                offsetInMilliseconds : 0,
                token : "{{STRING}}"
            }
        }
    }
  }

class NUGURequest {
    constructor (req) {
      this.context = req.body.context;
      this.action = req.body.action;
      console.log(`NUGURequest: ${JSON.stringify(this.context)}, ${JSON.stringify(this.action)}`)
    }
  
    do(NUGUResponse) {
      this.actionRequest(NUGUResponse)
    }
  
    actionRequest(NUGUResponse) {
        console.log('actionRequest')
        console.dir(this.action)
    
        const actionName = this.action.actionName
        const parameters = this.action.parameters
    
        switch (actionName) {
            case ACTION_STARTSERVICE:
                let soundFileName = 'example.mp3'
                NUGUResponse.addDirective(new Directive(soundFileName))
                break
        }
    }
}

class NUGUResponse {
    constructor () {
      console.log('NUGUresponse constructor')
  
      this.version = '2.0'
      this.resultCode = 'OK'
      this.output = {}
      this.directives = []
    }
  
    addDirective(directive) {
      this.directives.push(directive)
    }
}

  

router.post('/chikasam', async (req,res) => {
    NUGUrequest = new NUGURequest(req)
    NUGUresponse = new NUGUResponse()
    NUGUrequest.do(NUGUresponse)

    console.log(JSON.stringify(NUGUresponse));
    res.json(NUGUresponse);
})

/*
Play Directive Example.

    {
        "type": "AudioPlayer.Play",
        "audioItem": {        
            "stream": {
                "url": "{{STRING}}",
                "offsetInMilliseconds": {{LONG}},
                
                //"progressReport": {
                //    "progressReportDelayInMilliseconds": {{LONG}},
                //    "progressReportIntervalInMilliseconds": {{LONG}}
                //},
                
                "token": "{{STRING}}",
                //"expectedPreviousToken": "{{STRING}}"
            },
            //"metadata": { } # reserved
        }
    }
*/