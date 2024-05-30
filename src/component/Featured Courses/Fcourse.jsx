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
  //  console.log(response);
    
   if (response?.data?.data) {
    navigate (`/course-materials/${courseId}`)
   }
  
  }

  
  const alt = `${resource?.title} by ${resource?.tutor?.fullName}`;
  
  return (
    <div className='fcourse'>
      <div className='fcourse-img'>
        <img src={resource?.thumbnail} alt={alt} />
      </div>
      <div className='fcourse-text'>
        <h3 className='uppercase font-bold'>{resource?.title}</h3>
        <div className='fcourse-span'>
          {/* <span>Tutor: {resource?.tutor?.fullName}</span> */}
          {/* <span className='amount'>${resource?.price}</span> */}
        </div>
        <div className='fcourse-button '>
            <button className="mt-[30px] w-[100%] sm:w-[50%] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => enrollCourseBtn(resource?._id)}>Enroll</button>
        </div>
      </div>
    </div>
  )
}

export default Fcourse
