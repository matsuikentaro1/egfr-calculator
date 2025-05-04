'use client'

import { useState } from 'react'
import Form from '@/components/Form'
import Result from '@/components/Result'

export default function Home() {
  const [eGFR, setEGFR] = useState<number | null>(null)

  return (
    <main className="space-y-8 py-4">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">eGFR計算アプリ</h1>
        <p className="text-xl text-gray-600">腎機能の指標を簡単に計算</p>
      </header>

      <div className="card">
        <Form setEGFR={setEGFR} />
      </div>

      {eGFR !== null && (
        <div className="card">
          <Result eGFR={eGFR} />
        </div>
      )}

      <footer className="text-center text-gray-500 text-sm mt-8">
        <p>日本腎臓学会のeGFR推定式に基づいて計算しています</p>
        <p>※このアプリは医療アドバイスを提供するものではありません</p>
      </footer>
    </main>
  )
}