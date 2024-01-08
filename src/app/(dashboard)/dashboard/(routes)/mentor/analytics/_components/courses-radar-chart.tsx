"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    subject: 'Academics',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Business',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Computer Science',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Design',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Filming',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'Language',
    A: 65,
    B: 85,
    fullMark: 150,
  },
  {
    subject: 'Music',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Photography',
    A: 98,
    B: 130,
    fullMark: 150,
  },
];

export const CoursesRadarChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Nameu" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    );
}
