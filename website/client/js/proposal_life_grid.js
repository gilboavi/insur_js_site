// proposal_life_grid..js

function build_proposal_life_hierarghy_grid(father, son) {


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
                product_map[ this.FollowupProposalLifeSerial ].c.push(this);
            });                             




            // html table name
            $("#proposal_life_hierarchical_grid").igHierarchicalGrid({
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

                { key: "ProposalDate", headerText: "?????", dataType: "date", format: "dd-MM-yyyy", width: "100px" },

				{ key: "TypeInsurLifeName", headerText: "??? ??????", dataType: "string", width: "80px" },

                { key: "CompanyName", headerText: "?? ????", dataType: "string", width: "100px" },
                { key: "StatusName", headerText: "?????", dataType: "string", width: "80px" },
                { key: "StatusDate", headerText: "????? ?????", dataType: "date", width: "100px", format: "dd-MM-yyyy" },

                { key: "Comment", headerText: "????", width: "400px", dataType: "string" },
                  { key: "FullName", headerText: "?? ????", width: "100px", dataType: "string" },
//                  { key: "LastName", headerText: "?? ?????", width: "100px", dataType: "string" },
//                 { key: "FirstName", headerText: "?? ????", width: "100px", dataType: "string" },

                { headerText: "?????", key: "Serial", width: "50px", formatter: function (val, record) {

                    return "<a href='javascript: ;' onclick='edit(" + val + ", this);' >" + "?????" + "</a>";
                }
                },
                { headerText: "???", key: "Serial", width: "50px", formatter: function (val, record) {

                  
                    return "<a href='javascript: ;' onclick='newFollowup(" + val + ", this);' >" + "???? ???" + "</a>";
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
                    { key: "Datee", headerText: "?????", dataType: "date", format: "dd-MM-yyyy", width: "100px" },
                     { key: "StatusFollowupProposalLifeName", headerText: "????", dataType: "string", width: "100px" },
                    { key: "Comment", headerText: "????", width: "750px", dataType: "string" },


                     { key: "UserName", headerText: "?????", dataType: "string", width: "80px" },
                { headerText: "???", key: "Serial", width: "50px", formatter: function (val, record) {

                    return "<a href='javascript: ;' onclick='editFollowup(" + val + ", this);' >" + "?????" + "</a>";
                }
                }
                ]
            }
        ]



            });


 }