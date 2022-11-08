import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";
//styles
import "./Dashboard.css";

export default function Dashboard() {
  const { documents, error } = useCollection("projects");

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      {documents && <ProjectList projects={documents} />}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
