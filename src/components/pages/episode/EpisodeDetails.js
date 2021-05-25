import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import moment from "moment";
import Loader from "react-loader-spinner";
import CardList from "components/common/CardList";
import { GET_EPISODE } from "graphql/queries";
import { colors } from "res/colors";
import { strings } from "res/strings";

export default function EpisodeDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EPISODE, {
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
            <Card.Header>{data.episode.name}</Card.Header>

            <ListGroup variant="flush">
              <ListGroup.Item>
                {strings.models.episodes.air_date}: {data.episode.air_date}
              </ListGroup.Item>
              <ListGroup.Item>
                {strings.models.episodes.episode}: {data.episode.episode}
              </ListGroup.Item>
              <ListGroup.Item>
                {strings.models.created}:{" "}
                {moment(data.episode.created).format("MMMM Do YYYY, h:mm:ss a")}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>

        <div className="col">
          <CardList
            data={data.episode.characters}
            title={strings.models.characters.title}
          />
        </div>
      </div>
    </div>
  );
}
