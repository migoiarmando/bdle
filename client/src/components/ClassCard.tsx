type ClassCardProps = {
  subject: string;
  time: string;
  section: string;
};

const ClassCard: React.FC<ClassCardProps> = ({ subject, time, section }) => {
  return (
    <div className="class-cards">
      <div className="class-cards-Subject">{subject}</div>
      <div className="class-cards-Time">{time}</div>
      <div className="class-cards-Teacher">{section}</div>
    </div>
  );
};

export default ClassCard;
