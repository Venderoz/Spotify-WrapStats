import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Chart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const PopularityChart = ({ tracks, isDarkMode }) => {
        const theme = {
        dark: { text: '#FFFFFF', bg: '#121212', green: '#28c960'},
        light: { text: '#191414', bg: '#FFFFFF', green: '#1ed35d'}
    };
    const currentTheme = isDarkMode ? theme.dark : theme.light;
    
    const { chartData, score, label } = useMemo(() => {
        if (!tracks || tracks.length === 0) return {};

        let totalPopularity = 0;
        tracks.forEach(track => {
            totalPopularity += track.popularity;
        });

        const avgScore = Math.round(totalPopularity / tracks.length);

        let textLabel = "Balanced";
        if (avgScore > 75) textLabel = "Top 40 Listener";
        else if (avgScore > 55) textLabel = "Mainstream";
        else if (avgScore > 30) textLabel = "Explorer";
        else textLabel = "Total Hipster";

        return {
            score: avgScore,
            label: textLabel,
            chartData: {
                labels: ['Popularity', 'Remaining'],
                datasets: [
                    {
                        data: [avgScore, 100 - avgScore],
                        backgroundColor: [
                            isDarkMode ? '#1DB954' : '#1DB954',
                            isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        ],
                        borderWidth: 0,
                        circumference: 180,
                        rotation: 270,
                    },
                ],
            }
        };
    }, [tracks, isDarkMode]);

    const options = {
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        },
        maintainAspectRatio: false,
        cutout: '80%',
    };

    if (!chartData) return null;

    return (
        <div className="chart-container" style={{ flexDirection: 'column', gap: '10px' }}>
            
            <h1 style={{ color: currentTheme.text, marginBottom: '0' }}>
                Mainstream Score
            </h1>

            <div style={{ position: 'relative', height: '180px', width: '300px' }}>
                <Doughnut data={chartData} options={options} />
                <div style={{
                    position: 'absolute',
                    top: '60%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: currentTheme.text
                }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{score}%</div>
                    <div style={{ fontSize: '1rem', opacity: 0.7, textTransform: 'uppercase' }}>{label}</div>
                </div>
            </div>

            <p style={{ 
                color: currentTheme.text, 
                fontSize: '1.2rem', 
                textAlign: 'center',
                maxWidth: '300px'
            }}>
                {score > 50 
                    ? "You mostly listen to popular hits known by everyone." 
                    : "You dig deep into the underground scene."}
            </p>
        </div>
    );
};

export default PopularityChart;