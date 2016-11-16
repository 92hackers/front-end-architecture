// teacher's homepage. just a container.
import React from 'react'
import Avatar from '../Avatar'

export default function Homepage(props) {
  const { loggedIn, profile, children } = props

  const genderIcon = profile.gender === 0 ? <i className="fa fa-venus" /> : <i className="fa fa-mars" />

  let teachingExperience = '';

  switch (profile.experience) {
    case 3 :
      teachingExperience = 'More than 15 years';
      break;
    case 2 :
      teachingExperience = 'Between 5 to 15 years';
      break;
    case 1 :
      teachingExperience = 'Less than 5 years';
      break;
    default:
      teachingExperience = 'Not clear.'
  }

  return (
    <div className="t-homepage">
      <main className="container">
        <div className="row">
          <div className="col-3">
            <div className="avatar-profile">
              <Avatar avatarUrl={profile.avatar} />
            </div>
            <div className="name-gender">
              <h2 className="profile-name">{profile.firstname} {profile.lastname} <span className="gender-icon">{genderIcon}</span></h2>
            </div>
            <hr />
            <ul className="profile-data">
              <li>
                <span className="profile-icon">
                  <i className="fa fa-globe" />
                </span>
                <span className="profile-meta-data">{profile.nation}</span>
              </li>
              <li>
                <span className="profile-icon">
                  <i className="fa fa-map-marker" />
                </span>
                <span className="profile-meta-data">{profile.country}</span>
              </li>
              <li>
                <span className="profile-icon">
                  <i className="fa fa-envelope-o" />
                </span>
                <span className="profile-meta-data">{profile.email}</span>
              </li>
              <li>
                <span className="profile-icon">
                  <i className="fa fa-pencil" />
                </span>
                <span className="profile-meta-data">{teachingExperience}</span>
              </li>
            </ul>
          </div>
          <div className="col-9">
            {
              React.cloneElement(children, { loggedIn, profile })
            }
          </div>
        </div>
      </main>
    </div>
  )
}
