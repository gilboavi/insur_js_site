
module.exports = {

async find_true_false (my_bold){
    if(my_bold){
        if(my_bold=='true'){
            my_bold=1;
        } else if(my_bold=='false'){
            my_bold=0;
        }
        }
    else{
         my_bold=0; 
    }
      return my_bold;
}
}