(function(React, module, undefined) {
  var Patients = require('./Patients.jsx'),
      PatientForm = require('./PatientForm.jsx'),
      PatientAlert = require('./PatientAlert.jsx');
  
  module.exports = React.createClass({
    render: function() {
      var alert;
      if (!this.props.patients || this.props.patients.length === 0) {
        alert = <PatientAlert />;
      }
      return (
        <div className="container">
          <div className="page-header">
            <h1>Kathy <small>Kathetervisitenprotokoll</small></h1>
          </div>
          
          {alert}
          <Patients data={this.props.patients} />
          <label>Neuer Patient</label>
          <PatientForm />
        </div>
      );
    }
  });
}(React, module));