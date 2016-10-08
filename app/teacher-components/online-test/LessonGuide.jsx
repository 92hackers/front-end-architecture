
import React from 'react';
import api from '../../network/api';
import Quiz from './Quiz';

class LessonGuide extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      questions: []
    };
  }

 componentWillMount () {
   var self = this;
   api.OnlineTestQuestion("",
   { "Authorization": self.props.token},
   5,
   (resp) => {
     if (resp.success) {
       var data = resp.data;
       self.setState({
         questions: data
       });
     }
   },
   (err) => {
     console.error("something wrong.");
   }
  )
 }

  render () {
    return (
      <div>
        <h1>WeTeach Lesson Guide</h1>
        <p>Lessons with a returning student differ from Trial Lessons with new students in that there is less focus on assessment and rapport building (though it is still important) and more focus on task completion.</p>
        <h2>Preparation</h2>
        <h3>Lesson objectives</h3>
        <p>For returning students, there are many possible lesson objectives, but typically you should try to meet the following three aims:</p>
        <ul className="default-list">
          <li>Review previous lesson’s key language and takeaways.</li>
          <li>Inspect homework (if assigned).</li>
          <li>Present and practice new language.</li>
        </ul>
        <h3>Teaching materials selection</h3>
        <p>Resume using materials from any previously unfinished lesson or make a new selection which is in line both with the lesson’s objectives and the student’s interests.</p>
        <h2>Lesson Delivery</h2>
        <h3>Start of the lesson (~3-5mins)</h3>
        <h4>Break the ice</h4>
        <p>Greet your student enthusiastically and engage him or her in casual conversation to lower the student’s anxiety level and prepare him or her for the lesson at hand.</p>
        <h4>Share the lesson’s objective statements</h4>
        <p>Tell the student what you will be covering in the lesson.</p>
        <h3>Middle of lesson (~15-20mins)</h3>
        <h4>Recap the previous lesson’s key takeaways</h4>
        <p>Review any key vocabulary, phrases, or concepts from the previous lesson. Present and practice new language in selected materials.</p>
        <p>In Zoom, use the “Share Screen” function to share the window containing the relevant lesson material.</p>
        <p>Your approach to teaching the rest of the lesson will vary depending on a number of factors, including the student’s age, interests, shyness and English level.</p>
        <h4>Expand with supplementary activities (optional)</h4>
        <p>In order to spice up your lesson, it is often nice to incorporate songs or games. Chinese children are familiar with the tunes (but not the English lyrics) of many popular children’s songs, such as “London Bridge is Falling Down” or “Are you Sleeping, Brother John.”</p>
        <p>Many simple children’s games, can be adapted to make them more suitable to language learning. For example, you can use the Zoom whiteboard to play a modified version of Tic-Tac-Toe (or Noughts and Crosses), where each player must make a complete English sentence to take a turn. Rock, Paper, Scissors may also be adapted so that the loser of each round must do the same. The possibilities are endless. It only takes a little bit of creativity.</p>
        <h3>End of lesson (~1-3mins)</h3>
        <h4>Thank the student for his or her time</h4>
        <p>Chinese students typically have an incredible amount of homework every day. They are also often involved in numerous extracurricular activities that cut into their valued play time. It’s important to acknowledge this and let the student know that you appreciate the opportunity to have lessons together.</p>
        <h4>Summarize what was covered in the lesson</h4>
        <p>If the student’s English level is sufficient, ask him or her to tell you what he or she learned from the lesson. Otherwise, give a summary yourself, such as, “Today we read a story about...and learned the new words…”</p>
        <h4>Give specific feedback about the student’s performance</h4>
        <p>Tell the student at least one thing that he or she did well during the lesson, and also give the student advice on areas for improvement. Keep all feedback positive. This feedback may also be delivered to the student’s parent if he or she is present and can speak English.</p>
        <h2>Lesson Follow-up</h2>
        <h3>Keep a record of which materials were used</h3>
        <p>In order to prevent your future lessons from becoming repetitive, it’s important for you to keep track of which materials have been used.</p>
        <h2>Post-Reading Quiz</h2>
        <p>Please take a moment to answer the following questions to ensure a basic grasp on the material presented above.</p>
        <Quiz questions={this.state.questions}></Quiz>
      </div>
    )
  }

  componentDidMount () {
    window.scrollTo(0,0);
  }
}

export default LessonGuide;
