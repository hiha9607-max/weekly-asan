import IssueViewer from "@/components/issue-viewer";
import { loadIssues } from "@/lib/load-issues";

export default function Home() {
  const issues = loadIssues();

  return <IssueViewer initialIssues={issues} />;
}