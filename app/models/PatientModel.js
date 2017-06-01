(function(_) {
  var LSService = require('../services/LSService.js'),
      data = LSService.read(),
      patient_to_edit = {};
  
  var statics = {
    subscribers: [],
    counter: data && data.length > 0 ? data.slice(-1).pop().id + 1 : 1,
    query: function() {
      return _.map(data, function(patient) {
        return new PatientModel(patient);
      });
    },
    publish: function(data) {
      _.each(this.subscribers, function(callback) {
        callback(data);
      });
      LSService.store(data);
    },
    subscribe: function(callback) {
      this.subscribers.push(callback);
    },
    delete: function(myPatient) {
      data = _.filter(data, function(patient) {
        return patient.id !== myPatient.id;
      });
      this.publish(data);
    },
    edit: function(myPatient) {
      patient_to_edit = myPatient;
      this.publish(data);
    },
    save: function(myPatient) {
      var patient = _.find(data, function(patient) {
        return patient.id === myPatient.id;
      });
      if (patient !== undefined) {
        _.extend(patient, myPatient);
      } else {
        data.push(myPatient);
      }
      this.publish(data);
    },
    get_patient_to_edit: function() {
      return patient_to_edit;
    }
  };
  
  var PatientModel = function(patient) {
    this.id = patient.id || statics.counter++;
    this.station = patient.station || "";
    this.room = patient.room || "";
    this.name = patient.name || "";
    this.kath_type = patient.kath_type || "";
    this.init_date = patient.init_date || "";
    this.score = patient.score || 0;
    
    this.delete = function() {
      statics.delete(this);
    };
    this.edit = function() {
      statics.edit(this);
    };

    this.save = function() {
      statics.save(this);
    };

    this.get_patient_to_edit = function() {
      return statics.get_patient_to_edit();
    };
  };
  
  _.extend(PatientModel, statics);
  module.exports = PatientModel;
}(_));