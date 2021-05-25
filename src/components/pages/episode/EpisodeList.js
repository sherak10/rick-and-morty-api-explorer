import { useQuery } from "@apollo/client";
import Loader from "react-loader-spinner";
import ModelList from "components/common/ModelList";
import { GET_EPISODES } from "graphql/queries";
import { colors } from "res/colors";
import { strings } from "res/strings";

export default function EpisodeList() {
  const { loading, error, data } = useQuery(GET_EPISODES);

  if (loading)
    return (
      <Loader type="ThreeDots" height={30} width={30} color={colors.primary} />
    );
  if (error) return <p>{strings.errors.query}</p>;

  return (
    <div className="mt-3">
      <h4>{strings.models.episodes.title}</h4>

      <div className="row">
        <div className="col">
          <ModelList
            data={data.episodes.results}
            headers={[
              strings.models.typename,
              strings.models.episodes.id,
              strings.models.episodes.name,
              strings.models.episodes.air_date,
              strings.actions,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
