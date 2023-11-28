import { SmileOutlined } from '@ant-design/icons';
import { MinimalButton, Spinner, TextBox } from '@react-pdf-viewer/core';
import {
  Match,
  NextIcon,
  PreviousIcon,
  RenderSearchProps,
  SearchPlugin,
} from '@react-pdf-viewer/search';
import classNames from 'classnames';
import * as React from 'react';
import './index.scss';

enum SearchStatus {
  NotSearchedYet,
  Searching,
  FoundResults,
}

interface SearchSidebarProps {
  searchPluginInstance: SearchPlugin;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({
  searchPluginInstance,
}) => {
  const [searchStatus, setSearchStatus] = React.useState(
    SearchStatus.NotSearchedYet,
  );
  const [matches, setMatches] = React.useState<Match[]>([]);

  const { Search } = searchPluginInstance;

  const renderMatchSample = (match: Match) => {
    //  match.startIndex    match.endIndex
    //      |                       |
    //      ▼                       ▼
    //  ....[_____props.keyword_____]....

    const wordsBefore = match.pageText.substr(match.startIndex - 20, 20);
    let words = wordsBefore.split(' ');
    words.shift();
    const begin = words.length === 0 ? wordsBefore : words.join(' ');

    const wordsAfter = match.pageText.substr(match.endIndex, 60);
    words = wordsAfter.split(' ');
    words.pop();
    const end = words.length === 0 ? wordsAfter : words.join(' ');

    return (
      <div>
        {begin}
        <span className="bg-#ff0">
          {match.pageText.substring(match.startIndex, match.endIndex)}
        </span>
        {end}
      </div>
    );
  };

  const customizeRenderEmpty = () => (
    <div className="text-center text-gray-300 text-sm mt-3">
      <SmileOutlined style={{ fontSize: 20 }} />
      <p className="m-0">暂无数据</p>
    </div>
  );

  return (
    <Search>
      {(renderSearchProps: RenderSearchProps) => {
        const {
          currentMatch,
          keyword,
          setKeyword,
          jumpToMatch,
          jumpToNextMatch,
          jumpToPreviousMatch,
          search,
        } = renderSearchProps;

        const handleSearchKeyDown = (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' && keyword) {
            setSearchStatus(SearchStatus.Searching);
            search().then((matches) => {
              setSearchStatus(SearchStatus.FoundResults);
              setMatches(matches);
            });
          } else if (!keyword) {
            setMatches([]);
          }
        };

        const handleSetKeyword = (e: string) => {
          if (e) {
            setKeyword(e);
          } else {
            setKeyword('');
            setMatches([]);
          }
        };

        return (
          <div className="search-sidebar-container">
            <div
              className={classNames(
                'search-input-container',
                'relative',
                'm-2',
              )}
            >
              <TextBox
                placeholder="Enter to search"
                value={keyword}
                onChange={handleSetKeyword}
                onKeyDown={handleSearchKeyDown}
              />
              {searchStatus === SearchStatus.Searching && (
                <div
                  className={classNames(
                    'search-input-spinner',
                    'flex',
                    'items-center',
                    'absolute',
                    'right-2',
                    'top-0',
                    'bottom-0',
                  )}
                >
                  <Spinner size="0.75rem" />
                </div>
              )}
            </div>
            {searchStatus === SearchStatus.FoundResults && (
              <>
                {matches.length === 0 && customizeRenderEmpty()}
                {matches.length > 0 && (
                  <>
                    <div className="items-center flex p-2 justify-between">
                      <div className="text-stone-400 text-sm mr-2">
                        Found {matches.length} results
                      </div>
                      <div>
                        <MinimalButton onClick={jumpToPreviousMatch}>
                          <PreviousIcon />
                        </MinimalButton>
                        <MinimalButton onClick={jumpToNextMatch}>
                          <NextIcon />
                        </MinimalButton>
                      </div>
                    </div>
                    <div className="search-result-container overflow-auto flex-1 border-t-1 border-t-solid border-gray-300 p-4 pt-2 pb-2">
                      {matches.map((match, index) => (
                        <div
                          key={index}
                          className="search-result-item m-4 ml-0 mr-0"
                        >
                          <div className="flex justify-between mb-2 text-gray-600">
                            <div>#{index + 1}</div>
                            <div className="text-gray-400 text-sm text-right">
                              Page {match.pageIndex + 1}
                            </div>
                          </div>
                          <div
                            className={classNames(
                              'border-rd-1',
                              'cursor-pointer',
                              'p-2',
                              'break-words',
                              'border-1',
                              'border-solid',
                              'border-gray-300',
                              'text-sm',
                              //   {
                              //     'bg-#e6fffb': currentMatch === index + 1,
                              //   },
                            )}
                            style={{
                              backgroundColor:
                                currentMatch === index + 1
                                  ? 'rgba(0, 0, 0, .05)'
                                  : '',
                            }}
                            onClick={() => jumpToMatch(index + 1)}
                          >
                            {renderMatchSample(match)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        );
      }}
    </Search>
  );
};

export default SearchSidebar;
