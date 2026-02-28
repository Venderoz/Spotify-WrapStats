import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import './Chart.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const GenreChart = ({ artists, isDarkMode }) => {
    const theme = {
        dark: { text: '#FFFFFF', bg: '#121212' },
        light: { text: '#191414', bg: '#FFFFFF' }
    };
    const currentTheme = isDarkMode ? theme.dark : theme.light;

    const chartData = useMemo(() => {
        if (!artists || artists.length === 0) return null;

        const rawCounts = {};
        artists.forEach(artist => {
            if (artist.genres) {
                artist.genres.forEach(genre => {
                    rawCounts[genre] = (rawCounts[genre] || 0) + 1;
                });
            }
        });

        const finalCounts = {};
        const availableGenres = Object.keys(rawCounts);

        availableGenres.forEach(genre => {
            const isGeneral = !genre.includes(' ');

            if (isGeneral) {
                const hasSpecificVersion = availableGenres.some(other => 
                    other !== genre && other.includes(genre)
                );
                if (!hasSpecificVersion) {
                    finalCounts[genre] = rawCounts[genre];
                }
            } else {
                finalCounts[genre] = rawCounts[genre];
            }
        });

        const sortedGenres = Object.entries(finalCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 7);
        return {
            labels: sortedGenres.map(([genre]) => genre.toUpperCase()),
            datasets: [
                {
                    data: sortedGenres.map(([, count]) => count),
                    backgroundColor: [
                        '#d1a400ff', '#2cb000ff', '#10dfc4ff', '#b90d0dff', 
                        '#cbcbcbff', '#cc00a0ff', '#7900bfff', '#217386ff', 
                        '#f58b00ff', '#006eceff',
                    ],
                    borderColor: currentTheme.bg,
                    borderWidth: 1,
                },
            ],
        };
    }, [artists, currentTheme]);

    if (!chartData) return <p>No Data Returned</p>;

    const options = useMemo(() => {
        return {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: currentTheme.text,
                        font: { family: 'Montserrat, sans-serif', size: 11 },
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    titleFont: { family: 'Montserrat sans-serif', size: 13 },
                    bodyFont: { family: 'Montserrat sans-serif', size: 13 },
                    callbacks: {
                        label: (context) => ` ${context.label}: ${context.raw} artists`
                    }
                }
            },
            maintainAspectRatio: false,
        };
    }, [isDarkMode]);

    return (
            <div className='chart-container'>
                <h1 style={{ color: currentTheme.text, marginBottom: '0' }}>
                    Top Genres
                </h1>
                <div className="chart-box">
                    <Doughnut data={chartData} options={options} />
                </div>
            </div>
    );
};

export default GenreChart;