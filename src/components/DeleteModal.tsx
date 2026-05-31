interface Props {
    title: string
    message: string
    confirmLabel: string
    cancelLabel: string
    onConfirm: () => void
    onCancel: () => void
}

export default function DeleteModal({ title, message, confirmLabel, cancelLabel, onConfirm, onCancel }: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onCancel}>
            <div
                className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4"
                onClick={e => e.stopPropagation()}
            >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{message}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2 px-4 rounded-md border border-gray-300 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 font-medium transition-colors"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}
