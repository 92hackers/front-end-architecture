// global avatar upload
import React from 'react';
import Cropper from 'react-cropper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {connect} from 'react-redux';
import {notificationActions} from '../actions';
import api from '../network/api';

class AvatarUploadClass extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      open: false,
      uploadStatus: ""
    };
    this.token = this.props.token;
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

      this.setState({
        uploadStatus: "uploading"
      });

      api.FileUpload({ filedata: cropResult},
        { "Authorization": token },
        "",
        (resp) => {
          var timeId = setTimeout(() => {
            self.handleClose();
            self.setState({
              uploadStatus: ""
            });
            clearTimeout(timeId);
          }, 1500);
          if (resp.success) {
            self.setState({
              uploadStatus: "uploadSuccess"
            });
            self.props.setAvatarUrl(resp.data.imgurl);
          } else {
            self.setState({
              uploadStatus: "uploadFail"
            });
            self.props.showNotification("Upload picture failed.");
          }
        },
        (err) => {
          set.setState({
            uploadStatus: "uploadFail"
          });
          self.props.networkError();
        }
      );
    }
  }

  render () {

    var label = "";
    var uploading = false;

    switch (this.state.uploadStatus) {
      case "uploading":
        label = "Uploading";
        uploading = true;
        break;
      case "uploadSuccess":
        label = "Upload Successful";
        uploading = false;
        break;
      case "uploadFail":
        label = "Upload Failed";
        uploading = false;
        break;
      default:
        label = "Set new profile picture";
        break;
    }

    const actions = [
      <RaisedButton
        className="dialog-button"
        label="Cancel"
        default={true}
        onTouchTap={this.handleClose.bind(this)}
        disabled={uploading}
      />,
      <RaisedButton
        className="dialog-button"
        label={label}
        primary={true}
        onTouchTap={this.uploadToServer.bind(this)}
        disabled={uploading}
      />
    ];

    const cropboxData = {
      width: 256,
      height: 256
    };

    return (
      <div className="container">
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
    token: state.user.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showNotification: (message) => {
      dispatch(notificationActions.showNotification(message));
    },
    networkError: () => {
      dispatch(notificationActions.networkError());
    }
  }
}

const AvatarUpload = connect( mapStateToProps, mapDispatchToProps, null, { withRef: true } )(AvatarUploadClass);

export default AvatarUpload;
