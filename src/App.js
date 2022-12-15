import logo from './logo.svg'
import './App.css'
import ResponsiveAppBar from './components/navigationbar.js'
import SignIn from './components/signin.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EnhancedTable from './components/teamslist'
import AccountList from './components/accountslist'
import Dashboard from './components/dashboard'
import ManageEntities from './components/manageEntities/index.js'

function App() {
  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/teamlist" element={<EnhancedTable />} />
          <Route path="/accountlist" element={<AccountList />} />
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/" element={<ManageEntities />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
