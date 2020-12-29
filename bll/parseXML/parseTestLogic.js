var DOMParser = require('xmldom').DOMParser;

module.exports = {
    parseXML(fileData) {
        try {
            var doc = new DOMParser().parseFromString(fileData.buffer.toString("utf8"), 'text/xml');
            var root = doc.getElementsByTagName("test")[0];
            var children = root.getElementsByTagName("child");
            var res = [];
            for (i = 0; i < children.$$length; i++) {
                child = children[i];
                res.push(child.getAttribute("name"));
                var grandchildren = child.getElementsByTagName("grandchild");
                for (j = 0; j < grandchildren.$$length; j++) {
                    res.push(grandchildren[j].getAttribute("name"));
                    res.push(grandchildren[j].childNodes[0].data);
                }
            }
            return res;
        } catch (err) {
            throw err;
        }
    }

};


// child process: https://www.youtube.com/watch?v=9o8B3L0-d9c
        /*
<test>
	<child name= "balagan">
		<grandchild name="balaganchick">
			content1
		</grandchild>
	</child>
	<child name= "tembel">
		<grandchild name="tembelchick">
			content1
		</grandchild>
	</child>
</test>
        */