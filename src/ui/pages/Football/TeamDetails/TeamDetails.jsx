import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../../config/API';
import footballLogo from '../../../../assets/football-logo.png';
import outSource from '../../../../assets/outSource';
import './TeamDetails.css';

class TeamDetails extends Component {
    state = {
        id: this.props.match.params.id,
        teamData: {
            area: {
                name: null
            },
            activeCompetitions: [],
            name: null,
            tla: null,
            crestUrl: footballLogo,
            addres: null,
            phone: null,
            website: '',
            email: null,
            founded: null,
            clubColors: null,
            venue: null,
            squad: []
        }
    };
    getClubColor = (colors) => {
        if (colors === null) return null;
        let colorsArr = colors.toLowerCase().split(' / ');
        return (
            colorsArr.map((color, i) =>
                <div className="club-color" style={{ backgroundColor: color.split(' ').reduce((pv, cv) => pv + cv) }} key={i}></div>
            )
        );
    };
    getCompetition = (get, compId) => {
        for (const key in outSource.football.leagues) {
            let [id, name, country] = key.split(' - ');
            country = country.toLowerCase();
            if (compId === parseInt(id)) {
                return get === 'URI' ? name.replace(' ', '-').toLowerCase() : outSource.football.leagues[key];
            };
        };
        for (const key in outSource.football.leagueCups) {
            let [id, name, country] = key.split(' - ');
            country = country.toLowerCase();
            if (compId === parseInt(id)) {
                return get === 'URI' ? name.replace(' ', '-').toLowerCase() : outSource.football.leagueCups[key].src;
            };
        };
        return get === 'URI' ? '' : footballLogo;
    };
    getPosShorthand = (pos) => {
        switch (pos) {
            case 'Goalkeeper':
                return 'GK';
            case 'Defender':
                return 'DF';
            case 'Midfielder':
                return 'MF';
            case 'Attacker':
                return 'FW';
            case 'COACH':
                return 'C';
            case 'ASSISTANT_COACH':
                return 'AC';
            default:
                return 'S';
        };
    };
    componentDidMount() {
        document.title = `Football : ${this.state.teamData.name}`;
        API.football.get('teams', this.state.id)
            .then(json => {
                this.setState({
                    teamData: json
                })
            }).catch(err => {
                alert(`${err} \n\nPeriksa Jaringan & Silahkan Coba Lagi`);
            });
    };
    componentDidUpdate() {
        document.title = `Football : ${this.state.teamData.name}`;
    };
    render() {
        return (
            <div className="team-details">
                <div className="title">
                    <img src={Boolean(this.state.teamData.crestUrl) ? this.state.teamData.crestUrl : footballLogo} alt="." />
                    <h2>{this.state.teamData.name}</h2>
                    {
                        this.state.teamData.name !== this.state.teamData.area.name ? (
                            <h4>{this.state.teamData.area.name}</h4>
                        ) : null
                    }
                </div>
                <div className="details">
                    <table>
                        <tbody>
                            <tr>
                                <td>Berdiri</td>
                                <td>{this.state.teamData.founded}</td>
                            </tr>
                            <tr>
                                <td>Singkatan</td>
                                <td>{this.state.teamData.tla}</td>
                            </tr>
                            <tr>
                                <td>Warna Tim</td>
                                <td>{this.getClubColor(this.state.teamData.clubColors)}</td>
                            </tr>
                            <tr>
                                <td>Markas</td>
                                <td>{this.state.teamData.venue}</td>
                            </tr>
                            <tr>
                                <td>Alamat</td>
                                <td>{this.state.teamData.address}</td>
                            </tr>
                            <tr>
                                <td>Situs Web</td>
                                <td>
                                    <a href={this.state.teamData.website}>{this.state.teamData.website}</a>
                                </td>
                            </tr>
                            <tr>
                                <td>E-mail</td>
                                <td>{this.state.teamData.email}</td>
                            </tr>
                            <tr>
                                <td>Telepon</td>
                                <td>{this.state.teamData.phone}</td>
                            </tr>
                            <tr>
                                <td>Kompetisi Aktif</td>
                                <td>
                                    <ul>
                                        {
                                            this.state.teamData.activeCompetitions.map(ac =>
                                                <li key={ac.id}>
                                                    <img src={this.getCompetition('IMG', ac.id)} alt="." />
                                                    <Link to={`/football/${this.getCompetition('URI', ac.id)}`}>{ac.name}</Link>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="squad">
                    <ul>
                        <li className="squad-list">Pemain & Staff</li>
                        {
                            this.state.teamData.squad.map(sq =>
                                <li key={sq.id} className="squad-list">
                                    <div className="position">
                                        <span className={(sq.role === 'PLAYER' ? sq.position : sq.role).toLowerCase()}>
                                            {this.getPosShorthand(sq.role === 'PLAYER' ? sq.position : sq.role)}
                                        </span>
                                    </div>
                                    <div className="squad-details">
                                        <h3>{sq.name}</h3>
                                        <h5>{sq.nationality}</h5>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    };
};

export default TeamDetails;