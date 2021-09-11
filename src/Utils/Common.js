
import React, { useEffect } from "react";

export const usePersistedState = (key, defaultValue) => {
    // https://dev.to/selbekk/persisting-your-react-state-in-9-lines-of-code-9go
    const [state, setState] = React.useState(
      () => JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
}
