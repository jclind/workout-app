import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PageIndicator from '../PageIndicator/PageIndicator'
import { AiOutlineWarning } from 'react-icons/ai'
import { SignupContext } from '../Signup'
import './Weight.scss'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'

const Weight = () => {
  const [weight, setWeight] = useState('')
  const [error, setError] = useState('')

  const { saveSignupData } = useContext(SignupContext)
  const navigate = useNavigate()

  useEffect(() => {
    setError('')
  }, [weight])

  const weightRef = useRef()
  const nextBtnRef = useRef()

  const handleWeightChange = e => {
    const newVal = e.target.value

    if (newVal === '') {
      return setWeight('')
    }

    if (isNaN(newVal)) return

    if (Number(newVal) > 999) return

    // Don't allow more than one decimal place
    if ((newVal * 10) % 1 !== 0) return

    setWeight(newVal)
    if (newVal % 1 !== 0) {
      return nextBtnRef.current.focus()
    }
  }

  const handleNextClick = () => {
    setError('')
    if (!weight) return setError('Please Enter Weight')
    if (weight < 50 || weight > 999)
      return setError('Please Enter Weight Between 50-999')

    const date = new Date().getTime()

    saveSignupData('weight', [{ date, weight }])
    navigate('/signup/barbell-weight')
  }

  return (
    <div className='signup-page weight'>
      <PageIndicator currPage={5} />
      <BackButton />
      <div className='title'>Your Weight</div>
      {error && (
        <div className='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      <div className='weight-input-container'>
        <input
          type='text'
          placeholder={'Weight'}
          onChange={handleWeightChange}
          value={weight}
          inputMode='numeric'
          ref={weightRef}
        />
        <span className='text'>lbs.</span>
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

export default Weight
