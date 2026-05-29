
function Card({ title, children, fill = false }: { title: string; children: React.ReactNode, fill?: boolean }) {
    return (
        <div className={`flex flex-col flex-1 ${fill ? "h-full min-h-0" : ""} items-center p-4 rounded-2xl bg-white shadow-md dark:bg-gray-700 dark:shadow-gray-600 black/30`}>
            <h2 className="text-lg font-bold shrink-0 mb-4">{title}</h2>

            <div className={fill ? "flex-1 min-h-0 w-full overflow-hidden" : "w-full"}>
                {children}
            </div>
        </div>
    );
}

export default Card;