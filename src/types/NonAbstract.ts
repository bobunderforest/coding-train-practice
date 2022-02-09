export type NonAbstract<C extends abstract new (...a: any) => any> = Pick<
  C,
  keyof C
> &
  (new (...a: ConstructorParameters<C>) => InstanceType<C>)
