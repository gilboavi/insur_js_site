// follow_checks_dal
var config = require("../config").config;
const sql = require('mssql');
const dbConn = require("./dbConn");

const sql_follow_checks = " Select  EmployerName , CompanyName , PurposeCheckName , " +
    " CONVERT( varchar, [CheckDate] , 103) , CheckNumber, " +
    " CheckSum  , CONVERT( varchar, [MonthSallaryDate] , 103)  , comment , Serial " +

    " From dbo.FollowChecksWithParams ";
const sql_where = " Where Serial=@serial ";

const sql_helper_follow_checks =  " Select * From ParamCompany ORDER BY ParamName ; " +
                                                        " Select * From ParamEmployer ORDER BY ParamName ; " +
                                                        " Select * From ParamTypeInsurLife ORDER BY ParamName ; ";


const get_my_follow_checks = (params) => {
    var my_follow_checks = {
        Serial: 0,
        ClientSerial: null ,          //Number(params.client_serial),
        CheckDate: null,
        CheckArrevedDate: null,
        MonthSallaryDate: null,
        PurposeCheck: null,
        Company: null,
        CheckNumber: null,
        CheckSum: null,
        ReceivedDateInCompany: null,
        NoPolice: null,
        EndProcess: null,
        Employer: null,
        comment: null
        
    }
    return my_follow_checks;
}


module.exports = {


    async get_follow_checks_by_serial(params) {
       
        if (params.serial !=0) {
            sql_str =" Select * From FollowChecks Where Serial=@serial  " + sql_helper_follow_checks;
        }
        else {
            var sql_str = sql_helper_follow_checks;
        }

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .query(sql_str);

            var my_data = {};
            if (params.serial == 0) {
                var main_t = [];
                main_t.push(get_my_follow_checks(params))
                my_data.main = main_t;
              

                my_data.company_list = result.recordsets[0];
                my_data.employer_list = result.recordsets[1];
                my_data.purpose_check_list = result.recordsets[2];
               
            } else {
                my_data.main = result.recordsets[0];
                my_data.company_list = result.recordsets[1];
                my_data.employer_list = result.recordsets[2];
                my_data.purpose_check_list = result.recordsets[3];
            }
            return  my_data;

        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
       
    },

    async get_follow_checks_list(params) {
        var sql_where = " Where ";
        var sql_str = "";

        if (params.checkbox_employer) {
            sql_str =  " AND  Employer = @employer";
        }

        if (params.checkbox_company) {
            sql_str = sql_str + " AND Company = @company";
        }


        if (params.checkbox_purpose_check) {
            sql_str = sql_str + " AND PurposeCheck = @purpose_check";
        }

       

        if (sql_str == "") {
            sql_str = sql_follow_checks;
        }
        else {
            sql_str = sql_str.substr(4, sql_str.length);
            sql_str = sql_follow_checks + " " + sql_where + sql_str;
        }
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('employer', sql.Int, params.employer)
                .input('company', sql.Int, params.company)
                .input('purpose_check', sql.Int, params.purpose_check)
            
                .query(sql_str);
            return result.recordsets;
            
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
      
    },

    async save_follow_checks(params) {
        var sql_str = " UPDATE  FollowChecks "+
           // "  SET  ClientSerial  =  "+
            " SET  CheckDate =@check_date  "+
           // "  , CheckArrevedDate =  "+
            "  , MonthSallaryDate =@month_sallary_date  " +
            "   , PurposeCheck =@purpose_check " +
            "   , Company =@company " +
            "   , CheckNumber =@check_number " +
            "  , CheckSum =@check_sum " +
          //  "  , ReceivedDateInCompany = " +
         //   "  , NoPolice = " +
         //   "  , EndProcess = " +
            "  , Employer =@employer " +
            "  , comment = @comment  " +
            "  WHERE [Serial]= @serial ";

        if (params.serial == 0) {
            sql_str = "INSERT INTO FollowChecks " + " " +
                "(CheckDate , MonthSallaryDate , PurposeCheck ,  Company , CheckNumber , CheckSum , Employer , comment )" +
                "   VALUES " +
                "( @check_date, @month_sallary_date , @purpose_check , @company , @check_number  , @check_sum , @employer, @comment )";
        }
        if (params.employer == null) {
            params.employer = "0";
        }
        if (params.purpose_check == null) {
            params.purpose_check = "0";
        }
        if (params.company == null) {
            params.company = "0";
        }
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('check_date', sql.DateTime, params.check_date)
                .input('month_sallary_date', sql.DateTime, params.month_sallary_date)
                .input('purpose_check', sql.Int, params.purpose_check)
                .input('company', sql.Int, params.company)
                .input('check_number', sql.NVarChar, params.check_number)
               
            
                .input('check_sum', sql.Float, params.check_sum)
                .input('employer', sql.Int, params.employer)
             
                .input('comment', sql.NVarChar, params.comment)
                .query(sql_str  );

            return {};
            // Stored procedure 
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
       
    },


    async get_follow_checks_for_filtring(params) {
       
    },

    async get_follow_checks_after_filtring(params) {
       
    }


}