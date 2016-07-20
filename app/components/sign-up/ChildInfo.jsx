// parents complete child info on this page.

import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';

class ChildInfo extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSubmit (e) {

  }

  render () {
    const styles = {
      radioButtonGroup: {
        marginBottom: -20
      },
      radioButton: {
        width: "initial",
        display: "inline-block",
        "marginRight": 50
      }
    }
    return (
      <div className="child-info">
        <h1 className="child-info-caption">为了更好的为您的孩子提供服务，请补充孩子的信息!</h1>
        <form action="/child_info" id="child-info-form" method="post">
          <TextField type="text" floatingLabelText="名字"></TextField>
          <br/>
          <TextField type="text" floatingLabelText="英文名"></TextField>
          <br/>
          <p id="gender-caption">性别</p>
          <RadioButtonGroup name="gerder" defaultSelected="male" style={styles.RadioButtonGroup}>
            <RadioButton value="male" label="男" style={styles.radioButton}/>
            <RadioButton value="female" label="女" style={styles.radioButton}/>
          </RadioButtonGroup>
          <br/>
          <DatePicker hintText="他的生日是哪一天" autoOk={true} cancelLabel="取消" okLabel="确定"></DatePicker>
          <br/>
          <TextField type="text" floatingLabelText="兴趣爱好"></TextField>
          <br/>
          <br/>
          <br/>
          <FlatButton type="submit" label="提交" className="submit-form" primary={true} onClick={this.handleSubmit}></FlatButton>
        </form>
      </div>
    )
  }
}

export default ChildInfo;
