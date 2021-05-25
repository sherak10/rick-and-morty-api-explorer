import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { MemoryRouter } from "react-router-dom";
import { GET_EPISODE } from "graphql/queries";
import EpisodeDetails from "components/pages/episode/EpisodeDetails";
import { strings } from "res/strings";

it("renders episode", async () => {
  const episodeMock = [
    {
      request: {
        query: GET_EPISODE,
      },
      result: {
        data: {
          episode: {
            id: "2",
            name: "Lawnmower Dog",
            air_date: "December 9, 2013",
            episode: "S01E02",
            characters: [],
            created: "2017-11-10T12:56:33.916Z",
          },
        },
      },
    },
  ];
  const { getByText } = render(
    <MemoryRouter initialEntries={["/episodes/2"]}>
      <MockedProvider mocks={episodeMock}>
        <EpisodeDetails />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText("Lawnmower Dog")).toBeInTheDocument();
  });
});

it("should show error", async () => {
  const episodeMock = [
    {
      request: {
        query: GET_EPISODE,
      },
      result: {
        errors: [new GraphQLError(strings.errors.query)],
      },
    },
  ];

  const { getByText } = render(
    <MemoryRouter initialEntries={["/episodes/2"]}>
      <MockedProvider mocks={episodeMock}>
        <EpisodeDetails />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText(strings.errors.query)).toBeInTheDocument();
  });
});
