$("#title").hide();
$("#objectsl").hide();


function BasicMenu(var1, par1 = "", par2 = "", par3 = "") {
	obj = par1;

	// NAME ENGLISH
	var c = $("<div id=" + obj["english"][2] + "><h6 id=" + obj["english"][3] + "></h6></div>");
	var data = obj["english"][0];
	var s = $("<select id=" + obj["english"][5] + " class=\"form-control\" multiple/>");
	for (var val in data) {
		$("<option/>", {value: data[val], text: data[val]}).appendTo(s);
	}
	s.appendTo(var1);

	// NAME ORIGINAL
	var c = $("<div id=" + obj["original"][2] + "><h6 id=" + obj["original"][3] + "></h6></div>");
	var data = obj["original"][0];
	var s = $("<select id=" + obj["original"][5] + " class=\"form-control\" multiple/>");
	for (var val in data) {
		$("<option/>", {value: data[val], text: data[val]}).appendTo(s);
	}
	s.appendTo(var1);

	// GENDER
	var c = $("<div id=" + obj["gender"][2] + "><h6 id=" + obj["gender"][3] + "></h6></div>")
	var data = obj["gender"][0];
	var s = $("<select id=" + obj["gender"][5] + " class=\"form-control\" multiple/>");
	for (var val in data) {
		$("<option/>", {value: data[val], text: data[val]}).appendTo(s);
	}
	s.appendTo(var1);
}

function DropdownMenu(var1, var2, par1) {
	obj = par1;
	w2ui["layout"].content('main', var2);
}

function SelectionMenu(var1, par1, par2) {
	obj = par1;
	$("<span id='personen' class='current-selection__selected-title'></span>").appendTo("#selectedvalues");
	$("<span id='genders' class='current-selection__selected-title'></span>").appendTo("#selectedvalues");
	$("<span id='originals' class='current-selection__selected-title'></span>").appendTo("#selectedvalues");

	$(".current-selection__container").hide();

	$("#filter-container").on("click", ".dropdown-item", function () {
		var temp = $(".dropdown-item.active").closest(".dropdown.show").attr("id")
		$("#selectedvalues").css("opacity", "1");
		d = $(".mt-2.mb-3").text();
		f = d.split('[X]').filter(function (v) {
			return v !== ''
		});

		$(".current-selection__container").show();
		$("#resetFilter").css("display", "flex");

		selvalues = new Object()
		$("#personen").find('.current-selection__selected-value').remove();
		$("#genders").find('.current-selection__selected-value').remove();
		$("#originals").find('.current-selection__selected-value').remove();

		// ### Show within current-selection-container ###
		$.each(f, function (index) {
			if ($.inArray($.trim(f[index]), persons[3].english) != -1) {
				$("#personen").css("opacity", "1")
				$("#personen").append("<span class='current-selection__selected-value'>  " + f[index] + " </span>");
				selvalues[$.trim(f[index])] = "name_translit"
			}

			if ($.inArray($.trim(f[index]), persons[3].gender) != -1) {
				$("#genders").css("opacity", "1")
				$("#genders").append("<span class='current-selection__selected-value'>  " + f[index] + " </span>");
				selvalues[$.trim(f[index])] = "gender"
			}

			if ($.inArray($.trim(f[index]), persons[3].name) != -1) {
				$("#originals").css("opacity", "1")
				$("#originalstext").css("opacity", "1")
				$("#originals").append("<span class='current-selection__selected-value'>  " + f[index] + " </span>");
				selvalues[$.trim(f[index])] = "name"
			}
		})
	});
}

