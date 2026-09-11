import type { CSSProperties } from "react";

const palette: Record<string,[string,string,string]> = {
  FOL:["#dce9df","#355342","#355342"], DAR:["#e5e1f0","#4d466a","#4d466a"], EXG:["#f3e4d8","#6a4933","#6a4933"],
  COU:["#eee5c9","#66562d","#66562d"], PRO:["#e0e8ee","#3d5668","#3d5668"], ARS:["#ece0e7","#67475a","#67475a"],
  GOE:["#e7e2dc","#5d5146","#5d5146"], MAT:["#dce7e9","#3f5c62","#3f5c62"], TSP:["#e5e6da","#555c38","#555c38"],
  REC:["#eee1e1","#694646","#694646"], BOI:["#e3e0d8","#5a5448","#5a5448"]
};
export function subjectStyle(code:string){const [soft,dark,border]=palette[code]??["#e8e8e5","#454844","#8b928a"];return {"--subject-soft":soft,"--subject-dark":dark,"--subject":border} as CSSProperties;}
