const parseTestLogic = require("./parseTestLogic");



process.on('message', (fileData) => {
    try {
        fileData.buffer = new Buffer(fileData.buffer);
        var res = parseTestLogic.parseXML(fileData)
        process.send({ result: res});
    } catch (e) {
        process.send({ error: e });
    }

    process.exit();
    
});



