import React, { useState } from 'react'
import { useEffect } from 'react'
import { exerciseList } from '../../../assets/data/exerciseList'

import ExerciseTypeDropdown from '../ExerciseTypeDropdown/ExerciseTypeDropdown'
import DropSet from './DropSet/DropSet'
import './ExercisePath.scss'
import StraightSet from './StraightSet/StraightSet'
import TimerSet from './TimerSet/TimerSet'

const options = [
  { value: 'straight', label: 'Straight Sets' },
  { value: 'drop', label: 'Drop Sets' },
  { value: 'timed', label: 'Timed Sets' },
]

const ExercisePath = ({
  setSelectedType,
  sets,
  type,
  setSets,
  setError,
  idx,
  selectedExerciseID,
}) => {
  const [exerciseType, setExerciseType] = useState(type || null)
  const [exercisePath, setExercisePath] = useState(sets || [])

  const selectedExercise = exerciseList.find(ex => ex.id === selectedExerciseID)
  const selectedExerciseIsWeighted = selectedExercise.weights

  const handleSetExerciseType = e => {
    const type = e.value
    setExerciseType(prevType => {
      if (prevType) {
        setExercisePath([])
      }
      return type
    })
  }

  useEffect(() => {
    setSelectedType(exerciseType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseType])
  useEffect(() => {
    setSets(exercisePath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercisePath])

  // Drop Set values

  const exerciseTypeElement = type => {
    if (!type) return null

    if (type === 'straight') {
      return (
        <StraightSet
          exercisePath={exercisePath}
          setExercisePath={setExercisePath}
          setError={setError}
        />
      )
    } else if (type === 'drop') {
      return (
        <DropSet
          exercisePath={exercisePath}
          setExercisePath={setExercisePath}
          setError={setError}
          idx={idx}
        />
      )
    } else if (type === 'timed') {
      return (
        <TimerSet
          exercisePath={exercisePath}
          setExercisePath={setExercisePath}
          setError={setError}
        />
      )
    }
    return null
  }

  return (
    <div className='exercise-path'>
      <div className='exercise-type-selector'>
        <ExerciseTypeDropdown
          options={options}
          exerciseType={exerciseType}
          handleSetExerciseType={handleSetExerciseType}
        />
      </div>
      {exerciseTypeElement(exerciseType)}
    </div>
  )
}

export default ExercisePath
