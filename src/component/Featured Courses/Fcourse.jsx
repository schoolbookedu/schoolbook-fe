import React from 'react'
import img from '../../utils/img.png'
import './Fcourse.css'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useOverlayLoader } from '../../hooks';
import { mutations } from '../../api';



const Fcourse = ({resource}) => {

  const  {enrollCourse} = mutations;
  const navigate = useNavigate()
  const { show, showing, hide } = useOverlayLoader();

  const mutation = useMutation(enrollCourse, {
    onMutate: () => show(),
    onSuccess: () => hide(),
    onError: () => hide(),
  });


  const enrollCourseBtn = async (courseId) => {
    console.log({courseId});

   const response = await mutation.mutateAsync(courseId);
   console.log(response);
    
   if (response?.data?.data) {
    navigate (`/course-materials/${courseId}`)
   }
  
  }
  

  

  
  return (
    <div className='fcourse'>
      <div className='fcourse-img'>
        <img src={img} alt="course" />
      </div>
      <div className='fcourse-text'>
        <h2 className='uppercase'>{resource?.title}</h2>
        <div className='fcourse-span'>
          <span>Tutor: {resource?.tutor?.fullName}</span>
          <span className='amount'>${resource?.price}</span>
        </div>
        <div className='fcourse-button'>
            <button onClick={() => enrollCourseBtn(resource?._id)}>Enroll</button>
        </div>
      </div>
    </div>
  )
}

export default Fcourse

// import React from 'react'
// import img from '../../utils/img.png'
// import './Fcourse.css'
// import { useNavigate } from 'react-router-dom';
// import { useMutation } from '@tanstack/react-query';
// import { useOverlayLoader } from '../../hooks';

// const Fcourse = ({resource}) => {

//   const navigate = useNavigate()
//   const { show, showing, hide } = useOverlayLoader();

//   const enrollCourse = async (data, id) => {
//     // try {
//       // await mutation.mutateAsync({ data, id });
//       navigate(`/course-materials/${id}`); // Use backticks for template literals
//     // } catch (error) {
//     //   console.error('Error enrolling course', error);
//     // }
//   }
  
//   const mutation = useMutation(enrollCourse, {
//     onMutate: () => show(),
//     onSuccess: () => hide(),
//     onError: () => hide(),
//   });

//   return (
//     <div className='fcourse'>
//       <div className='fcourse-img'>
//         <img src={resource.thumbmail} alt="course" />
//       </div>
//       <div className='fcourse-text'>
//         <h2 className='uppercase'>{resource?.title}</h2>
//         <div className='fcourse-span'>
//           <span>Tutor: {resource?.tutor?.fullName}</span>
//           <span className='amount'>${resource?.price}</span>
//         </div>
//         <div className='fcourse-button'>
//             <button onClick={() => enrollCourse(resource?.data, resource?._id)}>Enroll</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Fcourse
