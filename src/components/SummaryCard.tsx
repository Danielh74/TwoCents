
function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {

    return (
        <div className="flex flex-col flex-1 h-fit max-h-full items-center p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg ">
            <h1 className="text-2xl font-bold">{title}</h1>
            {children}
        </div>
    );
}

export default SummaryCard;