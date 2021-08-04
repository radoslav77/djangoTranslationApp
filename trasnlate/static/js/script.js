const textInput = document.getElementById('text')
const form = document.getElementById('form')
const langEL = document.getElementById('leng')
const btnEl = document.getElementById('btn')
const resultDiv = document.querySelector('.result-container')
const clearBtn = document.querySelector('.clear')

try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
    //errorMessage.style.display = 'block'
  }

let choice = ''

//console.log(textInput)
//console.log(form)
//console.log(langEL)
//console.log(btnEl)
//console.log(resultDiv)

var noteContent = ''

recognition.onresult = function(event) {

    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far. 
    // We only need the current one.
    var current = event.resultIndex
  
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript
	if ( transcript.includes('translate to')) {
		let Lang =  transcript.split(/(\s+)/)
		choice = Lang[4]

    langEL.value = choice
    langEL.innerText = choice    

		
		
		noteContent = Lang.pop(0, 3)
		console.log(noteContent)
    	textInput.style.color = '#000'
    	textInput.innerHTML = `${noteContent}`
	}

	
    // Add the current transcript to the contents of our Note.

    
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
	
    if(!mobileRepeatBug) {
        noteContent = choice
        textInput.style.color = '#000'
        textInput.innerHTML = `${noteContent}`
	} 
 	
  }

console.log(choice)

const startBtn = document.querySelector('#start-btn')
const stopBtn = document.querySelector('#stop-btn')

startBtn.addEventListener('click', function(e) {
   
    recognition.start()
    
  });

  stopBtn.addEventListener('click', function(e) {
    recognition.stop()
  });
//Here is the entire code needed to read out a string.
  function readOutLoud(message) {
    var speech = new SpeechSynthesisUtterance()
  
    // Set the text and voice attributes.
    speech.text = message
    speech.volume = 1
    speech.rate = 1
    speech.pitch = 1
  
    window.speechSynthesis.speak(speech)
  }
  
clearBtn.addEventListener('click', () => {
	resultDiv.innerHTML = 'Here will be your translation!!!'
})
 
// choice.pop([0])