// conversation_hierarchy_grid.js

function build_conversation_hierarchy_grid(father, son) {


    //   alert(a);

    var product_map = {};
    var c = [];

    // mapping key of master table
    $.each(father, function () {
        this.c = [];

        product_map[this.Serial] = this;
    });

    // mapping key of master table to  detail table
    $.each(son, function () {

        product_map[this.ConversationsSerial].c.push(this);
    });




    // html table name        
    $("#hierarchical_grid").igHierarchicalGrid({
        initialDataBindDepth: 1,
        dataSource: father, // master table
        dataSourceType: "json",
        responseDataKey: "d",

        autoGenerateColumns: false,
        primaryKey: "Serial",   // master table Key
        features: [
            //                                {
            //                                    name: 'RowSelectors',
            //                                    //  enableCheckBoxes: true,
            //                                   
            //                                    rowSelectorClicked: function (evt, ui) {
            //                                        alert(ui.rowIndex);
            //                                    }
            //                                    
            //                                },
            //                                {
            //                                    name: 'Selection'
            //                                }, 
            {
                name: "Updating",
                enableAddRow: false,
                enableDeleteRow: false,
                editMode: "none"
            },
        ],
        columns: [

            { key: "Datee", headerText: "תאריך", dataType: "date", format: "dd-MM-yyyy", width: "100px" },

            { key: "SummaryOfConversation", headerText: "תקציר השיחה", dataType: "string", width: "600px" },

            { key: "GoalOfTalkName", headerText: "מטרת השיחה", dataType: "string", width: "150px" },
            { key: "UserName", headerText: "מטפל השיחה", dataType: "string", width: "80px" },
            { key: "TypeFollowupConversationName", headerText: "סטטוס השיחה", dataType: "string", width: "150px" },



            {
                headerText: "שיחות", key: "Serial", width: "50px", formatter: function (val, record) {

                    return "<a href='javascript: ;' onclick='edit_conversation(" + val + ", this);' >" + "עריכה" + "</a>";
                }
            },
            {
                headerText: "מעקב", key: "Serial", width: "50px", formatter: function (val, record) {


                    return "<a href='javascript: ;' onclick='new_followup_conversation(" + val + ", this);' >" + "מעקב חדש" + "</a>";
                }
            }



        ],
        autoGenerateLayouts: false,
        defaultChildrenDataProperty: "c",  // detail table
        columnLayouts: [
            {
                name: "c",  // detail table
                responseDataKey: "",
                childrenDataProperty: "c", // detail table
                autoGenerateColumns: false,
                primaryKey: "Serial", // detail table Key
                features: [

                    {
                        name: "Updating",
                        enableAddRow: false,
                        enableDeleteRow: false,
                        editMode: "none"
                    },
                ],
                columns: [
                    { key: "DateFollowUp", headerText: "תאריך הפניה", dataType: "date", format: "dd-MM-yyyy", width: "100px" },
                    { key: "Summary", headerText: "תקציר הפניה", dataType: "string", width: "400px" },
                    { key: "UserName", headerText: "מטפל בפניה", width: "100px", dataType: "string" },


                    { key: "StatusFollowUp", headerText: "סטטוס הפניה", dataType: "string", width: "80px" },
                    {
                        headerText: "", key: "Serial", width: "50px", formatter: function (val, record) {

                            return "<a href='javascript: ;' onclick='edit_followup_conversation(" + val + ", this);' >" + "עריכה" + "</a>";
                        }
                    }
                ]
            }
        ]



    });


}


function build_proposal_life_hierarchy_grid(father, son) {


    //   alert(a);

    var product_map = {};
    var c = [];

    // mapping key of master table
    $.each(father, function () {
        this.c = [];

        product_map[this.Serial] = this;
    });

    // mapping key of master table to  detail table
    $.each(son, function () {

        product_map[this.FollowupProposalLifeSerial].c.push(this);
    });




    // html table name        
    $("#hierarchical_proposal_life_grid").igHierarchicalGrid({
        initialDataBindDepth: 1,
        dataSource: father, // master table
        dataSourceType: "json",
        responseDataKey: "d",

        autoGenerateColumns: false,
        primaryKey: "Serial",   // master table Key
        features: [
            //                                {
            //                                    name: 'RowSelectors',
            //                                    //  enableCheckBoxes: true,
            //                                   
            //                                    rowSelectorClicked: function (evt, ui) {
            //                                        alert(ui.rowIndex);
            //                                    }
            //                                    
            //                                },
            //                                {
            //                                    name: 'Selection'
            //                                }, 
            {
                name: "Updating",
                enableAddRow: false,
                enableDeleteRow: false,
                editMode: "none"
            },
        ],
        columns: [

            { key: "FullName", headerText: "שם הלקוח", dataType: "string", width: "150px" },
            { key: "ProposalDate", headerText: "תאריך", dataType: "date", format: "dd-MM-yyyy", width: "100px" },

            { key: "CompanyName", headerText: "שם החברה", dataType: "string", width: "150px" },
            { key: "TypeInsurLifeName", headerText: "סוג הביטוח", dataType: "string", width: "150px" },

            
            { key: "UserName", headerText: " שם המטפל", dataType: "string", width: "80px" },
            { key: "StatusName", headerText: "סטטוס ", dataType: "string", width: "150px" },



            {
                headerText: "הצעות", key: "Serial", width: "50px", formatter: function (val, record) {

                    return "<a href='javascript: ;' onclick='edit_proposal_life(" + val + ", this);' >" + "עריכה" + "</a>";
                }
            },
            {
                headerText: "מעקב", key: "Serial", width: "50px", formatter: function (val, record) {


                    return "<a href='javascript: ;' onclick='new_followup_proposal_life(" + val + ", this);' >" + "מעקב חדש" + "</a>";
                }
            }



        ],
        autoGenerateLayouts: false,
        defaultChildrenDataProperty: "c",  // detail table
        columnLayouts: [
            {
                name: "c",  // detail table
                responseDataKey: "",
                childrenDataProperty: "c", // detail table
                autoGenerateColumns: false,
                primaryKey: "Serial", // detail table Key
                features: [

                    {
                        name: "Updating",
                        enableAddRow: false,
                        enableDeleteRow: false,
                        editMode: "none"
                    },
                ],
                columns: [
                    { key: "Datee", headerText: "תאריך ", dataType: "date", format: "dd-MM-yyyy", width: "100px" },
                    { key: "Comment", headerText: "תקציר ", dataType: "string", width: "400px" },
                    { key: "UserName", headerText: "מטפל ", width: "100px", dataType: "string" },


                    { key: "StatusFollowupProposalLifeName", headerText: "סטטוס ", dataType: "string", width: "80px" },
                    {
                        headerText: "", key: "Serial", width: "50px", formatter: function (val, record) {

                            return "<a href='javascript: ;' onclick='edit_followup_proposal_life(" + val + ", this);' >" + "עריכה" + "</a>";
                        }
                    }
                ]
            }
        ]



    });


}

