var fs = require('fs');

var officegen = require('officegen');

var xlsx = officegen ( 'xlsx' );

xlsx.on ( 'finalize', function ( written ) {
			console.log ( 'Finish to create an Excel file.\nTotal bytes created: ' + written + '\n' );
		});

xlsx.on ( 'error', function ( err ) {
			console.log ( err );
		});

// var filename='C:\\insur_js\\excel_files\\MySimulatorNew.xlsx';
// xlsx.openFile(filename);
               
sheet = xlsx.makeNewSheet ();
sheet.name = 'Excel Test';

// The direct option - two-dimensional array:
sheet.data[0] = [];
sheet.data[0][0] = 11;
sheet.data[1] = [];
sheet.data[1][3] = 'abc and beautiful';
sheet.data[1][4] = 'More';
sheet.data[1][5] = 'Text';
sheet.data[1][6] = 'Here';
sheet.data[2] = [];
sheet.data[2][5] = 'abc';
sheet.data[2][6] = 900;
sheet.data[6] = [];
sheet.data[6][2] = 1972;

// Using setCell:
sheet.setCell ( 'E7', 340 );
sheet.setCell ( 'I1', -3 );
sheet.setCell ( 'I2', 31.12 );
sheet.setCell ( 'G102', 'Hello World!' );

var out = fs.createWriteStream ( 'excel_files/MySimulatorNew33.xlsx' );

out.on ( 'error', function ( err ) {
	console.log ( err );
});

module.exports = {
    async get_data_for_simulator_by_client_id(params) {
        try {
            return  xlsx.generate ( out );
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err };
        }
     
    }
}

