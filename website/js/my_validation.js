// my_validation.js

function validate_client() {
    
      if ($("#id").val() == '') {
          alert("לא ניתן לשמור ללא  מספר תעודת זהות");
          return false;
      }
     

      if ($("#status option:selected").val() < 1) {
        alert("לא ניתן לשמור ללא   סטוטס");
        return false;
    } 

      if ($("#birthday").val() == '') {
          alert("לא ניתן לשמור ללא  תאריך לידה");
          return false;
      }

      
      if ($("#operation option:selected").val() < 1) {
        alert("לא ניתן לשמור ללא   שיוך לקבוצה");
        return false;
    } 

     
      return true;
}


function validate_conversation(numGoalOfTalk) {
    
    // if ($('#CurrentConversation_GoalOfTalk').val() == numGoalOfTalk) {
    //     if ($("#CurrentConversation_TypeTevia").val() == '') {
    //         alert("לא ניתן לשמור ללא  תחום התביעה");
    //         return false;
    //     }

    // }
    if ($("#get_call_name option:selected").val() < 1) {
        alert("לא ניתן לשמור ללא  שם מטפל");
        return false;
    }
    if ($("#goal_of_talk option:selected").val() < 1) {
        alert("לא ניתן לשמור ללא מטרת השיחה");
        return false;
    }
    if ($("#CurrentConversation_SummaryOfConversation").val() == '') {
        alert("לא ניתן לשמור ללא  תקציר");
        return false;
    }
    return true;
}


function validate_followup_conversation() {
    if ($("#type_followup_conversation").val() <1) {
        alert("לא ניתן לשמור ללא  סטוטס");
        return false;
    }
    if ($("#summary").val() == '') {
        alert("לא ניתן לשמור ללא  תקציר");
        return false;
    }
    return true;
}

function validate_life_police() {
    if ($("#no_police").val() == '') {
        alert("לא ניתן לשמור ללא מספר פוליסה");
        return false;
    }
    if ($("#company").val() == '') {
        alert("לא ניתן לשמור ללא שם חברה");
        return false;
    }
    if ($("#rate_salary").val() == '') {
        alert("לא ניתן לשמור ללא אחוז השכר");
        return false;
    }
    if ($("#status").val() == '') {
        alert("לא ניתן לשמור ללא ססטוס פוליסה");
        return false;
    }
    if ($("#begin_Insur").val() == '') {
        alert("לא ניתן לשמור ללא  תאריך תחילה");
        return false;
    }

    


    return true;

};

  function validateMeeting() {
    if ($("#CurrentMeeting_MeetingStatus").val() == '') {
        alert("לא ניתן לשמור ללא  סטוטס");
        return false;
    }

    if ($("#CurrentMeeting_EditorName").val() == '') {
        alert("לא ניתן לשמור ללא  שם מכין התיק");
        return false;
    }

    if ($("#CurrentMeeting_AgentName").val() == '') {
        alert("לא ניתן לשמור ללא  שם סוכן");
        return false;
    }

    if ($("#CurrentMeeting_MeetingSummary").val() == '') {
        alert("לא ניתן לשמור ללא  תקציר");
        return false;
    }



    return true;

}


function validate_kupa_gemel() {

    if ($("#date_open").val() == '') {
        alert("לא ניתן לשמור ללא תאריך רישום");
        return false;
    }
    
    if ($("#agent option:selected").val() < 1) {
        alert("לא ניתן לשמור ללא  שם סוכן");
        return false;
    } 
    
    
        if ($("#shlav_tipul option:selected").val() <1) {
            alert("לא ניתן לשמור ללא   שלב הטיפול");
            return false;
        }

        if ($("#type_kupa option:selected").val() <1) {
            alert("לא ניתן לשמור ללא  סוג קופה");
            return false;
        }
        if ($("#maslul_kupa option:selected").val() <1) {
            alert("לא ניתן לשמור ללא  מסלול קופה");
            return false;
        }
        
       
        if ($("#user option:selected").val() <1) {
            alert("לא ניתן לשמור ללא  שם מטפל");
            return false;
        }
       
    
        if ($("#dmay_nihul").val() == '') {
            alert("לא ניתן לשמור ללא  דמי ניהול");
            return false;
        }
    
    
        if ($("#summ").val() == '') {
            alert("לא ניתן לשמור ללא  סכום הצבירה");
            return false;
        }
    
    
        if ($("#no_amit_old").val() == '') {
            alert("לא ניתן לשמור ללא  מספר עמית ישן");
            return false;
        }
    
        if ($("#kupa_old").val() == '') {
            alert("לא ניתן לשמור ללא  שם קופה ישנה");
            return false;
        }
    
        return true;
}




function validateProposalLifeWithClientName() {
    
    
        if ($("#CurrentProposalLife_ClientSerial").val() == '') {
                alert("לא ניתן לשמור ללא  שם לקוח");
                return false;
       }
    
    
        if ($("#CurrentProposalLife_Status").val() == '') {
             alert("לא ניתן לשמור ללא  סטטוס");
            return false;
        }
    
        if ($("#CurrentProposalLife_Agent").val() == '') {
            alert("לא ניתן לשמור ללא  שם סוכן");
            return false;
        }
        if ($("#CurrentProposalLife_Premia").val() == '') {
            alert("לא ניתן לשמור ללא  פרמיה צפויה");
            return false;
        }
        if ($("#CurrentProposalLife_Company").val() == '') {
            alert("לא ניתן לשמור ללא  שם חברה");
            return false;
        }
        if ($("#CurrentProposalLife_TypeInsurLife").val() == '') {
            alert("לא ניתן לשמור ללא  סוג ביטוח");
            return false;
        }
    
    
        return true;
}
    
    
    
   

    
    


    
     