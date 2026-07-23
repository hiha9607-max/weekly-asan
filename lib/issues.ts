import { issues } from "@/data/issues";

export function getIssues() {
  return issues;
}

export function getIssueById(id: string) {
  return issues.find((issue) => issue.id === id);
}
