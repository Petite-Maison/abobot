import React, { FunctionComponent, useState } from 'react';
import style from './CreateMatch.module.scss';

type Props = {
}

type TeamSelectorProps = {
  teams: string[], 
  setTeams: (teams: string[]) => void
}

const TeamSelector: FunctionComponent<TeamSelectorProps> = () => {
  return (
    <p>Team selector</p>
  );
};

export const CreateMatch: FunctionComponent<Props> = ({ }) => {
  const [teams, setTeams] = useState<string[]>([]);
  return (
  <div className={style.CreateMatch}>
    <TeamSelector {...{setTeams, teams}}/>
  </div>
  );
};