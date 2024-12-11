import { NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import { Team } from '@/lib/models/Team';

export async function GET() {
  try {
    await connect();
    const teams = await Team.find().sort({ points: -1, nrr: -1 });
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connect();
    const data = await request.json();
    const team = await Team.create(data);
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create team' },
      { status: 500 }
    );
  }
}