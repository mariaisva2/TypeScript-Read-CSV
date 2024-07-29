import { DataRow, DataTable, ColumnName} from "./models.js"

export class FileController {
    private data: DataTable = [];
    private columnNames: ColumnName = [];

    constructor(private fileContent: string) {
        this.processFile();
    }

    private processFile(): void {
        const lines: string[] = this.fileContent.split(/[\r\n]+/).filter(line => line.trim()!=="");
        if(lines.length > 0){
            this.columnNames = lines[0].split(",");
            this.data = lines.slice(1).map(line=>{
                const value: string[] = line.split(',');
                const row: DataRow = {};
                this.columnNames.forEach((columName, index)=>{
                    row[columName] = value[index] || "";
                })
                return row;
            })
        }
    }

    getData():DataTable{
        return this.data;
    }
    getColumnNames():ColumnName{
        return this.columnNames;
    }
}