export async function getInitialState() {
  return { name: "@umijs/max" };
}

export function layout() {
  return {
    menu: { locale: false }
  };
}
