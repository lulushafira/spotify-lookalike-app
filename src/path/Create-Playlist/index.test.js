import CreatePlaylist from "./Create-playlist.jsx";
import store from "../../store";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { render, screen, cleanup } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import config from "../../lib/config";

const setup = () =>
  render(
    <Provider store={store}>
      <CreatePlaylist />
    </Provider>
  );

const server = setupServer(
  rest.get(
    `${config.SPOTIFY_BASE_URL}/search?type=track&q=avril`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          tracks:{
            items: [
              {
                id: "1",
                album: {
                  images: [
                    {
                      url: "test image url",
                    },
                  ],
                },
                name: "test title",
                artists: [
                  {
                    name: "test artist",
                  },
                ],
                uri: "test uri",
              },
            ],
          }
        })
      )
    }
  )
);

describe("Render Create-Playlist Component...", () => {
  beforeEach(setup);
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });
  afterAll(() => server.close());

  it('Success render tracks after search', async () => {
    const searchBar = screen.getByLabelText(/search/i);
    const submitButton = screen.getByTestId('button_search');

    userEvent.type(searchBar, 'avril');
    userEvent.click(submitButton);

    await screen.findByText('test title');
    const trackList = screen.getByTestId('tracks-list');

    expect(trackList.children.length).toBe(1);
    expect(screen.getByText('test title')).toBeInTheDocument();
  });

});
