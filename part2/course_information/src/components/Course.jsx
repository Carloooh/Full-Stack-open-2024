import Part from './Part'
import Total from './Total'

const Course = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
      <Total parts={course.parts} />
    </div>
  )
}

export default Course