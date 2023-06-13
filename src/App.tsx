import { SimpleTemplate } from 'components';
import './App.css';
import Router from 'Routing';

function App() {
  return (
    <div className="w-full h-full">
      <SimpleTemplate>
        <Router />
      </SimpleTemplate>
    </div>
  );
}

export default App;
