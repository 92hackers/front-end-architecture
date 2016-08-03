// use calendar component.
//
//

import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet

class Date extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    var today = new Date();
    return (
      <div className="date">
        <InfiniteCalendar
          width={"100%"}
          height={600}
          selectedDate={today}
          keyboardSupport={true}
        />
      </div>
    )
  }
}

export default Date;
