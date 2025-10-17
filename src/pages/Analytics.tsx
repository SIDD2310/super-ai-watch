import { AnalyticsTab } from '@/components/AnalyticsTab';
import { mockMetrics } from '@/data/extendedMockData';

const Analytics = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <AnalyticsTab metrics={mockMetrics} />
    </div>
  );
};

export default Analytics;
