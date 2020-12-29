var family_members = require("../dal/family_members_dal");
const sql = require('mssql');
const dbConn = require("./dbConn");

const sql_update_families=  "UPDATE   Families SET " +
                            "LastName=@last_name  " + "," +
                            "FirstName=@first_name  " + "," +
                            "Street=@street  " + "," +
                            "City=@city"+  "," +
                            " Comment=@comment " +
                            "  WHERE [Serial]= @serial ";

const sql_insert_families=   "INSERT INTO  Families " + " " +
                    " ( LastName , FirstName, Street , City , Comment , Mone)" + " " +
                    "   VALUES " + " " +
                    "( @last_name ,@first_name, @street , @city ,  @comment, @mone )";  

const sql_insert_families_new=   "INSERT INTO  Families " + " " +
                    " ( ClientSerial ,mone)" + " " +
                    "   VALUES " + " " +
                    "( @client_serial,@mone )";  

const sql_insert_family_members="INSERT INTO   FamilyMembers "+
                 "( FamiliesSerial , ClientSerial , Member_type  , Comment )"+
                 " VALUES "+
                 "( @families_serial , @client_serial , @member_type  , @comment )";
                
const sql_insert_family_members_first_member="INSERT INTO   FamilyMembers "+
                 "( FamiliesSerial , ClientSerial  )"+
                 " VALUES "+
                 "( @families_serial , @client_serial  )";

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

const sql_get_families_by_mone_and_client_serial= "select Serial from families " +
               " where mone=@mone and ClientSerial=@client_serial "


const sql_get_family_by_client_serial= "SELECT Serial From Families Where ClientSerial=@client_serial "

module.exports = {

        async get_families_list(params) {
            try {
                let result = await dbConn.getPool().request()
                .input('last_name', sql.NVarChar, params.last_name)
                .query("Select * From Families Where LastName=@last_name");


                let my_data={};
                my_data.Femilies_list=result.recordsets[0];
                my_data.client_serial=params.client_serial;
               
                return my_data;
            } catch (err) {
                // ... error checks 

                throw { hasError: 1, errmsg: err.errmsg };
            }
        },

        async get_data_from_families_by_client_serial(client_serial) {
                            
            try {
               
                let result =  dbConn.getPool().request()
                .input('client_serial', sql.Int, client_serial)
                .query(sql_get_familyMenbers_list_by_client_serial);
              
                return result;
               
            } catch (err) {
                // ... error checks 
                throw { hasError: 1, errmsg: err.errmsg };
            }
        },
        
        async get_families_by_client_serial(params) {
           let my_client_serial=params.client_serial;
            try {
                let result =await family_members.get_family_members_by_client_serial(params);
              
                
              
                return my_data;
               
            } catch (err) {
                // ... error checks 
                throw { hasError: 1, errmsg: err.errmsg };
            }
        },

        async get_families_by_serial(params) {
           
            try {
                let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)

                .query("Select * From Families Where Serial=@serial");
               
               return result.recordsets;
               
            } catch (err) {
                // ... error checks 
                throw { hasError: 1, errmsg: err.errmsg };
            }
        },

        // sql_insert_families_new

        async insert_new_family(params) {
        
            try {
               // insert new families
                let my_mone=Math.random() * 100000 | 0;
                let client_serial=params.client_serial;
                let result = await dbConn.getPool().request()
                    .input('client_serial', sql.Int, client_serial)
                    .input('mone', sql.Float, my_mone)
                    .query(sql_insert_families_new );
                // get Serial of new families
                    result = await dbConn.getPool().request()
                    .input('mone',  sql.Float, my_mone)
                    .input('client_serial', sql.Int, client_serial)
                    .query( sql_get_families_by_mone_and_client_serial );
                // insert new family member
                    let  families_serial;
                    if( result.recordsets[0].length !=0 ){
                     families_serial= result.recordsets[0][0].Serial;
                     let   result2 = await dbConn.getPool().request()
                        .input('client_serial', sql.Int, client_serial)
                        .input('families_serial', sql.Int, families_serial)
                        
                        .query(sql_insert_family_members_first_member );

                    }

                 let my_params={
                    families_serial:families_serial
                 }  
                 // return family members
                 let my_data=await family_members.get_familiesMembers_by_familiesSerial(my_params);
                return my_data;
           
            } catch (err) {
                // ... error checks 
                throw { errmsg: err };
            }
            // finally {
        } ,

        async save_families(params) {
            let _this=this;
            var sql_str = "";
            var my_serial= parseInt(params.serial);
            var my_mone=Math.random() * 10000 | 0;
            if (my_serial>0) {
                 sql_str = sql_update_families;
            } else {
                sql_str =sql_insert_families;
    
            }
           
            try {
                
                let result = await dbConn.getPool().request()
                    .input('serial', sql.Int, params.serial)
                    .input('last_name', sql.NVarChar, params.last_name)
                    .input('first_name', sql.NVarChar, params.first_name)
                    .input('street', sql.NVarChar, params.street)
                    .input('city', sql.NVarChar, params.city)
                    .input('comment', sql.NVarChar, params.comment)
                    .input('mone', sql.Float, my_mone)
                    
                    .query(sql_str );

                    if(my_serial==0){
                        let result_families = await dbConn.getPool().request()
                        .input('last_name', sql.NVarChar, params.last_name.trim())
                        .input('mone', sql.Float, my_mone)
                        .query(" Select * From Families Where (Mone=@mone) And (LastName=@last_name)");  
                        let my_families_serial=result_families.recordsets[0][0].Serial;
                        if(my_families_serial>0){
                            let result_families_members = await dbConn.getPool().request()
                            
                                .input('families_serial', sql.NVarChar, my_families_serial)
                                .input('client_serial', sql.NVarChar, params.client_serial)
                                .input('member_type', sql.NVarChar, "ראשי")
                                .input('comment', sql.NVarChar, params.comment)
                               
                                
                                .query(sql_insert_family_members );  
                               
                               
                        }
                    }

                return await _this.get_families_list(params);
           
            } catch (err) {
                // ... error checks 
                throw { errmsg: err };
            }
            // finally {
        }
}