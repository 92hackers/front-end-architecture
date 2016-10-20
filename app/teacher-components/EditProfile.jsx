import React, { PropTypes } from "react"
import EditProfileForm from '../containers/editProfileForm';

class EditProfile extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSubmit (values) {         // 目前先将 validation 写在这里。  暂时先用回调来取得结果。
    const {token, updateProfile, showNotification, networkError} = this.props
    const {residence_n, timezone, tel_num} = values

    var warn = ""
    if (!residence_n) {
      warn = "Please select your country of residence."
    } else if (!timezone) {
      warn = "Please select your location timezone."
    } else if (!tel_num) {
      warn = "Please enter your phone number."
    }

    if (warn.length > 0) {
      showNotification(warn)
      return;
    } else {
      updateProfile(token, values).then((res) => {
        if (res.payload.success) {
          showNotification("Your profile updated successfully.")        // 还需要加上 get profile 或者是 额外的跳转。
        } else {
          networkError()
        }
      })
    }

  }

  render () {
    return (
      <div className="edit-profile">
        <div className="wrap">
          <header className="text-center">Edit Profile</header>
          <section className="content">
            <EditProfileForm onSubmit={this.handleSubmit.bind(this)}></EditProfileForm>
          </section>
        </div>
      </div>
    )
  }
}

export default EditProfile
