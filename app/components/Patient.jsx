(function(React, module, undefined) {
  var Rating = require("./Rating.jsx");
  var PatientInfo = require("./PatientInfo.jsx");
  module.exports = React.createClass({
    render: function() {
      return (
        <tr>
          <td>
            <div className="row">
              <div className="col-sm-2">
                <strong>{this.props.data.name}</strong><br />
                <small>{this.props.data.station} {this.props.data.room}</small>
              </div>
              <div className="col-sm-2">
                {this.props.data.init_date}<br />
                <small>{this.props.data.kath_type}</small>
              </div>
              <div className="col-sm-3 pull-right">
                <button type="button" className="btn pull-left" onClick={this.toggleInfo}>
                  &nbsp;<i className="fa fa-info"></i>&nbsp;
                </button>
                <button type="button" className="btn pull-left" onClick={this.editPatient}>
                  <i className="fa fa-edit"></i>
                </button>
                <Rating data={this.props.data} />
                <button type="button" className="btn btn-danger pull-right" onClick={this.deletePatient}>
                  <i className="fa fa-trash-o"></i>
                </button>
              </div>
            </div>

            {
                this.state.show_info
                ? <PatientInfo data={this.props.data} />  
                : null
            }

          </td>
        </tr> 
      );
    },
    deletePatient: function() {
      this.props.data.delete();
    },
    editPatient: function() {
      this.props.data.edit();
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