import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import commonDataParsing from '../../../common/general/util/common-data-parsing';
import moment from 'moment';
import changeCase from 'change-case';
import './search-item.css';
import './search-item-filters.css';

export default ({ filters }) =>
  <div className="SearchItemFilters row">

    {Object.keys(filters).map((property, index) =>
      <div className="col-12 row" key={index}>
        <div className="col-auto">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text={changeCase.sentenceCase(property) + ':'}
          />
        </div>

        {typeof filters[property] === 'string' && !moment(filters[property]).isValid() &&
          <div className="col-auto">
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={changeCase.upperCaseFirst(filters[property])}
            />
          </div>
        }

        {typeof filters[property] === 'string' && moment(filters[property]).isValid() &&
          <div className="col-auto">
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={commonDataParsing.parseDate(filters[property])}
            />
          </div>
        }

        {Array.isArray(filters[property]) &&
          <React.Fragment>
            {filters[property].length > 0 ? filters[property].map((item, itemIndex) =>
              <div key={itemIndex} className="col-auto">
                <DisplayLabel
                  textType="display-normal tag"
                  text={item}
                />
              </div>
            )
              :
              <div className="col-auto">
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text='None'
                />
              </div>
            }
          </React.Fragment>
        }
      </div>
    )}
  </div>;