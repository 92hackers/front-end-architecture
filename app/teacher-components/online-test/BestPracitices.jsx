
import React from 'react';
import api from '../../network/api';
import Quiz from './Quiz';

class BestPracitices extends React.Component {

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
   3,
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
        <h1>Online Teaching Best Practices</h1>
        <p>The key challenge of online teaching is building rapport with students.</p>
        <h2>What the Screen Displays</h2>
        <p><strong>Ensure the students sees well organized content.</strong>The screen you present to your student using Zoom’s “Share Screen” function is akin to a traditional classroom’s blackboard; all material on display should be relevant and focused.</p>
        <p><strong>Keep your transitions smooth.</strong> When you take too much time shifting between windows, you you risk losing student engagement. To minimize this risk, make sure that all teaching materials are ready for use and that all non-essential windows and programs are closed.</p>
        <h2>What the Camera Sees</h2>
        <h3>The setup</h3>
        <p><strong>Light yourself from the front with soft lighting.</strong> Don’t be a shadowy figure in a dark room illuminated only by the harsh light of a computer monitor. Position a simple desk lamp behind your computer so that the light hits you square. Alternatively, if teaching during the day, place your computer in front of a window to take advantage of the natural light.</p>
        <p><strong>Use the right camera angle</strong> An upward angle, where you are peering down into the camera, can be unflattering. It’s best to keep your camera as close to eye level as possible.</p>
        <p><strong>Be mindful of your backdrop.</strong> You want your student to be focused on you and the lesson content, not on a distracting background: avoid backlighting, TV screens, or windows.</p>
        <h3>The teacher</h3>
        <p><strong>Wear proper attire.</strong> Put forth the best image possible; you’re on camera after all. Regular business casual is fine.</p>
        <p><strong>Make eye contact with the camera.</strong> Many people tend to look into the eyes of the person on the screen with whom they’re talking. However, for the person on the other end, it looks like you are looking away. To “make eye-contact,” you actually need to look at the camera</p>
        <p><strong>Keep the right distance.</strong> Most of today’s webcams have a wide-angle lens. If you sit too close, they can unflatteringly magnify your nose and chin to larger than normal proportions. To avoid this “garden gnome” effect, sit far enough away from the camera so that your upper torso and head are both within the frame.</p>
        <p><strong>Smile for the camera.</strong> Nothing helps break the ice and put a person at ease better than a smile.</p>
        <p><strong>Sit up straight.</strong> To your student, slouching may make you seem tired or uninterested. If you sit up straight, you’ll appear more enthusiastic. It’s also good for your health!</p>
        <p><strong>Use deliberate and exaggerated gestures to get your point across.</strong> Students new to English may have trouble understanding even the simplest of instructions. Below are some simple gestures to help you convey your message. Please keep in mind that your movements need to be slow enough to be caught on camera</p>
        <div className="img"><img src="/images/gestures.png" alt="gestures"/></div>
        <h2>What the Microphone Picks up</h2>
        <p><strong>Minimize unwanted noise and echo.</strong> Background noise and echo can be distracting for both you and the student. It can also make it harder for the student to clearly hear your pronunciation. To find which place would be least echoey for class, you can clap your hands together loudly. The less the echo, the better the sound quality will be.</p>
        <h2>When Offline and Online Worlds Collide</h2>
        <p><strong>Use props and realia.</strong> Online classes can be more impersonal than offline classes because they occur in cyberspace. To bring you closer together with your student, you should try to involve both of your offline environments as much as possible. Bring real, physical objects into the lesson and ask your students to do the same. Talking about or playing with a stuffed animal, toy, or piece of fruit can pique a flagging student’s interest, calm a nervous student, or just make the class more fun.</p>
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

export default BestPracitices;
