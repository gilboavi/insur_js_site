//simulator_api.js
var simulator_bl = require('../bll/simulator_bl');
var my_excel=require('../bll/excel_office_bl');



module.exports = {
    authFree:true,

    async get_simulator(params) {
        try {
            let bll_result = await simulator_bl.get_simulator(params)
            let result = bll_result;

            return result;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_all_client_police_mislaka_by_client_id(params) {
        try{
           
            let my_data = await simulator_bl.get_all_client_police_mislaka_by_client_id(params);

            return my_data;

        } catch(err){
            throw  { errmsg: err };
        }
    },

   

    async get_data_for_simulator_by_client_id(params) {
        try {
            let bll_result = await simulator_bl.get_data_for_simulator_by_client_id(params)
            let result = bll_result;

            return  result;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        }
    },

    async get_crosstab_perut_yitra_le_tkufaDB_client_id(params){
        try {
            let bll_result = await simulator_bl.get_crosstab_perut_yitra_le_tkufaDB_client_id(params);
            let result = bll_result;

            return  result;

        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        }

    },

    async get_ricuz_police_by_client_id(params){
        try {
            let bll_result = await simulator_bl.get_ricuz_police_by_client_id(params);
            let result = bll_result;

            return  result;

        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        }
    },

    async get_kisui_be_mutzar_by_no_police_and_type_rec(params){
        try {
            let bll_result = await simulator_bl.get_kisui_be_mutzar_by_no_police_and_type_rec(params);
            let result = bll_result;

            return  result;

        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        }
    },

    async  get_kupa_by_client_id(params){
        try {
            let bll_result = await simulator_bl.get_kupa_by_client_id(params);
            let result = bll_result;

            return  result;

        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        } 
    },

    async get_data_for_simulator_by_client_id2(params) {
        try {
            let bll_result = await my_excel.get_data_for_simulator_by_client_id(params)
            let result = bll_result;

            return result;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        }
    }


}
