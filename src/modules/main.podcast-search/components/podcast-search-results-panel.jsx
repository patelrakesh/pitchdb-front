import React from 'react';
import PodcastItem from '../../../common/podcast-common/components/podcast-item';
import EpisodeItem from '../../../common/podcast-common/containers/episode-item';
import PodcastDetail from '../../../common/podcast-common/containers/podcast-detail';
import SearchResults from '../../../common/search-common/containers/search-results';
import './podcast-search-results-panel.css';

const totalPodcasts = '978,664';
const totalEpisodes = '62,649,279';

const PodcastFinderResults = props => (
  <SearchResults
    totalResultsStr={`${props.searchType === 'podcast' ? totalPodcasts : totalEpisodes} podcasts`}
    progressText={props.resultsLoaded + "/" + props.resultsToLoad + " result(s) loaded"}
    currentProgress={props.resultsToLoad > 0 ? props.resultsLoaded * 100 / props.resultsToLoad : 0}
    {...props} titleId="podcast-list-modal">
    {(props.searchType === 'podcast' && !props.itemDetail) &&
      props.resultsCurrent.map((podcast, index) =>
        <PodcastItem podcast={podcast} key={index} index={index} {...props} handleSelected={props.handleSelected}
          viewPodcastDetail={props.viewPodcastDetail} />
      )}

    {(props.searchType === 'episode' && !props.itemDetail) &&
      props.resultsCurrent.map((episode, index) =>
        <EpisodeItem episode={episode} key={index} index={index} {...props} handleSelected={props.handleSelected}
          viewPodcastDetail={props.viewPodcastDetail} />
      )}

    {props.itemDetail &&
      <PodcastDetail {...props} />
    }
  </SearchResults>
);

export default PodcastFinderResults;
