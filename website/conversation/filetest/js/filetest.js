$("#file_upld").click(function () {
    
   
    
    
    siteCore.sendApiReq("testapi", "saveFiles", { stam: "stam", files: [{ fileElem: $('#testfile') }, { fileElem: $('#testfile1') }] }).done(function (data) {
        alert("uploaded");
    }).fail(function (err) {
        alert("failed");
    });
   
});

//var xhr = new XMLHttpRequest();
//var fd = new FormData();
//fd.append("file", document.getElementById('testfile').files[0]);
//xhr.open("POST", "/f_upload", true);
//xhr.send(fd);



    //$.ajax({
    //    url: '/f_upload',
    //    data: formData,
    //    type: 'POST',
    //    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    //    processData: false, // NEEDED, DON'T OMIT THIS
    //    // ... Other options like success and etc
    //});

    