import React, { Component } from 'react';
import FootballLogo from '../../../../assets/football-logo.png';
import './ScorersList.css';

class ScorersList extends Component {
    render() {
        return (
            <div className="scorers-list">
                <div className="league-section title">
                    <h1>{this.props.scorersData.competition.name}</h1>
                    <h3>Top Skor</h3>
                </div>
                <ul className="scorers">
                    {
                        this.props.scorersData.scorers.map((scorer, index) =>
                            <li className="scorer" key={index}>
                                <span className="nth-place">{index + 1}.</span>
                                <div className="name">
                                    <img src={
                                        Boolean(this.props.teamsData.filter(currentTeam => scorer.team.id === currentTeam.id)[0].crestUrl) ? (
                                            this.props.teamsData.filter(currentTeam => scorer.team.id === currentTeam.id)[0].crestUrl
                                        ) : FootballLogo
                                    } alt="." />
                                    <div className="details">
                                        <h3>{scorer.player.name}</h3>
                                        <h5>{this.props.teamsData.filter(currentTeam => scorer.team.id === currentTeam.id)[0].name}</h5>
                                    </div>
                                </div>
                                <span className="goals">{scorer.numberOfGoals} Gol</span>
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    };
};

export default ScorersList;