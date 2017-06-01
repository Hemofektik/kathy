(function(React, module, undefined) {
  var Patient = require('./Patient.jsx');
  
  module.exports = React.createClass({
    render: function() {
      var stars = [];
      return (
        <table className="table table-striped table-condensed">
          <thead>
            <tr>
              <th>Patient</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(function(patient) {
              return <Patient key={patient.id} data={patient}/>;
            })}
          </tbody>
        </table>
      );
    }
  });
}(React, module));