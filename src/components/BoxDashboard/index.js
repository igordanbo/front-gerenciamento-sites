import "./style.css";

export default function BoxDashboard({ title, number }) {
  return (
    <div className="box-dashboad">
      <p>{title}</p>
      <h2>{number}</h2>
    </div>
  );
}
