(function(React, module, undefined) {
  module.exports = React.createClass({
    render: function() {

      function getDateTimeInputString(date_time_string) {
          var local = new Date(date_time_string);
          local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
          return local.toJSON().slice(0,16);
      };

      var local_date_time = getDateTimeInputString(this.props.data.date_time);

      return (
        <tr>
          <td>
            <div className="row">
              <div className="col-sm-2">
                <input type="datetime-local" aclassName="form-control" name="date_time" value={local_date_time}
                  onChange={this.handleNewDateTime} />
              </div>
              <div className="col-sm-2">
                <input type="text" className="form-control" name="psn" value={this.props.data.psn}
                  placeholder="Name" onChange={this.handleNewPSN} />
              </div>
              <div className="col-sm-2">
                <input type="text" list="processes" 
                    className="form-control" name="process" value={this.props.data.process}
                    onChange={this.handleNewProcess} />
                <datalist id="processes">
                  <option>Anlage</option>
                    <option>VW</option>
                    <option>AV</option>
                    <option>%</option>
                    <option>% AV</option>
                    <option>% V</option>
                </datalist>
              </div>

            </div>
          </td>
        </tr> 
      );
    },
    handleNewDateTime: function(event) {
      var old_date_time = new Date(this.props.data.date_time);
      var new_date_time = new Date(event.target.value);
      
      this.props.data.date_time = new Date(new_date_time).toJSON();

      this.setState(this.state);
    },
    handleNewProcess: function(event) {
      this.props.data.process = event.target.value;
      this.setState(this.state);
    },
    handleNewPSN: function(event) {
      this.props.data.psn = event.target.value;
      this.setState(this.state);
    },    
    getInitialState: function() {
      return { 
      };
    }
  });
}(React, module));