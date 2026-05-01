
function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {

    return (
        <div className="flex flex-col flex-1 items-center p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
            <h1>{title}</h1>
            {children}
        </div>
    );
}

export default SummaryCard;