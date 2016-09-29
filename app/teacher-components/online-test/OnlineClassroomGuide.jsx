import React from "react";
import api from '../../network/api';
import Quiz from './Quiz';

class OnlineClassroomGuide extends React.Component {

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
   1,
   (resp) => {
     if (resp.success) {
       var data = resp.data;
       self.setState({
         questions: data
       });
     }
   },
   (err) => {
     console.log("some wrong.");
   }
  )
 }

 render () {
   return (
     <div>
       <h1>Online Classroom Guide</h1>
       <h2>Zoom</h2>
       <p>WeTeach classes are conducted through Zoom, a powerful online video conferencing platform. You will need to create a Zoom account and download the Zoom computer application by following these instructions:</p>
       <h3>Creating a Zoom account</h3>
       <ul className="decimal-list">
         <li>Visit the Zoom homepage at <a href="https://zoom.us/">https://zoom.us</a>.</li>
         <li>Enter your email and Click "Sign Up Free".</li>
         <li>Click “Sign Up”. A message will appear informing you a confirmation email has been sent to the email address you entered.</li>
         <li>Open your email. Click the link: “Click here to activate your account”.</li>
         <li>The “Activate your Account page” will open in your Internet Browser.</li>
         <li>Enter your name and a password.</li>
         <li>Click “Activate” to activate your Zoom account.</li>
         <li>You will now be able to use your Zoom account.</li>
       </ul>
       <h3>Downloading Zoom for your Windows Machine or Mac OSX</h3>
       <p>Visit https://zoom.us/support/download using a computer running Windows or Mac OSX. The download will start automatically.</p>
       <p>Once you have created your Zoom account and downloaded the computer application, you’ll be ready to begin hosting online meetings (classes) by following these steps:</p>
       <ul className="decimal-list">
         <li>Visit https://zoom.us/ and log in. You’ll be redirected to your Zoom “Meetings” page.</li>
         <li>Click on the “Start” button to launch the Zoom computer application.</li>
         <li>You will be prompted by a pop-up window asking, “How do you want to join the audio conference?” Click on the “Join Audio Conference by Computer” button.</li>
         <li>You are now in your Personal Meeting Room, where you’ll be conducting your online lessons. In order for a student to enter your Personal Meeting Room, he or she will need to know your Personal Meeting ID, which you can find by visiting your online Zoom profile page here: https://www.zoom.us/profile.</li>
         <li>Please send your Personal Meeting ID to teacher@weteach.info, so that we can make this known to students once they have decided to study with you.</li>
       </ul>
       <h3>Starting a Zoom Meeting</h3>
       <ul className="decimal-list">
         <li>Once you have created a Zoom account and downloaded and installed the Zoom application to your computer, log in and navigate to your “My Meetings” page at https://www.zoom.us/meeting.</li>
         <li>You will see information about your Personal Meeting Room. Click on the “Start” button to launch the Zoom computer application. </li>
         <li>You will be presented with a pop-up window asking “How do you want to join the audio conference? Click “Join Audio Conference by Computer.” </li>
         <li>You will now be in your Personal Meeting Room. </li>
       </ul>
       <h3>Useful Functions </h3>
       <p>Zoom has many powerful functions. You can learn more about them by visiting the Zoom Help Center at <a href="https://support.zoom.us">https://support.zoom.us</a>. For our purposes, we’ll focus only on the two functions you’ll be using most frequently, Screen Sharing and Annotations. </p>
       <h4>Screen Sharing</h4>
       <ul className="decimal-list">
         <li>Click on the “Share Screen” button in the meeting toolbar.
           <div className="img"><img src="/images/screen-1.png" alt="screen"/></div>
         </li>
         <li>You can choose to share your "Desktop" or an "individual application/window". You can also select to share "computer audio" when sharing a video clip such as YouTube or a locally stored video clip.
           <div className="img"><img src="/images/screen-2.png" alt="2"/></div>
         </li>
         <li>You then be presented with the below Screen Share Menu and its features:
           <div className="img">
             <img src="/images/screen-3.png" alt=""/>
           </div>
           <ul className="default-list">
             <li><strong>Pause:</strong> Pause your current screen share. </li>
             <li><strong>Share a New Window:</strong> Select a new window to share (Choose another window/application to share). </li>
             <li><strong>Annotate:</strong> Use screen share tools for drawing, pointer, etc. </li>
             <li><strong>Remote Control:</strong> Allow participant to control your keyboard and mouse. </li>
             <li><strong>Mute:</strong> Toggle mute/unmute for your microphone. </li>
             <li><strong>Stop Video:</strong> Stop/Start your in-meeting video feed. </li>
             <li><strong>More:</strong> In-meeting Toolbar options (in-meeting options such as - Participants, Chat, Invite, Hide video panel etc). </li>
           </ul>
         </li>
       </ul>
       <h4>Annotations</h4>
       <p>During your Screen share you will have the option of using several features. By moving your mouse cursor to the top of the screen to open the drop-down menu and select "Annotate”. You will then be presented with the following annotation tools: </p>
       <div className="img"><img src="/images/screen-4.png" alt="4"/></div>
       <p>The annotation tools are self-explanatory, but they do take practice in order to become proficient in their use. </p>
       <h3>Manage Participants </h3>
       <p>If you are scheduled for two back-to-back lessons, you may encounter a student entering your Zoom Personal Meeting Room too early while the lesson preceding his or her own is still in session. If this happens, you’ll need to remove him or her from the Meeting Room so that your lesson is not interrupted: </p>
       <ul className="decimal-list">
         <li>Click on the “Manage Participants” button in the meeting toolbar.</li>
         <li>In the “Participants” side pane that opens on the right, find the name of the participant you’d like to remove and click on the “More” button that appears next to his or her name.</li>
         <li>Click on “Remove.”</li>
       </ul>
       <h2>Follow-up Quiz</h2>
       <p>Before proceeding, please take a moment to provide us with your Zoom Personal Meeting ID and answer a few questions about the Zoom annotation tools:</p>
       <Quiz questions={this.state.questions}></Quiz>
     </div>
   )
 }
}

export default OnlineClassroomGuide
