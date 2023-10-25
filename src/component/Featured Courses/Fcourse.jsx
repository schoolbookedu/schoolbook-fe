import React from 'react'
import img from '../../utils/img.png'
import './Fcourse.css'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useOverlayLoader } from '../../hooks';

const Fcourse = ({resource}) => {

  const navigate = useNavigate()
  const { show, showing, hide } = useOverlayLoader();

  const enrollCourse = async (id) => {
    mutation.mutate(id);
    navigate (`/course-materials/${id}`)
  }
  
  const mutation = useMutation(enrollCourse, {
    onMutate: () => show(),
    onSuccess: () => hide(),
    onError: () => hide(),
  });

  

  
  return (
    <div className='fcourse'>
      <div className='fcourse-img'>
        <img src={img} alt="course" />
      </div>
      <div className='fcourse-text'>
        <h2 className='uppercase'>{resource?.title}</h2>
        <div className='fcourse-span'>
          <span>Tutor: Prof John Tobiloba</span>
          <span className='amount'>${resource?.price}</span>
        </div>
        <div className='fcourse-button'>
            <button onClick={() => enrollCourse(resource?.data, resource?._id)}>Enroll</button>
        </div>
      </div>
    </div>
  )
}

export default Fcourse