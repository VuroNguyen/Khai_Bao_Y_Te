import React from 'react';
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Col,
    Row
} from 'reactstrap';

function ReportContent({ response, loading }) {
    if (loading) {
        return <h2>Loading .... </h2>
    }

    return (
        <div>
            {response && response.map(response => (

                <Card className='card'>
                    <div className='card-text-top'>
                        <CardText className='card-title'>This is title</CardText>
                        <CardText className='card-status'>Date approved</CardText>
                    </div>
                    <CardText className='card-des'>{response._id}</CardText>
                    <CardText className='card-des'>{response.quest1}</CardText>
                </Card>

            ))}
        </div>
    )
}

export default ReportContent