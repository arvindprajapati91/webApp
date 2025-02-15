import React from 'react';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            defaultValue: "Vanilla"

        }
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    // filterDic = () => {
    //     var selected = 'vanilla';
    //     const res = options.filter(
    //         ({ value }) =>
    //             selected === value);
    //     const defaultVal = { value: res[0].value, label: res[0].label }
    //     console.log(defaultVal)
    //     this.setState ({selectedOption: defaultVal})
    //     console.log(res, this.state.selectedOption)
    // }
    componentDidMount() {
        alert(this.props.defaultVal)
    }

    render() {

        return (
            <Select className="col-lg-3 col-md-3 col-sm-3"
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.props.options}
                isClearable
                defaultValue={() => this.props.defaultVal ? this.setState({ selectedOption: this.props.defaultVal }) : ''}

            />
        );
    }
}

export default App