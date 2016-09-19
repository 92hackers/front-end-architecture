import React from 'react';
import IndexHeader from './IndexHeader';
import toggleHeader from '../utilities/toggleHeader';

class TAboutSchool extends React.Component {

  constructor (props) {
    super (props);
  };

  render () {
    return (
      <section className="t-about-school text-center">
        <section className="bg-img">
          <div className="content">
            <IndexHeader></IndexHeader>
            <h1 className="main-title">About the School</h1>
            <h2 className="main-sub-title">Online English teaching as it should be.</h2>
          </div>
        </section>
        <section className="container">
          <section className="wish">
            <h1 className="title">Why Are We Building WeTeach ?</h1>
            <ul className="icons">
              <li className="icon icon-plant-tree">
                <div className="mask">
                  <p className="content">We want to inspire our students to be the best people they can be through quality, fun, and caring online education, and get parents involved in this process.</p>
                </div>
              </li>
              <li className="icon icon-drink">
                <div className="mask">
                  <p className="content">We want to create fulfilling, flexible, and financially rewarding opportunities for teachers to teach from the comfort of their own home or the beach.</p>
                </div>
              </li>
              <li className="icon icon-love">
                <div className="mask">
                  <p className="content">We want education to be personal, not transactional, where teachers, students, and parents forge lifelong friendships.</p>
                </div>
              </li>
              <li className="icon icon-connect">
                <div className="mask">
                  <p className="content">We want to bring people from all over the world together into a community where they can learn about each other's language, culture and history.</p>
                </div>
              </li>
            </ul>
          </section>
          <section className="community">
            <h1 className="title">Online Community</h1>
            <p>We foster an online community where teachers, parents, </p>
            <p className="last-p">and students can share with and learn from each other.</p>
            <div className="icon icon-circle"></div>
          </section>
          <section className="charity">
            <h1 className="title">Support Society</h1>
            <h2 className="sub-title">Part of our proceeds goes to charities supporting rural education in China.</h2>
            <div className="icon-charity"></div>
          </section>
          <section className="students-video">
            <h1 className="title">Students' Video</h1>
            <p className="last-p">Felix saying thanks for all the help heather has given him</p>
            <iframe width="1024" height="576" src="https://www.youtube.com/embed/-2wJlQ-uxl0?rel=0" frameBorder="0" allowFullScreen></iframe>
          </section>
          <section className="activities">
            <h1 className="title">Offline Activities</h1>
            <p>We organise study tours to the Anglosphere so students can learn more about Western culture </p>
            <p className="last-p">and meet their teachers in person. We also arrange for teachers to visit their students in China.</p>
            <ul className="icons clearfix">
              <li className="icon-one icon icon-horse left"></li>
              <li className="icon-two icon icon-banner left"></li>
              <li className="icon-three icon icon-four-persons left"></li>
              <li className="icon-four icon icon-learning left"></li>
              <li className="icon-five icon icon-play left"></li>
            </ul>
          </section>
          <section className="slogan">
            <p className="slogan-title">"Learning for life. Friendships for life."</p>
          </section>
        </section>
      </section>
    )
  }

  componentDidMount () {
    toggleHeader.set(540);
  }

  componentWillUnmount () {
    toggleHeader.reset();
  }

}

export default TAboutSchool;
