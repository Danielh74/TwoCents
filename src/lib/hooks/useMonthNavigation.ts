import { useState } from 'react'

export function useMonthNavigation(onMonthChange?: () => void) {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

    const handlePreviousMonth = () => {
        onMonthChange?.()
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
        else setCurrentMonth(m => m - 1)
    }

    const handleNextMonth = () => {
        onMonthChange?.()
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
        else setCurrentMonth(m => m + 1)
    }

    return { currentMonth, currentYear, handlePreviousMonth, handleNextMonth }
}
