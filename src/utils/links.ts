const withBase = (s: string) => process.env.BASE_URL + s

export const home = withBase('/')
export const vectors = withBase('/vectors/')
export const forces = withBase('/forces/')
export const dragResistance = withBase('/drag-resistance/')
