const et = require('./elementtree');
const path = require('path');
const fs = require('fs');

module.exports = function (context) {
    var projectRoot = context.opts.cordova.project ? context.opts.cordova.project.root : context.opts.projectRoot;
    
    var manifestPath = path.join(projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
    var manifestFile = fs.readFileSync(manifestPath).toString();
    var etreeManifest = et.parse(manifestFile);

    var dataTags = etreeManifest.findall('./application');
    dataTags[0].set("android:requestLegacyExternalStorage", "true");

    var resultXmlManifest = etreeManifest.write();
    fs.writeFileSync(manifestPath, resultXmlManifest);

};
