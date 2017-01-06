import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

class TeachingExperience extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const textFieldStyle = {
      width: '100%',
    };

    const labelStyle = {
      color: '#666666',
      fontWeight: 'bold',
    };


    const { initialValues, pristine } = this.props

    return (
      <div className="teaching-experience">
        <ul>
          <li className="words-item">
            <div className="caption">
              <span className="index">1</span>
              <span className="title"><i className="required-icon">*</i>What important qualities should an ESL teacher possess?</span>
            </div>
            <div className="input-box">
              <Field
                floatingLabelStyle={labelStyle}
                placeholder="500 Characters Remaining"
                name="intro"
                component={TextField}
                maxLength="500"
                style={textFieldStyle}
                multiLine
                rows={5}
                rowsMax={5}
                type="textarea"
              />
            </div>
          </li>
          <li className="words-item">
            <div className="caption">
              <span className="index">2</span>
              <span className="title"><i className="required-icon">*</i>Name 5 factors to consider when lesson planning.</span>
            </div>
            <div className="input-box">
              <Field
                floatingLabelStyle={labelStyle}
                placeholder="500 Characters Remaining"
                name="style"
                component={TextField}
                maxLength="500"
                style={textFieldStyle}
                multiLine
                rows={5}
                rowsMax={5}
                type="textarea"
              />
            </div>
          </li>
          <li className="words-item">
            <div className="caption">
              <span className="index">3</span>
              <span className="title"><i className="required-icon">*</i>How do you plan to keep young learners motivated and engaged in an online classroom setting?</span>
            </div>
            <div className="input-box">
              <Field
                floatingLabelStyle={labelStyle}
                placeholder="500 Characters Remaining"
                name="whyteach"
                component={TextField}
                maxLength="500"
                style={textFieldStyle}
                multiLine
                rows={5}
                rowsMax={5}
                type="textarea"
              />
            </div>
          </li>
          <li className="words-item">
            <div className="caption">
              <span className="index">4</span>
              <span className="title">Is there any other useful information you"d like to provide about yourself? (optional)</span>
            </div>
            <div className="input-box">
              <Field
                floatingLabelStyle={labelStyle}
                placeholder="500 Characters Remaining"
                name="additional"
                component={TextField}
                maxLength="500"
                style={textFieldStyle}
                multiLine
                rows={5}
                rowsMax={5}
                type="textarea"
              />
            </div>
          </li>
        </ul>
      </div>
    )
  }

  handleSubmit(values) {
    let notification = '';
    const { showNotification, networkError } = this.props

    const { intro, style, whyteach } = values

    if (!intro.length) {
      notification = 'Please answer Question 1.';
    } else if (!style.length) {
      notification = 'Please answer Question 2.';
    } else if (!whyteach.length) {
      notification = 'Please answer Question 3.';
    }

    if (intro.length > 500) {
      notification = 'Question 1 should be less than 500 characters.';
    } else if (style.length > 500) {
      notification = 'Question 2 should be less than 500 characters.';
    } else if (whyteach.length > 500) {
      notification = 'Question 3 should be less than 500 characters.';
    }

    if (notification.length > 0) {
      showNotification(notification);
      return;
    }

    const { displayLoader, getProfile, displaySuccess, displayError, token } = this.props

    displayLoader();
    api.TApplyStep2(values,
      {'Authorization': token},
      '',
      (resp) => {
        if (resp.success) {
          api.TGetProfile('',
          { 'Authorization': token },
          '',
          res => {
            if (res.success) {
              getProfile(res.data)
              displaySuccess();
            }
          },
          err => alert('Network is busy, please contact support: teacher@weteach.info')
          )
        } else {
          displayError();
        }
      },
      (err) => {
        displayError();
      }
    );
  }
}

TeachingExperience = reduxForm({
  form: 'teachingExperience',
  enableReinitialize: true,       // allow comp to re initialize.
})(TeachingExperience)

export default TeachingExperience
