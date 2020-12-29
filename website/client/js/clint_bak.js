// new_client.js



//width: 10 %;vertical - align: top;

function filter_table_conversation(){
    
        var filter = $("#table_conversation_comment").val();
        filter_table2(filter, "table_conversation", 1)
    }
    
    $("#hide_show_client_details").click(function () {
        var btn = document.getElementById("hide_show_client_details");
        var x = document.getElementById("td_client_details");
        if (x.style.display === "none") {
            x.style.display = "block";
            btn.value = "הסתר פ.לקוח";
        } else {
            x.style.display = "none";
            btn.value = "הצג פ.לקוח";
        }
    
        x.style.width = "350px";
        x, style.vertical = "top";
    
    });
    
    $("#full_name").click(function () {
       
        var x = document.getElementById("td_client_details");
        if (x.style.display === "none") {
            x.style.display = "block";
         
        } else {
            x.style.display = "none";
         
        }
    
        x.style.width = "350px";
        x, style.vertical = "top";
    
    });
    
    function hide_show_td() {
        var btn = document.getElementById("hide_show_client_details");
        var x = document.getElementById("td_client_details");
        if (x.style.display === "none") {
            x.style.display = "block";
            btn.value = "הסתר פ.לקוח";
        } else {
            x.style.display = "none";
            btn.value = "הצג פ.לקוח";
        }
    
        x.style.width = "350px";
        x, style.vertical = "top";
    }
    
    
    $(document).ready(function () {
    
        $(function () {
            $("#td_client_details").resizable();
        });
    
        // auto complite function
        var my_data;
        var s_options = {
            minimumInputLength: 2,
            allowClear: false,
            formatSelection: function (item) {
                return '<div class="select2-tag-cust" title="' + item.text + '">' + item.text + '</div>';
            },
            query: function (query) {
                get_client_by_term(query.term).done(function (dataObj) {
                    //  console.log(dataObj);
                    my_data = dataObj;
                    $.each(dataObj, function () {
                        this.text = ([this.LastName, this.FirstName]).join(" ");
                        this.id = this.Serial;
                    });
                    query.callback({
                        results: dataObj
                    });
                });
    
            }
        };
        
        $("#typehead").select2(s_options).on('change', function (e) {
          
            var vvv = my_data.filter(function (my_data) {
                return my_data.id == e.val
            });
            $("#client_serial").val(e.val);
            on_select_client(e.val);
          
    
        });
    
    
        // tabs control router
       
        $(function () {
            $("#tabs").tabs({
                activate: function (event, ui) {
                    $("#tabs_current_index").val(ui.newTab.index());
                }
            });
        });
    
        // menu
        (function () {
            var funcs = {
                  stam: function () {
    
                    
                      var params = {
                          api: "conversation_api",
                          action: "get_conversations_prams_for_filtering",
                          table_template: "templat_conversations_filtering",
                          div_result: "conversations_filtering_div"
                      };
                    render_html(params);
                   //   var data = get_api_data_by_params(params);
                  //    open_colorbox("#templat_conversations_filtering", data);
                     hide_div();
                     $("#conversations_filtering_div").show();
                },
                //personal: function () {
                   
                //    render_html({
                //        api: "account_api",
                //        action: "get_client_by_serial",
                //        serial: $('#client_serial').val(),
                //        table_template: "details_client",
                //        div_result: "tabs-1"
                //    });
                //},
                  conversation: function () {
                      hide_div();
                      $("#conversation_div").show();
                 //   alert($('#conversation_flg').val());
                    //if ($('#client_serial').val() != "") {
                    //    if ($('#conversation_follow_flg').val() != "1") {
                    //        $('#conversation_follow_flg').val("1");
                    //        var params= {
                    //                                    api: "conversation_api",
                    //                                   action: "get_conversations_with_followup_by_clientserial",
                    //                                  serial: $('#client_serial').val(),
                               
                    //        };
    
                    //        get_api_data_by_params(params).done(function (data) {
                      //          doit24(data.father, data.son);
                    //        });
                           
                    //    };
                    //}
                  },
                policy: function () {
                    if ($('#client_serial').val() != "") {
                        if ($('#life_police_flg').val() != "1") {
                            $('#life_police_flg').val("1");
                          
                         
                            var params = {
                                api: "life_police_api",
                                action: "get_life_polices_list_by_clientserial",
                                serial: $('#client_serial').val(),
                                table_template: "templat_life_police_list",
                                div_result: "life_police_div"
                            };
                            render_html(params);
                           
                        }
                        hide_div();
                        $("#life_police_div").show();
                    }
                },
                //policy: function () {
                //    if ($('#client_serial').val() != "") {
                //        if ($('#life_police_flg').val() != "1") {
                //            $('#life_police_flg').val("1");
                //            $("#tabs-2").empty();
                //            render_html({
                //                api: "life_police_api",
                //                action: "get_life_polices_list_by_clientserial",
                //                serial: $('#client_serial').val(),
                //                table_template: "templat_life_police_list",
                //                div_result: "tabs-2"
                //            });
                //        }
                //    }
                //},
                documents: function () {
                    var my_serial = $('#client_serial').val();
                    if (my_serial != "") {
                        if ( $('#documents_flg').val() != "1") {
                            var params = {
                                api: "documents_api",
                                action: "get_documents_list_by_clientserial",
                                serial: my_serial
                            };
                            get_api_data_by_params(params).done(function (data) {
                                if (data != null) {
                                    $('#documents_flg').val("1");
                                    var params = {
                                        data: data,
                                        table_template: "templat_documents_list",
                                        div_result: "documents_div"
                                    };
                                    render_html_with_hide_div(params); //  render html without sendin request to server
                                }
                               
                            });
             
                        } else {
                            hide_div();
                            $("#documents_div").show();
                        }
                    }
                },
                kupa: function () {
                    if ($('#client_serial').val() != "") {
                        if ($('#kupa_gemel_flg').val() != "1") {
                            $('#kupa_gemel_flg').val("1");
                             var params = {
                                api: "kupa_gemel_api",
                                action: "get_kupa_gemel_list_by_clientserial",
                                serial: $('#client_serial').val(),
                                table_template: "templat_kupa_gemel_list",
                                div_result: "kupa_gemel_div"
                            };
                            render_html(params);
                        }
    
                        hide_div();
                        $("#kupa_gemel_div").show();
                    }
                },
                my_meeting: function () {
                    if ($('#client_serial').val() != "") {
                        if ($('#meeting_flg').val() != "1") {
                           $('#meeting_flg').val("1");
                            var params = {
                                api: "meeting_api",
                                action: "get_meeting_list_by_clientserial",
                                serial: $('#client_serial').val(),
                                table_template: "templat_meeting_list",
                                div_result: "meeting_div"
                            };
                            render_html(params);
                          
                        }
                        hide_div();
                        $("#meeting_div").show();
                    }
                },
                proposal_life: function () {
                    if ($('#client_serial').val() != "") {
                        if ($('#proposal_life_flg').val() != "1") {
                            $('#proposal_life_flg').val("1");
                            var params={
                                api: "proposal_life_api",
                                action: "get_proposal_life_with_followup_by_clientserial",
                                serial: $('#client_serial').val(),
                                table_template: "templat_proposal_life_list",
                                div_result: "proposal_life_div"
                            };
    
                            //build_conversation_hierarchy_grid(data.Conversation_list, data.FollowUpConversation_list);
                          
                            //hide_div();
                            //$("#proposal_life_div").show();
                            get_api_data_by_params(params).done(function (data) {
                                build_proposal_life_hierarchy_grid(data.father, data.son);
                            });
                        }
                    }
                },
    
                search: function () {
                    params = {
                        table_template: "template_searching",
                        div_result: "searching_div",
                        data: {}
                    };
                    render_html_with_hide_div(params);
                    
                    // hide_div();
                    // $("#searching_div").show();
                }
    
    
            //    
              
            };
        
    
    
            $("#FormClient22 li a").each(function (i, el) {
                el.onclick = funcs[el.getAttribute('avi-menu')] || function () { };
            });
        })();
    
    
        // end tabs control router
    });
    
    function hide_div() {
        var div_array = document.getElementsByClassName('show_hide_div');
        for (var i = 0; i < div_array.length; ++i) {
            div_array[i].style.display = 'none';
        }
    }
    
    function clear_div() {
        $('.flg_div').val(' ');
        $('.show_hide_div').html("");
    }
    
    //=============== client =================
    
    function get_client_by_term(my_term) {
        var params = {
            api: "account_api",
            action: "get_client_by_term",
            term: my_term
        };
        return  get_api_data_by_params(params);
    }
    // actions after client was seleceted
    function on_select_client(serial) {
        clear_div();
        //hide_div();
        $('#life_police_flg').val("");
        $('#documents_flg').val("");
        $('#communication_flg').val("");
      //  $('#conversation_follow_flg').val("");
        $('#kupa_gemel_flg').val("");
        client_details(serial);
    }
    
    function client_details(serial) {
        var params = {
            api: "account_api",
            action: "get_client_conversatios_communicatios_by_serial",
            serial: serial
        };
       // var data = get_api_data_by_params(params);
      //  return data;
      get_api_data_by_params(params).done(function (data) {
          
            //$("#hierarchical_grid").remove();
            //$("#conversation_div").append('   <a href="#" onclick=" new_conversation()"> שיחה חדשה</a>');
            //$("#conversation_div").append('  <table id="hierarchical_grid" class="hierarchical_grid" onclick="" ></table>');
            
            //$("#conversation_div").show()
            var full_name = (data.my_client)[0].LastName + " " + data.my_client[0].FirstName;
            $("#full_name").text(full_name);
            var table_template = $("#details_client").html();
            var comp = _.template(table_template);
            $("#client_details_div").html(comp({ data: data.my_client }));
    
            table_template = $("#templat_communication_list").html();
            comp = _.template($("#templat_communication_list").html());
            $("#communication_div").html(comp({ data: data.communication_list }));
           
          //  build_conversation_hierarchy_grid(data.Conversation_list, data.FollowUpConversation_list);
    
            
            comp = _.template($("#templat_conversation_list").html());
            $("#conversation_div").html(comp({ data: data }));
             hide_div();
            $("#conversation_div").show();
         //   $("#tabs-1").html(comp({ data: data[2] }));
           
        });
        
        
        
       
    }
    
    function move_to_client(serial){
        $("#client_serial").val(serial);
        client_details(serial);
    
    }
    
    function get_client_conversatios_communicatios_by_serial(my_serial) {
        var params = {
            api: "account_api",
            action: "get_client_conversatios_communicatios_by_serial",
            serial: my_serial
        };
        var data = get_api_data_by_params(params);
        return data;
    }
    
    function edit_client(serial) {
        get_client_by_serial(serial).done(function (data) {
            open_colorbox("#edit_client", data);
            set_datepicker_format("birthday", data.main[0].Birthday);
         })
    };
    
    function new_client() {
        get_client_by_serial(0).done(function (data) {
    
            open_colorbox("#edit_client", data);
            set_datepicker_format("birthday", Date.now());
    
        })
    }
    
    
    function get_client_by_serial(my_serial) {
        var params = {
            api: "account_api",
            action: "get_client_by_serial",
            serial: my_serial
        };
        var data = get_api_data_by_params(params);
        return data;
    }
    
    function save_client() {
        if(validate_client()==false){
            return;
        }
        var params_temp = $("#editClient").serializeJSON();
    
        var params = {};
        params = $.parseJSON(params_temp);
        params.birthday = moment(params.birthday, "DD/MM/YYYY").toDate();
        params.lastName = (params.lastName).trim();
        params.firstName = (params.firstName).trim();
        params.city = (params.city).trim();
        params.street = (params.street).trim();
        params.api = "account_api";
        params.action = "save_client";
        // params.formName = "editLifePolice";
    
        save_from_coler_box(params); 
    
     
    }
    
    $("#btn_save_client").click(function () {
        alert("jjjj");
        save_client();
    });
    
    
    
    function searching() {
        params = {
            api: "account_api",
            action: "get_client_from_serching",
            table_template :"templat_client_list",
            div_result: "result_searching_div",
            search_condition: $("#search_condition").val(),
            string_condition: $("#string_condition").val()
        };
    
        get_api_data_by_params(params).done(function (data) {
            if (data.client_serisl) {
                client_details(data.client_serisl );
                $('#client_serial').val(data[0][0].Serial);
               
            }
            else {
                params.data = data.main;
                render_html_with_data(params);
               // $("#searching_div").show();
            }
           
        }).fail(function (err) {
    
            alert("לא נמצאות רשומות מתאימות");
    
        });
    }
    
    
    //  ================    conversation  ===============
    
    // used in conversation_from_meeting_list
    function new_conversation_from_meeting(meeting_serial) {
       
        var params = {
            api: "conversation_api",
            action: "get_conversation_by_serial",
            client_serial: $("#client_serial").val(),
            serial: 0,
            no_police: null,
            meeting_serial:  meeting_serial
        };
       get_from_api_by_params(my_params).done(function (data) {
    
            open_colorbox("#edit_conversation", data);
            set_datepicker_format("datee", Date.now());
    
        })
    }
    
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
    };
    
    // function get_conversations_list_by_clientserial(my_serial) {
    //     var params = {
    //         api: "conversation_api",
    //         action: "get_conversations_list_by_clientserial",
    //         serial: my_seria
    //     };
    //     return get_api_data_by_params(params);
    // };
    
    
    
     function save_conversation() {
        var goal_of_talk_tviha=1;
        if(validate_conversation(goal_of_talk_tviha)==false){
            return;
        }
    
        var params_temp = $("#editConversation").serializeJSON();
        var params = {};
    
        params = $.parseJSON(params_temp);
        params.datee =  moment( params.datee,'DD/MM/YYYY').format("YYYY-MM-DD");
      
        params.api = "conversation_api";
        params.action = "save_conversation";
       
        save_from_coler_box2(params).done(function (data) {
            params.data=data;
            params.table_template="templat_conversation_list";
            params.div_result="conversation_div";
            render_html_with_data(params);
        }).fail(function (err) {
    
        });
    }
    
    
    function conversations_list_from_meeting(meeting_serial) {
    
        var params = {
            api: "conversation_api",
            action: "get_conversations_list_by_clientserial",
            serial: "0",
            meeting_serial: meeting_serial,
            table_template: "templat_conversation_list",
            div_result: "conversations_from_meeting_div"
        };
    
        get_api_data_by_params(params).then(function (data) {
            data.meeting_serial = meeting_serial;
            comp = _.template($("#templat_conversation_from_meeting_list").html());
            $("#conversations_from_meeting_div").html(comp({ data: data}));
            hide_div();
            $("#conversations_from_meeting_div").show();
        }).fail(function (err) {
          alert("לא נמצאות משימות לפגישה זו"); 
        });
    }
    
    
    function conversation_from_police(no_police) {
        var my_params = {
            api: "conversation_api",
            action: "get_conversations_list_by_clientserial",
            my_no_police: no_police
        };
        get_api_data_by_params(my_params).done(function (data) {
    
            open_colorbox("#templat_conversation_list", data );
    
          }).fail(function(err){
            alert("אין שיחות הקשורות בפוליסה");
        });
    }
    
    
    
    
    function set_conversation_filter() {
    
        var params_temp = $("#conversations_filtering_div").serializeJSON();
        var params = {};
    
        params = $.parseJSON(params_temp);
        params.api = "conversation_api";
        params.action = "get_conversations_list_after_filtering";
        params.table_template = "templat_conversation_filtering_list";
        params.div_result = "conversations_filtering_result_div";
        render_html(params);
        // hide_div();
        //  $("#conversations_filtering_result_div").show();
    
    }
    
    
    // =================    followup_conversation  ====================
    
    function hide_show_div(hide_div_name, show_div_name) {
        
            var hide_div = document.getElementById(hide_div_name);
            var show_div = document.getElementById(show_div_name);
            hide_div.style.display = "none";
            show_div.style.display = "block";
    }
    
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
    
    
    
    function new_followup_conversation(serial) {
        get_followup_conversation_by_serial(0, serial).done(function (data) {
    
            open_colorbox("#edit_followup_conversation", data);
            set_datepicker_format("date_followup", data.main[0].DateFollowUp);
    
        })
    };
    
    
    function get_followup_conversation_by_serial(my_seria, my_conversation_serial) {
        var params = {
            api: "conversation_api",
            action: "get_follow_up_conversation_by_serial",
            serial: my_seria,
            conversation_serial: my_conversation_serial
        };
        var data = get_api_data_by_params(params);
        return data;
    }
    
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
    
    
    
    
    
    //  ================ life_police ==============
    
    function edit_life_police(my_serial , my_row) {
        var params = {
            api: "life_police_api",
            action: "get_life_police_by_serial",
            serial: my_serial,
            client_serial: $("#client_serial").val(),
            row_index:my_row
        };
      //  my_row.cells[1].textContent="gilboa avi is ok";
    
        get_api_data_by_params(params).done(function (data) {
            open_colorbox("#edit_life_police", data);
            set_datepicker_format("begin_Insur", data.main[0].beginInsur);
        })
    }
    
    function get_life_police_xml_by_serial(my_serial) {
        var params = {
            api: "police_from_mimshak_api",
            action: "get_police_mislak_by_no_police_and_no_company",
            serial: my_serial,
            where: 1
        };
       
        get_api_data_by_params(params).done(function (data) {
            open_colorbox("#templat_police_xml", data);
    
        }).fail(function (err) {
    
            });
    
        alert(serial);
    }
    
    
    function get_life_polices_list_by_clientserial(my_serial) {
    
        var params = {
            api: "life_police_api",
            action: "get_life_polices_list_by_clientserial",
            serial: my_serial
        };
    
       return  get_api_data_by_params( params);
    
       
    };
    
    
    
    function save_life_police() {
    
        if(validate_life_police()==false){
            return;
        }
        var params_temp = $("#editLifePolice").serializeJSON();
     
        var table_name="table_life_police";
        var params = {};
        params = $.parseJSON(params_temp);
        params.begin_Insur = moment(params.begin_Insur, "DD/MM/YYYY").toDate();
        params.api= "life_police_api";
        params.action = "save_life_police";
       // params.formName = "editLifePolice";
      
      
     
     
     
       save_from_coler_box2(params).done(function (data) {
           var my_row=document.getElementById(table_name).rows[params.row_index];
           my_row.cells[0].textContent=$("#begin_Insur").val();
           var company=document.getElementById("company");
           my_row.cells[2].textContent=company.options[company.selectedIndex].text;
         var  type_Insur=document.getElementById("type_Insur");
         my_row.cells[3].textContent=type_Insur.options[type_Insur.selectedIndex].text;
           var status=document.getElementById("status");
           my_row.cells[4].textContent=status.options[status.selectedIndex].text;
         }).fail(function (err) {
            alert(" no endה");
            
         }); 
        
    }
    
    // ======================   documents  ======================
    
    // function get_documents_list_by_clientserial2(my_serial) {
    
    //     var params = {
    //         api: "documents_api",
    //         action: "get_documents_list_by_clientserial",
    //         serial: my_serial
    //     };
    
    //     return get_api_data_by_params(params);
    
    
    // };
    
    
    function for_each() {
        var fromData = new FormData();
        $.each($('input, select ,textarea', '#editDocuments'), function (k) {
           // alert(k + ' ' + $(this).attr('name') + " " + $(this).val());
            fromData.append($(this).attr("name") , $(this).val());
        });
        var o = fromData.values();
        $.each(o , function (index, value) {
            alert(index + ':' + $(this).val());
        });
      
        //   fromData.append('my_file', $("#fileinput")[0].files[0]);
        $("#editDocuments").children("input", "select").each(function () {
            //fromData.append( $(this).attr("name") , $(this).val());
        //    alert($(this).attr("name") + " has a value of " + $(this).val());
        });
    
        fromData.append('my_file', 'hhhhhh');
        alert("done");
        //    $.each($('#editDocuments'), function (index, formField) {
            
        //        alert(index);
        //        alert(formField);
        
        //});
    
    }
    
    
    function edit_document(serial) {
        var params = {
            api: "documents_api",
            action: "get_document_by_serial",
            serial: serial
        };
        get_api_data_by_params(params).done(function (data) {
    
            open_colorbox("#edit_documents", data);
            set_datepicker_format("date_of_document", data.main[0].DateOfDocument);
        })
    };
    
    // function new_document() {
      
      
    //     get_document_by_serial("0").done(function (data) {
    
    //     get_document_by_serial    open_colorbox("#edit_documents", data);
    //         set_datepicker_format("date_of_document",Date.now());
    //     })
    
    // }
    // function get_documents_list_by_clientserial(my_serial) {
    //     var params = {
    //         api: "documents_api",
    //         action: "get_documents_list_by_clientserial",
    //         serial: my_serial
    //     };
    //     return get_api_data_by_params(params);
    // };
    
    
    
    function file_by_serial(my_serial) {
        var params = {
            api: "documents_api",
            action: "get_file_by_serial",
            client_serial: $("#client_serial").val(),
            serial: my_serial
        };
        siteCore.fileDownLoad("documents_api", "get_file_by_serial", params);
       
    }
    
    // function get_document_by_serial(my_serial) {
    //     var params = {
    //         api: "documents_api",
    //         action: "get_document_by_serial",
    //         client_serial:$("#client_serial").val(),
    //         serial: my_serial
    //     };
    //     var data = get_api_data_by_params(params);
    //     return data;
    // }
    
    function save_documents() {
    
        //var fromData = new FormData();
        //$.each($('input, select ,textarea', '#editDocuments'), function (k) {
        //    // alert(k + ' ' + $(this).attr('name') + " " + $(this).val());
        //    fromData.append($(this).attr("name"), $(this).val());
        //});
    
        if(validate_conversation(goal_of_talk_tviha)==false){
            return;
        }
    
        var params_temp = $("#editDocuments").serializeJSON();
        var params = {};
    
        params = $.parseJSON(params_temp);
      //  params = fromData;
      params.date_of_document = moment(params.date_of_document, "DD/MM/YYYY").toDate();
      params.files =null;  
       
        if(document.getElementById("fileinput")){
            params.files = [{ fileElem: $("#fileinput") }];
           var my_file=params.files[0].fileElem[0].files[0];
         
            if(  my_file==undefined ){
                alert("חובה לבחור מסמך");  
                return;
            }
          
         
         
        } 
       
        params.api = "documents_api";
        params.action = "save_document";
        //var apiParams = { api:"", params: params }
    
    
       save_from_coler_box2(params).done(function (data) {
        params.data=data[0];
        params.table_template="templat_documents_list";
        params.div_result="documents_div";
        render_html_with_data(params);
       }).fail(function (err) {
    
       });
    }
    
    
    //==================== communication ============================
    
    
    
    function edit_communication(serial) {
        get_communication_by_serial(serial).done(function (data) {
    
            open_colorbox("#edit_communicationt", data);
        })
    }
    
    function new_communication() {
        var client_serial = $("#client_serial").val();
        var data ={
            0: [{
                "Serial": 0, "ClientSerial": client_serial  ,
                 "CommunicationValue": "" ,  "Comment": "" } ]
        };
      
        open_colorbox("#edit_communicationt", data);
      //  $("#communicationt_client_serial").val(client_serial);
      
    }
    
    function get_communication_by_serial(my_serial) {
        var params = {
            api: "communication_api",
            action: "get_communication_by_serial",
            serial: my_serial
        };
        var data = get_api_data_by_params(params);
        return data;
    }
    
    function save_communication() {
    
        var params_temp = $("#editCommunication").serializeJSON();
        var params = {};
    
        params = $.parseJSON(params_temp);
        params.api = "communication_api";
        params.action = "save_communication";
    
    
        save_from_coler_box(params);
    }
    
    // ===================== kupa_gemel  ============================
    
    // function set_datepicker_format(input_name,my_date) {
    //     var convert_date=moment(my_date,"YYYY-MM-DD HH:mm:ss").format('DD/MM/YYYY');
    //     $("#" + input_name).datepicker(); 
    //     $("#" + input_name).datepicker("option", "dateFormat", "dd/mm/yy");
    //     if (my_date != null)
    //       //  $("#" + input_name).datepicker("setDate", moment(my_date).toDate());
    //       $("#" + input_name).datepicker("setDate", convert_date);
    // }
    
    function edit_kupa_gemel(serial) {
        var params = {
            api: "kupa_gemel_api",
            action: "get_kupa_gemel_by_serial",
            serial: serial,
            client_serial: $("#client_serial").val()
        };
        get_api_data_by_params(params).done(function (data) {
    
            open_colorbox("#edit_kupa_gemel", data);
            set_datepicker_format("date_open", data.main[0].dateOpen);
            //$("#date_open").datepicker();
            //$("#date_open").datepicker("option", "dateFormat", "dd/mm/yy");
            //if (data.main[0].dateOpen != null)
            //    $("#date_open").datepicker("setDate", moment(data.main[0].dateOpen).toDate());
            
        })
      
    }
    
    // function new_kupa_gemel() {
    //     var client_serial = $("#client_serial").val();
    //     get_kupa_gemel_by_serial("0").done(function (data) {
    
    //         open_colorbox("#edit_kupa_gemel", data);
    //     })
      
    // }
    
    // function get_kupa_gemel_by_serial(my_serial) {
    //     var params = {
    //         api: "kupa_gemel_api",
    //         action: "get_kupa_gemel_by_serial",
    //         serial: my_serial,
    //         client_serial: $("#client_serial").val()
    //     };
    //     var data = get_api_data_by_params(params);
    //     return data;
    // }
    
    
    function save_kupa_gemel() {
    if (validate_kupa_gemel()==false){
        return;
    }
        var params_temp = $("#editKupaGemel").serializeJSON();
        var params = {};
    
        params = $.parseJSON(params_temp);
        params.date_open = moment(params.date_open, "DD/MM/YYYY").toDate();
       
        params.api = "kupa_gemel_api";
        params.action = "save_kupa_gemel";
    
    
    
        save_from_coler_box2(params).done(function (data) {
            params.data=data;
            params.table_template="templat_kupa_gemel_list";
                               
            params.div_result="kupa_gemel_div";
            render_html_with_data(params);
        }).fail(function (err) {
    
        });
    
       // save_from_coler_box(params);
    }
    
    // ========================= meeting  ================================
    
    function edit_meeting(serial) {
        var params = {
            api: "meeting_api",
            action: "get_meeting_by_serial",
            serial: serial
        };
        
        get_api_data_by_params(params).done(function (data) {
    
            open_colorbox("#edit_meeting", data);
            set_datepicker_format("meeting_date", data.main[0].MeetingDate);
        })
    };
    
    // function new_meeting() {
    //     var client_serial = $("#client_serial").val();
    //     get_meeting_by_serial("0").done(function (data) {
    
    //         open_colorbox("#edit_meeting", data);
    //         set_datepicker_format("meeting_date", Date.now());
    //     })
    
    // }
    
    
    // function get_meeting_list_by_clientserial(my_serial) {
    //     var params = {
    //         api: "meeting_api",
    //         action: "get_meeting_list_by_clientserial",
    //         serial: my_serial
    //     };
    //     return get_api_data_by_params(params);
    // };
    
    // function get_meeting_by_serial(my_serial) {
    //     var params = {
    //         api: "meeting_api",
    //         action: "get_meeting_by_serial",
    //         serial: my_serial,
    //         client_serial: $("#client_serial").val()
            
    //     };
         
    //     return get_api_data_by_params(params);
    // }
    
    function save_meeting() {
    
        var fromData = new FormData();
        $.each($('input, select ,textarea', '#editDocuments'), function (k) {
            // alert(k + ' ' + $(this).attr('name') + " " + $(this).val());
            fromData.append($(this).attr("name"), $(this).val());
        });
    
        var params_temp = $("#editMeeting").serializeJSON();
        var params = {};
    
        params = $.parseJSON(params_temp);
        //   params = fromData;
      
        params.meeting_date = moment(params.meeting_date, "DD/MM/YYYY").toDate();
      
        params.api = "meeting_api";
        params.action = "save_meeting";
        if(params.client_serial==""){
            params.client_serial = $("#client_serial").val();
        }
    
    
        save_from_coler_box2(params).done(function (data) {
            params.data=data;
            params.table_template="templat_meeting_list";
            params.div_result="meeting_div";
            render_html_with_data(params);
           }).fail(function (err) {
        
           });
    }
    
    
    
    
    
    
    // ==================================================
    function save_client_bak(params) {
    
        var rrr = params;
    
    
        var dfd = jQuery.Deferred();
    
    
    
        siteCore.sendApiReq("account_api", "save_client", params).done(function (data) {
            dfd.resolve(data);
    
        }).fail(function (err) {
            dfd.reject(err);
        });
    
        return dfd;
    }
    
    
    function get_client_by_term2(my_term) {
        var dfd = jQuery.Deferred();
        siteCore.sendApiReq("account_api", "get_client_by_term", { term: my_term }).done(function (data) {
            dfd.resolve(data);
        }).fail(function (err) {
            dfd.reject(err);
        });
    
        return dfd;
    }
    
    
    
    
    
    
    /*function getParamClientType() {
        var dfd = jQuery.Deferred();
        if (clientLookups.paramClienType == null) {
            // get from server
            //success
            clientLookups.paramClienType = resultfromserver;
            dfd.resolve(clientLookups.paramClienType);
            //fail
            dfd.reject
        }
        else {
            dfd.resolve(clientLookups.paramClienType);
        }
    }*/
    
    
    
    
    
    
    // $("#ddd2").click(function () {{
    //     var params = {};
    
    //     get_conversations_list_by_clientserial(594).done(function (data) {
    //         var table_template = $("#templat_life_police_list").html();
    //         var comp = _.template(table_template);
    //         $("#clients_result").html(comp({ data: data }));
    //     });
    // });
    
    // $("#ddd3").click(function () {
    //     render_html({
    //         api: "conversation_api",
    //         action: "get_conversations_list_by_clientserial",
    //         serial: "594",
    //         table_template: "templat_conversation_list",
    //         div_result: "list_result_dir"
    
    //     });
    // });
    
    // $("#ddd4").click(function () {
    
    //     $("#tabs").tabs({
    //         activate: function (event, ui) {
    //             //  tabs_current_index
    //             alert(ui.newTab.index());
    //         }
    //     });
    //     //alert($("#tabs").tabs('option', 'selected'));
    // });
    
    $("#btn_save").click(function () {
        var params = $("#editClient").serializeObject();
        var my_dfd = save_client(params);
        if (my_dfd.done) {
            alert(" record  saved");
            $.colorbox.close();
        }
        else {
            alert(" record was not save");
        };
    
    });
    
    
    
    