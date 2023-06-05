import "./RegisterTab.css";
import InstructorLogin from "./InstructorLogin";
import StudentLogin from "./StudentLogin";

const RegisterTab = ({activeTab}) => {
  

  return (
         <div className="register">     
          {activeTab === 'instructor' && <InstructorLogin />}
          {activeTab === 'student' && <StudentLogin />}
      </div>
  )
}

export default RegisterTab

