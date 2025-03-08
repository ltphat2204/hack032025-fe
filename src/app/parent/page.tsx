import EmotionProbabilityChart from "@/components/EmotionProbabilityChart";
import FocusTimeChart from "@/components/FocusChart";

export default function ParentPage() {
    return (
        <>
            <h1 className="text-gray-400 mb-4">Parent &gt; Focus time</h1>
            <FocusTimeChart />
            <EmotionProbabilityChart/>
        </>
    );
}