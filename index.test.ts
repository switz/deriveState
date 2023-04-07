import { expect, test } from 'bun:test';

import deriveState from './index.js';

test('basic test', () => {
  const demoNotRecorded = false;

  const flags = deriveState({
    states: {
      isNotRecorded: demoNotRecorded,
      isUploading: true,
      isUploaded: false,
    },
    derived: {
      buttonIsDisabled: (states) => states.isNotRecorded || states.isUploading,
      buttonText: {
        isNotRecorded: 'Demo Disabled',
        isUploading: 'Demo Uploading...',
        isUploaded: 'Download Demo',
      },
    },
  });

  expect(flags.activeState).toBe('isUploading');
  expect(flags.derived.buttonIsDisabled).toBe(true);
  expect(flags.derived.buttonText).toBe('Demo Uploading...');
});

test('ensure order works test', () => {
  const flags = deriveState({
    states: {
      isNotRecorded: true,
      isUploading: true,
      isUploaded: false,
    },
    derived: {
      buttonIsDisabled: (state) => state.isNotRecorded || state.isUploading,
      buttonText: {
        isNotRecorded: 'Demo Disabled',
        isUploading: 'Demo Uploading...',
        isUploaded: 'Download Demo',
      },
    },
  });

  expect(flags.activeState).toBe('isNotRecorded');
  expect(flags.derived.buttonIsDisabled).toBe(true);
  expect(flags.derived.buttonText).toBe('Demo Disabled');
});
