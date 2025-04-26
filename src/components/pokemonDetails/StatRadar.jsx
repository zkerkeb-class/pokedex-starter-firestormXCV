import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

const StatRadar = ({ stats }) => {
  const data = [
    { stat: 'HP', value: stats.HP },
    { stat: 'Attack', value: stats.Attack },
    { stat: 'Defense', value: stats.Defense },
    { stat: 'Sp. Attack', value: stats.SpAttack },
    { stat: 'Sp. Defense', value: stats.SpDefense},
    { stat: 'Speed', value: stats.Speed },
  ];

  // Fusion stat + value pour affichage direct
  const labeledData = data.map(item => ({
    ...item,
    label: `${item.stat} (${item.value})`
  }));

  return (
    <div style={{ width: '100%', height: 320, marginTop: '2rem' }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={labeledData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="label" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 160]} />
          <Radar
            name="Stats"
            dataKey="value"
            stroke="#00bcd4"
            fill="#00bcd4"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatRadar;
