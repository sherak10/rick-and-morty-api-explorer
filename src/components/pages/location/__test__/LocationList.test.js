import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { MemoryRouter } from "react-router-dom";
import { GET_LOCATIONS } from "graphql/queries";
import LocationList from "components/pages/location/LocationList";
import { strings } from "res/strings";

it("renders locations", async () => {
  const locationsMock = [
    {
      request: {
        query: GET_LOCATIONS,
      },
      result: {
        data: {
          locations: {
            results: [
              {
                id: "1",
                name: "Earth (C-137)",
                type: "Planet",
              },
              {
                id: "2",
                name: "Abadango",
                type: "Cluster",
              },
            ],
          },
        },
      },
    },
  ];
  const { getByText } = render(
    <MemoryRouter initialEntries={["/locations"]}>
      <MockedProvider mocks={locationsMock}>
        <LocationList />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText("Abadango")).toBeInTheDocument();
  });
});

it("should show error", async () => {
  const locationsMock = [
    {
      request: {
        query: GET_LOCATIONS,
      },
      result: {
        errors: [new GraphQLError(strings.errors.query)],
      },
    },
  ];

  const { getByText } = render(
    <MemoryRouter initialEntries={["/locations"]}>
      <MockedProvider mocks={locationsMock}>
        <LocationList />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText(strings.errors.query)).toBeInTheDocument();
  });
});
