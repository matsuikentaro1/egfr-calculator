'use client'

import { useState, FormEvent } from 'react'

interface FormProps {
  setEGFR: (value: number | null) => void
}

export default function Form({ setEGFR }: FormProps) {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState<string>('')
  const [creatinine, setCreatinine] = useState<string>('')
  const [errors, setErrors] = useState<{
    age?: string
    creatinine?: string
    gender?: string
  }>({})

  const validateForm = (): boolean => {
    const newErrors: {
      age?: string
      creatinine?: string
      gender?: string
    } = {}

    // 年齢のバリデーション
    const ageValue = Number(age)
    if (!age) {
      newErrors.age = '年齢を入力してください'
    } else if (isNaN(ageValue)) {
      newErrors.age = '数値を入力してください'
    } else if (ageValue < 0 || ageValue > 120) {
      newErrors.age = '0〜120の範囲で入力してください'
    }

    // クレアチニン値のバリデーション
    const creValue = Number(creatinine)
    if (!creatinine) {
      newErrors.creatinine = 'クレアチニン値を入力してください'
    } else if (isNaN(creValue)) {
      newErrors.creatinine = '数値を入力してください'
    } else if (creValue < 0.2 || creValue > 20) {
      newErrors.creatinine = '0.2〜20の範囲で入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateEGFR = (age: number, creatinine: number, isFemale: boolean): number => {
    // 日本腎臓学会のeGFR推定式
    let egfr = 194 * Math.pow(creatinine, -1.094) * Math.pow(age, -0.287)
    
    // 女性の場合は係数を掛ける
    if (isFemale) {
      egfr *= 0.739
    }
    
    return parseFloat(egfr.toFixed(2))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      const ageValue = Number(age)
      const creValue = Number(creatinine)
      const isFemale = gender === 'female'
      
      const result = calculateEGFR(ageValue, creValue, isFemale)
      setEGFR(result)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="label">性別</label>
        <div className="flex space-x-6 text-xl">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              className="w-5 h-5"
              checked={gender === 'male'}
              onChange={() => setGender('male')}
            />
            <span>男性</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              className="w-5 h-5"
              checked={gender === 'female'}
              onChange={() => setGender('female')}
            />
            <span>女性</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="age" className="label">年齢</label>
        <input
          id="age"
          type="number"
          className={`input-field ${errors.age ? 'border-red-500' : ''}`}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="例: 65"
          min="0"
          max="120"
        />
        {errors.age && <p className="text-red-500 mt-1">{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="creatinine" className="label">
          血清クレアチニン値 (Cre)
          <span className="text-lg ml-2 text-gray-600">mg/dL</span>
        </label>
        <input
          id="creatinine"
          type="number"
          step="0.01"
          className={`input-field ${errors.creatinine ? 'border-red-500' : ''}`}
          value={creatinine}
          onChange={(e) => setCreatinine(e.target.value)}
          placeholder="例: 0.8"
          min="0.2"
          max="20"
        />
        {errors.creatinine && <p className="text-red-500 mt-1">{errors.creatinine}</p>}
      </div>

      <button type="submit" className="btn w-full">
        計算する
      </button>
    </form>
  )
}