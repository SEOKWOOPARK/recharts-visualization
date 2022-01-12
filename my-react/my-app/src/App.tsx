import * as React from 'react';
import './App.css';
import AllGraph from './component/AllGraph';
import AllGraph2 from './component/AllGraph2';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

import NavBar from './component/AllGraph'
import RidialGraph from './component/RidialGraph';

interface SidebarType {
  title: string,
  path: string,
  cName: string
}

const sidebar: SidebarType[] = [
  {
    title: 'Home',
    path: '/',
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reports',
    cName: 'nav-text'
  },
  {
    title: 'Products',
    path: '/products',
    cName: 'nav-text'
  },
  {
    title: 'Team',
    path: '/team',
    cName: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/messages',
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    cName: 'nav-text'
  }
]

const home = () => {
  return (
    <div>home</div>
  )
}

function App() {
  return (
    
    <div className='dashboard_wrapper'>
      <Router>
        <div className="side_bar">
          <nav>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/graph1">데이터분석1</Link></li>
            <li><Link to="/graph">데이터분석2</Link></li>
            <li><Link to="/graph">데이터분석3</Link></li>
            <li><Link to="/graph">데이터분석4</Link></li>
            <li><Link to="/graph">데이터분석5</Link></li>
            <li><Link to="/graph">데이터분석6</Link></li>
            <li><Link to="/graph">데이터분석7</Link></li>
            <li><Link to="/graph">데이터분석8</Link></li>
            <li><Link to="/graph">데이터분석9</Link></li>
            <li><Link to="/graph">데이터분석10</Link></li>
            <li><Link to="/graph">데이터분석11</Link></li>
            <li><Link to="/graph">데이터분석12</Link></li>
            <li><Link to="/graph">데이터분석13</Link></li>
            <li><Link to="/graph">데이터분석14</Link></li>
            <li><Link to="/graph">데이터분석15</Link></li>
            <li><Link to="/graph">데이터분석16</Link></li>
            <li><Link to="/graph">데이터분석17</Link></li>
            <li><Link to="/graph">데이터분석18</Link></li>
            <li><Link to="/graph">데이터분석19</Link></li>
            <li><Link to="/graph">데이터분석20</Link></li>
            <li><Link to="/graph">데이터분석21</Link></li>
            <li><Link to="/graph">데이터분석22</Link></li>
          </nav>
        </div>
        <div>
          <Switch>
            <Route path="/" exact={true} component={AllGraph} />
            <Route path="/graph1" component={AllGraph} />
            {/* <Route path="/navbar" component={NavBar} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
