import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import moment from "moment";
import Loader from "react-loader-spinner";
import CardList from "components/common/CardList";
import { GET_LOCATION } from "graphql/queries";
import { colors } from "res/colors";
import { strings } from "res/strings";

export default function LocationDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_LOCATION, {
    variables: { id: id },
  });

  if (loading)
    return (
      <Loader type="ThreeDots" height={30} width={30} color={colors.primary} />
    );
  if (error) return <p>{strings.errors.query}</p>;

  return (
    <div className="mt-3">
      <div className="row w-50">
        <div className="col">
          <Card>
            <Card.Header>{data.location.name}</Card.Header>

            <ListGroup variant="flush">
              <ListGroup.Item>
                {strings.models.locations.type}: {data.location.type}
              </ListGroup.Item>
              <ListGroup.Item>
                {strings.models.locations.dimension}: {data.location.dimension}
              </ListGroup.Item>
              <ListGroup.Item>
                {strings.models.created}:{" "}
                {moment(data.location.created).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>

        <div className="col">
          <CardList
            data={data.location.residents}
            title={strings.models.locations.residents}
          />
        </div>
      </div>
    </div>
  );
}
