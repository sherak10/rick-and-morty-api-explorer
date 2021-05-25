import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { MemoryRouter } from "react-router-dom";
import { GET_CHARACTERS } from "graphql/queries";
import CharacterList from "components/pages/character/CharacterList";
import { strings } from "res/strings";

it("renders characters", async () => {
  const charactersMock = [
    {
      request: {
        query: GET_CHARACTERS,
      },
      result: {
        data: {
          characters: {
            results: [
              {
                id: "1",
                name: "Rick Sanchez",
                species: "Human",
                origin: {
                  name: "Earth (C-137)",
                },
                location: {
                  name: "Earth (Replacement Dimension)",
                },
              },
              {
                id: "2",
                name: "Morty Smith",
                species: "Human",
                origin: {
                  name: "Earth (C-137)",
                },
                location: {
                  name: "Earth (Replacement Dimension)",
                },
              },
            ],
          },
        },
      },
    },
  ];
  const { getByText } = render(
    <MemoryRouter initialEntries={["/characters"]}>
      <MockedProvider mocks={charactersMock}>
        <CharacterList />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText("Rick Sanchez")).toBeInTheDocument();
  });
});

it("should show error", async () => {
  const charactersMock = [
    {
      request: {
        query: GET_CHARACTERS,
      },
      result: {
        errors: [new GraphQLError(strings.errors.query)],
      },
    },
  ];

  const { getByText } = render(
    <MemoryRouter initialEntries={["/characters"]}>
      <MockedProvider mocks={charactersMock}>
        <CharacterList />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText(strings.errors.query)).toBeInTheDocument();
  });
});
