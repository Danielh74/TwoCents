'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'
export type Language = 'en' | 'he'

export interface Settings {
    currency: string
    dateFormat: DateFormat
    budgetWarningThreshold: number
    showCents: boolean
    language: Language
}

interface SettingsContextType extends Settings {
    updateSettings: (partial: Partial<Settings>) => void
}

const DEFAULTS: Settings = {
    currency: '$',
    dateFormat: 'MM/DD/YYYY',
    budgetWarningThreshold: 80,
    showCents: true,
    language: 'en',
}

const SettingsContext = createContext<SettingsContextType>({
    ...DEFAULTS,
    language: 'en',
    updateSettings: () => { },
})

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<Settings>(DEFAULTS)

    useEffect(() => {
        function fetchSettings() {
            const stored = localStorage.getItem('twocents-settings')
            if (stored) {
                try {
                    setSettings({ ...DEFAULTS, ...JSON.parse(stored) })
                } catch { }
            }
        };

        fetchSettings();

    }, [])

    const updateSettings = (partial: Partial<Settings>) => {
        setSettings(prev => {
            const next = { ...prev, ...partial }
            localStorage.setItem('twocents-settings', JSON.stringify(next))
            return next
        })
    }

    return (
        <SettingsContext.Provider value={{ ...settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    return useContext(SettingsContext)
}

export function formatDate(dateStr: string, format: DateFormat): string {
    const [year, month, day] = dateStr.split('T')[0].split('-')
    if (!year || !month || !day) return dateStr
    switch (format) {
        case 'DD/MM/YYYY': return `${day}/${month}/${year}`
        case 'YYYY-MM-DD': return dateStr
        default: return `${month}/${day}/${year}`
    }
}
