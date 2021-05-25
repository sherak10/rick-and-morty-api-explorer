import { useQuery } from "@apollo/client";
import Loader from "react-loader-spinner";
import ModelList from "components/common/ModelList";
import { GET_LOCATIONS } from "graphql/queries";
import { colors } from "res/colors";
import { strings } from "res/strings";

export default function LocationList() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading)
    return (
      <Loader type="ThreeDots" height={30} width={30} color={colors.primary} />
    );
  if (error) return <p>{strings.errors.query}</p>;

  return (
    <div className="mt-3">
      <h4>{strings.models.locations.title}</h4>

      <div className="row">
        <div className="col">
          <ModelList
            data={data.locations.results}
            headers={[
              strings.models.typename,
              strings.models.locations.id,
              strings.models.locations.name,
              strings.models.locations.type,
              strings.actions,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
