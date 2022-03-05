import React, { useLayoutEffect, useState } from 'react';

import { headerHeight } from '../constants';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const WindowSizeContext = React.createContext();
WindowSizeContext.displayName = "WindowSizeContext";

function WindowSizeProvider({children}){
  const size = useWindowSize();
  return <WindowSizeContext.Provider value={size}>
    {children}
  </WindowSizeContext.Provider>
}

export function useGetBodyHeight() {
   const [_, windowHeight] = React.useContext(WindowSizeContext);
   return {
     md: 'calc(' + windowHeight + 'px - ' + headerHeight.md + ')',
     xs: 'calc(' + windowHeight + 'px - ' + headerHeight.xs + ')',
   }
}

export default WindowSizeProvider;