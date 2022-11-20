import Avatar from "../../components/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";

export default function ProjectSummary({ project }) {
  const { user } = useAuthContext();
  const { deleteDocument } = useFirestore("projects");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteDocument(project.id);
    history.push("/");
  };
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {/* {user.uid === project.createdBy.id && ( */}
      <button className="btn" onClick={handleSubmit}>
        Mark as complete
      </button>
      {/* )} */}
    </div>
  );
}
