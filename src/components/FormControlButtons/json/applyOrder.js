/**
 * Takes a JSON and applies an order field to it making it compatible 
 * with ordered JSONs.
 * 
 * @param {JSON} json JSON to apply an order field to.
 * @param {Number} order Value of the order field.
 * @param {String} orderField Optional, name of the order field. By 
 * default: _order.
 * 
 * @returns A new JSON with order field applied to it.
 */
export default function applyOrder(json, order, orderField = "_order") {
  return {
    ...json,
    [orderField]: order
  };
}
