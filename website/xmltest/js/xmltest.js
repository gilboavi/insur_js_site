$("#file_upld").click(function () {




    siteCore.sendApiReq("testapi", "parseXML", { stam: "stam", files: [{ fileElem: $('#testfile') }] }).done(function (data) {
        alert("uploaded");
    }).fail(function (err) {
        alert("failed");
    });

});