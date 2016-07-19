// index page.

import React from 'react';

class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="index-page">
        <section id="introduction">
          <h1 className="title">亦友</h1>
          <h2 className="sub-title">为你找到真正关心孩子成长的好老师</h2>
          <p>亦友是一个在线英语学习平台</p>
          <p>把具有丰富经验的外国老师与中国学生</p>
          <p>通过在线授课的方式联系起来</p>
        </section>
        <section id="course-features">
          <h1>正版教材</h1>
        </section>
        <section id="activities">
          <h1>线下活动</h1>
          <h1>亲子教育</h1>
        </section>
        <section id="pay-intro">
          <h1>按课时付费</h1>
        </section>
        <section id="teacher-feedback">
          <h1>教师反馈</h1>
        </section>
        <section id="parents-feedback">
          <h1>家长反馈</h1>
        </section>
        <section id="weteach-team">
          <h1>创始团队</h1>
        </section>
      </main>
    )
  }
}

export default Index
