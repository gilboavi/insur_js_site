// zihui_kisui


var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_zihui_kisui = "INSERT INTO [InsurDB].[dbo].[ZihuiKisuiDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +

   " ,MISPAR_KISUI_BE_YATZRAN    , SHEM_KISUI_YATZRAN    , SUG_KISUI_ETZEL_YATZRAN "+
   " , MISPAR_POLISA_O_HESHBON_NEGDI) "+
    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec  " +
    " ,@MISPAR_KISUI_BE_YATZRAN    , @SHEM_KISUI_YATZRAN    , @SUG_KISUI_ETZEL_YATZRAN " +
    " , @MISPAR_POLISA_O_HESHBON_NEGDI) "

    ;

function get_my_zihui_kisui(params) {

    var zihui_kisui = {};

    zihui_kisui.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    zihui_kisui.MyNoPolice = params.my_no_police;
    zihui_kisui.TypeRec = params.type_rec;
  
    //    zihui_kisui .IdClient = params.id_client;
   

    params.xml_node_name = "MISPAR-KISUI-BE-YATZRAN";
    zihui_kisui.MISPAR_KISUI_BE_YATZRAN = entities.get_field_val(params);
    params.xml_node_name = "SHEM-KISUI-YATZRAN";
    zihui_kisui.SHEM_KISUI_YATZRAN = entities.get_field_val(params);
    params.xml_node_name = "SUG-KISUI-ETZEL-YATZRAN";
    zihui_kisui.SUG_KISUI_ETZEL_YATZRAN = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-POLISA-O-HESHBON-NEGDI";
    zihui_kisui.MISPAR_POLISA_O_HESHBON_NEGDI = entities.get_field_val(params);

    

    return zihui_kisui;
}

function get_my_zihui_kisui_object(params) {
    
        var zihui_kisui = {};
    
        zihui_kisui.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
        zihui_kisui.MyNoPolice = params.my_no_police;
        zihui_kisui.TypeRec = params.type_rec;
      
        //    zihui_kisui .IdClient = params.id_client;
       
    
        params.xml_node_name = "MISPAR-KISUI-BE-YATZRAN";
        zihui_kisui.MISPAR_KISUI_BE_YATZRAN = entities.get_field_val(params);
        params.xml_node_name = "SHEM-KISUI-YATZRAN";
        zihui_kisui.SHEM_KISUI_YATZRAN = entities.get_field_val(params);
        params.xml_node_name = "SUG-KISUI-ETZEL-YATZRAN";
        zihui_kisui.SUG_KISUI_ETZEL_YATZRAN = entities.get_field_val(params);
    
        params.xml_node_name = "MISPAR-POLISA-O-HESHBON-NEGDI";
        zihui_kisui.MISPAR_POLISA_O_HESHBON_NEGDI = entities.get_field_val(params);
    
        
    
        return zihui_kisui;
}


module.exports = {
    async extract_zihui_kisui_from_xml(params) {
        try {
            var data = get_my_zihui_kisui_object(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_zihui_kisui(params) {
        try {
            var zihui_kisui = get_my_zihui_kisui(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, zihui_kisui.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, zihui_kisui.MyNoPolice)
                .input('TypeRec', sql.Int, zihui_kisui.TypeRec)
                .input('MoneYitra', sql.Int, zihui_kisui.MoneYitra)

                .input('MISPAR_KISUI_BE_YATZRAN', sql.NVarChar, zihui_kisui.MISPAR_KISUI_BE_YATZRAN)
                .input('SHEM_KISUI_YATZRAN', sql.NVarChar, zihui_kisui.SHEM_KISUI_YATZRAN)
                .input('SUG_KISUI_ETZEL_YATZRAN', sql.Int, zihui_kisui.SUG_KISUI_ETZEL_YATZRAN)
                .input('MISPAR_POLISA_O_HESHBON_NEGDI', sql.NVarChar, zihui_kisui.MISPAR_POLISA_O_HESHBON_NEGDI)

             



                .query(sql_insert_zihui_kisui);


            return " zihui_kisui  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}


