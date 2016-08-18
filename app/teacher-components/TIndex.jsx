import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import IndexHeader from './IndexHeader';
import toggleHeader from '../utilities/toggleHeader';

class TIndex extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      viewHeight: 0
    };
  }

  handleStart (e) {
    e.preventDefault();
    browserHistory.push("/sign-up");
  }

  componentDidMount () {

    var viewHeight = window.innerHeight;

    viewHeight = viewHeight > 700 ? viewHeight : 700;

    this.setState({
      viewHeight: viewHeight
    });

    toggleHeader.set(viewHeight);

  }

  aboutSchool (e) {
    e.preventDefault();
    browserHistory.push("/about-school");
  }

  aboutJob (e) {
    e.preventDefault();
    browserHistory.push("/about-job");
  }

  scrollDown (e) {
    e.preventDefault();

    var count = "";

    var currentPosition = window.scrollY;
    var target = window.innerHeight;

    var y = currentPosition;

    var diff = target + 1 - currentPosition;
    var count = 0;

    function easeInQuart (t) {
      return t*t*t*t;
    }

    if (currentPosition < target) {
      var timeId = setInterval(() => {
        count++;
        y = y + diff / 100;
        window.scrollTo(0, y);
        if (count === 100) {
          clearInterval(timeId);
        }
      }, 1);
    }

  }

  render () {
    var viewHeight = this.state.viewHeight;

    var labelStyle = {
      fontSize: 30,
    }

    var startStyle = {
      width: 240,
      height: 62
    };

    var aboutSchool = {
      fontSize: 30,
      width: 266,
      height: 70,
      marginRight: 50,
      borderRadius: 40
    };

    var aboutJob = {
      fontSize: 30,
      width: 266,
      height: 70,
      marginLeft: 50,
      borderRadius: 40
    };

    return (
      <div className="weteach-index text-center">
        <section className="bg-img" style={{height: viewHeight}}>
          <div className="mask">
            <div className="content">
              <IndexHeader></IndexHeader>
              <h1 className="title">WeTeach</h1>
              <h2 className="sub-title">Online English teaching as it should be!</h2>
              <RaisedButton className="index-start-btn" style={startStyle} labelStyle={labelStyle} label="Start" primary={true} onTouchTap={this.handleStart.bind(this)}></RaisedButton>
            </div>
          </div>
          <div className="arrow-down"><i className="icon-arrow-down" onClick={this.scrollDown.bind(this)}></i></div>
        </section>
        <section className="introduction section-wrap">
          <h1 className="primary-color title">Introduction</h1>
          <p className="intro-words">WeTeach connects teachers with Chinese primary school students to learn together online.</p>
          <p className="intro-words">Our current focus is on English reading comprehension, pronunciation and confidence building.</p>
          <p className="intro-words">Part of our proceeds goes to charities supporting rural education in China.</p>
          <ul className="card-list">
            <li className="card-item card-blue">
              <div className="card-mask">
                <p className="card-desc">Set your own rate of pay and work with students who value your experience, ability, and personal touch.</p>
              </div>
              <i className="icon icon-money"></i>
              <h2 className="title">Self-determined pricing</h2>
            </li>
            <li className="card-item card-gray">
              <div className="card-mask">
                <p className="card-desc">Arrange classes around your lifestyle.</p>
              </div>
              <i className="icon icon-time"></i>
              <h2 className="title">Flexible scheduling</h2>
            </li>
            <li className="card-item card-blue">
              <div className="card-mask">
                <p className="card-desc">A reliable online classroom and resources library with all the materials and tools you could need to teach a great class.</p>
              </div>
              <i className="icon icon-doubt"></i>
              <h2 className="title">Total online classroom solution</h2>
            </li>
            <li className="card-item card-gray">
              <div className="card-mask">
                <p className="card-desc">A special team dedicated to ensuring you can teach without any hiccups.</p>
              </div>
              <i className="icon icon-technology"></i>
              <h2 className="title">Full technical support</h2>
            </li>
            <li className="card-item card-gray">
              <div className="card-mask">
                <p className="card-desc">All administration and customer service handled for you.</p>
              </div>
              <i className="icon icon-Leisure"></i>
              <h2 className="title">No admin</h2>
            </li>
            <li className="card-item card-blue">
              <div className="card-mask">
                <p className="card-desc">Ongoing training and feedback from experienced online teachers.</p>
              </div>
              <i className="icon icon-Professional-"></i>
              <h2 className="title">Professional development</h2>
            </li>
            <li className="card-item card-gray">
              <div className="card-mask">
                <p className="card-desc">A curriculum designed for both student and teacher enjoyment.</p>
              </div>
              <i className="icon icon-Fun"></i>
              <h2 className="title">Fun</h2>
            </li>
            <li className="card-item card-blue">
              <div className="card-mask">
                <p className="card-desc">We welcome you into a vibrant and supportive community of teachers and parents from around the world.</p>
              </div>
              <i className="icon icon-Community"></i>
              <h2 className="title">Community</h2>
            </li>
          </ul>
        </section>
        <section className="video">
          <div className="section-wrap">
            <h1 className="title primary-color">WeTeach Video</h1>
            <p className="sub-title">A vignette from the life of one of our great WeTeach teachers.</p>
            <iframe scrolling="no" allowFullScreen src="http://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FFe_4RJKmaho%3Fwmode%3Dtransparent%26feature%3Doembed&wmode=transparent&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DFe_4RJKmaho%26feature%3Dyoutu.be&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FFe_4RJKmaho%2Fhqdefault.jpg&key=25afbca9c69b4d728fa90e96b92e6b33&type=text%2Fhtml&schema=youtube" frameBorder="0" width="1024" height="576"></iframe>
          </div>
        </section>
        <section className="teachers-thoughts">
          <div className="section-wrap">
            <h1 className="title primary-color">Teachers’ Thoughts</h1>
            <ul>
              <li className="teacher-item clearfix">
                <div className="left avatar">
                  <i className="icon-Patty-Harte"></i>
                  <div>
                    <p className="name">Patty Harte</p>
                    <p className="country">Surrey, England</p>
                  </div>
                </div>
                <div className="left thoughts">
                  <div className="icon-dialogue-left"><p className="thoughts-content">"It's such a privilege to join the children in their homes and to share much-loved stories with them. Their reactions as they see the pages are priceless and utterly enchanting. In teaching you are often giving out so much energy, after story time with WeTeach it is like getting that energy back again.”</p></div>
                </div>
              </li>
              <li className="teacher-item clearfix">
                <div className="left thoughts">
                  <div className="icon-dialogue-right"><p className="thoughts-content">"This has to be one of the best uses of social media on the planet! To bring together students and teachers across the globe, and via the medium of children's literature, is so imaginative and creative, it's joyful!"</p></div>
                </div>
                <div className="left avatar">
                  <i className="icon-Paul-Clutterbuck"></i>
                  <p className="name">Paul Clutterbuck</p>
                  <p className="country">Perth, Western Australia</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="buttons">
            <RaisedButton className="about-button" labelStyle={labelStyle} style={aboutSchool} label="About School" primary={true} onClick={this.aboutSchool.bind(this)}></RaisedButton>
            <RaisedButton className="about-button" labelStyle={labelStyle} style={aboutJob} label="About Job" primary={true} onClick={this.aboutJob.bind(this)}></RaisedButton>
          </div>
        </section>
        <section className="section-wrap contact-us">
          <h1 className="title primary-color">Contact Us</h1>
          <p>If you have any queries, suggestions, or would like to be involved.</p>
          <p>please don't hesitate to contact us at <a href="mailto:teacher@weteach.info" className="primary-color">teacher@weteach.info</a></p>
        </section>
      </div>
    )
  }

  componentWillUnmount () {
    toggleHeader.reset();
  }
}

export default TIndex;