function getDropdownPersons() {
	$("#persname").css("opacity", "1");
	$('<button id="textfieldsearch_persons">Show results</button>').appendTo("#showResults");

	var myObject = new Object();

	myObject["english"] = [persons[3].english, "pers_engl", "pers", "engl_name", "English writing", "english", "#english", "#bsd1-container", "name_translit", "english"];
	myObject["gender"] = [persons[3].gender, "pers_gender", "pers", "gender", "Gender", "gender", "#gender", "#bsd2-container", "gender", "gender"];
	myObject["original"] = [persons[3].name, "pers_name", "pers", "orig_name", "Egyptian writing", "original", "#original", "#bsd3-container", "name", "original"];

	var vars = JSON.stringify(myObject);
	var obj = jQuery.parseJSON(vars);

	$.getScript("/libraries/bootstrap-select-dropdown.js", function () {
		$(obj["english"][6]).selectDropdown(
			{
				'badges': true,
				'showSelected': false,
			}
		);
		$(obj["english"][7] + " .input-group .form-control").attr("placeholder", obj["english"][4]);

		$(obj["gender"][6]).selectDropdown(
			{
				'badges': true,
				'showSelected': false,
			}
		);
		$(obj["gender"][7] + " .input-group .form-control").attr("placeholder", obj["gender"][4]);

		$(obj["original"][6]).selectDropdown(
			{
				'badges': true,
				'showSelected': false,
			}
		);

		$(obj["original"][7] + " .input-group .form-control").attr("placeholder", obj["original"][4]);
		$(obj["original"][7]).find(".dropdown-item").css("font-family", "aegypt");
		$("#originals").css("font-family", "aegypt");
	});

	BasicMenu("#persname", par1 = obj, par2 = 0, par3 = "");
	DropdownMenu("#persname", w2ui.grid1, par1 = obj);
	SelectionMenu("#persname", par1 = obj, "grid1");

	// initalize grid
	initdata = []
	$.each(persons[2], function (index, value_pers) {
		initdata.push(parseInt(value_pers.recid))
	});

	initlist = []
	$.each(initdata, function (index) {
		initlist.push(w2ui['grid1'].get(initdata[index]));
	});

	$(".results").hide();

	$("#textfieldsearch_persons").on("click", function () {
		$(".results").show();
		$('#layout').show();
		w2ui["grid1"].clear();
		w2ui["grid1"].add(initlist);
		v = $("#searchFields_persons").val();
		g = w2ui["grid1"].getSearch();

		// #### Text search ###
		fieldsearch = [];
		$.each(g, function (index) {
			fieldsearch.push({
				field: g[index], value: v, operator: $('input:radio[name=query]:checked').val()
			});
		});
		w2ui["grid1"].search(fieldsearch, 'OR');
		currentIds = w2ui["grid1"].last.searchIds;
		$("#filter-container").hide();
		$("#currentSelection").hide();
		$("#resultsHeaderFilter").hide();
		$("#searchResultsClear").show();
		$("#searchResultsTitle").show();

		w2ui["layout"].show('main', w2ui.grid1);

		//Show search results bar
		countSearchResults = $(".w2ui-record").length / 2;

		if (countSearchResults < 1) {
			$("#countSearch").text("No results for your search. Start another one!");
		} else {
			$("#countSearch").text("Search results");
		}
	})

	// SEARCH GRID
	function select(values = "", par1 = "") {
		$('#layout').show();
		w2ui['layout'].show('main', window.instant);
		w2ui['layout'].hide('right', window.instant);
		w2ui[par1].clear();
		w2ui[par1].add(initlist);
		//$("#back").css("opacity", "1")
		//$("#upper").addClass(".mt-2 mb-3")
		var search_name_engl = []
		var search_gender = []
		var search_name_orig = []

		$.each(values, function (index) {
			if (values[index] == "name_translit") {
				search_name_engl.push({field: values[index], value: String(index), operator: "is"})
			}
			if (values[index] == "gender") {
				search_gender.push({field: values[index], value: String(index), operator: "is"})
			}
			if (values[index] == "name") {
				search_name_orig.push({field: values[index], value: String(index), operator: "is"})
			}
		});

		var currentIds1 = []
		var currentIds2 = []
		var currentIds3 = []

		if (search_name_engl.length > 0) {
			w2ui[par1].search(search_name_engl, 'OR');
			currentIds1 = w2ui[par1].last.searchIds;
		} else {
			currentIds1 = initdata
		}
		if (search_gender.length > 0) {
			w2ui[par1].search(search_gender, 'OR');
			currentIds2 = w2ui[par1].last.searchIds;
		} else {
			currentIds2 = initdata
		}
		if (search_name_orig.length > 0) {
			w2ui[par1].search(search_name_orig, 'OR');
			currentIds3 = w2ui[par1].last.searchIds;
		} else {
			currentIds3 = initdata
		}

		// AND SELECTION
		var common = ""

		temp = $.grep(currentIds1, function (element) {
			return $.inArray(element, currentIds2) !== -1;
		});

		common = $.grep(currentIds3, function (element) {
			return $.inArray(element, temp) !== -1;
		});

		var tempresult = [];
		$.each(common, function (index) {
			tempresult.push(w2ui[par1].get(common[index]));
		});

		currentIds = common; //for onClick in grid.js!!
		w2ui[par1].clear();
		w2ui[par1].add(tempresult);
	}

	//########################
	// SHOW SELECTION RESULT #
	//########################
	$("#selectionResult_persons").on("click", function () {
		$(".results").show();
		$.fn.ignore = function (sel) {
			return this.clone().find(sel || ">*").remove().end();
		};
		file = ($(".mt-2.mb-3").find("span").text());
		collection = file.split(' ');
		select(values = selvalues, par1 = "grid1");

		countFilterResults = $(".w2ui-record").length / 2;

		if (countFilterResults < 1) {
			$("#countFilter").text("No results for this combination of filter categories!");
			$('.result-list').hide();
		}
	});
}

//#############################################
//Remove all filters
$("#resetFilter").click(function resetFilters() {
	window.location.reload(true);
});

//#############################################
//Clear search results
$("#searchResultsClear").click(function resetFilters() {
	window.location.reload(true);
});
