
function topnav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


// use in cuts view - showing the right select
function type_filter_change(y) {
   var a = parseInt(y);
    //alert(a);
    hide_element_by_class_name("show_hide_td");
    switch (a) {
        case 1:

            $("#date_filter_td").show();
            $("#type_equal_td").show();
            break;
        case 2:

            break;
        case 3:

            $("#date_filter_td").show();
            break;
        case 4:
            $("#agent_name_td").show();
            break;
        case 5:
            $("#date_filter_td").show();
            break;
        case 6:
            alert(a);
            break;
        case 7:
            $("#operation_td").show();
            break;
        case 8:

            $("#operation_td").show();
            break;
    }

}



$(document).ready(function () {
    $('#type_filter').change(function () {
        alert($("#type_filter").val());
    });
   
 
   // alert("ffff");
    (function () {
        var funcs = {
            topnav:function () {
                var x = document.getElementById("myTopnav");
                if (x.className === "topnav") {
                  x.className += " responsive";
                } else {
                  x.className = "topnav";
                }
              },
                conversation_filtering: function () {
                    if ($('#conversations_filtering_flg').val() != "1") {
                        $('#conversations_filtering_flg').val("1");
                        get_conversations_params_for_filtering();
                    }
                    hide_all_divs_by_class_name("show_hide_div");
                    $("#conversations_filtering_div").show();
                },

                client_filtering: function () {
                    if ($('#client_filtering_flg').val() != "1") {
                        $('#client_filtering_flg').val("1");
                        get_client_for_filtering();
                    }
                    hide_all_divs_by_class_name("show_hide_div");
                    $("#client_filtering_div").show();
                },

                cuts: function () {
                   
                    if ($('#cuts_filtering_flg').val() != "1") {
                        $('#cuts_filtering_flg').val("1");
                        get_cuts();
                    }
                    hide_all_divs_by_class_name("show_hide_div");
                    $("#cuts_filtering_div").show();
               },
          
                proposal_life_filter: function () {
                    if ($('#proposal_life_filtering_flg').val() != "1") {
                        $('#proposal_life_filtering_flg').val("1");
                        get_new_proposal_life();
                    }
                    hide_all_divs_by_class_name("show_hide_div");
                    $("#proposal_life_filtering_div").show();
                },

                gemel_filtering: function () {
                    
                    if ($('#kupa_gemel_filter_flg').val() != "1") {
                        $('#kupa_gemel_filter_flg').val("1");
                        get_kupa_gemel_for_filter();
                    }
                   
                    hide_div();
                    $("#kupa_gemel_filter_div").show();

                },

                follow_checks_filter: function () {
               
                    if ($('#follow_checks_filter_flg').val() != "1") {
                        $('#follow_checks_filter_flg').val("1");
                        get_follow_checks_for_filter();
                    }

                    hide_div();
                    $("#follow_checks_filter_div").show();
                },

                meeting_filter: function(){
                    if ($('#meeting_filter_flg').val() != "1") {
                        $('#meeting_filter_flg').val("1");
                        get_meeting_for_filtering();
                    }

                    hide_div();
                    $("#meeting_filter_div").show();
                },

                read_xml: function () {
                var params = {
                    api: "read_xml_api",
                    action: "parseMimshak",
                    
                    table_template: "templat_proposal_life_list",
                    div_result: "proposal_life_follow_div"
                };

                get_api_data_by_params(params).done(function (data) {
                    //build_proposal_life_hierarchy_grid(data.father, data.son);
                    alert(data);
                });
                hide_div();
                $("#proposal_life_follow_div").show();

            },
            read_xml2: function () {
                var params = {
                    div_result: "read_xml_div",
                    table_template: "template_upload_xml"

                };
                render_html_without_data(params);


            },
            simulator: function () {
                var params = {
                    api: "simulator_api",
                    action: "get_simulator"

                };

                get_api_data_by_params(params).done(function (data) {
                    //build_proposal_life_hierarchy_grid(data.father, data.son);
                    alert("dat");
                });

               siteCore.fileDownLoad("simulator_api", "get_simulator", params);

                
            }
            
          

        };



        $("#form_home li a").each(function (i, el) {
            el.onclick = funcs[el.getAttribute('home-menu')] || function () { };
        });
    })();



})

function upload_xml() {
    var params = {
        api: "read_xml_api",
        action: "parseMimshak",
      //  action: "parseMimshak",
        files: [{ fileElem: $("#fileinput") }],
        table_template: "templat_proposal_life_list",
        div_result: "proposal_life_follow_div"
    };

    get_api_data_by_params(params).done(function (data) {

        alert(JSON.stringify(data));
    }).fail(function (err) {
        alert(" הקובץ לא נקלט");
    });
    hide_div();
    $("#read_xml_div").show();

}

