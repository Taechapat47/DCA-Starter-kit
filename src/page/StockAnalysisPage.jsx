import useNoScale from '../hooks/useNoScale';
import { TopSection } from '../component/TopSection';
import { BottomSection } from '../component/BottomSection';

export default function StockAnalysisPage() {
  useNoScale();

  return (
    <div className="min-h-screen bg-gray-50">
      <TopSection />
      <BottomSection />
    </div>
  );
}