
export interface session {
    startTime: Date;    
    endTime: Date;
    timeSpent: Date;
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