(function(React, module, undefined) {
  module.exports = React.createClass({
    render: function() {
      return (
        <tr>
          <td>
            <div className="row">
              <div className="col-sm-2">
                <strong>{this.props.data.date_time}</strong><br />
                <small>{this.props.data.station} {this.props.data.room}</small>
              </div>
            </div>
          </td>
        </tr> 
      );
    },
    getInitialState: function() {
      return { 
        show_info: false 
      };
    }
  });
}(React, module));