### CSV File Reading and Filtering Project
- This project allows you to upload, view, filter and download CSV files in an HTML table. Includes functionality to paginate results and search for specific terms within the uploaded data.

### Installation and configuration
## Configure TypeScript

- Initialize TypeScript and generate the tsconfig.json file with
- tsc --init

### Compile the Project

- To build the project automatically whenever there is a change in the TypeScript files, use the following command.

- tsc -w

### Main Features
- CSV File Upload:

-The upload button allows you to select a CSV or TXT file that you have on your computer. Once selected, the file is read and the data is processed to be displayed via a simple table.

<!-- const csvForm = document.getElementById("csvForm") as HTMLFormElement;
csvForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    // Código para leer y procesar el archivo CSV
}); -->

### Search in the Data:

The search bar allows you to filter the data displayed in the table in real time, making it easy to locate specific records.

<!-- const searchInput = document.getElementById("searchInput") as HTMLInputElement;
searchInput.addEventListener('input', async (e: Event) => {
    await renderTableControls();
}); -->

### Download Leaked Data:

The download button allows you to download the filtered data as a new CSV file.

<!-- const downloadCSVButton = document.getElementById("downloadCSV") as HTMLInputElement;
downloadCSVButton.addEventListener('click', async (e: Event) => {
    e.preventDefault();
    // Código para convertir y descargar el CSV filtrado
}); -->

### index.ts:

Controls file loading, paging, and searching through data.
Displays data in an HTML table and handles user events.

<!-- const csvForm = document.getElementById("csvForm") as HTMLFormElement;

const csvFile = document.getElementById("csvFile") as HTMLInputElement; -->

### models/fileController.ts:

Processes the content of the uploaded file, separating columns and rows of data.

<!--
import { DataRow, DataTable, ColumnName} from "./models.js"

export class FileController {
    private data: DataTable = [];
    private columnNames: ColumnName = [];

    constructor(private fileContent: string) {
        this.processFile();
    } -->

### controllers/table.ts:

Generates the table HTML to display paginated and filtered data.

<!-- import {DataTable} from "../models/models.js";

export async function renderTable(arrayTable: DataTable, currentPage: number, recordsPerPage: number): Promise<string>  {
   /*Index Start and end*/
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedData = arrayTable.slice(startIndex, endIndex); -->
  
### controllers/filter.ts:

Filters data based on search terms provided by the user.

<!-- import { DataTable} from "../models/models.js";

export function filterData(
    arrayTable: DataTable,
    searchTerm: string
  ): DataTable {
    if (!searchTerm) return arrayTable;
    const lowerCaseTerm = searchTerm.toLowerCase(); //convertit todo a minuscula
    return arrayTable.filter((row) =>
      Object.values(row).some((cell) => {
        //cada fila se convierte en un objeto
        if (cell === null || cell === undefined) return false; //manejo de errores
        return cell.toString().toLowerCase().includes(lowerCaseTerm);
      })
    );
  } -->

### controllers/downloadCSV.ts:

Convert the filtered data to CSV format and manage the file download.

<!-- import { DataRow, ColumnName } from "../models/models.js";

export async function convertCsv(data: DataRow[], columnNames: ColumnName): Promise<string>{
    const csvRows=[];
    /* add headers */
    csvRows.push(columnNames.join(","));
    /* add data */
    data.forEach(row=>{
        const values = columnNames.map(column=>row[column] || "");
        csvRows.push(values.join(""));
    })
    return csvRows.join("\n");
} -->