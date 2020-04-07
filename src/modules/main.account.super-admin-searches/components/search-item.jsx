import React from 'react';
import changeCase from 'change-case';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import commonDatParsing from '../../../common/general/util/common-data-parsing';
import SearchItemFilters from './search-item-filters';
import './search-item.css';

export default ({ search }) =>
  <div className='SearchItem row'>
    <div className="col-12">
      <div className="row">
        <div className="col-6">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text={changeCase.sentenceCase(search.type)}
          />
        </div>
        <div className="col-6">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={commonDatParsing.parseJSDateHuman(search.date)}
          />
        </div>
      </div>
      <div className="row">
        {search.keywords && search.keywords.length > 0 ?
          <React.Fragment>
            <div className="col-auto align-self-center">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
                text='Keywords:'
              />
            </div>
            {search.keywords.map((keyword, index) =>
              <div key={index} className="col-auto">
                <DisplayLabel
                  textType='display-normal tag'
                  text={keyword}
                />
              </div>
            )}
          </React.Fragment>
          :
          <React.Fragment>
            <div className="col-auto">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
                text='Keywords:'
              />
            </div>
            <div className="col-auto">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text='None'
              />
            </div>
          </React.Fragment>
        }
      </div>
      {search.filters &&
        <SearchItemFilters filters={search.filters} />
      }
      {search.type !== 'peopleSearch' ?
        <div className="row col-12">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={search.results + ' result(s)'}
          />
        </div>
        : ''}
      {search.userId &&
        <div className="row">
          <div className="col-auto">
            <DisplayLabel
              textType={textTypes.DISPLAY_SUB_SUBTITLE}
              text='User:'
            />
          </div>
          <div className="col-auto">
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={search.userId.name + ' (' + search.userId.email + ')'}
            />
          </div>
        </div>
      }
    </div>
  </div>;