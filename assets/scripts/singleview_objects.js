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
    async: false
  }).responseText;
  return value;
}

bildverwaltung = $.parseJSON(getValue('../objects_images/Bildverwaltung_ProM.json'))
persons = $.parseJSON(getValue('../data/persons.json'))
persons_sel = persons[4]
objects = $.parseJSON(getValue('../data/objects.json'))
objects_sel = objects[4]
titles = $.parseJSON(getValue('../data/titles.json'))
titles_sel = titles[4]
relationright = $.parseJSON(getValue('../data/relation_rightleftid.json'))
relationleft = $.parseJSON(getValue('../data/relation_leftrightid.json'))
datings = $.parseJSON(getValue('../data/dating_selection.json'))
images = $.parseJSON(getValue('../data/Konkordanzliste.json'))

var sel_record = parameters.ids;
var sel_type = parameters.type;
var i;

$.each(bildverwaltung, function (index, value_image) {
  if (value_image.ID == sel_record.toString()) {
    $('#sv_imageLink').append('<img id="sv_image" class="single-view__image" />')
    document.getElementById('sv_image').setAttribute('src', value_image.Link);
    if (value_image.Status == "online vorhanden") {
      document.getElementById('sv_imageLink').setAttribute('href', value_image.Collection);
      $('<p>For gallery view click on the image</p>').appendTo('.singleViewImage_objects');
    }
    $('<p>Holder: ' + (value_image.Holder).toString() + '</p>').appendTo('#sv_imageCredits');
    $('<p>Credits: ' + (value_image.Credits).toString() + '</p>').appendTo('#sv_imageCredits');
    return false;
  }
});

//loop
var sametype = [];

$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">ID: </span>' + (objects_sel[sel_record].id_objects).toString() + '</div>').appendTo('#singleViewMeta_General');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Type: </span>' + (objects_sel[sel_record].object_type).toString() + '</div>').appendTo('#singleViewMeta_General');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Subtype 1: </span>' + (objects_sel[sel_record].object_subtype).toString() + '</div>').appendTo('#singleViewMeta_General');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Subtype 2: </span>' + (objects_sel[sel_record].object_subtype_other).toString() + '</div>').appendTo('#singleViewMeta_General');

$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Material: </span>' + (objects_sel[sel_record].object_material).toString() + '</div>').appendTo('#singleViewMeta_technical');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Length [cm]: </span>' + (objects_sel[sel_record].object_lenght).toString() + '</div>').appendTo('#singleViewMeta_technical');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Width [cm]: </span>' + (objects_sel[sel_record].object_width).toString() + '</div>').appendTo('#singleViewMeta_technical');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Height [cm]: </span>' + (objects_sel[sel_record].object_height).toString() + '</div>').appendTo('#singleViewMeta_technical');

key = relationleft["objects_dating_" + sel_record].right_id;
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">After Dynasty: </span>' + (datings[key].dating).toString() + '</span>').appendTo('#singleViewMeta_dating');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">After king: </span>' + (datings[key].kingdom).toString() + '</span>').appendTo('#singleViewMeta_dating');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">After regnal years: </span>' + (datings[key].period).toString() + '</span>').appendTo('#singleViewMeta_dating');

$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Text: </span>' + (objects_sel[sel_record].object_text_format).toString() + '</span>').appendTo('#singleViewMeta_add');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Image: </span>' + (objects_sel[sel_record].object_image_format).toString() + '</span>').appendTo('#singleViewMeta_add');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Note: </span>' + (objects_sel[sel_record].notes).toString() + '</span>').appendTo('#singleViewMeta_add');

$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Provenance: </span>' + (objects_sel[sel_record].object_provenance).toString() + '</span>').appendTo('#singleViewMeta_provenance');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Reconstructed provenance: </span>' + (objects_sel[sel_record].object_provenance_reconstructed).toString() + '</span>').appendTo('#singleViewMeta_provenance');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Excavation: </span>' + (objects_sel[sel_record].object_provenance_detail).toString() + '</span>').appendTo('#singleViewMeta_provenance');

$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Location: </span>' + (objects_sel[sel_record].object_location).toString() + '</div>').appendTo('#singleViewMeta_location');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Inv no: </span>' + (objects_sel[sel_record].inventory_no).toString() + '</div>').appendTo('#singleViewMeta_location');
$('<div class="single-view__metadata-item"><span class="single-view__metadata-title">Acquisition: </span>' + (objects_sel[sel_record].object_location_detail).toString() + '</div>').appendTo('#singleViewMeta_location');

$('<div class="single-view__metadata-item">' + (objects_sel[sel_record].literature).toString() + '</div>').appendTo('#singleViewMeta_lit');


