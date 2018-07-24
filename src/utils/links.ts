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
}
