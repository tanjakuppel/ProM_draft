function getParameters() {
	var parameterFragments = location.search.substr(1).split("&");
	var parameters = {}
	for (var i = 0; i < parameterFragments.length; i++) {
		var splittedParameter = parameterFragments[i].split("=");
		parameters[splittedParameter[0]] = decodeURIComponent(splittedParameter[1]);
	}
	return parameters;
}

var parameters = getParameters();

//data import
function getValue(file) {
	var value = $.ajax({
		url: file,
		async: false
	}).responseText;
	return value;
}

persons=$.parseJSON(getValue('data/persons.json'))
objects = $.parseJSON(getValue('data/objects.json'))
titles=$.parseJSON(getValue('data/titles.json'))

$.getScript("assets/scripts/dropdown_titles.js", function () {
	getDropdownTitles();
});

//##########################################
//Call function allTables defined in grids.js

currentIds = (1, 2, 3, 4, 5, 6)
allTables()

//#############################################

$(document).ready(function () {
	$.getScript("libraries/bootstrap-select-dropdown.js", function () {
		$(".dropdown-menu.dropdown-menu-right.show").appendTo("#filter-container")
	});
});
