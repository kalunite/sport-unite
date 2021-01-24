import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import outSource from '../../assets/outSource';
import Competition from '../../ui/pages/Football/Competition/Competition';
import TeamDetails from '../../ui/pages/Football/TeamDetails/TeamDetails';
import './FootballRoute.css';

const FootballRoute = () => {
    let cards = [],
        leagueCupsCard = [],
        leaguesCard = [];
    const cardsPush = (vessel, object) => {
        for (const key in object) {
            let [ids, leagues, countries] = key.split(' - '),
                images = vessel === leaguesCard ? object[key] : object[key].src,
                stages = vessel === leaguesCard ? null : object[key].stages,
                legs = vessel === leaguesCard ? null : object[key].legs;
            vessel.push({
                id: ids,
                link: leagues.replace(' ', '-').toLowerCase(),
                league: leagues,
                stage: stages,
                leg: legs
            });
            cards.push({
                link: leagues.replace(' ', '-').toLowerCase(),
                league: leagues,
                country: countries,
                src: images
            });
        };
    };
    cardsPush(leagueCupsCard, outSource.football.leagueCups);
    cardsPush(leaguesCard, outSource.football.leagues);
    return (
        <Router>
            <Route path="/football" exact>
                <div className="football-leagues">
                    {
                        cards.map((card, i) =>
                            <Link to={`/football/${card.link}`} key={i}>
                                <div className="league-card">
                                    <div className="logo">
                                        <img src={card.src} alt={`${card.link}-logo`} />
                                    </div>
                                    <div className="title">
                                        <h3>{card.league}</h3>
                                        <h5>{card.country}</h5>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                </div>

            </Route>
            {
                leaguesCard.map(card =>
                    <Route path={`/football/${card.link}`} key={card.id} exact>
                        <Competition
                            name={card.league}
                            link={card.link}
                            compId={card.id}
                            type="league"
                        />
                    </Route>
                )
            }
            {
                leagueCupsCard.map(card =>
                    <Route path={`/football/${card.link}`} key={card.id} exact>
                        <Competition
                            name={card.league}
                            link={card.link}
                            compId={card.id}
                            type="league-cup"
                            stages={card.stage}
                            legs={card.leg}
                        />
                    </Route>
                )
            }
            <Switch>
                <Route path="/football/team/:id" component={TeamDetails} />
            </Switch>
        </Router>
    );
};

export default FootballRoute;