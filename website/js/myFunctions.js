


// main function to api.js in api folder  
function setDatePicker(selector) {


    $('.my_date').datetimepicker({
        format: 'DD/MM/YYYY HH:mm'

    });


    //  $('selector').datetimepicker({
    //       format: 'DD/MM/YYYY HH:mm'

    //      });
}

(function(){
    var funcs = {
        stam: stam,
        policy : function(){
            get_tableList_by_params_new({
                id:$('#clientSerialMain').val(), 
                paramType:'police', 
                table_template:'table_life_police', 
                div_name:'conversation_div',
                fields:''});
        },
         conversation : function(){
            get_tableList_by_params_new({
                id:$('#clientSerialMain').val(), 
                paramType:'conver', 
                table_template:'table_conversation', 
                div_name:'conversation_div',
                fields:''});
        }
    };
    $("#FormClient22 li a").each(function(i,el){
        el.onclick = funcs[el.getAttribute('avi-menu')] || function(){};
    });
})();

function get_action_api(_apiType, _method, _params, successcb, failcb) {

    siteCore.sendApiReq({
        action: {
            apiType: _apiType,
            method: _method,
            params: _params
        },
        success: function(data) {
            //  var dataObj = JSON.parse(data);

            // alert(JSON.stringify(data));
            successcb(data);

        },
        fail: function(error) {
            alert('fail');
            if (failcb) {
                failcb(error);
            }
        }
    });
}

function stam() {

    var successcb = function(data) {
        //  alert(data);
        if (data != null) {
            alert(JSON.stringify(data));
            renderTable({}, "#stam", "conversation_div", function() {
                insertDataToHierarchicalTable(data)

            });


            //$("#conversation_div").html(data)

        }
        // else {


        // }
    };

    var failcb = function(error) {
        alert(error);
    };

    get_action_api('api', 'stam', {}, successcb, failcb);

}

function get_tableList_by_params(id, paramType, table_template, div_name, fields) {
    var successcb = function(data) {
        //  alert(data);
        if (data != null) {
            var totalResult = {};
            totalResult.param_name = paramType;
            totalResult.data = data;
            if (fields) {
                totalResult.fields = fields;
            }
            // else
            //     totalResult.fields =Object.keys(data[0]);

            renderTable(totalResult, "#" + table_template, div_name);
        }
        // else {


        // }
    };

    var failcb = function(error) {
        alert(error);
    };


    var my_params = {
        serial: id,
        paramType: paramType
    };

    get_action_api('api', 'get_tableList_by_params', my_params, successcb, failcb);

}

function get_tableList_by_params_new(params) {
    var successcb = function(data) {
        //  alert(data);
        if (data != null) {
            var totalResult = {};
            totalResult.param_name = params.paramType;
            totalResult.data = data;
            if (params.fields) {
                totalResult.fields = params.fields;
            }
            // else
            //     totalResult.fields =Object.keys(data[0]);

            renderTable(totalResult, "#" + params.table_template, params.div_name);
        }
        // else {


        // }
    };

    var failcb = function(error) {
        alert(error);
    };




    get_action_api('api', 'get_tableList_by_params', params, successcb, failcb);

}


function get_record_by_params(id, paramType, table_template, div_name, client_serial, callback) {

    var successcb = function(data) {
        var totalResult = {};
        var a = typeof(data);

        if (data != null) {

            totalResult.paramType = paramType;
            totalResult.data = data;
            renderTable(totalResult, "#" + table_template, div_name, callback);


        }
        else {

            totalResult.paramType = paramType;
            var data1 = {};
            data1.param_name = "";
            totalResult.data = data1;
            renderTable(totalResult, "#" + table_template, div_name, callback);
        }

    };

    var failcb = function(error) {
        alert(error);
    };


    var my_params = {
        serial: id,
        clientSerial: client_serial,
        paramType: paramType
    };


    get_action_api('api', 'get_record_by_params', my_params, successcb, failcb);

}

function get_record_by_params_new(params) {

    var successcb = function(data) {
        var totalResult = {};
        var a = typeof(data);
// alert(JSON.stringify(data));
        if (data != null) {

            totalResult.paramType = params.paramType;
            totalResult.data = data;
            renderTable(totalResult, "#" + params.table_template, params.div_name, params.callback);


        }
        else {

            totalResult.paramType = params.paramType;
            var data1 = {};
            data1.param_name = "";
            totalResult.data = data1;
            renderTable(totalResult, "#" + params.table_template, params.div_name, params.callback);
        }

    };

    var failcb = function(error) {
        alert(error);
    };


    // var my_params = {
    //     serial: id,
    //     clientSerial: client_serial,
    //     paramType: paramType
    // };


    get_action_api('api', 'get_record_by_params', params, successcb, failcb);

}

