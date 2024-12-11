import { TeamFormData } from '../types/team';
import { calculatePoints, calculateMatches } from '../utils/team-calculations';

export async function fetchTeams() {
  const response = await fetch('/api/teams');
  if (!response.ok) {
    throw new Error('Failed to fetch teams');
  }
  return response.json();
}

export async function createTeam(data: TeamFormData) {
  const won = data.won || 0;
  const lost = data.lost || 0;
  const tied = data.tied || 0;
  
  const teamData = {
    ...data,
    won,
    lost,
    tied,
    matches: calculateMatches(won, lost, tied),
    points: calculatePoints(won, tied),
    nrr: data.nrr || 0,
  };

  const response = await fetch('/api/teams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teamData),
  });

  if (!response.ok) {
    throw new Error('Failed to create team');
  }

  return response.json();
}