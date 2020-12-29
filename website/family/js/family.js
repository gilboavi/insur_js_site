

$(document).ready(function () {

     // auto complite function
     var my_data;
     var s_options = {
         minimumInputLength: 2,
         allowClear: false,
         formatSelection: function (item) {
             return '<div class="select2-tag-cust" title="' + item.text + '">' + item.text + '</div>';
         },
         query: function (query) {
             get_client_by_term(query.term).done(function (dataObj) {
                 //  console.log(dataObj);
                 my_data = dataObj;
                 $.each(dataObj, function () {
                     this.text = ([this.LastName, this.FirstName]).join(" ");
                     this.id = this.Serial;
                 });
                 query.callback({
                     results: dataObj
                 });
             });
 
         }
     };
     
     $("#typehead").select2(s_options).on('change', function (e) {
       
         var vvv = my_data.filter(function (my_data) {
             return my_data.id == e.val
         });
         $("#client_serial").val(e.val);
         on_select_client(e.val);
       
 
     });
})