import React from 'react'
import styles from './SearchResult.module.scss'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'

type IGenre = {
  name: string;
};

interface ISearchResult {
  id: number
  movieTitle: string;
  score: string;
  genres: IGenre[];
  overview: string;
  onMovieClick(event: React.MouseEvent<HTMLDivElement>):void
}

const SearchResult: React.FC<ISearchResult> = ({
  id,
  movieTitle,
  score,
  genres = [],
  overview = '',
  onMovieClick
}) => {
  const isLastGenre = (index: number) => {
    return index === genres.length - 1
  }

  return (<div className={styles.searchResultContainer} data-testid="searchResult">
    <div className={styles.searchResultHighlight}>
      <div className={styles.name} onClick={onMovieClick} data-title={movieTitle}>{movieTitle}</div>
      <div className={styles.score}>{score}</div>
    </div>

      <div className={styles.overview}>
        {overview}
      </div>

      <div className={styles.genre}>
        {genres.map(({ name }, index) => (
          <span key={uuidv4()}>{name}{`${isLastGenre(index) ? '' : ', '}`}</span>
        ))}
      </div>

      <div className={styles.genre}>
        <Link href={`/recommended?movieId=${id}`}>
          <a data-testid="recommended">
            Recommended similar movies
          </a>
        </Link>
      </div>
      </div>
  )
}

export default SearchResult
