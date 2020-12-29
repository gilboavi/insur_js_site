//var config = require("../config").config;
const sql = require('mssql');
var entities = require('../read_xml/entities');
const dbConn = require("../dal/dbConn");

const sql_insert_yeshut_yatzran = " INSERT INTO [InsurDB].[dbo].[ParamCompany] " +
    "( KOD_MEZAHE_YATZRAN, ParamName )" +
    " VALUES " +

    "( @KOD_MEZAHE_YATZRAN , @ParamName) ";


const sql_select_client = "SELECT     id FROM         dbo.Clients  WHERE(id = @MISPAR_ZIHUY_LAKOACH)";

const sql_insert_client_old= "INSERT INTO InsurDB.dbo.Clients " +
    "  (id  , LastName , FirstName   , Sex ,Birthday, Street  , City , Micud , Post_box , Status) " +
    "     VALUES " +
    "  (@id  , @LastName , @FirstName  " +
    ", @Sex, @Birthday , @Street  , @City , @Micud , @Post_box, @Status) ";

const sql_insert_client = "INSERT INTO [InsurDB].[dbo].[YeshutLakoachDB]   (MISPAR_ZIHUY_LAKOACH, SHEM_PRATI )     VALUES  (53,'avi') ";

const sql_insert_to_yeshut_lakoach = "INSERT INTO [InsurDB].[dbo].[YeshutLakoachDB] " +
    " ( SUG_MEZAHE_LAKOACH , MISPAR_ZIHUY_LAKOACH , SHEM_PRATI " +
    " , SHEM_MISHPACHA_KODEM , SHEM_MISHPACHA  , MIN "+
    " , TAARICH_LEYDA , PTIRA , TAARICH_PTIRA "+
    " , MATZAV_MISHPACHTI , ERETZ , SHEM_YISHUV "+
    " , SEMEL_YESHUV , SHEM_RECHOV , MISPAR_BAIT "+
    " , MISPAR_KNISA , MISPAR_DIRA  , MIKUD "+
    "  , TA_DOAR , MISPAR_TELEPHONE_KAVI , MISPAR_SHLUCHA "+
    " , MISPAR_CELLULARI  , MISPAR_FAX   , E_MAIL "+
        " , HEAROT  , MISPAR_YELADIM) " +

"  VALUES " +
    " ( @SUG_MEZAHE_LAKOACH , @MISPAR_ZIHUY_LAKOACH , @SHEM_PRATI " +
    " , @SHEM_MISHPACHA_KODEM , @SHEM_MISHPACHA  , @MIN  "+
" , @TAARICH_LEYDA , @PTIRA , @TAARICH_PTIRA " +
    " , @MATZAV_MISHPACHTI , @ERETZ , @SHEM_YISHUV " +
    " , @SEMEL_YESHUV , @SHEM_RECHOV , @MISPAR_BAIT " +
    " , @MISPAR_KNISA , @MISPAR_DIRA  , @MIKUD " +
    "  , @TA_DOAR , @MISPAR_TELEPHONE_KAVI , @MISPAR_SHLUCHA " +
    " , @MISPAR_CELLULARI  ,@MISPAR_FAX   , @E_MAIL " +
    " , @HEAROT  , @MISPAR_YELADIM) "
    ;


function get_my_yeshut_lakoach(params) {

    var my_yeshut_lakoach = {};
  
   
    params.xml_node_name = "SUG-MEZAHE-LAKOACH";
    my_yeshut_lakoach.SUG_MEZAHE_LAKOACH = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-ZIHUY-LAKOACH";
    my_yeshut_lakoach.MISPAR_ZIHUY_LAKOACH = entities.get_field_val(params);



    params.xml_node_name = "SHEM-PRATI";
    my_yeshut_lakoach.SHEM_PRATI = entities.get_field_val(params);

    
    params.xml_node_name = "SHEM-MISHPACHA-KODEM";
    my_yeshut_lakoach.SHEM_MISHPACHA_KODEM = entities.get_field_val(params);

    params.xml_node_name = "SHEM-MISHPACHA";
    my_yeshut_lakoach.SHEM_MISHPACHA = entities.get_field_val(params);

    params.xml_node_name = "MIN";
    my_yeshut_lakoach.MIN = entities.get_field_val(params);

   
    params.xml_node_name = "TAARICH-LEYDA";
    my_yeshut_lakoach.TAARICH_LEYDA = entities.get_date_field_val(params);

    params.xml_node_name = "PTIRA";
    my_yeshut_lakoach.PTIRA = entities.get_field_val(params);

    params.xml_node_name = "TAARICH-PTIRA";
    my_yeshut_lakoach.TAARICH_PTIRA = entities.get_date_field_val(params);

    params.xml_node_name = "MATZAV-MISHPACHTI";
    my_yeshut_lakoach.MATZAV_MISHPACHTI = entities.get_field_val(params);

    params.xml_node_name = "ERETZ";
    my_yeshut_lakoach.ERETZ = entities.get_field_val(params);

    params.xml_node_name = "SHEM-YESHUV";
    my_yeshut_lakoach.SHEM_YISHUV = entities.get_field_val(params);

    params.xml_node_name = "SEMEL-YISHUV";
    my_yeshut_lakoach.SEMEL_YESHUV = entities.get_field_val(params);
    
   
    params.xml_node_name = "SHEM-RECHOV";
    my_yeshut_lakoach.SHEM_RECHOV = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-BAIT";
    my_yeshut_lakoach.MISPAR_BAIT = entities.get_field_val(params);

    my_yeshut_lakoach.Street = my_yeshut_lakoach.SHEM_RECHOV + " " + my_yeshut_lakoach.MISPAR_BAIT;

    params.xml_node_name = "MISPAR-KNISA";
    my_yeshut_lakoach.MISPAR_KNISA = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-DIRA";
    my_yeshut_lakoach.MISPAR_DIRA = entities.get_field_val(params);

    params.xml_node_name = "MIKUD";
    my_yeshut_lakoach.MIKUD = entities.get_field_val(params);

    params.xml_node_name = "TA-DOAR";
    my_yeshut_lakoach.TA_DOAR = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-TELEPHONE-KAVI";
    my_yeshut_lakoach.MISPAR_TELEPHONE_KAVI = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-SHLUCHA";
    my_yeshut_lakoach.MISPAR_SHLUCHA = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-CELLULARI";
    my_yeshut_lakoach.MISPAR_CELLULARI = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-FAX";
    my_yeshut_lakoach.MISPAR_FAX = entities.get_field_val(params);

    params.xml_node_name = "E-MAIL";
    my_yeshut_lakoach.E_MAIL = entities.get_field_val(params);

    params.xml_node_name = "HEAROT";
    my_yeshut_lakoach.HEAROT = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-YELADIMT";
    my_yeshut_lakoach.MISPAR_YELADIM = entities.get_field_val(params);

    




    return my_yeshut_lakoach;
}


