
export interface session {
    date: string;
    startTime: string;    
    endTime: string;
    timeSpent: string;
    focusAreas: focusAreaNames[];
    hiitDuration: number;
    heavyMoves: heavyMove[];
    difficulty: number;
}

export type focusAreaNames = 
| "Legs" 
| "Abs" 
| 'Lower Back' 
| 'Upper Back + Biceps' 
| 'Chest'


export interface focusAreaType {
    id: number;
    name: focusAreaNames;
    imageSlug: string;
    heavyMoves: string[];
}


export interface heavyMove {
    name: string;
    totalReps: number;
    sets: {id: number, reps: number}[]
}