function save_record_by_serial_and_paramType(params, callback) {
    var successcb = function(data) {

        $.colorbox.close();
        if (callback)
            callback();

    };

    var failcb = function(error) {
        alert(error);
    };




    get_action_api('api', 'save_record_by_serial_and_paramType', params, successcb, failcb);

}

function get_client_by_term(term, callback) {
    var my_params = {
        term: term
    };
    var failcb = function(error) {
        alert(error);
    };
    get_action_api('api', 'get_client_by_term', my_params, callback, failcb);

}



var getRecord = function(){};
getRecord.byParam = function(){};
getRecord.byParam.new = function(){};

// ues by renderTable
function clearElementText(elementID) {
    document.getElementById(elementID).innerHTML = "";
}

// use by get_tableList_by_params
function renderTable(my_data, table_template, div_name, onComplete) {

    var tbl_template = $(table_template).html();
    var comp = _.template(tbl_template);
    if (div_name != "") {
        clearElementText(div_name);
        $("#" + div_name).html(comp({
            data: my_data
        }));
        if (onComplete) {

            onComplete();
        }
    }
    else {
        $.colorbox({
            html: comp({
                data: my_data
            }),
            onComplete: function() {
                // $.colorbox.resize({
                //                       width: '100%',
                //             height: '80%'
                //         });
                if (onComplete) {

                    onComplete();
                }
            }
        });


    }

}





// used for serialize a form when we use save function
$(function() {

    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            }
            else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
});


// functions not in used
// ======================================================================
function get_client_data(id) {

    siteCore.sendApiReq({
        action: {
            apiType: 'clientsapi',
            method: 'get_client_data',
            params: {
                id: id
            }
        },
        success: function(data) {
            var dataObj = JSON.parse(data);
            $("#result").text(JSON.stringify(data));
            $("#first_name").val(dataObj[0].FirstName);
            $("#last_name").val(dataObj[0].LastName);
        },
        fail: function(error) {
            $("#result").text(JSON.stringify("failed"));
        }
    });
}

function addRowsToTableBak(dataObj, table_name, keyName, on_click_bigin_str, on_click_end_str, array_functions) {
    var table = document.getElementById(table_name);

    // console.log(my_pass_str);
    Object.keys(dataObj).forEach(function(keyrow, indexrow) {
        if (dataObj.hasOwnProperty(indexrow)) {
            // Create an empty <tr> element and add it to the 1st position of the table:
            var row = table.insertRow(table.rows.length);
            var dtRow = dataObj[indexrow];

            Object.keys(dtRow).forEach(function(key, index) {
                var cell = row.insertCell(index);
                if (key == keyName) {
                    //     var my_pass_str2="./popup.html";  
                    //   var on_click_bigin_str2='document.AviAPI.getClient.bySerial(';
                    //   var on_click_end_str2= ",\"" + my_pass_str2 + "\")"+" ' "+">"+ 'edit2222' +"</a>";
                    // var on_click_end_str= ",\"" + my_pass_str + "\")"+" ' "+">"+ 'edit' +"</a>";
                    //  var on_click_bigin_str='get_client_by_serial(';

                    // cell.innerHTML = "<a href='#' class='btn btn-default editClient' onclick='get_client_by_serial("+dtRow[key] + ",\"" + my_pass_str + "\")"+" ' "+">"+ dtRow[key] +"</a>";    
                    //  cell.innerHTML = "<a href='#' class='btn btn-default editClient' onclick='get_client_by_serial("+dtRow[key] + temp_str;   
                    cell.innerHTML = "<a href='#' class='btn btn-default editClient' onclick='" + on_click_bigin_str + dtRow[key] + on_click_end_str;
                    //   cell.innerHTML = "<a href='#' class='btn btn-default editClient' onclick='"+on_click_bigin_str2+dtRow[key] + on_click_end_str2;    
                }
                else
                    cell.innerHTML = dtRow[key];

                //   $(cell).click(function(){alert(dtRow[key]);});
                //   $(cell).css("cursor","pointer");
            });
        }
    });
    //  set_coloerbox();


}

