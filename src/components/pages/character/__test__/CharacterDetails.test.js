import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { MemoryRouter } from "react-router-dom";
import { GET_CHARACTER } from "graphql/queries";
import CharacterDetails from "components/pages/character/CharacterDetails";
import { strings } from "res/strings";

it("renders character", async () => {
  const characterMock = [
    {
      request: {
        query: GET_CHARACTER,
      },
      result: {
        data: {
          character: {
            id: "1",
            name: "Rick Sanchez",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Male",
            origin: {
              name: "Earth (C-137)",
            },
            location: {
              name: "Earth (Replacement Dimension)",
            },
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            episode: [],
            created: "2017-11-04T18:48:46.250Z",
          },
        },
      },
    },
  ];
  const { getByText } = render(
    <MemoryRouter initialEntries={["/characters/1"]}>
      <MockedProvider mocks={characterMock}>
        <CharacterDetails />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText("Rick Sanchez")).toBeInTheDocument();
  });
});

it("should show error", async () => {
  const characterMock = [
    {
      request: {
        query: GET_CHARACTER,
      },
      result: {
        errors: [new GraphQLError(strings.errors.query)],
      },
    },
  ];

  const { getByText } = render(
    <MemoryRouter initialEntries={["/characters/1"]}>
      <MockedProvider mocks={characterMock}>
        <CharacterDetails />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText(strings.errors.query)).toBeInTheDocument();
  });
});
