import PointsTable from '@/components/PointsTable';

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Cricket League Points Table</h1>
      <PointsTable />
    </div>
  );
}