function GetElementsInForm() {
        //  alert('Value');
        var Form = document.getElementById('Form').getElementsByTagName('input');
        aaaaa = Form;
        //  Form.forEach()
        for (var I = 0; I < Form.length; I++) {
            var Value = Form[I].value; //this.attribute('name').value;
            alert(Value);
        }

        function addRowsToTable(dataObj, table_name, keyName, on_click_bigin_str, on_click_end_str, array_functions) {
            var table = document.getElementById(table_name);

            // console.log(my_pass_str);
            Object.keys(dataObj).forEach(function(keyrow, indexrow) {
                if (dataObj.hasOwnProperty(indexrow)) {
                    // Create an empty <tr> element and add it to the 1st position of the table:
                    var row = table.insertRow(table.rows.length);
                    var dtRow = dataObj[indexrow];

                    Object.keys(dtRow).forEach(function(key, index) {
                        var cell = row.insertCell(index);
                        if (key == keyName) {
                            //     var my_pass_str2="./popup.html";  
                            //   var on_click_bigin_str2='document.AviAPI.getClient.bySerial(';
                            //   var on_click_end_str2= ",\"" + my_pass_str2 + "\")"+" ' "+">"+ 'edit2222' +"</a>";
                            // var on_click_end_str= ",\"" + my_pass_str + "\")"+" ' "+">"+ 'edit' +"</a>";
                            //  var on_click_bigin_str='get_client_by_serial(';

                            // cell.innerHTML = "<a href='#' class='btn btn-default editClient' onclick='get_client_by_serial("+dtRow[key] + ",\"" + my_pass_str + "\")"+" ' "+">"+ dtRow[key] +"</a>";    
                            //  cell.innerHTML = "<a href='#' class='btn btn-default editClient' onclick='get_client_by_serial("+dtRow[key] + temp_str;   
                            cell.innerHTML = "<a href='#' class='btn btn-default editClient' onclick='" + on_click_bigin_str + dtRow[key] + on_click_end_str;
                            //   cell.innerHTML = "<a href='#' class='btn btn-default editClient' onclick='"+on_click_bigin_str2+dtRow[key] + on_click_end_str2;    
                        }
                        else
                            cell.innerHTML = dtRow[key];

                        //   $(cell).click(function(){alert(dtRow[key]);});
                        //   $(cell).css("cursor","pointer");
                    });
                }
            });
            //  set_coloerbox();


        }

        function addRowsToTable2(dataObj, table_name) {
            var table = document.getElementById(table_name);
            // var len = Object.keys(dataObj).length;
            //  var noFields=countObjectFields(dataObj) ;        
            for (var index in dataObj) {
                if (dataObj.hasOwnProperty(index)) {
                    // Create an empty <tr> element and add it to the 1st position of the table:
                    var row = table.insertRow(table.rows.length);

                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    var dtRow = dataObj[index];
                    Object.keys(dtRow).forEach(function(key, index) {
                        var cell = row.insertCell(index);
                        cell.innerHTML = dtRow[key];
                    });

                    // Add some text to the new cells:


                }
            }
        }

        function set_coloerbox() {
            /*$('.editClient').colorbox({scrolling: false, onComplete: function() {
                       $.colorbox.resize();
            }});*/
        }




        function countObjectFields(obj) {



            // Everything else:

            var c = 0,
                p, d;
            for (p in obj) {
                if (obj.hasOwnProperty(p)) {
                    for (d in p) {
                        c += 1;
                    }
                }
                return c;
            }



        }

    } // function get_client_by_serial_api(id, successcb,failcb) {



function insertDataToHierarchicalTable(products) {





    $("#hierarchicalGrid").igHierarchicalGrid({
        initialDataBindDepth: 1,
        dataSource: products,
        dataSourceType: "json",
        responseDataKey: "d",

        autoGenerateColumns: false,
        primaryKey: "ProductID",
        columns: [{
            headerText: "ID",
            key: "ProductID",
            width: "50px",
            dataType: "number"
        }, {
            headerText: "Name",
            key: "Name",
            width: "130px",
            dataType: "string"
        }, {
            key: "Price",
            headerText: "Price",
            dataType: "number",
            width: "55px",
            dataType: "number"
        }, {
            key: "Price",
            headerText: "Price",
            dataType: "number",
            width: "55px",
            dataType: "number"
        }],
        autoGenerateLayouts: false,
        defaultChildrenDataProperty: "arrayOfArraysData",
        columnLayouts: [{
            name: "arrayOfArraysData",
            responseDataKey: "",
            childrenDataProperty: "arrayOfArraysData",
            autoGenerateColumns: false,
            primaryKey: "ID",
            columns: [{
                key: "ID",
                headerText: "ID",
                width: "50px",
                dataType: "number"
            }, {
                key: "Name",
                headerText: "Product Name",
                width: "90px",
                dataType: "string"
            }, {
                key: "Price",
                headerText: "Price",
                dataType: "number",
                width: "55px",
                dataType: "number"
            }]
        }]
    });


};



//     siteCore.sendApiReq({
//         action: {
//             apiType: 'clientsapi',
//             method: 'get_client_by_serial',
//             params: {
//                 id: id
//             }
//         },
//         success: function(data) {
//             var dataObj = JSON.parse(data);
//             successcb(dataObj);
//           //   $.colorbox({href:"./edit_client.html",scrolling: false, onComplete: function() {
//         },
//         fail: function(error) {
//             failcb(error);
//         }
//     });