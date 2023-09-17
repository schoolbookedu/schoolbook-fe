import React from 'react'
import { useSelector } from 'react-redux'
import img from '../../utils/img.png'


const Created = ({resource}) => {

  const inputTitle = useSelector((state) => state.inputTitle);
  return (
    <div className='fcourse'>
      <div className='fcourse-img'>
        <img src={img} alt="course" />
      </div>
      <div className='fcourse-text'>
        <h2>{resource?.title}</h2>
        <div className='fcourse-span'>
          <span>Tutor: Prof John Tobiloba</span>
        </div>
      </div>
    </div>
  )
}

export default Created


// resource
// : 
// createdAt
// : 
// "2023-08-10T08:29:36.215Z"
// enrollmentCount
// : 
// 0
// follows
// : 
// 0
// objectives
// : 
// "testing thy knowledge"
// outlines
// : 
// [{…}]
// price
// : 
// 70
// title
// : 
// "Physics 110"
// tutor
// : 
// "64a2b9ce7f7877ea0c107b8c"
// _id
// : 
// "64d4a0624a716cb851332db0"
// [[Prototype]]
// : 
// Object
// [[Prototype]]
// : 
// Object