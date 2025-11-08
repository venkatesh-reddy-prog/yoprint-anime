import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchAnime } from '../../api/jikan';
import type { SearchResponse } from './types';

export type SearchState = {
  query: string;
  page: number;
  results: SearchResponse | null;
  status: 'idle'|'loading'|'failed';
  error?: string | null;
};

const initialState: SearchState = {
  query: '',
  page: 1,
  results: null,
  status: 'idle',
  error: null,
};

export const fetchSearch = createAsyncThunk<
  SearchResponse,
  { q: string; page?: number },
  { rejectValue: string }
>(
  'search/fetchSearch',
  async ({ q, page = 1 }, thunkAPI) => {
    try {
      const res = await searchAnime({ q, page }, thunkAPI.signal);
      return res as SearchResponse;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.message ?? 'Unknown error');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearResults(state) {
      state.results = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.status = 'idle';
        state.results = action.payload;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        if ((action.error as any).name === 'AbortError') {
          state.status = 'idle';
        } else {
          state.status = 'failed';
          state.error = action.payload ?? action.error.message;
        }
      });
  }
});

export const { setQuery, setPage, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
