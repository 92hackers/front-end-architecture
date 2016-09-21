// global avatar upload
import React from 'react';
import Cropper from 'react-cropper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {connect} from 'react-redux';
import api from '../network/api';
import Notification from './Notification';


class AvatarUploadClass extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      open: false,
      notification: ""
    };
    this.token = this.props.token;
  }

  notify (message) {
    if (!!message.length) {
      this.setState({
        notification: message
      }, () => {
        this.refs.notification.handleNotificationOpen();
      });
    }
  }

  handleOpen (e)  {
    this.setState({
      open: true
    });
  }

  handleClose (e)  {
    this.setState({
      open: false
    });
  }

  uploadToServer (e) {
    var self = this;
    var token = this.token;
    e.preventDefault();
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    } else {
      let cropResult = this.refs.cropper.getCroppedCanvas().toDataURL("image/jpeg", 0.5);

      api.FileUpload({ filedata: cropResult},
        { "Authorization": token },
        "",
        (resp) => {
          if (resp.success) {
            self.props.setAvatarUrl(resp.data.imgurl);
          } else {
            self.notify("upload picture failed");
          }
        },
        (err) => {
          self.notify("network error.");
        }
      );
    }
    this.handleClose();
  }

  render () {

    const actions = [
      <RaisedButton
        className="dialog-button"
        label="Cancel"
        default={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <RaisedButton
        className="dialog-button"
        label="Set new profile picture"
        primary={true}
        onTouchTap={this.uploadToServer.bind(this)}
      />
    ];

    const cropboxData = {
      width: 256,
      height: 256
    };

    return (
      <div className="container">
        <Notification ref="notification" message={this.state.notification}></Notification>
        <Dialog title="Crop your picture" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose.bind(this)}>
          <div id="crop-picture">
            <Cropper
              ref='cropper'
              src={this.props.src}
              style={{height: 400, width: '100%'}}
              movable={false}
              scalable={false}
              rotatable={false}
              zoomable={false}
              viewMode={2}
              aspectRatio={1/1}
              cropBoxData={cropboxData}
              cropBoxResizable={false}
              minCropBoxWidth={256}
              minCropBoxHeight={256}
              toggleDragModeOnDblclick={false}
              crop={this._crop} />
          </div>
        </Dialog>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.addToken.token
  }
}

const AvatarUpload = connect( mapStateToProps, null, null, { withRef: true } )(AvatarUploadClass);

export default AvatarUpload;
