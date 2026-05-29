import { fmt } from "@/lib/utils"

type StatCardProps = {
    label: string
    value: number
    prefix?: string
    suffix?: string
    decimals?: number
    color: 'blue' | 'green' | 'red' | 'purple'
    icon: React.ReactNode
    subtext?: string
}

export default function StatCard({ label, value, prefix = '$', suffix = '', decimals = 2, color, icon, subtext }: StatCardProps) {
    const iconBg: Record<string, string> = {
        blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
        green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
        red: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
        purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
    }
    const valueColor: Record<string, string> = {
        blue: 'text-blue-600 dark:text-blue-400',
        green: 'text-green-600 dark:text-green-400',
        red: 'text-red-600 dark:text-red-400',
        purple: 'text-purple-600 dark:text-purple-400',
    }

    return (
        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white shadow-md dark:bg-gray-700">
            <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">{label}</span>
                <div className={`p-2 rounded-lg ${iconBg[color]}`}>
                    {icon}
                </div>
            </div>
            <p className={`text-2xl font-bold ${valueColor[color]}`}>
                {prefix}{fmt(value, decimals)}{suffix}
            </p>
            {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
        </div>
    )
}