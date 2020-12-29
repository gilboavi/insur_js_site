//import { cache } from "../../Users/Bazooka/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/ejs";

// simulator_dal
var config = require("../config").config;
const sql = require('mssql');
const dbConn = require("./dbConn");

const sql_police_main2="Select * From DataForSimulator  Where (IdClient=@id_client) And (SUG_MUZAR!=4) ORDER BY MY_SUG_MUZAR "
const sql_hishtalmut="Select * From DataForSimulator  Where (IdClient=@id_client) And (SUG_MUZAR=4) ORDER BY MY_SUG_MUZAR "
const sql_police_list="Select * From DataForSimulator_report  Where (IdClient=@id_client) And (SUG_MUZAR!=4)  ORDER BY MY_SUG_MUZAR "
const sql_hishtalmut_list="Select * From DataForSimulator_report  Where (IdClient=@id_client) And (SUG_MUZAR=4)  ORDER BY MY_SUG_MUZAR "
const sql_yitrot_le_tekupa="Select * From CrossTabPerutYitraLeTkufa_new  Where (IdClient=@id_client)";
const sql_crosstab_pirtei_kisui_be_mutzar_new="Select * From CrossTabPirteiKisuiBeMutzar_new  Where (IdClient=@id_client)";
const  sql_kupa_list=" Select * From KupaDBWithParams Where (IdClient=@id_client) " ;
const sql_HeshbonOPolisa= 
" SELECT * FROM  HeshbonOPolisaDBWithParams WHERE IdClient=@id And SUG_KUPA !=3 ;"+
" SELECT * FROM  HeshbonOPolisaDBWithParams WHERE IdClient=@id And SUG_KUPA =3 ;" +
//" SELECT * FROM  CrossTabPerutHafrashotLePolisaDB WHERE IdClient=@id;" +
// " SELECT * FROM  CrossTabPerutMaslulelHashkaaDB WHERE IdClient=@id;"+
// " SELECT * FROM  PerutHafkadotMetchilatShanaDBWithParams WHERE IdClient=@id;"+
// " SELECT * FROM  PerutHafkadotMetchilatShanaDB_avg WHERE IdClient=@id;"+
" SELECT * FROM  PirteiKisuiBeMutzarDBWithParam WHERE IdClient=@id;";
// " SELECT DISTINCT "+
// " Serial, MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec, ALUT_KISUI_NECHUT, "+
// " ALUT_KISUI_PNS_SHRM_NECHE, SHEUR_KISUY_NECHUT, SACHAR_KOVEA_LE_NECHUT_VE_SHEERIM, "+
// " TAARICH_MASKORET_NECHUT_VE_SHEERIM, SACH_PENSIAT_NECHUT, ALUT_KISUY_SHEERIM, "+
// " SHIUR_KISUY_YATOM, KITZBAT_SHEERIM_LEALMAN_O_ALMANA, "+
// " KITZBAT_SHEERIM_LEYATOM, KITZBAT_SHEERIM_LEHORE_NITMACH, "+
// " SHIUR_KISUY_ALMAN_O_ALMANA, SHIUR_KISUY_HORE_NITMACH, GIL_PRISHA_LEPENSIYAT_ZIKNA, "+
// " SACH_PENSIYAT_ALMAN_O_ALMANA, MISPAR_HODSHEI_HAVERUT_BEKEREN_HAPENSIYA, "+
// " MENAT_PENSIA_TZVURA, AHUZ_PENSIYA_TZVURA, TAARICH_TCHILAT_HAVERUT, "+
// " TAARICH_ERECH_LANENTUNIM, HatavaBituchit, IdClient, TAARICH_NECHONUT, "+
// " HATAVA_BITUCHIT, SUG_VITOR_SHAERIM, TAARICH_VITOR_SHEERIM, TAARICH_CIUM_VITOR_SEERIM, "+
// " MISPAR_HODSHEI_HAVERUT_MITZ_BEKEREN_HAPENSIYA "+
// " FROM  PirteiKisuiBeMutzarDBWithParam WHERE IdClient=@id;";

//" SELECT * FROM  CrossTabPirteiKisuiBeMutzar WHERE IdClient=@id;";
                             
//const sql_stored_procedure= "PerutHafrashotLePolisa_procedure";
                            // "PerutMasluleiHashkaa_procedure; " +
                            // "PerutHafkadotMetchilatShana_procedur;" +
                            // "PerutHafkadotMetchilatShanaDB_avg_pro;";


