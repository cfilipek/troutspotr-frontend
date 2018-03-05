const colors = require('ui/styles/_colors.scss')
import {
  RESTRICTION_SECTIONS_ACTIVE_LAYER_ID,
  RESTRICTION_SECTIONS_QUITE_LAYER_ID,
} from '../filters/Filters.selectors'
import { RESTRICTION_SECTIONS_SOURCE_ID } from '../sources/Source.selectors'

export const RestrictionSectionActiveStyle = {
  id: RESTRICTION_SECTIONS_ACTIVE_LAYER_ID,
  type: 'line',
  source: RESTRICTION_SECTIONS_SOURCE_ID,
  interactive: false,
  layout: {
    visibility: 'visible',
    'line-cap': 'butt',
    'line-join': 'miter',
  },
  paint: {
    'line-offset': 0,
    'line-dasharray': {
      base: 1,
      stops: [[10, [1, 0]], [12, [4, 1]], [16, [3, 4]]],
    },
    'line-color': {
      property: 'color',
      type: 'categorical',
      stops: [
        ['red', colors.Red],
        ['yellow', colors.RestrictionYellow],
        ['white', colors.White],
        ['blue', colors.StreamBlue],
      ],
    },
    // 'line-gap-width': {
    //   'base': 1.4,
    //   'stops': [
    //     [
    //       10,
    //       5,
    //     ],
    //     [
    //       13,
    //       10,
    //     ],
    //     [
    //       18,
    //       120,
    //     ],
    //   ],
    // },
    'line-gap-width': {
      property: 'colorOffset',
      stops: [
        // at zoom 10
        [{ zoom: 10, value: 1 }, 4],
        [{ zoom: 10, value: 2 }, 5],
        [{ zoom: 10, value: 3 }, 6],
        [{ zoom: 10, value: 4 }, 7],

        // at zoom 13
        [{ zoom: 13, value: 1 }, 9],
        [{ zoom: 13, value: 2 }, 13],
        [{ zoom: 13, value: 3 }, 16],
        [{ zoom: 13, value: 4 }, 20],

        // at zoom 18
        [{ zoom: 18, value: 1 }, 80],
        [{ zoom: 18, value: 2 }, 120],
        [{ zoom: 18, value: 3 }, 150],
        [{ zoom: 18, value: 4 }, 180],
        // [
        //   18,
        //   120,
        // ],
      ],
    },
    'line-width': {
      base: 1.4,
      stops: [[13, 1], [18, 10]],
    },
    'line-opacity': {
      base: 1,
      stops: [[9, 0], [10, 1]],
    },
  },
}

export const RestrictionSectionQuietStyle = {
  id: RESTRICTION_SECTIONS_QUITE_LAYER_ID,
  type: 'line',
  source: RESTRICTION_SECTIONS_SOURCE_ID,
  interactive: false,
  layout: {
    visibility: 'visible',
    'line-cap': 'butt',
    'line-join': 'miter',
  },
  paint: {
    'line-offset': 0,
    'line-dasharray': {
      base: 1,
      stops: [[10, [1, 0]], [12, [4, 1]], [16, [3, 4]]],
    },
    'line-color': colors.StreamGray,
    'line-gap-width': {
      base: 1.4,
      stops: [[10, 5], [13, 10], [18, 120]],
    },
    'line-width': {
      base: 1.4,
      stops: [[13, 1], [18, 10]],
    },
    'line-opacity': {
      base: 1,
      stops: [[9, 0], [10, 1]],
    },
  },
}