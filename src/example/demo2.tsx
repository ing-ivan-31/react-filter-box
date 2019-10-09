import * as React from 'react';
import "fixed-data-table/dist/fixed-data-table.min.css";
import data from "./data";
import ReactFilterBox, {AutoCompleteOption, Expression} from "../ReactFilterBox";

export default class Demo2 extends React.Component<any, any> {

    options: AutoCompleteOption[];
    operators: string[];
    defaultFields: any;
    private reactFilterBox: any;

    constructor(props: any) {
        super(props);

        this.defaultFields = {
            vrbo: {
                bathroom_num: 0,
                bedroom_num: 0,
                duplicate_airbnb_flag: "string",
                first_live_date: 0,
                listing_address1: "string",
                listing_city: "string",
                listing_country: "string",
                listing_postal_code: "string",
                listing_source_name: "string",
                listing_state: "string",
                listing_type_desc: "string",
                listing_url: "string",
                property_contact_company_name: "string",
                rental_number: "string",
                sleep_num: 0,
                unit_thumbnail_url: "string",
                unit_uuid: "string",
            },
            airbnb: {
                listing_title: "string",
                property_type: "string",
                listing_type: "string",
                //"created_date": "string",
                //"last_scraped_date": "string",
                country: "string",
                state: "string",
                city: "string",
                neighborhood: "string",
                metropolitan_statistical_area: "string",
                average_daily_rate: 0,
                annual_revenue_ltm: 0,
                occupancy_rate_ltm: 0,
                number_of_bookings_ltm: 0,
                number_of_reviews: 0,
                bedrooms: 0,
                year: 0,
                max_guests: 0,
                //calendar_last_updated: "string",
                response_rate: "string",
                //"response_time_min": "string",
                //"superhost": "string",
                //"cancellation_policy": "string",
                security_deposit: 0,
                cleaning_fee: 0,
                extra_people_fee: 0,
                published_nightly_rate: 0,
                published_monthly_rate: 0,
                published_weekly_rate: 0,
                //checkin_time: "string",
                //checkout_time": "string",
                minimum_stay: 0,
                count_reservation_days_ltm: 0,
                count_available_days_ltm: 0,
                count_blocked_days_ltm: 0,
                number_of_photos: 0,
                instantbook_enabled: "string",
                listing_url: "string",
                listing_main_image_url: "string",
                listing_images: "string",
                //amenity_smoking: false,
                //amenity_pets_allowed: false,
                //amenity_tv: false,
                //amenity_internet: false,
                //amenity_cabletv: false,
                //"amenity_wireless": false,
                //"amenity_aircon": false,
                //"amenity_heating": false,
                //"amenity_elevator": false,
                //"amenity_pool": false,
                //"amenity_handicap_access": false,
                //"amenity_kitchen": false,
                //"amenity_doorman": false,
                //"amenity_free_parking": false,
                //"amenity_gym": false,
                //"amenity_hottub": false,
                //"amenity_indoor_fireplace": false,
                //"amenity_intercom": false,
                //"amenity_breakfast": false,
                //"amenity_suitable_for_events": false,
                //"amenity_washer": false,
                //"amenity_dryer": false,
                rating_overall: 0,
                rating_communication: 0,
                rating_accuracy: 0,
                rating_cleanliness: 0,
                rating_checkin: 0,
                rating_location: 0,
                rating_value: 0,
                //desc_full: "string",
                //desc_space: "string",
                //desc_transit: "string",
                //desc_neighborhood: "string",
                //desc_interaction: "string",
                //"desc_rules": "string",
                //"desc_notes": "string",
                //"desc_access": "string",
                //"address": "string",
                //source_extract_monthid": "string",
                //business_ready: "string",
                //abb_exclusivity_from_ha: false
            }
        };

        this.state = {
            data: data,
            query: '',
            filterBrand: '',
            fields: this.getFields(this.defaultFields),
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
        var className = ` hint-value cm-${data.type}`;

        return <div className={className}  >
                    <span style={{ fontWeight: "bold" }}>{data.value}</span>
                    <span style={{color:"gray", fontSize:10}}> [{data.brand}] </span>
                </div>
    }

    onParseOk(expressions: Expression[]) {
        if (expressions.length > 0 && expressions[0].hasOwnProperty('brand') && expressions[0].brand) {
            this.setState({filterBrand: expressions[0].brand}, this.filterDefaultFields);
        }
    }

    filterDefaultFields() {
        let composeKeys = this.getFields(this.defaultFields);

        if (this.state.filterBrand) {
            // @ts-ignore
            composeKeys = composeKeys.filter((obj) => {
                return obj.brand === this.state.filterBrand
            });
        }

        this.setState({fields: composeKeys});
    }

    // @ts-ignore
    fromSnakeToTitleCase = (snake) => {
        return snake.replace(/\_/g, ' ')
        // @ts-ignore
            .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    };


    // @ts-ignore
    getFields = (fields) => {
        let keys = Object.keys(fields);

        let values = Object.keys(fields)
            .map(function(key) {
                return fields[key];
            })
            .map((field) => {
               return field;
            });

        // @ts-ignore
        let composeKeys = [];
        values.map((value, index) => {
            let obj = {};
            // @ts-ignore
            for (let property in value) {
                // @ts-ignore
                obj = {
                    // @ts-ignore
                    columnText: this.fromSnakeToTitleCase(property),
                    // @ts-ignore
                    columnField: property,
                    type: 'text',
                    brand: keys[index]
                };
                composeKeys.push(obj);
            }
        });

        // @ts-ignore
       return composeKeys;
    };

    onClear = () => {
        this.setState({filterBrand: ''}, this.filterDefaultFields);
        this.reactFilterBox.onClear();
    };

    render() {
        return <div className="main-container">
            <h3>Custom Rendering (AutoComplete, Operator) <a style={{fontSize:12, color:"#2196F3"}} href="https://github.com/nhabuiduc/react-filter-box/blob/master/js-example/src/demo2.js">Source</a></h3>

            <ReactFilterBox
                customRenderCompletionItem = {this.customRenderCompletionItem.bind(this) }
                query={this.state.query}
                data={data}
                options= {this.state.fields}
                onParseOk={this.onParseOk.bind(this) }
                operators={this.operators}
                ref={ReactFilterBox => this.reactFilterBox = ReactFilterBox}
            />
            <button onClick={this.onClear.bind(this)}>clear advanced search</button>
        </div>
    }
}