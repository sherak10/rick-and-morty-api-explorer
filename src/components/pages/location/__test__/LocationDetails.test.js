import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { MemoryRouter } from "react-router-dom";
import { GET_LOCATION } from "graphql/queries";
import LocationDetails from "components/pages/location/LocationDetails";
import { strings } from "res/strings";

it("renders location", async () => {
  const locationMock = [
    {
      request: {
        query: GET_LOCATION,
      },
      result: {
        data: {
          location: {
            id: "2",
            name: "Abadango",
            type: "Cluster",
            dimension: "unknown",
            residents: [
              {
                id: "6",
                name: "Abadango Cluster Princess",
              },
            ],
            created: "2017-11-10T13:06:38.182Z",
          },
        },
      },
    },
  ];
  const { getByText } = render(
    <MemoryRouter initialEntries={["/locations/2"]}>
      <MockedProvider mocks={locationMock}>
        <LocationDetails />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText("Abadango")).toBeInTheDocument();
  });
});

it("should show error", async () => {
  const locationMock = [
    {
      request: {
        query: GET_LOCATION,
      },
      result: {
        errors: [new GraphQLError(strings.errors.query)],
      },
    },
  ];

  const { getByText } = render(
    <MemoryRouter initialEntries={["/locations/2"]}>
      <MockedProvider mocks={locationMock}>
        <LocationDetails />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText(strings.errors.query)).toBeInTheDocument();
  });
});
