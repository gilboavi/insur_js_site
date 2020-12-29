

// simulator_bl.js

var simulator_dal = require('../dal/simulator_dal');
let xlsx_populate = require("xlsx-populate");
const path = require('path');

const config = require("../config").config;

const stream = require('stream');




// used by  get_my_excel
// fills an excel sheet with data
function fill_sheet(params) {
    try {
        var tmp_workbook = params.work_book;
        if (params.my_list) {
            params.my_list.forEach(function (my_row, index1) {

                let i = 3;
                let keys = Object.values(my_row);
                keys.forEach(function (key) {
                    tmp_workbook.sheet(params.sheet_name).row(index1 + 6).cell(i).value(key);

                    i = i + 1;

                });
            });
        }
        return tmp_workbook;
    } catch (err) {
        // ... error checks 
        return params.work_book;
    }
}


module.exports = {



    
    
    // for report 
    async get_all_client_police_mislaka_by_client_id(params) {
        try{
            let police_list=[];
            let hishtalmut_list=[];
            let my_data={};
            let db_result = await simulator_dal.get_all_client_police_mislaka_by_client_id(params);
            for (var i = 0, len = db_result.length; i < len; i++) {
                db_result[i]. SHEM_TOCHNIT= db_result[i]. SHEM_TOCHNIT;
                if( db_result[i].SUG_MUZAR!=4){
                    police_list.push( db_result[i]);
                } else if(db_result[i].SUG_MUZAR==4){
                    hishtalmut_list.push( db_result[i]);
                }
               
            }
            my_data.police_list=police_list;
            my_data.hishtalmut_list=hishtalmut_list;

            return my_data;

        } catch(err){
            throw  { errmsg: err };
        }
    },

    async get_crosstab_perut_yitra_le_tkufaDB_client_id(params){
        try {
            let bll_result = await simulator_dal.get_crosstab_perut_yitra_le_tkufaDB_client_id(params);
            let result = bll_result;

            return  result;

        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        }

    },

    async get_ricuz_police_by_client_id(params){
        try {
            let bll_result = await simulator_dal.get_ricuz_police_by_client_id(params);
            let result = bll_result;

            return  result;

        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        }
    },

    async get_kisui_be_mutzar_by_no_police_and_type_rec(params){
        try {
            let bll_result = await simulator_dal.get_kisui_be_mutzar_by_no_police_and_type_rec(params);
            let result = bll_result;

            return  result;

        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        }
    },

    async  get_kupa_by_client_id(params){
        try {
            let bll_result = await simulator_dal.get_kupa_by_client_id(params);
            let result = bll_result;

            return  result;

        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        } 
    },

    // called by get_data_for_simulator_by_client_id
    async   get_my_excel(my_data) {

        let that = this;
        let file_name = 'MySimulatorNew.xlsx';
        filename = path.join(config.excelFolder, file_name);
        let workbook = await xlsx_populate.fromFileAsync(filename);
       
        var params = {

        };



        params.work_book = workbook;
        params.sheet_name = "ClientList";
        params.my_list = my_data.clientList;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "HotzaotBafoalLehodeshDivoach";
        params.my_list = my_data.hotzaotBafoalLehodeshDivoach;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "KisuiBKerenPensiaDBWithParams";
        params.my_list = my_data.KisuiBKerenPensiaDBWithParams;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "Kupa";
        params.my_list = my_data.kupa;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutHafkadotMetchilatShana";
        params.my_list = my_data.perutHafkadotMetchilatShana;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutHafkadotMetchilatShanaAvgM";
        params.my_list = my_data.perutHafkadotMetchilatShanaAvgM;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutHafrashotLePolisa";
        params.my_list = my_data.perutHafrashotLePolisa;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutMasluleiHashkaa";
        params.my_list = my_data.perutMasluleiHashkaa;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutMivneDmeiNihul";
        params.my_list = my_data.perutMivneDmeiNihul;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutHafkadaAchrona";
        params.my_list = my_data.PerutHafkadaAchrona;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutPirteiHafkadaAchrona";
        params.my_list = my_data.perutPirteiHafkadaAchrona;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutYitrotLesofShanaKodemeDBWithParams";
        params.my_list = my_data.PerutYitrotLesofShanaKodemeDBWithParams;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutYitraLeTkufa";
        params.my_list = my_data.perutYitraLeTkufa;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutYitraLeTkufa_after2000";
        params.my_list = my_data.perutYitraLeTkufa_after2000;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutYitraLeTkufa_till2000";
        params.my_list = my_data.perutYitraLeTkufa_till2000;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutYitraLeTkufa_crosTab";
        params.my_list = my_data.perutYitraLeTkufa_crosTab;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "CrosstabPerutYitrotDB";
        params.my_list = my_data.crosstab_perut_yitrotDB;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutYitrot";
        params.my_list = my_data.perutYitrot;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PirteiHaasaka";
        params.my_list = my_data.pirteiHaasaka;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PirteiKisuiBeMutzar";
        params.my_list = my_data.pirteiKisuiBeMutzar;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PirteiKisuiBeMutzar_procerur";
        params.my_list = my_data.pirteiKisuiBeMutzar_procerur;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PirteiKisuiBeMutzarPrmia";
        params.my_list = my_data.pirteiKisuiBeMutzarPrmia;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PirteiOved";
        params.my_list = my_data.pirteiOved;
        workbook = fill_sheet(params);

        // params.work_book = workbook;
        // params.sheet_name = "RicusKrenHishtalmut";
        // params.my_list = my_data.ricusKrenHishtalmut;
        // workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "RicusPolice";
        params.my_list = my_data.ricusPolice;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "SchumeiBituahYesodi";
        params.my_list = my_data.schumeiBituahYesodi;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "YitraLefiGilPrisha";
        params.my_list = my_data.yitraLefiGilPrisha;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "CrossTabYitraLeTkufa_after_2000";
        params.my_list = my_data.crossTabYitraLeTkufa_after_2000;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutMivneDmeiNihul_crosstab";
        params.my_list = my_data.perut_mivne_dmei_nihul_crosstab;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "main2";
        params.my_list = my_data.main2[0];
        workbook = fill_sheet(params);

       
        params.work_book = workbook;
        params.sheet_name = "RicusKrenHishtalmut";
        params.my_list = my_data.hishtalmut[0];
        workbook = fill_sheet(params);

        
       // workbook.toFileAsync("./out.xlsx");
        
        return workbook;

        // let buffer = new Buffer();
      //  let buffer = await workbook.outputAsync();
      //  return buffer;
        //  return workbook.outputAsync(Buffer);
        // workbook.outputAsync().then( function (data){
        //     return data;
        // });


    },

    
   

    // for xcel
    async get_data_for_simulator_by_client_id(params) {
        let that = this;
        try {
            let db_result = await simulator_dal.get_data_for_simulator_by_client_id(params)
            let result = db_result;
            let x = await that.get_my_excel(result);

 
            let buffer = await x.outputAsync("nodebuffer");
            responseObj = {
                IsFile: true,
                Filename: "test.xlsx",
                Mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                Buffer: buffer
            };
         
            return responseObj;

        } catch (err) {
            //  console.log(err);
            throw { hasError: 1, errmsg: err };
        }




    }

   
    

   
   
   




}