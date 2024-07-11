import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES as coreEsES } from '@mui/material/locale';

function CustomToolbar({ name }) {
  return (
    <GridToolbarContainer>
      <GridToolbarExport 
        csvOptions={{ 
          delimiter: ';', 
          utf8WithBom: true, 
          fileName: name 
        }} 
      />
    </GridToolbarContainer>
  );
}

const theme = createTheme(coreEsES);

const esESLocaleText = {
  // Root
  noRowsLabel: 'Sin filas',
  noResultsOverlayLabel: 'Resultados no encontrados',
  // Density selector toolbar button text
  toolbarDensity: 'Densidad',
  toolbarDensityLabel: 'Densidad',
  toolbarDensityCompact: 'Compacta',
  toolbarDensityStandard: 'Estándar',
  toolbarDensityComfortable: 'Cómoda',
  // Columns selector toolbar button text
  toolbarColumns: 'Columnas',
  toolbarColumnsLabel: 'Seleccionar columnas',
  // Filters toolbar button text
  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Mostrar filtros',
  toolbarFiltersTooltipHide: 'Ocultar filtros',
  toolbarFiltersTooltipShow: 'Mostrar filtros',
  toolbarFiltersTooltipActive: (count) =>
    count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Buscar…',
  toolbarQuickFilterLabel: 'Buscar',
  toolbarQuickFilterDeleteIconLabel: 'Limpiar',
  // Export selector toolbar button text
  toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Descargar como CSV',
  toolbarExportPrint: 'Imprimir',
  toolbarExportExcel: 'Descargar como Excel',
  // Columns management text
  columnsManagementSearchTitle: 'Buscar',
  columnsManagementNoColumns: 'Sin columnas',
  columnsManagementShowHideAllText: 'Mostrar/Ocultar todas',
  // columnsManagementReset: 'Reset',
  // Filter panel text
  filterPanelAddFilter: 'Agregar filtro',
  filterPanelRemoveAll: 'Remover todos',
  filterPanelDeleteIconLabel: 'Borrar',
  filterPanelLogicOperator: 'Operador lógico',
  filterPanelOperator: 'Operadores',
  filterPanelOperatorAnd: 'Y',
  filterPanelOperatorOr: 'O',
  filterPanelColumns: 'Columnas',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Valor de filtro',
  // Filter operators text
  filterOperatorContains: 'contiene',
  filterOperatorEquals: 'es igual',
  filterOperatorStartsWith: 'comienza con',
  filterOperatorEndsWith: 'termina con',
  filterOperatorIs: 'es',
  filterOperatorNot: 'no es',
  filterOperatorAfter: 'es posterior',
  filterOperatorOnOrAfter: 'es en o posterior',
  filterOperatorBefore: 'es anterior',
  filterOperatorOnOrBefore: 'es en o anterior',
  filterOperatorIsEmpty: 'esta vacío',
  filterOperatorIsNotEmpty: 'no esta vacío',
  filterOperatorIsAnyOf: 'es cualquiera de',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Contiene',
  headerFilterOperatorEquals: 'Es igual a',
  headerFilterOperatorStartsWith: 'Comienza con',
  headerFilterOperatorEndsWith: 'Termina con',
  headerFilterOperatorIs: 'Es',
  headerFilterOperatorNot: 'No es',
  headerFilterOperatorAfter: 'Esta después de',
  headerFilterOperatorOnOrAfter: 'Esta en o después de',
  headerFilterOperatorBefore: 'Esta antes de',
  headerFilterOperatorOnOrBefore: 'Esta en o antes de',
  headerFilterOperatorIsEmpty: 'Esta vacío',
  headerFilterOperatorIsNotEmpty: 'No esta vacío',
  headerFilterOperatorIsAnyOf: 'Es cualquiera de',
  'headerFilterOperator=': 'Es igual a',
  'headerFilterOperator!=': 'Es diferente a',
  'headerFilterOperator>': 'Es mayor que',
  'headerFilterOperator>=': 'Es mayor o igual que',
  'headerFilterOperator<': 'Es menor que',
  'headerFilterOperator<=': 'Es menor o igual que',
  // Filter values text
  filterValueAny: 'cualquiera',
  filterValueTrue: 'verdadero',
  filterValueFalse: 'falso',
  // Column menu text
  columnMenuLabel: 'Menú',
  columnMenuShowColumns: 'Mostrar columnas',
  columnMenuManageColumns: 'Administrar columnas',
  columnMenuFilter: 'Filtro',
  columnMenuHideColumn: 'Ocultar',
  columnMenuUnsort: 'Desordenar',
  columnMenuSortAsc: 'Ordenar ASC',
  columnMenuSortDesc: 'Ordenar DESC',
  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
  columnHeaderFiltersLabel: 'Mostrar filtros',
  columnHeaderSortIconLabel: 'Ordenar',
  // Rows selected footer text
  footerRowSelected: (count) =>
    count > 1
      ? `${count.toLocaleString()} filas seleccionadas`
      : `${count.toLocaleString()} fila seleccionada`,
  // Total row amount footer text
  footerTotalRows: 'Filas Totales:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Seleccionar casilla',
  checkboxSelectionSelectAllRows: 'Seleccionar todas las filas',
  checkboxSelectionUnselectAllRows: 'Deseleccionar todas las filas',
  checkboxSelectionSelectRow: 'Seleccionar fila',
  checkboxSelectionUnselectRow: 'Deseleccionar fila',
  // Boolean cell text
  booleanCellTrueLabel: 'si',
  booleanCellFalseLabel: 'no',
  // Actions cell more text
  actionsCellMore: 'más',
  // Column pinning text
  pinToLeft: 'Anclar a la izquierda',
  pinToRight: 'Anclar a la derecha',
  unpin: 'Desanclar',
  // Tree Data
  treeDataGroupingHeaderName: 'Grupo',
  treeDataExpand: 'mostrar hijos',
  treeDataCollapse: 'ocultar hijos',
  // Grouping columns
  groupingColumnHeaderName: 'Grupo',
  groupColumn: (name) => `Agrupar por ${name}`,
  unGroupColumn: (name) => `No agrupar por ${name}`,
  // Master/detail
  detailPanelToggle: 'Alternar detalle',
  expandDetailPanel: 'Expandir',
  collapseDetailPanel: 'Contraer',
  // Row reordering text
  rowReorderingHeaderName: 'Reordenar filas',
  // Aggregation
  aggregationMenuItemHeader: 'Agregación',
  aggregationFunctionLabelSum: 'suma',
  aggregationFunctionLabelAvg: 'promedio',
  aggregationFunctionLabelMin: 'mínimo',
  aggregationFunctionLabelMax: 'máximo',
  aggregationFunctionLabelSize: 'tamaño',
};

export default function DataTable({ url, name = 'archivo' }) {
  const [data, setData] = useState({ rows: [], columns: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then((response) => {
        const columns = Object.keys(response.data[0]).map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          width: 150,
        }));
        const rows = response.data.map((item, index) => ({ id: index, ...item }));

        setData({ columns, rows });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={data.rows}
          columns={data.columns}
          localeText={esESLocaleText}
          loading={loading}
          slots={{
            toolbar: () => <CustomToolbar name={name} />,
          }}
        />
      </div>
    </ThemeProvider>
  );
}
