// global avatar upload
import React from 'react';
import Cropper from 'react-cropper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

export default class AvatarUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      uploadStatus: '',
    }
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  uploadToServer(e) {
    e.preventDefault();
    const self = this;
    const { uploadFileData, showNotification, setAvatarUrl } = this.props

    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    const cropResult = this.refs.cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.5);

    this.setState({
      uploadStatus: 'uploading',
    });

    const data = { filedata: cropResult }
    uploadFileData(data).then((res) => {
      const timeId = setTimeout(() => {
        self.handleClose();
        self.setState({
          uploadStatus: '',
        })
        clearTimeout(timeId);
      }, 1500)

      if (res.payload.success) {
        self.setState({
          uploadStatus: 'uploadSuccess',
        })
        setAvatarUrl(res.payload.data.imgurl)
      } else {
        self.setState({
          uploadStatus: 'uploadFail',
        });
        showNotification('Upload picture failed.');
      }
    })
  }

  render() {
    let label = '';
    let uploading = false;

    switch (this.state.uploadStatus) {
      case 'uploading':
        label = 'Uploading';
        uploading = true;
        break;
      case 'uploadSuccess':
        label = 'Upload Successful';
        uploading = false;
        break;
      case 'uploadFail':
        label = 'Upload Failed';
        uploading = false;
        break;
      default:
        label = 'Set new profile picture';
        break;
    }

    const actions = [
      <RaisedButton
        className="dialog-button"
        label="Cancel"
        default
        onTouchTap={this.handleClose}
        disabled={uploading}
      />,
      <RaisedButton
        className="dialog-button"
        label={label}
        primary
        onTouchTap={this.uploadToServer}
        disabled={uploading}
      />,
    ]

    const cropboxData = {
      width: 256,
      height: 256,
    }

    return (
      <div className="container">
        <Dialog
          title="Crop your picture"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div id="crop-picture">
            <Cropper
              ref="cropper"
              src={this.props.src}
              style={{ height: 400, width: '100%' }}
              movable={false}
              scalable={false}
              rotatable={false}
              zoomable={false}
              viewMode={2}
              aspectRatio={1 / 1}
              cropBoxData={cropboxData}
              cropBoxResizable={false}
              minCropBoxWidth={256}
              minCropBoxHeight={256}
              toggleDragModeOnDblclick={false}
              crop={this._crop}
            />
          </div>
        </Dialog>
      </div>
    )
  }
}
