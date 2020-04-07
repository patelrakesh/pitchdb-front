import stringOperations from '../../../common/general/util/string-operations';
import commonDataParsing from '../../../common/general/util/common-data-parsing';

export default {
  guestWorksAtBusiness: (business, guest) => {
    const businessTitle = business.companyName;
    const amountWordsBusiness = businessTitle.split(' ').length + 1;
    if (guest.company) {
      const companyCount = stringOperations.countWordOccurences(businessTitle, guest.company);
      if ((amountWordsBusiness > 1 && companyCount >= amountWordsBusiness - 1) || (amountWordsBusiness == 1 && companyCount >= 1))
        return true;
    }

    if (guest.jobTitle) {
      const jobTitleCount = stringOperations.countWordOccurences(businessTitle, commonDataParsing.parseGuestJob(guest.jobTitle));
      if ((amountWordsBusiness > 1 && jobTitleCount >= amountWordsBusiness - 1) || (amountWordsBusiness == 1 && jobTitleCount >= 1))
        return true;
    }

    return false;
  }
};