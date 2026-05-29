'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useSettings } from '@/lib/settings-context'
import { useTranslations } from '@/lib/translations'
import Card from '@/components/Card'
import type { DateFormat, Language } from '@/lib/settings-context'

const CURRENCIES = [
    { symbol: '$', label: '$ – US Dollar' },
    { symbol: '€', label: '€ – Euro' },
    { symbol: '£', label: '£ – British Pound' },
    { symbol: '¥', label: '¥ – Yen / Yuan' },
    { symbol: '₹', label: '₹ – Indian Rupee' },
    { symbol: '₪', label: '₪ – Israeli Shekel' },
    { symbol: 'Fr.', label: 'Fr. – Swiss Franc' },
    { symbol: 'kr', label: 'kr – Scandinavian Krona' },
    { symbol: 'R', label: 'R – South African Rand' },
]

const selectCls = "rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"

function SettingRow({ label, description, children }: {
    label: string
    description: string
    children: React.ReactNode
}) {
    return (
        <div className="flex items-center justify-between gap-6 py-4 first:pt-0 last:pb-0">
            <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
            </div>
            <div className="shrink-0">{children}</div>
        </div>
    )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
        >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    )
}

export default function Settings() {
    const { theme, setTheme } = useTheme()
    const { currency, dateFormat, budgetWarningThreshold, showCents, language, updateSettings } = useSettings()
    const t = useTranslations()
    const [saved, setSaved] = useState(false)

    const handleChange = (partial: Parameters<typeof updateSettings>[0]) => {
        updateSettings(partial)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="flex flex-col gap-6 p-6 h-full">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">{t.settings.title}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.settings.subtitle}</p>
                </div>
                <span className={`text-sm font-medium text-green-500 transition-opacity duration-300 ${saved ? 'opacity-100' : 'opacity-0'}`}>
                    {t.settings.saved}
                </span>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title={t.settings.appearance}>
                    <div className="divide-y divide-gray-100 dark:divide-gray-600">
                        <SettingRow label={t.settings.theme} description={t.settings.themeDesc}>
                            <select value={theme} onChange={e => setTheme(e.target.value)} className={selectCls}>
                                <option value="system">{t.settings.systemDefault}</option>
                                <option value="light">{t.settings.light}</option>
                                <option value="dark">{t.settings.dark}</option>
                            </select>
                        </SettingRow>
                        <SettingRow label={t.settings.language} description={t.settings.languageDesc}>
                            <select
                                value={language}
                                onChange={e => handleChange({ language: e.target.value as Language })}
                                className={selectCls}
                            >
                                <option value="en">{t.settings.english}</option>
                                <option value="he">{t.settings.hebrew}</option>
                            </select>
                        </SettingRow>

                    </div>
                </Card>

                <Card title={t.settings.dateTime}>
                    <div className="divide-y divide-gray-100 dark:divide-gray-600">
                        <SettingRow label={t.settings.dateFormat} description={t.settings.dateFormatDesc}>
                            <select
                                value={dateFormat}
                                onChange={e => handleChange({ dateFormat: e.target.value as DateFormat })}
                                className={selectCls}
                            >
                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                        </SettingRow>
                    </div>
                </Card>

                <Card title={t.settings.currencyNumbers}>
                    <div className="divide-y divide-gray-100 dark:divide-gray-600">
                        <SettingRow label={t.settings.currencySymbol} description={t.settings.currencySymbolDesc}>
                            <select
                                value={currency}
                                onChange={e => handleChange({ currency: e.target.value })}
                                className={selectCls}
                            >
                                {CURRENCIES.map(c => (
                                    <option key={c.symbol} value={c.symbol}>{c.label}</option>
                                ))}
                            </select>
                        </SettingRow>
                        <SettingRow label={t.settings.showCents} description={t.settings.showCentsDesc}>
                            <Toggle checked={showCents} onChange={val => handleChange({ showCents: val })} />
                        </SettingRow>
                    </div>
                </Card>

                <Card title={t.settings.budgets} fill>
                    <div className="h-full flex flex-col justify-center">
                        <SettingRow
                            label={t.settings.warningThreshold}
                            description={t.settings.warningThresholdDesc}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min={50}
                                    max={100}
                                    step={5}
                                    value={budgetWarningThreshold}
                                    onChange={e => handleChange({ budgetWarningThreshold: Number(e.target.value) })}
                                    className="w-28 accent-blue-500"
                                />
                                <span className="text-sm font-semibold w-9 text-right">{budgetWarningThreshold}%</span>
                            </div>
                        </SettingRow>
                    </div>
                </Card>
            </div>
        </div>
    )
}
