import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { MemoryRouter } from "react-router-dom";
import { GET_EPISODES } from "graphql/queries";
import EpisodeList from "components/pages/episode/EpisodeList";
import { strings } from "res/strings";

it("renders episodes", async () => {
  const episodesMock = [
    {
      request: {
        query: GET_EPISODES,
      },
      result: {
        data: {
          episodes: {
            results: [
              {
                id: "1",
                name: "Pilot",
                air_date: "December 2, 2013",
              },
              {
                id: "2",
                name: "Lawnmower Dog",
                air_date: "December 9, 2013",
              },
            ],
          },
        },
      },
    },
  ];
  const { getByText } = render(
    <MemoryRouter initialEntries={["/episodes"]}>
      <MockedProvider mocks={episodesMock}>
        <EpisodeList />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText("Lawnmower Dog")).toBeInTheDocument();
  });
});

it("should show error", async () => {
  const episodesMock = [
    {
      request: {
        query: GET_EPISODES,
      },
      result: {
        errors: [new GraphQLError(strings.errors.query)],
      },
    },
  ];

  const { getByText } = render(
    <MemoryRouter initialEntries={["/episodes"]}>
      <MockedProvider mocks={episodesMock}>
        <EpisodeList />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText(strings.errors.query)).toBeInTheDocument();
  });
});
