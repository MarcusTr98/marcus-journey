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

function distanceBetween(a: PathPoint, b: PathPoint) {
  return Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
}

const totalDistance = PATH_POINTS.slice(1).reduce(
  (total, point, index) => total + distanceBetween(PATH_POINTS[index], point),
  0,
);

export const MILESTONE_PROGRESS = milestones.map((milestone) => {
  let travelled = 0;
  for (let index = 1; index < PATH_POINTS.length; index += 1) {
    travelled += distanceBetween(PATH_POINTS[index - 1], PATH_POINTS[index]);
    if (PATH_POINTS[index] === milestone.position) return travelled / totalDistance;
  }
  return 0;
});

export function getMilestoneAtProgress(progress: number) {
  let active = -1;
  MILESTONE_PROGRESS.forEach((checkpoint, index) => {
    if (progress >= checkpoint - 0.008) active = index;
  });
  return active;
}
