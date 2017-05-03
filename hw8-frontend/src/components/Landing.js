//import {setLocation, getLocation} from '../location'
import React, { Component, PropTypes } from 'react'
import  {connect } from 'react-redux'
//const loginAction = require('./profileActions').loginAction
import {loginAction, registerAction, loginWithTwitterAction, seeIfLoggedInAction} from '../actions/profileActions'

const user = {}

export const LandingItem = ({login, register, loginWithTwitter, seeIfLoggedIn}) =>{
  let AccountName
  let password
  seeIfLoggedIn()
  const loginClicked = () =>{
    console.log("in loginClicked")

    if (AccountName && AccountName.value && password && password.value){
      login(AccountName.value, password.value)
    }

  }
  const registerClicked = () =>{
    console.log("in loginClicked")

    if (AccountName && AccountName.value && password && password.value){
      login(AccountName.value, password.value)
    }

  }
  const loginWithTwitterClicked = () =>{
    console.log("in login with twitter clicked")
    if (AccountName && AccountName.value && password && password.value){
      loginWithTwitter(AccountName.value, password.value)
  }
}

  document.body.style.backgroundColor = "#E6E6FA";


return (
      <div >
        <meta name="author" content="Simi Fagbemi" />
        Create a new account
        <br /><br />
        <form id="signIn" name="submitForm" method="" action="" onSubmit={register}>
          <table bgcolor="#e0ebeb" className="form">
            <tbody><tr>
                <td>Account Name</td>
                <td><input name="AccountName" ref={(node)=> user.username = node}required /></td>
              </tr>
              <tr>
                <td>Display Name (Optional)</td>
                <td><input name="DisplayName" ref={(node)=> user.display = node}/></td>
              </tr>
              <tr>
                <td>E-mail Address</td>
                <td><input name="Email" type="email" ref={(node)=> user.email = node} required /></td>
              </tr>
              <tr>
                <td>Phone Number (format: 5555555555) </td>
                <td><input name="PhoneNumber" required type="tel" pattern="\d{10}" ref={(node)=> user.phone = node} /></td>
              </tr>
              <tr>
                <td>Date of Birth (MM/DD/YYYY) </td>
                <td><input name="DOB" required ref={(node)=> user.dob = node} /></td>
              </tr>
              <tr>
                <td>Zipcode (format: 55555) </td>
                <td><input name="Zipcode" type="number" pattern="\d{5}" required ref={(node)=> user.zip = node} /></td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input name="Password" required type="password" ref={(node)=> user.password = node} /></td>
              </tr>
              <tr>
                <td>Password Confirmation</td>
                <td><input name="PasswordConfirmation" type="password" required /></td>
              </tr>
              <tr><td colSpan={2}><input type="submit" onClick= {() => register(user)} defaultValue="Submit form" /><br />
                  <input type="reset" defaultValue="Clear" /></td></tr>
            </tbody></table>
          <input type="hidden" name="timeStamp" />
        </form>
        <br /><br />
        Already a user? Login
        <br /><br />
        <table textAlign="center">
          <tbody><tr>
              <td>Account Name</td>
              <td>  <input name="AccountName" ref={(node)=> AccountName = node} required />
                <span id="AccountNameText"></span>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td><input name="Password" ref={(node)=> password = node} required type="password" />
                <span id="PasswordText"></span>
              </td>
            </tr>
            <tr><td colSpan={2}><input type="button" defaultValue="Login" id="update" onClick={loginClicked} /><br />
              </td></tr>

              <tr><td colSpan={2}><input type="button" defaultValue="Login with Twitter" id="update" onClick={loginWithTwitterClicked} /><br />
                </td></tr>

          </tbody></table>
      </div>
)
}

//dispatching  method to reducer
export default connect(null, (dispatch, ownProps) => {
        return {
            login: (username, password) => loginAction(username, password)(dispatch),
            seeIfLoggedIn: () => seeIfLoggedInAction()(dispatch),
            loginWithTwitter: (username, password) => loginWithTwitterAction(username, password)(dispatch),
            register: (user) => registerAction(user)(dispatch)
        }
    })(LandingItem)
