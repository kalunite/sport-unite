import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import winColor from '../../../../assets/win-color.png';
import drawColor from '../../../../assets/draw-color.png';
import loseColor from '../../../../assets/lose-color.png';
import FootballLogo from '../../../../assets/football-logo.png';
import './LeagueStandings.css';

class LeagueStandings extends Component {
    convertToColor = (text) => {
        let colors = text.split(','),
            totalForm = null,
            selectingColor = (letter) => {
                switch (letter) {
                    case 'W':
                        return winColor;
                    case 'L':
                        return loseColor;
                    default:
                        return drawColor;
                };
            };
        colors = colors.map((color, index) => <img key={index} src={selectingColor(color)} alt="." />).slice(0, 5);
        totalForm = colors.length;
        if (totalForm < 5) {
            for (let i = 0; i < (5 - totalForm); i++) {
                colors.push(<div key={totalForm + i}></div>);
            };
        };
        return colors;
    };
    render() {
        return (
            <div className="standings">
                <div className="league-section title">
                    <h1>{this.props.standingsData.competition.name}</h1>
                    <h3>Klasemen</h3>
                </div>
                <div className="standing-area">
                    {
                        this.props.standingsData.standings.map((standing, key) =>
                            <div key={key}>
                                {this.props.standingsData.standings.length > 1 ? <h3>{standing.group.replace('GROUP_', 'GRUP ')}</h3> : null}
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Pos</td>
                                            <td>Klub</td>
                                            <td>Main</td>
                                            <td>M <img src={winColor} alt="." /></td>
                                            <td>S <img src={drawColor} alt="." /></td>
                                            <td>K <img src={loseColor} alt="." /></td>
                                            <td>Poin</td>
                                            <td>Gol+</td>
                                            <td>Gol-</td>
                                            <td>SGol</td>
                                            <td>5 Hasil Terakhir</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            standing.table.map(stand =>
                                                <tr key={stand.team.id}>
                                                    <td>{stand.position}.</td>
                                                    <td className="team">
                                                        <img src={Boolean(stand.team.crestUrl) ? stand.team.crestUrl : FootballLogo} alt="." />
                                                        <span><Link to={`/football/team/${stand.team.id}`} target="_blank">{stand.team.name}</Link></span>
                                                    </td>
                                                    <td>{stand.playedGames}</td>
                                                    <td>{stand.won}</td>
                                                    <td>{stand.draw}</td>
                                                    <td>{stand.lost}</td>
                                                    <td>{stand.points}</td>
                                                    <td>{stand.goalsFor}</td>
                                                    <td>{stand.goalsAgainst}</td>
                                                    <td>{stand.goalDifference}</td>
                                                    <td>{stand.form !== null ? this.convertToColor(stand.form) : '-'}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    };
};

export default LeagueStandings;