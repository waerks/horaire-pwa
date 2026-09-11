export type Subject = {
  code: string; name: string; hours: number; teacher: string; startDate: string; endDate: string;
};
export type Session = { id: string; date: string; code: string; room: string; start: string; end: string; };
export type Schedule = { meta: { schoolYear:string; className:string; center:string; address:string; location:string; trade:string; courseDay:string; hours:{semester1:number;semester2:number;total:number} }; subjects: Record<string, Subject>; sessions: Session[] };
