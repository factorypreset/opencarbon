require.config({
  baseUrl: ".",
  urlArgs: 'cb=' + Math.random(),
  paths: {
    jquery: 'lib/jquery',
    'jquery.flot': 'lib/flot/jquery.flot',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    text: 'lib/text',
    json: 'lib/json'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'jquery.flot': {
      deps: ['jquery']
    }
  }
});
