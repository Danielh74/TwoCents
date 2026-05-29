'use client'

import { useEffect } from 'react'
import { useSettings } from '@/lib/settings-context'

export function DirectionProvider() {
    const { language } = useSettings()
    useEffect(() => {
        document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
        document.documentElement.lang = language
    }, [language])
    return null
}
