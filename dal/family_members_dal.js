

const db_conn_mysql = require('./db_con_mysql');
//const uuid = require('uuidv4').default;

const sql_family_members_with_params_by_serial=
        " Select * From family_members_with_params "+
         " Where Serial=@serial";

const sql_find_by_family_serial_and_client_serial=
            "Select * From `family_members` Where " +
            "( `families_serial`=? ) And ( `client_serial`= ? )" ;

const sql_families_by_client_serial=
            "SELECT *  FROM `family_members` "+
            " Where `client_serial` = ?; " ;

const sql_family_members_by_families_serial=
            " Select last_name, first_name,member_type, client_serial "+
            " From family_members_with_params "+
            " Where families_serial=?" ;

const sql_delete_from_familyMembers_by_family_serial_and_client_serial=
            "Delete  From `family_members` Where " +
            "( `families_serial`=? ) And ( `client_serial`=?  )" 

const  sql_family_menbers_list_by_families_serial=
        "Select `last_name`, `first_name`,`member_type`, "+
        " `client_serial` "+
        " From `family_members_with_params` Where "+
        "`families_serial`=?";

const sql_familyMenbers_list_by_client_serial= 
        " Select last_name, first_name,member_type, client_serial "+
        " From family_members_with_params "+
        " Where lient_serial=?" ;  

const sql_client_with_same_lastName_on_in_familyMembers=
        " SELECT Clients.Serial, Clients.id, Clients.LastName, Clients.FirstName, "+
        " Clients.City, Clients.Street "+
        " FROM Clients LEFT OUTER JOIN "+
            "FamilyMembers ON Clients.Serial = FamilyMembers.ClientSerial" +
        " WHERE (Clients.LastName = @last_name) AND (FamilyMembers.ClientSerial IS NULL) ";

function    get_family_members_list_from_db_by_client_serial(client_serial) {
                            
            try {
                               
                    let result = db_conn_mysql.get_pool().promise()
                           .query(sql_familyMenbers_list_by_client_serial,[client_serial]);
                    
                    return result;
                               
                } catch (err) {
                                // ... error checks 
                    throw { hasError: 1, errmsg: err.errmsg };
                }
}


function built_sql_string(sql_head,oprator,sql_end){

    var sql_update_insert = sql_head + " " +
            " families_serial "+oprator+"," + 
            " client_serial"+oprator+" ," + 
            " member_type "+oprator+"  ," +
            " comment "+oprator+" " +
               sql_end;
    return sql_update_insert;
}

module.exports = {

    async get_family_members_list(params) {
        try {
            let result = await db_conn_mysql.get_pool().promise()
            
            .query("Select * From `family_members` ");
            return result[0][0];
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_family_members_by_serial(params) {
       
        try {
            let result = await db_conn_mysql.get_pool().promise()
                .query(family_members_with_params,
                [params.serial]);
            return result[0];
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async  get_families_members_by_families_serial(params){
        try {
          //  let uniqueID = UUID.randomUUID().toString();
            let families_serial= params.families_serial;
            let result = await db_conn_mysql.get_pool().promise()
                       .query(sql_family_menbers_list_by_families_serial,
                        [families_serial]);
                                                                

            let my_data={};
            // families_members list
            let my_families_members=result[0][0];
            my_data.families_serial=families_serial;
            my_data.family_members=my_families_members;

            return my_data;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    // from family_members_with_params
    async get_family_members_by_client_serial(params) {
        let client_serial=params.client_serial;
         try {
            // let result =await get_family_members_list_from_db_by_client_serial(my_client_serial);
           
            let result = await db_conn_mysql.get_pool().promise()
                .query(sql_familyMenbers_list_by_client_serial,
                [client_serial]);

             let my_data={};
             // families_members list
             let my_families_members=result[0];
            
             if(my_families_members[0] !=null){
                
                 my_data.families_serial=my_families_members[0][0].families_serial;
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
        
        var sql_head=" INSERT into  family_members ( ";
        var sql_oprator="";
        var sql_end=") VALUES (? , ? , ? , ?)";
                                 

       var sql_insert_families_members= built_sql_string(sql_head,sql_oprator,sql_end)
        try {
            // find if family member exsists
            let result =await db_conn_mysql.get_pool().promise()
                .query(sql_find_by_family_serial_and_client_serial,
                 [params.families_serial,
                    params.client_serial] 
                 ); 
            // insert
            if( result[0].length ==0 ){
               let member_type=params.member_type;
               let comment=params.comment;
                let result_families_members = await db_conn_mysql.get_pool().promise()
                    .query(sql_insert_families_members,
                        [parseInt(params.families_serial), 
                            parseInt(params.client_serial),
                         params.member_type,
                         params.comment
                        ] );  
            }
                let my_data=await that.get_families_members_by_families_serial(params);
              
                return my_data;

        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async  delete_from_families_members_by_familySerial_and_clientSerial(params){
        let that=this;
        try {
            let result =await db_conn_mysql.get_pool().promise()
                .query(sql_delete_from_familyMembers_by_family_serial_and_client_serial,
                [params.families_serial,params.client_serial] ); 
            
           
                let my_data=await that.get_families_members_by_families_serial(params);
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
             sql_str = "UPDATE   family_members SET " +
                // "FamilySerial=@family_serial  " + "," +
                // "ClientSerial=@client_serial  " + "," +
                 "member_type=?"+  "," +
                " comment=? " +
                "  WHERE serial=? ";
        } else {
            sql_str = "INSERT INTO  FamilyMembers " + " " +
               " ( FamiliesSerial , ClientSerial , Member_type , Comment )" + " " +
                "   VALUES " + " " +
                "( @families_serial , @client_serial , @member_type ,  @comment )";

        }
       
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await db_conn_mysql.get_pool().promise()
                .input('serial', sql.Int, params.serial)
                .input('families_serial', sql.Int, params.family_serial)
                .input('client_serial', sql.Int, params.client_serial)
                .input('member_type', sql.NVarChar, params.member_type)
                .input('comment', sql.NVarChar, params.comment)
                .query(sql_str );

                let my_data=await that.get_familiesMembers_by_familiesSerial(params);
                return my_data;
       
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
    
    }

}