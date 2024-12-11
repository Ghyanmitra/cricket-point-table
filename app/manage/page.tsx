"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Team } from "@/lib/types/team";
import TeamForm from "@/components/teams/TeamForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

export default function ManageTeams() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [teams, setTeams] = useState<Team[]>([]);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (session?.user?.role !== "admin") {
      router.push("/");
    } else {
      fetchTeams();
    }
  }, [status, session, router]);

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/teams");
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch teams",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team?")) return;

    try {
      const response = await fetch(`/api/teams/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Team deleted successfully",
        });
        fetchTeams();
      } else {
        throw new Error("Failed to delete team");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete team",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
  };

  const handleUpdate = async (data: any) => {
    try {
      const response = await fetch(`/api/teams/${editingTeam?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Team updated successfully",
        });
        setEditingTeam(null);
        fetchTeams();
      } else {
        throw new Error("Failed to update team");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update team",
        variant: "destructive",
      });
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Manage Teams</h1>
      
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingTeam ? "Edit Team" : "Add New Team"}
          </h2>
          <TeamForm
            onSuccess={() => {
              fetchTeams();
              setEditingTeam(null);
            }}
            initialData={editingTeam}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead className="text-center">M</TableHead>
                <TableHead className="text-center">W</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead className="text-center">T</TableHead>
                <TableHead className="text-center">Points</TableHead>
                <TableHead className="text-center">NRR</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team._id}>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell className="text-center">{team.matches}</TableCell>
                  <TableCell className="text-center">{team.won}</TableCell>
                  <TableCell className="text-center">{team.lost}</TableCell>
                  <TableCell className="text-center">{team.tied}</TableCell>
                  <TableCell className="text-center">{team.points}</TableCell>
                  <TableCell className="text-center">{team.nrr.toFixed(3)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(team)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(team._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}