$("#persname").hide()
$("#title").hide()

keys=[["object_type","Type","#bsd1-container"],["object_subtype","Subtype","#bsd2-container"],["object_subtype_other","Subtype II","#bsd3-container"],["object_location","Location","#bsd4-container"],["object_provenance","Provenance","#bsd5-container"],["object_material","Material","#bsd6-container"]]

function BasicMenu(var1, par1="", par2="", par3="") {
  obj = par1;
  $.each(keys, function(index) {
    console.log(keys[index][0])
    c = $("<div class=\"form-group\" id="+obj[keys[index][0]][1]+">" +
    "<div id="+obj[keys[index][0]][2]+">" +
    "<h6 id="+obj[keys[index][0]][3]+"></h6>" +
    "</div>" +
    "</div>")

    var data=obj[keys[index][0]][0];
    var s = $("<select id="+obj[keys[index][0]][5]+" class=\"form-control\" multiple/>");
    for(var val in data) {
      $("<option/>", {value: data[val], text: data[val]}).appendTo(s);
    }
    s.appendTo(var1);
  })
}

function DropdownMenu(var1, var2, par1) {
  obj=par1;
  w2ui.layout.content('main', var2);
}

function SelectionMenu(var1, par1, par2) {
    obj=par1;
    $( "<span id='object_types' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues")
    $( "<span id='object_subtypes' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues")
    $( "<span id='object_subtype_others' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues")
    $( "<span id='object_locations' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues")
    $( "<span id='object_provenances' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues")
    $( "<span id='object_materials' class='current-selection__selected-title'></span>" ).appendTo("#selectedvalues")

    $(".current-selection__container").hide();

    $("#filter-container" ).on("click", ".dropdown-item", function () {
      var temp=$( ".dropdown-item.active" ).closest(".dropdown.show").attr("id");
      $("#selectedvalues").css("opacity","1")
      d=$( ".mt-2.mb-3" ).text();
      f=d.split('[X]').filter(function( v ) {
        return v !== ''
      });

      $(".current-selection__container").show();
      $("#resetFilter").css("display", "flex");

      selvalues = new Object();
      $("#object_types").find('.current-selection__selected-value').remove();
      $("#object_subtypes").find('.current-selection__selected-value').remove();
      $("#object_subtype_others").find('.current-selection__selected-value').remove();
      $("#object_locations").find('.current-selection__selected-value').remove();
      $("#object_provenances").find('.current-selection__selected-value').remove();
      $("#object_materials").find('.current-selection__selected-value').remove();

      $.each(f, function (index) {
        //console.log(f);
        $.each(keys, function (index_basic) {
          if ($.inArray($.trim(f[index]), objects[3][keys[index_basic][1]]) != -1) {
            $("#" + keys[index_basic][0] + "s").css("opacity", "1");
            $("#" + keys[index_basic][0]).css("opacity", "1");
            $("#" + keys[index_basic][0] + "s").append("<span class='current-selection__selected-value'>  " + f[index] + "  </span>");
            selvalues[$.trim(f[index])] = keys[index_basic][0]
          }
        });
      });
      //console.log("selValues");
      //console.log(selvalues);
    });
}

