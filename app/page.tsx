import IssueViewer from "@/components/issue-viewer";
import { getIssues } from "@/lib/issues";

export default function Home() {
  return <IssueViewer initialIssues={getIssues()} />;
}
