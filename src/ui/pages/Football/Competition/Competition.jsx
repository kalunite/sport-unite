import React, { Component } from 'react';
import API from '../../../../config/API';
import FixturesList from '../../../container/Football/FIxturesList/FixturesList';
import LeagueStandings from '../../../container/Football/LeagueStandings/LeagueStandings';
import ScorersList from '../../../container/Football/ScorersList/ScorersList';
import './Competition.css';

class Competition extends Component {
    state = {
        standingsData: {
            competition: {
                name: null
            },
            standings: [
                {
                    table: []
                }
            ]
        },
        matchesData: {
            competition: {
                name: null
            },
            matches: []
        },
        scorersData: {
            competition: {
                name: null
            },
            scorers: []
        },
        teamsData: [{ id: null, crestUrl: null }],
        currentMatchday: null
    };
    componentDidMount() {
        document.title = `Football : ${this.props.name}`;
        API.football.get(`competitions/${this.props.compId}`, 'standings/?standingType=TOTAL').then(result => {
            this.setState({
                standingsData: result,
                teamsData: result.standings.map(standing => standing.table.map(list => list.team)).flat(Infinity),
                currentMatchday: result.season.currentMatchday
            }, () => {
                let params = [`matches/?matchday=${this.state.currentMatchday}`, `scorers`],
                    promises = params.map(param => API.football.get(`competitions/${this.props.compId}`, param));
                Promise.all(promises)
                    .then(result => {
                        const [matchesData, scorersData] = result;
                        this.setState({
                            matchesData: matchesData,
                            scorersData: scorersData
                        });
                    }).catch(err => alert(`${err} \n\nPeriksa Jaringan & Silahkan Coba Lagi`));
            });
        }).catch(err => alert(`${err} \n\nPeriksa Jaringan & Silahkan Coba Lagi`));
    };
    componentWillUnmount() {
        document.title = 'sportUnite';
    };
    render() {
        return (
            <div className={this.props.link}>
                <LeagueStandings standingsData={this.state.standingsData} />
                <FixturesList
                    matchesData={this.state.matchesData}
                    teamsData={this.state.teamsData}
                    matchday={this.state.currentMatchday}
                    compId={this.props.compId}
                    type={this.props.type}
                    groupLength={this.state.standingsData.standings.length}
                    stages={this.props.stages}
                    legs={this.props.legs}
                />
                <ScorersList scorersData={this.state.scorersData} teamsData={this.state.teamsData} />
            </div>
        );
    };
};

export default Competition;