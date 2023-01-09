const createDatacentre = (name, location, built, greenElecPercentage, serversInDC) => {
  return {
    name: name,
    location: location,
    built: built,
    greenElecPercentage: greenElecPercentage,
  };
};

const createServerType = (manufacturer, model, perf_rating, power_consumption) => {
  return {
    manufacturer: manufacturer,
    model: model,
    perf_rating: perf_rating,
    power_consumption: power_consumption
  };
};

function mungeYears(numOfYears, date = new Date()) {
  date.setFullYear(date.getFullYear() + numOfYears);

  return date;
}

const datacentres = [
  createDatacentre(
    'Shiny New Floating Offshore DC#1',
    'https://what3words.com/circumstance.irrigation.traumatic',
    mungeYears(10),
    100
  ),
  createDatacentre(
    'Scabby Old DC#1',
    'https://what3words.com/exact.beyond.light',
    mungeYears(-40),
    34
  ),
  createDatacentre(
    'Scabby Old DC#2',
    'https://what3words.com/slows.ally.hired',
    mungeYears(-34),
    45
  ),
];

const servertypes = [
  createServerType(
    'HAL',
    'p670',
    7000,
    10000
  ),
  createServerType(
    'NimbleMicrosystems',
    'X7',
    3000,
    1200
  ),
  createServerType(
    'Fudgitso',
    'M64K',
    12000,
    12000
  ),
  createServerType(
    'Strawberry',
    'Shortcake',
    300,
    10
  ),
];

export default [datacentres, servertypes];
