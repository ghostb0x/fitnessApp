export interface heavyMove {
    name: string;
    totalReps: number;
    sets: {id: number, reps: number}[]
}

export interface session {
    date: string;
    time: string;
    startTime: string;    
    endTime: string;
    focusAreas: string[];
    hiitDuration: number;
    heavyMoves: heavyMove[]
}