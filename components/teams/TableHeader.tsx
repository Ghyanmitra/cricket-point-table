import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function PointsTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-12 text-center">Pos</TableHead>
        <TableHead>Team</TableHead>
        <TableHead className="text-center">M</TableHead>
        <TableHead className="text-center">W</TableHead>
        <TableHead className="text-center">L</TableHead>
        <TableHead className="text-center">T</TableHead>
        <TableHead className="text-center">Points</TableHead>
        <TableHead className="text-center">NRR</TableHead>
      </TableRow>
    </TableHeader>
  );
}