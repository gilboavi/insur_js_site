var ejs = require('ejs');
ejs.delimiter = '$';

module.exports = {
    setRoutes(app) {
        try {
            app.set('view engine', 'ejs');

            var pages = [
               // C:\insur_js\website/conversation/js/conversation_hierarchy_grid.js
              // C:\insur_js\website/client/js/proposal_life_grid.js
                { path: "/",  page: "home", title: "Home",
                   js: ["/home/js/home.js", "/conversation/js/conversation_hierarchy_grid.js","/client/js/proposal_life_grid.js" ] },//home page
                { page: "maintaining", title: "maintaining", js: ["/maintaining/js/maintaining.js"  ]  },
                { page: "conversation", title: "Conversation", css: ["/client/css/client.css"], js: ["/js/typeahead.bundle.js", "/client/js/client.js"] },
              //  { page: "testmore_bak", title: "Test More", css: ["/client/css/client.css"], js: ["/js/typeahead.bundle.js" ] },
                { page: "client", title: "client", css: ["/client/css/client.css", "/css/select2.css"],
                    js: ["/js/select2.js", "/client/js/client.js", "/conversation/js/conversation_hierarchy_grid.js", "/client/js/xml_headers.js"]
                },                                                                 
              //  { page: "life_police", title: "life_police" },
               // { page: "autocomplete1", title: "autocomplete", js: ["./js/test.js"] },
             //  { page: "home1", title: "home1", css: ["../test/css/test.css"], js: ["./js/test.js"] },
                { page: "filetest", title: "filetest", css: [""], js: ["./filetest/js/filetest.js"] },
                { page: "login", title: "Login", css: ["/login/css/login.css"], js: []    },
                { page: "insurance", title: "insurance" },
                { page: "insurance/aboard", title: "insurance" }
              //  { page: "xmltest", title: "xmltest", css: [""], js: ["./xmltest/js/xmltest.js"] }
              
            ];
            
            pages.forEach(function (pageData) {
                if (pageData.layout == null)
                    pageData.layout = "layouts/default";

                if (pageData.path == null)
                    pageData.path = '/' + pageData.page;

                app.get(pageData.path, function (req, res) {
                    res.render(pageData.layout, pageData);
                });

            });

        } catch (e) {
            throw(e);
        }
    }

}