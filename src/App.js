import { Fragment } from 'react';
import './App.css';
import DashboardTable from './components/DashboardTable';
import Dashboard2 from './components/Dashboard2';
import Dashboard3 from './components/Dashboard3';

function App() {
  return (
    <Fragment>
      <DashboardTable/>
      <Dashboard2/>
      <Dashboard3/>
    </Fragment>
  );
}

export default App;
