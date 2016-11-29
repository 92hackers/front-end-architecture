import React from 'react';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import nprogress from 'nprogress';
import { autobind } from 'core-decorators'

import WaitForSubmit from './universal/WaitForSubmit';
import { emailValidate } from '../utilities/filter'

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      notification: '',
      dialogOpen: false,
      dialogTitle: '',
      dialogContent: '',
    };
  }

  @autobind
  handleSubmit(e) {
    e.preventDefault();

    const { signUp, showNotification } = this.props
    const self = this;
    let warn = ''

    const firstName = document.getElementById('t-first-name').value;
    const lastName = document.getElementById('t-last-name').value;
    const emailValue = document.getElementById('t-email').value;
    const passwordValue = document.getElementById('t-password').value;
    const rePassword = document.querySelector('#t-re-password').value;

    if (!firstName) {
      warn = 'Please enter your first name.'
    } else if (firstName.length < 2 || firstName.length > 30) {
      warn = 'First name must be between 2 and 30 characters in length.'
    } else if (!lastName) {
      warn = 'Please enter your last name.'
    } else if (lastName.length < 2 || lastName.length > 30) {
      warn = 'Last name must be between 2 and 30 characters in length.'
    }

    if (!warn) {
      warn = emailValidate(emailValue)
    }

    if (!warn) {
      if (!passwordValue || !rePassword) {
        warn = 'Please input correct password.'
      } else if (passwordValue.length < 6 || rePassword.length < 6
        || passwordValue.length > 20 || rePassword.length > 20
      ) {
        warn = 'Passwords must be between 6 and 20 characters in length.'
      } else if (passwordValue !== rePassword) {
        warn = 'New passwords do not match.'
      }
    }

    if (warn.length > 0) {
      showNotification(warn);
      return;
    }

    const data = {
      firstname: firstName,
      lastname: lastName,
      email: emailValue,
      password: passwordValue,
      reflink: document.referrer,
    };

    nprogress.start();
    this.refs.loader.displayLoader();

    signUp(data).then((res) => {
      self.refs.loader.hideLoader();
      nprogress.done();
      if (res.payload.success) {
        const url = '/active-email?user_name=s@x^nil*@(<)'
        browserHistory.push(url);         //  jump to  Active your email notification page.
      } else if (res.payload.data.email.length > 0) {
        showNotification('This email address had already been registered.')
      }
    })
  }

  @autobind
  open() {
    this.setState({
      dialogOpen: true,
    });
  }

  @autobind
  close(e) {
    e.preventDefault();
    this.setState({
      dialogOpen: false,
    });
  }

  /* eslint max-len: 0 */
  @autobind
  handleTermsClick(e) {
    e.preventDefault();

    const content = (
      <div className="privacy-content">
        <h2>Standards of Teaching</h2>
        <p>The WeTeach Teacher Code of Conduct serves as general teaching guidelines for all WeTeach Teachers. The purpose of our WeTeach Teacher Code of Conduct is to:</p>
        <ul>
          <li>Encourage the highest standards of behavior for all teachers in their relationships with WeTeach students by setting out clear statements of expectation; and,</li>
          <li>Provide a set of principles to guide teachers in their everyday conduct and assist them when interacting and teaching WeTeach students</li>
        </ul>
        <p>As our teachers come from all over the world and may adhere to different cultural norms, our WeTeach Teacher Code of Conduct has been created based on universal accepted standards of respect and tolerance.  It does not cover every specific situation but provides guidelines for ethical and professional behavior.</p>
        <br />
        <br />
        <h2>WeTeach Teacher Code of Conduct</h2>
        <h3>Patience and Politeness:</h3>
        <p>Since students come from different backgrounds and have different language levels, it is important to be patient and polite and help them through their language learning difficulties. Encourage them! Help them grow as language learners and as people.</p>
        <ul>
          <li>Maintain a friendly, warm, and caring learning environment: Do not berate, yell, or insult students. Do not tell them they are dumb or insult their current level of language ability</li>
          <li>Give respect to gain respect: Do not use rude or foul language. Teach using respectful language and professional courtesy</li>
          <li>With patience and love, nothing is impossible: Do not lose your temper with a student. If you are not sure that you will be able to handle a situation with composure, you are welcome to contact WeTeach Support (teacher(at)WeTeach(dot)info).</li>
        </ul>
        <h3>Providing a Professional Service:</h3>
        <p>As teachers on WeTeach, students are paying for your services. Teachers must take the initiative in communicating with and managing students.</p>
        <p>Professionalism includes:</p>
        <ul>
          <li>Responsiveness: Be prompt in confirming sessions requests</li>
          <li>Responsibility and Reliability: Maintain your calendar to accurately reflect the times you can be available for lessons. Prioritize the commitments you make with your students, only rescheduling or canceling when necessary and after communicating with WeTeach or your student. If you know you’ll be away and unable to respond to students, take the responsibility to notify your students of your absence and update your profile accordingly.</li>
          <li>Initiate Sessions on Time: Teachers should always be on the online classroom on time before the class starts</li>
          <li>End Sessions on Time: Teachers should politely let students understand that their sessions are ending by reminding their session will be coming to a close 5 – 10 minutes before the session ends. You can always politely tell the student you need to prepare for an upcoming session with another stu</li>
          <li>Actively Manage Your Profile: Regularly check in to answer messages, adjust your time availability schedule and update your status. If you plan to take time off, update your profile accordingly to remove yourself from active teacher listings.</li>
          <li>Teach Your Language:  Students are paying you to teach them a new language. Do not use this time to practice the student’s native language. Try to give students more speaking time</li>
        </ul>
        <h2>Violations of WeTeach Policy or Terms of Service</h2>
        <p>WeTeach reserves the right to deactivate teaching accounts that are found to be in violation of WeTeach teaching policy. If you are concerned that something you’re doing might be considered a violation, please contact WeTeach Support to ask first</p>
        <p>Major teaching account violations include, but are not limited to:</p>
        <ul className="list-unstyled">
          <li>
            <h4>1. Violations of WeTeach Community Guidelines</h4>
            <p>WeTeach Teachers are part of the WeTeach Community.  Please help us maintain a positive language-learning environment. As such, do not engage in spamming, disrespectful language, obscenities, put-downs, theft of personal information, etc.</p>
          </li>
          <li>
            <h4>2. Violations of WeTeach Teacher Code of Conduct</h4>
            <p>As an online educator on WeTeach, language students around the world are trusting you. Be timely, professional, and responsible in your communications with students both on WeTeach and during teaching sessions. If you will be away and unable to respond, take the necessary steps to inform students and update your profile accordingly. WeTeach Teacher Code of Conduct is outlined at the top of this page.</p>
          </li>
          <li>
            <h4>3. WeTeach System Policy Violations</h4>
            <p>Do not:</p>
            <ul>
              <li>Post false, misleading, inaccurate, or plagiarized information;</li>
              <li>Advertise or promote competing services;</li>
              <li>Post private contact information or encourage students to pay outside of the WeTeach platform;</li>
              <li>Neglect to maintain your WeTeach teaching profile with complete, accurate, and updated information; and</li>
              <li>Manage multiple WeTeach accounts</li>
            </ul>
          </li>
        </ul>
        <h2>Providing your Teaching Services on WeTeach</h2>
        <b>WeTeach encourages open, complete and professional communication between</b>
        <p><b>Students and Teachers.</b> Open communication helps Teachers to personalize relevant curriculum to your students and students to make informed decisions. In the event of a dispute, all written and recorded communication on WeTeach will serve as the record for resolution of the dispute.</p>
        <p><b>Provide accurate and respectful feedback</b> WeTeach provides a feedback system as a means through which users can express their opinions. If a particular user’s feedback counts as abuse of the system, it should be reported to WeTeach Support (see the Terms of Service for details)</p>
        <p><b>Complete the Teacher registration process, providing true, accurate, complete information</b> Update your information to maintain its truthfulness, accuracy and completeness. From time to time, your account may be subject to verification as well as editorial and feedback reviews. WeTeach can suspend or terminate your account upon the discovery that any information you provided or posted is not complete or accurate, or as a result of other violations of the Terms of Service </p>
        <p><b>Guidelines for Providing your Services</b></p>
        <p>You agree to utilize the following service provider guidelines:</p>
        <ul>
          <li>Once you have received a teaching request, use WeTeach to manage the request and deliver the class</li>
          <li>Inform WeTeach and/or the Student of your availability and committed response time</li>
          <li>Inform WeTeach and/or the Student if a committed deliverable will be missed, offering an explanation and proposing a revised date</li>
          <li>If you are unable to complete a session, alert us so that WeTeach is aware of the situation and can offer assistance to the Student</li>
          <li>Respond promptly, within 1 business day, to all session-related communication, whether from the Student or from WeTeach</li>
          <li>Utilize WeTeach’s Payment Service to maintain the privacy of your personal financial Account details; leverage WeTeach’s anti-fraud measures; maintain a record of all invoices and payments; add the project, feedback and transaction amount to your profile;and, in the event of a problem, have access to WeTeach’s Dispute Resolution process</li>
          <li>After the session is completed, leave objective, balanced feedback.
          Violation of these guidelines may result in suspension or termination of your Account. If you are aware of a potential violation, please contact Customer Service</li>
        </ul>
        <h2>Cancellation and Refunds</h2>
        <p><b>WeTeach encourages teachers and students to communicate, reach an agreement, and settle issues together</b> However, in the event that a disagreement or reported problem is raised to be a dispute and WeTeach is asked to mediate, we will use the guidelines outlined in the Terms of Service. WeTeach’s decision on the dispute is final. Please note that in the case of a dispute, it is up to the teacher and the student to provide proof to WeTeach to support their positions</p>
        <h2>WeTeach Fees</h2>
        <p><b>WeTeach charges a 20% fee on top of transactions between teachers and students</b> This figure is also rounded up. This fee is charged when a lesson is confirmed by the student.
        </p>
        <p><b>Why does WeTeach charge 20%?</b> WeTeach is free for teachers to sign up and create a profile; WeTeach charges a 20% commission on top of each lesson taught. This fee is charged for use of the WeTeach platform and services, and also due to the marketing cost of acquiring new students to the platform. You are only charged when you tutor a session, so you will only be charged when you’re making money teaching on WeTeach.</p>
        <h2>Taking students off of WeTeach</h2>
        <p>WeTeach does not tolerate teachers trying to take students off of WeTeach. Teachers who are caught attempting to take students off the system will have their accounts deactivated. WeTeach will also confiscate any income earned through WeTeach, as well as delete all your lesson and teaching history. Do not do this</p>
        <h2>Promoting other language services</h2>
        <p>WeTeach understands and accepts that teachers may not teach exclusively on WeTeach and may work full or part time at other language training companies. However, when teaching on WeTeach, teachers are not allowed to promote or represent these other companies. If you are promoting another company, particularly a competing company, this will lead to your account being deactivated, forfeiture of your earned WeTeach Credits, and deletion of your history</p>
        <p>At WeTeach, if you are a good teacher, there is no reason why you should be working for another company. Quite simply, you should only work for yourself. You should be able to set your own teaching rates, earn your own money and have complete control over your teaching schedule.</p>
        <h2>CONTACTING CUSTOMER SERVICE</h2>
        <p>If you wish to report a violation of Site Policies, have any questions or need assistance, please contact WeTeach Customer Service as follows:</p>
        <p><b>Online Suppor:</b><a href="http://teacher.WeTeach.info" rel="noopener noreferrer" target="_blank"> http://teacher.weTeach.info</a></p>
        <p><b>Email: </b><a href="mailto:teacher@WeTeach.info">teacher@WeTeach.info</a></p>
      </div>
    )

    this.setState({
      dialogTitle: 'WeTeach Teacher Policies & Teacher Code of Conduct',
      dialogContent: content,
    });
    this.open();
  }

  @autobind
  handlePrivacyClick(e) {
    e.preventDefault();
    const content = (
      <div className="privacy-content">
        <h2>PRIVACY POLICY</h2>
        <p>This policy covers how www.WeTeach.info, (&quot;WeTeach.info,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) treats personal information that it collects and receives on www.WeTeach.info. This notice tells you what information we collect, steps we take to protect and secure it, how we use and share information, and finally, how you can contact us with questions or concerns.</p>
        <h3>Information We Collect</h3>
        <ul>
          <li>WeTeach collects personal information when you register with us, use WeTeach products or services or post content on a WeTeach site.</li>
          <li>WeTeach may also collect personal information when you enter into promotions or sweepstakes.</li>
          <li>WeTeach may combine information about you that we have with information we obtain from business partners or others. </li>
          <li>WeTeach may also collect information about your transactions with us and with some of our business partners. This information might include information necessary to process payments due to us from you such as your credit, bank, or other card number or numbers.</li>
          <li>WeTeach may automatically receive and record information on our server logs from your browser, including your IP address, cookies, and the pages you request</li>
          <li>You may register to join WeTeach directly via WeTeach or by logging into your account with a third party social networking service (“SNS”) (e.g., Facebook, LinkedIn and other third party services that let you sign in using your existing credentials with those services). If you choose to register via an SNS, or to later link your account with the Service to your account with an SNS, we will use the Personal Information you have provided to the SNS (such as your name, email address, gender and other information you make publicly available via the SNS) to create your account. Note that the information we collect from and through an SNS may depend on the privacy settings you have set with the SNS and the permissions you grant to us in connection with linking your account with the Service to your account with an SNS. Other than what we may share with the SNS as described below, the Personal Information an SNS has about you is obtained by the SNS independent of our service, and WeTeach is not responsible for it.</li>
          <li>WeTeach may also permit additional interactions between it and a third party website, service, or other content provider, such as enabling you to “like” or share content to a third party SNS. If you choose to “like” or share content, or to otherwise share information from or via WeTeach with a third party site or service, that information may be publicly displayed, and the third party may have access to information about you and your use of WeTeach (and we may have access to information about you from that third party). These features may collect your IP address, which page you are visiting on our site, and may set a cookie to enable the feature to function properly. Your interactions with third parties through an SNS or similar features are governed by the respective privacy policies of those third parties.</li>
          <li>You represent that you are entitled to use your SNS account for the purposes described herein without breach by you of any of the terms and conditions that govern the SNS, and without obligating WeTeach to pay any fees or making WeTeach subject to any usage limitations imposed by such SNS. Please note that your relationship with any SNS is governed solely by your agreement(s) with such SNS. If your SNS account terminates, then functions enabled through the link between your WeTeach account and your SNS account will terminate as well.</li>
          <li>WeTeach may combine personal and non-identifying information. Certain non-identifying information would be considered a part of your personal information if it were combined with other identifiers in a way that enables you to be identified (for example, combining information with your name). But the same pieces of information are considered non-identifying information when they are taken alone or combined only with other non-identifying information (for example, your viewing preferences). We may combine your personal information with non-identifying information.</li>
          <li>WeTeach may also collect third party personal information when you refer our services to them or in other ways. We may collect personal information from you about your contacts or friends, including but not limited to the following: first name, last name, and email address when you provide it to us through registration or any other process</li>
          <li>We also may receive information about you from third parties. For example, we may supplement the information we collect with outside records or third parties may provide information in connection with a co-marketing agreement or at your request (such as if you choose to sign in with a third-party service). If we combine the information we receive from others with information we collect through the Service, we will treat the combined information as described in this Privacy Policy</li>
        </ul>
        <h3>IP Address</h3>
        <p>WeTeach may occasionally obtain IP addresses from users depending upon how you access our web sites. IP addresses, browser and session information may be used for various purposes, including to:</p>
        <ul>
          <li>Diagnose and prevent service or technology problems reported by our users or engineers that are associated with the IP addresses controlled by a specific web company or ISP.</li>
          <li>Estimate the total number of users visiting WeTeach.info&apos;s web sites from specific geographical regions.</li>
          <li>Help determine which users have access privileges to certain content, services or resources that we offer. - Monitor and prevent fraud and abuse</li>
          <li>Provide more relevant advertisements to you</li>
        </ul>
        <h3>Web Beacons</h3>
        <p>We and our marketing partners, affiliates, analytics, and service providers may also employ software technology known as “web beacons” and/or “tracking tags” to help us keep track of what content is effective and to serve relevant advertising to you. Web beacons are small graphics with a unique identifier that may be invisible to you, and which are used to track the online activity of Internet users. Web beacons are embedded in the web pages you review or email messages you receive. Web beacons or similar technologies may be used for a number of purposes, including, without limitation, to count visitors to our services, to monitor how our users navigate our services, to count how many emails that were sent were actually opened, or to count how many particular articles or links were actually viewed</p>
        <h3>Embedded Scripts</h3>
        <p>We and our marketing partners, affiliates, analytics, and service providers may also employ software technology known as an Embedded Script. An Embedded Script is programming code that is designed to collect information about your interactions with our services, such as the links you click on. The code is downloaded onto your computer or other device</p>
        <h3>Cookies</h3>
        <ul>
          <li>A cookie is a small amount of data, which often includes an anonymous unique identifier that is sent to your browser from a web site&apos;s computers and stored on your computer&apos;s hard drive</li>
          <li>If you reject all cookies, you may not be able to use WeTeach services or products that require you to &quot;sign in&quot; and you may not be able to take full advantage of all offerings</li>
          <li>You can configure your browser to accept all cookies, reject all cookies or notify you when a cookie is set</li>
          <li>WeTeach uses its own cookies for a number of purposes, including to:
            <ul>
              <li>Require you to re-enter your password after a certain period of time has elapsed to protect you against others accidentally accessing your account contents.</li>
              <li>Keep track of preferences you specify while you are using the WeTeach.info Sites, Products and Services.</li>
              <li>Estimate and report our total audience size and traffic.</li>
              <li>Conduct research to improve the content and services provided on the WeTeach.info Sites, Products and Services.</li>
              <li>Ensure that visitors are not repeatedly offered the same advertisements and to customize advertising based on browser type and user profile information</li>
            </ul>
          </li>
          <li>WeTeach.info lets other entities that show advertisements or provide services on some of our web pages set and access their cookies on your computer. Other entities&apos; use of their cookies is subject to their own privacy policies, and not this policy. Advertisers or other entities do not have access to WeTeach.info&apos;s cookies</li>
        </ul>
        <h3>Community Forums</h3>
        <p>WeTeach may provide you the opportunity to participate and post content publicly or privately in forums, on blogs, through interactive features WeTeach and through other communication functionality (“Community Forums”). You may choose, through such features or otherwise, to submit or post questions, comments, or other content (collectively, “User Forum Content”). Please note that certain information, such as your name and profile may be publicly displayed on any of these portals along with your personal details</p>
        <p>Note that anything you post to a Community Forum is public — others will have access to your User Forum Content and may use it or share it with third parties. If you choose to voluntarily disclose Personal Information in your User Forum Content or use Community Forums to link to your Profile, that information will be considered public information and the protections of this Privacy Policy will not apply.</p>
        <p>To request removal of your personal information from our blog or community forum, contact us at https://support.upwork.com. In some cases, we may not be able to remove your Personal Information, in which case we will let you know if we are unable to do so and why</p>
        <p>Testimonials</p>
        <p>We display personal testimonials of satisfied customers on our Service, in addition to other endorsements. With your consent we may post your testimonial along with your name. If you wish to update or delete your testimonial, you can contact us at teacher(at)weteach(dot)info.</p>
        <h3>Information Use, Sharing and Disclosure</h3>
        <ul>
          <li>When you provide personal information through using WeTeach you are sharing your personal information with WeTeach.info and its affiliated entities and partners with which it cooperates. The use of your personal information is subject to agreements between WeTeach.info and these organisations.</li>
          <li>WeTeach may use or share your personal information where it is necessary to complete a transaction, to operate or improve the WeTeach products and services, to do something that you have asked us to do, or tell you of products and services that we think may be of interest</li>
          <li>From time to time, WeTeach.info or a partner, may sponsor a promotion, sweepstake or contest on WeTeach. You may be asked to provide personal information including name, email address or home address or to answer questions in order to participate. WeTeach.info may transfer personal information to certain advertising partners that you have explicitly requested to receive information from. It will be clear at the point of collection who is collecting the personal information and whose privacy statement will apply.</li>
          <li>Where you are contacted with an offer or service based on information you have shared with WeTeach, we will do our best to provide you with an opportunity to opt-out of receiving such further communications at the time you are contacted, however, in connection with any of our paid products and services (i.e., products or services that you license or use for a fee), we reserve the right to send you certain communications relating to those products and services, such as service announcements, and administrative messages, that are considered part of your WeTeach.info account, without offering you the opportunity to opt-out of receiving them</li>
          <li>When you register for WeTeach, WeTeach.info collects user-submitted account information such as name, email address and age to identify users and send notifications related to the use of the service. WeTeach.info also collects user-submitted profile information, including additional contact information, location, biographical information and photos. This additional profile information will assist other users in finding and communicating with you</li>
          <li>Email addresses and full names may be used when a user invites a friend via email to join WeTeach and when WeTeach sends notifications to a user related to their use of WeTeach.</li>
          <li>When you post a message on a WeTeach Site, you have the ability to post a message which may include personally identifiable information about yourself.</li>
          <li>If you post personal information online that is accessible to the public, you may receive unsolicited messages from other parties in return.</li>
          <li>WeTeach.info may share personally identifiable information about you under certain circumstances, including but not limited to the following:</li>
          <li>In the course of operating our business it may be necessary or appropriate for us to provide access to your personal information to others such as our service providers, contractors, partners, and select vendors so that we can operate WeTeach and our business</li>
          <li>We may share your personal information to respond to subpoenas, court orders, or legal process, to establish or exercise our legal rights or, defend against legal claims and if in our judgment in such circumstances disclosure is required or appropriate.</li>
          <li>We may share your personal information if we believe it is necessary in order to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, violations of our various terms of use, or as otherwise required by law</li>
          <li>As we continue to develop our business, we may also buy or sell all or part of our business. In such transactions, personally identifiable information you have shared with us is generally one of the business assets that will be transferred.</li>
          <li>Your information may be disclosed in any jurisdiction across the globe subject to the conditions of this agreement.</li>
        </ul>
        <h3>Third Party Advertising</h3>
        <p>Advertisements appearing on the WeTeach.info Sites, Product or Services may be delivered to users by WeTeach.info or one of our Web advertising partners. Our Web advertising partners may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement. In this way, ad servers may compile information about where you, or others who are using your computer, saw their advertisements and determine which ads are clicked on. This information allows an ad network to deliver targeted advertisements that they believe will be of most interest to you. This privacy policy covers the use of cookies by WeTeach.info and does not cover the use of cookies by any advertisers.</p>
        <h3>Changes to this Privacy Policy</h3>
        <p>WeTeach.info may revise, modify or update this policy. We may notify you about significant changes in the way we treat personal information by sending a notice to the primary email address specified in your particular WeTeach.info account or by placing a prominent notice on our site. You are encouraged to check this policy frequently for any changes as your continued use of the WeTeach service indicates your consent to such changes</p>
        <h3>Confidentiality and Security</h3>
        <p>No data transmissions over the Internet can be guaranteed to be 100% secure. Consequently, we cannot ensure or warrant the security of any information you transmit to us and you do so at your own risk. Once we receive your information, we take reasonable measures to secure it on our systems.</p>
        <p>If WeTeach.info learns of a  breach of our security systmes, we may attempt to notify you electronically so that you can take appropriate protective steps. By using WeTeach or providing personal information to us you agree that we can communicate with you electronically regarding security, privacy and administrative issues relating to your use of those sites, products and services. We may post a notice on our applicable web sites if a security breach occurs. If this happens, you will need a web browser enabling you to view the applicable web sites. We may also send an email to you at the email address you have provided to us in these circumstances. Depending on where you live, you may have a legal right to receive notice of a security breach in writing. To receive free written notice of a security breach (or to withdraw your consent from receiving electronic notice) you should notify us at teacher(at)WeTeach(dot)info. Changing your Preferences and Personal Information</p>
        <p>You can edit your account information with WeTeach at any time. Most personal information you may provide is entirely optional. For example, to the extent that parents are considering whether to permit their children to use WeTeach, we do not condition a child&apos;s participation based upon their provision of any more personal information than is necessary to operate those sites, products and services.</p>
        <p>You can delete your applicable account by visiting the applicable account deletion page; however, please note that some personal information, primarily your contact information, may remain in our records to the extent necessary to protect our legal interests or document compliance with regulatory requirements</p>
        <h3>International Users</h3>
        <p>The WeTeach web site is intended for and directed to users around the world. If you are accessing this web site from the European Union, the UK, North America, Australia, New Zealand, South Africa, or any other region with laws or regulations governing personal data collection, use, and disclosure, that differ from Chinese laws, please be advised that through your continued use of this web site, which is governed by Chinese law, this privacy policy, and our Terms of Service, you are transferring your personal information to us and you consent to that transfer.</p>
        <h3>Third Party Websites </h3>
        <p>WeTeach contains links to other websites. If you choose to click on a third party link, you will be directed to that third party’s website. The fact that we link to a website is not an endorsement, authorization or representation of our affiliation with that third party, nor is it an endorsement of their privacy or information security policies or practices. We do not exercise control over third party websites. These other websites may place their own cookies or other files on your computer, collect data or solicit personal information from you. We encourage you to read the privacy policies or statements of the other websites you visit.</p>
        <h3>Phishing</h3>
        <p>Phishing websites imitate legitimate websites in order to obtain personal or financial information. Identity theft and the practice currently known as “phishing” are of great concern to WeTeach. For more information about phishing, visit the website of the Federal Trade Commission at http://www.consumer.ftc.gov/articles/0003-phishing. In addition, if you believe you have received an email or had a similar interaction with a third party pretending to be WeTeach, please report it at teacher(at)weteach(dot)info</p>
        <h3>Contacting WeTeach.info</h3>
        <p>If you have a privacy concern regarding WeTeach, or this policy, and if you cannot satisfactorily resolve it through the use of those sites, products or services, you should complete a feedback form or you can write to us by email at teacher(at)WeTeach(dot)info.</p>
        <p>Effective Date: August 1, 2016</p>
        <p>Copyright 2016  WeTeach (Yi You (Shenzhen) Technology Ltd). All rights reserved.</p>
      </div>
    );

    this.setState({
      dialogTitle: 'WeTeach Privacy Policy',
      dialogContent: content,
    });

    this.open();
  }

  render() {
    const style = {
      width: '100%',
    };

    const termsActions = [
      <RaisedButton
        label="OK"
        primary
        keyboardFocused={false}
        onTouchTap={this.close}
      />,
    ]

    const labelStyle = {
      color: '#666666',
      fontWeight: 'bold',
    };

    return (
      <div className="t-sign-up">
        <form id="t-sign-up-form">
          <div className="clearfix">
            <TextField
              name="FirstName"
              className="left"
              style={{ width: '40%' }}
              id="t-first-name"
              type="text"
              floatingLabelText="First Name"
              floatingLabelStyle={labelStyle}
            />
            <TextField
              name="LastName"
              className="right"
              style={{ width: '40%' }}
              id="t-last-name"
              type="text"
              floatingLabelText="Last Name"
              floatingLabelStyle={labelStyle}
            />
          </div>
          <TextField
            name="Email"
            id="t-email"
            type="email"
            floatingLabelText="Email Address"
            floatingLabelStyle={labelStyle}
          />
          <br />
          <TextField
            name="Password"
            id="t-password"
            type="password"
            floatingLabelText="Password"
            floatingLabelStyle={labelStyle}
          />
          <br />
          <TextField
            name="Confirm-Password"
            id="t-re-password"
            type="password"
            floatingLabelText="Confirm Password"
            floatingLabelStyle={labelStyle}
          />
          <br />
          <br />
          <small style={{ color: '#999' }}>By clicking Sign Up, you agree to our <a href="#" id="site-terms" onClick={this.handleTermsClick}>Terms</a> and that you have read our <a href="#" id="site-policy" onClick={this.handlePrivacyClick}>Privacy Policy</a>,</small>
          <br />
          <br />
          <RaisedButton
            type="submit"
            label="Sign up"
            primary
            style={style}
            className="submit-btn"
            onClick={this.handleSubmit}
          />
          <WaitForSubmit ref="loader" />
        </form>
        <Dialog
          title={this.state.dialogTitle}
          actions={termsActions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.close}
          autoScrollBodyContent
        >
          {this.state.dialogContent}
        </Dialog>
      </div>
    )
  }
}