module.exports = {
    async get_store_procedur(params){
        try{
            // let pool=params.pool;
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
            .input('idClient', sql.Int, params.client_id)
        
            .execute(params.sql_stored_procedure)
            return result.recordsets[0];
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
    },
    // for report
    async get_all_client_police_mislaka_by_client_id(params) {
        try{
            let result = await dbConn.getPool().request()
            .input('id_client', sql.Int, params.client_id)
            .query(sql_police_list)
            return result.recordsets[0];

        } catch(err){
            throw  { errmsg: err };
        }
    },
    // perut yitrot le tekupa report
    async get_crosstab_perut_yitra_le_tkufaDB_client_id(params){
        try{
            let result = await dbConn.getPool().request()
            .input('id_client', sql.Int, params.client_id)
            .query(sql_yitrot_le_tekupa)
            return result.recordsets[0];

        } catch(err){
            throw  { errmsg: err };
        }
    },

    async get_ricuz_police_by_client_id(params){
        try {
            let sql_ricuz=sql_police_list+";"+
                          sql_yitrot_le_tekupa+";" +
                          sql_crosstab_pirtei_kisui_be_mutzar_new+";" +
                          sql_hishtalmut_list+
                          sql_kupa_list;
            let result = await dbConn.getPool().request()
            .input('id_client', sql.Int, params.client_id)
            .query(sql_ricuz)

            
          
            let my_data={};
            my_data.police_list=result.recordsets[0];
            my_data.yitrot_le_tekupa_list=result.recordsets[1];
            my_data.crosstab_pirtei_kisui_be_mutzar_new_list=result.recordsets[2];
            my_data.hishtalmut_list = result.recordsets[3];
            my_data.kupa_list = result.recordsets[4];
            
            return my_data;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        }
    },

    async  get_kisui_be_mutzar_by_no_police_and_type_rec(params){
        try {
            let sql_ricuz=" Select * From PirteiKisuiBeMutzarDBWithParam Where (MyNoPolice=@no_police) "+
                           " And (TypeRec=@type_rec);";
            let schumei_bituah_yesodi=" Select * From   SchumeiBituahYesodiDBWithParam Where (MyNoPolice=@no_police) "+
            " And (TypeRec=@type_rec) ;";

                         
            let result = await dbConn.getPool().request()
            .input('no_police', sql.NVarChar, params.no_police)
            .input('type_rec', sql.Int, params.type_rec)
            .query(sql_ricuz+schumei_bituah_yesodi)

            let my_data={};
            my_data.pirtei_kisui_be_mutzar_list= result.recordsets[0];
            my_data.schumei_bituah_yesodi= result.recordsets[1];
           
           
            return my_data;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        }
    },

    async  get_kupa_by_client_id(params){
        try {
            let sql_kupa=" Select * From KupaDBWithParams Where (IdClient=@client_id) " ;
           
            let result = await dbConn.getPool().request()
            .input('client_id', sql.Int, params.client_id)
           
            .query(sql_kupa)

            let my_data={};
            my_data.kupa_list= result.recordsets[0];
            return my_data;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        }
    },
   
        
    // for excel report
    async get_data_for_simulator_by_client_id(params) {
        try{
            // let pool=await sql.connect(config.mssql.test_db);
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
            .input('id_client', sql.Int, params.client_id)
        
            .execute("all_xml_tables_by_id_client")

            let my_data={};
            my_data.clientList= result.recordsets[0];
            my_data.hotzaotBafoalLehodeshDivoach= result.recordsets[1];
            my_data.KisuiBKerenPensiaDBWithParams= result.recordsets[2];
            my_data.kupa= result.recordsets[3];
            my_data.perutHafkadotMetchilatShana= result.recordsets[4];
            my_data.perutHafkadotMetchilatShanaAvgM= result.recordsets[5];
            my_data.perutHafrashotLePolisa= result.recordsets[6];
            my_data.perutMasluleiHashkaa= result.recordsets[7];
            my_data.perutMivneDmeiNihul= result.recordsets[8];
            my_data.PerutHafkadaAchrona= result.recordsets[9];
            my_data.perutPirteiHafkadaAchrona= result.recordsets[10];
            my_data.PerutYitrotLesofShanaKodemeDBWithParams= result.recordsets[11];
            my_data.perutYitraLeTkufa= result.recordsets[12];
            my_data.perutYitraLeTkufa_after2000= result.recordsets[13];
            my_data.perutYitraLeTkufa_till2000= result.recordsets[14];
            my_data.perutYitraLeTkufa_crosTab= result.recordsets[15];
            my_data.crosstab_perut_yitrotDB= result.recordsets[16];
            my_data.perutYitrot= result.recordsets[17];
            my_data.pirteiHaasaka= result.recordsets[18];
            my_data.pirteiKisuiBeMutzar= result.recordsets[19];
            my_data.pirteiKisuiBeMutzar_procerur= result.recordsets[20];
            my_data.pirteiKisuiBeMutzarPrmia= result.recordsets[21];
            my_data.pirteiOved= result.recordsets[22];
            my_data.ricusPolice= result.recordsets[23];
            my_data.ricusKrenHishtalmut= result.recordsets[24];
           
            my_data.schumeiBituahYesodi= result.recordsets[25];
            my_data.yitraLefiGilPrisha= result.recordsets[26];
            my_data.crossTabYitraLeTkufa_after_2000= result.recordsets[27];
            my_data.perut_mivne_dmei_nihul_crosstab= result.recordsets[28];
            let sql_str="Select * From DataForSimulator  Where (IdClient=@id_client) And (SUG_MUZAR!=4) ORDER BY MY_SUG_MUZAR "
            
            //let result2 = await pool.request(sql_str)
            let result2 = await dbConn.getPool().request()
            .input('id_client', sql.Int, params.client_id)
            .query(sql_str);
            my_data.main2=result2.recordsets;

            sql_str="Select * From HeshbonOPolisa_hishtalmut  Where (IdClient=@id_client)"
            let result3 = await await dbConn.getPool().request()
            .input('id_client', sql.Int, params.client_id)
            .query(sql_str);

            my_data.hishtalmut=result3.recordsets;
            
            return my_data;

        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
    },

    async get_data_for_simulator_by_client_id_back(params) {
        let that=this;
        //  console.log(params.term);
       
       let my_params={};
      


        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('id', sql.Int, params.client_id)
                .query(sql_HeshbonOPolisa);

                // let result2 = await pool.request()
                // .input('idClient', sql.Int, params.client_id)
                // .execute(sql_stored_procedure)
                
            my_data={ } ;   

            my_data.heshbon_o_polisa_list = result.recordsets[0];
            my_data.hishtalmut_list = result.recordsets[1];
            my_data.PirteiKisuiBeMutzarDBWithParam_list=result.recordsets[2];

            let result_from_stored_procedur;
            //my_params.pool=pool;
            my_params.client_id=params.client_id;

            my_params.sql_stored_procedure="PerutHafrashotLePolisa_procedure";
            result_from_stored_procedur=await that.get_store_procedur(my_params);
            my_data.PerutHafrashotLePolisa_procedure_list=result_from_stored_procedur;
                                            
            my_params.sql_stored_procedure="PerutMasluleiHashkaa_procedure";
            result_from_stored_procedur=await that.get_store_procedur(my_params);
            my_data.PerutMasluleiHashkaa_procedure_list=result_from_stored_procedur;

            my_params.sql_stored_procedure="PerutHafkadotMetchilatShana_procedur";
            result_from_stored_procedur=await that.get_store_procedur(my_params);
            my_data.PerutHafkadotMetchilatShana_procedur_list=result_from_stored_procedur;

            my_params.sql_stored_procedure="PerutHafkadotMetchilatShanaDB_avg_pro";
            result_from_stored_procedur=await that.get_store_procedur(my_params);
            my_data.PerutHafkadotMetchilatShanaDB_avg_pro_list=result_from_stored_procedur;

            my_params.sql_stored_procedure="CrossTabPirteiKisuiBeMutzarSP";
            result_from_stored_procedur=await that.get_store_procedur(my_params);
            my_data.CrossTabPirteiKisuiBeMutzarSP_list=result_from_stored_procedur;
        //
            my_params.sql_stored_procedure="CrossTabPirteiKisuiBeMutzarPrmiaSP";
            result_from_stored_procedur=await that.get_store_procedur(my_params);
            my_data.CrossTabPirteiKisuiBeMutzarPrmiaSP_list=result_from_stored_procedur;

            
            
            // my_data.PerutMaslulelHashkaaDB_list=result2.recordsets[0],
            // my_data.PerutHafkadotMetchilatShanaDB_list=result2.recordsets[0],
            // my_data.PerutHafkadotMetchilatShanaDB_avg_list=result2.recordsets[0],
           

            return my_data;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
    }

}