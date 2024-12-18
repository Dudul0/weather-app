import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'unitsType',
  initialState: {
    value: 'metric',
  },
  reducers: {
    toImperial: (state) => { 
      state.value = 'imperial'
     },
    toMetric: (state) => { 
      state.value = 'metric'
     }

  },
})

export const { toMetric, toImperial } = counterSlice.actions

export default counterSlice.reducer