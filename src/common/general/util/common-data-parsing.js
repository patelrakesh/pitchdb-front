import momentTz from 'moment-timezone';

let browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

const commonDataParsing = {
  parseJSDateHuman: (date, notSeconds) => {
    let newDate = new Date(date);
    let format;
    if (notSeconds)
      format = 'MM/DD/YYYY';
    else
      format = 'MM/DD/YYYY - hh:mm a';

    let momentDate = momentTz(newDate);
    return momentDate.tz(browserTz).format(format);
  },

  parseDate: dateInMs => {
    var d = new Date(dateInMs);
    let momentDate = momentTz(d);
    return momentDate.tz(browserTz).format('MM/DD/YYYY');
  },

  trimDescription: (description, length = 350) => {
    if (description && description.length > length)
      return description.substring(0, length) + " [...]";
    else
      return description;
  },

  trimTitle: (title, length = 70) => {
    let newtitle = title;
    if (title && title.length > length)
      newtitle = title.substring(0, length) + "...";
    return newtitle;
  },

  toTitleCase: str => {
    if (str)
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });

    else
      return str;
  },

  parseGuestJob: str => {
    let retvalue = str;
    if (str) {
      const atIndex = str.indexOf(" at ");
      if (atIndex !== -1)
        retvalue = str.substring(0, atIndex);
    }
    return retvalue;
  }
};

export default commonDataParsing;
