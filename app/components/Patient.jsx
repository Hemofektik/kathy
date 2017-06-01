(function(React, module, undefined) {
  var Rating = require("./Rating.jsx");
  module.exports = React.createClass({
    render: function() {
      return (
        <tr>
          <td>
            <div className="col-sm-2">
              <strong>{this.props.data.name}</strong><br />
              <small>{this.props.data.station} {this.props.data.room}</small>
            </div>
            <div className="col-sm-2">
              {this.props.data.init_date}<br />
              <small>{this.props.data.kath_type}</small>
            </div>
            <div className="pull-right">
              <button type="button" className="btn pull-left" onClick={this.editPatient}>
                <i className="fa fa-edit"></i>
              </button>
              <Rating data={this.props.data} />
              <button type="button" className="btn btn-danger pull-right" onClick={this.deletePatient}>
                <i className="fa fa-trash-o"></i>
              </button>
            </div>
          </td>
        </tr> 
      );
    },
    deletePatient: function() {
      this.props.data.delete();
    },
    editPatient: function() {
      this.props.data.edit();
    }
  });
}(React, module));