function upload_xml_object_old() {
    var params = {
        api: "read_xml_api",
        action: "parseMimshak_object",
      //  action: "parseMimshak",
        files: [{ fileElem: $("#fileinput") }],
        table_template: "templat_proposal_life_list",
        div_result: "proposal_life_follow_div"
    };



  //  ricuz_police_mimshk

    get_api_data_by_params(params).done(function (data) {
        // var my=Object.keys(data.result).length;
        // for (var i=0; my>i; i++){
        //         for(var current_node in data.result[i]){
        //             var my_data=data.result[i][current_node];
        //             alert("object name -  "+current_node);
        //             for(var field in my_data){
        //                 alert(field+ ":"+my_data[field]) ;
        //             }
        //         };
        //        break;
        // } ;
  
     //  open_colorbox("#templat_police_xml_object", data.result);
     open_colorbox("#templat_kisuim", data.result);
     //   alert(JSON.stringify(data));
    }).fail(function (err) {
        alert(" הקובץ לא נקלט");
    });
    hide_div();
    $("#read_xml_div").show();

}

function upload_xml_object() {
    var params = {
        api: "read_xml_api",
        action: "parseMimshak_object",
      //  action: "parseMimshak",
        files: [{ fileElem: $("#fileinput") }],
        table_template: "templat_ricuz_police_mimshk",
        div_result: "proposal_life_follow_div"
    };



  //  ricuz_police_mimshk

    get_api_data_by_params(params).done(function (data) {
        // var my=Object.keys(data.result).length;
        // for (var i=0; my>i; i++){
        //         for(var current_node in data.result[i]){
        //             var my_data=data.result[i][current_node];
        //             alert("object name -  "+current_node);
        //             for(var field in my_data){
        //                 alert(field+ ":"+my_data[field]) ;
        //             }
        //         };
        //        break;
        // } ;
  
     //  open_colorbox("#templat_police_xml_object", data.result);
     open_colorbox("#templat_ricuz_police_mimshk", data);
     //   alert(JSON.stringify(data));
    }).fail(function (err) {
        alert(" הקובץ לא נקלט");
    });
    hide_div();
    $("#read_xml_div").show();

}
// ==================== conversations ========================

function edit_conversation(serial,my_row) {
    
     var params = {
         api: "conversation_api",
         action: "get_conversation_by_serial",
         client_serial: $("#client_serial").val(),
         serial:serial
     };
    
     get_api_data_by_params(params).done(function (data) {
         data.row_index=my_row
         open_colorbox("#edit_conversation", data);
      //   set_datepicker_format("datee", data.main[0].Datee);
      })
 }

 function save_conversation() {
    var table_name="conversation_filter_table";
     var params_temp = $("#editConversation").serializeJSON();
     var params = {};
 
     params = $.parseJSON(params_temp);
     params.api = "conversation_api";
     params.action = "save_conversation";
    
     
    
     save_from_coler_box2(params).done(function (data) {
         var my_row=document.getElementById(table_name).rows[params.row_index];

        
         my_row.cells[2].textContent=$("#summary_of_conversation").val();

         var  goal_of_talk=document.getElementById("goal_of_talk");
                                     
         my_row.cells[3].textContent=goal_of_talk.options[goal_of_talk.selectedIndex].text;
        
         var  get_call_name=document.getElementById("get_call_name");
        
         my_row.cells[4].textContent=get_call_name.options[get_call_name.selectedIndex].text;

        
 
        
         // data.communication_list
         // params.table_template="templat_documents_list";
         // params.div_result="documents_div";
         // render_html_with_data(params);
        
      
       }).fail(function (err) {
          alert(" no end");
          
       }); 
 }
 
function get_conversations_params_for_filtering () {
    var params = {
        api: "conversation_api",
        action: "get_conversations_params_for_filtering",
        table_template: "templat_conversations_filtering",
        div_result: "conversations_filtering_div"
    };

    get_api_data_by_params(params).done(function (data) {
        params.data = data;
        render_html_with_data(params);
       
        if (data[0].length==0) {
            alert("לא נמצאו נתונים");
        }

    }).fail(function (err) {
      
        
    });

 //   render_html(params);
    //hide_div();
    //$("#conversations_filtering_div").show();
}

