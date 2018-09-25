(function(){
  /*
  Check and set a global guard variable.
  If this content script is injected into the same page again,
  it will do nothing next time.
  */
  if (window.modifiersSetup) {
    return;
  }
  window.modifiersSetup = true;
  var modifiersState = "";

	var modifierCallback;
	var interactionListener = function(event){
		var responseValue = "";
		responseValue += (event.ctrlKey || event.metaKey) ? "ctrl" : "";
		responseValue += (event.shiftKey) ? "shift" : "";
		responseValue += (event.altKey) ? "alt" : "";
		modifiersState = responseValue;
		console.log("modifiersState: " + modifiersState);
	};

	window.addEventListener("mousemove", interactionListener)
	window.addEventListener("mouseup", interactionListener)
	window.addEventListener("mousedown", interactionListener)
	window.addEventListener("mouseout", interactionListener)
	window.addEventListener("keydown", interactionListener)
	window.addEventListener("keyup", interactionListener)

	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		if (message == "riab-testModifiers")
		{
			sendResponse(modifiersState)
		}
	});
})();
