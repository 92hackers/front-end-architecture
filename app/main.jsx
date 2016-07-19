// export module. require other modules.

import React from 'react';
import ReactDom from 'react-dom';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import Test from './components/Test.jsx';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import Index from './components/index/Index';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="weteach">
        <SiteHeader></SiteHeader>
        <Index></Index>
        <SiteFooter></SiteFooter>
        <ul id="beian">
          <li> &copy;&nbsp;WeTeach</li>
          <li>沪ICP备 1111111</li>
        </ul>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById("app"));
