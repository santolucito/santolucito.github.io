function startTypeWriter(){
	
	text = document.getElementById("orig").innerHTML;
	document.getElementById("orig").style.display = 'none'
	typeWriter(text, 0);

  }
  
  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i) {
	  var nextDisplayChar = 0
	// check if text isn't finished yet
	if (i < (text.length)) {
		  
	  if(text[i]== "<") {
		nextDisplayChar = text.indexOf(">",i)+1;  
	  }
	  else {
		nextDisplayChar = i + 1;
	  }
		  
		  document.getElementById("scroll").innerHTML = text.substring(0, nextDisplayChar);
		  
	  // wait for a while and call this function again for next character
	  setTimeout(function() {
		typeWriter(text, nextDisplayChar)
	  }, 40);
	}
	else if (i == text.length) {
		document.getElementById("scroll").style.display = 'none'
		document.getElementById("orig").style.display = ''
	}
  }
	
  
  
  window.addEventListener('DOMContentLoaded', (event) => {

	  var observerOptions = {
		  childList: true,
		  attributes: true,
		  subtree: false //Omit or set to false to observe only changes to the parent node.
	  }
	  var observer = new MutationObserver(startTypeWriter);
	  targetNode = document.querySelector("tw-story");
	  observer.observe(targetNode, observerOptions);

  });