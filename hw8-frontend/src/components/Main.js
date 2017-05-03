import React, { Component, PropTypes } from 'react'
import  {connect } from 'react-redux'
import Following from './Following'
import Follow from './Follow'
import Articles from './Articles'
import CreateArticle from './CreateArticle'
import {updateHeadlineAction, logoutAction, bindFollowToDispatch, seeIfLoggedInAction} from '../actions/profileActions'
export const MainItem = ({headline, logout, goToProfile, updateHeadline, getArticles, seeIfLoggedIn }) =>{

  let headlineValue
  let followValue

  seeIfLoggedIn()



  return  (
      <div>

        <div className="container" style={{position: 'relative', padding: '0 0 0 55px', backgroundColor: 'pink'}}>
          <input name="post" required />
          <input type="button" defaultValue="Post!" onclick id="postButton" />
          <input type="button" defaultValue="Cancel Post" onclick="clearPost()" id="cancelPostButton" />
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)}/>
          <br /><br />
            <input id="headline" name="headline" ref={(a)=>headlineValue=a} required />
            <input type="button" defaultValue="Update Headline" onClick={() => updateHeadline(headlineValue.value)} id="updateHeadlineButton" />
            <br /><br />

            <Follow />
          <Following />
          <CreateArticle />
          <Articles />
          <div style={{position: 'absolute', top: 0, bottom: 0, right: 0, width: 50}} id="sidebar">            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br /><br />

            <br />
            <br />
            <br />
            <br />
          </div>
          <div style={{textAlign: 'center'}}>
            <br /><br />
            <span> </span>
            <br /><br />
            <font id="headlineFont">{headline} </font>
            <br /><br />

          </div>
          <input name="search" required />
          <input type="button" defaultValue="Search" onclick id="searchButton" />
          <br /><br />
          <input type="button" defaultValue="Profile" onClick={goToProfile} id="ProfileLink" />
          <br /><br />
          <input type="button" defaultValue="Logout" onClick={logout} id="LandingLink" />
          <br /><br />
          <br /><br />
        </div>
      </div>

  )
}

  export default connect( (state) =>
                          {
                            console.log(state)
                            return {
                              headline: state.headline,
                              following: state.following
                            }
                          },
    (dispatch, ownProps) => {
          return {
              logout: () => logoutAction()(dispatch),
              goToProfile: () => dispatch({ type: 'goToProfileToDo', id: ownProps.id }),
              seeIfLoggedIn: () => seeIfLoggedInAction()(dispatch),
              updateHeadline: (newHeadline) => updateHeadlineAction(newHeadline)(dispatch),
          }
      })(MainItem)
