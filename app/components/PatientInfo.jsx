(function(React, module, undefined) {
  var PatientForm = require('./PatientForm.jsx');
  module.exports = React.createClass({
    render: function() {
      return (
        <div>
          <PatientForm initial_patient={this.props.data} close_callback={this.props.close_callback} />
        </div>
      );
    }
  });
}(React, module));