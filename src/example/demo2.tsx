import * as React from 'react';
import "fixed-data-table/dist/fixed-data-table.min.css";
import data from "./data";
import ReactFilterBox, {AutoCompleteOption, Expression} from "../ReactFilterBox";

export default class Demo2 extends React.Component<any, any> {

    options: AutoCompleteOption[];
    operators: string[];
    private reactFilterBox: any;

    constructor(props: any) {
        super(props);
        this.state = {
            data: data,
            query: ''
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

    // @ts-ignore
    fromSnakeToTitleCase = (snake) => {
        return snake.replace(/\_/g, ' ')
        // @ts-ignore
            .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    };


    // @ts-ignore
    getFields = (fields) => {
        const keys = Object.keys(fields);
        return keys.map((field) => {
            return {
                columnText: this.fromSnakeToTitleCase(field),
                columnField: field,
                type: 'text'
            };
        });
    };

    onClear = () => {
        this.reactFilterBox.onClear();
    };

    render() {
        const defaultFields = [
            {
                bathroom_num: 7,
                bedroom_num: 10,
                duplicate_airbnb_flag: "N",
                first_live_date: 1376667075067,
                listing_address1: "ave.",
                listing_city: "marble falls",
                listing_country: "united states",
                listing_postal_code: "78654",
                listing_source_name: "Platform",
                listing_state: "texas",
                listing_type_desc: "estate",
                listing_url: "http",
                property_contact_company_name: "Escondido",
                rental_number: "490043",
                sleep_num: 25,
                unit_thumbnail_url: "http",
                unit_uuid: "b96dc12c-7cdf-47af-931d-94e83d84d0c0",
            }
        ];

        let fields = defaultFields.shift();

        return <div className="main-container">
            <h3>Custom Rendering (AutoComplete, Operator) <a style={{fontSize:12, color:"#2196F3"}} href="https://github.com/nhabuiduc/react-filter-box/blob/master/js-example/src/demo2.js">Source</a></h3>

            <ReactFilterBox
                customRenderCompletionItem = {this.customRenderCompletionItem.bind(this) }
                query={this.state.query}
                data={data}
                options= {this.getFields(fields)}
                onParseOk={this.onParseOk.bind(this) }
                operators={this.operators}
                ref={ReactFilterBox => this.reactFilterBox = ReactFilterBox}
            />
            <button onClick={this.onClear.bind(this)}>clear advanced search</button>
        </div>
    }
}