export function nameof<T>(name: keyof T): keyof T {
  return name;
}