

function save_conversation_old() {
    
        var params_temp = $("#editConversation").serializeJSON();
        var params = {};
    
        params = $.parseJSON(params_temp);
        params.datee =  moment( params.datee,'DD/MM/YYYY').format("YYYY-MM-DD");
      //  params.datee = moment(params.datee, "DD/MM/YYYY HH:mm").toDate();
        params.api = "conversation_api";
        params.action = "save_conversation";
      
       var table_name ="table_conversation";
       var my_row;
    //    if(params.row_index)    {
    //         my_row=document.getElementById(table_name).rows[params.row_index];
      
    //         my_row.cells[0].textContent=$("#datee").val();
    //         my_row.cells[1].textContent=$("#summary_of_conversation").val();
    
    //         var  goal_of_talk=document.getElementById("goal_of_talk");
    //         my_row.cells[2].textContent=goal_of_talk.options[goal_of_talk.selectedIndex].text;
    //         var get_call_name=document.getElementById("get_call_name");
    //         my_row.cells[3].textContent=get_call_name.options[get_call_name.selectedIndex].text;
    
    //         var no_police=document.getElementById("no_police");
    //         my_row.cells[5].textContent=no_police.options[no_police.selectedIndex].text;
    //     } else{ 
    //         var  goal_of_talk=document.getElementById("goal_of_talk");
    //         goal_of_talk=goal_of_talk.options[goal_of_talk.selectedIndex].text;
    //         var get_call_name=document.getElementById("get_call_name");
    //         get_call_name=get_call_name.options[get_call_name.selectedIndex].text;
    
    //         var no_police=document.getElementById("no_police");
    //         no_police=no_police.options[no_police.selectedIndex].text;
    //       document.getElementById(table_name).insertRow(-1).innerHTML = 
    //       "<td> " +$("#datee").val()+"</td> "+
    //       "<td>"+$("#summary_of_conversation").val()+"</td>"+ 
    //       "<td>"+goal_of_talk+"</td>"+  
    //       "<td>"+get_call_name+"</td>"+  
    //       "<td> </td>"
    //       "<td>"+no_police+"</td>";   
    //    }
        save_from_coler_box2(params).done(function (data) {
            params.data=data;
            params.table_template="templat_conversation_list";
            params.div_result="conversation_div";
            render_html_with_data(params);
        }).fail(function (err) {
    
        });
    }

