// main function to get data from api
//function get_api_data_by_params(params) {
//    var dfd = jQuery.Deferred();

//    siteCore.sendApiReq(params.api, params.action, params).done(function (data) {
//        dfd.resolve(data);
//    }).fail(function (err) {

//        dfd.reject(err);
//    });

//    return dfd;
//};

//// rander data to html table,   from get_api_data_by_params function
//function render_html(params) {
   
//    var dfd = get_api_data_by_params(params);
//    dfd .done(function (data) {
//        var my_table_template = $("#" + params.table_template).html();
//        var comp = _.template(my_table_template);
//        $("#" + params.div_result).html(comp({ data: data }));
//    });
//    return dfd;
//}

//// open coler box 
//function open_colorbox(page_template, data) {
//    var table_template = $(page_template).html();
//    var comp = _.template(table_template);

//    $.colorbox({
//        html: comp({
//            data: data
//        })

//    });
//}

//// save_from_coler_box
//function save_from_coler_box(params) {

//    var my_dfd = get_api_data_by_params(params);
//    if (my_dfd.reject() == null) {
//        alert(" record  saved");
//        $.colorbox.close();

//    }
//    else {
//        alert(" record was not save");
//    };

//}


//var table_map = {
//    DocumentOccupation:1
//} 

//get_param_list(table_map[tab_name]);

$(document).ready(function () {

   
// menu
    (function () {
        var funcs = {
            users: function () {
                get_users_list(22);

            },


            DocumentOccupation: function () {
                get_param_list(1);
                //render_html({
                //    api: "maintaining_api",
                //    action: "get_param",
                //    serial: 1,
                //    table_template: "template_list",
                //    div_result: "param_div"
                //});

            },

            GoalOfTalk: function () {
                get_param_list(2);
                //render_html({
                //    api: "maintaining_api",
                //    action: "get_param",
                //    serial: 2,
                //    table_template: "template_list",
                //    div_result: "param_div"
                //});
            },
            TypeInsurLife: function () {
                get_param_list(3);
            },

            Company: function () {
                get_param_list(4);
            },

            Employer: function () {
                get_param_list(5);
            },
            TypeFollowupConversations: function () {
                get_param_list(6);
            },
            ClientType: function () {
                get_param_list(7);
            },
            WorkStatus: function () {
                get_param_list(8);
            },
            MailAddressBook: function () {
                get_param_list(9);
            },
            MeetingStatus: function () {
                get_param_list(10);
            },
            MeetingPreparation: function () {
                get_param_list(11);
            },
            ProvisionsLifePolice: function () {
                get_param_list(12);
            },
            Agent: function () {
              
                get_param_list(13);
            },
            Tevia: function () {

                get_param_list(14);
            },
            TeviaStatus: function () {

                get_param_list(15);
            },
            Operation: function () {

                get_param_list(16);
            },
            KupaMaslul: function () {

                get_param_list(17);
            },
            KupaName: function () {

                get_param_list(18);
            },
            KupaSendBy: function () {

                get_param_list(19);
            },
            KupaShlavTipul: function() {

                get_param_list(20);
            },
            KupaType: function () {

                get_param_list(21);
            }

            

            //    

        };

    $("#FormMaintaining li a").each(function (i, el) {
        el.onclick = funcs[el.getAttribute('maintaining-menu')] || function () { };
    });
})();
// end menu

})


function get_param_list(my_serial) {
    var params = {
        api: "maintaining_api",
        action: "get_params_list",
        serial: my_serial,
        table_template: "template_params_list",
        div_result: "param_div"
    };

    render_html(params);
}

function edit_param(serial) {
    get_param_by_serial(serial).done(function (data) {
        open_colorbox("#edit_param", data);
    })

}



function new_param() {
    var my_serial = $("#my_serial").val();
    var data = {
       main: [{
            "Serial": 0, "ParamName": ""
         
        }],
        my_serial: $("#my_serial").val()
    };

    open_colorbox("#edit_param", data);
   
}

function save_param() {

    var params_temp = $("#editParam").serializeJSON();
    var params = {};

    params = $.parseJSON(params_temp);
    params.api = "maintaining_api";
    params.action = "save_param";
    // params.formName = "editConversation";

    save_from_coler_box(params);
}



function get_param_by_serial(serial) {

    var params = {
        api: "maintaining_api",
        action: "get_param_by_serial",
        serial: serial,
        my_serial: $("#my_serial").val()
    };
    var data = get_api_data_by_params(params);
    return data;
}

function get_users_list(my_serial) {
    var params = {
        api: "maintaining_api",
        action: "get_params_list",
        serial: my_serial,
        table_template: "template_users_list",
        div_result: "param_div"
    };

    render_html(params);
}


function edit_user(serial) {
    var params = {
        api: "maintaining_api",
        action: "get_user_by_serial",
        serial: serial
     
    };
    get_api_data_by_params(params).done(function (data) {
        open_colorbox("#edit_user", data);
    })
  
}

function new_user() {
    
    var data = {
        main: [{
            "serial": 0

        }]
      
    };

    open_colorbox("#edit_user", data);

}


function save_user() {

    var params_temp = $("#editUser").serializeJSON();
    var params = {};

    params = $.parseJSON(params_temp);
    params.api = "maintaining_api";
    params.action = "save_user";
    // params.formName = "editConversation";

    save_from_coler_box(params);
}
