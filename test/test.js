test("return the fractions in the line", function() {
	deepEqual(getFrac("1/2 C flour"), {"num": 1, "den": 2, "text": "1/2", "startIndex": 0, "endIndex": 2}, "regular fraction");
	deepEqual(getFrac("1 C flour"), null, "one whole number is not a fraction");
	deepEqual(getFrac("one C flour"), null, "one whole number is not a fraction");
	deepEqual(getFrac("½ C flour"), {"num": 1, "den": 2, "text": "½", "startIndex": 0, "endIndex": 0}, "unicode fraction");
	deepEqual(getFrac("1...½ C flour"), {"num": 1, "den": 2, "text": "½", "startIndex": 4, "endIndex": 4}, "one whole number and one unicode fraction");
	deepEqual(getFrac("1...1/2 1/8C flour"), {"num": 1, "den": 2, "text": "1/2", "startIndex": 4, "endIndex": 6}, "one whole number and one regular fraction");
});

test("get the index of the whole number", function() {
	deepEqual(getNumb("1 C flour"), {"value": 1, "text": "1", "startIndex": 0, "endIndex": 0}, "1 C flour");
	deepEqual(getNumb("at least 1 C flour"), {"value": 1, "text": "1", "startIndex": 9, "endIndex": 9}, "at least 1 C flour");
	deepEqual(getNumb("½ C flour"), null, "½ C flour");
	deepEqual(getNumb("1 ½ C flour"), {"value": 1, "text": "1", "startIndex": 0, "endIndex": 0}, "1 ½ C flour");
	deepEqual(getNumb("1 1/2 C flour"), {"value": 1, "text": "1", "startIndex": 0, "endIndex": 0}, "1 1/2 C flour")
	deepEqual(getNumb("2 1/2 C flour"), {"value": 2, "text": "2", "startIndex": 0, "endIndex": 0}, "2 1/2 C flour")
	deepEqual(getNumb("10 1/2 C flour"), {"value": 10, "text": "10", "startIndex": 0, "endIndex": 1}, "10 1/2 C flour")
	deepEqual(getNumb("1/2 C flour"), null, "1/2 C flour")
	deepEqual(getNumb("one C flour"), null, "one C flour")
});

test("get the quantity", function() {
	equal(getQuantity("1/2 C flour"), "1/2", "1/2 C flour");
	equal(getQuantity("½ C flour"), "½", "½ C flour");
	equal(getQuantity("½C flour"), "½", "½C flour");
	equal(getQuantity("1 C flour"), "1", "1C flour");
	equal(getQuantity("1C flour"), "1", "1C flour");
	equal(getQuantity("1...½ C flour"), "1...½", "1...½ C flour");
	equal(getQuantity("1...1/2 flour"), "1...1/2", "1...1/2 flour");
});

test("remove the quantity", function() {
	deepEqual(removeQuantity("1/2 C flour"), ["C", "flour"], "1/2 C flour");
	deepEqual(removeQuantity("1/2 Cup flour"), ["Cup", "flour"], "1/2 C flour");
	deepEqual(removeQuantity("½ C flour"), ["C", "flour"], "½ C flour");
	deepEqual(removeQuantity("½C sugar"), ["C", "sugar"], "½C flour");
	deepEqual(removeQuantity("1 Tbsp flour"), ["Tbsp", "flour"], "1 Tbsp flour");
	deepEqual(removeQuantity("1tsp flour"), ["tsp", "flour"], "1tsp flour");
	deepEqual(removeQuantity("1½ Tablespoon flour"), ["Tablespoon", "flour"], "1½ Tablespoon flour");
	deepEqual(removeQuantity("1 1/2 teaspoon flour"), ["teaspoon", "flour"], "1 1/2 teaspoon flour");
});

test("get the unit", function() {
	equal(getUnit("1/2 C flour"), "C", "1/2 C flour");
	equal(getUnit("1/2 Cup flour"), "Cup", "1/2 C flour");
	equal(getUnit("½ C flour"), "C", "½ C flour");
	equal(getUnit("½C sugar"), "C", "½C flour");
	equal(getUnit("1 Tbsp flour"), "Tbsp", "1 Tbsp flour");
	equal(getUnit("1tsp flour"), "tsp", "1tsp flour");
	equal(getUnit("1½ Tablespoon flour"), "Tablespoon", "1½ Tablespoon flour");
	equal(getUnit("1 1/2 teaspoon flour"), "teaspoon", "1 1/2 teaspoon flour");
});

test("get the ingredient", function() {
	equal(getIngredient("1/2 C flour"), "flour", "1/2 C flour");
	equal(getIngredient("1/2 Cup chopped onions"), "chopped onions", "1/2 C chopped onions");
	equal(getIngredient("½ C flour"), "flour", "½ C flour");
	equal(getIngredient("½C sugar"), "sugar", "½C sugar");
	equal(getIngredient("1 Tbsp baking powder"), "baking powder", "1 Tbsp baking powder");
	equal(getIngredient("1tsp flour"), "flour", "1tsp flour");
	equal(getIngredient("1½ Tablespoon salt"), "salt", "1½ Tablespoon salt");
	equal(getIngredient("1 1/2 teaspoon flour"), "flour", "1 1/2 teaspoon flour");
});



//5
test("create a JSON object to store values of unicode fractions", function(){
	deepEqual(convertUnicodeFraction("¼"), {"num": 1, "den": 4, "text": "1/4"}, "one fourth");
	deepEqual(convertUnicodeFraction("¼").text, "1/4", "one fourth");
	deepEqual(convertUnicodeFraction("⅙"), {"num": 1, "den": 6, "text": "1/6"}, "one sixth");
})

