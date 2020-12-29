var Service = require('node-windows').Service;
// dont touch
// Create a new service object
var svc = new Service({
  name:'Insur NodeJs Async Express Service',
  description: 'Insur on nodeJs Service',
  script: 'C:\\insur_js\\bin\\run.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ],
  env: [
  {
    name: "PORT",
    value: 4000 // use 4000
  }]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  console.log('Install complete.');
  console.log('The service exists: ',svc.exists);
  svc.start();
});

//svc.install();

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
    console.log('Uninstall complete.');
    console.log('The service exists: ',svc.exists);
  });
  
  // Uninstall the service.
  svc.uninstall();
