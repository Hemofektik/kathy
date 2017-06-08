(function(React, module, undefined) {
  var PatientForm = require('./PatientForm.jsx');
  var PatientSample = require('./PatientSample.jsx');
  module.exports = React.createClass({
    render: function() {
      return (
        <div>
          <PatientForm initial_patient={this.props.data} close_callback={this.props.close_callback} />
          <hr/>
          <div className="col-sm-5">
            <label>Bedingungen / Besonderheiten</label>
              <textarea rows="3" className="form-control" name="name" value={this.props.data.conditions}
                      placeholder="z.b. komplikationslose Anlage" onChange={this.handleNewConditions} >
              </textarea>
            </div>
            <div className="col-sm-5">
              
              <div className="form-group">
                <label className="col-lg-3">Höhe EDK</label>
                <div className="col-lg-9">
                  <input type="text" className="form-control" name="edk_height" value={this.props.data.edk_height}
                      placeholder="z.b. THB" onChange={this.handleNewEDKHeight} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3">LOR</label>
                <div className="col-lg-9">
                  <input type="text" className="form-control" name="lor" value={this.props.data.edk_height}
                      placeholder="z.b. 65 mm" onChange={this.handleNewEDKHeight} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-6">Einlagetiefe. inkl. Tunnel:</label>
                <div className="col-lg-6">
                  <input type="text" className="form-control" name="intrusion_depth" value={this.props.data.intrusion_depth}
                      placeholder="z.b. 130 mm" onChange={this.handleNewIntrusionDepth} />
                </div>
              </div>
            </div>
            <hr/>
            <table className="table table-striped table-condensed">
            <tbody>
              {this.props.data.samples.map(function(sample) {
                return <PatientSample key={sample.id} data={sample}/>;
              })}
            </tbody>
          </table>
        </div>
      );
    },
    getInitialState: function() {
      return { 
        show_info: false 
      };
    }
  });
}(React, module));