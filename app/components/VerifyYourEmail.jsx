import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';
import FaCheckCircle from 'react-icons/lib/fa/check-circle'

export default class VerifyYourEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccess: false,
    };
  }

  componentWillMount() {
    if (!this.props.location.query.token) {
      browserHistory.push('/sign-in');
    }
  }

  componentDidMount() {
    const self = this;
    const activeCode = this.props.location.query.token;

    const {
      activateAccount,
      getProfile,
      increaseCounter,
      decreaseCounter,
      showNotification,
    } = this.props

    if (activeCode) {
      activateAccount(activeCode).then((res) => {
        if (res.payload.success) {
          self.setState({
            isSuccess: true,
          });
          if (self.props.loggedIn) {
            increaseCounter()
            getProfile().then(() => decreaseCounter())
          }
          const timeoutId = setTimeout(() => {
            if (self.props.loggedIn) {
              browserHistory.push('step-to-sign-up');
            } else {
              browserHistory.push('/sign-in');
            }
            clearTimeout(timeoutId);
          }, 3000);
        } else {
          showNotification('Verify Failed, Please Try Again Later.');
        }
      })
    } else {
      showNotification('Something wrong.')
    }
  }

  render() {
    const { isSuccess } = this.state
    const verify = isSuccess ? 'none' : 'block';
    const success = isSuccess ? 'block' : 'none';

    return (
      <div className="verify-your-email" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <h1 style={{ display: verify }} className="text-center">Verifying <CircularProgress /></h1>
        <h1 style={{ display: success }} className="text-center">
          <FaCheckCircle className="fa fa-check-circle" />Account activated! Please {this.props.loggedIn ? <span>complete your personal profile.</span> : <span>sign in to continue.</span>}
        </h1>
      </div>
    )
  }
}
