import { React, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

const FooterLocation = (props) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [locationData, setLocationData] = useState([]);

  async function getLocationInfo() {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${props.id}/encounters`
    );
    return data.json();
  }

  async function sortData(dataArray) {
    let dataObj = {};

    dataArray.forEach((location) => {
      location.version_details.forEach((version) => {
        if (dataObj[version.version.name]) {
          dataObj[version.version.name] = [
            ...dataObj[version.version.name],
            location.location_area.name,
          ];
        } else {
          dataObj[version.version.name] = [location.location_area.name];
        }
      });
    });
    return dataObj;
  }

  useEffect(() => {
    getLocationInfo().then((data) => {
      sortData(data).then((res) => {
        Object.keys(res).length
          ? setLocationData((prev) => res)
          : setIsLoading((prev) => false);
      });
    });
  }, []);

  useEffect(() => {
    if (Object.keys(locationData).length) {
      setIsLoading((prev) => false);
    }
  }, [locationData]);

  function pickBy(obj, arr) {
    return Object.keys(
      Object.fromEntries(Object.entries(obj).filter(([k]) => arr.includes(k)))
    );
  }

  return (
    <>
      {!isLoading && locationData && (
        <div className={`small-inner ${props.type}`}>
          <div className="back-nav">
            <div
              className="back-button"
              onClick={() => props.setIsLocationOpen((prev) => !prev)}
            >
              <IoIosArrowBack />
              <span>{`${
                props.name.charAt(0).toUpperCase() + props.name.slice(1)
              } #${props.id}`}</span>
            </div>
          </div>
          <div className={`location-info`}>
            <h1 className="dark-text">Locations</h1>
            {Object.keys(locationData).length ? (
              <>
                {pickBy(locationData, ["red", "blue", "yellow"]).length ? (
                  <div className="generation generation-1">
                    <div className="generation">
                      <h2>Generation 1</h2>
                      {pickBy(locationData, ["red", "blue", "yellow"]).map(
                        (key) => {
                          return (
                            <div className="location-container">
                              <span className="game-name">{key}</span>
                              <div className="locations">
                                {locationData[key].map((loc) => {
                                  return (
                                    <span className="location-name">{loc}</span>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {pickBy(locationData, ["gold", "silver", "crystal"]).length ? (
                  <div className="generation generation-1">
                    <div className="generation">
                      <h2>Generation 2</h2>
                      {pickBy(locationData, ["gold", "silver", "crystal"]).map(
                        (key) => {
                          return (
                            <div className="location-container">
                              <span className="game-name">{key}</span>
                              <div className="locations">
                                {locationData[key].map((loc) => {
                                  return (
                                    <span className="location-name">{loc}</span>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {pickBy(locationData, ["ruby", "sapphire", "emerald"])
                  .length ? (
                  <div className="generation generation-1">
                    <div className="generation">
                      <h2>Generation 3</h2>
                      {pickBy(locationData, [
                        "ruby",
                        "sapphire",
                        "emerald",
                      ]).map((key) => {
                        return (
                          <div className="location-container">
                            <span className="game-name">{key}</span>
                            <div className="locations">
                              {locationData[key].map((loc) => {
                                return (
                                  <span className="location-name">{loc}</span>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {pickBy(locationData, ["platinum", "heartgold", "soulsilver"])
                  .length ? (
                  <div className="generation generation-1">
                    <div className="generation">
                      <h2>Generation 4</h2>
                      {pickBy(locationData, [
                        "platinum",
                        "heartgold",
                        "soulsilver",
                      ]).map((key) => {
                        return (
                          <div className="location-container">
                            <span className="game-name">{key}</span>
                            <div className="locations">
                              {locationData[key].map((loc) => {
                                return (
                                  <span className="location-name">{loc}</span>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {pickBy(locationData, ["black", "white"]).length ? (
                  <div className="generation generation-1">
                    <div className="generation">
                      <h2>Generation 5</h2>
                      {pickBy(locationData, ["black", "white"]).map((key) => {
                        return (
                          <div className="location-container">
                            <span className="game-name">{key}</span>
                            <div className="locations">
                              {locationData[key].map((loc) => {
                                return (
                                  <span className="location-name">{loc}</span>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <h3 className="nope">No location data available</h3>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FooterLocation;
