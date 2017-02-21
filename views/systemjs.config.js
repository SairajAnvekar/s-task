/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'views/dist', // 'dist',
    '@angular':                   'https://unpkg.com/@angular',
	 //'@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'https://unpkg.com/rxjs@5.0.1',
    // ng2-bootstrap
	  //'rxjs':                       'node_modules/rxjs',
    'moment': 'node_modules/moment',
    'ng2-bootstrap':              'node_modules/ng2-bootstrap',
    'ng2-datetime-picker': 'node_modules/ng2-datetime-picker/dist',
    'dragula': 'node_modules/dragula',
    'ng2-dragula': 'node_modules/ng2-dragula',
    'contra': 'node_modules/contra',
		'atoa': 'node_modules/atoa',
		'ticky': 'node_modules/ticky',
		'crossvent': 'node_modules/crossvent/src',
		'custom-event': 'node_modules/custom-event',
    
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    // ng2-bootstrap
    'ng2-bootstrap':              { format: 'cjs', main: 'bundles/ng2-bootstrap.umd.js', defaultExtension: 'js' },
    'moment':                     { main: 'moment.js', defaultExtension: 'js' },
    'ng2-datetime-picker': {main: 'ng2-datetime-picker.umd.js', defaultExtension: 'js'},
    'dragula': {main: 'dragula.js', defaultExtension: 'js'},
    'ng2-dragula': {defaultExtension: 'js'},
    'contra': {main: 'contra.js', defaultExtension: 'js'},
    'atoa': {main: 'atoa.js', defaultExtension: 'js'},
    'ticky': {main: 'ticky.js', defaultExtension: 'js'},
    'crossvent': {main: 'crossvent.js', defaultExtension: 'js'},
    'custom-event': {main: 'index.js', defaultExtension: 'js'},
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  console.log(packages);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
