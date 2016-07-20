// homepage main content.

import React from 'react';

class Homepage extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <aside className="col-3">
            <div className="child-profile">
            </div>
            <div className="nav-items">
              <ul className="items-list">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </aside>
          <main className="col-9">
            <div className="recently-activities">

            </div>
            <div className="main-content">
            </div>
            <div className="courses-schedule">

            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default Homepage;