function set_conversation_filter() {
   
    var params_temp = $("#conversations_filtering_div").serializeJSON();
    var params = {};

    params = $.parseJSON(params_temp);
    params.api = "conversation_api";
    params.action = "get_conversations_list_after_filtering";
    params.table_template ="templat_conversation_filtering_list";
    params.div_result = "conversations_filtering_result_div";
    params.get_call_name = $("#get_call_name1").val();
    params.goal_of_talk = $("#goal_of_talk1").val();
    params.type_followup_conversation = $("#type_followup_conversation1").val();
    var a = $("#check_goal_of_talk").val();

    if ($("#check_done").is(':checked') ) {
        params.check_done = true;
    } else {
        params.check_done = false;
    }

    if ($("#check_get_call_name").is(':checked') ) {
        params.check_get_call_name = true;
    } else {
        params.check_get_call_name = false;
    }

    if ($("#check_goal_of_talk").is(':checked') ){
        params.check_goal_of_talk = true;
    } else {
        params.check_goal_of_talk = false;
    }
    if ($("#check_type_followup_conversation").is(':checked') ) {
        params.check_type_followup_conversation = true;
    } else {
        params.check_type_followup_conversation = false;
    }

    render_html(params);
    // hide_div();
    //  $("#conversations_filtering_result_div").show();

}


// ================ followup_conversation ================

function get_followup_conversations_list_by_clientserial(conversations_serial) {
    var params = {
        api: "followup_conversation_api",
        action: "get_followup_conversations_list_by_conversation_serial",
        conversations_serial: conversations_serial
      
    };
    get_api_data_by_params(params).done(function (data) {
        open_colorbox("#templat_followup_conversation_list", data);
    });
};


function edit_followup_conversation(my_seria, my_conversation_serial) {
    var params = {
            api: "followup_conversation_api",
            action: "get_follow_up_conversation_by_serial",
            serial: my_seria,
            conversation_serial: my_conversation_serial
    };

    get_api_data_by_params(params).done(function (data) {
        hide_show_div("MainDiv", "SubDiv");
        var table_template = $("#edit_followup_conversation").html();
        var comp = _.template(table_template);
        $("#SubDiv" ).html(comp({ data: data }) );
        set_datepicker_format("date_followup", data.main[0].DateFollowUp);
    })
};


function save_followup_conversation() {
    if(validate_followup_conversation()==false){
        return;
    }
    var params_temp = $("#editFollowupConversation").serializeJSON();
    var params = {};

    params = $.parseJSON(params_temp);
    if (! params.mark_as_important  ) {
        params.mark_as_important = false;
    }

    if (!params.check_done) {
        params.check_done = false;
    }

    if (!params.stop_reminder) {
        params.stop_reminder = false;
    }

    params.date_followup = moment(params.date_followup, "DD/MM/YYYY").toDate();
    params.api = "followup_conversation_api";
    params.action = "save_followup_conversation";
  
    save_from_coler_box_without_close(params).done(function (data) {
        params.data=data;
        params.table_template="templat_followup_conversation_list";
        params.div_result="cboxWrapper";
      //  render_html_with_data(params);
     //   alert(" record  saved");
      //  var my_div=$("#colorbox").empty();;
     // $.colorbox.close();
      //  render_html_with_data(params);
        open_colorbox("#templat_followup_conversation_list", data);
         //  hide_show_div("SubDiv", "MainDiv");
   
    }).fail(function (err) {
        alert(" record was not save");
    });
    // siteCore.sendApiReq(params.api, params.action, params).then(function (data) {
    //     alert(" record  saved");
     
    //     hide_show_div("SubDiv", "MainDiv");

    // }).fail(function (err) {
    //     //onsole.log(err);
    //     alert(" record was not save");

    // });
   
  
   
   

}



// =============== cuts ============================

function get_cuts() {
    var params = {
        api: "cuts_api",
        action: "get_cuts",
        table_template: "template_cuts",
        div_result: "cuts_filtering_div"
    };
    render_html(params).done(function (data) {
      
        $("#date_filter").datepicker();
        $("#date_filter").datepicker("option", "dateFormat", "dd/mm/yy");
        hide_element_by_class_name('show_hide_td');
        set_datepicker_format("date_filter", Date.now());
        $("#type_equal_td").show();
        $("#date_filter_td").show();

    });
}

function get_cuts_after_filtering() {
    var params = {};
    var my_date = $("#date_filter").val();

    params.api = "cuts_api";
    params.action = "get_cuts_result";
    params.table_template = "templat_cuts_result_list";
    params.div_result = "cuts_result_div";

    params.type_filter = parseInt($("#type_filter").val());

    params.type_equal = $("#type_equal").val();
    params.date_filter = moment(my_date, "DD/MM/YYYY").toDate();

    params.agent_name = $("#agent_name").val();
    params.operation = $("#operation").val();

    render_html(params);

}

// =================  proposal_life ===================

function get_new_proposal_life () {
    var params = {
        api: "proposal_life_api",
        action: "get_new_proposal_life",
        
        table_template: "templat_proposal_life_list",
        div_result: "proposal_life_follow_div"
    };

       get_api_data_by_params(params).done(function (data) {
        build_proposal_life_hierarchy_grid(data.father, data.son);
    });
    hide_div();
    $("#proposal_life_follow_div").show();
}

