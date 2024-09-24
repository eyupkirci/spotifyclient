import React from 'react';
import {render} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../src/context';
import Featured from '../src/components/Featured';
import DynamicFlatlist from '../src/components/DynamicFlatlist';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../src/components/DynamicFlatlist', () => {
  return jest.fn().mockReturnValue(null);
});

describe('Featured Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockContextValue = {
    colors: {text: 'black'},
  };

  it('renders the playlist title text correctly', () => {
    const {getByText} = render(
      <AppContext.Provider value={mockContextValue}>
        <Featured />
      </AppContext.Provider>,
    );

    // Check if the title text is rendered correctly
    expect(getByText('Popular Playlists')).toBeTruthy();
  });

  it('passes correct props to DynamicFlatlist', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <Featured />
      </AppContext.Provider>,
    );

    expect(DynamicFlatlist).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://api.spotify.com/v1/browse/featured-playlists',
        type: 'playlists',
      }),
      {},
    );
  });

  it('navigates to Details screen with correct data on item press', () => {
    const testItem = {id: '1', name: 'Test Playlist'};
    render(
      <AppContext.Provider value={mockContextValue}>
        <Featured />
      </AppContext.Provider>,
    );

    const onPressProp = (DynamicFlatlist as jest.Mock).mock.calls[0][0].onPress;
    onPressProp(testItem);

    expect(mockNavigate).toHaveBeenCalledWith('Details', {data: testItem});
  });
});
