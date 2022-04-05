import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useEffect, useState } from 'react';
import axios from 'axios';
const Item = (props) => {
    const { id } = useParams();
    const { user } = props.auth;
    window.scrollTo(0, 0);
    const [item, setItem] = useState(null);
    const [loading, isLoading] = useState(true);
    useEffect(() => {
        const fetchItems = async (user) => {
            console.log('sds');
            const { data } = await axios.get("http://localhost:5000/api/items/", {
                params: {
                    email: user.email
                }
            }
            );
            return data.items;
        }
        fetchItems(user).then(data => {
            console.log(data);
            
            const res = data.filter(i => i._id === id)[0];
            console.log(res);
            setItem(res);
            isLoading(false);
        });
    }, [])

    return (
        <>
            <div style={{ height: "75vh", flexDirection: "column", color: "white" }} className="container valign-wrapper">
                <h2>Hello from item page #{id}</h2>
                <h1>{item.name}</h1>
            </div>
        </>
    )
};

Item.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    items: state.items
});

export default connect(
    mapStateToProps,
)(Item);