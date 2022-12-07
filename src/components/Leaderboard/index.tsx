import { Avatar } from 'antd';
import { useMemo } from 'react';
import './Leaderboard.scss';

const Leaderboard = (props: any) => {
  const { students, leaderboard, onlines }: any = props;

  const listStudentOnline = useMemo(() => {
    const result: any[] = [];
    students.forEach((student: any) => {
      const newStudent: any = { ...student };
      newStudent.score = leaderboard?.[newStudent.id] || 0;
      if (onlines.includes(newStudent.id)) result.push(newStudent);
    });

    // Sort answer higher to lower
    result.sort((a, b) => b.score - a.score);

    return result;
  }, [onlines, students, leaderboard]);
  return (
    <div className="Leaderboard">
      <div className="topLeadersList">
        {listStudentOnline.map((student, index) => (
          <div className="leader" key={student.id}>
            {index + 1 <= 3 && (
              <div className="containerImage">
                {student.image ? (
                  <img
                    className="image"
                    loading="lazy"
                    src={student.image}
                    alt={student.image}
                  />
                ) : (
                  <Avatar className="image">
                    {student.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <div className="crown">
                  <svg
                    id="crown1"
                    fill="#0f74b5"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 50"
                  >
                    <polygon
                      className="cls-1"
                      points="12.7 50 87.5 50 100 0 75 25 50 0 25.6 25 0 0 12.7 50"
                    />
                  </svg>
                </div>
                <div className="leaderName">
                  {student.lastName + ' ' + student.firstName}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="playerslist">
        <div className="table">
          <div>#</div>

          <div>Name</div>

          <div>Score</div>
        </div>
        <div className="list">
          {listStudentOnline.map((student, index) => (
            <div className="player" key={student.id}>
              <span> {index + 1}</span>
              <div className="user">
                {student.image ? (
                  <img className="image" src={student.image} />
                ) : (
                  <Avatar>{student.firstName.charAt(0).toUpperCase()}</Avatar>
                )}

                <span> {student.lastName + ' ' + student.firstName} </span>
              </div>
              <span> {leaderboard?.[student.id]} </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
