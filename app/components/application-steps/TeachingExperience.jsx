import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { autobind } from 'core-decorators'

class TeachingExperience extends React.Component {

  @autobind
  handleChange(e, index) {
    this.setState({
      teachExpValue: index,
    });
  }

  render() {
    const textFieldStyle = {
      width: '100%',
    };

    const labelStyle = {
      color: '#666666',
      fontWeight: 'bold',
    };

    return (
      <div className="teaching-experience">
        <div className="select-years">
          <span className="title">Teaching Experience</span>
          <SelectField
            style={{ verticalAlign: 'middle' }}
            id="teach-experience"
            value={this.state.teachExpValue}
            onChange={this.handleChange}
            floatingLabelText="Select..."
          >
            <MenuItem style={{ cursor: 'pointer' }} value={0} primaryText="Less than 5 years" />
            <MenuItem style={{ cursor: 'pointer' }} value={1} primaryText="Between 5 to 15 years" />
            <MenuItem style={{ cursor: 'pointer' }} value={2} primaryText="More than 15 years" />
          </SelectField>
        </div>
        <ul>
          <li className="words-item">
            <div className="caption">
              <span className="index">1</span>
              <span className="title">What important qualities should an ESL teacher possess?</span>
            </div>
            <div className="input-box">
              <Field
                name="intro"
                component={TextField}
                placeholder="500 Characters Remaining"
                floatingLabelStyle={labelStyle}
                style={textFieldStyle}
                multiLine
                maxLength="500"
                rows={5}
                rowsMax={5}
                type="textarea"
              />
            </div>
          </li>
          <li className="words-item">
            <div className="caption">
              <span className="index">2</span>
              <span className="title">Name 5 factors to consider when lesson planning.</span>
            </div>
            <div className="input-box">
              <Field
                name="style"
                component={TextField}
                placeholder="500 Characters Remaining"
                floatingLabelStyle={labelStyle}
                style={textFieldStyle}
                multiLine
                maxLength="500"
                rows={5}
                rowsMax={5}
                type="textarea"
              />
            </div>
          </li>
          <li className="words-item">
            <div className="caption">
              <span className="index">3</span>
              <span className="title">How do you plan to keep young learners motivated and engaged in an online classroom setting?</span>
            </div>
            <div className="input-box">
              <Field
                name="whyteach"
                component={TextField}
                placeholder="500 Characters Remaining"
                floatingLabelStyle={labelStyle}
                style={textFieldStyle}
                multiLine
                maxLength="500"
                rows={5}
                rowsMax={5}
                type="textarea"
              />
            </div>
          </li>
          <li className="words-item">
            <div className="caption">
              <span className="index">4</span>
              <span className="title">Is there any other useful information you&apos;d like to provide about yourself? (optional)</span>
            </div>
            <div className="input-box">
              <Field
                name="additional"
                component={TextField}
                placeholder="500 Characters Remaining"
                floatingLabelStyle={labelStyle}
                style={textFieldStyle}
                multiLine
                maxLength="500"
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
    const {
      displaySuccess,
      displayError,
      showNotification,
      networkError,
      updateTeachingExp,
    } = this.props
    const { intro, style, whyteach } = values
    let notification = '';

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

    updateTeachingExp(values).then((res) => {
      if (res.payload.success) {
        displaySuccess()
      } else {
        displayError()
      }
    }).catch(() => networkError())
  }
}

TeachingExperience = reduxForm({
  form: 'applicationTeachingExperience',
  initialValues: {

  },
})(TeachingExperience)

export default TeachingExperience
