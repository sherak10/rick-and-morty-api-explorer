import { PaginatedList } from "react-paginated-list";
import { Card, ListGroup } from "react-bootstrap";

export default function CardList({ data, title }) {
  return (
    <Card>
      <Card.Header>{title}</Card.Header>

      <ListGroup variant="flush">
        <PaginatedList
          list={data}
          itemsPerPage={5}
          renderList={(list) => (
            <>
              {list.map(({ id, name }) => (
                <div key={id}>
                  <ListGroup.Item>{name}</ListGroup.Item>
                </div>
              ))}
            </>
          )}
        />
      </ListGroup>
    </Card>
  );
}
