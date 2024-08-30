import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './styles.css'; 

const FormSection = () => {
    
    const districtTalukMap = {
          Alappuzha: ['Ambalappuzha','Chengannur', 'Cherthala', 'Karthikappally', 'Mavelikkara'],
          Ernakulam: ['Aluva', 'Kunnathunadu', 'Muvattupuzha', 'Paravur'],
          Idukki: ['Devikulam', 'Peermedu', 'Thodupuzha', 'Udumbanchola'],
          Kannur: ['Kannur', 'Taliparamba', 'Thalassery'],
          Kasaragod: ['Hosdurg', 'Kasaragod'],
          Kollam: ['Karunagappally', 'Kollam', 'Kottarakkara','Kunnathur','Pathanapuram'],
          Kottayam: ['Changanassery', 'Kanjirappally', 'Kottayam','	Meenachil','Vaikom'],
          Kozhikode: ['Kozhikode', 'Quilandy', 'Vadakara'],
          Malappuram: ['Ernad', 'Nilambur', 'Perinthalmanna','Ponnani','Tirur','Tirurangadi'],
          Palakkad: ['Alathur', 'Chittur', 'Mannarkad','Ottappalam','Palakkad'],
          Pathanamthitta: ['Adoor', 'Kozhenchery', 'Mallappally','Ranni','Thiruvalla'],
          Thiruvananthapuram: ['Chirayinkeezhu', 'Nedumangad', 'Neyyattinkara','Thiruvananthapuram'],
          Thrissur: ['Chavakkad', 'Kodungallur', '	Mukundapuram','	Talappilly','Thrissur'],
          Wayanad: ['	Mananthavady', '	Sulthanbathery', '	Vythiri  ']
      };

    const talukVillageMap = {
            Ambalappuzha: [
                'Alappuzha (M + OG)', 
                'Ambalappuzha', 
                'Aryad South (Part)', 
                'Kalarkode (OG) (Part)',
                'Kalavoor',
                'Karumady',
                'Komalapuram (CT)',
                'Mannanchery (CT)',
                'Mullakkal (Part)',
                'Pathirappally (CT)',
                'Punnapra (OG)',
                'Purakkad'
            ],
            Chengannur: [
                'Ala (Part)',
                'Chengannur (Part)',
                'Chengannur (M)',
                'Cheriyanad',
                'Ennakkad',
                'Kurattissery (CT)',
                'Mannar (CT)',
                'Mulakuzha (Part)',
                'Pandanad (Part)',
                'Puliyoor(Part)',
                'Thiruvanvandoor'
            ],
            Cherthala: [
                'Arookutty (CT)',
                'Aroor (CT)',
                'Cherthala (M)',
                'Cherthala North (Part)',
                'Cherthala South (Part)',
                'Ezhupunna (CT)',
                '	Kadakkarappally',
                '	Kanjikkuzhi (CT)',
                '	Kodamthuruth (CT)',
                '	Kokkothamangalam (CT)',
                '	Kuthiathode (CT)',
                '	Mararikkulam North',
                '	Muhamma (CT)',
                '	Pallippuram (CT)',
                '	Panavally',
                '	Pattanakkad',
                '	Perumbalam',
                '	Thaikattussery (CT)',
                '	Thanneermukkam (CT)',
                '	Thuravoor Thekku',
                '	Vayalar (CT)'
            ],
            Karthikappally:[
                '	Arattupuzha',
                '	Cheppad (CT)',
                '	Cheruthana',
                '	Chingoli (CT)',
                '	Haripad (CT)',
                '	Kandalloor (CT)',
                '	Karthikappally (CT)',
                '	Karuvatta',
                '	Kayamkulam (M)',
                '	Keerikkad (CT)',
                '	Krishnapuram (CT)',
                '	Kumarapuram (CT)',
                '	Muthukulam (CT)',
                '	Pallippad',
                '	Pathiyoor (CT)',
                '	Puthuppally (CT)',
                '	Thrikkunnapuzha',
                '	Veeyapuram'
            ],
            Kuttanad: [
                'Champakkulam'
            ]
        }

    const initialFormData = {
        slNo: 1,
        branchCode: '',
        schNo: '',
        district: '',
        taluk: '',
        village: '',
        kara: '',
        oldTp: '',
        oldSyNo: '',
        subDivNo: '',
        areaAcre: '',
        areaCents: '',
        reSyBkNo: '',
        reSyNo: '',
        subDiv: '',
        areaHec: '',
        areaAres: '',
        areaSqM: '',
        east: '',
        south: '',
        west: '',
        north: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [successMessage, setSuccessMessage] = useState('');
    const [lastSlNo, setLastSlNo] = useState(1);
    const [lastSchNoMap, setLastSchNoMap] = useState({});
    
 
    const typeToBranchCodeMap = {};
    for (let i = 1; i <= 94; i++) {
        const branchCode = `A${String(i).padStart(2, '0')}`;
        typeToBranchCodeMap[i] = branchCode;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        // Update schNo based on branchCode
        if (name === 'branchCode') {
            const newSchNo = generateSchNo(value);
            setFormData((prevData) => ({
                ...prevData,
                schNo: newSchNo
            }));
        }
    };


     const handleTypeChange = (e) => {
        const typeNumber = e.target.value;
        const branchCode = typeToBranchCodeMap[typeNumber];

        if (branchCode) {
            const newSchNo = generateSchNo(branchCode);
            setFormData((prevData) => ({
                ...prevData,
                branchCode: branchCode,
                schNo: newSchNo
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                branchCode: '',
                schNo: ''
            }));
        }
    };


    const generateSchNo = (branchCode) => {
        // Get the last schNo for the current branchCode
        const lastSchNo = lastSchNoMap[branchCode] || 0; // Default to 0 if not found
        const newSchNoSuffix = lastSchNo + 1; // Increment the last schNo
        const newSchNo = `${branchCode}${String(newSchNoSuffix).padStart(4, '0')}`; // Format: BranchCode0001

        // Update the lastSchNoMap with the new schNo
        setLastSchNoMap((prevMap) => ({
            ...prevMap,
            [branchCode]: newSchNoSuffix // Store the last used suffix
        }));

        return newSchNo;
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Increment the slNo for the next entry
            setLastSlNo((prevLastSlNo) => prevLastSlNo + 1);

            // Update formData with the new slNo
            setFormData((prevData) => ({
                ...prevData,
                slNo: lastSlNo + 1 // Set the new slNo
            }));

            const response = await fetch('http://localhost:5000/api/sitedetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Success:', data);
            setSuccessMessage('Form submitted successfully!');

            // Reset form data after submission
            setFormData({
                slNo: lastSlNo + 1, // Reset to the next slNo
                branchCode: '',
                schNo: '',
                district: '',
                taluk: '',
                village: '',
                kara: '',
                oldTp: '',
                oldSyNo: '',
                subDivNo: '',
                areaAcre: '',
                areaCents: '',
                reSyBkNo: '',
                reSyNo: '',
                subDiv: '',
                areaHec: '',
                areaAres: '',
                areaSqM: '',
                east: '',
                south: '',
                west: '',
                north: '',
            });

            // Optionally hide the success message after a delay
            setTimeout(() => setSuccessMessage(''), 2000);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    // Handle clear button functionality
    const handleClear = () => {
        // Reset form data to initial state
        setFormData(initialFormData);
        setSuccessMessage(''); // Clear any success message
    };

    return (
        <section className="form-section">
            <header className="form-heading">
                <h1>Property Schedule</h1>
                <p>Enter the Details</p>
            </header>
            <Container className="box form-container">
                <Form onSubmit={handleSubmit}> 
                    <div className="top-form">
                      <Form.Control
                            type="text"
                            name="slNo"
                            value={formData.slNo}
                            readOnly
                            placeholder="Sl.No"
                        />
                        <Form.Select name="typeNumber" onChange={handleTypeChange}>
                            <option value="">Select Type Number</option>
                            {Object.keys(typeToBranchCodeMap).map((typeNumber) => (
                                <option key={typeNumber} value={typeNumber}>
                                    {typeToBranchCodeMap[typeNumber]}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control type="text" name="schNo" value={formData.schNo} readOnly placeholder="Sch No" />
                    </div>

                    <Row className="form-row">
                        <Col md={4} className="form-col">
                            <Form.Select name="district" value={formData.district} onChange={handleChange}>
                                <option>District</option>
                                <option value="Alappuzha">Alappuzha</option>
                                <option value="Ernakulam">Ernakulam</option>
                                <option value="Idukki">Idukki</option>
                                <option value="Kannur">Kannur</option>
                                <option value="Kasaragod">Kasaragod</option>
                                <option value="Kollam">Kollam</option>
                                <option value="Kottayam">Kottayam</option>
                                <option value="Kozhikode">Kozhikode</option>
                                <option value="Malappuram">Malappuram</option>
                                <option value="Palakkad">Palakkad</option>
                                <option value="Pathanamthitta">Pathanamthitta</option>
                                <option value="Thrissur">Thrissur</option>
                                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                                <option value="Wayanad">Wayanad</option>
                            </Form.Select>
                        </Col>
                        <Col md={4} className="form-col">
                            <Form.Select name="taluk" value={formData.taluk} onChange={handleChange}>
                                <option>Select Taluk</option>
                                {formData.district && districtTalukMap[formData.district].map((taluk, index) => (
                                    <option key={index} value={taluk}>
                                        {taluk}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={4} className="form-col">
                            <Form.Select name="village" value={formData.village} onChange={handleChange}>
                                <option>Village</option>
                                {formData.taluk && talukVillageMap[formData.taluk]?.map((village, index) => (
                                    <option key={index} value={village}>
                                        {village}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={12} className="form-col">
                            <Form.Control type="text" name="kara" value={formData.kara} onChange={handleChange} placeholder="Kara" />
                        </Col>
                    </Row>

                    <div className="top-form" style={{ marginTop: '50px' }}>
                        <Form.Control type="text" name="oldTp" value={formData.oldTp} onChange={handleChange} placeholder="Old Tp" />
                        <Form.Control type="text" name="oldSyNo" value={formData.oldSyNo} onChange={handleChange} placeholder="Old Sy No" />
                        <Form.Control type="text" name="subDivNo" value={formData.subDivNo} onChange={handleChange} placeholder="Sub Div No." />
                    </div>

                    <div className="area-flex" style={{ marginTop: '-15px' }}>
                        <Form.Label>Area</Form.Label>
                        <Form.Control type="text" name="areaAcre" value={formData.areaAcre} onChange={handleChange} placeholder="Acre" />
                        <Form.Control type="text" name="areaCents" value={formData.areaCents} onChange={handleChange} placeholder="Cents" />
                    </div>

                    <div className="top-form" style={{ marginTop: '50px' }}>
                        <Form.Control type="text" name="reSyBkNo" value={formData.reSyBkNo} onChange={handleChange} placeholder="Re Sy Bk No" />
                        <Form.Control type="text" name="reSyNo" value={formData.reSyNo} onChange={handleChange} placeholder="Re Sy No" />
                        <Form.Control type="text" name="subDiv" value={formData.subDiv} onChange={handleChange} placeholder="Sub Div" />
                    </div>

                    <div className="area-flex" style={{ marginTop: '-15px' }}>
                        <Form.Label>Area</Form.Label>
                        <Form.Control type="text" name="areaHec" value={formData.areaHec} onChange={handleChange} placeholder="Hec" />
                        <Form.Control type="text" name="areaAres" value={formData.areaAres} onChange={handleChange} placeholder="Ares" />
                        <Form.Control type="text" name="areaSqM" value={formData.areaSqM} onChange={handleChange} placeholder="SqM" />
                    </div>

                    <Row className="directions">
                        <Col md={3}>
                            <Form.Control type="text" name="east" value={formData.east} onChange={handleChange} placeholder="East" />
                        </Col>
                        <Col md={3}>
                            <Form.Control type="text" name="south" value={formData.south} onChange={handleChange} placeholder="South" />
                        </Col>
                        <Col md={3}>
                            <Form.Control type="text" name="west" value={formData.west} onChange={handleChange} placeholder="West" />
                        </Col>
                        <Col md={3}>
                            <Form.Control type="text" name="north" value={formData.north} onChange={handleChange} placeholder="North" />
                        </Col>
                    </Row>

                    <div className="message">
                        {successMessage && <Alert variant="success">{successMessage}</Alert>} 
                    </div>
                    
                    <div className="form-btn">
                        <Button type="submit">Submit</Button>
                        <Button type="button" onClick={handleClear}>Clear</Button>
                    </div>
                </Form>
            </Container>
        </section>
    );
};

export default FormSection;