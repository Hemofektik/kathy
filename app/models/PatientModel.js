(function(_) {
  var LSService = require('../services/LSService.js'),
      data = LSService.read();
  
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
    this.samples = patient.samples || [
      { 
        date_time: this.init_date,
        process: "Anlage" 
      }
      ];
    
    this.delete = function() {
      statics.delete(this);
    };
    this.save = function() {
      statics.save(this);
    };
  };
  
  _.extend(PatientModel, statics);
  module.exports = PatientModel;
}(_));