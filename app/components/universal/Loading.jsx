
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class Loading extends React.Component {

  constructor (props) {
    super (props);
  }

  // componentWillReceiveProps (nextProps) {
  //   if (nextProps !== this.props.isDisplay) {
  //     this.setState({
  //       dataIsReady: nextProps.dataIsReady
  //     });
  //   }
  // }

  render () {

    var style = {
      textAlign: "center",
      display: !this.props.pendingCounter ? "none" : "block",
      paddingTop: 200,
      paddingBottom: 200
    };

    return (
      <div className="site-loading" style={style}>
        <CircularProgress></CircularProgress>
      </div>
    )
  }
}

export default Loading;
