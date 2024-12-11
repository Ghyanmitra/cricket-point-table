"use client";

import { useEffect, useState } from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Team } from '@/lib/types/team';
import { fetchTeams } from '@/lib/services/team-service';
import TeamRow from './teams/TeamRow';
import TableHeader from './teams/TableHeader';
import TeamForm from './teams/TeamForm';

export default function PointsTable() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const loadTeams = async () => {
    try {
      const data = await fetchTeams();
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleTeamAdded = () => {
    setDialogOpen(false);
    loadTeams();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team</DialogTitle>
            </DialogHeader>
            <TeamForm onSuccess={handleTeamAdded} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader />
          <TableBody>
            {teams.map((team, index) => (
              <TeamRow key={team._id} team={team} position={index + 1} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}