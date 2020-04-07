import arrayQuery from 'array-query';

export default {
  parseResults: (htmlFile, network, page, currentGuests, callback) => {
    if (page > 1) {
      let clickElem = htmlFile.contentDocument.getElementsByClassName('gsc-cursor-page')[page - 1];
      if (clickElem)
        clickElem.click();
    }
    let checkSearchResults = setInterval(() => {
      let results = htmlFile.contentDocument.getElementsByClassName("gsc-webResult gsc-result");
      if ((results.length > 0 && page === 1) ||
        (results.length > 0 && htmlFile.contentDocument.getElementsByClassName('gsc-cursor-page')[page - 1].classList.contains('gsc-cursor-current-page'))) {
        clearInterval(checkSearchResults);
        let maxPage = htmlFile.contentDocument.getElementsByClassName('gsc-cursor-page').length;
        switch (network) {
          case 'linkedin':
            callback(parseLinkedInResults(results, currentGuests), maxPage);
            break;
        }
      }
    }, 300);
  },

  findCountryName: (countryCode, countryList) => {
    const result = arrayQuery("sortname").is(countryCode).on(countryList);
    if (result && result.length > 0)
      return result[0];
    else return "";
  }
};

const parseLinkedInResults = (resultsElements, currentGuests) => {
  let parsedGuests = [];
  if (resultsElements.length > 0 && resultsElements[0].innerText.startsWith("No Results"))
    return parsedGuests;
  for (let i = 0; i < resultsElements.length; i++) {
    let guest = {};

    if (resultsElements[i].getElementsByClassName('gs-image')[1])
      guest.image = resultsElements[i].getElementsByClassName('gs-image')[1].src;

    guest.name = resultsElements[i].getElementsByClassName('gs-title')[0] ?
      resultsElements[i].getElementsByClassName('gs-title')[0].textContent.split('|')[0] : '';
    if (guest.name.indexOf(' at ') > -1) {
      guest.name = guest.name.substring(0, guest.name.indexOf(' at '));
    }
    if (guest.name.indexOf(' (') > -1) {
      guest.name = guest.name.substring(0, guest.name.indexOf(' ('));
    }
    if (guest.name.indexOf('-') > -1) {
      guest.name = guest.name.substring(0, guest.name.indexOf('-'));
    }
    if (guest.name.indexOf(',') > -1) {
      guest.name = guest.name.substring(0, guest.name.indexOf(','));
    }
    guest.name.trim();

    if (resultsElements[i].getElementsByClassName('gsc-org').length && resultsElements[i].getElementsByClassName('gsc-org')[0].textContent.trim().replace('@', '') !== "") {
      guest.company = resultsElements[i].getElementsByClassName('gsc-org')[0].textContent.trim().replace('@', '');
      const atIndex = guest.company.indexOf(' at ');
      if (atIndex > 0)
        guest.company = guest.company.substring(guest.company.indexOf(' at ') + 4);

    }
    if (resultsElements[i].getElementsByClassName('gsc-role')[0])
      guest.jobTitle = resultsElements[i].getElementsByClassName('gsc-role')[0].textContent.trim();
    if (resultsElements[i].getElementsByClassName('gsc-location')[0])
      guest.location = resultsElements[i].getElementsByClassName('gsc-location')[0].textContent.trim().replace('- ', '');
    guest.selected = false;
    if (guest.company && !guestResultExists(guest.name, currentGuests))
      parsedGuests.push(guest);

  }
  return parsedGuests;
};

let guestResultExists = (guestName, currentGuests) => {
  return (arrayQuery("name").same(guestName).on(currentGuests).length > 0);
};