import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Row, Form } from 'react-bootstrap';
import './styles.css';

const AdminPanel = () => {
    const [properties, setProperties] = useState([]);
    const [viewMode, setViewMode] = useState('list')
    const [branchCodeFilter, setBranchCodeFilter] = useState('');
    const [talukFilter, setTalukFilter] = useState('');
    const [villageFilter, setVillageFilter] = useState('');

    const handleBranchCodeFilterChange = (e) => {
        setBranchCodeFilter(e.target.value);
    };

    const handleTalukFilterChange = (e) => {
        setTalukFilter(e.target.value);
    };

    const handleVillageFilterChange = (e) => {
        setVillageFilter(e.target.value);
    };

     const filteredProperties = properties.filter(property => 
        property.branchCode.toLowerCase().includes(branchCodeFilter.toLowerCase()) &&
        property.taluk.toLowerCase().includes(talukFilter.toLowerCase()) &&
        property.village.toLowerCase().includes(villageFilter.toLowerCase())
    );

    const fetchProperties = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/sitedetails');
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            const data = await response.json();
            setProperties(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
            alert('Failed to fetch properties. Please try again later.');
        }
    };

    const deleteProperty = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/sitedetails/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            fetchProperties(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting property:', error);
            alert('Failed to delete property. Please try again later.');
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    return (
        <>
        <Container>
            <h1>Admin Panel</h1>
            <div className='admin-header'>
                <div className='left-header'>
                    <h4>Site Listing</h4>
                </div>
                <Form.Group controlId="branchCodeFilter">
                <Form.Label>Filter by Branch Code</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter Branch Code" 
                    value={branchCodeFilter} 
                    onChange={handleBranchCodeFilterChange} 
                />
            </Form.Group>
            <Form.Group controlId="talukFilter">
                <Form.Label>Filter by Taluk</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter Taluk" 
                    value={talukFilter} 
                    onChange={handleTalukFilterChange} 
                />
            </Form.Group>
            <Form.Group controlId="villageFilter">
                <Form.Label>Filter by Village</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter Village" 
                    value={villageFilter} 
                    onChange={handleVillageFilterChange} 
                />
            </Form.Group>
                <div className='right-header'>
                    <Button
                        variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                        onClick={() => handleViewModeChange('list')}
                    >
                        List
                    </Button>
                    <Button
                        variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                        onClick={() => handleViewModeChange('grid')}
                    >
                        Grid
                    </Button>
                </div>
            </div>

            {viewMode === 'list' ? (
                <div className='table-view'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Branch Code</th>
                                <th>Sch No</th>
                                <th>District</th>
                                <th>Taluk</th>
                                <th>Village</th>
                                <th>Kara</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredProperties.map(property => (
                                <tr key={property._id}>
                                    <td>{property.slNo}</td>
                                    <td>{property.branchCode}</td>
                                    <td>{property.schNo}</td>
                                    <td>{property.district}</td>
                                    <td>{property.taluk}</td>
                                    <td>{property.village}</td>
                                    <td>{property.kara}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => deleteProperty(property._id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div className='site-details'>
                    <div className='site-detail-container'>
                    {filteredProperties.map(property => (
                            <Container className='site-container' key={property._id}>
                                <Row>
                                    <div className='site-list' style={{ display: 'flex', gap: '50px' }}>
                                        <p>Sl.No: <span>{property.slNo}</span></p>
                                        <p>Branch Code: <span>{property.branchCode}</span></p>
                                        <p>Sch No: <span>{property.schNo}</span></p>
                                    </div>
                                </Row>
                                <Row>
                                    <div className='site-list'>
                                        <h5>Place</h5>
                                    </div>
                                    <div className='site-list' style={{ display: 'flex', gap: '50px' }}>
                                        <p>District: <span>{property.district}</span></p>
                                        <p>Taluk: <span>{property.taluk}</span></p>
                                        <p>Village: <span>{property.village}</span></p>
                                        <p>Kara: <span>{property.kara}</span></p>
                                    </div>
                                </Row>
                                <Row>
                                    <div className='site-list' style={{ display: 'flex', gap: '50px' }}>
                                        <h5>Old Site</h5>
                                        <p>Old Tp: <span>{property.oldTp}</span></p>
                                        <p>Old Sy No.: <span>{property.oldSyNo}</span></p>
                                        <p>Sub-Div No.: <span>{property.subDivNo}</span></p>
                                    </div>
                                    <div className='site-list' style={{ display: 'flex', gap: '50px' }}>
                                        <h5>Area</h5>
                                        <p>Acre: <span>{property.areaAcre}</span></p>
                                        <p>Cents: <span>{property.areaCents}</span></p>
                                    </div>
                                </Row>
                                <Row>
                                    <div className='site-list' style={{ display: 'flex', gap: '50px' }}>
                                        <h5>New Site</h5>
                                        <p>Re Sy Bk No: <span>{property.reSyBkNo}</span></p>
                                        <p>Re Sy No.: <span>{property.reSyNo}</span></p>
                                        <p>Sub-Div No.: <span>{property.subDiv}</span></p>
                                    </div>
                                    <div className='site-list' style={{ display: 'flex', gap: '50px' }}>
                                        <h5>Area</h5>
                                        <p>Hec: <span>{property.areaHec}</span></p>
                                        <p>Area: <span>{property.areaAres}</span></p>
                                        <p>SqM: <span>{property.areaSqM}</span></p>
                                    </div>
                                </Row>
                                <Row>
                                    <div className='site-list' style={{ display: 'flex', gap: '50px' }}>
                                        <h5>Around Location</h5>
                                        <p>North: <span>{property.east}</span></p>
                                        <p>South: <span>{property.south}</span></p>
                                        <p>West: <span>{property.west}</span></p>
                                        <p>North: <span>{property.north}</span></p>
                                    </div>
                                </Row> 
                                <Row>
                                    <Button variant="danger" style={{ margin: "20px", width: "100px" }} onClick={() => deleteProperty(property._id)}>
                                        Delete
                                    </Button>
                                </Row>    
                            </Container>
                        ))}
                    </div>
                </div>
            )}
        </Container>

        </>
     
    );
};

export default AdminPanel;