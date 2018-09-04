const withBase = (s: string) => process.env.BASE_URL + s

// tslint:disable:object-literal-sort-keys
export const links = {
  home: {
    link: withBase('/'),
    text: 'Home',
  },
  vectors: {
    link: withBase('/vectors/'),
    text: 'Vectors',
  },
  forces: {
    link: withBase('/forces/'),
    text: 'Forces',
  },
  dragResistance: {
    link: withBase('/drag-resistance/'),
    text: 'Drag Resistance',
  },
  gravityAttraction: {
    link: withBase('/gravity-attraction/'),
    text: 'Gravity Attraction',
  },
  mutalAttraction: {
    link: withBase('/mutal-attraction/'),
    text: 'Mutal Attraction',
  },
  portDefender: {
    link: withBase('/port-defender/'),
    text: 'Port Defender',
  },
  harmonicMotion: {
    link: withBase('/harmonic-motion/'),
    text: 'Harmonic Motion',
  },
  pendulum: {
    link: withBase('/pendulum/'),
    text: 'Pendulum',
  },
  spring: {
    link: withBase('/spring/'),
    text: 'Spring',
  },
}
