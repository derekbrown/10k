import React from "react";
import ReactGA from "react-ga";

const useGoogleAnalytics = (category = "General") => {
  const eventTracker = (action = "action", label = "label") => {
    ReactGA.event({category, action, label});
  }
  return eventTracker;
}
export default useGoogleAnalytics;