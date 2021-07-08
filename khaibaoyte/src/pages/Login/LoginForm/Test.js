import React, { Component } from "react";

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rfp: false,
            rfx: false,
            rfp_x: false,
            all: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.checked });
    }

    onSubmit(e) {
        e.preventDefault();
        const FilterRegion = {
            rfx: this.state.rfx,
            rfp: this.state.rfp,
            rfp_x: this.state.rfp_x,
            all: this.state.all
        };
        console.log(FilterRegion);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <fieldset>
                    <legend>RFX/RFP:</legend>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            onChange={this.onChange}
                            value={this.state.rfx}
                            name="rfx"
                            id="rfx"
                        />
                        <label className="form-check-label" name="rfx">
                            RFX
                        </label>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <input
                            type="checkbox"
                            className="form-check-input"
                            onChange={this.onChange}
                            value={this.state.rfp}
                            name="rfp"
                            id="rfp"
                        />
                        <label className="form-check-label">RFP</label>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <input
                            type="checkbox"
                            className="form-check-input"
                            onChange={this.onChange}
                            value={this.state.rfp_x}
                            name="rfp_x"
                            id="rfp(x)"
                        />
                        <label className="form-check-label">RFP(X)</label>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <input
                            type="checkbox"
                            className="form-check-input"
                            onChange={this.onChange}
                            name="all"
                            id="all"
                        />
                        <label className="form-check-label" name="all" id="all">
                            ALL
                        </label>
                    </div>
                </fieldset>

                <input type="submit" />
            </form>
        );
    }
}
