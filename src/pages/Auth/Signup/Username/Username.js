import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PageIndicator from '../PageIndicator/PageIndicator'
import { AiOutlineWarning } from 'react-icons/ai'
import { SignupContext } from '../Signup'

import './Username.scss'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import { checkUsernameAvailability } from '../../../../redux/actions/auth/authStatus'

const Username = () => {
  const [username, setUsername] = useState(() => {
    const savedSignupData = JSON.parse(localStorage.getItem('signup'))
    if (savedSignupData && savedSignupData.username) {
      return savedSignupData.username
    }

    return ''
  })

  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null)
  useEffect(() => {
    setError('')
    if (username.trim().length >= 3) {
      checkUsernameAvailability(username).then(isAvailable => {
        setIsUsernameAvailable(isAvailable)
      })
    } else {
      setIsUsernameAvailable(null)
    }
  }, [username])

  const usernameRef = useRef()

  const [error, setError] = useState('')

  const { saveSignupData } = useContext(SignupContext)
  const nextBtnRef = useRef()
  const navigate = useNavigate()

  const handleUsernameChange = e => {
    const newVal = e.target.value.trim()

    setUsername(newVal)
  }

  const handleNextClick = () => {
    if (!username || username.length < 3)
      return setError('Username length must be 3 or greater')
    if (!isUsernameAvailable) return setError('Username not available')

    saveSignupData('username', username)
    navigate('/signup/signup-selection')
  }

  return (
    <div className='signup-page profile'>
      <PageIndicator currPage={7} />
      <BackButton />
      <div className='title'>Choose Username</div>
      {error && (
        <div className='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      <div className='profile-input-container'>
        <input
          type='text'
          placeholder={'Username'}
          onChange={handleUsernameChange}
          value={username}
          ref={usernameRef}
        />
        {isUsernameAvailable !== null && (
          <div
            className={
              isUsernameAvailable
                ? 'is-username-available available'
                : 'is-username-available not-available'
            }
          >
            {isUsernameAvailable ? (
              <>
                <strong>{username}</strong> is available!
              </>
            ) : (
              <>
                <strong>{username}</strong> is not available.
              </>
            )}
          </div>
        )}
      </div>
      <button
        className='signup-next-btn'
        ref={nextBtnRef}
        onClick={handleNextClick}
      >
        NEXT
      </button>
    </div>
  )
}

export default Username