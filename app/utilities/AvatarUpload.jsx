// global avatar upload
import React from 'react';
import Cropper from 'react-cropper';
import reqwest from 'reqwest';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';


class AvatarUpload extends React.Component {

  constructor (props) {
    super (props);
    this.host = "http://oawkdrros.bkt.clouddn.com/";
    this.state = {
      open: false
    };
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
    e.preventDefault();
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      console.log("error crop.");
      return;
    } else {
      let cropResult = this.refs.cropper.getCroppedCanvas().toDataURL();

      reqwest({
        url: "/upload-to-qiniu",
        method: "post",
        type: "application/x-www-form-urlencoded",
        data: { img: cropResult }
      })
      .then((resp) => {
        var result = JSON.parse(resp.response);
        console.log(result.data);
        console.log(self.props);
        self.props.setAvatarUrl(result.data);       // pass url to parent component.
      })
      .fail((err) => {
        console.log(err);
      })
    }
    this.handleClose();
  }

  render () {

    const actions = [
      <FlatButton
        label="Cancel"
        default={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        id="submitEdu"
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

export default AvatarUpload;
