(function(React, _) {

  var Patient = require('../models/PatientModel.js');
  var PatientSample = require('./PatientSample.jsx');

  module.exports = React.createClass({
    isDisabled:  function() {
      return _.isBlank(this.state.name) || _.isBlank(this.state.room);
    },
    handleNewName: function(event) {
      this.setState(_.extend(this.state, {
        name: event.target.value
      }));
    },
    handleNewStation: function(event) {
      this.setState(_.extend(this.state, {
        station: event.target.value
      }));
    },
    handleNewKathType: function(event) {
      this.setState(_.extend(this.state, {
        kath_type: event.target.value
      }));
    },
    handleNewRoom: function(event) {
      this.setState(_.extend(this.state, {
        room: event.target.value
      }));
    },
    handleNewInitDate: function(event) {
      var old_date = new Date(this.state.init_date);
      var new_date = new Date(event.target.value);
      new_date.setHours(old_date.getHours());
      new_date.setMinutes(old_date.getMinutes());
      var new_init_date = new_date.toJSON();
      this.setState(_.extend(this.state, {
        init_date: new_init_date
      }));
    },
    addPatient: function(event) {
      this.state.samples = this.samples; 
      var patient = new Patient(this.state);
      patient.save();

      if(this.props.initial_patient === undefined) {
        this.setState(this.getInitialState());
      }

      event.preventDefault();
      event.stopPropagation();
    },
    close: function(event) {
      this.setState(this.getInitialState());

      if(this.props.close_callback) {
        this.props.close_callback();
      }
    },
    render: function() {

      this.samples = [];
      
      if(this.props.initial_patient !== undefined) {
        this.samples = this.state.samples.slice(); // copy array

        if(this.samples.length == 0)
        {
          var default_patient = new Patient({init_date: new Date().toJSON()});
          this.samples.push(default_patient.samples[0]);
        }
        else if (!_.isBlank(this.samples[this.samples.length - 1].psn))
        {
          var new_init_date = new Date(this.samples[this.samples.length - 1].date_time);
          new_init_date.setHours(new_init_date.getHours() + 24, 0, 0); // goto next day automatically
          var default_patient = new Patient({init_date: new_init_date.toJSON()});
          this.samples.push(default_patient.samples[0]);
        }
      }


      var disable_save = this.isDisabled();
      var disable_date = (this.props.initial_patient !== undefined);
      var show_delete_btn = (this.props.initial_patient !== undefined);
      var show_patient_info = (this.props.initial_patient !== undefined);
      var init_date = this.state.init_date.slice(0,10);
      return (
        <form role="form" onSubmit={this.addPatient}>
          <div className="row">
            <div className="col-sm-3">
              <label className="sr-only" htmlFor="name">Name</label>
              <input type="text" className="form-control" name="name" value={this.state.name}
                placeholder="Name, Vorname" autofocus onChange={this.handleNewName} />
            </div>
            <div className="col-sm-2">
              <label className="sr-only" htmlFor="init_date">Anlage</label>
              <input type="date" className="form-control" name="init_date" value={init_date}
                 onChange={this.handleNewInitDate} disabled={disable_date}/>
            </div>
            <div className="col-sm-2">
              <label className="sr-only" htmlFor="station">Station</label>
              <select size="1" className="form-control" name="station" value={this.state.station}
                onChange={this.handleNewStation}>
                <option>Achi</option>
                <option>Uro</option>
                <option>Gyn</option>
                <option>IT S1</option>
                <option>IT S2</option>
              </select>
            </div>
            <div className="col-sm-2">
              <label className="sr-only" htmlFor="kath_type">Kath.art</label>
              <select size="1" className="form-control" name="kath_type" value={this.state.kath_type}
                 onChange={this.handleNewKathType}>
                <option>PDK</option>
                <option>UKG</option>
              </select>
            </div>
            <div className="col-sm-1">
              <label className="sr-only" htmlFor="room">Patient</label>
              <input type="text" className="form-control" name="room" value={this.state.room}
                placeholder="Room" onChange={this.handleNewRoom} />
            </div>
            <div className="col-sm-2">
            
            {show_delete_btn ?
            <button type="button" className="btn btn-danger pull-left" onClick={this.deletePatient}>
              <i className="fa fa-trash-o"></i>
            </button> : null
            }
            <button type="button" className="btn pull-right" onClick={this.close}  ><i className="fa fa-close"></i></button>
            
            <button type="submit" className="btn pull-right" disabled={disable_save}> <i className="fa fa-save"></i></button>
            </div>
          </div>

          {show_patient_info ?
          <div>
            <hr/>

            <div className="col-sm-5">
              <label>Bedingungen / Besonderheiten</label>
                <textarea rows="3" className="form-control" name="name" value={this.state.conditions}
                        placeholder="z.b. komplikationslose Anlage" onChange={this.handleNewConditions} >
                </textarea>
              </div>
              <div className="col-sm-5">
                <div className="form-group">
                  <label className="col-lg-3">Höhe EDK</label>
                  <div className="col-lg-9">
                    <input type="text" className="form-control" name="edk_height" value={this.state.edk_height}
                        placeholder="z.b. THB" onChange={this.handleNewEDKHeight} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-lg-8">LOR (mm)</label>
                  <div className="col-lg-4">
                    <input type="text" className="form-control" name="lor" value={this.state.edk_height}
                        placeholder="z.b. 65" onChange={this.handleNewEDKHeight} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-lg-8">Einlagetiefe. inkl. Tunnel (mm)</label>
                  <div className="col-lg-4">
                    <input type="text" className="form-control" name="intrusion_depth" value={this.state.intrusion_depth}
                        placeholder="z.b. 130" onChange={this.handleNewIntrusionDepth} />
                  </div>
                </div>
              </div>
              <hr/>
              <table className="table table-striped table-condensed">
              <thead>
                <tr>                
                  <td>
                    <div className="col-sm-2">
                    <label>Datum Uhrzeit</label>
                    </div>
                    <div className="col-sm-2">
                      <label>PSN</label>
                    </div>
                    <div className="col-sm-2">
                      <label>Vorgang</label>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {this.samples.map(function(sample) {
                  return <PatientSample key={sample.date_time} data={sample}/>;
                })}
              </tbody>
            </table>
          </div>
           : null
          }
        </form>
      );
    },
    deletePatient: function() {
      this.props.initial_patient.delete();
    },
    getInitialState: function() {
      if(this.props.initial_patient !== undefined)
      {
        return JSON.parse(JSON.stringify(this.props.initial_patient)); // create deep copy
      }

      return { 
        id: undefined,
        name: "",
        station: "Achi",
        room: "",
        init_date: new Date().toJSON(),
        kath_type: "PDK" 
      };
    }
  });
}(React, _));
