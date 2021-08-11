const textInput = document.getElementById('text')
const form = document.getElementById('form')
const langEL = document.getElementById('leng')
const btnEl = document.getElementById('btn')
const resultDiv = document.querySelector('.result-container')
const clearBtn = document.querySelector('.clear')
const readFor = document.getElementById('read')





try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
    //errorMessage.style.display = 'block'
  }
// languadge variable
let choice = ''

const languadgeCodes = {
  Spanish : 'es',
  Japanese : 'ja',
  Russian : 'ru',
  Bulgarian : 'bg',
  German : 'de',
  Arabic : 'ar-ag',
  Greek: 'el',
}

var noteContent = ''

recognition.onresult = function(event) {

    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far. 
    // We only need the current one.
    var current = event.resultIndex
  
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript
    // validates the trasnccript and leasten for the languadge keyword
	if ( transcript.includes('translate to')) {
		const Lang =  transcript.split(/(\s+)/)
		choice = Lang[4]

    const choiceVlue = document.getElementById('default')
    choiceVlue.value = choice
    choiceVlue.innerText = choice    
		console.log(choice)

		noteContent = Lang.splice(5, 100).join(" ")
		console.log(noteContent)
   
    textInput.style.color = '#000'
    textInput.innerHTML = noteContent
    
  }

	
    // Add the current transcript to the contents of our Note.

    
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
	
    if(!mobileRepeatBug) {
        noteContent = transcript//Lang.splice(5, 100).join(" ")
        textInput.style.color = '#000'
        textInput.innerHTML = noteContent
	} 
 	
  }


  
// start and stop buttons for the voice recognition
const startBtn = document.querySelector('#start-btn')
const stopBtn = document.querySelector('#stop-btn')

startBtn.addEventListener('click', function(e) {
   
    recognition.start()
    
  })

  stopBtn.addEventListener('click', function(e) {
    recognition.stop()
  })

// read the message button
readFor.addEventListener('click', () => {
  readOutLoud()
})

//Here is the entire code needed to read out a string.
  function readOutLoud() {
    let message = resultDiv.innerHTML 
    var speech = new SpeechSynthesisUtterance()
    var choiceLang = document.getElementById('js').getAttribute('value')
    console.log(choiceLang)
    
    // Set the text and voice attributes.
    // Read the message on the translated langudge
    for(var key in languadgeCodes) {
      if (choiceLang == key || choice == key) {
        var value = languadgeCodes[key]
        
        speech.lang = value
        speech.text = message
        speech.volume = 1
        speech.rate = 1
        speech.pitch = 1
      
        window.speechSynthesis.speak(speech)
          }
    }
  }
  // clears the content itn the reslt div
clearBtn.addEventListener('click', () => {
	resultDiv.innerHTML = 'Here will be your translation!!!'
})
 
