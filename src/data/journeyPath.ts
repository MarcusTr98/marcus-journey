import { milestones } from "./milestones";

export type PathPoint = [number, number, number];

const START: PathPoint = [0, 0, 7];
const GRADUATION_DODGE: PathPoint = [2.6, 0, -110];
const FINISH: PathPoint = [0, 0, -152];

export const TROPHY_POSITION: PathPoint = [0, 0, -110];
export const FINISH_POSITION: PathPoint = [0, 0, -149];

export const PATH_POINTS: PathPoint[] = [
  START,
  ...milestones.flatMap((milestone) =>
    milestone.id === "store" ? [milestone.position, GRADUATION_DODGE] : [milestone.position],
  ),
  FINISH,
];