$.each(objects[2], function (index, value_obj) {
  if (sel_type == value_obj.object_type) {
    string = "<p><nobr><a href='singleview_objects.html?ids=" + value_obj.id_objects + "&type=" + value_obj.object_type + "'>";
    sametype.push({
      "ids": value_obj.id_objects,
      "type": value_obj.object_type,
      "subtype": value_obj.object_subtype,
      "provenance": value_obj.object_provenance,
      "location": value_obj.object_location,
      "inventory": value_obj.inventory_no,
      "key": value_obj.id_objects.toString()
    })
  }
});

//console.log(sametype)

//########################################################################
//                           Create JSON
//########################################################################
var myObject = new Object();
var objects_arr = []
var persons_arr = []
var titles_arr = []

key = "objects_objects_" + sel_record;

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
          "object_type": value_obj.object_type,
          "object_provenance": value_obj.object_provenance,
          "object_provenance_detail": value_obj.object_provenance_detail,
          "object_material": value_obj.object_material,
          "object_description": value_obj.object_description
        });
      }
      i++;
    }
  });
} catch (e) {
  console.log(e)
}

key = "persons_objects_" + sel_record;
try {
  arr1 = relationright[key].left_id
  nametranslit = []
  $.each(persons[2], function (index, value_pers) {
    var i = 0;
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

key = "objects_titles_" + sel_record;
$.each(titles[2], function (index, value_title) {
  try {
    arr = relationleft[key].right_id
    var i = 0;
    while (arr[i]) {
      if (value_title.id == arr[i]) {
        titles_arr.push({
          "title_id": value_title.id,
          "title_translat": value_title.titles_translat,
          "title_gott_kult": value_title.gott_kult
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
//############# Show Related Objects ##############################################################################################
if (objects_arr.length > 0) {
  let $table = $('#sv__table_RO');
  let $tbody = $table.append('<tbody class="single-view__table-body" />').children('tbody');

  $.each(objects_arr, function (index, p) {
    string = "<td><a href='singleview_objects.html?ids=" + p.object_id + "'>";
    $tbody.append('<tr class="sv__tableRow_RO" />').children('tr:last')
    .append(string + p.object_id + "</td>")
    .append("<td>" + p.object_type + "</td>")
    .append("<td>" + p.object_subtype + "</td>")
    .append("<td>" + p.object_provenance + "</td>")
    .append("<td>" + p.object_location + "</td>")
    //.append("<td>"+p.inventory_no+"</td>")
  })

  $('#sv__relatedObjects').show();
  $table.appendTo('#sv__relatedObjectsMeta');
}

//############# Show Related Persons ##############################################################################################
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
    .append("<td>" + p.title_translat + "</td>")
    .append("<td>" + p.title_gott_kult + "</td>")
  })

  $('#sv__relatedTitles').show();
  $table.appendTo('#sv__relatedTitlesMeta');
}

//##### Same Type ##########
if (sametype.length > 0) {
  let $table = $('#sv__table_ST');
  let $tbody = $table.append('<tbody class="single-view__table-body" />').children('tbody');

  $.each(sametype, function (index, p) {
    string = "<td><a href='singleview_objects.html?ids=" + p.ids + "&type=" + p.type + "'>";
    $tbody.append('<tr class="sv__tableRow_ST" />').children('tr:last')
    .append(string + p.ids + "</td>")
    .append("<td>" + p.type + "</td>")
    .append("<td>" + p.subtype + "</td>")
    .append("<td>" + p.provenance + "</td>")
    .append("<td>" + p.location + "</td>")
    .append("<td>" + p.inventory + "</td>")
  })

  $('#sv__sameTypes').show();
  $('#sv_toggleST').show();
  $table.appendTo('#sv__sameTypeMeta');
}

//######## Citation ##########
$("<div class=\"single-view__metadata-item\"><span>Permalink:</span> <a href='" + document.URL + "'>" + document.URL + "</a></div>").appendTo('#singleViewMeta_citation');
$("<div class=\"single-view__metadata-item\"><span>Citation: Anne Herzberg-Beiersdorf, Prosopographia Memphitica, </span><a href='" + document.URL + "'>" + document.URL + "</a>, Access Date: 28.02.2020</div>").appendTo('#singleViewMeta_citation');

$('a[href*="#"]').on('click', function (e) {
  e.preventDefault();
  var target = this.hash;
  var $target = $(target);

  $('html, body, Content').stop().animate({
      'scrollTop': $target.offset().top
    },
    400, 'swing', function () {
      window.location.hash = target;
    });
});

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
  $('.sv__tableRow_ST:gt(5)').toggle();
  $(this).text() === 'Show more' ? $(this).text('Show less') : $(this).text('Show more');
});
