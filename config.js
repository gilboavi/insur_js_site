

exports.config = {
    mssql: {
        test_db: {
            "user": 'insur',
            "password": 'Aa123456',
            "server": 'localhost',
            "database": 'InsurDB',
            "port": '1433',
            "dialect": "mssql",
            "dialectOptions": {
                "instanceName": "MSSQLSERVER"
            },
            "pool": {
                "max": 10,
                "min": 0,
                "idleTimeoutMillis": 30000
            }
        }
    },
    xml: {
        parseXmlInChildProc: false
    },
    fileFolder: "C:\\InsurDoc\\DocSave",
    excelFolder:"C:\\insur_js\\excel_files",
    cookiedomain: "localhost"
};