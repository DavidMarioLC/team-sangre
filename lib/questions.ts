export interface Question {
  id: number;
  text: string;
  highlight: string[];
  eligibleAnswer: "si" | "no";
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Para ser Team Sangre lo ideal es tener entre 18 y 65 años, para que puedas disfrutarlo como corresponde. ¿Tienes esa edad?",
    highlight: ["Team Sangre"],
    eligibleAnswer: "si",
  },
  {
    id: 2,
    text: "¿Has tenido más de una pareja en El ámbito que tú ya sabes en los últimos 6 meses?",
    highlight: [""],
    eligibleAnswer: "no",
  },
  {
    id: 3,
    text: "¿Cómo andas de perforaciones? Nos referimos a Piercings o tatuajes… ¿te has hecho alguno en los últimos 6 meses?",
    highlight: ["Piercings o tatuajes"],
    eligibleAnswer: "no",
  },
  {
    id: 4,
    text: "La cama también es para dormir… ¿sueles dormir al menos 5 horas?",
    highlight: ["t ambién es para dormir"],
    eligibleAnswer: "si",
  },
  {
    id: 5,
    text: "A este team se entra sin dopaje. ¿Te andas metiendo cositas por la vena que no te haya recetado un Médico?",
    highlight: [],
    eligibleAnswer: "no",
  },
];
