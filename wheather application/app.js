const wheather = require('./wheather');

const locations = process.argv.slice(2).join("_").replace(' ','_');
wheather.get(locations);