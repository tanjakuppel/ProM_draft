$(function(){
	if(window.location != window.parent.location)
		$("<a>", {target:"_blank", href:""})
		.text("[pop out]").prependTo($("body"));

	$("#statisticsOutput").pivotUI(
		$.csv.toArrays($("#statisticsOutput").text()),
		$.extend({
			renderers: $.extend(
				$.pivotUtilities.renderers,
				$.pivotUtilities.c3_renderers,
				$.pivotUtilities.d3_renderers,
				$.pivotUtilities.export_renderers
			),
			hiddenAttributes: [""]
		}, {})
	).show();
});

$(document).ready(function(){
		$(".pvtTriangle").html("+");
});
