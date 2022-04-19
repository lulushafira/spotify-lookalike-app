import Searchbar from "./index.tsx";
import store from "../../store";
import { Provider } from "react-redux";
import { render, screen, cleanup } from "@testing-library/react";

const setup = () =>
  render(
    <Provider store={store}>
      <Searchbar />
    </Provider>
  );

describe("Render searchbar...", () => {
  beforeEach(setup);
  afterEach(cleanup);

  it("Render Succeeded", () => {
    const searchBar = screen.getByTestId("searchbar");
    const submitButton = screen.getByTestId("button_search");
    expect(searchBar).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
