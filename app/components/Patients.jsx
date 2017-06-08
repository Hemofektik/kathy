(function(React, module, undefined) {
  var Patient = require('./Patient.jsx');
  
  module.exports = React.createClass({
    render: function() {
      var min_date = this.state.current_date;
      var max_date = new Date(this.state.current_date.getTime());
      max_date.setHours(max_date.getHours() + 48, 0, 0, 0);

      return (
        <table className="table table-striped table-condensed">
          <thead>
            <tr>
              <th>Patient</th>
            </tr>
            <tr>                
              <td>
                <div className="col-sm-4">
                </div>
                <div className="col-sm-2">
                  <strong>{this.state.current_date_text}</strong>
                </div>
                <div className="col-sm-2">
                  <strong>{this.state.next_date_text}</strong>
                </div>
                <div className="pull-right">
                  <button type="button" className="btn" onClick={this.scrollLeft}>
                    <i className="fa fa-arrow-left"></i>
                  </button>
                  <button type="button" className="btn" onClick={this.scrollRight}>
                    <i className="fa fa-arrow-right"></i>
                  </button>
                  <button type="button" className="btn" onClick={this.scrollHome}>
                    <i className="fa fa-home"></i>
                  </button>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {
              this.props.data.filter( function filterByDate(obj) {
                return obj.samples.some( function(sample)
                  {
                    var date_time = new Date(sample.date_time).getTime();
                    return ( date_time >= min_date && date_time <= max_date );
                  });
                }).map(function(patient) {
                  return <Patient key={patient.id} data={patient} min_date={min_date} max_date={max_date} />;
                })
            }
          </tbody>
        </table>
      );
    },
    scrollLeft: function() {
      this.state.current_date.setHours(this.state.current_date.getHours() - 24, 0, 0, 0);;
      this.setState(this.updateDateState(this.state));
    },
    scrollRight: function() {
      this.state.current_date.setHours(this.state.current_date.getHours() + 24, 0, 0, 0);;
      this.setState(this.updateDateState(this.state));
    },
    scrollHome: function() {
      this.setState(this.getInitialState());
    },
    updateDateState: function(state) {
      var today = new Date();
      today.setHours(0,0,0,0);
      var tomorrow = new Date()
      tomorrow.setHours(0,0,0,0);
      tomorrow.setHours(tomorrow.getHours() + 24, 0, 0, 0);
      var yesterday = new Date()
      yesterday.setHours(0,0,0,0);
      yesterday.setHours(yesterday.getHours() - 24, 0, 0, 0);

      var selected_tomorrow = new Date(state.current_date.getTime());
      selected_tomorrow.setHours(selected_tomorrow.getHours() + 24, 0, 0, 0);

      if(state.current_date.getTime() == today.getTime())
      {
        state.current_date_text = "Heute";
        state.next_date_text = "Morgen";
      } 
      else if(state.current_date.getTime() == yesterday.getTime())
      {
        state.current_date_text = "Gestern";
        state.next_date_text = "Heute";
      } 
      else if (state.current_date.getTime() == tomorrow.getTime())
      {
        state.current_date_text = "Morgen";
        state.next_date_text = selected_tomorrow.toLocaleDateString();
      }
      else if(selected_tomorrow.getTime() == yesterday.getTime())
      {
        state.current_date_text = state.current_date.toLocaleDateString();
        state.next_date_text = "Gestern";
      } 
      else
      {
        state.current_date_text = state.current_date.toLocaleDateString();
        state.next_date_text = selected_tomorrow.toLocaleDateString();
      } 
      return state;
    },
    getInitialState: function() {
      var today = new Date();
      today.setHours(0,0,0,0);
      return this.updateDateState({ 
        current_date: today, 
      });
    }
  });
}(React, module));