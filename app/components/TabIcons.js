import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Home = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <Path d="M9 22V12h6v10" />
  </Svg>
);

const Calendar = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
    <Path d="M16 2v4" />
    <Path d="M8 2v4" />
    <Path d="M3 10h18" />
  </Svg>
);

const List = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M8 6h13" />
    <Path d="M8 12h13" />
    <Path d="M8 18h13" />
    <Path d="M3 6h.01" />
    <Path d="M3 12h.01" />
    <Path d="M3 18h.01" />
  </Svg>
);

const Bell = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9z" />
    <Path d="M13.73 21a2 2 0 01-3.46 0" />
  </Svg>
);

const Settings = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 2a4 4 0 000 8 4 4 0 000-8z" />
    <Path d="M12 14a4 4 0 100 8 4 4 0 000-8z" />
    <Path d="M6 8a4 4 0 100 8 4 4 0 000-8z" />
    <Path d="M18 8a4 4 0 100 8 4 4 0 000-8z" />
  </Svg>
);

export default {
  Home,
  Calendar,
  List,
  Bell,
  Settings
};
