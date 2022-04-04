import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router";


const Item = () => {
    const { id } = useParams();
    return (
        <>
            <div style={{ height: "75vh", flexDirection: "column", color: "white" }} className="container valign-wrapper">
                <h2>Hello from item page #{id}</h2>
            </div>
        </>
    )
};

const mapStateToProps = state => ({
    auth: state.auth,
    items: state.items
});

export default connect(
    mapStateToProps,
)(Item);