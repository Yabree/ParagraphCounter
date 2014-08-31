
/**
* Paragraph Counter Controller
* Display HTML of the paragraph results
*/
(function(ParagraphCounterModel, ParagraphCounterView){

	// get html elements
	$textarea = document.querySelectorAll('.inputParagraph')[0];
	$output = document.querySelectorAll('.BTResults')[0];

	// model
	var paragraphModel = new ParagraphCounterModel({ });

	// view
	var paragraphView = new ParagraphCounterView(paragraphModel);

	// Update & render on init,
	// only if input is not empty
	if($textarea.value.length)
	updateParagraph();

	// Set event on input change to update results
	$textarea.onchange = function(){
		updateParagraph();
	};

	/**
	* Update and render the model
	*/
	function updateParagraph(){
		// clear current paragraph data
		paragraphModel.reset();

		// set new paragraph data
		// and if result is fine, render the output
		paragraphModel.update($textarea.value);

		// render html output
		$output.innerHTML = '';
		$output.appendChild(paragraphView.renderHTML());
	}
})(ParagraphCounterModel, ParagraphCounterView);


