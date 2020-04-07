import React from 'react';
import ActionButton, { buttonTypes } from '../../general/components/action-button';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ActionIcon from '../../general/components/action-icon';
import Modal from 'react-aria-modal';
import Paginate from '../../general/components/paginate';
import ListAddModal from '../../list-common/components/list-add-modal';
import ProgressBar from '../../general/components/progress-bar';
import numeral from 'numeral';
import ScrollTrigger from 'react-scroll-trigger';
import './search-results-panel.css';

const SearchResultsPanel = (props) => (
  <div id="results-main" className="SearchResultsPanel container-fluid">
    {props.modalIsOpen &&
      <Modal
        titleId={props.titleId}
        verticallyCenter={true}>
        <ListAddModal {...props} searchType={props.searchType} pluralType={props.pluralType} />
      </Modal>
    }
    <div className="row">
      {props.resultsCurrent.length > 0 ?
        <div id="cont-results"
          className="col-12 cont-results"
          onScroll={props.handleScroll}>
          {!props.itemDetail ?
            <div id="results-header" className="row results-header">
              <div className="col-9 col-lg-3">
                <DisplayLabel
                  textType={textTypes.DISPLAY_TITLE}
                  text={(props.headerTitle ? props.headerTitle : (props.searchResults.total ? `Showing ${numeral(props.searchResults.total).format('0,0')} of ${props.totalResultsStr}` : ""))} />
              </div>
              <div className="col-3 col-lg-1 d-flex">
                {!props.loadOnly &&
                  <>
                    <div className="align-self-center list-toggle-icon">
                      <ActionIcon
                        dataId="i-confirm"
                        tooltip="Infinite List View"
                        icon={"fas fa-th-list"}
                        onClick={props.toggleListViewMode}
                      />
                    </div>
                    <div className="align-self-center">
                      <ActionIcon
                        dataId="i-cancel"
                        tooltip="Pages View"
                        icon={"fas fa-columns"}
                        onClick={props.togglePageViewMode}
                      />
                    </div>
                  </>
                }

              </div>
              <div className="col-6 col-lg-2">
                <ActionButton
                  buttonType={buttonTypes.SECONDARY_ACTION}
                  onClick={() => props.toggleSelectionAll(true)}
                  text={"Select all"}
                />
              </div>
              <div className="col-6 col-lg-2">
                <ActionButton
                  buttonType={buttonTypes.SECONDARY_ACTION}
                  onClick={() => props.toggleSelectionAll(false)}
                  text={"Deselect all"}
                />
              </div>
              {!props.addModalDisabled &&
                <div className="offset-2 offset-lg-0 col-8 col-lg-2">
                  <ActionButton
                    disabled={!props.amountSelected || props.amountSelected <= 0}
                    buttonType={buttonTypes.MAIN_ACTION}
                    onClick={props.openModal}
                    text={"Add to contact list"}
                  />
                </div>
              }
              {!props.addModalDisabled &&
                <div className="col-4 col-lg-2 selected-items-count">
                  <DisplayLabel
                    textType={textTypes.DISPLAY_SUBTITLE}
                    text={(props.amountSelected ? props.amountSelected : 0) + " selected"} />
                </div>
              }
              {props.progressRequired &&
                <div className="progress-cont col-8 offset-0 offset-lg-2">
                  <ProgressBar {...props} progressComplete={!props.loadingResults} />
                </div>
              }
            </div>
            :
            <div className="row results-header back-but-row">
              <div className="col-6 col-md-4 col-lg-2">
                <ActionButton
                  buttonType={"secondary-action back-button"}
                  onClick={() => props.backToResults()}
                  text={"Go Back"}
                />
              </div>
            </div>
          }
          {/* CHILDREN */}
          <ScrollTrigger
            onExit={props.onExitViewport}
            onProgress={props.onProgress}
            throttleScroll={100}>
            {props.children}
          </ScrollTrigger>
        </div> :
        props.searched &&
        <div className="col-12">
          <DisplayLabel
            textType={"label-not-found"}
            text={"No results"} />
        </div>
      }

      {!props.itemDetail &&
        <React.Fragment>
          {(props.pagination && !props.loadOnly) ?
            <React.Fragment>
              {
                props.searchResults &&
                <div className="col-12 paginate-cont">
                  <Paginate
                    pageCount={Math.ceil(props.searchResults.total / props.pageSize)}
                    handlePageClick={props.handlePageClick}
                    forcePage={props.currentResultsPage - 1}
                  />
                </div>
              }
            </React.Fragment>
            :
            <React.Fragment>
              {
                !props.loadMoreDisabled && props.resultsCurrent.length > 0 && (((props.searchType === 'podcast' || props.searchType === 'episode') && props.currentResultsPage * 10 < props.searchResults.total)
                  || (props.searchType === 'guest' && props.currentResultsPage < props.maxResultsPage)
                  || props.currentResultsPage * 20 < props.searchResults.total) &&
                <div className="col-4 offset-4 col-lg-2 offset-lg-5 results-more">
                  <ActionButton
                    disabled={props.loadingResults}
                    buttonType={buttonTypes.MAIN_ACTION}
                    onClick={props.loadMore}
                    text={"Load more"}
                  />
                </div>}
            </React.Fragment>
          }
        </React.Fragment>
      }
    </div>
    {props.visibleBackTop &&
      <ActionButton
        id="button-back-top"
        buttonType="secondary-action result-floating-back d-flex d-lg-none"
        onClick={(e) => props.backToTop(e)}
        text="Back to top"
      />
    }
  </div>
);

export default SearchResultsPanel;