// ==================== kupa_gemel ==================
function get_kupa_gemel_for_filter() {
    var params = {
        api: "kupa_gemel_api",
        action: "get_kupa_gemel_by_serial",
        serial: 0,
        table_template: "templat_kupa_gemel_filter",
        div_result: "kupa_gemel_filter_div"
    };

    get_api_data_by_params(params).done(function (data) {
        params.data = data;
        render_html_with_data(params);

        if (data[0].length == 0) {
            alert("לא נמצאו נתונים");
        }

    }).fail(function (err) {


    });
}

function get_kupa_gemel_list_after_filtering() {
    var params_temp = $("#kupaGemelFilter").serializeJSON();
    var params = {};

    params = $.parseJSON(params_temp);
  
   

    //params = $.parseJSON(params_temp);
    params.api = "kupa_gemel_api";
    params.action = "get_kupa_gemel_list_after_filtering";
    params.table_template = "templat_kupa_gemel_list";
    params.div_result = "kupa_gemel_result";

    render_html(params);
}

// ================  follow_checks ===============
function get_follow_checks_for_filter() {
    var params = {
        api: "follow_checks_api",
        action: "get_follow_checks_by_serial",
        serial: 0,
        table_template: "templat_follow_checks_for_filter",
        div_result: "follow_checks_filter_div"
    };

    get_api_data_by_params(params).done(function (data) {
        params.data = data;
        render_html_with_data(params);

        if (data[0].length == 0) {
            alert("לא נמצאו נתונים");
        }

    }).fail(function (err) {


    });
}

function get_follow_checks_after_filtering() {
    var params_temp = $("#followChecksForFilter").serializeJSON();
    var params = {};
    params = $.parseJSON(params_temp);
    params.api = "follow_checks_api";
    params.action = "get_follow_checks_list";
    params.serial = "0";
    params.table_template = "templat_follow_checks_list";
    params.div_result = "follow_checks_result";

    get_api_data_by_params(params).done(function (data) {
        params.data = data;
        render_html_with_data(params);

        //if (data[0].length == 0) {
        //    alert("לא נמצאו נתונים");
        //}

    }).fail(function (err) {


    });

}


function edit_follow_checks(serial) {
    var params_temp = $("#followChecksForFilter").serializeJSON();
    var params = {};
    params = $.parseJSON(params_temp);
    params.api = "follow_checks_api";
    params.action = "get_follow_checks_by_serial";
    params.serial = serial;

    //if ($("#month_sallary_date").val = "") {
    //    params.month_sallary_date = null;
    //}
    get_api_data_by_params(params).done(function (data) {
        open_colorbox("#templat_edit_follow_checks", data);
        set_datepicker_format("check_date", data.main[0].CheckDate);
        set_datepicker_format("month_sallary_date", data.main[0].MonthSallaryDate);
    });
}

function save_follow_checks(serial) {
    var params_temp = $("#editFollowChecks").serializeJSON();
    var params = {};
    params = $.parseJSON(params_temp);
    params.check_date = moment(params.check_date, "DD/MM/YYYY").toDate();
    params.month_sallary_date = moment(params.month_sallary_date, "DD/MM/YYYY").toDate();
    params.api = "follow_checks_api";
    params.action = "save_follow_checks";
    params.serial = serial;
    //  params.table_template = "templat_follow_checks_list";
    //  params.div_result = "follow_checks_result";
    save_from_coler_box(params); 
    //get_api_data_by_params(params).done(function (data) {
    //    alert("הרשומה נשמרה")
    //}).fail(function (err) {

    //    alert(" השמירה לא הצליחה")
    //});
}

// ==================== meeting =============

function get_meeting_for_filtering() {
    var params = {
        api: "meeting_api",
                     
        action: "get_meeting_list_by_done",
        done: 0,
        table_template: "templat_meeting_list",
        div_result: "meeting_filter_div"
    };
    render_html(params);
}


// not in use. use cuts insted
function get_client_for_filtering() {
    var params = {
        api: "account_api",
        action: "get_client_for_filtering",
        table_template: "template_client_filtering",
        div_result: "client_filtering_div"
    };
    get_api_data_by_params(params).done(function (data) {
        params.data = data;
        render_html_with_data(params);
        hide_div();
        $("#client_filtering_div").show();
        $("#date_filter").datepicker();
        $("#date_filter").datepicker("option", "dateFormat", "dd/mm/yy");
        hide_element_by_class_name('show_hide_td');
        if (data[0].length == 0) {
            alert("לא נמצאו נתונים");
        }

    }).fail(function (err) {

    });
}

