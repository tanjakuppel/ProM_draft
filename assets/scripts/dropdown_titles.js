$("#persname").hide();
$("#objectsl").hide();

keys = [["titles_translat_eng", "Translation", "#bsd1-container"], ["titles_translit", "Title", "#bsd2-container"], ["gott_kult", "Gods and other Authorities", "#bsd3-container"], ["region", "Toponyms", "#bsd4-container"], ["ad_sec", "Administrative Institution", "#bsd5-container"], ["field2", "Field of Profession", "#bsd6-container"], ["field3", "Field of Specialization", "#bsd7-container"], ["field5", "Profession", "#bsd8-container"], ["field4", "Gender", "#bsd9-container"]]

function BasicMenu(var1, par1 = "", par2 = "", par3 = "") {
	obj = par1;
	$.each(keys, function (index) {
		c = $("<div class=\"form-group\" id=" + obj[keys[index][0]][1] + ">" +
			"<div id=" + obj[keys[index][0]][2] + ">" +
			"<h6 id=" + obj[keys[index][0]][3] + "></h6>" +
			"</div>" +
			"</div>")

		var data = obj[keys[index][0]][0];
		var s = $("<select id=" + obj[keys[index][0]][5] + " class=\"form-control\" multiple/>");
		for (var val in data) {
			$("<option/>", {value: data[val], text: data[val]}).appendTo(s);
		}
		s.appendTo(var1);
	});
}
function DropdownMenu(var1, var2, par1) {
	obj = par1;
	w2ui.layout.content('main', var2);
}
function SelectionMenu(var1, par1, par2) {
	obj = par1;
	$( "<span id='titles_translits' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues") //2
	$( "<span id='titles_translat_engs' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues") //1
	$( "<span id='field2s' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues") //6
	$( "<span id='field3s' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues") //7
	$( "<span id='field5s' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues") //8
	$( "<span id='field4s' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues") //9
	$( "<span id='gott_kults' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues") //3
	$( "<span id='ad_secs' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues") //5
	$( "<span id='regions' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues") //4

	$(".current-selection__container").hide();

  $("#filter-container" ).on("click", ".dropdown-item", function () {
	  var temp = $(".dropdown-item.active").closest(".dropdown.show").attr("id");
	  $("#selectedvalues").css("opacity", "1");
	  d = $(".mt-2.mb-3").text();

	  f = d.split('[X]').filter(function (v) {
		  return v !== ''
	  });

	  $(".current-selection__container").show();
	  $("#resetFilter").css("display", "flex");

	  selvalues = new Object();
	  $("#titles_translits").find('.current-selection__selected-value').remove();
	  $("#titles_translat_engs").find('.current-selection__selected-value').remove();
	  $("#gott_kults").find('.current-selection__selected-value').remove();
	  $("#regions").find('.current-selection__selected-value').remove();
	  $("#ad_secs").find('.current-selection__selected-value').remove();
	  $("#field2s").find('.current-selection__selected-value').remove();
	  $("#field3s").find('.current-selection__selected-value').remove();
	  $("#field5s").find('.current-selection__selected-value').remove();
	  $("#field4s").find('.current-selection__selected-value').remove();

	  $.each(f, function (index) {
		  $.each(keys, function (index_basic) {
			  if ($.inArray($.trim(f[index]), titles[3][keys[index_basic][1]]) != -1) {
				  $(".mt-2.mb-3").hide()
				  $("#" + keys[index_basic][0] + "s").css("opacity", "1");
				  $("#" + keys[index_basic][0] + "s").append( "<span class='current-selection__selected-value'>  " + f[index] + " - </span>" );
				  selvalues[$.trim(f[index])] = keys[index_basic][0]
			  }
		  });
	  });
  });
}
function getDropdownTitles() {
	$('<button id="textfieldsearch_titles">Show results</button>').appendTo("#showResults");
	$("#title").css("opacity","1");
	english_container = []
	name_container = []

	var myObject = new Object();

	myObject["titles_translit"] = [titles[3]["Title"], "titles_translit", "title", "titles_translit", "Egyptian writing", "titles", "#titles", "#bsd2-container", "titles_translit", "titles_translit"];
	myObject["titles_translat_eng"] = [titles[3]["Translation"], "titles_translat_eng", "title", "titles_translat_eng", "English writing", "trans", "#trans", "#bsd1-container", "titles_translat_eng", "titles_translat_eng"];

	myObject["gott_kult"] = [titles[3]["Gods and other Authorities"], "gott_kult", "title", "gott_kult", "Gods and other Autorities", "gott_kult", "#gott_kult", "#bsd3-container", "gott_kult", "gott_kult"]
	myObject["region"] = [titles[3]["Toponyms"], "region", "title", "region", "Toponyms", "region", "#region", "#bsd4-container", "region", "region"]
	myObject["ad_sec"] = [titles[3]["Administrative Institution"], "ad_sec", "title", "ad_sec", "Administrative Institution", "ad_sec", "#ad_sec", "#bsd5-container", "ad_sec", "ad_sec"]
	myObject["field2"] = [titles[3]["Field of Profession"], "field2", "title", "field2", "Field of Profession", "field2", "#field2", "#bsd6-container", "field2", "field2"]
	myObject["field3"] = [titles[3]["Field of Specialization"], "field3", "title", "field3", "Field of Specialization", "field3", "#field3", "#bsd7-container", "field3", "field3"]
	myObject["field5"] = [titles[3]["Profession"], "field5", "title", "field5", "Profession", "field5", "#field5", "#bsd8-container", "field5", "field44"]
	myObject["field4"] = [titles[3]["Gender"], "field4", "title", "field4", "Gender", "field4", "#field4", "#bsd9-container", "field4", "field45"]

	var vars = JSON.stringify(myObject);
	var obj = jQuery.parseJSON(vars);
	//console.log(obj);

	$.getScript("libraries/bootstrap-select-dropdown.js", function () {
		$.each(keys, function (index_basic) {
			$(obj[keys[index_basic][0]][6]).selectDropdown(
				{
					'badges': true,
					'showSelected': false,
				}
			);
			$(obj[keys[index_basic][0]][7] + " .input-group .form-control").attr("placeholder", obj[keys[index_basic][0]][4]);
		});

		$(obj["titles_translit"][7]).find(".dropdown-item").css("font-family", "aegypt");
		$("#titles_translits").css("font-family", "aegypt");
	});

	BasicMenu("#title", par1 = obj, par2 = 0, par3 = "");
	DropdownMenu("#title", w2ui.grid3, par1 = obj);
	SelectionMenu("#title", par1 = obj, "grid3");

	// initalize grid
	initdata = []
	$.each(titles[2], function (index, value_tit) {
		initdata.push(parseInt(value_tit.recid))
	});

	initlist = []
	$.each(initdata, function (index) {
		initlist.push(w2ui['grid3'].get(initdata[index]));
	});

	$(".results").hide();

	$("#textfieldsearch_titles").on("click", function () {
		$(".results").show();
		$('#layout').show();
		w2ui["grid3"].clear();
		w2ui["grid3"].add(initlist);
		v = $("#searchFields_titles").val();
		g = w2ui["grid3"].getSearch();

		fieldsearch = [];
		$.each(g, function (index) {
			fieldsearch.push({field: g[index], value: v, operator: $('input:radio[name=query]:checked').val()})
		});
		w2ui["grid3"].search(fieldsearch, 'OR');
		currentIds = w2ui["grid3"].last.searchIds;
		$("#filter-container").hide();
		$("#currentSelection").hide();
		$("#resultsHeaderFilter").hide();
		$("#searchResultsClear").show();
		$("#searchResultsTitle").show();
		w2ui["layout"].show('main', w2ui.grid3);

		//Show search results bar
		countSearchResults = $(".w2ui-record").length / 2;

		if (countSearchResults < 1) {
			$("#countSearch").text("No results for your search. Start another one!");
		} else {
			$("#countSearch").text(countSearchResults + " search results were found");
		}
	});

// SEARCH GRID
	function select(values = "", par1 = "") {
		$('#layout').show();
		w2ui['layout'].show('main', window.instant);
		w2ui['layout'].hide('right', window.instant);

		w2ui[par1].clear();
		w2ui[par1].add(initlist);
		var search_title_translat_eng = []
		var search_title_translit = []
		var search_title_gott = []
		var search_title_region = []
		var search_title_ad_sec = []
		var search_title_field2 = []
		var search_title_field3 = []
		var search_title_field5 = []
		var search_title_field4 = []

		$.each(values, function (index) {
			if (values[index] == "titles_translat_eng") {
				search_title_translat_eng.push({field: values[index], value: String(index), operator: "is"})
			}
			if (values[index] == "titles_translit") {
				search_title_translit.push({field: values[index], value: String(index), operator: "is"})
			}
			if (values[index] == "gott_kult") {
				f = (String(index).replace(' (god)', ''))
				search_title_gott.push({field: values[index], value: f, operator: "is"})
			}
			if (values[index] == "region") {
				search_title_region.push({field: values[index], value: String(index), operator: "is"})
			}
			if (values[index] == "ad_sec") {
				search_title_ad_sec.push({field: values[index], value: String(index), operator: "is"})
			}
			if (values[index] == "field2") {
				search_title_field2.push({field: values[index], value: String(index), operator: "is"})
			}
			if (values[index] == "field3") {
				search_title_field3.push({field: values[index], value: String(index), operator: "is"})
			}
			if (values[index] == "field5") {
				f = (String(index).replace(' (prof.)', ''))
				console.log("TEST1: ", f)  
				search_title_field5.push({field: values[index], value: f, operator: "is"})
			}
			if (values[index] == "field4") {
				search_title_field4.push({field: values[index], value: String(index), operator: "is"})
			}
		});

		var currentIds1 = []
		var currentIds2 = []
		var currentIds3 = []
		var currentIds4 = []
		var currentIds5 = []
		var currentIds6 = []
		var currentIds7 = []
		var currentIds8 = []
		var currentIds9 = []

		if (search_title_gott.length > 0) {
			w2ui[par1].search(search_title_gott, 'OR');
			currentIds1 = w2ui[par1].last.searchIds;
		} else {
			currentIds1 = initdata
		}
		if (search_title_region.length > 0) {
			w2ui[par1].search(search_title_region, 'OR');
			currentIds2 = w2ui[par1].last.searchIds;
		} else {
			currentIds2 = initdata
		}
		if (search_title_ad_sec.length > 0) {
			w2ui[par1].search(search_title_ad_sec, 'OR');
			currentIds3 = w2ui[par1].last.searchIds;
		} else {
			currentIds3 = initdata
		}
		if (search_title_field2.length > 0) {
			w2ui[par1].search(search_title_field2, 'OR');
			currentIds4 = w2ui[par1].last.searchIds;
		} else {
			currentIds4 = initdata
		}
		if (search_title_field3.length > 0) {
			w2ui[par1].search(search_title_field3, 'OR');
			currentIds5 = w2ui[par1].last.searchIds;
		} else {
			currentIds5 = initdata
		}
		if (search_title_field5.length > 0) {
			w2ui[par1].search(search_title_field5, 'OR');
			currentIds6 = w2ui[par1].last.searchIds;
		} else {
			currentIds6 = initdata
		}
		if (search_title_field4.length > 0) {
			w2ui[par1].search(search_title_field4, 'OR');
			currentIds7 = w2ui[par1].last.searchIds;
		} else {
			currentIds7 = initdata
		}
		if (search_title_translat_eng.length > 0) {
			w2ui[par1].search(search_title_translat_eng, 'OR');
			currentIds8 = w2ui[par1].last.searchIds;
		} else {
			currentIds8 = initdata
		}
		if (search_title_translit.length > 0) {
			w2ui[par1].search(search_title_translit, 'OR');
			currentIds9 = w2ui[par1].last.searchIds;
		} else {
			currentIds9 = initdata
		}

		// AND SELECTION
		var common = ""

		temp0 = $.grep(currentIds1, function (element) {
			return $.inArray(element, currentIds2) !== -1;
		});

		temp1 = $.grep(temp0, function (element) {
			return $.inArray(element, currentIds3) !== -1;
		});

		temp2 = $.grep(temp1, function (element) {
			return $.inArray(element, currentIds4) !== -1;
		});

		temp3 = $.grep(temp2, function (element) {
			return $.inArray(element, currentIds5) !== -1;
		});

		temp4 = $.grep(temp3, function (element) {
			return $.inArray(element, currentIds6) !== -1;
		});

		temp5 = $.grep(temp4, function (element) {
			return $.inArray(element, currentIds7) !== -1;
		});

		temp6 = $.grep(temp5, function (element) {
			return $.inArray(element, currentIds8) !== -1;
		});

		common = $.grep(temp4, function (element) {
			return $.inArray(element, currentIds9) !== -1;
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
	$("#selectionResult_titles").on("click", function () {
		$(".results").show();
		$.fn.ignore = function (sel) {
			return this.clone().find(sel || ">*").remove().end();
		};
		file = ($(".mt-2.mb-3").find("span").text());
		collection = file.split(' ');
		select(values = selvalues, par1 = "grid3");

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
