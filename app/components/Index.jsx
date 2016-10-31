import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import IndexHeader from './IndexHeader';
import toggleHeader from '../utilities/toggleHeader';

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      viewHeight: 0,
    };
  }

  componentDidMount() {
    const minHeight = 700;
    let viewHeight = window.innerHeight;

    viewHeight = viewHeight > minHeight ? viewHeight : minHeight;

    /* eslint-disable */
    this.setState({
      viewHeight: viewHeight
    });
    /* eslint-enable */

    toggleHeader.set(viewHeight);
  }

  componentWillUnmount() {
    toggleHeader.reset();
  }

  aboutSchool(e) {
    e.preventDefault();
    browserHistory.push('/about-school');
  }

  aboutJob(e) {
    e.preventDefault();
    browserHistory.push('/about-job');
  }

  scrollDown(e) {
    e.preventDefault();

    const currentPosition = window.scrollY;
    const target = this.state.viewHeight;

    let y = currentPosition;

    const diff = (target + 1) - currentPosition;
    let count = 0;

    if (currentPosition < target) {
      const timeId = setInterval(() => {
        count += 1
        y += (diff / 100);
        window.scrollTo(0, y);
        if (count === 100) {
          clearInterval(timeId);
        }
      }, 1);
    }
  }

  handleStart(e) {
    e.preventDefault();
    browserHistory.push('/sign-up');
  }

  render() {
    const viewHeight = this.state.viewHeight;

    const labelStyle = {
      fontSize: 30,
    }

    const startStyle = {
      width: 260,
      height: 62,
    };

    const aboutSchool = {
      fontSize: 30,
      width: 300,
      height: 70,
      marginRight: 50,
      borderRadius: 40,
    };

    const aboutJob = {
      fontSize: 30,
      width: 300,
      height: 70,
      marginLeft: 50,
      borderRadius: 40,
    };

    return (
      <div className="weteach-index text-center">
        <section className="bg-img icon icon-image" style={{ height: viewHeight }}>
          <div className="mask">
            <div className="content">
              <IndexHeader />
              <h1 className="title">WeTeach</h1>
              <h2 className="sub-title">Online English teaching as it should be!</h2>
              {
                this.props.loggedIn ? <div /> : (
                  <RaisedButton
                    className="index-start-btn"
                    style={startStyle}
                    labelStyle={labelStyle}
                    label="Start Teaching"
                    primary
                    onTouchTap={this.handleStart}
                  />
                )
              }
            </div>
          </div>
          <div className="arrow-down"><a href="#" onClick={this.scrollDown}><i className="icon icon-down-arrow" /></a></div>
        </section>
        <section className="introduction section-wrap container-wrap">
          <h1 className="primary-color title">What is WeTeach ?</h1>
          <p className="intro-words">WeTeach connects teachers with Chinese primary school students to learn together online.</p>
          <p className="intro-words">Our current focus is on English reading comprehension, pronunciation and confidence building.</p>
          <p className="intro-words">Part of our proceeds goes to charities supporting rural education in China.</p>
          <ul className="card-list">
            <li className="card-item card-blue">
              <div className="card-mask">
                <p className="card-desc">Set your own rate of pay and work with students who value your experience, ability, and personal touch.</p>
              </div>
              <i className="icon icon-money" />
              <h2 className="title">Self-determined pricing</h2>
            </li>
            <li className="card-item card-gray">
              <div className="card-mask">
                <p className="card-desc">Arrange classes around your lifestyle.</p>
              </div>
              <i className="icon icon-time" />
              <h2 className="title">Flexible scheduling</h2>
            </li>
            <li className="card-item card-blue">
              <div className="card-mask">
                <p className="card-desc">A reliable online classroom and resources library with all the materials and tools you could need to teach a great class.</p>
              </div>
              <i className="icon icon-doubt" />
              <h2 className="title">Online classroom</h2>
            </li>
            <li className="card-item card-gray">
              <div className="card-mask">
                <p className="card-desc">A special team dedicated to providing you with all required technical support.</p>
              </div>
              <i className="icon icon-technology" />
              <h2 className="title">Full technical support</h2>
            </li>
            <li className="card-item card-gray">
              <div className="card-mask">
                <p className="card-desc">All administration and customer service handled for you.</p>
              </div>
              <i className="icon icon-Leisure" />
              <h2 className="title">No admin</h2>
            </li>
            <li className="card-item card-blue">
              <div className="card-mask">
                <p className="card-desc">Ongoing training and feedback from experienced online teachers.</p>
              </div>
              <i className="icon icon-Professional-" />
              <h2 className="title">Professional development</h2>
            </li>
            <li className="card-item card-gray">
              <div className="card-mask">
                <p className="card-desc">A curriculum designed for both student and teacher enjoyment.</p>
              </div>
              <i className="icon icon-Fun" />
              <h2 className="title">Fun</h2>
            </li>
            <li className="card-item card-blue">
              <div className="card-mask">
                <p className="card-desc">We welcome you into a vibrant and supportive community of teachers, parents, and students from around the world.</p>
              </div>
              <i className="icon icon-Community" />
              <h2 className="title">Community</h2>
            </li>
          </ul>
        </section>
        <section className="video container-wrap">
          <div className="section-wrap">
            <h1 className="title primary-color">Why WeTeach ?</h1>
            <p className="sub-title">A vignette from the life of one of our great WeTeach teachers.</p>
            <iframe scrolling="no" width="1024" height="576" src="https://www.youtube.com/embed/iM6AGrZTbbQ?rel=0" frameBorder="0" allowFullScreen />
          </div>
        </section>
        <section className="teachers-thoughts container-wrap">
          <div className="section-wrap">
            <h1 className="title primary-color">Teachers’ Thoughts</h1>
            <ul>
              <li className="teacher-item clearfix">
                <div className="left avatar">
                  <i className="icon icon-Patty-Harte" />
                  <div>
                    <p className="name">Patty Harte</p>
                    <p className="country">England</p>
                  </div>
                </div>
                <div className="left thoughts">
                  <div className="icon icon-dialogue-left"><p className="thoughts-content">&quot;It&apo;s such a privilege to join the children in their homes and to share much-loved stories with them. Their reactions as they see the pages are priceless and utterly enchanting. In teaching you are often giving out so much energy, after story time with WeTeach it is like getting that energy back again.&quto;</p></div>
                </div>
              </li>
              <li className="teacher-item clearfix">
                <div className="right avatar">
                  <i className="icon icon-Paul-Clutterbuck" />
                  <p className="name">Paul Clutterbuck</p>
                  <p className="country">Australia</p>
                </div>
                <div className="right thoughts">
                  <div className="right icon icon-dialogue-right"><p className="thoughts-content">&quot;This has to be one of the best uses of social media on the planet! To bring together students and teachers across the globe, and via the medium of children&apos;s literature, is so imaginative and creative, it&apos;s joyful!&quot;</p></div>
                </div>
              </li>
              <li className="teacher-item clearfix">
                <div className="left avatar">
                  <i className="icon icon-hallette" />
                  <div>
                    <p className="name">Peggy Hallett</p>
                    <p className="country">Canada</p>
                  </div>
                </div>
                <div className="left thoughts">
                  <div className="icon icon-dialogue-left">
                    <p className="thoughts-content">&quot;I have found the WeTeach platform to be an excellent way to make a real connection with young learners. We start our time together with some chitchat and then dive into a book. The stories and adventures lead to plenty of language extensions and inference questions. Success and progress is apparent!&quot;</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="buttons">
            <RaisedButton className="about-button" labelStyle={labelStyle} style={aboutSchool} label="About the School" primary onClick={this.aboutSchool} />
            <RaisedButton className="about-button" labelStyle={labelStyle} style={aboutJob} label="About the Job" primary onClick={this.aboutJob} />
          </div>
        </section>
        <section className="section-wrap contact-us container-wrap">
          <h1 className="title primary-color">Contact Us</h1>
          <p>If you have any queries, suggestions, or would like to be involved.</p>
          <p>please don&apos;t hesitate to contact us at <a href="mailto:teacher@weteach.info" className="primary-color">teacher@weteach.info</a></p>
        </section>
      </div>
    )
  }
}
