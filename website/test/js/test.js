function getData() {
    var params = { apiType: $("#inpApiatype").val(), method: $("#inpMethod").val(), serial: $("#tarParams").val(), numerator: 1};
    var myParams = { numerator: 1, serial: $("#tarParams").val()};
    siteCore.getData(params).then(function (data) {
        //$("#results").text(JSON.stringify(data));
        var table_template = $("#table_template").html();
        var comp = _.template(table_template);
        $("#results").html(comp({ data: data }));
    }).fail(function (err) {
        $("#results").text(JSON.stringify(err));
    });
}

function runTest  () {
    siteCore.sendApiReq  ($("#inpApiatype").val(), $("#inpMethod").val(), JSON.parse($("#tarParams").val())).then(function (data) {
        //$("#results").text(JSON.stringify(data));
        var table_template = $("#table_template").html();
        var comp = _.template(table_template);
        $("#results").html(comp({ data: data }));
    }).fail(function (err) {
        $("#results").text(JSON.stringify(err));
    });
}

