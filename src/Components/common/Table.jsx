import TableHeader from "./TableHeader";
import TableBody from "./tabelBody";

const Table = ({ data, columns, sortColumn, onSort }) => {
  return (
    <table className="table mt-5">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
