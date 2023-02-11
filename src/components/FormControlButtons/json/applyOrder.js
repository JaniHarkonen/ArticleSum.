export default function applyOrder(json, order, orderField = "_order") {
  return {
    ...json,
    [orderField]: order
  };
}
