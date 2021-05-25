import { Link, useRouteMatch } from "react-router-dom";
import { PaginatedList } from "react-paginated-list";
import { Table } from "react-bootstrap";
import { strings } from "res/strings";

export default function ModelList({ data, headers }) {
  const match = useRouteMatch();

  return (
    <PaginatedList
      list={data}
      itemsPerPage={7}
      renderList={(list) => (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {list.map((item) => (
                <tr key={item.id}>
                  {Object.values(item).map((value, index) => (
                    <td key={index}>
                      {typeof value === "object" ? value.name : value}
                    </td>
                  ))}
                  <td>
                    <Link
                      className="text-success"
                      to={`${match.url}/${item.id}`}
                    >
                      {strings.view}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    />
  );
}
