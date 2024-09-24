import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import App from '../App';

describe('App renders', () => {
  test('Header renders correctly', async () => {
    const {getByText} = render(<App />);

    await waitFor(() => getByText('Listen your favourite music'));
  });
  test('Your Playlist renders correctly', async () => {
    const {getByText} = render(<App />);

    await waitFor(() => getByText('Your Playlists'));
  });
});
