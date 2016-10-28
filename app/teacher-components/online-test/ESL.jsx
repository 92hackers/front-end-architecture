import React from 'react';
import Quiz from './Quiz';

class ESL extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getTestQuestions(2)
  }

  /* eslint max-len: [0] */
  render() {
    return (
      <div>
        <h1>ESL Teaching Concepts and Principles</h1>
        <h2>Student Talking Time vs Teacher Talking Time</h2>
        <p>Outside of the classroom, most Chinese ESL students have few opportunities to practice speaking English. Therefore, as a teacher, you should strive to maximize the Student Talking Time (STT) during each lesson. To do this, you need to limit your own Teacher Talking Time (TTT). Be succinct  and keep your instructions concise.</p>
        <h3>Echoing</h3>
        <p>“Echoing” is very common cause of unnecessarily high TTT. Echoing is when the student makes a correct utterance, and the teacher repeats this utterance as a way of signalling his or her approval. It’s a natural tendency for many teachers, but you should avoid it because it shifts the focus from the student to the teacher. Instead, use different words to praise your student.</p>
        <h2>Graded Language</h2>
        <p>When speaking with an ESL student, you should speak at a level that matches his or her language ability. To do this, you will need to have an idea of your student’s language level and working knowledge of the lexis and grammar structures typical of students at various stages in their English language development.</p>
        <h2>Error Correction</h2>
        <h3>What to correct</h3>
        <p>Regular feedback is important to language learning, but the you must exercise judgement in order to avoid derailing a lesson and lowering the student’s confidence.</p>
        <p>As a general rule of thumb, correct student errors that (1) pertain to an activity’s target language or (2) impede understanding.</p>
        <h3>When to correct</h3>
        <p>You must also know the appropriate time to make an error correction so that the flow of the conversation is not interrupted. Broadly speaking, there are two types of error corrections, “hot corrections” and “cold corrections.”</p>
        <p>“Hot corrections” occur immediately after the student utters an error. They should be used when the focus of the activity is accuracy, such as in pronunciation or grammar drills.</p>
        <p>“Cold corrections”, on the other hand, occur at the end of an activity. They should be used when the focus of the activity is fluency, such as in a role play or discussion. To do this, you should note down student errors as they occur and review them with the student after the activity.</p>
        <h3>How to correct</h3>
        <p>The optimal sequence of error correction is:</p>
        <ul className="decimal-list">
          <li><strong>Self-correction.</strong> With prompting, allow the student to correct his or her own error.</li>
          <li><strong>Teacher correction.</strong> If the student is unable to correct his or her own error, you should correct it yourself.</li>
        </ul>
        <p>Following this error correction sequence helps keep the lesson student-centered, which should always be one of your biggest aims as a teacher.</p>
        <h2>Elicitation</h2>
        <p>Elicitation is a teaching technique whereby the teacher uses prompts and guided questions to get a student to provide the desired language output rather than simply giving the student the information.</p>
        <p>This helps (1) the teacher ascertain the student’s familiarity with the topic or language at hand, (2) reinforce previously-learned language, and (3) keep the lesson student-centered.</p>
        <p>For example, if you want your student to give you a verb, you may chose to mime the word. If you’re trying to elicit the name of a common household appliance, you may describe what the thing is used for or simply show the student a picture of it.</p>
        <h2>Concept Checking Questions</h2>
        <p>To test whether or not your student has grasped a concept, you should ask a Concept Checking Question (CCQ). A good CCQ is typically a closed question with a single, clear, correct answer.</p>
        <p>For example, after reading a passage from a story containing the sentence, “The boy was famished,” you may want to test the student’s understanding of the word “famished.” You may do this by asking the student, “Had the boy eaten recently?” (No.) Alternatively, you may tell the student, “Please give me another word for “famished.”</p>
        <h2>Post-reading Quiz</h2>
        <p>Please take a moment to answer the following questions to ensure a basic grasp on the material presented above.</p>
        <Quiz questions={this.state.questions} />
      </div>
    )
  }
}

export default ESL;
