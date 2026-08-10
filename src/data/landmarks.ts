export type LandmarkKind =
  | "factory"
  | "campus"
  | "stage"
  | "lab"
  | "cinema"
  | "electronics"
  | "solutions"
  | "commerce"
  | "graduation"
  | "robot"
  | "smart-factory";

export const landmarkMeta: Record<string, { kind: LandmarkKind; icon: string; image?: string }> = {
  toyota: { kind: "factory", icon: "🏭" },
  fpt: { kind: "campus", icon: "🎓" },
  vhunter: { kind: "stage", icon: "🎤" },
  workshop: { kind: "lab", icon: "🧪" },
  video: { kind: "cinema", icon: "🎬" },
  electronics: { kind: "electronics", icon: "💻" },
  solutions: { kind: "solutions", icon: "🛡️" },
  store: { kind: "commerce", icon: "📱" },
  graduation: { kind: "graduation", icon: "🎓" },
  teaching: { kind: "robot", icon: "🤖" },
  future: { kind: "smart-factory", icon: "🏁" },
};
