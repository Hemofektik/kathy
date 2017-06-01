(function(React, _) {
  var App = require('./components/App.jsx'),
      Patient = require('./models/PatientModel.js');
  
  _.mixin(_.string.exports());
  
  var render = function() {
    React.render(React.createElement(App, { patients: Patient.query() }), document.body);
  };
  render();
  Patient.subscribe(render);
}(React, _));
