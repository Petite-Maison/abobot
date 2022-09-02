import React from 'react';
import { Match } from '../app/repository/matchRepository';
import { Player } from '../app/repository/playerRepository';
import { Season } from '../app/repository/seasonRepository';
import { Team } from '../app/repository/teamRepository';

type props = {
  season: Season,
  match: Match,
  teams: Team[],
  players: Player[],
}

type Star = {
    id: string,
    name: string,
    score: number
}

function compileVotes(match: Match, teams: Team[], players: Player[]): Star[]{
  const stars: Star[] = [];
  const {messages} = match;
  Object.values(messages).forEach(votes => {
    votes.forEach((v, i) => {
      // 3 votes max
      if(i > 3){
        return;
      }
      const player = players.find(p => p.alias.includes(v));
      if(!player){
        console.error(`"${v}" does not match any player`);
      }
      const playerIndex = stars.findIndex(s => s.id === player.id);
      if(playerIndex < 0){
        stars.push( {
          id: player.id,
          name: player.name,
          score: 3 - i,
        });
        return;
      }
      stars[playerIndex].score += 3 - i;
    });
  });
  return stars;
}

export default function StarResult({season, match, teams, players}: props) {
  console.log(players, teams, match);

  if(Object.keys(match.messages).length == 0){
    return (
      <p>no votes yet</p>
    );
  }

  const stars = compileVotes(match, teams, players);

  const Star = ({star}: {star: Star}) => {
    return (
      <div>
        <p>{star.name} : {star.score}</p>
      </div>
    );
  };

  return (
    <div>{Object.values(stars).map((s) => <Star key={s.name} star={s}/>)}</div>
  );
}
