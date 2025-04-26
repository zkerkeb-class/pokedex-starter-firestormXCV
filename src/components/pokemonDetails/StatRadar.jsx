import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const StatRadar = ({ stats1, stats2 = null }) => {
  if (!stats1) {
    return <div>Chargement des stats...</div>;
  }

  const data = [
    { stat: 'HP', p1: stats1.HP, p2: stats2?.HP },
    { stat: 'Attack', p1: stats1.Attack, p2: stats2?.Attack },
    { stat: 'Defense', p1: stats1.Defense, p2: stats2?.Defense },
    { stat: 'Sp. Attack', p1: stats1.SpAttack, p2: stats2?.SpAttack },
    { stat: 'Sp. Defense', p1: stats1.SpDefense, p2: stats2?.SpDefense },
    { stat: 'Speed', p1: stats1.Speed, p2: stats2?.Speed },
  ];

  // 👉 Fonction pour formater chaque label du radar
  const formatLabel = (entry) => {
    const p1 = data.find(d => d.stat === entry)?.p1;
    const p2 = data.find(d => d.stat === entry)?.p2;

    if (stats2) {
      return `${p1 ?? '-'} ${entry} ${p2 ?? '-'}`;
    } else {
      return `${p1 ?? '-'} ${entry}`;
    }
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="stat" 
            tickFormatter={formatLabel}
            tick={{ fontSize: 12 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 160]} />
          <Radar
            name="Pokémon 1"
            dataKey="p1"
            stroke="#ff4d4f"
            fill="#ff4d4f"
            fillOpacity={0.6}
          />
          {stats2 && (
            <Radar
              name="Pokémon 2"
              dataKey="p2"
              stroke="#1890ff"
              fill="#1890ff"
              fillOpacity={0.6}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatRadar;
