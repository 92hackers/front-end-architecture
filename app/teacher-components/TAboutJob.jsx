
import React from 'react';

class TAboutJob extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <section className="t-about-job">
        <section className="bg-img">
          <div className="content">
            <h1 className="main-title">About Job</h1>
            <h2 className="main-sub-title">Online English teaching as it should be.</h2>
          </div>
        </section>
        <section className="container text-center">
          <section className="inctoduction">
            <h1 className="title">Job introduction</h1>
            <p>WeTeach connects teachers with Chinese primary school students to learn together online.</p>
            <p>Our current focus is on English reading comprehension, pronunciation and confidence building.</p>
            <p>Part of our proceeds goes to charities supporting rural education in China.</p>
          </section>
          <section className="payment">
            <span className="icon-money"></span>
            <h1 className="title">Payment</h1>
            <h2 className="sub-title">Set your own price for class!</h2>
            <p className="payment-content">Rates are set on a per class basis. Each class is 25 minutes long. The starting rate is US$7.50. Teachers can determine their own rate based on teaching experience, qualifications, and student demand.</p>
          </section>
          <section className="timezone">
            <span className="icon-time"></span>
            <h1 className="title">Time Zone Conversion</h1>
            {/* TODO: add  table here. */}
          </section>
          <section className="application">
            <div className="step-apply">
              <span className="icon-computer"></span>
              <p>Apply Online</p>
            </div>
            <div className="arrow">
              <span className="icon-arrow-right"></span>
            </div>
            <div className="step-interview">
              <span className="icon-people"></span>
              <p>Interview</p>
            </div>
            <div className="arrow">
              <span className="icon-arrow-right"></span>
            </div>
            <div className="step-teaching">
              <span className="icon-book"></span>
              <p>Start Teaching</p>
            </div>
          </section>
          <section className="qualifications">
            <div className="icon-wrap"><span className="icon-suitcase"></span></div>
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
            <h1 className="slogan-title">Learning for life. Friendships for life.</h1>
          </section>
        </section>
      </section>
    )
  }
}

export default TAboutJob;
