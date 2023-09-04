

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
var sel_title = parameters.name;

//loop
var i;
var sametitle = [];

$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">ID: </span>' + (titles_sel[sel_record].id).toString() + '</div>').appendTo('#singleViewMeta_General');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Title: </span><span class="font-aegypt">' + (titles_sel[sel_record].titles_translit).toString() + '</span></div>').appendTo('#singleViewMeta_General');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Translation: </span>' + (titles_sel[sel_record].titles_translat_eng).toString() + '</div>').appendTo('#singleViewMeta_General');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Gender: </span>' + (titles_sel[sel_record].field4).toString() + '</div>').appendTo('#singleViewMeta_General');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Reference: </span>' + (titles_sel[sel_record].titles_index).toString() + '</div>').appendTo('#singleViewMeta_General');

$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Core: </span><span' +
	' class="font-aegypt">' + (titles_sel[sel_record].titel_kern).toString() + '</span></div>').appendTo('#singleViewMeta_Technical');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Hierarchical Position:' +
	' </span><span class="font-aegypt">' + (titles_sel[sel_record].titel_hierach).toString() + '</span></div>').appendTo('#singleViewMeta_Technical');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Specification (after' + ' profession): </span><span class="font-aegypt">' + (titles_sel[sel_record].titel_spez_taetigkeit).toString() + '</span></div>').appendTo('#singleViewMeta_Technical');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Specification (after' + ' institution): </span><span class="font-aegypt">' + (titles_sel[sel_record].titel_spez_institution).toString() + '</span></div>').appendTo('#singleViewMeta_Technical');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Specification (after' + ' authority): </span><span class="font-aegypt">' + (titles_sel[sel_record].titel_spez_gott_koenig_pers).toString() + '</span></div>').appendTo('#singleViewMeta_Technical');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Epitheta: </span><span' +
	' class="font-aegypt">' + (titles_sel[sel_record].titel_spez_epitheton).toString() + '</span></div>').appendTo('#singleViewMeta_Technical');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Toponyms: </span><span' + ' class="font-aegypt">' + (titles_sel[sel_record].titel_spez_toponym).toString() + '</span></div>').appendTo('#singleViewMeta_Technical');

$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Gods and other Authorities: </span>' + (titles_sel[sel_record].gott_kult).toString() + '</span>').appendTo('#singleViewMeta_Add');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Toponyms: </span>' + (titles_sel[sel_record].region).toString() + '</span>').appendTo('#singleViewMeta_add');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Administrative Institution: </span>' + (titles_sel[sel_record].ad_sec).toString() + '</span>').appendTo('#singleViewMeta_Add');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Field of Profession: </span>' + (titles_sel[sel_record].field2).toString() + '</span>').appendTo('#singleViewMeta_Add');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Professional Specialization: </span>' + (titles_sel[sel_record].field3).toString() + '</span>').appendTo('#singleViewMeta_Add');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Profession: </span>' + (titles_sel[sel_record].field5).toString() + '</span>').appendTo('#singleViewMeta_Add');


$.each(titles[2], function (index, value_title) {
	if (sel_title == value_title.titles_translit) {
		string = "<p><nobr><a href='singleview_titles.html?ids=" + value_title.id + "&title=" + value_title.title_translat_eng + "'>";
		sametitle.push({
			"ids": value_title.id,
			"title": value_title.titles_translit,
			"english": value_title.titles_translat_eng,
			"gender": value_title.field4,
			"key": value_title.id.toString()
		})
	}
});

//########################################################################
//                           Create JSON
//########################################################################
var myObject = new Object();
var persons_arr = []

key = "persons_titles_" + sel_record;
try {
	arr = relationright[key].left_id

	$.each(persons[2], function (index, value_pers) {
		var i = 0;
		while (arr[i]) {
			if (value_pers.id_persons == arr[i]) {
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

//################################################
//--------  Create JSON Visualize ----------------
//################################################
//######## Citation ##########
$("<div class=\"single-view__metadata-item\"><span>Permalink:</span> <a href='" + document.URL + "'>" + document.URL + "</a></div>").appendTo('#singleViewMeta_citation');
$("<div class=\"single-view__metadata-item\"><span>Citation: Anne Herzberg-Beiersdorf, Prosopographia Memphitica, </span><a href='" + document.URL + "'>" + document.URL + "</a>, Access Date: 28.02.2020</div>").appendTo('#singleViewMeta_citation');

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

//##### Show Same Title ##########
if (sametitle.length > 1) {
	let $table = $('#sv__table_ST');
	let $tbody = $table.append('<tbody class="single-view__table-body" />').children('tbody');

	$.each(sametitle, function (index, p) {
		string = "<td><a href='singleview_titles.html?ids=" + p.ids + "&title=" + p.title + "'>";
		$tbody.append('<tr class="sv__tableRow_ST" />').children('tr:last')
		.append(string + p.ids + "</td>")
		.append("<td class='font-aegypt'>" + p.title + "</td>")
		.append("<td>" + p.englisch + "</td>")
		.append("<td>" + p.gender + "</td>")
	});

	$('#sv__sameTypes').show();
	$table.appendTo('#sv__sameTypeMeta');
}

//### Toggle Related Persons ##############
if ($('.sv__tableRow_RP').length > 6) {
	$('.sv__tableRow_RP:gt(5)').hide();
	$('#sv__toggle_RP').show();
}

$('#sv__toggle_RP').on('click', function () {
	$('.sv__tableRow_RP:gt(5)').toggle();
	$(this).text() === 'Show more' ? $(this).text('Show less') : $(this).text('Show more');
});

//### Toggle Same Names ##############
if ($('.sv__tableRow_ST').length > 6) {
	$('.sv__tableRow_ST:gt(5)').hide();
	$('#sv__toggle_ST').show();
}

$('#sv__toggle_ST').on('click', function () {
	$('.sv__tableRow_ST:gt(5)').toggle();
	$(this).text() === 'Show more' ? $(this).text('Show less') : $(this).text('Show more');
});

//### Remove font class of 'not recorded' records ##############
$('span:contains("not recorded")').css('font-family', 'Red Hat Text');

