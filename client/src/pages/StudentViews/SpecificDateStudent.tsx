import React from 'react';
import '../../styles/SpecificDate.css';
import StudentSidebar from '../../components/StudentSidebar';
import StudentNavbar from '../../components/StudentNavbar';

type ClassCardProps = {
  subject: string;
  time: string;
  teacher: string;
};

type RecordsProps = {
  title: string;
  placeholder: string;
  records: string[];
};

const DateCard: React.FC = () => {
  return (
    <div className="date-container">
      <div className="date-week">Tue</div>
      <div className="date-day">3</div>
    </div>
  );
};

const ClassCard: React.FC<ClassCardProps> = ({ subject, time, teacher }) => {
  return (
    <div className="class-cards">
      <div className="class-cards-Subject">{subject}</div>
      <div className="class-cards-Time">{time}</div>
      <div className="class-cards-Teacher">{teacher}</div>
    </div>
  );
};

const Records: React.FC<RecordsProps> = ({ title, placeholder, records }) => {
  return (
    <div className="student">
      <h4>{title}</h4>
      <h5>{placeholder}</h5>
      {records.map((record, index) => (
        <p key={index}>{record}</p>
      ))}
    </div>
  );
};

const SpecificDateStudent: React.FC = () => {
  const studentNames = Array(6).fill('Karl Axcel E. Lumabi');
  const ignRecords = Array(6).fill('Kash');
  const questionRecords = Array(6).fill('goods');

  return (
    <div className="nav-container">
      <StudentSidebar />
      <div className="main-container">
      <StudentNavbar />

        <div className="container-subject">
          <DateCard />
          <div className="subject">
            <ClassCard
              subject="ITMC 113"
              time="TTH 1:30PM - 3:00PM"
              teacher="Kevin G. Vega"
            />
          </div>
        </div>
        <div className="records-container">
          <Records title="Names" records={studentNames} placeholder={''} />
          <Records title="IGN" placeholder="" records={ignRecords} />
          <Records
            title="Question of the day"
            placeholder=""
            records={questionRecords}
          />
        </div>
      </div>
    </div>
  );
};

export default SpecificDateStudent;
