
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class Loading extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      dataIsReady: this.props.dataIsReady
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props.isDisplay) {
      this.setState({
        dataIsReady: nextProps.dataIsReady
      });
    }
  }

  render () {

    var style = {
      textAlign: "center",
      display: this.state.dataIsReady ? "none" : "block",
      paddingTop: 100,
      paddingBottom: 100
    };

    return (
      <div className="site-loading" style={style}>
        <CircularProgress></CircularProgress>
      </div>
    )
  }
}

export default Loading;
