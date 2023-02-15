export default function applyTitle(json, title) {
  return {
    ...json,
    titleKey: title
  };
}
