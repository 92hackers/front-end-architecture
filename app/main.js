// export module. require other modules.

require("./main.less")

import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Test from './components/Test';

const App = () => {
	<MuiThemeProvider>
		<Test />
	</MuiThemeProvider>
};

ReactDom.render(<App />, document.getElementById("app"));
