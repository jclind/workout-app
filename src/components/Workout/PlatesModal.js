import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import '../../assets/styles/components/workout/plates-modal.scss'
import useClickOutside from '../../util/useClickOutside'
import ChangeWeightModal from './ChangeWeightModal'
import { BiEdit } from 'react-icons/bi'

const PlatesModal = ({ weights, onClose, currExercise, setCurrExercise }) => {
  const [isChangeWeightModalOpen, setIsChangeWeightModalOpen] = useState(false)
  const modalContent = useClickOutside(() => {
    if (!isChangeWeightModalOpen) {
      onClose()
    }
  })

  return ReactDom.createPortal(
    <>
      <div className='plates-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>Total Weight:</div>
          <div
            className='total-weight'
            onClick={() => setIsChangeWeightModalOpen(true)}
          >
            {currExercise.exerciseWeight} lbs <BiEdit className='edit-icon' />
          </div>
          {/* <div className='change-weight'>Change Weight</div> */}

          <div className='title'>Plates:</div>
          <div className='sub-text'>(On each side)</div>

          <div className='weights'>
            {weights.map((weight, idx) => {
              if (weight.amount > 0) {
                return (
                  <div className='weight' key={idx}>
                    <div className='name'>{weight.name} lbs :</div>
                    <div className='amount'>x{weight.amount}</div>
                  </div>
                )
              }
              return false
            })}
          </div>
        </div>
      </div>
      {isChangeWeightModalOpen ? (
        <ChangeWeightModal
          currExercise={currExercise}
          setCurrExercise={setCurrExercise}
          onClose={() => {
            setIsChangeWeightModalOpen(false)
          }}
        />
      ) : null}
    </>,
    document.getElementById('portal')
  )
}

export default PlatesModal
