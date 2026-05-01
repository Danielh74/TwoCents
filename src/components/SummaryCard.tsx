import React from 'react'

function SummaryCard({ title }: { title: string }) {
    return (
        <div className={`flex flex-1  p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg`}>
            {title}
        </div>
    )
}

export default SummaryCard