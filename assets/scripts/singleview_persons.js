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

function getValue(file) {
	var value = $.ajax({
		url: file,
		dataType: 'json',
		async: false
	}).responseText;
	return value;
}

persons = $.parseJSON(getValue('../data/persons.json'))
persons_sel = persons[4]
objects = $.parseJSON(getValue('../data/objects.json'))
objects_sel = objects[4]
titles = $.parseJSON(getValue('../data/titles.json'))
titles_sel = titles[4]
relationright = $.parseJSON(getValue('../data/relation_rightleftid.json'))
relationleft = $.parseJSON(getValue('../data/relation_leftrightid.json'))
datings = $.parseJSON(getValue('../data/dating_selection.json'))

var sel_record = parameters.ids;
var sel_name = parameters.name;

//loop
var i;
var samename = [];

$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">ID: </span>' + (persons_sel[sel_record].id_persons).toString() + '</div>').appendTo('#singleViewMeta_General');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Name: </span><span' +
	' class="font-aegypt">' + (persons_sel[sel_record].name).toString() + '</></div>').appendTo('#singleViewMeta_General');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">English: </span>' + (persons_sel[sel_record].name_translit).toString() + '</div>').appendTo('#singleViewMeta_General');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Additional name: </span><span' +
	' class="font-aegypt">' + (persons_sel[sel_record].other_name).toString() + '</span></div>').appendTo('#singleViewMeta_General');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Gender: </span>' + (persons_sel[sel_record].gender).toString() + '</div>').appendTo('#singleViewMeta_General');

$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Reference: </span>' + (persons_sel[sel_record].person_no_ranke).toString() + '</div>').appendTo('#singleViewMeta_add');

key = relationleft["persons_dating_" + sel_record].right_id;
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">After Dynasty: </span>' + (datings[key].dating).toString() + '</div>').appendTo('#singleViewMeta_dating');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">After king: </span>' + (datings[key].kingdom).toString() + '</div>').appendTo('#singleViewMeta_dating');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">After regnal years: </span>' + (datings[key].period).toString() + '</div>').appendTo('#singleViewMeta_dating');

$.each(persons[2], function (index, value_pers) {
	if (sel_name == value_pers.name) {
		string = "<p><nobr><a href='singleview_persons.html?ids=" + value_pers.id_persons + "&name=" + value_pers.name + "'>";
		samename.push({
			"ids": value_pers.id_persons,
			"name": value_pers.name,
			"englisch": value_pers.name_translit,
			"gender": value_pers.gender,
			"key": value_pers.id_persons.toString()
		})
	}
});

//########################################################################
//                           Create JSON
//########################################################################

var myObject = new Object();
var objects_arr = []
var persons_arr = []
var titles_arr = []

key = "persons_objects_" + sel_record;
try {
	arr = relationleft[key].right_id
	objecttype = []

	$.each(objects[2], function (index, value_obj) {
		var i = 0;
		objecttype.push(value_obj.object_type)
		while (arr[i]) {
			if (value_obj.id_objects == arr[i]) {
				objects_arr.push({
					"object_id": value_obj.id_objects,
					"type": value_obj.object_type,
					"provenance": value_obj.object_provenance,
					"subtype": value_obj.object_subtype,
					"location": value_obj.object_location,
					"inventory": value_obj.inventory_no
				});
			}
			i++;
		}
	});
} catch (e) {
	console.log(e)
}

key = "persons_persons_" + sel_record;
try {
	arr1 = relationright[key].left_id
	nametranslit = []
	$.each(persons[2], function (index, value_pers) {
		var i = 0;
		nametranslit.push(value_pers.name_translit)
		while (arr1[i]) {
			if (value_pers.id_persons == arr1[i]) {
				persons_arr.push({
					"person_id": value_pers.id_persons,
					"person_name": value_pers.name,
					"person_name_translit": value_pers.name_translit,
					"gender": value_pers.gender
				});
			}
			i++;
		}
	});
} catch (e) {
	console.log(e)
}
key = "persons_titles_" + sel_record;
$.each(titles[2], function (index, value_title) {
	try {
		arr = relationleft[key].right_id
		var i = 0;
		while (arr[i]) {
			if (value_title.id == arr[i]) {
				titles_arr.push({
					"title_id": value_title.id,
					"title": value_title.titles_translit,
					"title_translat": value_title.titles_translat_eng,
					"gender": value_title.field4
				});
			}
			i++;
		}
	} catch (e) {
	}

});

//################################################
//--------  Create JSON Visualize ----------------
//################################################
//######## Citation ##########
$("<div class=\"single-view__metadata-item\"><span>Permalink:</span> <a href='" + document.URL + "'>" + document.URL + "</a></div>").appendTo('#singleViewMeta_citation');
$("<div class=\"single-view__metadata-item\"><span>Citation: Anne Herzberg-Beiersdorf, Prosopographia Memphitica, </span><a href='" + document.URL + "'>" + document.URL + "</a>, Access Date: 28.02.2020</div>").appendTo('#singleViewMeta_citation');

