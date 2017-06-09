(function(React, module, undefine) {
  var Rating = require("./Rating.jsx");
  var PatientInfo = require("./PatientInfo.jsx");
  module.exports = React.createClass({
    render: function() {

      var init_date = new Date(this.props.data.init_date).toLocaleDateString();

      var day0_start = this.props.min_date;
      var day0_end = new Date(day0_start.getTime());
      day0_end.setHours(day0_end.getHours() + 24, 0, 0, 0);
      var day1_end = new Date(day0_end.getTime());
      day1_end.setHours(day1_end.getHours() + 24, 0, 0, 0);

      var sample_day0 = this.props.data.samples.find(function(sample) {
        var sample_date_time = new Date(sample.date_time);
        return !_.isBlank(sample.psn) && sample_date_time >= day0_start && sample_date_time < day0_end;
      });
      var sample_day1 = this.props.data.samples.find(function(sample) {
        var sample_date_time = new Date(sample.date_time);
        return !_.isBlank(sample.psn) && sample_date_time >= day0_end && sample_date_time < day1_end;
      });

      var process_day0 = sample_day0 ? sample_day0.process : "";
      var process_day1 = sample_day1 ? sample_day1.process : "";

      return (
        <tr>
          <td>
            <div className="row">
              <div className="col-sm-2">
                <strong>{this.props.data.name}</strong><br />
                <small>{this.props.data.station} {this.props.data.room}</small>
              </div>
              <div className="col-sm-2">
                {init_date}<br />
                <small>{this.props.data.kath_type}</small>
              </div>
              <div className="col-sm-2">
                {process_day0}
              </div>
              <div className="col-sm-2">
                {process_day1}
              </div>
              <div className="col-sm-3 pull-right">
                <Rating data={this.props.data} />
                <button type="button" className="btn pull-right" onClick={this.toggleInfo}>
                  &nbsp;<i className="fa fa-info"></i>&nbsp;
                </button>
              </div>
            </div>
            {
                this.state.show_info
                ? <PatientInfo data={this.props.data} close_callback={this.toggleInfo}/>  
                : null
            }

          </td>
        </tr> 
      );
    },
    toggleInfo: function() {
      this.state.show_info = !this.state.show_info; 
      this.setState(this.state);
    },
    getInitialState: function() {
      return { 
        show_info: false 
      };
    }
  });
}(React, module));