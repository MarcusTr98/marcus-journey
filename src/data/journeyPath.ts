import { milestones } from "./milestones";

export type PathPoint = [number, number, number];

const START: PathPoint = [0, 0, 7];
const FINISH: PathPoint = [0, 0, -225];

export const TROPHY_POSITION: PathPoint = [-2.4, 0, -169];
export const FINISH_POSITION: PathPoint = [0, 0, -221];

export const PATH_POINTS: PathPoint[] = [
  START,
  ...milestones.map(({ position }) => position),
  FINISH,
];
