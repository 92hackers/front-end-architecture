import React from "react";

class Quiz extends React.Component {

 constructor (props) {
     super (props)
     this.state = {
       questions: this.props.questions
     }
 }

 componentWillMount () {
   var self = this;
 }

 componentWillReceiveProps (nextProps) {
   var questions = nextProps.questions;
   if (questions !== this.props.questions) {
     this.setState({
       questions: questions
     });
   }
 }

 render () {
   return (
     <ul className="decimal-list">
       {
         this.state.questions.map((item, index) => {
           var ans = item.ans;
           return (
             <li key={index}>
               <p>{item.qes}</p>
               <ul className="upper-alpha-list">
                 <li>
                   <span className="value">{ans.a}</span>
                   <input type="radio" name={"quiz" + index} data-label="a" data-qid={item.qid} value={ans.a}/>
                 </li>
                 <li>
                   <span className="value">{ans.b}</span>
                   <input type="radio" name={"quiz" + index} data-label="b" data-qid={item.qid} value={ans.b}/>
                 </li>
                 <li>
                   <span className="value">{ans.c}</span>
                   <input type="radio" name={"quiz" + index} data-label="c" data-qid={item.qid} value={ans.c}/>
                 </li>
                 <li>
                   <span className="value">{ans.d}</span>
                   <input type="radio" name={"quiz" + index} data-label="d" data-qid={item.qid} value={ans.d}/>
                 </li>
               </ul>
             </li>
           )
         })
       }
     </ul>
   )
 }
}

export default Quiz
