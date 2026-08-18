import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div>
      <Header />

      <Sidebar />

      <main>
        <h1>FlowStock Pro Dashboard</h1>
        <p>Welcome to the warehouse management system.</p>
      </main>
    </div>
  );
}

export default Dashboard;