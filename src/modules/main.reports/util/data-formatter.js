export default {
  formatSummary: (rawData) => {
    let baseResultsObject = {
      waiting: { name: 'Waiting', y: 0 },
      sent: { name: 'Email sent', y: 0 },
      opened: { name: 'Email opened', y: 0 },
      replied: { name: 'Email replied', y: 0 },
      booked: { name: 'Booked', y: 0 },
      postponed: { name: 'Not now', y: 0 }
    };

    for (const result of rawData) {
      baseResultsObject[result._id].y = result.value;
    }
    if (rawData.length > 0)
      return Object.values(baseResultsObject);
    else return [];
  },

  formatAmounts: (rawData, fromDate, toDate) => {

    let baseResultsObject = {
      series: {
        waiting: [],
        sent: [],
        opened: [],
        replied: [],
        booked: [],
        postponed: []
      },
    };

    let maxValue = 0;

    for (let d = fromDate; d <= toDate; d.setDate(d.getDate() + 1)) {
      let dateStr = d.getDate() + "/" + (d.getMonth() + 1);
      for (const key in baseResultsObject.series) {
        if (baseResultsObject.series.hasOwnProperty(key)) {
          let found = false;
          for (const result of rawData) {
            if ((result._id.date + "/" + result._id.month) === dateStr && key === result._id.category) {
              baseResultsObject.series[key].push([dateStr, result.value]);
              found = true;
              if (result.value > maxValue)
                maxValue = result.value;
              break;
            }
          }
          if (!found)
            baseResultsObject.series[key].push([dateStr, 0]);
        }
      }
    }

    baseResultsObject.maxAmount = maxValue;

    return baseResultsObject;
  }
};