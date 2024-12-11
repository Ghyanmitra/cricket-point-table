import { Team } from '@/lib/types/team';
import { TableCell, TableRow } from '@/components/ui/table';
import { Trophy } from 'lucide-react';
import { formatNRR } from '@/lib/utils/team-calculations';

interface TeamRowProps {
  team: Team;
  position: number;
}

export default function TeamRow({ team, position }: TeamRowProps) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">
        {position === 1 && (
          <Trophy className="inline-block w-4 h-4 text-yellow-500 mr-1" />
        )}
        {position}
      </TableCell>
      <TableCell className="font-medium">{team?.name}</TableCell>
      <TableCell className="text-center">{team?.matches}</TableCell>
      <TableCell className="text-center">{team?.won}</TableCell>
      <TableCell className="text-center">{team?.lost}</TableCell>
      <TableCell className="text-center">{team?.tied}</TableCell>
      <TableCell className="text-center font-bold">{team?.points}</TableCell>
      <TableCell className="text-center">{formatNRR(team?.nrr)}</TableCell>
    </TableRow>
  );
}