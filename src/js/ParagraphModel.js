
/**
* Paragraph Counter
* for creating the scope - normaly i would use requirejs to do that
* returns the new instance of the class ParagraphCounter
*/
function ParagraphCounterModel(options) {

    "use strict";

	// Local variables
	var self;

	/**
	* CLass Constructor
	*/
	function __Constructor(options){

		// set this to Local variable
		self = this;

		// main object where results will be keept
		this.resultObj = {
			words	: {},
			dots	: 0,
			commas	: 0,
			wordsCount : 0,
			validation : [],			
		};
	}

	/**
	* STATIC METHOD
	* Order array and reduce repeted elements
	* @returns array
	*/
	function arrReduceAndSort(arr){
		var newArr = [];
		arr.sort() // sort for performance before reduce
			.reduce(function(a,b){
				if (a.slice(-1) != b) 
					a.push(b);
				return a;
			},newArr);
		return newArr;
	}


	/**
	* CLass prototype methods
	*/
	__Constructor.prototype = {

		constructor : __Constructor,

		/**
		* Get number of words in prepared object
		*/
		getWordsCount : function(){
			return this.resultObj.wordsCount;
		},

		/**
		* Get validation results
		*/
		getIsValid : function(){
			return (this.resultObj.validation.length) ? false : true;
		},

		/**
		* Get validation result
		*/
		getValidationResults : function(){
			return this.resultObj.validation;
		},

		/**
		* Get commas count
		*/
		getCommasCount : function(){
			return this.resultObj.commas;
		},

		/**
		* Get commas count
		*/
		getDotsCount : function(){
			return this.resultObj.dots;
		},


		/**
		* update model when new string is added
		*/
		update : function(newString){
			this.string = newString;			

			this.prepareWordsObject();

			this.validateString();
		},

		/**
		* reset model data
		* normaly before update: if not data will be merged
		*/
		reset : function(){
			this.resultObj = {
				words	: {},
				dots	: 0,
				commas	: 0,
				wordsCount : 0,
				validation : {}
			};
		},

		/**
		* Prepare words object
		* Main function to split string,
		* - count commas and dots
		* - split string by the space
		* - create resultObj witch words
		* @returns none
		*/
		prepareWordsObject : function(){

			// Count words durning the each function,
			// sefer then just counting the length
			var wordsCount = 0;

			// temporary array
			var tmpArray = [];


			/**
			* Prepare string
			*/

				// remove empty spaces
				this.string = this.string.trim();

				// count dots and comas and remove them from string
				this.string = this.string.replace(/,+/mg,  function(a){
					self.resultObj.commas++;
					return '';
				});

				this.string = this.string.replace(/\.+/mg, function(){
					self.resultObj.dots++;
					return '';
				});

			// split the string by space to get the words
			tmpArray = this.string.split(' ');

			// make a loop throught every word
				tmpArray.forEach(function(word, index){

				// min length for word func is 1
				if(word.length < 1) return;

				//validate word before add
				// could be skiped if false in future
				// im not skipping now to get the full validation error list
				self.validateWord(word);

				// treat letter cases equals
				word = word.toLowerCase();

				// create obj for new word
				if(typeof self.resultObj.words[word[0]] === 'undefined'){
					self.addWordList(word);
				}

				// add word 
				self.addWord(word);

				// increase word
				wordsCount++;
			});

			// set words count
			this.resultObj.wordsCount = wordsCount;
		},

		/** 
		* Add new obj of list of the certain character words
		* like A words list
		* @word: list of witch word first letter should be created
		*/
		addWordList : function(word){
			this.resultObj.words[word[0]] = {
				words : [],
				wordsUse : {}
			};
		},

		/** 
		* Add word to the list of words of specific kind
		* Like Apple to A list
		* @word: word witch should be added
		*/
		addWord : function(word){
			this.resultObj.words[word[0]].words.push(word);
			this.resultObj.words[word[0]].words = arrReduceAndSort(this.resultObj.words[word[0]].words);
			this.countWordUse(word);
		},

		/**
		* Count how many times word have been used
		*/
		countWordUse : function(word){
			if(typeof this.resultObj.words[word[0]].wordsUse[word] ==='undefined')
				this.resultObj.words[word[0]].wordsUse[word] = {
					count : 1
				};
			else{
				this.resultObj.words[word[0]].wordsUse[word].count++;
			}			
		},

		/**
		* Validate every word
		* add result of validation to resultObj.validation as array
		*/
		validateWord : function(word){

			// validation data
			var validData =  this.resultObj.validation;

			if(!isNaN(word)){
				validData.UNALLOWED_NUMBER = 'Should not be a number in string';
			}

			// Single character word should be capittal 
			if(word.length <= 1 && word !== word.toUpperCase() && ( word === 'o' || word === 'i' )){
				validData.UNALLOWED_CAPITAL = 'Single character should start from capitall letter';
			}

		},

		/**
		* Validate whole string
		* add result of validation to resultObj.validation as array
		*/
		validateString : function(){

			// words data
			var wordsData = this.resultObj;

			// validation data
			var validData = wordsData.validation;

			// if not enought words
			if(wordsData.wordsCount === 0){
				validData.EMPTY_STRING = 'String is empty.';
			}else{
				// if not enought words
				if(wordsData.wordsCount < 5){
					validData.STRING_TOO_SHORT = 'String is too short. Minimum 5 words.';
				}
			}

			// if not enought words
			if(wordsData.wordsCount > 500){
				validData.STRING_TOO_LONG = 'String is too long. Maximum 500 words.';
			}

		},


	};


	return new __Constructor(options);
}