module.exports = {
    async extract_yeshut_lakoach_from_xml(params) {
        try {
            var data = get_my_yeshut_lakoach(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_yeshut_lakoach(params) {
        try{
            var yeshut_lakoach = get_my_yeshut_lakoach(params);
           // let sql = params.sql;
            let pool = params.connection
            let result = await pool.request()
           // let result = await dbConn.getPool().request()
             
              
                .input('MISPAR_ZIHUY_LAKOACH', sql.Int, yeshut_lakoach.MISPAR_ZIHUY_LAKOACH)
                .input('SHEM_PRATI', sql.NVarChar, yeshut_lakoach.SHEM_PRATI)
                .input('SHEM_MISHPACHA_KODEM', sql.NVarChar, yeshut_lakoach.SHEM_MISHPACHA_KODEM)
                .input('SHEM_MISHPACHA', sql.NVarChar, yeshut_lakoach.SHEM_MISHPACHA)
                .input('MIN', sql.Int, yeshut_lakoach.MIN)
                .input('TAARICH_LEYDA', sql.NVarChar, yeshut_lakoach.TAARICH_LEYDA)
                .input('PTIRA', sql.Int, yeshut_lakoach.PTIRA)
                .input('TAARICH_PTIRA', sql.NVarChar, yeshut_lakoach.TAARICH_PTIRA)
                .input('MATZAV_MISHPACHTI', sql.Int, yeshut_lakoach.MATZAV_MISHPACHTI)
                .input('ERETZ', sql.NVarChar, yeshut_lakoach.ERETZ)
                .input('SHEM_YISHUV', sql.NVarChar, yeshut_lakoach.SHEM_YISHUV)
                .input('SEMEL_YESHUV', sql.Int, yeshut_lakoach.SEMEL_YESHUV)
                .input('SHEM_RECHOV', sql.NVarChar, yeshut_lakoach.SHEM_RECHOV)
                .input('MISPAR_BAIT', sql.NVarChar, yeshut_lakoach.MISPAR_BAIT)
                .input('MISPAR_KNISA', sql.NVarChar, yeshut_lakoach.MISPAR_KNISA)
                .input('MISPAR_DIRA', sql.Int, yeshut_lakoach.MISPAR_DIRA)
                .input('MIKUD', sql.Int, yeshut_lakoach.MIKUD)
                .input('TA_DOAR', sql.Int, yeshut_lakoach.TA_DOAR)
                .input('MISPAR_TELEPHONE_KAVI', sql.NVarChar, yeshut_lakoach.MISPAR_TELEPHONE_KAVI)
                .input('MISPAR_SHLUCHA', sql.NVarChar, yeshut_lakoach.MISPAR_SHLUCHA)
                .input('MISPAR_CELLULARI', sql.NVarChar, yeshut_lakoach.MISPAR_CELLULARI)
                .input('MISPAR_FAX', sql.NVarChar, yeshut_lakoach.MISPAR_FAX)
                .input('E_MAIL', sql.NVarChar, yeshut_lakoach.E_MAIL)
                .input('HEAROT', sql.NVarChar, yeshut_lakoach.HEAROT)
                .input('MISPAR_YELADIM', sql.Int, yeshut_lakoach.MISPAR_YELADIM)

                .input('Street', sql.NVarChar, yeshut_lakoach.Street)

            //    .query(sql_insert_to_yeshut_lakoach);
                .query(sql_select_client);
          

            if (typeof result.recordset[0] == 'undefined') {
               
              let result1 = await pool.request()
                   .input('id', sql.Int, yeshut_lakoach.MISPAR_ZIHUY_LAKOACH)
                   .input('FirstName', sql.NVarChar, yeshut_lakoach.SHEM_PRATI)

                   .input('LastName', sql.NVarChar, yeshut_lakoach.SHEM_MISHPACHA)
                   .input('Sex', sql.Int, yeshut_lakoach.MIN)
                   .input('Birthday', sql.NVarChar, yeshut_lakoach.TAARICH_LEYDA)
                   .input('Street', sql.NVarChar, yeshut_lakoach.SHEM_RECHOV)
                   .input('City', sql.NVarChar, yeshut_lakoach.SHEM_YISHUV)

                  

                   .input('Micud', sql.Int, yeshut_lakoach.MIKUD)
                   .input('Post_box', sql.Int, yeshut_lakoach.TA_DOAR)



                   
                   .input('Status', sql.Int, 1)
                
                       .query(sql_insert_client_old);

        
            }

            return " yeshut_lakoach was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
          
    }

}