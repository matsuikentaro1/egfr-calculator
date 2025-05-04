interface ResultProps {
  eGFR: number
}

export default function Result({ eGFR }: ResultProps) {
  // eGFRの値に基づいてステージを判定
  const getStage = (value: number): string => {
    if (value >= 90) return 'G1 (正常または高値)'
    if (value >= 60) return 'G2 (軽度低下)'
    if (value >= 45) return 'G3a (軽度～中等度低下)'
    if (value >= 30) return 'G3b (中等度～高度低下)'
    if (value >= 15) return 'G4 (高度低下)'
    return 'G5 (腎不全)'
  }

  // eGFRの値に基づいて色を判定
  const getColorClass = (value: number): string => {
    if (value >= 60) return 'text-green-600'
    if (value >= 30) return 'text-yellow-600'
    return 'text-red-600'
  }

  const stage = getStage(eGFR)
  const colorClass = getColorClass(eGFR)

  return (
    <div className="text-center py-2">
      <h2 className="text-2xl font-bold mb-4">計算結果</h2>
      
      <div className="mb-6">
        <p className="text-xl mb-2">eGFR値:</p>
        <p className={`text-4xl font-bold ${colorClass}`}>
          {eGFR} <span className="text-xl">mL/min/1.73m²</span>
        </p>
      </div>
      
      <div>
        <p className="text-xl mb-2">CKDステージ:</p>
        <p className={`text-2xl font-semibold ${colorClass}`}>{stage}</p>
      </div>
      
      <div className="mt-6 text-left text-sm text-gray-600 border-t pt-4">
        <p>※ eGFRは腎機能の指標です。値が低いほど腎機能が低下していることを示します。</p>
        <p>※ 正確な診断には医師の診察が必要です。</p>
      </div>
    </div>
  )
}