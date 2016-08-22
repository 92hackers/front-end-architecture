
import React from 'react';

class TAvatar extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="t-avatar" style={{width: "100%", height: "100%"}}>
        <img src={this.props.avatarUrl ? this.props.avatarUrl : "/images/teacher-avatar.png"} alt="teacher avatar"/>
      </div>
    )
  }
}

export default TAvatar;
