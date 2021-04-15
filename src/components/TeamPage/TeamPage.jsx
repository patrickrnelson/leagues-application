import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import Header from '../Header/Header'
import './TeamPage.css'

function TeamPage() {
  const dispatch = useDispatch();
  

  const climberTeams = useSelector(store => store.teams);
  const user = useSelector(store => store.user)

  const [userTeam, setUserTeam] = useState('')

  useEffect(() => {
    findUserTeam();
  }, [])

  const findUserTeam = () => {
    for(let climber of climberTeams) {
      if (climber.userId === user.id) {
        setUserTeam(climber.teamName)
      }
    }
  }

  return (
    <div className="teamContainer">
      <Header />
      <h2 className="teamName">{userTeam}</h2>
      <h3 className="leagueName">Summer League 2021</h3>
      <select>
        <option>Week 1</option>
        <option>Week 2</option>
        <option>Week 3</option>
      </select>
      <table className="teamTable">
        <thead>
          <tr>
            <td> Climber </td>
            <td> Total Score </td>
          </tr>
        </thead>
        <tbody>
          {climberTeams.map((climber) => {
            if(climber.teamName === userTeam) {
              return (
                <tr>
                  <td>{climber.username}</td>
                  <td>SCORE</td>
                </tr>
              )
            }
          })}
          {/* <tr>
            <td> Patrick </td>
            <td> 45 </td>
          </tr>
          <tr>
            <td> Zach </td>
            <td> 47 </td>
          </tr>
            <td> John </td>
            <td> 44 </td>
          <tr>
            <td> Total </td>
            <td> 136 </td>
          </tr> */}
        </tbody>
      </table>
      <button>Team Code</button>
    </div>
  );
}

export default TeamPage;
