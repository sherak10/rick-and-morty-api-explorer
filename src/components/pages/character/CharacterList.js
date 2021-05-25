import { useQuery } from "@apollo/client";
import Loader from "react-loader-spinner";
import ModelList from "components/common/ModelList";
import { GET_CHARACTERS } from "graphql/queries";
import { colors } from "res/colors";
import { strings } from "res/strings";

export default function CharacterList() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading)
    return (
      <Loader type="ThreeDots" height={30} width={30} color={colors.primary} />
    );
  if (error) return <p>{strings.errors.query}</p>;

  return (
    <div className="mt-3">
      <h4>{strings.models.characters.title}</h4>

      <div className="row">
        <div className="col">
          <ModelList
            data={data.characters.results}
            headers={[
              strings.models.typename,
              strings.models.characters.id,
              strings.models.characters.name,
              strings.models.characters.species,
              strings.models.characters.origin,
              strings.models.characters.location,
              strings.actions,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
