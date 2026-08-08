import { milestones } from "./milestones";

export type PathPoint = [number, number, number];

const START: PathPoint = [0, 0, 7];
const FINISH: PathPoint = [0, 0, -156];

export const TROPHY_POSITION: PathPoint = [0, 0, -112];
export const FINISH_POSITION: PathPoint = [0, 0, -152];

export const PATH_POINTS: PathPoint[] = [
  START,
  ...milestones.map(({ position }) => position),
  FINISH,
];