function getDropdownObjects() {
  $('<button id="textfieldsearch_objects">Show results</button>').appendTo("#showResults")
  var myObject = new Object();

  myObject["object_type"] = [objects[3].Type, "obj_type", "object", "type", "Object type", "type", "#type", "#bsd1-container", "type", "type"]
  myObject["object_subtype"] = [objects[3].Subtype, "obj_subtype", "object", "subtype", "Object sub-type", "subtype", "#subtype", "#bsd2-container", "subtype", "subtype"]
  myObject["object_subtype_other"] = [objects[3]["Subtype II"], "obj_subtype_other", "object", "subtype_other", "Object Sub-type II", "subtype_other", "#subtype_other", "#bsd3-container", "subtype_other", "subtype_other"]
  myObject["object_location"] = [objects[3].Location, "obj_location", "object", "location", "Object location", "location", "#location", "#bsd4-container", "location", "loction"]
  myObject["object_provenance"] = [objects[3].Provenance, "obj_provenance", "object", "provenance", "Object provenance", "provenance", "#provenance", "#bsd5-container", "provenance", "provenance"]
  myObject["object_material"] = [objects[3].Material, "obj_material", "object", "location", "Object material", "material", "#material", "#bsd6-container", "material", "material"]

  var vars = JSON.stringify(myObject);
  var obj = jQuery.parseJSON(vars);
  //console.log("OBJECTS")
  //console.log(obj)

  $.getScript("libraries/bootstrap-select-dropdown.js", function () {
    $.each(keys, function (index_basic) {
      $(obj[keys[index_basic][0]][6]).selectDropdown(
        {
          'badges': true,
          'showSelected': false,
        });
      $(obj[keys[index_basic][0]][7] + " .input-group .form-control").attr("placeholder", obj[keys[index_basic][0]][4]);
    })
  });

  BasicMenu("#objectsl", par1 = obj, par2 = 0, par3 = "");
  DropdownMenu("#objectsl", w2ui.grid2, par1 = obj);
  SelectionMenu("#objectsl", par1 = obj, "grid2");

  buttonlist = ["#bsd1-button", "#bsd2-button", "#bsd3-button", "#bsd4-button", "#bsd5-button", "#bsd6-button"]
  $.each(buttonlist, function (index) {
  });

  // initialize grid
  initdata = []
  $.each(objects[2], function (index, value_obj) {
    initdata.push(parseInt(value_obj.recid))
  });

  initlist = []
  $.each(initdata, function (index) {
    initlist.push(w2ui['grid2'].get(initdata[index]));
  })

  $(".results").hide();

  $("#textfieldsearch_objects").on("click", function () {
    $(".results").show();
    $('#layout').show()
    w2ui["grid2"].clear();
    w2ui["grid2"].add(initlist);
    v = $("#searchFields_objects").val();
    g = w2ui["grid2"].getSearch();

    // Text search: Search by Button activate.
    fieldsearch = [];
    $.each(g, function (index) {
      fieldsearch.push({
        field: g[index], value: v, operator: $('input:radio[name=query]:checked').val()
      });
    });
    //console.log(fieldsearch)
    w2ui["grid2"].search(fieldsearch, 'OR');
    currentIds = w2ui["grid2"].last.searchIds;
    $("#filter-container").hide();
    $("#currentSelection").hide();
    $("#resultsHeaderFilter").hide();
    $("#searchResultsClear").show();
    $("#searchResultsTitle").show();

    w2ui["layout"].show('main', w2ui.grid2);

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
    $('#layout').show()
    w2ui['layout'].show('main', window.instant)
    w2ui['layout'].hide('right', window.instant)
    w2ui[par1].clear();
    w2ui[par1].add(initlist);
    var search_object_type = []
    var search_object_subtype = []
    var search_object_location = []
    var search_object_provenance = []
    var search_object_material = []
    var search_object_subtype_other = []

    $.each(values, function (index) {
      if (values[index] == "object_type") {
        search_object_type.push({field: values[index], value: String(index), operator: "is"})
      }
      if (values[index] == "object_subtype") {
        search_object_subtype.push({field: values[index], value: String(index), operator: "is"})
      }
      if (values[index] == "object_location") {
        f = (String(index).replace(' (location)', ''))
        search_object_location.push({field: values[index], value: f, operator: "is"})
      }
      if (values[index] == "object_provenance") {
        f = (String(index).replace(' (provenance)', ''))
        search_object_provenance.push({field: values[index], value: String(index), operator: "is"})
      }
      if (values[index] == "object_material") {
        search_object_material.push({field: values[index], value: String(index), operator: "is"})
      }
      if (values[index] == "object_subtype_other") {
        search_object_subtype_other.push({field: values[index], value: String(index), operator: "is"})
      }
    });

    var currentIds1 = []
    var currentIds2 = []
    var currentIds3 = []
    var currentIds4 = []
    var currentIds5 = []
    var currentIds6 = []

    if (search_object_type.length > 0) {
      w2ui[par1].search(search_object_type, 'OR');
      currentIds1 = w2ui[par1].last.searchIds;
    } else {
      currentIds1 = initdata
    }

    if (search_object_subtype.length > 0) {
      w2ui[par1].search(search_object_subtype, 'OR');
      currentIds2 = w2ui[par1].last.searchIds;
    } else {
      currentIds2 = initdata
    }

    if (search_object_location.length > 0) {
      w2ui[par1].search(search_object_location, 'OR');
      currentIds3 = w2ui[par1].last.searchIds;
    } else {
      currentIds3 = initdata
    }

    if (search_object_provenance.length > 0) {
      w2ui[par1].search(search_object_provenance, 'OR');
      currentIds4 = w2ui[par1].last.searchIds;
    } else {
      currentIds4 = initdata
    }

    if (search_object_material.length > 0) {
      w2ui[par1].search(search_object_material, 'OR');
      currentIds5 = w2ui[par1].last.searchIds;
    } else {
      currentIds5 = initdata
    }

    if (search_object_subtype_other.length > 0) {
      w2ui[par1].search(search_object_subtype_other, 'OR');
      currentIds6 = w2ui[par1].last.searchIds;
    } else {
      currentIds6 = initdata
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

    common = $.grep(temp3, function (element) {
      return $.inArray(element, currentIds6) !== -1;
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
  $("#selectionResult_objects").on("click", function () {
    $(".results").show();
    $.fn.ignore = function (sel) {
      return this.clone().find(sel || ">*").remove().end();
    };
    file = ($(".mt-2.mb-3").find("span").text());
    collection = file.split(' ');
    select(values = selvalues, par1 = "grid2");

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


