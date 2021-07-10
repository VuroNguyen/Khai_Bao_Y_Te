import React, { useEffect, useState } from 'react'
import { Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import ReportContent from './reportContent'
import RESPONSE_API from '../../api/Report';
import Pagination from '../../components/Pagination';

function Report() {
    const [responseData, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [contentsPerPage, setContentsPerPage] = useState(4);

    useEffect(() => {
        const fetchReport = async () => {
            setLoading(true);
            const response = await RESPONSE_API.getResponse();
            setResponse(response.data);
            setLoading(false);
            console.log(response);
            console.log(response.data);
        }
        fetchReport();
    }, []);

    const indexOfLastContent = currentPage * contentsPerPage;
    const indexOfFirstContent = indexOfLastContent - contentsPerPage;
    const currentApproved = responseData.slice(indexOfFirstContent, indexOfLastContent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div>
                <FormGroup>
                    <Input className='form-input' type="select" name="select">
                        <option>Articles</option>
                        <option>Photogragh</option>
                    </Input>
                </FormGroup>

                <Card>
                    <ReportContent responseData={currentApproved} loading={loading} key={responseData.id} />
                    <div className="padding-top">
                        <Pagination contentsPerPage={contentsPerPage} totalContent={responseData.length} paginate={paginate} />
                    </div>

                </Card>
            </div>
        </>
    )
}

export default Report