//##################### Show related objects ######################################################################################
if (objects_arr.length > 0) {
	let $table = $('#sv__table_RO');
	let $tbody = $table.append('<tbody class="single-view__table-body" />').children('tbody');

	$.each(objects_arr, function (index, p) {
		string = "<td><a href='singleview_objects.html?ids=" + p.object_id + "'>";
		$tbody.append('<tr class="sv__tableRow_RO" />').children('tr:last')
		.append(string + p.object_id + "</td>")
		.append("<td>" + p.type + "</td>")
		.append("<td>" + p.subtype + "</td>")
		.append("<td>" + p.provenance + "</td>")
		.append("<td>" + p.location + "</td>")
		.append("<td>" + p.inventory + "</td>")
	})

	$('#sv__relatedObjects').show();
	$table.appendTo('#sv__relatedObjectsMeta');
}

//################## Show related persons #########################################################################################
if (persons_arr.length > 0) {
	let $table = $('#sv__table_RP');
	let $tbody = $table.append('<tbody class="single-view__table-body" />').children('tbody');
	$.each(persons_arr, function (index, p) {
		string = "<td><a href='singleview_persons.html?ids=" + p.person_id + "&name=" + p.name + "'>";
		$tbody.append('<tr class="sv__tableRow_RP" />').children('tr:last')
		.append(string + p.person_id + "</a></td>")
		.append("<td class='font-aegypt'>" + p.person_name + "</td>")
		.append("<td>" + p.person_name_translit + "</td>")
		.append("<td>" + p.gender + "</td>")
	})

	$('#sv__relatedPersons').show();
	$table.appendTo('#sv__relatedPersonsMeta');
}

//############# Show Related Titles ##############################################################################################
if (titles_arr.length > 0) {
	let $table = $('#sv__table_RT');
	let $tbody = $table.append('<tbody class="single-view__table-body" />').children('tbody');

	$.each(titles_arr, function (index, p) {
		string = "<td><a href='singleview_titles.html?ids=" + p.title_id + "'>";

		$tbody.append('<tr class="sv__tableRow_RT" />').children('tr:last')
		.append(string + p.title_id + "</td>")
		.append("<td class='font-aegypt'>" + p.title + "</td>")
		.append("<td>" + p.title_translat + "</td>")
		.append("<td>" + p.gender + "</td>")
	})

	$('#sv__relatedTitles').show();
	$table.appendTo('#sv__relatedTitlesMeta');
}

//##### Same Name ##########
if (samename.length > 0) {
	let $table = $('#sv__table_ST');
	let $tbody = $table.append('<tbody class="single-view__table-body" />').children('tbody');

	$.each(samename, function (index, p) {
		string = "<td><a href='singleview_persons.html?ids=" + p.ids + "&name=" + p.name + "'>";
		$tbody.append('<tr id="sv__tableRow_ST" class="sv__tableRowST" />').children('tr:last')
		.append(string + p.ids + "</td>")
		.append("<td class='font-aegypt'>" + p.name + "</td>")
		.append("<td>" + p.englisch + "</td>")
		.append("<td>" + p.gender + "</td>")
	});

	$('#sv__sameTypes').show();
	//$('#svP_toggleST').show();
	$table.appendTo('#sv__sameTypeMeta');
}

//### Toggle Related Objects ##############
if ($('.sv__tableRow_RO').length > 6) {
	$('.sv__tableRow_RO:gt(5)').hide();
	$('#sv__toggle_RO').show();
}
$('#sv__toggle_RO').on('click', function () {
	$('.sv__tableRow_RO:gt(5)').toggle();
	$(this).text() === 'Show more' ? $(this).text('Show less') : $(this).text('Show more');
});

//### Toggle Related Persons ##############
if ($('.sv__tableRow_RP').length > 6) {
	$('.sv__tableRow_RP:gt(5)').hide();
	$('#sv__toggle_RP').show();
}
$('#sv__toggle_RP').on('click', function () {
	$('.sv__tableRow_RP:gt(5)').toggle();
	$(this).text() === 'Show more' ? $(this).text('Show less') : $(this).text('Show more');
});

//### Toggle Related Titles ##############
if ($('.sv__tableRow_RT').length > 6) {
	$('.sv__tableRow_RT:gt(5)').hide();
	$('#sv__toggle_RT').show();
}

$('#sv__toggle_RT').on('click', function () {
	$('.sv__tableRow_RT:gt(5)').toggle();
	$(this).text() === 'Show more' ? $(this).text('Show less') : $(this).text('Show more');
});

//### Toggle Same Objects ##############
if ($('.sv__tableRow_ST').length > 6) {
	$('.sv__tableRow_ST:gt(5)').hide();
	$('#sv__toggle_ST').show();
}

$('#sv__toggle_ST').on('click', function () {
	$('.svP__tableRow_ST:gt(5)').toggle();
	$(this).text() === 'Show more' ? $(this).text('Show less') : $(this).text('Show more');
});

//### Remove font class of 'not recorded' records ##############
$('span:contains("not recorded")').css('font-family', 'Red Hat Text');


