import { useState, useEffect } from "react";

export const useScrollPosition = () => {
  // Define state variable 'scrollPosition' to hold the current scroll position
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // useEffect hook to perform side effects in function components
  useEffect(() => {
    // Define a function to handle scroll events
    const handleScroll = () => {
      // Get the current vertical scroll position of the window
      const position = window.scrollY;
      // Update the state variable 'scrollPosition' with the new scroll position
      setScrollPosition(position);
    };

    // Add event listener for the 'scroll' event, calling 'handleScroll' when triggered
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener when the component unmounts or re-renders
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this effect only runs once when the component mounts

  // Return the current scroll position to the component that uses this hook
  return scrollPosition;
};