test("get uniform unit", function() {
	equal(StandardizeUnit("C"), "cup", "C");
	equal(StandardizeUnit("Cup"), "cup", "Cup");
	equal(StandardizeUnit("Tbsp"), "tablespoon", "Tbsp");
	equal(StandardizeUnit("tsp"), "teaspoon", "tsp");
	equal(StandardizeUnit("Tablespoon"), "tablespoon", "Tablespoon");
	equal(StandardizeUnit("teaspoon"), "teaspoon", "teaspoon");
});


test("convert amount to the largest units", function() {
	deepEqual(getUnitList(192), [{qts: 192, "amount": "1", unit: "cup"}], "1 cup");
	deepEqual(getUnitList(216), [{qts: 192, "amount": "1", unit: "cup"}, {qts: 24, "amount": "2", unit: "tablespoon"}], "1 cup and 2 Tbsp");
	deepEqual(getUnitList(24), [{qts: 24, "amount": "2", unit: "tablespoon"}], "2 Tbsp");
	deepEqual(getUnitList(96), [{qts: 96, "amount": "1/2", unit: "cup"}], "1/2 cup");

});

test("combine like units into one unit", function() {
	var unitList = [{qts: 192, unit: "cup", amount: "1"}];
	deepEqual(combineLikeUnits(unitList), [{qts: 192, unit: "cup", amount: "1"}], "1 cup");
	var two_half_cups = [{qts: 384, unit: "cup", amount: "2"}, {qts: 46, unit: "cup", amount: "1/2"}];
	deepEqual(combineLikeUnits(two_half_cups), [{qts: 430, "amount": "2 1/2", unit: "cup"}], "2 1/2 cup(s)");
	var one_quarter_teaspoon = [{qts: 4, unit: "teaspoon", amount: "1"}, {qts: 1, unit: "teaspoon", amount: "1/4"}];
	deepEqual(combineLikeUnits(one_quarter_teaspoon), [{qts: 5, "amount": "1 1/4", unit: "teaspoon"}], "1 1/4 teaspoon");
	var two_half_cups_qt = [{qts: 384, unit: "cup", amount: "2"}, {qts: 46, unit: "cup", amount: "1/2"}, {qts: 1, unit: "teaspoon", amount: "1/4"}];
	deepEqual(combineLikeUnits(two_half_cups_qt), [{qts: 430, "amount": "2 1/2", unit: "cup"}, {qts: 1, unit: "teaspoon", amount: "1/4"}], "2 1/2 cup, 1/4 teaspoon");
});


test("print human readable ", function() {
	//equal(format({qts: 430, "amount": "2 1/2", unit: "cup"}), "2 1/2 cup", "2 1/2 cup");
	equal(format([{qts: 430, "amount": "2 1/2", unit: "cup"}, {qts: 1, unit: "teaspoon", amount: "1/4"}]), "2 1/2 cup, 1/4 teaspoon", "2 1/2 cup");
});


///////////////


test("Is it a fraction", function () {
	ok(!isFraction("3"), "whole numbers are not fractions");
	ok(!isFraction("1 3"), "missing forward slash");
	ok(isFraction("1/3"), "written out as common fraction");
	ok(isFraction("1 / 3"), "space between seprator allowed");
	ok(isFraction("1 /3"),  "space between seprator allowed");
	ok(isFraction("1/ 3"),  "space between seprator allowed");
	ok(isFraction("1/3"), "written out as common fraction");
	ok(isFraction("999/999"), "common fraction with multiple chars on each side");
	ok(isFraction('¼'), "fractional unicode chars are detected");
	ok(isFraction('⅔'), "fractional unicode chars are detected");
	ok(!isFraction("abc"), "alpha chars not allowed");
	ok(!isFraction("'3 1/4'"), "fractions must be alone");
	ok(!isFraction("1¼"), "starts with a whole number");
});

test ("Are unicode fractions recognized as fractions", function() {
	var list = ['¼', '½', '¾', '⅓', '⅔', '⅕', '⅖', '⅗', '⅘', '⅙', '⅚', '⅛', '⅜', '⅝', '⅞'];
	for (i=0; i < list.length; i++) {
		ok(isUnicodeFraction(list[i]), "unicode characters are valid");
	}
	ok(!isUnicodeFraction('1/4'), "common fractions aren't vulgar");
	ok(!isUnicodeFraction('1'), "whole numbers aren't vulgar fractions");
	ok(!isUnicodeFraction('1¼'), "starts with a whole number");
});



test ("convert written recipe quantity to qts", function() {
	equal(convertToQts("1 C"), "192", "1 C");
	equal(convertToQts("1 cup"), "192", "1 cup");
	equal(convertToQts("2 tsp"), "8", "2 tsp");
	equal(convertToQts("1/2 tsp"), "2", "1/2 tsp");
	equal(convertToQts("1 1/2 tsp"), "6", "1 1/2 tsp");
	equal(convertToQts("½ teaspoon"), "2", "½ teaspoon");
});

test ("convert written recipe quantity to qts", function() {
	equal(doit("1 C flour"), "2 cup flour", "1 C flour");
	equal(doit("1/4 tsp salt"), "1/2 teaspoon salt", "1/4 tsp salt");
	equal(doit("1/3 cup sugar"), "2/3 cup sugar", "1/3 cup sugar");
	equal(doit("2 3/4 cup water"), "5 1/2 cup water", "2 3/4 cup water");

});
