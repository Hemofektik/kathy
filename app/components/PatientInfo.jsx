(function(React, module, undefined) {
  module.exports = React.createClass({
    render: function() {
      return (
        <div>DATA INFO {this.props.data.name}</div>
      );
    },
    getInitialState: function() {
      return { 
        show_info: false 
      };
    }
  });
}(React, module));