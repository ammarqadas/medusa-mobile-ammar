// import {vars} from 'nativewind';
import {ThemeColorSets} from '@styles/types';
import {applyThemes} from '@styles/utils';

export const themeColorSets: ThemeColorSets = {
  default: {
    light: {
      primary: '#8e6cef',
      background: 'white',
      backgroundSecondary: '#F0F3F8',
      content: '#18181b',
      contentInverse: 'white',
    },
    dark: {
      primary: '#ECDFCC',
      background: '#181C14',
      backgroundSecondary: '#3C3D37',
      content: 'white',
      contentInverse: 'white',
    },
  },
  vintage: {
    light: {
      primary: '#C96868',
      background: '#FFF4EA',
      backgroundSecondary: '#FFFFFF',
      content: 'black',
      contentInverse: 'white',
    },
    dark: {
      primary: '#CA7373',
      background: '#3C552D',
      backgroundSecondary: '#F0F3F8',
      content: 'white',
      contentInverse: 'black',
    },
  },
};

export const themes = applyThemes(themeColorSets);

//https://colorhunt.co/palette/c96868fadfa1fff4ea7eacb5
//https://colorhunt.co/palette/3c552dca7373d7b26deee2b5
