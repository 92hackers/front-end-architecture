
import React from 'react';

class TAvatar extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      avatarUrl: this.props.avatarUrl || '/images/teacher-avatar.png',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.avatarUrl !== this.props.avatarUrl) {
      this.setState({
        avatarUrl: nextProps.avatarUrl,
      });
    }
  }

  render () {
    return (
      <div className="t-avatar" style={{width: "100%", height: "100%"}}>
        <img src={this.state.avatarUrl} alt="teacher avatar"/>
      </div>
    )
  }
}

export default TAvatar;
