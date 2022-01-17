import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { CalendarToday, StarRate, Whatshot } from '@mui/icons-material';
import { Checkbox, FormControlLabel, MenuItem, Select, Stack, Switch, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getGenres } from '../../services/movieService';

const FiltersContainer = styled(Stack)`
  flex-direction: row;
  width: 78%;
  background: #2f3441;
  color: #ddd;
  margin: 20px;
  border-radius: 10px;
  .MuiTypography-root {
    font-size: 1.5vw;
  }
`;

const FilterContainer = styled(Stack)`
  width: ${({ width }) => width || 20}%;
  align-content: center;
  padding: 20px 10px;
`;

const GenresContainer = styled(Stack)`
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-self: center;
`;

const FilterHeading = styled(Typography)`
  margin: 10px 0px;
`;

const SortByFilterContainer = styled(Stack)`
  flex-direction: row;
  align-items: center;
  height: 40px;
  
  width: 90%;
  font-size: 1vw;
  background: ${({ selected }) => (selected ? '#00acc1' : 'transparent')};
  &: hover {
    background: #00acc1;
  }
`;

const TriangleShape = styled.div`
  background: #00acc1;
  content: '';
  width: 0px;
  height: 0px;
  border: solid 20px;
  border-color: #2f3441 #2f3441 #2f3441 #00acc1;
  display: ${({ show }) => (show ? 'inline' : 'none')};
`;

const RowContainer = styled(Stack)`
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin: 5px 0px;
  .MuiTypography-root {
    font-size: 1vw;
  }
`;

const DropDown = styled(Select)`
  background: #fff;
  height: 40px;
  width: 80%;
`;

const CheckBoxContainer = styled(FormControlLabel)`
width: 100%;
@media screen and (min-width: 1100px) {
  width: 50%;
}
@media screen and (min-width: 1300px) {
  width: 33%;
}
margin: 0px;
.MuiFormControlLabel-label {
  font-size: 1vw;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;

const SortByLabel = styled(Typography)`
  width: 90%;
  color: #ddd;
  margin: 0px 0px 0px 10px
`;

export default function SearchFilters({ filters, setFilters }) {
  // const sortByFilters = ['rating', 'release_date', 'popularity'];
  const [sortByHover, setSortByHover] = useState('');
  const [sortBy, setSortBy] = useState(filters.sortBy);
  const [allGenres, setAllGenres] = useState(['Action']);

  const popularityRanges = Array.from(Array(10)).map((value, index) => [index * 1000, (index + 1) * 1000]);
  popularityRanges.push([0, 5000]);
  popularityRanges.push([5000, 10000]);
  popularityRanges.push([0, 10000]);

  const ratingRanges = Array.from(Array(10)).map((value, index) => [index, index + 1]);
  ratingRanges.push([0, 5]);
  ratingRanges.push([5, 10]);
  ratingRanges.push([0, 10]);

  const onSortByChange = (field) => () => {
    setSortBy(field);
    setFilters({ ...filters, sortBy: field });
  };

  const onGenresChange = (genre) => () => {
    let { genres } = filters;
    if (genres.includes(genre)) {
      genres = genres.filter((gen) => gen !== genre);
    } else {
      genres.push(genre);
    }
    setFilters({ ...filters, genres });
  };

  const onRatingChange = (event) => {
    setFilters({ ...filters, rating: event.target.value });
  };

  const onPopularityChange = (event) => {
    setFilters({ ...filters, popularity: event.target.value });
  };

  const onSortByHover = (field) => () => {
    setSortByHover(field);
  };

  const onSortByHoverExit = () => {
    setSortByHover('');
  };

  const onSortModeChange = () => {
    setFilters({ ...filters, asc: filters.asc * -1 });
  };

  useEffect(() => {
    onSortByChange('release_date')();
    getGenres().then((data) => {
      setAllGenres(data.map(({ name }) => name));
    });
  }, []);

  return (
    <FiltersContainer>

      <FilterContainer width="15">
        <FilterHeading variant="h5">Sort By</FilterHeading>
        <RowContainer>
          <SortByFilterContainer
            selected={sortBy === 'vote_average'}
            onMouseEnter={onSortByHover('vote_average')}
            onMouseLeave={onSortByHoverExit}
            onClick={onSortByChange('vote_average')}
          >
            <StarRate style={{ height: '100%' }} />
            <SortByLabel variant="h6">Rating</SortByLabel>
          </SortByFilterContainer>
          <TriangleShape show={sortByHover === 'vote_average' || sortBy === 'vote_average'} />
        </RowContainer>
        <RowContainer>
          <SortByFilterContainer
            selected={sortBy === 'release_date'}
            onMouseEnter={onSortByHover('release_date')}
            onMouseLeave={onSortByHoverExit}
            onClick={onSortByChange('release_date')}
          >
            <CalendarToday style={{ height: '100%' }} />
            <SortByLabel variant="h6">Date</SortByLabel>
          </SortByFilterContainer>
          <TriangleShape show={sortByHover === 'release_date' || sortBy === 'release_date'} />
        </RowContainer>
        <RowContainer>
          <SortByFilterContainer
            selected={sortBy === 'popularity'}
            onMouseEnter={onSortByHover('popularity')}
            onMouseLeave={onSortByHoverExit}
            onClick={onSortByChange('popularity')}
          >
            <Whatshot style={{ height: '100%' }} />
            <SortByLabel variant="h6">Popularity</SortByLabel>
          </SortByFilterContainer>
          <TriangleShape show={sortByHover === 'popularity' || sortBy === 'popularity'} />
        </RowContainer>
      </FilterContainer>

      <FilterContainer width="15">
        <FilterHeading variant="h5">Sort Mode</FilterHeading>
        <RowContainer>
          <Typography color="#ddd">Asc</Typography>
          <Switch checked={filters.asc === -1} onChange={onSortModeChange} />
          <Typography color="#ddd">Desc</Typography>
        </RowContainer>
      </FilterContainer>

      <FilterContainer width="15">
        <FilterHeading variant="h5">Rating</FilterHeading>
        <DropDown value={`${filters.rating}`} onChange={onRatingChange}>
          {ratingRanges.map(([min, max], index) => (
            <MenuItem key={index} value={index}>
              {`${min}-${max}`}
            </MenuItem>
          ))}
        </DropDown>
      </FilterContainer>

      <FilterContainer width="15">
        <FilterHeading variant="h5">Popularity</FilterHeading>
        <DropDown value={`${filters.popularity}`} onChange={onPopularityChange}>
          {popularityRanges.map(([min, max], index) => (
            <MenuItem key={(index + 1) * 1000} value={index}>
              {`${min}-${max}`}
            </MenuItem>
          ))}
        </DropDown>
      </FilterContainer>

      <FilterContainer width="40">
        <FilterHeading variant="h5">Genres</FilterHeading>
        <GenresContainer>
          {allGenres.map((genre) => (
            <CheckBoxContainer
              key={genre}
              control={<Checkbox onClick={onGenresChange(genre)} />}
              title={genre}
              label={genre}
            />
          ))}
        </GenresContainer>
      </FilterContainer>

    </FiltersContainer>
  );
}

SearchFilters.defaultProps = {
  filters: {
    asc: -1,
    rating: 0,
    genres: [],
    popularity: 0,
    sortBy: 'rating',
  },
  setFilters: () => {},
};

SearchFilters.propTypes = {
  filters: PropTypes.shape({
    asc: PropTypes.number,
    rating: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
    popularity: PropTypes.number,
    sortBy: PropTypes.string,
  }),
  setFilters: PropTypes.func,
};
