import type { StudyOrder } from "../types/study";

export const studyOrders: StudyOrder[] = [
  {
    id: "order_a",
    cases: ["simple_easy", "simple_hard", "full_easy", "full_hard"],
  },
  {
    id: "order_b",
    cases: ["full_easy", "full_hard", "simple_easy", "simple_hard"],
  },
];
