import React from "react";

/**
 * Componente de tabla reutilizable
 * @param {Object} props
 * @param {Array} props.columns - Array de columnas [{key, label, render}]
 * @param {Array} props.data - Array de datos a mostrar
 * @param {Function} props.onRowClick - Callback cuando se hace click en una fila
 * @param {any} props.selectedRowId - ID de la fila seleccionada
 * @param {string} props.idKey - Clave para identificar cada fila (default: 'id')
 */
const DataTable = ({
  columns = [],
  data = [],
  onRowClick,
  selectedRowId,
  idKey = "id",
  headerStyle = {},
  rowStyle = {}
}) => {
  return (
    <div style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#e0e0e0", ...headerStyle }}>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "13px",
                  border: "1px solid #ccc"
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "#999",
                  fontSize: "14px"
                }}
              >
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const rowId = row[idKey];
              const isSelected = selectedRowId === rowId;
              
              return (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  style={{
                    cursor: onRowClick ? "pointer" : "default",
                    backgroundColor: isSelected ? "#e3f2fd" : "white",
                    borderBottom: "1px solid #eee",
                    transition: "background-color 0.2s",
                    ...rowStyle
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected && onRowClick) {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "white";
                    }
                  }}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        padding: "12px",
                        fontSize: "13px",
                        border: "1px solid #ccc"
                      }}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
