export const sortDoctors = <Doctor extends { order: number }>(
  doctors: readonly Doctor[],
) => [...doctors].sort((first, second) => first.order - second.order);
