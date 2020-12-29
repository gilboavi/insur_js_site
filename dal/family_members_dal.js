const sql = require('mssql');
const dbConn = require("./dbConn");
//const uuid = require('uuidv4').default;

const sql_insert_families_members=  "INSERT INTO   FamilyMembers "+
                                    "( FamiliesSerial , ClientSerial , Member_type  , Comment )"+
                                    " VALUES "+
                                    "( @families_serial , @client_serial , @member_type  , @comment )";



const sql_find_by_family_serial_and_client_serial="Select * From FamilyMembers Where " +
                      "( FamiliesSerial=@families_serial ) And ( ClientSerial= @client_serial )" ;

const sql_delete_from_familyMembers_by_family_serial_and_client_serial=
               "Delete  From FamilyMembers Where " +
                      "( FamiliesSerial=@families_serial ) And ( ClientSerial= @client_serial )" 

const  sql_familyMenbers_list_by_families_serial=
            " SELECT Clients.LastName, Clients.FirstName , FamilyMembers.Member_type,"+
            "  FamilyMembers.Serial, FamilyMembers.FamiliesSerial, "+
                " FamilyMembers.ClientSerial "+
              
            " FROM  FamilyMembers INNER JOIN Clients ON "+
                " FamilyMembers.ClientSerial = .Clients.Serial "+
            " WHERE  (FamilyMembers.FamiliesSerial = @families_serial)"  ;                    


const sql_get_familyMenbers_list_by_client_serial= "SELECT FamilyMembers.Serial, " +
                      " FamilyMembers.FamiliesSerial, FamilyMembers.ClientSerial, "+
                      " Clients.LastName, Clients.FirstName , "+  
                      " FamilyMembers.Member_type " +
  
                      " FROM FamilyMembers LEFT OUTER JOIN "+
                      " Clients ON FamilyMembers.ClientSerial = Clients.Serial " +
                  " WHERE     (FamilyMembers.FamiliesSerial = " +
                      " (SELECT  FamiliesSerial "+
                          " FROM  FamilyMembers AS FamilyMembers_1" +
                          " WHERE      (ClientSerial = @client_serial)))" ;

const sql_client_with_same_lastName_on_in_familyMembers=
        " SELECT Clients.Serial, Clients.id, Clients.LastName, Clients.FirstName, "+
        " Clients.City, Clients.Street "+
        " FROM Clients LEFT OUTER JOIN "+
            "FamilyMembers ON Clients.Serial = FamilyMembers.ClientSerial" +
        " WHERE (Clients.LastName = @last_name) AND (FamilyMembers.ClientSerial IS NULL) ";

function    get_family_members_list_from_db_by_client_serial(client_serial) {
                            
            try {
                               
                    let result =  dbConn.getPool().request()
                    .input('client_serial', sql.Int, client_serial)
                    .query(sql_get_familyMenbers_list_by_client_serial);
                    
                    return result;
                               
                } catch (err) {
                                // ... error checks 
                    throw { hasError: 1, errmsg: err.errmsg };
                }
}

module.exports = {
    async get_family_members_list(params) {
        try {
            let result = await dbConn.getPool().request()
            
            .query("Select * From FamilyMembers ");
            return result.recordsets;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_family_members_by_serial(params) {
       
        try {
            let result = await dbConn.getPool().request()
            .input('serial', sql.Int, params.serial)
            .query("Select * From FamilyMembersWithParams Where Serial=@serial");
            return result.recordsets;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async  get_familiesMembers_by_familiesSerial(params){
        try {
          //  let uniqueID = UUID.randomUUID().toString();
            let families_serial= params.families_serial;
            let result = await dbConn.getPool().request()
            .input('families_serial', sql.Int, families_serial)
            .query(sql_familyMenbers_list_by_families_serial);
                                                                

            let my_data={};
            // families_members list
            let my_families_members=result.recordsets;
            my_data.families_serial=families_serial;
            my_data.family_members=my_families_members;

            return my_data;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_family_members_by_client_serial(params) {
        let client_serial=params.client_serial;
         try {
            // let result =await get_family_members_list_from_db_by_client_serial(my_client_serial);
           
            let result = await dbConn.getPool().request()
            .input('client_serial', sql.Int, client_serial)
            .query(sql_get_familyMenbers_list_by_client_serial);

             let my_data={};
             // families_members list
             let my_families_members=result.recordsets[0];
            
             if(my_families_members[0] !=null){
                
                 my_data.families_serial=my_families_members[0].FamiliesSerial;
                my_data.families_members_list=my_families_members;
               
             }
             else{

                

             }
           
             return my_data;
            
         } catch (err) {
             // ... error checks 
             throw { hasError: 1, errmsg: err.errmsg };
         }
     },
    
    async  add_families_members(params){
        let that=this;
        try {
            let result =await dbConn.getPool().request()
            .input('families_serial', sql.Int,params.families_serial)
            .input('client_serial', sql.Int, params.client_serial)
            .query(sql_find_by_family_serial_and_client_serial ); 
            
            if( result.recordsets[0].length ==0 ){
               let member_type=params.member_type;
               let comment=params.comment;
                let result_families_members = await dbConn.getPool().request()
                
                    .input('families_serial', sql.Int,params.families_serial)
                    .input('client_serial', sql.Int, params.client_serial)
                    .input('member_type', sql.NVarChar, member_type)
                    .input('comment', sql.NVarChar, comment)
                
                    
                    .query(sql_insert_families_members );  
            }
                let my_data=await that.get_familiesMembers_by_familiesSerial(params);
              
              //  my_data.families_members_list=my_data1[0];
              //  my_data.families_serial=families_serial;
               
                return my_data;

        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async  delete_from_families_members_by_familySerial_and_clientSerial(params){
        let that=this;
        try {
            let result =await dbConn.getPool().request()
            .input('families_serial', sql.Int,params.families_serial)
            .input('client_serial', sql.Int, params.client_serial)
            .query(sql_delete_from_familyMembers_by_family_serial_and_client_serial ); 
            
           
                let my_data=await that.get_familiesMembers_by_familiesSerial(params);
                return my_data;

        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_family_members(params) {
        let that=this;
        var sql_str = "";
        if (params.serial!="0") {
             sql_str = "UPDATE   FamilyMembers SET " +
                // "FamilySerial=@family_serial  " + "," +
                // "ClientSerial=@client_serial  " + "," +
                 "Member_type=@member_type"+  "," +
                " Comment=@comment " +
                "  WHERE [Serial]= @serial ";
        } else {
            sql_str = "INSERT INTO  FamilyMembers " + " " +
               " ( FamiliesSerial , ClientSerial , Member_type , Comment )" + " " +
                "   VALUES " + " " +
                "( @families_serial , @client_serial , @member_type ,  @comment )";

        }
       
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('families_serial', sql.Int, params.family_serial)
                .input('client_serial', sql.Int, params.client_serial)
                .input('member_type', sql.NVarChar, params.member_type)
                .input('comment', sql.NVarChar, params.comment)
                .query(sql_str );

                let my_data=await that.get_familiesMembers_by_familiesSerial(params);
                return my_data;
        //    let result2 = await dbConn.getPool().request()
        //         .input('client_serial', sql.Int, params.client_serial)
        //         .query(sql_communication_list);
        //     let my_data ={
        //         communication_list:result2.recordsets[0]
        //     }    

          //  return my_data;
            // Stored procedure 
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
    
    }

}