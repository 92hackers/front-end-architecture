import React from 'react';

class TAboutSchool extends React.Component {

  constructor (props) {
    super (props);
  };

  render () {
    return (
      <section className="t-about-school text-center">
        <section className="bg-img">
          <div className="content">
            <h1 className="main-title">About School</h1>
            <h2 className="main-sub-title">Online English teaching as it should be.</h2>
          </div>
        </section>
        <section className="container">
          <section className="wish">
            <h1 className="title">Why Are We Building WeTeach</h1>
            <ul className="icons">
              <li className="icon icon-plant-tree"></li>
              <li className="icon icon-drink"></li>
              <li className="icon icon-love"></li>
              <li className="icon icon-connect"></li>
            </ul>
          </section>
          <section className="community">
            <h1 className="title">Online Community</h1>
            <p>We foster an online community where teachers, parents, </p>
            <p>and students can share with and learn from each other.</p>
            <div className="icon icon-circle"></div>
          </section>
          <section className="charity">
            <h1 className="title">Support the Society</h1>
            <h2 className="sub-title">Part of our proceeds goes to charities supporting rural education in China.</h2>
            <div className="icon-charity"></div>
          </section>
          <section className="students-video">
            <h1 className="title">Students' Video</h1>
            {/* student video. */}
          </section>
          <section className="activities">
            <h1 className="title">Offline Activities</h1>
            <p>We organise study tours to the Anglosphere so students can learn more about Western culture </p>
            <p>and meet their teachers in person. We also arrange for teachers to visit their students in China.</p>
            <ul className="icons">

            </ul>
          </section>
        </section>
      </section>
    )
  }
}

export default TAboutSchool;
