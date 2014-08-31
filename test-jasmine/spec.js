describe("ParagraphCounter", function() {


  it("Should treat single capitalcase character word as one word", function() {
	var paragraphCounter = new ParagraphCounterModel({ });
	paragraphCounter.update('A');
    expect(paragraphCounter.getWordsCount()).toEqual(1);
  });

  it("Should treat single lowercase character word as one word", function() {
	var paragraphCounter = new ParagraphCounterModel({ });
	paragraphCounter.update('a');
    expect(paragraphCounter.getWordsCount()).toEqual(1);
  });

  it("Should give error if I is not capital", function() {
	var paragraphCounter = new ParagraphCounterModel({ });
	paragraphCounter.update('i');
    expect(paragraphCounter.getValidationResults().UNALLOWED_CAPITAL).toBeDefined();
  });

  it("Should be aware of comma", function() {
	var paragraphCounter = new ParagraphCounterModel({ });
	paragraphCounter.update(',');
    expect(paragraphCounter.getCommasCount()).toEqual(1);
  });

  it("Should be aware of dot", function() {
	var paragraphCounter = new ParagraphCounterModel({ });
	paragraphCounter.update('.');
    expect(paragraphCounter.getDotsCount()).toEqual(1);
  });

  it("Should give error if number:", function() {
	var paragraphCounter = new ParagraphCounterModel({ });
	paragraphCounter.update('12231');
    expect(paragraphCounter.getValidationResults().UNALLOWED_NUMBER).toBeDefined();
  });

  it("Should give error if number", function() {
	var paragraphCounter = new ParagraphCounterModel({ });
	paragraphCounter.update('-12231');
    expect(paragraphCounter.getValidationResults().UNALLOWED_NUMBER).toBeDefined();
  });

  it("Should give error if number: Decimal", function() {
	var paragraphCounter = new ParagraphCounterModel({ });
	paragraphCounter.update('12.00');
    expect(paragraphCounter.getValidationResults().UNALLOWED_NUMBER).toBeDefined();
  });

  it("Should't give error if string with number", function() {
	var paragraphCounter = new ParagraphCounterModel({ });
	paragraphCounter.update('MD5');
    expect(paragraphCounter.getValidationResults().UNALLOWED_NUMBER).toBeUndefined();
  });

  it("Should give error if empty string", function() {
	var paragraphCounter = new ParagraphCounterModel({ });
	paragraphCounter.update('');
    expect(paragraphCounter.getValidationResults().EMPTY_STRING).toBeDefined();
  });

});