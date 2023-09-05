var plp = [];
var plo = [];
var plt = [];

function allTables(var1 = "") {
	console.log("Hallo grid.js");
	persons[1][1]["style"] = "font-family: aegypt;"
	titles[1][2]["style"] = "font-family: aegypt;"
	persons[1][1]["caption"] = "Egyptian name";
	persons[1][2]["caption"] = "English name";

	//##################################   PERSONS  #########################################

	if (w2ui['grid1'] != null) {
		w2ui['grid1'].reset();
		w2ui['grid1'].destroy();
	}

	$('#grid1').w2grid({
		name: 'grid1',
		recordHeight: 30,
		show: {
			toolbar: true
		},
		multiSearch: true,
		searches: persons[0],
		columns: persons[1],
		records: persons[2],

		onSearch: function (event) {
			var grid = this;
		},

		onClick: function (event) {
			var grid = this;
			//Anmerkung: das sind die Ids aus der onSearch Funktion davor!
			//Beim nächsten Aufruf, werden die Search IDs ausgegeben
			//Daher hier bei onClick die Methode '.last'

			$.each(currentIds, function (index, value) {
				plp.push({"id": grid.get(value).id_persons, "name": grid.get(value).name_translit})
			});

			$(document).ready(function () {
				var count = 0

				if (currentIds.length === 1 ) {
					$('.persons .scroll-control').addClass('scroll-control_disabled');
				}

				$("#scroll-next_persons").click(function () {
					count = count + 1
					document.getElementById('singleView').setAttribute('src', "detail/singleview_persons.html?ids=" + plp[count].id + "&name=" + plp[count].name)
				});

				$("#scroll-prev_persons").click(function () {
					count = count - 1
					document.getElementById('singleView').setAttribute('src', "detail/singleview_persons.html?ids=" + plp[count].id)
				});
			});

			// Show result of grid selection in a singleview_objects.html
			event.onComplete = function () {
				var sel_rec_ids = grid.getSelection();

				if (sel_rec_ids.length) {
					var sel_record = grid.get(sel_rec_ids[0]);
					w2ui['layout'].hide('right', window.instant)
					w2ui['layout'].show('main', window.instant)
					$(".result-details__clear").show();

					// Open iframe
					$(".result-details").show();
					document.getElementById('singleView').setAttribute('src', "detail/singleview_persons.html?ids=" + (sel_record.id_persons).toString());
					$('body').css('overflow', 'hidden');

				}
			}
		}
	});

	// Clear grid1 selection result
	$("#persons__clearResultDetails").click(function () {
		$(".result-details").hide();
		$(".result-details__clear").hide();
		$('body').css('overflow', 'unset')
	});

//##################################   OBJECTS  #########################################
	if (w2ui['grid2'] != null) {
		w2ui['grid2'].reset();
		w2ui['grid2'].destroy();
	}

	$('#grid2').w2grid({
		name: 'grid2',
		recordHeight: 30,
		style: 'font-size:32px;',
		show: {
			toolbar: true,
		},

		multiSearch: true,
		searches: objects[0],
		columns: objects[1],
		records: objects[2],

		onSearch: function (target, info) {
			var grid = this;
		},

		onClick: function (event) {
			var grid = this;

			$.each(currentIds, function (index, value) {

				plo.push({"id": grid.get(value).id_objects, "type": grid.get(value).object_type})
			});

			$(document).ready(function () {
				var count = 0

				if (currentIds.length === 1 ) {
					$('.objects .scroll-control').addClass('scroll-control_disabled');
				}

				$("#scroll-next_objects").click(function () {
					count = count + 1
					document.getElementById('singleView').setAttribute('src', "detail/singleview_objects.html?ids=" + plo[count].id + "&type=" + plo[count].type)
				});

				$("#scroll-next_prev").click(function () {
					count = count - 1
					document.getElementById('singleView').setAttribute('src', "detail/singleview_objects.html?ids=" + plo[count].id + "&type=" + plo[count].type)
				});
			});

			// Show result of grid selection in a singleview_objects.html
			event.onComplete = function () {
				var sel_rec_ids = grid.getSelection();

				if (sel_rec_ids.length) {
					//w2ui['layout'].show('right', window.instant)
					var sel_record = grid.get(sel_rec_ids[0]);
					w2ui['layout'].hide('right', window.instant)
					//w2ui['layout'].show('bottom', window.instant)
					w2ui['layout'].show('main', window.instant)
					$(".result-details__clear").show()

					// Iframe
					$(".result-details").show();
					document.getElementById('singleView').setAttribute('src', "detail/singleview_objects.html?ids=" + (sel_record.id_objects).toString() + "&type=" + (sel_record.object_type).toString());
					$('body').css('overflow', 'hidden');
				}
			}
		}
	});

	// Clear grid2 selection result
	$("#objects__clearResultDetails").click(function () {
		$(".result-details").hide();
		$(".result-details__clear").hide();
		$('body').css('overflow', 'unset')
	});

//##################################   TITLES  #########################################
	if (w2ui['grid3'] != null) {
		w2ui['grid3'].reset();
		w2ui['grid3'].destroy();
	}

	let [searches, columns, records] = titles;
	$('#grid3').w2grid({
		name: 'grid3',
		recordHeight: 30,
		show: {
			toolbar: true,
		},
		multiSearch: true,
		searches,
		columns,
		records,

		onSearch: function (target, info) {
			var grid = this;
		},

		onClick: function (event) {
			var grid = this;

			$.each(currentIds, function (index, value) {
				plt.push({"id": grid.get(value).id, "title": grid.get(value).titles_translat_eng})
			});

			$(document).ready(function () {
				var count = 0

				if (currentIds.length === 1 ) {
					$('.titles .scroll-control').addClass('scroll-control_disabled');
				}

				$("#scroll-next_titles").click(function () {
					count = count + 1
					document.getElementById('singleView').setAttribute('src', "detail/singleview_titles.html?ids=" + plt[count].id + "&title=" + plt[count].title)
				});

				$("#scroll-prev_titles").click(function () {
					count = count - 1
					document.getElementById('singleView').setAttribute('src', "detail/singleview_titles.html?ids=" + plt[count].id + "&title=" + plt[count].title)
				});
			});

			event.onComplete = function () {
				var sel_rec_ids = grid.getSelection();
				if (sel_rec_ids.length) {
					var sel_record = grid.get(sel_rec_ids[0]);
					w2ui['layout'].hide('right', window.instant);
					w2ui['layout'].show('main', window.instant);
					$(".result-details__clear").show();
					$(".result-details").show();

					document.getElementById('singleView').setAttribute('src', "detail/singleview_titles.html?ids=" + (sel_record.id).toString() + "&title=" + (sel_record.titles_translat_eng).toString());
					$('body').css('overflow', 'hidden');
				}
			}
		}
	});

	// Clear grid1 selection result
	$("#titles__clearResultDetails").click(function () {
		$(".result-details").hide();
		$(".result-details__clear").hide();
		$('body').css('overflow', 'unset')
	});

//##################################   GLOBAL GRID  #########################################
	if (w2ui.hasOwnProperty('layout')) {
		$().w2destroy('layout');
	}

	$('#layout').w2layout({
		name: 'layout',
		panels: [
			{type: 'main', content: 'main content grid 2'},
		]
	});

	$(function () {
		w2ui['grid1'].hideColumn('notes', 'to_do', 'link_bonner_totenbuch', 'link_trismegistos', 'link_tla', 'person_no_ranke')
		w2ui['grid2'].hideColumn('object_subtype_other', 'object_provenance_detail', 'object_provenance_reconstructed', 'object_component', 'object_material', 'object_text_format', 'object_image_format', 'object_location_detail', 'condition', 'obejct_technique', 'object_height', 'object_lenght', 'object_width', 'object_description', 'notes', 'to_do', 'measurements_unit', 'weblink', 'literature', 'digital_resource')
		w2ui['grid3'].hideColumn('titles_index', 'titles_translat', 'region', 'gott_kult', 'ad_sec', 'field2', 'field3', 'field5', 'field6', 'titel_hierach', 'titel_kern', 'titel_spez_taetigkeit', 'titel_spez_gott_koenig_pers', 'titel_spez_epitheton', 'titel_spez_institution', 'titel_spez_toponym', 'old_ids')
	});
}
