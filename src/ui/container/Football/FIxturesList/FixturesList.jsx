import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../../config/API';
import FootballLogo from '../../../../assets/football-logo.png';
import SelectMatch from '../../../components/SelectMatch/SelectMatch';
import './FixturesList.css';

class FixturesList extends Component {
    state = {
        matchday: this.props.matchday,
        matchesData: this.props.matchesData,
        selectedMatch: null
    };
    changeMatchday = () => {
        let selectMatch = document.querySelector(`.league-section.title select`),
            firstSelect = this.props.type === 'league' ? this.props.matchday : `GROUP_STAGE - ${this.props.matchday}`,
            prevSelect = this.state.selectedMatch === null ? firstSelect : this.state.selectedMatch,
            matchday = selectMatch.value,
            stage;
        if (this.props.type !== 'league') [stage, matchday] = selectMatch.value.split(' - ');
        API.football.get(
            `competitions/${this.props.compId}`,
            `/matches/${this.props.type === 'league' || stage === 'GROUP_STAGE' ? `?matchday=${matchday}` : `?stage=${stage}`}`
        ).then(json => {
            if (json.matches.length !== 0) {
                this.setState({
                    matchday: matchday,
                    matchesData: json,
                    selectedMatch: selectMatch.value
                });
            } else {
                selectMatch.value = prevSelect;
                alert('Pertandingan belum sampai di fase ini !');
            };
        }).catch(err => {
            selectMatch.value = prevSelect;
            alert(`${err} \n\nPeriksa Jaringan & Silahkan Coba Lagi`);
        });
    };
    getMatches = (matchesData) => {
        if (
            this.props.matchesData.matches.length !== 0 &&
            this.state.matchesData.matches.length !== 0 &&
            matchesData === this.props.matchesData.matches
        ) {
            return null;
        } else {
            return (
                matchesData.map((match, index) =>
                    <div className="match" key={index}>
                        <div className="score">
                            <div className="home-team">
                                <span><Link to={`/football/team/${match.homeTeam.id}`} target="_blank">{match.homeTeam.name}</Link></span>
                                <img src={
                                    this.props.teamsData.filter(currentTeam => match.homeTeam.id === currentTeam.id).length > 0 && Boolean(this.props.teamsData.filter(currentTeam => match.homeTeam.id === currentTeam.id)[0].crestUrl) ? (
                                        this.props.teamsData.filter(currentTeam => match.homeTeam.id === currentTeam.id)[0].crestUrl
                                    ) : FootballLogo
                                } alt="." />
                            </div>
                            <div className="details">
                                {this.matchStatus(match)}
                                <span>
                                    {
                                        match.score.duration === 'PENALTY_SHOOTOUT' ? (
                                            match.score.penalties.homeTeam
                                        ) : (
                                                match.score.fullTime.homeTeam
                                            )
                                    } - {
                                        match.score.duration === 'PENALTY_SHOOTOUT' ? (
                                            match.score.penalties.awayTeam
                                        ) : (
                                                match.score.fullTime.awayTeam
                                            )
                                    }
                                </span>
                            </div>
                            <div className="away-team">
                                <img src={
                                    this.props.teamsData.filter(currentTeam => match.awayTeam.id === currentTeam.id).length > 0 && Boolean(this.props.teamsData.filter(currentTeam => match.awayTeam.id === currentTeam.id)[0].crestUrl) ? (
                                        this.props.teamsData.filter(currentTeam => match.awayTeam.id === currentTeam.id)[0].crestUrl
                                    ) : FootballLogo
                                } alt="." />
                                <span><Link to={`/football/team/${match.awayTeam.id}`} target="_blank">{match.awayTeam.name}</Link></span>
                            </div>
                        </div>
                    </div>
                )
            );
        }

    }
    matchStatus = (match) => {
        let date = [...match.utcDate].slice(0, 10).reduce((pv, cv) => pv + cv),
            time = [...match.utcDate].slice(11, 16).reduce((pv, cv) => pv + cv) + ' (UTC)',
            details = [date, time].map((d, i) => <span key={i}>{d}</span>),
            pending = [null, 'DITUNDA'].map((p, i) => <span key={i}>{p}</span>),
            cancel = [null, 'BATAL'].map((p, i) => <span key={i}>{p}</span>);
        switch (match.status) {
            case 'FINISHED':
                switch (match.score.duration) {
                    case 'PENALTY_SHOOTOUT':
                        return 'PK';
                    default:
                        return 'FT';
                };
            case 'AWARDED':
                return 'WO';
            case 'POSTPONED':
                return pending;
            case 'CANCELED':
                return cancel;
            default:
                return details;
        };
    };
    render() {
        return (
            <div className="fixtures-list">
                <div className="league-section title">
                    <h1>{this.props.matchesData.competition.name}</h1>
                    <SelectMatch
                        type={this.props.type}
                        currentMatchday={this.state.matchday}
                        groupLength={this.props.groupLength}
                        teamsData={this.props.teamsData}
                        matchday={this.props.matchday}
                        changeMatchday={this.changeMatchday}
                        stages={this.props.stages}
                        legs={this.props.legs}
                    />
                </div>
                <div className="matches">
                    {/* default matchday */}
                    {this.getMatches(this.props.matchesData.matches)}
                    {/* updated matchday */}
                    {this.getMatches(this.state.matchesData.matches)}
                </div>
            </div>
        );
    };
};

export default FixturesList;