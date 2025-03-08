import EmotionProbabilityChart from "@/components/EmotionProbabilityChart";
import FocusTimeChart from "@/components/FocusChart";
import SentenceTable from "@/components/SentenceEmotionTable";

export default function ParentPage() {
    return (
        <>
            <h1 className="text-gray-400 mb-4">Parent &gt; Focus time</h1>
            <div className="flex my-4 gap-2">
                <SentenceTable />
                <EmotionProbabilityChart/>
            </div>
            <FocusTimeChart />
        </>
    );
}