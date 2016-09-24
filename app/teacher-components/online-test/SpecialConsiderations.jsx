import React from "react";
import api from '../../network/api';
import Quiz from './Quiz';

class SpecialConsiderations extends React.Component {

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
   4,
   (resp) => {
     if (resp.success) {
       var data = resp.data;
       self.setState({
         questions: data
       });
     }
   },
   (err) => {
     alert("something wrong.");
   }
  )
 }

 render () {
   return (
     <div>
       <h1>Special Considerations for Chinese Students</h1>
       <p>Teaching Chinese students presents a number of challenges for teachers who are not familiar with the characteristics of learners from Asia’s largest country. The following information should serve as a useful primer.</p>
       <h2>Language Characteristics</h2>
       <p>It’s difficult to think of two languages that are more unalike than English and Chinese.</p>
       <p>Firstly, the Chinese language has no alphabet. The writing system comprises thousands of monosyllabic characters, which Chinese students typically learn through hours upon hours of repetition.</p>
       <p>Secondly, Chinese is a tonal language, meaning that a single-syllable uttered in a rising, falling, or neutral tone, may have three distinctly different meanings. This is partially the cause of many Chinese speakers staccato tone when speaking English.</p>
       <p>You certainly don’t need to be able to speak Chinese to effectively help Chinese students, but it does help to be aware of some common errors that Chinese students make when speaking English. Here are a few:</p>
       <ul className="default-list">
         <li>In spoken Chinese,  “he,” “she,” and “it” are homonyms; thus, students often confuse these pronouns in English.</li>
         <li>There is no verb conjugation in Chinese, so Chinese learners usually struggle with both verb tense and verb-object agreement.</li>
         <li>Chinese students often confuse word order when forming questions, particularly indirect questions (e.g., “Could you tell me what time it is?”), because the word order of both statements and questions in Chinese is typically the same.</li>
         <li>There is no distinction between plural and singular nouns in Chinese, so students will often omit the final “s” in a plural noun.</li>
         <li>There is no equivalent of the articles “a” and “the” in Chinese, so students often confuse the two or omit them entirely.</li>
         <li>As Chinese is a monosyllabic language, multi-syllable English words can be challenging.</li>
         <li>Chinese students often have trouble with English words ending in a consonant and will tend to tack an extra syllable on to the end. For example, the word “desk” may be pronounced “des-ka.”.</li>
       </ul>
       <h2>Cultural Characteristics and How to Adapt to Them</h2>
       <p>In general, the Chinese educational system has encouraged two approaches to learning: rote memorization and passive learning.</p>
       <h3>Rote memorization</h3>
       <p>Chinese students have been known to memorize entire passages of text word-for-word only to regurgitate this information in the form of a response to an essay question on an exam. However, learning a language is quite different from learning subject matter in that you are developing a skill and not simply soaking up information. Therefore, you’ll want to give your student every possible opportunity to speak and encourage him or her to respond to your questions using varied responses rather than canned ones.</p>
       <h3>Passive learning</h3>
       <p>In a traditional Chinese classroom setting, teachers don’t often solicit their students’ opinions. Instead, teachers typically see themselves as the fount of knowledge and the students as empty vessels to be filled.</p>
       <p>While some Chinese students can certainly be outgoing, on the whole you can expect them to be more reticent. Added to the general unease one can expect when speaking to a stranger from another country for the first time, many students will take some time to come out of their shells. Just be patient and empathetic.Give effusive praise. It is worth the wait!</p>
       <h2>Post-Reading Quiz</h2>
       <p>Please take a moment to answer the following questions to ensure a basic grasp on the material presented above.</p>
       <Quiz questions={this.state.questions}></Quiz>
     </div>
   )
 }
}

export default SpecialConsiderations
