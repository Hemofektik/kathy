(function(React, _) {

  Date.prototype.toDateInputValue = (function() {
      var local = new Date(this);
      local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
      return local.toJSON().slice(0,10);
  });

  var Patient = require('../models/PatientModel.js');
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
      this.setState(_.extend(this.state, {
        init_date: event.target.value
      }));
    },
    addPatient: function(event) {
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
      var disable_save = this.isDisabled();
      var disable_date = (this.props.initial_patient !== undefined);
      var show_delete_date = (this.props.initial_patient !== undefined);
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
              <input type="date" className="form-control" name="init_date" value={this.state.init_date}
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
            
            {show_delete_date ?
            <button type="button" className="btn btn-danger pull-left" onClick={this.deletePatient}>
              <i className="fa fa-trash-o"></i>
            </button> : null
            }
            <button type="button" className="btn pull-right" onClick={this.close}  ><i className="fa fa-close"></i></button>
            
            <button type="submit" className="btn pull-right" disabled={disable_save}> <i className="fa fa-save"></i></button>
            </div>
          </div>
        </form>
      );
    },
    deletePatient: function() {
      this.props.initial_patient.delete();
    },
    getInitialState: function() {
      if(this.props.initial_patient !== undefined)
      {
        return this.props.initial_patient;
      }

      return { 
        id: undefined,
        name: "",
        station: "Achi",
        room: "",
        init_date: new Date().toDateInputValue(),
        kath_type: "PDK" 
      };
    }
  });
}(React, _));
