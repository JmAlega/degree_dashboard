import React from 'react';
import Header from './Components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header className="App-header" />
        <Router>
          <Switch>
            {
            /*
              Public Routes
            */
            }

            <Route path='/login' component={Login} />
            <Route path='/sign-up' component={SignUp} />

            {
            /* 
              Private Routes
            */
            }

            {/* Main Page */}
            <ProtectedRoute exact path='/' component={Index} />

            {/* Dashboard */}
            <ProtectedRoute path='/dashboard' component={Dashboard} />

            {/* Course View */}
            <ProtectedRoute path='/course-view' component={CourseView} />
          </Switch>

        </Router>
      
    </div>
  );
}

export default App;
