import { useState } from "react";

/**
 * Simple custom hook that provides a `refresh`-function for components
 * that should be re-rendered manually. The hook works by holding a 
 * state which is changed to the current system time in milliseconds as 
 * soon as `refresh` is called. The `refreshValue` is also provided to 
 * the React-component, which can include the value in the `useEffect`-
 * hook to trigger the refresh.
 */
export default function useRefresh() {
  const [refreshValue, setRefreshValue] = useState(Date.now());

  const refresh = () => setRefreshValue(Date.now());

  return { refreshValue, refresh };
}
