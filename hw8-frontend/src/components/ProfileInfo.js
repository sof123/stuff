import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getEmailAction, getDobAction, getZipAction, updateZipAction, updateDobAction,
        updateEmailAction} from '../actions/profileActions'

class ProfileInfo extends Component {

  componentWillMount() {
    this.props.getDob()
    this.props.getEmail()
    this.props.getZipcode(this.props.username)
  }

  render() {
    const dob = this.props.dob;
    const username = this.props.username;
    const email = this.props.email;
    const zipcode = this.props.zipcode;
    const updateZip = this.props.updateZip;
    const updateEmail = this.props.updateEmail;
    const updateDob = this.props.updateDob;

    let zipcodeValue;
    let emailValue;
    let dobValue;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>E-mail</td>
              <td><input name="Email" ref={(a)=>emailValue=a} type="email" />
                <font id="EmailText"> </font>
              </td>
              <td> {email} </td>
            </tr>
            <tr>
              <td>Date of Birth</td>
              <td><input name="Dob" ref={(a)=>dobValue=a} />
                <font id="DOBText"> </font>
              </td>
              <td> {dob} </td>
            </tr>
            <tr>
              <td>Zipcode</td>
              <td><input ref={(a)=>zipcodeValue=a} name="Zipcode" type="number" />
                <font id="ZipcodeText"> </font>
              </td>
              <td> {zipcode} </td>
            </tr>
            <tr>
              <td>Change Password</td>
              <td><input  name="Password" type="password" />
                <font id="Password"> </font>
              </td>
            </tr>
            <tr>
              <input type="button" defaultValue="Update" id="updateReact"
                    onClick={() =>{updateZip(zipcodeValue);updateEmail(emailValue); }} />
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(
  state => ({
    username: state.username,
    dob: state.dob,
    email: state.email,
    zipcode: state.zipcode
  }),
  dispatch => ({
      getDob:  getDobAction(dispatch),
      getEmail: getEmailAction(dispatch),
      getZipcode: getZipAction(dispatch),
      updateZip: (newZip) => updateZipAction(newZip)(dispatch),
      updateDob: (newDob) => updateDobAction(newDob)(dispatch),
      updateEmail: (newEmail) => updateEmailAction(newEmail)(dispatch),
  })
)(ProfileInfo)
