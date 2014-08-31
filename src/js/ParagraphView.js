
/**
* Paragraph Counter View
* Display HTML of the paragraph results
*/
function ParagraphCounterView(model) {

    "use strict";

	// Local variables
	var self,
		model;

	/**
	* CLass Constructor
	*/
	function __Constructor(model){

		// set this to Local variable
		self = this;
		
		model = model;
	}

	/**
	* CLass prototype methods
	*/
	__Constructor.prototype = {

		constructor : __Constructor,

		/**
		* Render HTML table
		* @returns: [object HTMLElement]
		*/
		renderHTML : function(){

			// check validation and render if not valid
			var validationResults = this.renderValidation();
			if(validationResults) return validationResults;

			var results = model.resultObj;
			var words = model.resultObj.words;
			var wordsKeys = Object.keys(words).sort().reverse();

			// create main container
			var $main = document.createElement('div');

			// create table
			var $table = document.createElement("table");

			// create table thead
			var $tableThead = $table.createTHead();

			this.renderRow(wordsKeys, true, $tableThead, 0);

			var $tableContent = $table.createTFoot();

			// insert values into the tableContent
			var hasRows = true;
			var x = 0;
			while(hasRows){
				hasRows = this.renderRow(wordsKeys, false, $tableContent, x);
				x++;
			}

			var $others = document.createElement('div');
			$others.innerHTML = '<b>Totals</b><br>Words = '+results.wordsCount+'<br>(,) = '+results.commas+'<br>(.) = '+results.dots+'<br>';

			$main.appendChild($table);
			$main.appendChild($others);

			return $main;			
		},

		/**
		* Render single row by the row number
		* @wordsKeys: preprepared keys for loop in object ( sorted )
		* @isHead: if should return row for the head of table
		* @tableContent: where should add the row
		* @rowNumber: whitch row should be created
		*/
		renderRow : function(wordsKeys, isHead, tableContent, rowNumber){
			console.log(model.resultObj);
			var rowsAdded = 0;
			var tableRow = tableContent.insertRow(-1);
			wordsKeys.forEach(function(letter){
				if(!isHead){
					if(typeof model.resultObj.words[letter].words[rowNumber] !== 'undefined'){
						var word = model.resultObj.words[letter].words[rowNumber];
						var count = (model.resultObj.words[letter].wordsUse[word].count > 1) ? ' ('+ model.resultObj.words[letter].wordsUse[word].count + ')' : '';
						tableRow.insertCell(0).innerHTML = word + count;
						rowsAdded++;
					}
					else
					tableRow.insertCell(0).innerHTML = '';
				}else{
					tableRow.insertCell(0).innerHTML = letter.toUpperCase();
					rowsAdded++;
				}
			});
			if(!rowsAdded) tableContent.deleteRow(-1);
			return rowsAdded;
		},


		/**
		* render validation
		* @returns: [object HTMLElement] or nothing if OK
		*/
		renderValidation : function(){

			var validationData = model.resultObj.validation;

			// return tru if ok
			if(!Object.keys(validationData).length) return;

			var $main = document.createElement('div');
			var $ul = document.createElement('ul');

			for(var validation in validationData){
				var $li = document.createElement('li');
				$li.innerHTML += validationData[validation]; 
				$ul.appendChild($li);	
			}


			return $main.appendChild($ul);
		}

	};


	return new __Constructor(model);
}




