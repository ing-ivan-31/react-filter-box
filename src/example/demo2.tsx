import * as React from 'react';
import "fixed-data-table/dist/fixed-data-table.min.css";
import data from "./data";
import ReactFilterBox, {AutoCompleteOption, SqlMissingOperators, Expression} from "../ReactFilterBox";

export default class Demo2 extends React.Component<any, any> {

    options: AutoCompleteOption[];
    operators: string[];
    constructor(props: any) {
        super(props);
        this.state = {
            data: data
        };

        this.options = [
            {
                columnText: "Name",
                columnField: "Name Field",
                type: "text"
            },
            {
                columnText: "Description",
                columnField: "Description field",
                type: "text"
            },
            {
                columnField: "Status",
                type: "selection"
            },
            {
                columnText: "Email @",
                columnField: "Email",
                type: "text"
            }
        ];

        this.operators = ['==', '!=', 'contains', '!contains', '>', '>=', '<', '<=', 'is', ':in', '~'];
    }

    //customer your rendering item in auto complete
    customRenderCompletionItem(self: any, data: any, pick: any) {
        var className = ` hint-value cm-${data.type}`

        return <div className={className}  >
                    <span style={{ fontWeight: "bold" }}>{data.value}</span>
                    <span style={{color:"gray", fontSize:10}}> [{data.type}] </span>
                </div>
    }

    onParseOk(expressions: Expression[]) {

        console.log("onParseOk2", expressions);
    }

    render() {
        var rows = this.state.data;
        return <div className="main-container">
            <h3>Custom Rendering (AutoComplete, Operator) <a style={{fontSize:12, color:"#2196F3"}} href="https://github.com/nhabuiduc/react-filter-box/blob/master/js-example/src/demo2.js">Source</a></h3>

            <ReactFilterBox
                customRenderCompletionItem = {this.customRenderCompletionItem.bind(this) }
                query={this.state.query}
                data={data}
                options={this.options}
                onParseOk={this.onParseOk.bind(this) }
                operators={this.operators}
                />

        </div>
    }
}