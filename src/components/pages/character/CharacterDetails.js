import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import moment from "moment";
import Loader from "react-loader-spinner";
import CardList from "components/common/CardList";
import { GET_CHARACTER } from "graphql/queries";
import { colors } from "res/colors";
import { strings } from "res/strings";

export default function CharacterDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id: id },
  });

  if (loading)
    return (
      <Loader type="ThreeDots" height={30} width={30} color={colors.primary} />
    );
  if (error) return <p>{strings.errors.query}</p>;

  return (
    <div className="mt-3">
      <div className="row align-items-end w-50">
        <div className="col">
          <Card>
            <Card.Img variant="top" src={data.character.image} />

            <Card.Body>
              <Card.Title>{data.character.name}</Card.Title>

              <Card.Text>
                {strings.models.characters.status}: {data.character.status}
              </Card.Text>
              <Card.Text>
                {strings.models.characters.species}: {data.character.species}
              </Card.Text>
              <Card.Text>
                {strings.models.characters.type}: {data.character.type}
              </Card.Text>
              <Card.Text>
                {strings.models.characters.gender}: {data.character.gender}
              </Card.Text>
              <Card.Text>
                {strings.models.characters.origin}: {data.character.origin.name}
              </Card.Text>
              <Card.Text>
                {strings.models.characters.location}:{" "}
                {data.character.location.name}
              </Card.Text>
              <Card.Text>
                {strings.models.created}:{" "}
                {moment(data.character.created).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col">
          <CardList
            data={data.character.episode}
            title={strings.models.episodes.title}
          />
        </div>
      </div>
    </div>
  );
}
