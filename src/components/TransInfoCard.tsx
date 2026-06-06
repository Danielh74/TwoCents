import { formatDate, useSettings } from '@/lib/settings-context'
import { useTranslations } from '@/lib/translations';
import { Transaction } from '@/types/transaction';

type Props = {
    type: string;
    transaction: Transaction;
    deleteTransaction: (id: string) => void;
    editTransaction: (transaction: Transaction) => void;
    pending: boolean
}
function TransInfoCard({ type, transaction, deleteTransaction, editTransaction, pending }: Props) {
    const { _id, title, category, date, notes, amount } = transaction
    const { currency, showCents, dateFormat } = useSettings();

    const t = useTranslations();
    const cDec = showCents ? 2 : 0;
    const buttons = {
        editBtn: type === 'income' ? t.income.editBtn : t.expenses.editBtn,
        deleteBtn: type === 'income' ? t.income.deleteBtn : t.expenses.deleteBtn
    };

    const symbol = type === 'income' ? '+' : '-';

    return (
        <div
            key={_id}
            className="flex justify-between items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
        >
            <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{title}</p>
                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>{category}</span>
                    <span>{formatDate(date, dateFormat)}</span>
                </div>
                {notes && <p className="text-xs text-gray-400 mt-2 italic">{notes}</p>}
            </div>
            <div className="flex gap-2 ms-4 items-center">
                <span className={`text-lg font-bold ${type === 'income' ? 'text-green-500' : 'text-red-500'} min-w-fit`}>
                    {symbol}{currency}{amount.toFixed(cDec)}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => editTransaction(transaction)}
                        disabled={pending}
                        className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors disabled:opacity-50"
                    >
                        {buttons.editBtn}
                    </button>
                    <button
                        onClick={() => deleteTransaction(_id)}
                        disabled={pending}
                        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors disabled:opacity-50"
                    >
                        {buttons.deleteBtn}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TransInfoCard