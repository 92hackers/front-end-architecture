import React, { PropTypes } from "react"
import EditProfileForm from '../containers/editProfileForm';
import { browserHistory } from 'react-router'
import api from '../network/api'

class EditProfile extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSubmit (values) {         // 目前先将 validation 写在这里。  暂时先用回调来取得结果。
    const { getProfile, updateProfile, showNotification, networkError, token, signOut } = this.props
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
      updateProfile(values).then((res) => {
        if (res.payload.success) {
          showNotification("Your profile updated successfully.")        // 还需要加上 get profile 或者是 额外的跳转。

          var profileRequest = api.TGetProfile(
            "",
            { "Authorization": token },
            "",
            (resp) => {
              if (resp.success) {
                const profile = resp.data;
                getProfile(profile);
              }
            },
            (err) => {
              showNotification("Your session has expired. Please sign in again.");
              self.props.signOut();
              browserHistory.push("/sign-in");
            }
          )

          const timeId = setTimeout(() => {
            browserHistory.push('/teacher-homepage')
          }, 4100)
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
