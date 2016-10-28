import React from 'react';
import IndexHeader from './IndexHeader';
import toggleHeader from '../utilities/toggleHeader';

class TAboutJob extends React.Component {

  componentDidMount() {
    toggleHeader.set(540);
  }

  componentWillUnmount() {
    toggleHeader.reset();
  }

  /* eslint max-len: 0 */
  render() {
    return (
      <section className="t-about-job">
        <section className="bg-img">
          <div className="content">
            <IndexHeader />
            <h1 className="main-title">About the Job</h1>
            <h2 className="main-sub-title">Online English teaching as it should be.</h2>
          </div>
        </section>
        <section className="container text-center">
          <section className="introduction">
            <h1 className="title">Job introduction</h1>
            <p>WeTeach connects teachers with Chinese primary school students to learn together online.</p>
            <p>Our current focus is on English reading comprehension, pronunciation, and confidence building.</p>
            <p>Part of our proceeds goes to charities supporting rural education in China.</p>
          </section>
          <section className="payment">
            <span className="icon icon-money" />
            <h1 className="title">Payment</h1>
            <h2 className="sub-title">Set your own price for class!</h2>
            <p className="payment-content">Rates are set on a per class basis. Each class is 25 minutes long. The starting rate is US$7.50. Teachers can determine their own rate based on teaching experience, qualifications, and student demand.</p>
          </section>
          <section className="timezone">
            <span className="icon icon-time" />
            <h1 className="title">Time Zone Conversion</h1>
            <p className="table-caption">Peak Times (Daylight Saving Time)</p>
            <div className="icon-summer" />
            <p className="table-caption">Peak Times </p>
            <div className="icon-winter" />
          </section>
          <section className="application">
            <div className="icon-wrap">
              <span className="icon icon-shen-qing" />
              <h1 className="title">Application Process</h1>
            </div>
            <div className="application-steps clearfix">
              <div className="step-apply left">
                <span className="icon icon-computer" />
                <p>Apply Online</p>
              </div>
              <div className="arrow left">
                <span className="icon icon-left-arrow" />
              </div>
              <div className="step-interview left">
                <span className="icon icon-people" />
                <p>Interview</p>
              </div>
              <div className="arrow left">
                <span className="icon icon-left-arrow" />
              </div>
              <div className="step-teaching left">
                <span className="icon icon-book" />
                <p>Start Teaching</p>
              </div>
            </div>
          </section>
          <section className="qualifications">
            <div className="icon-wrap"><span className="icon icon-suitcase" /></div>
            <h1 className="title">Qualifications Required</h1>
            <ul>
              <li>
                <span className="index">1</span>
                <p>Native English speaker.</p>
              </li>
              <li>
                <span className="index">2</span>
                <p>Experience working with children between the ages of 5 and 14.</p>
              </li>
              <li>
                <span className="index">3</span>
                <p>Previous/current teaching certification or ESL teaching experience.</p>
              </li>
              <li>
                <span className="index">4</span>
                <p>Bachelor’s degree in education or other relevant degree.</p>
              </li>
              <li>
                <span className="index">5</span>
                <p>Broadband internet connection, web camera, and microphone.</p>
              </li>
            </ul>
          </section>
          <section className="slogan">
            <h1 className="slogan-title">&quot;Learning for life. Friendships for life.&quot;</h1>
          </section>
        </section>
      </section>
    )
  }
}

export default TAboutJob;
