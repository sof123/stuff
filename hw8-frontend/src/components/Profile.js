//import {setLocation, getLocation} from '../location'
import React, { Component, PropTypes } from 'react'
import  {connect}  from 'react-redux'
import {updateZipAction, updateEmailAction, getDobAction, uploadAvatarAction, linkAccountAction, unlinkAccountAction} from '../actions/profileActions'
import ProfileInfo from './ProfileInfo'

export const ProfileItem = ({logout, goToMain, handleImageChange, linkAccount, unlinkAccount}) =>
{


  return  (
        <div>

          <meta name="author" content="Simi Fagbemi" />
          <input type="button" defaultValue="Return to main page" onClick={goToMain} id="goToMainId" />
          <input type="button" defaultValue="logout" onClick={logout} id="logoutId" />
          <input type="button" defaultValue="link account" onClick={linkAccount} id="linkAccountId" />
          <input type="button" defaultValue="unllink account" onClick={unlinkAccount} id="unlinkAccountId" />
          <table>
            <tbody><tr>
                <td>Current profile picture </td>
                <td>
                  <img src="http://www.clker.com/cliparts/D/t/t/Y/m/A/black-stick-figure.svg" id="currentProfilePic" height={125} width={100} />
                  Upload a new profile pic:
                  <input type="file" accept="image/*"
                    onChange={(e) => handleImageChange(e)}/>
                </td>
              </tr>
                <tr>
                  <ProfileInfo />
                </tr>
            </tbody></table>
        </div>
  )
}

/*ProfileItem.propTypes = {
    //id: PropTypes.number.isRequired,
    //location: PropTypes.symbol.isRequired
}
*/

export default connect( (state) =>
                        {
                          console.log(state)
                          return {
                            zipcode: state.zipcode,
                            email: state.email,
                            dob: state.dob
                          }
                        },
  (dispatch, ownProps) => {
        return {
            logout: () => logoutAction()(dispatch),
            goToMain: () => dispatch({type: 'goToMainToDo', id: ownProps.id}),
            updatePassword: () => updatePasswordAction(dispatch),
            updateZip: (newZip) => updateZipAction(newZip)(dispatch),
            updateEmail: (newEmail) => updateEmailAction(newEmail)(dispatch),
            handleImageChange: (file) => uploadAvatarAction(file)(dispatch),
            linkAccount: () => linkAccountAction()(dispatch),
            unlinkAccount: () => unlinkAccountAction()(dispatch)
        }
    })(ProfileItem)
